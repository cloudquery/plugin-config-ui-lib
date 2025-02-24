import { ReactNode } from 'react';

import { Palette } from '@mui/material/styles';

import dayjs from 'dayjs';

import { SyncLogLevel } from '../types';

export function parseSyncLogsByLevel(logs: string, palette: Palette) {
  const levelColorMap = {
    debug: palette.info.dark,
    error: palette.error.main,
    fatal: palette.error.dark,
    info: palette.text.primary,
    panic: palette.error.dark,
    trace: palette.info.main,
    warn: palette.warning.main,
  };

  return logs
    .replace(/}\s*{/g, '}\n{')
    .split('\n')
    .map((line) => {
      try {
        const { level, time, ...otherProps } = JSON.parse(line) as {
          level: SyncLogLevel;
          time: string;
        };
        const color = levelColorMap[level.toLowerCase() as keyof typeof levelColorMap];

        return {
          logLevel: level.toLowerCase() as SyncLogLevel,
          logLine: (
            <>
              [{dayjs(time).format('YYYY-MM-DD HH:mm:ss:SSS')}] |{' '}
              <span style={{ color }}>{level.toUpperCase().padEnd(5, ' ')}</span> |{' '}
              <span style={{ color, wordBreak: 'break-word' }}>{JSON.stringify(otherProps)}</span>
            </>
          ),
          logText: `${dayjs(time).format('YYYY-MM-DD HH:mm:ss:SSS')} | ${level.toUpperCase().padEnd(5, ' ')} | ${JSON.stringify(otherProps)}`,
        };
      } catch {
        return undefined;
      }
    })
    .filter(Boolean) as { logLevel: SyncLogLevel; logLine: ReactNode; logText: string }[];
}
