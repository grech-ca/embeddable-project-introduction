import { FunctionComponent } from 'preact';

import { Markdown } from 'components/Markdown';

import { useData } from 'hooks/useData';

import styles from './Tabs.module.scss';
import { Tab } from './Tab';
import { TabsProvider } from './TabsProvider';
import { TabContent } from './TabContent';

export const Tabs: FunctionComponent = () => {
  const { data } = useData();

  const { projectDescription, authorDescription } = data ?? {};

  return (
    <TabsProvider>
      <div class={styles.Tabs}>
        <Tab name="project">Description</Tab>
        <Tab name="author">About me</Tab>
      </div>
      <div>
        <TabContent name="project">
          {projectDescription && <Markdown>{projectDescription}</Markdown>}
        </TabContent>
        <TabContent name="author">
          {authorDescription && <Markdown>{authorDescription}</Markdown>}
        </TabContent>
      </div>
    </TabsProvider>
  );
};
