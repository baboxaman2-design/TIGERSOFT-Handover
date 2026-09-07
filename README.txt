TIGERSOFT Handover V10
Baseline: V9

แก้ไขเฉพาะ 2 ส่วนตามที่กำหนด:
1. ปรับ UX ของหน้าจุดติดตั้ง/อุปกรณ์ให้ใช้งานบนมือถือสะดวกขึ้น
2. เพิ่มรายการอุปกรณ์มาตรฐาน + ปุ่มสแกน Serial Number

รายการอุปกรณ์มาตรฐาน:
- เครื่องบันทึกเวลา
- Power supply
- Battery
- Magnetic lock
- Notouch Exit
- Emergency break glass
- Key Switch
- Access Control Kit
- ฐานอคิลิค

การสแกน Serial:
- กดปุ่ม "สแกน" ที่ช่อง Serial Number
- ระบบเปิดกล้อง
- อ่าน Barcode/QR ก่อน
- ถ้าไม่พบ จะลองอ่านข้อความ OCR จากภาพ
- OCR ทำงานใน Browser; ครั้งแรกต้องมี Internet เพื่อโหลด OCR engine
- สามารถแก้ไข Serial ที่อ่านได้ด้วยตนเองตามเดิม

การติดตั้งบน GitHub:
อัปโหลดทับไฟล์เดิมที่ root ของ Repository:
- index.html
- sw.js

ไม่ต้องเปลี่ยนไฟล์ Font, PDF template, font-test.html หรือไฟล์อื่น
