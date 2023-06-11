import { FunctionComponent } from 'preact';
import { PropsWithChildren } from 'preact/compat';

import { useTabsContext } from './useTabsContext';
import styles from './Tabs.module.scss';

export interface TabProps extends PropsWithChildren {
  name: string;
}

export const Tab: FunctionComponent<TabProps> = ({ children, name }) => {
  const { activeTab, setActiveTab } = useTabsContext();

  return (
    <button onClick={() => setActiveTab(name)} disabled={name === activeTab} class={styles.Tab}>
      {children}
    </button>
  );
};
