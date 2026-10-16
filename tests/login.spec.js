import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/?fbclid=IwY2xjawU_J8pleHRuA2FlbQIxMABwZG9mBWJyaWQRMWhFQjc4d2NkQkRTNlJSeUlzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeDOlpGU-Av3o0PNQtJ4rZ0t1m4gCkOglHb6D7iS0QMbOaESgOU3eFkibQDzA_aem_zmUiKCkYd0aKrU43D0wK0g');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('student');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');

await page.getByRole('link', { name: 'Log out' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('student');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('hhrjhtdjthsgtsg');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#error')).toContainText('Your password is invalid!');
});