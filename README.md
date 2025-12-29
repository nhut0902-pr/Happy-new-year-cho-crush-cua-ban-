
# HƯỚNG DẪN DEPLOY VERCEL - BINARY RAIN COUNTDOWN

Để đảm bảo ứng dụng hoạt động 100% trên Vercel mà không bị lỗi "màn hình đen" hoặc "không có nhạc/ảnh", bạn cần lưu ý:

## 1. Thư mục `assets` quan trọng:
Trên Vercel (và hầu hết các nền tảng deploy), thư mục chứa tài nguyên tĩnh của bạn phải nằm đúng vị trí. 

**Cấu trúc thư mục của bạn phải như sau:**
```
project-root/
├── assets/
│   ├── music.mp3
│   └── image.jpg
├── components/
├── App.tsx
├── index.html
└── ... các file khác
```

*Lưu ý: Nếu bạn dùng công cụ build chuẩn, hãy đảm bảo thư mục `assets` được copy vào thư mục output (thường là `dist` hoặc `build`).*

## 2. Khắc phục lỗi "Màn hình đen":
Nếu khi mở link Vercel bạn chỉ thấy một nút "ENTER" trên nền đen:
- Đây là **thiết kế mặc định (IDLE state)**. Bạn phải nhấn nút để hệ thống kích hoạt nhạc và hiệu ứng. Trình duyệt hiện nay cấm tự động phát nhạc khi chưa có tương tác từ người dùng.
- Tôi đã thêm hiệu ứng "System Booting" ở góc trên nút bấm để bạn biết là trang web đã tải xong và đang chờ bạn nhấn.

## 3. Cách thay đổi thông tin:
- Tên Crush: File `components/OverlayContent.tsx` -> Tìm chữ `TÊN CRUSH`.
- Nhạc/Ảnh: Chỉ cần ghi đè file mới vào thư mục `assets/` với đúng tên `music.mp3` và `image.jpg`.

## 4. Kiểm tra trên Vercel:
Sau khi deploy, nếu ảnh không hiện: 
- Nhấn F12 (Console) xem có lỗi `404 Not Found` cho file ảnh không.
- Nếu có lỗi 404, nghĩa là bạn chưa upload thư mục `assets` hoặc sai vị trí thư mục.

---
**Powered By Nhutcoder**
Mọi thứ đã được tối ưu hóa cho môi trường Production (Vercel/Netlify).
