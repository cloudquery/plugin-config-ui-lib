import Stack from '@mui/system/Stack';
import { SetupGuide } from './setupGuide';
import { RenderGuideProps, RenderGuide } from './setupGuide/section';

/**
 * Renderer for the config guide.
 *
 * @public
 */
export function GuideComponent({
  sections,
  title,
  docsLink,
  pluginUiMessageHandler,
}: {
  sections: RenderGuideProps['sections'];
  title: string;
  docsLink: string;
  pluginUiMessageHandler: any; // TODO: remove after iframe deprecation
}) {
  return (
    <SetupGuide title={title} docsLink={docsLink} pluginUiMessageHandler={pluginUiMessageHandler}>
      <Stack spacing={3}>
        <RenderGuide pluginUiMessageHandler={pluginUiMessageHandler} sections={sections} />
      </Stack>
    </SetupGuide>
  );
}
