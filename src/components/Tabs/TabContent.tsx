import { Fragment, FunctionComponent } from 'preact';
import { PropsWithChildren } from 'preact/compat';

import { useTabsContext } from './useTabsContext';

export interface TabContentProps extends PropsWithChildren {
  name: string;
}

export const TabContent: FunctionComponent<TabContentProps> = ({ children, name }) => {
  const { activeTab } = useTabsContext();

  if (name !== activeTab) return null;

  return <Fragment>{children}</Fragment>;
};
