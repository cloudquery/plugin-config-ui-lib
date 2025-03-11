'use client';

import React, { forwardRef, ReactNode, useCallback, useState } from 'react';

import { Editor, EditorProps, OnMount } from '@monaco-editor/react';
import { Box, CircularProgress, FormControl, FormHelperText, FormLabel } from '@mui/material';
import Stack from '@mui/material/Stack';

import { JSONSchema } from 'monaco-yaml';
import { Controller } from 'react-hook-form';

import type * as Monaco from 'monaco-editor';

type MonacoType = typeof Monaco;
type MonacoEditor = Monaco.editor.IStandaloneCodeEditor;

export interface ControlCodeFieldProps extends Omit<EditorProps, 'value' | 'onChange' | 'onMount'> {
  name: string;
  label?: string;
  helperText?: ReactNode;
  editorRef?: React.MutableRefObject<MonacoEditor | null>;
  onMount?: (editor: MonacoEditor, monaco: MonacoType) => Promise<void> | void;
  yamlSchema?: JSONSchema;
}

export const ControlCodeField = forwardRef<MonacoEditor, ControlCodeFieldProps>(
  ({ onMount, options = {}, yamlSchema, name, label, helperText, ...props }, ref) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleEditorMount: OnMount = useCallback(
      async (editor, monaco) => {
        if (ref) {
          if (typeof ref === 'function') {
            ref(editor);
          } else {
            ref.current = editor;
          }
        }

        monaco.editor.defineTheme('custom-theme', {
          base: 'vs-dark',
          colors: {
            'editor.background': '#15202E',
            'editor.foreground': '#FFFFFF',
          },
          inherit: true,
          rules: [],
        });
        monaco.editor.setTheme('custom-theme');

        if (options.language === 'yaml' && yamlSchema) {
          await import('monaco-yaml').then((yaml) => {
            yaml.configureMonacoYaml(monaco, {
              schemas: [
                {
                  fileMatch: ['*'],
                  schema: yamlSchema,
                  uri: 'inmemory://my-schema.json',
                },
              ],
              validate: false,
            });
          });
        }

        if (onMount) {
          await onMount(editor, monaco);
        }

        setIsLoading(false);
      },
      [onMount, options.language, yamlSchema, ref],
    );

    return (
      <FormControl
        sx={{
          height: '150px',
          minHeight: 0,
          border: '1px solid',
          borderColor: 'neutral.300',
          borderRadius: 1,
          paddingY: 1,
          paddingX: 1.5,
          bgcolor: '#15202E',
        }}
      >
        {!!label && <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>}
        <Controller
          name={name}
          render={({ field, fieldState }) => (
            <>
              {!!helperText && (
                <FormHelperText sx={{ mb: 1.5 }}>
                  {!!fieldState.error?.message && (
                    <Box color="error.main">{fieldState.error?.message}</Box>
                  )}
                  {helperText}
                </FormHelperText>
              )}
              <Stack
                height="100%"
                minHeight={0}
                sx={{
                  position: 'relative',
                  visibility: isLoading ? 'hidden' : 'visible',
                }}
              >
                {isLoading && (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      bottom: 0,
                      left: 0,
                      position: 'absolute',
                      right: 0,
                      top: 0,
                    }}
                  >
                    <CircularProgress />
                  </Stack>
                )}
                <Editor
                  {...props}
                  loading={<CircularProgress />}
                  onChange={(value) => field.onChange(value ?? '')}
                  onMount={handleEditorMount}
                  options={{
                    ...options,
                    automaticLayout: true,
                    scrollbar: {
                      ...options.scrollbar,
                      alwaysConsumeMouseWheel: false,
                    },
                  }}
                  value={field.value}
                />
              </Stack>
            </>
          )}
        />
      </FormControl>
    );
  },
);

ControlCodeField.displayName = 'ControlCodeField';
