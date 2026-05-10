import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { CO_NHON_HISTORY, CO_NHON_ANIMALS } from "./src/constants";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Prediction Endpoint (Securely server-side)
  app.post("/api/predict", async (req, res) => {
    try {
      const { lines, customHistory = [] } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "Thiếu GEMINI_API_KEY trong cấu hình server." });
      }

      const genAI = new GoogleGenAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const staticHistoryContext = CO_NHON_HISTORY.map(h => 
        `Câu 1: ${h.caumot}\nCâu 2: ${h.cauhai}\nCâu 3: ${h.cauba}\nCâu 4: ${h.caubon}\nKết quả: ${h.ketqua}`
      ).join("\n---\n");

      const dynamicHistoryContext = customHistory.map((h: any) => 
        `[DỮ LIỆU ĐÃ HỌC TỪ NGƯỜI CHƠI] Câu 1: ${h.caumot}\nCâu 2: ${h.cauhai}\nCâu 3: ${h.cauba}\nCâu 4: ${h.caubon}\nKết quả: ${h.ketqua}`
      ).join("\n---\n");

      const animalsList = CO_NHON_ANIMALS.map(a => `${a.id}. ${a.name} (${a.meaning})`).join(", ");

      const prompt = `
Bạn là một bậc thầy giải mã Cổ Nhơn chuyên nghiệp. Trò chơi này dựa trên các câu thai (thơ lục bát) mang đậm tính triết lý, lịch sử và dân gian Việt Nam.
Nhiệm vụ: Phân tích ngữ nghĩa, vần điệu và điển tích để tìm ra 3 con vật/biểu tượng khả thi nhất trong 36 đáp án sau:
${animalsList}

NGUYÊN TẮC DỰ ĐOÁN:
1. LUẬT VẦN: Chú ý sự hiệp vần giữa câu 6 và câu 8 (chữ thứ 6 câu 6 vần với chữ thứ 6 câu 8).
2. ĐIỂN TÍCH: Tìm các từ khóa về nhân vật lịch sử (Trung Trắc, Quang Trung, Hưng Đạo Vương...), địa danh (Bạch Đằng, Đống Đa, Hoài Nhơn...).
3. Ý NGHĨA BIỂU TƯỢNG: Một số con vật đại diện cho tính cách (ví dụ: KHÔN SƠN - Cọp đại diện cho sức mạnh, uy phong).

DỮ LIỆU THAM KHẢO (Đã có kết quả chính xác):
${staticHistoryContext}

${dynamicHistoryContext ? `DỮ LIỆU MỚI DO NGƯỜI DÙNG CUNG CẤP (ƯU TIÊN TUYỆT ĐỐI VÌ ĐÂY LÀ KẾT QUẢ THỰC TẾ GẦN ĐÂY):\n${dynamicHistoryContext}` : ''}

CÂU THAI CẦN DỰ ĐOÁN:
Câu 1: ${lines.caumot}
Câu 2: ${lines.cauhai}
Câu 3: ${lines.cauba}
Câu 4: ${lines.caubon}

Yêu cầu trả về JSON thuần túy (không prefix/suffix):
{
  "predictions": [
    {
      "name": "TÊN KẾT QUẢ",
      "meaning": "Tên con vật",
      "reasoning": "Giải thích chi tiết logic về vần điệu hoặc điển tích.",
      "confidence": 0.0-1.0
    }
  ] (trả về đúng 3 kết quả, sắp xếp theo độ tin cậy từ cao đến thấp)
}
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      // Clean possible markdown backticks
      const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      res.json(JSON.parse(cleanJson));
    } catch (error: any) {
      console.error("Prediction Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
