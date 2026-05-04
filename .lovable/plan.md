
# Sale Master AI — Ứng dụng đào tạo Sale KOL AI System

## Tổng quan

Xây dựng ứng dụng đào tạo gamified cho phòng Sale, theo đúng phong cách dark theme của thanthukolaisystem.lovable.app. Nhân viên sale (VinSale) phải hoàn thành từng nhiệm vụ tuần tự, mỗi nhiệm vụ chứa đầy đủ nội dung từ tài liệu gốc, có mô tả dễ hiểu, checklist xác nhận, và hệ thống mở khóa.

## Cấu trúc ứng dụng — 4 Lộ trình chính

### LỘ TRÌNH 1: THU NHẬP & HOA HỒNG (Mở khóa đầu tiên)
**Nhiệm vụ 1.1 — Giai đoạn Học việc (Tháng 1-3)**
- Lương cơ bản: 8.000.000 VND
- Hoa hồng: 10%/đơn = 135.000 VND/đơn
- KPI: 20-30 đơn/tháng → thu nhập ~10.700.000 VND
- Trọng tâm: Học quy trình, build lead, shadow Phong

**Nhiệm vụ 1.2 — Giai đoạn Phát triển (Tháng 4-6)**
- Lương: 10-12 triệu, hoa hồng 15%, KPI 36-46 đơn
- Thu nhập ~18-19 triệu

**Nhiệm vụ 1.3 — Giai đoạn Chiến binh (Tháng 7-12)**
- Lương: 13-15 triệu, hoa hồng 20%, bonus vượt KPI
- Thu nhập ~27-28.5 triệu

**Nhiệm vụ 1.4 — Quy tắc làm việc Phong Menly**
- KPI tối thiểu, thử việc 30 ngày

### LỘ TRÌNH 2: KỊCH BẢN BÁN HÀNG & XỬ LÝ TÌNH HUỐNG
**Nhiệm vụ 2.1 — Kịch bản hội thoại thực tế (Bài 1)**
- 6 tình huống: Hỏi slot, điều kiện học, quá nhiều thứ, nhân bản giọng/mặt, thiết bị, kiếm tiền
- Mỗi tình huống có: Khách nói gì → Sale phản hồi → Mục đích

**Nhiệm vụ 2.2 — FAQ & Câu trả lời chuẩn (Bài 2)**
- 7 câu hỏi thường gặp + câu trả lời mẫu + ghi chú

**Nhiệm vụ 2.3 — Xử lý từ chối (Bài 3)**
- 5 loại từ chối + cách xử lý + câu nói mẫu

### LỘ TRÌNH 3: QUY TRÌNH SALE CHUYÊN NGHIỆP
**Nhiệm vụ 3.1 — Quy trình Sale từng bước (Bài 4)**
- Nguồn lead (Facebook, Zalo, Email)
- 7 bước: Làm thân → Thu lead → Hẹn gặp → Xác định nhu cầu → Đặt câu hỏi ngược → Gửi Landing page → Follow up
- Chiến thuật downsale
- Mỗi bước có câu mẫu chi tiết

**Nhiệm vụ 3.2 — Công cụ Sale hàng ngày (Bài 5)**
- Bảng công cụ: Facebook Inbox, Ads, Group, Zalo, Email, YouTube, Landing page, Whop, Zoom, Lovable App
- Mỗi công cụ: Mục đích + dùng ở bước nào

**Nhiệm vụ 3.3 — Phân loại 3 nhóm khách (Bài 9)**
- Khách lạnh (Cold): 5 bước phản ứng
- Khách ấm (Warm): 5 bước phản ứng
- Khách cũ (Existing): 5 bước phản ứng
- Quy tắc ghi nhớ 1 dòng cho mỗi nhóm

### LỘ TRÌNH 4: CASE STUDY & NURTURE
**Nhiệm vụ 4.1 — 8 Case Study thực tế (Bài 7)**
- Mỗi case: Xuất phát điểm → Vấn đề → Kết quả → Dùng khi nào → Câu dẫn
- Bảng tra nhanh: Loại khách → Case phù hợp

**Nhiệm vụ 4.2 — Nội dung Nurture (Bài 8)**
- 5 giai đoạn nurture + gửi gì + mục đích
- 5 quy tắc nurture cho sale

**Nhiệm vụ 4.3 — Checklist Sale hàng ngày**
- Sáng: 3 việc
- Trong ngày: 3 việc
- Tối: 2 việc

**Nhiệm vụ 4.4 — Hệ sinh thái sản phẩm**
- Phễu: FREE → ENTRY → CORE → PREMIUM
- Links cộng đồng

## Thiết kế giao diện

Theo đúng design system đã học từ thanthukolaisystem.lovable.app:

- **Trang chính (Hero)**: Badge "🏆 SALE MASTER AI" → Heading "Chào mừng VinSale đến với Sale Master AI" → CTA vàng gold
- **Progress tracker**: 4 lộ trình ngang, mở khóa tuần tự
- **Cards nhiệm vụ**: Accordion mở rộng, nền #1e1e1e, checklist xác nhận
- **Nội dung bên trong**: Hiển thị đầy đủ text, bảng, câu mẫu — format rõ ràng với heading, bullet points, highlight boxes
- **Dark theme**: Nền #121212, accent tím, CTA vàng, text trắng/xám

## Cấu trúc kỹ thuật

| File | Mục đích |
|------|----------|
| `src/routes/index.tsx` | Trang chính với hero + 4 lộ trình |
| `src/components/SaleMasterHero.tsx` | Hero section |
| `src/components/ProgressTracker.tsx` | Thanh tiến trình 4 lộ trình |
| `src/components/MissionCard.tsx` | Card nhiệm vụ có accordion |
| `src/components/MissionContent.tsx` | Nội dung chi tiết bên trong mỗi nhiệm vụ |
| `src/components/ChecklistItem.tsx` | Checkbox xác nhận hoàn thành |
| `src/components/ScenarioCard.tsx` | Card tình huống (khách nói / sale phản hồi) |
| `src/components/CaseStudyCard.tsx` | Card case study |
| `src/components/SalesToolTable.tsx` | Bảng công cụ sale |
| `src/components/ProductEcosystem.tsx` | Phễu sản phẩm |
| `src/lib/missions-data.ts` | Toàn bộ dữ liệu 4 lộ trình + nhiệm vụ |

## Tính năng

- Lưu tiến trình bằng localStorage (không cần backend ban đầu)
- Mở khóa tuần tự: hoàn thành checklist lộ trình 1 → mở lộ trình 2
- Accordion mở rộng/thu gọn cho mỗi nhiệm vụ
- Mỗi nhiệm vụ có checklist xác nhận, đủ items thì đánh dấu hoàn thành
- Responsive cho mobile và desktop
- **Không bỏ sót bất kỳ thông tin nào** từ tài liệu gốc

## Lưu ý quan trọng

- Toàn bộ 9 bài trong tài liệu sẽ được đưa vào đầy đủ, không tóm tắt
- Mỗi tình huống, FAQ, case study đều có mô tả chi tiết giúp người dùng dễ hiểu
- Giao diện ưu tiên trải nghiệm đọc và thực hành, không phải chỉ hiển thị text
