import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import DownloadIcon from '@mui/icons-material/Download';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import useTheme from '@mui/material/styles/useTheme';
import Typography from '@mui/material/Typography';

import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import { SyncLogLevel } from '../../../types';

interface Props {
  id: string;
  logs: { logLevel: SyncLogLevel; logLine: ReactNode; logText: string }[];
}

const LOG_LEVEL_ORDER: Record<SyncLogLevel, number> = {
  [SyncLogLevel.DEBUG]: 0,
  [SyncLogLevel.INFO]: 1,
  [SyncLogLevel.WARNING]: 2,
  [SyncLogLevel.ERROR]: 3,
};

const INDENT_SIZE = '3em';

export function TestConnectionLogs({ id, logs }: Props) {
  const { typography } = useTheme();
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [logLevelFilter, setLogLevelFilter] = useState<SyncLogLevel>(SyncLogLevel.DEBUG);
  const [shouldFollowOutput, setShouldFollowOutput] = useState(true);
  const userScrolledRef = useRef(false);

  const filteredLogs = useMemo(
    () =>
      logs.filter(({ logLevel }) => LOG_LEVEL_ORDER[logLevel] >= LOG_LEVEL_ORDER[logLevelFilter]),
    [logs, logLevelFilter],
  );

  const handleVirtuosoScrollerRef = useCallback((ref: HTMLElement | null | Window) => {
    if (ref) {
      ref.addEventListener('wheel', () => {
        userScrolledRef.current = true;
      });
      ref.addEventListener('touchstart', () => {
        userScrolledRef.current = true;
      });
    }
  }, []);

  const handleBottomStateChange = useCallback((atBottom: boolean) => {
    if (userScrolledRef.current) {
      setShouldFollowOutput(atBottom);

      if (atBottom) {
        userScrolledRef.current = false;
      }
    }
  }, []);

  const handleDownloadLogs = () => {
    const content = filteredLogs.map((log) => log.logText).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${id}-logs.txt`;
    document.body.append(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (virtuosoRef.current && shouldFollowOutput) {
      virtuosoRef.current.scrollToIndex(filteredLogs.length - 1);
    }
  }, [filteredLogs, shouldFollowOutput]);

  return (
    <Stack
      alignItems="flex-start"
      borderRadius={1}
      flex="1 1 0"
      fontFamily={typography.fontFamilyAzeretMono}
      fontSize={13}
      height="100%"
      minHeight={50}
      paddingY={1.5}
      spacing={4}
      width="100%"
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        gap={2}
        flexWrap="wrap"
        width="100%"
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-start"
          gap={0.5}
          flexWrap="wrap"
        >
          <MenuItem
            color="secondary"
            onClick={() => setLogLevelFilter(SyncLogLevel.DEBUG)}
            selected={logLevelFilter === SyncLogLevel.DEBUG}
            sx={{ fontWeight: 700, paddingY: 0.5 }}
          >
            <Typography noWrap={true} variant="body2">
              All logs
            </Typography>
          </MenuItem>
          <MenuItem
            color="secondary"
            onClick={() => setLogLevelFilter(SyncLogLevel.INFO)}
            selected={logLevelFilter === SyncLogLevel.INFO}
            sx={{ paddingY: 0.5 }}
          >
            <Typography noWrap={true} variant="body2">
              <Box component="span" fontWeight={700}>
                Info
              </Box>{' '}
              and higher
            </Typography>
          </MenuItem>
          <MenuItem
            color="secondary"
            onClick={() => setLogLevelFilter(SyncLogLevel.WARNING)}
            selected={logLevelFilter === SyncLogLevel.WARNING}
            sx={{ paddingY: 0.5 }}
          >
            <Typography noWrap={true} variant="body2">
              <Box component="span" fontWeight={700}>
                Warning
              </Box>{' '}
              and higher
            </Typography>
          </MenuItem>
          <MenuItem
            color="secondary"
            onClick={() => setLogLevelFilter(SyncLogLevel.ERROR)}
            selected={logLevelFilter === SyncLogLevel.ERROR}
            sx={{ paddingY: 0.5 }}
          >
            Error
          </MenuItem>
        </Stack>
        {filteredLogs.length > 0 && (
          <Button
            color="inherit"
            onClick={handleDownloadLogs}
            size="small"
            startIcon={<DownloadIcon />}
            sx={{ flexShrink: 0 }}
            variant="contained"
          >
            Download Logs
          </Button>
        )}
      </Stack>
      <Box flex="1 1 0" minHeight={0} width="100%">
        <Virtuoso
          ref={virtuosoRef}
          atBottomStateChange={handleBottomStateChange}
          followOutput={false}
          initialTopMostItemIndex={filteredLogs.length - 1}
          itemContent={(index) => {
            const { logLine } = filteredLogs[index];

            return (
              <div
                key={index}
                style={{
                  paddingLeft: INDENT_SIZE,
                  textIndent: `-${INDENT_SIZE}`,
                  width: '100%',
                }}
              >
                {logLine}
              </div>
            );
          }}
          scrollerRef={handleVirtuosoScrollerRef}
          style={{ flex: '1 1 auto', minHeight: 0 }}
          totalCount={filteredLogs.length}
        />
      </Box>
    </Stack>
  );
}
