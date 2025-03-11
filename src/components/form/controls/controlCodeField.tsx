'use client';

import React, { forwardRef, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { Editor, EditorProps, loader, OnMount } from '@monaco-editor/react';
import { Box, CircularProgress, FormControl, FormHelperText, FormLabel } from '@mui/material';
import Stack from '@mui/material/Stack';

import * as monaco from 'monaco-editor';
import { configureMonacoYaml, JSONSchema } from 'monaco-yaml';
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
    const [initialized, setInitialized] = useState(false);
    const disposeRef = useRef<() => void>();

    useEffect(() => {
      loader.config({ monaco });

      setInitialized(true);
    }, []);

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

        if (props.language === 'yaml' && yamlSchema) {
          const { dispose } = configureMonacoYaml(monaco, {
            schemas: [
              {
                fileMatch: ['*'],
                schema: yamlSchema,
                uri: 'inmemory://my-schema.json',
              },
            ],
            validate: false,
          });
          disposeRef.current = dispose;
        }

        if (onMount) {
          await onMount(editor, monaco);
        }

        setIsLoading(false);
      },
      [onMount, props.language, yamlSchema, ref],
    );

    useEffect(() => {
      return () => {
        disposeRef.current?.();
      };
    }, []);

    const Loader = () => (
      <Stack width="100%" alignItems="center" justifyContent="center" padding={2}>
        <CircularProgress />
      </Stack>
    );

    if (!initialized) {
      return <Loader />;
    }

    return (
      <FormControl
        sx={{
          height: '300px',
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
                {isLoading && <Loader />}
                <Editor
                  {...props}
                  loading={<Loader />}
                  onChange={(value) => field.onChange(value ?? '')}
                  onMount={handleEditorMount}
                  options={{
                    automaticLayout: true,
                    minimap: {
                      enabled: false,
                    },
                    quickSuggestions: true,
                    suggestOnTriggerCharacters: true,
                    lineNumbers: 'off',
                    folding: false,
                    lineDecorationsWidth: 0,
                    lineNumbersMinChars: 0,
                    glyphMargin: false,
                    scrollbar: {
                      alwaysConsumeMouseWheel: false,
                    },
                    ...options,
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
