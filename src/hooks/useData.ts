import { useEffect, useState } from 'preact/compat';

import { Author, Readme } from 'types';

export interface AppData {
  authorDescription: string;
  projectDescription: string;
  author: Author;
}

const cache = new Map<string, AppData>();

export const useData = () => {
  const [data, setData] = useState<null | AppData>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { VITE_APP_GH_TOKEN, VITE_APP_GH_AUTHOR, VITE_APP_GH_REPOSITORY } = import.meta.env;

    const data = cache.get(VITE_APP_GH_REPOSITORY);
    if (data) {
      setData(data);
      setLoading(false);
    } else {
      const fetchConfig: RequestInit = {
        headers: {
          Authorization: `Bearer ${VITE_APP_GH_TOKEN}`,
        },
      };

      void Promise.all([
        fetch(`https://api.github.com/repos/${VITE_APP_GH_REPOSITORY}/readme`, fetchConfig).then(
          res => res.json(),
        ),
        fetch(`https://api.github.com/users/${VITE_APP_GH_AUTHOR}`, fetchConfig).then(res =>
          res.json(),
        ),
        fetch(
          `https://api.github.com/repos/${VITE_APP_GH_AUTHOR}/${VITE_APP_GH_AUTHOR}/readme`,
          fetchConfig,
        ).then(res => res.json()),
      ]).then(([projectReadme, author, authorReadme]: [Readme, Author, Readme]) => {
        function b64_to_utf8(str: string) {
          return decodeURIComponent(escape(window.atob(str)));
        }

        const projectDescription = b64_to_utf8(projectReadme.content);
        const authorDescription = b64_to_utf8(authorReadme.content);

        setData({ projectDescription, authorDescription, author });
        setLoading(false);

        cache.set(VITE_APP_GH_TOKEN, { author, projectDescription, authorDescription });
      });
    }
  }, []);

  return { data, loading };
};
