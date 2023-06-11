import { FunctionComponent } from 'preact';

import closeIcon from '../../assets/close-icon.svg';

import styles from './CloseButton.module.scss';

export interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton: FunctionComponent<CloseButtonProps> = ({ onClick }) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button onClick={handleClick} class={styles.CloseButton}>
      <img src={closeIcon} alt="&times;" />
    </button>
  );
};
