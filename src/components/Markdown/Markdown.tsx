import ExternalMarkdown, { MarkdownToJSX } from 'markdown-to-jsx';
import { FunctionComponent } from 'preact';
import { PropsWithChildren } from 'preact/compat';

import styles from './Markdown.module.scss';

export const Markdown: FunctionComponent<PropsWithChildren<MarkdownToJSX.Options>> = ({
  children,
  ...props
}) => {
  return (
    <ExternalMarkdown class={styles.Markdown} {...props}>
      {children}
    </ExternalMarkdown>
  );
};
