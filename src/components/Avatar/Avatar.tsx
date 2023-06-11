import { FunctionComponent } from 'preact';
import { useState } from 'preact/compat';

import styles from './Avatar.module.scss';

export interface AvatarProps {
  src?: string;
}

export const Avatar: FunctionComponent<AvatarProps> = ({ src }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div class={styles.AvatarContainer}>
      <img class={styles.AvatarImage} src={src} />
    </div>
  );
};
