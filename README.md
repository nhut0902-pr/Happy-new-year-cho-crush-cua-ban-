
# HƯỚNG DẪN SỬ DỤNG - BINARY RAIN COUNTDOWN

Chào bạn! Đây là bộ code được thiết kế để tạo hiệu ứng "Mưa số" (Matrix Rain) kết hợp Countdown New Year cực chất như trong video bạn yêu cầu.

## 1. Cấu trúc thư mục cần chuẩn bị:
Để ứng dụng chạy hoàn hảo nhất, bạn cần tạo một thư mục tên là `assets` trong cùng cấp với các file code và thêm các file sau:
- `assets/music.mp3`: File nhạc nền (nhạc New Year Remix hoặc bài bạn thích).
- `assets/image.jpg`: Ảnh của người bạn muốn gửi lời chúc (sẽ hiện ở giữa màn hình).

## 2. Cách thay đổi thông tin:

### Thay Tên Crush:
Mở file `components/OverlayContent.tsx`, tìm dòng số **52** (hoặc tìm chữ `TÊN CRUSH`).
Thay chữ `TÊN CRUSH` thành tên người ấy của bạn. Ví dụ: `NGỌC TRINH`.

### Thay đổi lời chúc:
Trong cùng file `components/OverlayContent.tsx`, bạn có thể sửa các nội dung trong thẻ `<p>` hoặc `<h1>`:
- Lời khen: `XINH GÁI, DÁNG NGON` (Dòng 65).
- Lời chúc cuối: `CHÚC EM TỪ NĂM NAY...` (Dòng 100).

### Thay đổi màu sắc Matrix:
Mở file `App.tsx`, tìm dòng số **82**:
- Chỗ `color="#ff2e88"`: Đây là mã màu hồng neon. Bạn có thể thay bằng xanh lá `#00ff00` hoặc bất kỳ màu nào.

## 3. Các hiệu ứng đặc biệt tích hợp sẵn:
- **Matrix Rain**: Chỉ rơi 0 và 1, mật độ dày, tốc độ nhanh.
- **Fireworks**: Pháo hoa tự động bắn khi đếm ngược xong.
- **Heart Effect**: Trái tim đập (Pulse) ở màn hình cuối cùng.
- **Glitch Text**: Chữ xuất hiện theo kiểu nhiễu sóng điện tử.

---
**Powered By Nhutcoder**
Chúc bạn có một món quà tuyệt vời dành cho người ấy!
