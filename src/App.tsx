/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, History, Scroll, Table as TableIcon, Info, Loader2, Save, CheckCircle2 } from 'lucide-react';
import { CO_NHON_ANIMALS, CO_NHON_HISTORY, CoNhonRecord } from './constants';

export default function App() {
  const [lines, setLines] = useState({ caumot: '', cauhai: '', cauba: '', caubon: '' });
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customHistory, setCustomHistory] = useState<CoNhonRecord[]>([]);
  const [pendingPredictions, setPendingPredictions] = useState<any[]>([]);
  const [learningMode, setLearningMode] = useState(false);
  const [selectedResult, setSelectedResult] = useState('');
  const [justLearned, setJustLearned] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('co_nhon_custom_history');
    const savedPending = localStorage.getItem('co_nhon_pending_predictions');
    
    if (savedHistory) setCustomHistory(JSON.parse(savedHistory));
    if (savedPending) setPendingPredictions(JSON.parse(savedPending));
  }, []);

  useEffect(() => {
    if (prediction && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [prediction]);

  const handlePredict = async () => {
    if (!lines.caumot || !lines.cauhai || !lines.cauba || !lines.caubon) {
      setError('Vui lòng nhập đầy đủ 4 câu thai.');
      return;
    }
    setError(null);
    setLoading(true);
    setJustLearned(false);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lines, customHistory })
      });
      
      if (!response.ok) throw new Error('Yêu cầu dự đoán thất bại');
      
      const result = await response.json();
      setPrediction(result);
      
      // Add to pending
      const newPending = {
        id: Date.now(),
        lines: { ...lines },
        prediction: result.predictions[0],
        timestamp: new Date().toLocaleString('vi-VN')
      };
      const updatedPending = [newPending, ...pendingPredictions].slice(0, 10);
      setPendingPredictions(updatedPending);
      localStorage.setItem('co_nhon_pending_predictions', JSON.stringify(updatedPending));

    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmResult = (pendingId: number, resultName: string) => {
    const pendingItem = pendingPredictions.find(p => p.id === pendingId);
    if (!pendingItem) return;

    const newRecord: CoNhonRecord = {
      ...pendingItem.lines,
      ketqua: resultName
    };

    const updatedHistory = [newRecord, ...customHistory].slice(0, 100);
    setCustomHistory(updatedHistory);
    localStorage.setItem('co_nhon_custom_history', JSON.stringify(updatedHistory));

    const updatedPending = pendingPredictions.filter(p => p.id !== pendingId);
    setPendingPredictions(updatedPending);
    localStorage.setItem('co_nhon_pending_predictions', JSON.stringify(updatedPending));
    
    setJustLearned(true);
    // Auto clear after 3s message
    setTimeout(() => setJustLearned(false), 3000);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-brand text-white py-12 px-6 text-center shadow-lg relative overflow-hidden" id="main-header">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 gap-4 p-4">
            {CO_NHON_ANIMALS.slice(0, 18).map((a) => (
              <div key={a.id} className="text-4xl text-white">{a.name[0]}</div>
            ))}
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h1 className="serif text-5xl md:text-7xl font-bold mb-4 tracking-tighter">Cổ Nhơn</h1>
          <p className="opacity-80 text-lg md:text-xl font-light max-w-2xl mx-auto italic serif">
            "Dự đoán tâm ý, giải mã điển tích - Trải nghiệm văn hóa dân gian với sức mạnh AI"
          </p>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Prediction Form */}
        <section className="lg:col-span-2 space-y-8" id="prediction-section">
          <div className="glass-card rounded-2xl p-8 shadow-xl border-brand/10">
            <div className="flex items-center gap-3 mb-6 text-brand">
              <Scroll size={28} />
              <h2 className="serif text-2xl font-bold uppercase tracking-wide">Nhập Câu Thai</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-brand/60 mb-2 font-bold">Câu Một (6 chữ)</label>
                <input 
                  id="caumot"
                  value={lines.caumot}
                  onChange={(e) => setLines({...lines, caumot: e.target.value})}
                  placeholder="Ví dụ: mung xuan quy mao que ta..."
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-brand/60 mb-2 font-bold">Câu Hai (8 chữ)</label>
                <input 
                  id="cauhai"
                  value={lines.cauhai}
                  onChange={(e) => setLines({...lines, cauhai: e.target.value})}
                  placeholder="Ví dụ: kinh tai on dinh muon nha am no..."
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-brand/60 mb-2 font-bold">Câu Ba (6 chữ)</label>
                <input 
                  id="cauba"
                  value={lines.cauba}
                  onChange={(e) => setLines({...lines, cauba: e.target.value})}
                  placeholder="Ví dụ: binh an phu quy vinh hoa..."
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-brand/60 mb-2 font-bold">Câu Bốn (8 chữ)</label>
                <input 
                  id="caubon"
                  value={lines.caubon}
                  onChange={(e) => setLines({...lines, caubon: e.target.value})}
                  placeholder="Ví dụ: tiep da thang loi giu cho vung ben..."
                  className="input-field"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm font-medium pt-2">{error}</p>
              )}

              <button 
                id="predict-button"
                onClick={handlePredict}
                disabled={loading}
                className="w-full bg-brand text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand/90 transition-colors shadow-lg mt-4 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
                {loading ? 'Đang giải mã...' : 'DỰ ĐOÁN KẾT QUẢ'}
              </button>
            </div>
          </div>

          {/* Prediction Result */}
          <AnimatePresence>
            {prediction && prediction.predictions && (
              <motion.div 
                ref={resultRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="space-y-6"
              >
                {/* Top 1 Prediction */}
                <div 
                  className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-brand/20 relative overflow-hidden"
                  id="result-card-1"
                >
                  <div className="absolute top-0 right-0 p-4">
                    <div className="bg-brand text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                      Dự đoán số 1: {Math.round(prediction.predictions[0].confidence * 100)}%
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <span className="text-xs uppercase tracking-[0.3em] text-brand/40 font-bold">Kết quả khả quan nhất</span>
                    <h3 className="serif text-5xl md:text-6xl text-brand font-black uppercase tracking-tighter">{prediction.predictions[0].name}</h3>
                    <div className="serif italic text-2xl text-brand/70">— {prediction.predictions[0].meaning} —</div>
                    
                    <div className="max-w-xl mx-auto pt-6 border-t border-brand/5 text-left">
                      <p className="text-brand/80 leading-relaxed serif italic text-lg text-center">
                        {prediction.predictions[0].reasoning}
                      </p>
                    </div>

                    {justLearned && (
                      <div className="pt-8 border-t border-brand/5 text-green-600 font-bold flex items-center justify-center gap-2 animate-bounce">
                        <CheckCircle2 size={24} />
                        KẾT QUẢ ĐÃ ĐƯỢC NẠP VÀO HỆ THỐNG!
                      </div>
                    )}
                  </div>
                </div>

                {/* Sub Predictions (2 and 3) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prediction.predictions.slice(1, 3).map((p: any, idx: number) => (
                    <div key={idx} className="glass-card rounded-xl p-6 border border-brand/10 shadow-lg relative overflow-hidden">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] uppercase tracking-widest text-brand/40 font-bold">Dự đoán #{idx + 2}</span>
                        <span className="text-xs font-bold text-brand bg-brand/5 px-2 py-1 rounded-lg">
                          {Math.round(p.confidence * 100)}%
                        </span>
                      </div>
                      <h4 className="serif text-2xl text-brand font-bold uppercase mb-1">{p.name}</h4>
                      <p className="text-xs italic text-brand/60 mb-3">— {p.meaning}</p>
                      <p className="text-xs text-brand/80 line-clamp-3 serif italic">{p.reasoning}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Sidebar Info */}
        <aside className="space-y-8" id="sidebar">
          {/* Pending Confirmation List */}
          {pendingPredictions.length > 0 && (
            <div className="glass-card rounded-2xl p-6 shadow-xl border-brand/20 bg-brand/5 ring-1 ring-brand/10">
              <div className="flex items-center gap-2 text-brand mb-4">
                <Loader2 size={20} className="animate-spin" />
                <h3 className="font-bold uppercase text-sm tracking-widest">Đang chờ kết quả (13h)</h3>
              </div>
              <div className="space-y-4">
                {pendingPredictions.map((p) => (
                  <div key={p.id} className="p-4 bg-white/60 rounded-xl border border-brand/20 space-y-3">
                    <div className="text-[10px] text-brand/40 font-bold uppercase">{p.timestamp}</div>
                    <p className="text-sm italic serif text-brand/80 line-clamp-2">"{p.lines.caumot}..."</p>
                    <div className="text-xs font-bold text-brand italic">Dự đoán của AI: {p.prediction.name}</div>
                    
                    <div className="pt-2 border-t border-brand/5">
                      <p className="text-[10px] font-bold text-brand/60 uppercase mb-2">Kết quả thực tế là gì?</p>
                      <select 
                        onChange={(e) => handleConfirmResult(p.id, e.target.value)}
                        className="w-full bg-white border border-brand/20 rounded-lg p-2 text-xs serif italic focus:ring-2 focus:ring-brand/30"
                      >
                        <option value="">-- Chọn kết quả --</option>
                        {CO_NHON_ANIMALS.map(a => (
                          <option key={a.id} value={a.name}>{a.id}. {a.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="glass-card rounded-2xl p-6 shadow-lg border-brand/5">
            <div className="flex items-center gap-2 text-brand mb-4">
              <Info size={20} />
              <h3 className="font-bold uppercase text-sm tracking-widest">Về Cổ Nhơn</h3>
            </div>
            <p className="text-sm text-brand/70 leading-relaxed italic serif">
              Cổ Nhơn là trò chơi xổ số bằng thơ lục bát của vùng Bình Định (Hồài Nhơn). Mỗi lần xổ sẽ có 4 câu thơ (thai) gọi là "câu thai", và kết quả là một trong 36 con vật.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 shadow-lg border-brand/5 h-[500px] overflow-y-auto">
            <div className="flex items-center gap-2 text-brand mb-4 sticky top-0 bg-white/10 backdrop-blur-sm pb-2">
              <History size={20} />
              <h3 className="font-bold uppercase text-sm tracking-widest">Lịch sử & Đã học</h3>
            </div>
            
            <div className="space-y-4">
              {/* Custom Learned History First */}
              {customHistory.map((h, i) => (
                <div key={`custom-${i}`} className="p-3 bg-brand/10 rounded-lg border border-brand/30 ring-1 ring-brand/5">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[9px] bg-brand text-white px-1.5 py-0.5 rounded-full font-bold uppercase tracking-tighter">Đã học</span>
                    <span className="text-[10px] font-bold text-brand">{h.ketqua}</span>
                  </div>
                  <p className="text-xs italic serif line-clamp-2 text-brand/80">"{h.caumot}..."</p>
                </div>
              ))}

              {/* Static History */}
              {CO_NHON_HISTORY.slice(0, 15).map((h, i) => (
                <div key={`static-${i}`} className="p-3 bg-white/40 rounded-lg border border-brand/10 opacity-70">
                  <p className="text-xs italic serif line-clamp-2 text-brand/80">"{h.caumot}..."</p>
                  <p className="text-xs font-bold mt-1 text-brand">Kết quả: {h.ketqua}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* Animal Grid Reference */}
      <section className="max-w-6xl mx-auto px-4 mt-20" id="animal-grid">
        <div className="flex items-center gap-3 mb-8 text-brand">
          <TableIcon size={24} />
          <h2 className="serif text-3xl font-bold uppercase tracking-tight">Bảng 36 Con Vật Cổ Nhơn</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {useMemo(() => CO_NHON_ANIMALS.map((a) => {
            const predictions = prediction?.predictions || [];
            const topPrediction = predictions[0];
            const otherPredictions = predictions.slice(1, 3);
            
            const isTop = topPrediction?.name?.toUpperCase() === a.name.toUpperCase();
            const isOther = otherPredictions.some((p: any) => p.name?.toUpperCase() === a.name.toUpperCase());
            
            return (
              <motion.div 
                key={a.id} 
                animate={isTop ? { scale: 1.1, y: -5 } : (isOther ? { scale: 1.05 } : { scale: 1, y: 0 })}
                className={`glass-card p-4 rounded-xl text-center transition-all group relative ${
                  isTop ? 'ring-4 ring-brand border-brand bg-brand/5 shadow-2xl z-10' : 
                  isOther ? 'ring-2 ring-brand/30 border-brand/40 bg-brand/5 shadow-lg' : 'border-brand/5 hover:border-brand/30'
                }`}
              >
                {isTop && (
                  <div className="absolute -top-2 -right-2 bg-brand text-white p-1 rounded-full shadow-lg">
                    <Sparkles size={12} />
                  </div>
                )}
                {isOther && (
                  <div className="absolute -top-2 -right-2 bg-brand/50 text-white p-1 rounded-full shadow-sm">
                    <div className="text-[8px] font-bold">#</div>
                  </div>
                )}
                <div className={`text-xs font-bold mb-1 transition-colors ${(isTop || isOther) ? 'text-brand' : 'text-brand/40 group-hover:text-brand'}`}>
                  {String(a.id).padStart(2, '0')}
                </div>
                <div className={`serif font-bold leading-none mb-1 transition-all ${isTop ? 'text-brand text-xl' : (isOther ? 'text-brand text-lg' : 'text-brand group-hover:scale-110')}`}>
                  {a.name}
                </div>
                <div className={`text-[10px] uppercase tracking-widest italic ${(isTop || isOther) ? 'text-brand/80' : 'opacity-60'}`}>
                  {a.meaning}
                </div>
              </motion.div>
            );
          }), [prediction])}
        </div>
      </section>

      <footer className="mt-20 py-12 border-t border-brand/10 text-center text-brand/40 text-xs tracking-widest">
        &copy; 2026 CỔ NHƠN PREDICTOR • HÀNH TRÌNH VĂN HÓA CÙNG AI
      </footer>
    </div>
  );
}
