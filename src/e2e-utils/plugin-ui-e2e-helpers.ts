import { expect, Frame, Page, test } from '@playwright/test';

import { click, fillInput, getMainTestUser } from './e2e-helpers';

export const getPersistentName = () => `name-${Math.random().toString(36).slice(2, 12)}`;

type CreatePluginControlOpts = {
  page: Page;
  kind: 'source' | 'destination';
  pluginName: string;
  pluginLabel: string;
  pluginNewName: string;
  fillFieldsSteps?: (iframeElement: Frame) => Promise<void>;
};

interface EditPluginControlOpts extends CreatePluginControlOpts {
  pluginUrl: string;
}

export const login = async (page: Page) => {
  await page.goto('https://cloud.cloudquery.io/auth/login');

  const { email, password } = getMainTestUser();

  await page.getByLabel('Email Address').click();
  await page.getByLabel('Email Address').fill(email);

  await page.locator(String.raw`button[type="submit"]`).click();

  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(password);

  await page.locator(String.raw`button[type="submit"]`).click();

  await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible({
    timeout: 5000,
  });
};

export const createPlugin = async ({
  page,
  kind,
  pluginName,
  pluginNewName,
  pluginLabel,
  fillFieldsSteps,
}: CreatePluginControlOpts): Promise<string> => {
  test.setTimeout(300_000);
  await page.goto(getRootUrl());

  await expect(page.getByText(`Create a ${kind}`)).toBeVisible();

  await page.locator('input[type="text"]').clear();
  await page.locator('input[type="text"]').fill(pluginName);

  await click(page, page.getByRole('button', { name: pluginLabel }));

  await expect(page.getByText(pluginLabel)).toBeTruthy();
  await expect(page.locator('iframe[name="Plugin UI"]')).toBeVisible({
    timeout: 30_000,
  });
  await expect(page.getByText('Previewing')).toBeVisible();

  const iframeElement = page.frame({ name: 'Plugin UI' });

  if (!iframeElement) {
    throw new Error('iframe not found');
  }

  await fillInput(iframeElement, '[name="displayName"]', pluginNewName);
  await fillFieldsSteps?.(iframeElement);

  await click(iframeElement, iframeElement.getByRole('button', { name: 'Test connection' }));
  await expect(iframeElement.locator('button:has-text("Cancel test")')).toBeTruthy();
  await expect(page.getByText(`Edit ${kind}`)).toBeVisible({
    timeout: 30_000,
  });

  return page.url();
};

export const editPlugin = async ({
  page,
  kind,
  pluginNewName,
  pluginName,
  pluginLabel,
  fillFieldsSteps,
  pluginUrl,
}: EditPluginControlOpts) => {
  test.setTimeout(300_000);
  await page.goto(getRootUrl());

  await expect(page.getByText(`Create a ${kind}`)).toBeVisible();

  await page.locator('input[type="text"]').clear();
  await page.locator('input[type="text"]').fill(pluginName);

  await click(page, page.getByRole('button', { name: pluginLabel }));
  await expect(page.getByText('Previewing')).toBeVisible({ timeout: 3000 });

  await page.goto(getPluginUrl(pluginUrl));

  await expect(page.getByText(pluginNewName)).toBeTruthy();
  await page.getByRole('tab', { name: `Edit ${kind}` }).click();
  await expect(page.locator('iframe[name="Plugin UI"]')).toBeVisible({
    timeout: 30_000,
  });
  await expect(page.getByText('Previewing')).toBeVisible();

  const iframeElement = page.frame({ name: 'Plugin UI' });

  if (!iframeElement) {
    throw new Error('iframe not found');
  }

  await expect(
    iframeElement.getByRole('textbox', {
      name: `${kind === 'destination' ? 'Destination' : 'Source'} name`,
    }),
  ).toHaveValue(pluginNewName);

  await fillFieldsSteps?.(iframeElement);

  await click(iframeElement, iframeElement.getByRole('button', { name: 'Test connection' }));
  await expect(iframeElement.locator('button:has-text("Cancel test")')).toBeTruthy();
  await expect(page.getByText(`Edit ${kind}`)).toBeVisible({
    timeout: 30_000,
  });
};

export const deletePlugin = async ({
  page,
  kind,
  pluginNewName,
  pluginName,
  pluginLabel,
  pluginUrl,
}: EditPluginControlOpts) => {
  test.setTimeout(300_000);
  await page.goto(getRootUrl());

  await expect(page.getByText(`Create a ${kind}`)).toBeVisible();

  await page.locator('input[type="text"]').clear();
  await page.locator('input[type="text"]').fill(pluginName);

  await click(page, page.getByRole('button', { name: pluginLabel }));
  await expect(page.getByText('Previewing')).toBeVisible({ timeout: 3000 });

  await page.goto(getPluginUrl(pluginUrl));

  await expect(page.getByText(pluginNewName)).toBeTruthy();
  await page.getByRole('tab', { name: `Edit ${kind}` }).click();
  await expect(page.locator('iframe[name="Plugin UI"]')).toBeVisible({
    timeout: 30_000,
  });
  await expect(page.getByText('Previewing')).toBeVisible();

  const iframeElement = page.frame({ name: 'Plugin UI' });

  if (!iframeElement) {
    throw new Error('iframe not found');
  }

  await expect(
    iframeElement.getByRole('textbox', {
      name: `${kind === 'destination' ? 'Destination' : 'Source'} name`,
    }),
  ).toHaveValue(pluginNewName);

  await iframeElement.getByRole('button', { name: `Delete this ${kind}` }).click();
  await click(page, page.getByText(`Delete ${kind}`));

  await expect(page.getByText(pluginNewName)).toHaveCount(0);
};

export function getRootUrl() {
  return process.env.CQ_CI_PLAYWRIGHT_PREVIEW_LINK
    ? process.env.CQ_CI_PLAYWRIGHT_PREVIEW_LINK.replace('cloudquery-test', 'cq-bot-team')
    : 'https://cloud.cloudquery.io';
}

export function getPluginUrl(url: string) {
  return process.env.CQ_CI_PLAYWRIGHT_PREVIEW_LINK
    ? `${url}?${process.env.CQ_CI_PLAYWRIGHT_PREVIEW_LINK.split('?')[1]}`
    : url;
}