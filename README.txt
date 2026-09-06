V9 FONT FIX

อัปโหลด 3 ไฟล์นี้ทับที่ root ของ GitHub repository:
- index.html
- font-test.html
- sw.js

V9 เปลี่ยน:
- TH SarabunPSK โหลดอัตโนมัติจาก SarabunConsortium บน GitHub
- Plus Jakarta Sans โหลดอัตโนมัติจาก official PlusJakartaSans repository
- FC Vision ยังใช้ assets/fonts/FCVision-Bold.otf ใน repository ของคุณ
- Service Worker จะ cache TH SarabunPSK และ Plus Jakarta Sans หลังโหลดสำเร็จ เพื่อช่วยการใช้งาน offline ครั้งถัดไป

หลัง GitHub Pages Deploy ให้เปิด /font-test.html แล้วกด Ctrl+Shift+R
