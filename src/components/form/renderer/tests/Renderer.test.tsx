import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { render } from "@testing-library/react";
import { ComponentsRenderer } from "..";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";

const TestWrapper = ({ children }: any) => {
  const form = useForm();

  return <FormProvider {...form}>{children}</FormProvider>;
};

describe("Renderer", () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  // Restore console.error after tests
  afterAll(() => {
    console.error = originalError;
  });

  test("throws error when rendering Renderer component", () => {
    expect(() => {
      render(
        <TestWrapper>
          <ComponentsRenderer
            section={{
              component: "control-my-thing-does-not-exist" as any,
              name: "fastly_api_key",
              helperText:
                "Paste the API key you generated in the Fastly dashboard.",
              label: "Fastly API Key",
              schema: yup.string(),
            }}
          />
        </TestWrapper>
      );
    }).toThrow(
      "control-my-thing-does-not-exist does not exist in the Renderer."
    );
  });
});
