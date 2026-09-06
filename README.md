# TIGERSOFT Handover Builder

เวอร์ชันพร้อมใช้งานสำหรับ GitHub Pages / Mobile / Desktop

## โครงสร้าง

- `index.html` — เว็บแอปหลัก
- `manifest.webmanifest` — PWA
- `sw.js` — Offline cache
- `assets/images/` — Logo และ App Icon
- `assets/fonts/` — ใส่ไฟล์ Font ของคุณเองตาม `PUT_FONTS_HERE.txt`

## ก่อน Upload GitHub

นำฟอนต์ของคุณมาใส่ใน `assets/fonts/` และตั้งชื่อ:

- `FCVision-Bold.otf`
- `THSarabunPSK.ttf`
- `PlusJakartaSans-Regular.ttf`

ระบบจะโหลดฟอนต์อัตโนมัติ ไม่มีปุ่ม Load Font

## GitHub Pages

1. Upload โฟลเดอร์ทั้งหมดขึ้น Repository
2. GitHub > Settings > Pages
3. Source: Deploy from a branch
4. Branch: `main` / root
5. Save
6. เปิด URL GitHub Pages ที่ GitHub สร้างให้

## การเก็บข้อมูล

ตัวโปรแกรมอยู่บน GitHub Pages แต่:
- Project / Customer / Serial Number
- รูปภาพ
- Draft
- ลายเซ็น

เก็บใน IndexedDB ของ Browser เครื่องที่ใช้งานเท่านั้น

ดังนั้นข้อมูลในมือถือ A จะไม่ไปปรากฏในมือถือ B อัตโนมัติ

ใช้ `ส่งออก Backup` เพื่อสำรองหรือย้ายข้อมูล

## PDF

ไปที่ Preview > `บันทึก PDF / พิมพ์`

แนะนำ:
- Paper: A4
- Scale: 100%
- Margins: None
- ปิด Header/Footer ของ Browser หากมีตัวเลือก

หน้า Print ถูกกำหนดให้ใช้ A4 210 × 297 mm และรักษา Layout จาก Preview
