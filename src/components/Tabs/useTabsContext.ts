import { useContext } from 'preact/compat';

import { TabsContext } from './TabsProvider';

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  return context;
};
