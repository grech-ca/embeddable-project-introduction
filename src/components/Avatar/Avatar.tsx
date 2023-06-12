import { FunctionComponent } from 'preact';
import clsx from 'clsx';

import styles from './Avatar.module.scss';

export interface AvatarProps {
  src?: string;
  className?: string
}

export const Avatar: FunctionComponent<AvatarProps> = ({ src, className }) => {
  return (
    <div class={clsx(styles.AvatarContainer, className)}>
      <img class={styles.AvatarImage} src={src} />
    </div>
  );
};
