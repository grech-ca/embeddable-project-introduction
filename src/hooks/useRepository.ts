import { useEffect, useState, useMemo } from 'preact/compat';

import { Author } from 'types';

const cache = new Map();

export const useRepository = (project: string) => {
  const [author, repository] = useMemo(() => {
    return project.split('/');
  }, [project]);

  const [description, setDescription] = useState<null | string>(null);
  const [authorData, setAuthorData] = useState<null | Author>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cache.has(project)) {
      const data = cache.get(project);

      setDescription(data.description);
      setAuthorData(data.author);
      setLoading(false);
    } else {
      void Promise.all([
        fetch(`https://api.github.com/repos/${author}/${repository}/readme`).then(res =>
          res.json(),
        ),
        fetch(`https://api.github.com/users/${author}`).then(res => res.json()),
      ]).then(([{ content }, author]) => {
        const description = atob(content);

        setDescription(description);
        setAuthorData(author);
        setLoading(false);

        cache.set(project, { author, description })
      });
    }
  }, [author, project, repository]);

  return { author: authorData, description, loading };
};
