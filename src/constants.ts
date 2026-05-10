
export interface CoNhonRecord {
  caumot: string;
  cauhai: string;
  cauba: string;
  caubon: string;
  ketqua: string;
}

export interface CoNhonHistory {
  caumot: string;
  cauhai: string;
  cauba: string;
  caubon: string;
  ketqua: string;
}

export interface CoNhonAnimal {
  id: number;
  name: string;
  meaning: string;
}

export const CO_NHON_ANIMALS: CoNhonAnimal[] = [
  { id: 1, name: "CHIÊM KHÔI", meaning: "Cá Trắng" },
  { id: 2, name: "BẢN QUẾ", meaning: "Con Ốc" },
  { id: 3, name: "VINH SANH", meaning: "Con Ngỗng" },
  { id: 4, name: "PHÙNG XUÂN", meaning: "Con Công" },
  { id: 5, name: "CHÍ CAO", meaning: "Con Trùn" },
  { id: 6, name: "KHÔN SƠN", meaning: "Con Cọp" },
  { id: 7, name: "CHÁNH THUẬN", meaning: "Con Heo" },
  { id: 8, name: "NGUYỆT BỬU", meaning: "Con Thỏ" },
  { id: 9, name: "HỚN VÂN", meaning: "Con Trâu" },
  { id: 10, name: "GIANG TỬ", meaning: "Con Rồng Bay" },
  { id: 11, name: "PHƯỚC TÔN", meaning: "Con Chó" },
  { id: 12, name: "QUANG MINH", meaning: "Con Ngựa" },
  { id: 13, name: "HỮU TÀI", meaning: "Con Voi" },
  { id: 14, name: "CHỈ ĐẮC", meaning: "Con Mèo" },
  { id: 15, name: "TẤT KHẮC", meaning: "Con Chuột" },
  { id: 16, name: "MẬU LÂM", meaning: "Con Ong" },
  { id: 17, name: "TRỌNG TIÊN", meaning: "Con Hạc" },
  { id: 18, name: "THIÊN THÂN", meaning: "Kỳ Lân" },
  { id: 19, name: "CẨN NGỌC", meaning: "Con Bướm" },
  { id: 20, name: "TRÂN CHÂU", meaning: "Hòn Đá" },
  { id: 21, name: "THƯỢNG CHIÊU", meaning: "Con Én" },
  { id: 22, name: "SONG ĐÔNG", meaning: "Con Cu" },
  { id: 23, name: "TAM HÒE", meaning: "Con Khỉ" },
  { id: 24, name: "HIỆP HẢI", meaning: "Con Ếch" },
  { id: 25, name: "CỬU QUAN", meaning: "Con Quạ" },
  { id: 26, name: "THÁI BÌNH", meaning: "Con Rồng Nằm" },
  { id: 27, name: "HỎA DIỆM", meaning: "Con Rùa" },
  { id: 28, name: "NHỰT THẮNG", meaning: "Con Gà" },
  { id: 29, name: "ĐỊA LƯƠNG", meaning: "Con Lươn" },
  { id: 30, name: "TÌNH LỢI", meaning: "Cá Đỏ" },
  { id: 31, name: "TRƯỜNG THỌ", meaning: "Con Tôm" },
  { id: 32, name: "VẠN KIM", meaning: "Con Rắn" },
  { id: 33, name: "THANH TIÊN", meaning: "Con Nhện" },
  { id: 34, name: "NGUYÊN KIẾT", meaning: "Con Nai" },
  { id: 35, name: "NHỨT PHẨM", meaning: "Con Dê" },
  { id: 36, name: "AN SỸ", meaning: "Con Yêu" },
];

