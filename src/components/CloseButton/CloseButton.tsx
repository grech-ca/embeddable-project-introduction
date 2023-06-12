import { FunctionComponent } from 'preact';
import clsx from 'clsx';

import closeIcon from '../../assets/close-icon.svg';

import styles from './CloseButton.module.scss';

export interface CloseButtonProps {
  onClick: () => void;
  className?: string;
}

export const CloseButton: FunctionComponent<CloseButtonProps> = ({ onClick, className }) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button onClick={handleClick} class={clsx(styles.CloseButton, className)}>
      <img src={closeIcon} alt="&times;" />
    </button>
  );
};
