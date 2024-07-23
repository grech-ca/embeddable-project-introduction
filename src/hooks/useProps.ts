import { createContext, useContext } from 'preact/compat';

import { WidgetProps } from 'components/Widget';

export const PropsContext = createContext<Partial<WidgetProps>>({});

export const useProps = (): WidgetProps => {
  const props = useContext(PropsContext);

  const textValid = typeof props.text === 'string';
  const authorValid = typeof props.author === 'string';
  const repositoryValid = typeof props.repository === 'string';
  const githubTokenValid = typeof props.githubToken === 'string';

  const propsValid = textValid && authorValid && repositoryValid && githubTokenValid;

  if (!propsValid) throw new Error('Props missing');

  return props as WidgetProps;
};
