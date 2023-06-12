import { useEffect, useState } from 'preact/compat';

import { Author, Readme } from 'types';

const cache = new Map<string, { author: Author; description: string }>();

export const useRepository = () => {
  const [description, setDescription] = useState<null | string>(null);
  const [authorData, setAuthorData] = useState<null | Author>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { VITE_APP_GH_TOKEN, VITE_APP_GH_AUTHOR, VITE_APP_GH_REPOSITORY } = import.meta.env;

    const data = cache.get(VITE_APP_GH_REPOSITORY);
    if (data) {
      setDescription(data.description);
      setAuthorData(data.author);
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
      ]).then(([{ content }, author]: [Readme, Author]) => {
        const description = atob(content);

        setDescription(description);
        setAuthorData(author);
        setLoading(false);

        cache.set(GH_TOKEN, { author, description });
      });
    }
  }, []);

  return { author: authorData, description, loading };
};
