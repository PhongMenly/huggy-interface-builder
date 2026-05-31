## Mục tiêu

Bổ sung **Level 5 — Quy trình bán hàng 8 bước nâng cao** vào lộ trình đào tạo, với đầy đủ nội dung chi tiết theo từng bước để người dùng vừa đọc vừa làm theo.

## Cấu trúc Level 5

**Roadmap mới** (`roadmap5`):
- emoji: 🚀
- title: "Quy trình Sale 8 bước nâng cao"
- description: "Quy trình bán hàng chuyên sâu từ tạo lead, hẹn gặp, xây dựng quan hệ đến chốt đơn và chăm sóc dài hạn."
- detailedDescription: Tóm tắt 8 bước + tư duy "2 cộng 1".

**8 nhiệm vụ tuần tự (5.1 → 5.8)** — mỗi nhiệm vụ là một bước trong quy trình:

| # | Tiêu đề | Emoji |
|---|---------|-------|
| 5.1 | Thu thập thông tin & tạo Lead | 🎯 |
| 5.2 | Hẹn gặp khách hàng | 📅 |
| 5.3 | Xây dựng mối quan hệ thân tình & tin cậy | 🤝 |
| 5.4 | Xác định nhu cầu khách hàng | 🔍 |
| 5.5 | Trình bày lợi ích & giải pháp | 🎤 |
| 5.6 | Xử lý sự từ chối | 🛡️ |
| 5.7 | Chốt đơn | ✅ |
| 5.8 | Chăm sóc & bán hàng tiếp tục (Upsale/Downsale) | 💎 |

Bonus cuối Level 5: **Nhiệm vụ 5.9 — Tư duy "2 cộng 1"** (xác thực khách + xin lời giới thiệu khéo léo, kể cả lời giới thiệu trả phí).

## Cách hiển thị nội dung từng bước

Tận dụng field `workRules` đã có sẵn renderer (tiêu đề kỹ thuật + mô tả) để mỗi đầu mục trong từng bước hiển thị thành một thẻ riêng — không cần thêm component mới.

Mỗi nhiệm vụ sẽ chứa:
- `description`: tóm tắt mục đích bước đó
- `workRules[]`: list các kỹ thuật/đầu mục trong bước (ví dụ Bước 1 có 7 mục: Cách đặt câu hỏi, Mở nhóm Zalo mới, Poster Facebook, Fanpage trả lời tự động, Quà tặng & email, Chạy quảng cáo lead, Xin lời giới thiệu)
- Phần "Lưu ý" của từng bước nhét vào nhiệm vụ dưới dạng một `workRule` cuối có tiêu đề "⚠️ Lưu ý quan trọng"
- `checklist[]`: 2–4 mục xác nhận để mở khóa bước tiếp theo (vd: "Đã áp dụng ít nhất 2 cách tạo lead", "Đã thực hành đặt câu hỏi mở")

## Tích hợp

- Thêm `roadmap5` vào export cuối file: `export const roadmaps = [roadmap1, roadmap2, roadmap3, roadmap4, roadmap5]`
- Hệ thống unlock tuần tự, ProgressTracker, LevelVideos (level 5), MissionCard đều tự động hoạt động — không cần sửa component.

## Files thay đổi

- `src/lib/missions-data.ts` — thêm `roadmap5` đầy đủ nội dung 8 bước + bonus, append vào mảng `roadmaps`.

Không cần migration, không sửa component.