export const CO_NHON_HISTORY: CoNhonHistory[] = [
  { caumot: "mung xuan quy mao que ta", cauhai: "kinh tai on dinh muon nha am no", cauba: "binh an phu quy vinh hoa", caubon: "tiep da thang loi giu cho vung ben", ketqua: "KHÔN SƠN" },
  { caumot: "giap bac yen vang nuc bon phuong", cauhai: "co bay kiem bac day sa truong", cauba: "bien thanh got ngoc an bo coi", caubon: "nam quoc ma hong dinh nghiep vuong", ketqua: "TRƯỜNG THỌ" },
  { caumot: "ngat troi hao khi tay son", cauhai: "chinh nam dep bac sanh hon anh hung", cauba: "ba quan mot da kien trung", caubon: "dang trong quat khoi chay dau tranh", ketqua: "HIỆP HẢI" },
  { caumot: "bach dang ten mot dong song", cauhai: "giac lam thuy chien ghi cong anh hung", cauba: "non song mo hoi trung phung", caubon: "ngan nam bac thuoc doan cung tu day", ketqua: "THANH TIÊN" },
  { caumot: "chuc cho xuan moi tot moi dieu", cauhai: "gia dinh hanh phuc van niem yeu", cauba: "que huong thinh phat xuan nhu y", caubon: "thai binh dat nuoc chi hung kieu", ketqua: "HỎA DIỆM" },
  { caumot: "ai ve xu so hoai nhon", cauhai: "huu tinh non nuoc giang son hoa do", cauba: "trang nga trang lai diem to", caubon: "tam quan bo cat song xo bong dua", ketqua: "KHÔN SƠN" },
  { caumot: "bao doi cau chuyen my nhan", cauhai: "anh hung cung luy hoi than thuy tinh", cauba: "hung vuong that cuoi an tinh", caubon: "lo thoi den muon noi dinh trieu duong", ketqua: "QUANG MINH" },
  { caumot: "xoai mut rach gam xua thang gia", cauhai: "dong da tam diep don mua xuan", cauba: "quang trung thong linh ba quan", caubon: "giang son mot moi lay lung troi nam", ketqua: "TRƯỜNG THỌ" },
  { caumot: "song suoi nuoc nam troi dinh san", cauhai: "coi bo phuong bac da phan bay", cauba: "co sao lu giac chung bay", caubon: "muu do cuop nuoc ruoc ngay hoa vong", ketqua: "THIÊN THÂN" },
  { caumot: "thanh dam co bac hien nho", cauhai: "xuat than thai hoc vien quan khong dau", cauba: "mac trieu danh so tram dau", caubon: "sang ngoi khi tiet phuong hoang an cu", ketqua: "TRÂN CHÂU" },
  { caumot: "quan luong ha khac tham tan", cauhai: "lanh binh khoi nghia xoa tan muu do", cauba: "van xuan dat nuoc diem to", caubon: "oai hung nam de co do dung xay", ketqua: "THƯƠNG CHIÊU" },
  { caumot: "tron trung ven hieu khiem nhuong", cauhai: "pho vua xoa han phi thuong chien cong", cauba: "ba lan da bai nguyen mong", caubon: "quan dan doan ket dien hong moc son", ketqua: "BẢN QUẾ" },
  { caumot: "nham dan qua quy mao ve", cauhai: "thinh hung dat nuoc lang que yen binh", cauba: "kinh te phat trien phon vinh", caubon: "dan giau nuoc manh vuon minh bay cao", ketqua: "VẠN KIM" },
  { caumot: "ngoc hoi cu dia nam nao", cauhai: "chiem don khuong thuong xiet bao nan trinh", cauba: "giet hang bai tuong tinh binh", caubon: "sam nghi dong phai van minh loa son", ketqua: "PHÙNG XUÂN" },
  { caumot: "lanh tho loan chia ba xu so", cauhai: "bien thuy vach san mot dong song", cauba: "duy tu vao xu dang trong", caubon: "tam nam giup chua lap cong choi ngoi", ketqua: "QUANG MINH" },
  { caumot: "truoc them nam moi xuan ve", cauhai: "mai dao khoe sac huong que ron rang", cauba: "cau mong the gioi sang trang", caubon: "chien tranh dich hoa thoai dang gac qua", ketqua: "TRƯỜNG THỌ" },
  { caumot: "rua han nuoc bao thu nha", cauhai: "chi la trung trac phat co khoi binh", cauba: "cung em trung nhi xuat chinh", caubon: "troi nam liet nu that kinh giac tau", ketqua: "GIANG TỬ" },
  { caumot: "tay son nu tuong la ba", cauhai: "cuoi voi xung tran ten la thi xuan", cauba: "tay ba thong linh ba quan", caubon: "sang nguoi thien co gian truan ma hong", ketqua: "VẠN KIM" },
  { caumot: "chuc mung xuan moi que huong", cauhai: "day lui dai dich bon phuong thanh binh", cauba: "cong nong thuong mai phon vinh", caubon: "dan giau nuoc manh vuon minh bay cao", ketqua: "THÁI BÌNH" },
  { caumot: "hai xuan dich benh hoanh hanh", cauhai: "khoi tu vu han lan nhanh bat ngo", cauba: "nam k cho co tho o", caubon: "hoai nhon quyet giu ngon co tien phong", ketqua: "TRỌNG TIÊN" },
  { caumot: "tiet xuan nguyen dan nham dan", cauhai: "doan vien hanh phuc tinh than dam da", cauba: "tan nien phu quy muon nha", caubon: "binh an thinh vuong vung da am no", ketqua: "GIANG TỬ" },
  { caumot: "tay son nu tuong la ba", cauhai: "bui la nguyen ho ten la thi xuan", cauba: "mot tay thong linh ba quan", caubon: "chinh nam dep bac gian truan ma hong", ketqua: "SONG ĐÔNG" },
  { caumot: "ngay nay o tai hai thon", cauhai: "dong nhan thu nhat hat mon thu nhi", cauba: "ba nam khoi nghiep dung co", caubon: "guom vang thien co muon doi luu danh", ketqua: "BẢN QUẾ" },
  { caumot: "tay son hung khi ngut troi", cauhai: "giac bay hon phach van loi tha vong", cauba: "su sach in dau dang trong", caubon: "ba quan tuong si mot long trung kien", ketqua: "ĐỊA LƯƠNG" },
  { caumot: "mung nam ky dau oai hung", cauhai: "dong da chien dia phat tung co dao", cauba: "quan trung the ngut troi cao", caubon: "can long phuc ne luoc thao phi thuong", ketqua: "NGUYỆT BỬU" },
  { caumot: "am vang hao khi nui rung", cauhai: "ho le day nghia quan hung lam son", cauba: "chin nam hiep suc dong tam", caubon: "anh hung le loi dong quan hoi the", ketqua: "TÌNH LỢI" },
  { caumot: "nuoc song trong do long dau be", cauhai: "tieng anh hung tac de nghin thu", cauba: "co bay kiem bac quan thu", caubon: "ban thanh got ngoc ba thu sang ngoi", ketqua: "THIÊN THÂN" },
  { caumot: "nham dan xuan moi chuc binh an", cauhai: "chuc cho dat nuoc mai an khang", cauba: "gia dinh hanh phuc nhieu tai loc", caubon: "cong danh thanh dat rang hao quan", ketqua: "ĐỊA LƯƠNG" },
  { caumot: "long than bao mong gap duyen may", cauhai: "de vuong lap chieu xuong truyen ba quan", cauba: "hoa lu chon cu mua thu", caubon: "thang long sach bong quan thu mung xuan", ketqua: "CHÁNH THUẬN" },
  { caumot: "co loa thanh quach con vang", cauhai: "mua sa bao tap thuong nang my chau", cauba: "no thien hung ho le sau", caubon: "noi buon gieng ngoc xot xa noi niem", ketqua: "KHÔN SƠN" },
  { caumot: "nguyen mong dai bai ba lan", cauhai: "anh hung dai viet nha tran hien danh", cauba: "xac thu van kiep non xanh", caubon: "bach dang mau giac nong tanh tran dong", ketqua: "THANH TIÊN" },
  { caumot: "binh de phu cu hai dau", cauhai: "tam quan ben cang nhip cau bong son", cauba: "ai ve thi xa hoai nhon", caubon: "chung tay kien thiet dep hon que minh", ketqua: "GIANG TỬ" },
  { caumot: "canh ty qua tan suu ve", cauhai: "hoai nhon nhon nhip khap duong que", cauba: "toan dan sung tuc vui xuan moi", caubon: "thai binh phan khoi tua ngan hue", ketqua: "TẤT KHẮC" },
  { caumot: "binh dinh co da vong phu", cauhai: "trung luong ben doi song cu lao xanh", cauba: "deo nhong co thap ai xay", caubon: "ben kia thu thien ben nay duong long", ketqua: "NGUYÊN KIẾT" },
  { caumot: "mung xuan tan suu que nha", cauhai: "sum vay hanh phuc dam da tinh than", cauba: "vinh hoa phu quy den gan", caubon: "binh an thinh vuong van phan tuoi vui", ketqua: "THIÊN THÂN" },
  { caumot: "chuc mung xuan moi que huong", cauhai: "day lui dai dich bon phuong thanh binh", cauba: "cong nong thuong mai phon vinh", caubon: "dan giau nuoc manh vuon minh bay cao", ketqua: "TRỌNG TIÊN" },
  { caumot: "vong phu thuoc day nui ba", cauhai: "phuoc son cao ngat goi la nui ong", cauba: "quy nhon bien nho hoang hon", caubon: "troi van dat vo say hon co nhan", ketqua: "THIÊN THÂN" },
  { caumot: "tan suu xuan cau chuc binh an", cauhai: "que huong dat nuoc mai an khang", cauba: "muon nha nam moi nhieu tai loc", caubon: "cong danh thanh dat phuc vinh quan", ketqua: "TẤT KHẮC" },
  { caumot: "gia long cong ran can ga", cauhai: "bi tay son duoi chay ra nuoc ngoai", cauba: "nam lan bay luot giuong oai", caubon: "rach gam xoai mut song nhoai quan xiem", ketqua: "CỬU QUAN" },
  { caumot: "mung nam ky dau kien hung", cauhai: "dong da chien dia phat tung co dao", cauba: "ba quan hao khi ngut cao", caubon: "giap bao rang ro anh hao thang long", ketqua: "THƯƠNG CHIÊU" },
  { caumot: "su vang choi loi mot pho", cauhai: "chinh nam bac phat am no dan tinh", cauba: "rach gam xoai mut oai linh", caubon: "phu le diet trinh ven tinh nuoc non", ketqua: "NGUYỆT BỬU" },
  { caumot: "binh dinh dat vo troi van", cauhai: "tay son tam kiet oai danh mot doi", cauba: "thi nhan nut tieng go boi", caubon: "doi xanh ru bong dinh doi trang treo", ketqua: "TRƯỜNG THỌ" },
  { caumot: "canh ty xuan ve chuc binh an", cauhai: "chuc cho dat nuoc mai an khang", cauba: "tram nha nam moi nhieu tai loc", caubon: "cong thanh danh toai chuc vinh quang", ketqua: "CHỈ ĐẮC" },
  { caumot: "lanh tho loan chia ba xu so", cauhai: "bien thuy vach san mot dong song", cauba: "vi nhu chang co loi nguyen truc", caubon: "thi biet dau ma don ngoa long", ketqua: "MẬU LÂM" },
  { caumot: "soai giac bo minh lam thuy chien", cauhai: "ong dong khoi day chuyen thoat hoan", cauba: "doi doi truyen tuc tai thao luoc", caubon: "duc thanh trieu tran hung dao vuong", ketqua: "TAM HÒE" },
  { caumot: "su xanh ten tuoi vang lung", cauhai: "phat co khoi nghia day hung kieu binh", cauba: "hat giang con mai hien linh", caubon: "giong dong lac tuong quen minh cuu dan", ketqua: "NHỨT PHẨM" },
];
