import { FunctionComponent } from 'preact';

import { Markdown } from 'components/Markdown';

import { useRepository } from 'hooks/useRepository';

import styles from './Tabs.module.scss';
import { Tab } from './Tab';
import { TabsProvider } from './TabsProvider';
import { TabContent } from './TabContent';

export const Tabs: FunctionComponent = () => {
  const { description } = useRepository();

  return (
    <TabsProvider>
      <div class={styles.Tabs}>
        <Tab name="project">Description</Tab>
        <Tab name="author">About me</Tab>
      </div>
      <div>
        <TabContent name="project">{description && <Markdown>{description}</Markdown>}</TabContent>
        <TabContent name="author">Author</TabContent>
      </div>
    </TabsProvider>
  );
};
