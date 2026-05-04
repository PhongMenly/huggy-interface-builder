
# Học và lưu trữ Design System từ KOL AI System

Tôi đã truy cập và phân tích kỹ trang **thanthukolaisystem.lovable.app**. Dưới đây là toàn bộ những gì tôi đã ghi nhận:

## Bảng màu (Color Palette)

| Thành phần | Màu | Mã hex |
|---|---|---|
| Nền trang | Đen đậm | `#121212` |
| Nền card/section | Xám đậm | `#1e1e1e` |
| Accent chính (brand) | Tím/violet | `#a020f0` |
| Nút CTA | Vàng gold | `#ffd700` |
| Text nút CTA | Đen | `#121212` |
| Links | Tím nhạt/lilac | `#bb86fc` |
| Tiêu đề | Trắng | `#ffffff` |
| Nội dung | Xám sáng | `#e0e0e0` |
| Text phụ | Xám | `#888888` |

## Typography
- Font: **Inter**, sans-serif
- Tiêu đề hero: ~2.5rem, bold
- Tiêu đề section: ~1.5rem, semibold
- Body: 1rem

## Phong cách nút bấm
- **CTA chính**: nền vàng gold, chữ đen, bo góc 8px, kèm emoji 🚀
- **Badge/pill**: nền tối với viền tím, hình viên thuốc nhỏ
- **Card button**: nền tối, viền nhẹ

## Card & Layout
- Card: nền `#1e1e1e`, viền mỏng `rgba(255,255,255,0.1)`, bo góc 8-12px
- Layout: single-column, căn giữa
- Hero: badge → heading lớn → subtitle → CTA
- Video YouTube embed
- Progress stepper ngang (NV 1-5) với trạng thái khóa/mở
- Accordion task cards với checklist bên trong

## UI Patterns
- Gamified onboarding (mở khóa nhiệm vụ tuần tự)
- Checklist xác nhận trong mỗi task
- Progress counter (0/5 hoàn thành)
- Emoji xuyên suốt: 🚀 🔑 🤝 💪 ⭐ 📱 🎬 ✅

## Kế hoạch thực hiện

1. **Lưu design tokens vào memory** — Ghi toàn bộ bảng màu, typography, patterns vào `mem://design/reference-site` để tái sử dụng
2. **Cập nhật `src/styles.css`** — Chuyển đổi bảng màu sang dark theme với oklch, áp dụng làm mặc định
3. **Cập nhật `mem://index.md`** — Ghi core rules: dark theme, bảng màu, font, ngôn ngữ Vietnamese

Khi bạn yêu cầu thiết lập giao diện mới, tôi sẽ tự động áp dụng đúng design system này.
