import { expect, Frame, Page, test } from '@playwright/test';

import { click, fillInput, getMainTestUser } from './e2e-helpers';

export const getPersistentName = () => `name-${Math.random().toString(36).slice(2, 12)}`;

type CreatePluginControlOpts = {
  page: Page;
  kind: 'source' | 'destination';
  /**
   * @deprecated - This property is no longer used in the test functions. It is the api identifier
   * for the plugin (ie. `google-search-console`)
   */
  pluginName?: string;
  /**
   * User readable label of the plugin (ie. 'Google Search Console' for 'google-search-console')
   */
  pluginLabel: string;
  /**
   * Desired user input for the `Source name` or `Destination name` input field.
   */
  pluginNewName: string;
  fillFieldsSteps?: (iframeElement: Frame) => Promise<void>;
};

interface EditPluginControlOpts extends CreatePluginControlOpts {
  pluginUrl: string;
}

export const clickSubmit = async (context: Page | Frame) =>
  await click(context, context.locator(String.raw`button[type="submit"]`));

export const login = async (page: Page) => {
  await page.goto('https://cloud.cloudquery.io/auth/login');

  const { email, password } = getMainTestUser();

  await fillInput(page, page.getByLabel('Email Address'), email);

  await clickSubmit(page);

  await fillInput(page, page.getByLabel('Password'), password);

  await clickSubmit(page);

  await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
};

export const createPlugin = async ({
  page,
  kind,
  pluginNewName,
  pluginLabel,
  fillFieldsSteps,
}: CreatePluginControlOpts): Promise<string> => {
  test.setTimeout(300_000);
  await page.goto(getRootUrl());

  await expect(page.getByRole('heading', { name: `Create a ${kind}` })).toBeVisible();

  await fillInput(page, 'input[type="text"]', pluginLabel);

  await click(page, page.getByRole('button', { name: pluginLabel }).first());

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

  await clickSubmit(iframeElement);

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
  pluginLabel,
  fillFieldsSteps,
  pluginUrl,
}: EditPluginControlOpts) => {
  test.setTimeout(300_000);
  await page.goto(getRootUrl());

  await expect(page.getByRole('heading', { name: `Create a ${kind}` })).toBeVisible();

  await fillInput(page, 'input[type="text"]', pluginLabel);

  await click(page, page.getByRole('button', { name: pluginLabel }).first());
  await expect(page.getByText('Previewing')).toBeVisible();

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

  await clickSubmit(iframeElement);

  await expect(iframeElement.locator('button:has-text("Cancel test")')).toBeTruthy();
  await expect(page.getByText(`Edit ${kind}`)).toBeVisible({
    timeout: 30_000,
  });
};

export const deletePlugin = async ({
  page,
  kind,
  pluginNewName,
  pluginLabel,
  pluginUrl,
}: EditPluginControlOpts) => {
  test.setTimeout(300_000);
  await page.goto(getRootUrl());

  await expect(page.getByRole('heading', { name: `Create a ${kind}` })).toBeVisible();

  await fillInput(page, 'input[type="text"]', pluginLabel);

  await click(page, page.getByRole('button', { name: pluginLabel }).first());
  await expect(page.getByText('Previewing')).toBeVisible();

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

  await iframeElement.getByRole('button', { name: `Delete ${kind}` }).click();
  await click(page, page.getByText(`Delete ${kind}`));

  await expect(page.getByText(pluginNewName)).toHaveCount(0, { timeout: 15_000 });
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
