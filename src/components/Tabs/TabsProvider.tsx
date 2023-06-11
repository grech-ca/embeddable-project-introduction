import { FunctionComponent } from 'preact';
import { PropsWithChildren, createContext, useState } from 'preact/compat';

export interface ITabsContext {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TabsContext = createContext<ITabsContext>({
  activeTab: 'project',
  setActiveTab: () => null,
});

export const TabsProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('project');

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>
  );
};
