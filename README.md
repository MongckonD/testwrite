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

## ตัวอย่างโค้ดทดสอบ

ไฟล์ `tests/login.spec.js`

```javascript
import { test, expect } from '@playwright/test';

const LOGIN_URL = 'https://practicetestautomation.com/practice-test-login/';

test.beforeEach(async ({ page }) => {
  await page.goto(LOGIN_URL);
});

test('login สำเร็จ แล้ว logout ได้', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).fill('student');
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page).toHaveURL(/logged-in-successfully/);

  await page.getByRole('link', { name: 'Log out' }).click();
  await expect(page).toHaveURL(LOGIN_URL);
});

test('login ด้วยรหัสผ่านผิด ต้องขึ้น error', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).fill('student');
  await page.getByRole('textbox', { name: 'Password' }).fill('wrong-password');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.locator('#error')).toContainText('Your password is invalid!');
});
```

### คำสั่งหลักที่ใช้

| คำสั่ง | หน้าที่ |
|--------|---------|
| `page.goto(url)` | เปิดหน้าเว็บ |
| `getByRole(role, { name })` | หา element จาก role และชื่อที่ผู้ใช้เห็น |
| `locator('#error')` | หา element ด้วย CSS selector (`#` = id, `.` = class) |
| `fill(text)` | ล้างช่องกรอกแล้วพิมพ์ข้อความ |
| `click()` | คลิก |
| `expect(...).toHaveURL(...)` | ตรวจ URL |
| `expect(...).toContainText(...)` | ตรวจว่ามีข้อความอยู่ใน element |
| `test.beforeEach(...)` | รันก่อนทุกเคส |

> `expect` ของ Playwright รอให้เงื่อนไขเป็นจริงอัตโนมัติ (auto-wait) จึงไม่ต้องใส่ `sleep`

## ตัวอย่าง `playwright.config.js`

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

## รันใน CI (GitHub Actions)

ไฟล์ `.github/workflows/playwright.yml`

```yaml
name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## แก้ปัญหาเบื้องต้น

| อาการ | วิธีแก้ |
|-------|---------|
| `Executable doesn't exist` | รัน `npx playwright install` |
| เทสต์ timeout | เช็กอินเทอร์เน็ต หรือเพิ่ม `timeout` ใน config |
| หา element ไม่เจอ | ใช้ `npx playwright codegen <url>` เพื่อดู locator ที่เหมาะสม |
| อยากดูว่าเทสต์พังตรงไหน | รัน `--ui` หรือ `--debug` |

## แนวทางพัฒนาต่อ

- [x] แยกเคส login สำเร็จกับ login ผิดออกเป็นคนละ test
- [ ] เพิ่มเคส username ผิด และเคสกรอกค่าว่าง
- [ ] ใช้ Page Object Model เมื่อเคสเพิ่มขึ้น
- [ ] ย้ายข้อมูลทดสอบ (username/password) ไปไว้ในไฟล์แยกหรือ environment variable
