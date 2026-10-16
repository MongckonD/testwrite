# Playwright Login Test

ชุดทดสอบอัตโนมัติ (E2E) สำหรับหน้า Login ของ [Practice Test Automation](https://practicetestautomation.com/practice-test-login/) ด้วย [Playwright](https://playwright.dev/)

## สิ่งที่ทดสอบ

| # | เคสทดสอบ | ผลที่คาดหวัง |
|---|----------|--------------|
| 1 | Login ด้วย `student` / `Password123` | URL เปลี่ยนเป็นหน้า `logged-in-successfully` |
| 2 | กด Log out | กลับมาหน้า login |
| 3 | Login ด้วยรหัสผ่านผิด | ขึ้นข้อความ `Your password is invalid!` |

## สิ่งที่ต้องมี

- [Node.js](https://nodejs.org/) เวอร์ชัน 18 ขึ้นไป
- npm

## การติดตั้ง

```bash
npm install
npx playwright install
```

## การรันเทสต์

```bash
# รันทั้งหมด (headless)
npx playwright test

# รันแบบเห็นหน้าเบราว์เซอร์
npx playwright test --headed

# รันแบบ UI mode (ดีบักง่าย)
npx playwright test --ui

# รันเฉพาะไฟล์
npx playwright test tests/login.spec.js

# เปิดรายงานผล
npx playwright show-report
```

## โครงสร้างโปรเจกต์

```
.
├── tests/
│   └── login.spec.js        # เคสทดสอบ login
├── playwright.config.js     # ตั้งค่า Playwright
├── package.json
└── README.md
```

## ข้อมูลที่ใช้ทดสอบ

| รายการ | ค่า |
|--------|-----|
| Username | `student` |
| Password (ถูก) | `Password123` |
| Password (ผิด) | ค่าใดก็ได้ที่ไม่ใช่ `Password123` |

> เว็บนี้เป็นเว็บสำหรับฝึกทดสอบโดยเฉพาะ บัญชีข้างต้นเป็นข้อมูลสาธารณะที่เว็บเตรียมไว้ให้

## แนวทางพัฒนาต่อ

- แยกเคส login สำเร็จกับ login ผิดออกเป็นคนละ test
- เพิ่มเคส username ผิด และเคสกรอกค่าว่าง
- ใช้ Page Object Model เมื่อเคสเพิ่มขึ้น
- รันใน CI (เช่น GitHub Actions)

