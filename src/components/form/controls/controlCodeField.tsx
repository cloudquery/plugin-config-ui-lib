'use client';
import React, { forwardRef, ReactNode, useCallback, useEffect, useState } from 'react';

import { Editor, EditorProps, OnMount, loader } from '@monaco-editor/react';
import { Box, CircularProgress, FormControl, FormHelperText, FormLabel } from '@mui/material';
import Stack from '@mui/material/Stack';
import useTheme from '@mui/material/styles/useTheme';

import monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker';
import { configureMonacoYaml } from 'monaco-yaml';

import { Controller } from 'react-hook-form';

import type * as Monaco from 'monaco-editor';

type MonacoType = typeof Monaco;
type MonacoEditor = Monaco.editor.IStandaloneCodeEditor;

export interface ControlCodeFieldProps extends Omit<EditorProps, 'value' | 'onChange' | 'onMount'> {
  name: string;
  label?: string;
  helperText?: ReactNode;
  editorRef?: React.MutableRefObject<MonacoEditor | null>;
  onMount?: (
    editor: MonacoEditor,
    monaco: MonacoType,
    configureYaml: typeof configureMonacoYaml,
  ) => Promise<void> | void;
  handleAdditionalWorkers?: (workerId: string) => Worker | Promise<Worker> | null;
}

export const ControlCodeField = forwardRef<MonacoEditor, ControlCodeFieldProps>(
  ({ onMount, options = {}, handleAdditionalWorkers, name, label, helperText, ...props }, ref) => {
    const { palette } = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [monacoInstance, setMonacoInstance] = useState<MonacoType | null>(null);

    const initMonaco = useCallback(async () => {
      try {
        loader.config({ monaco });

        window.MonacoEnvironment = {
          getWorker: async (_, label) => {
            if (label !== 'editorWorkerService' && handleAdditionalWorkers) {
              const worker = await handleAdditionalWorkers(label);
              if (worker) return worker;
            }

            return new editorWorker();
          },
        };

        setMonacoInstance(monaco);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to initialize Monaco:', error);
      }
    }, [handleAdditionalWorkers]);

    useEffect(() => {
      initMonaco();
    }, [initMonaco]);

    const handleEditorMount: OnMount = useCallback(
      async (editor, monaco) => {
        if (ref) {
          if (typeof ref === 'function') {
            ref(editor);
          } else {
            ref.current = editor;
          }
        }

        if (monacoInstance?.editor) {
          monacoInstance.editor.defineTheme('custom-theme', {
            base: 'vs-dark',
            colors: {
              'editor.background': palette.background.paper,
              'editor.foreground': palette.text.primary,
            },
            inherit: true,
            rules: [],
          });
          monacoInstance.editor.setTheme('custom-theme');
        }

        if (onMount) {
          await onMount(editor, monaco, configureMonacoYaml);
        }

        setIsLoading(false);
      },
      [monacoInstance, onMount, palette.background.paper, palette.text.primary, ref],
    );

    if (!monacoInstance) {
      return <CircularProgress />;
    }

    return (
      <FormControl>
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
