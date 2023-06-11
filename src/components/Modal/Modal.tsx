import { FunctionComponent, Fragment } from 'preact';
import { createPortal, useEffect, useRef } from 'preact/compat';

import { Avatar } from 'components/Avatar';
import { Tabs } from 'components/Tabs';
import { CloseButton } from 'components/CloseButton';

import { useEscape } from 'hooks/useEscape';
import { useClickAway } from 'hooks/useClickAway';
import { useRepository } from 'hooks/useRepository';

import { AUTHOR, REPOSITORY_NAME } from '../../constants';

import styles from './Modal.module.scss';

export interface ModalProps {
  onClose: () => void;
  visible?: boolean;
}

export const Modal: FunctionComponent<ModalProps> = ({ onClose, visible = false }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { author } = useRepository(`${AUTHOR}/${REPOSITORY_NAME}`);

  useEscape(onClose);
  const modalOverlayRef = useClickAway<HTMLDivElement>(onClose);

  useEffect(() => {
    const overlay = modalOverlayRef.current;
    const modal = modalRef.current;

    if (overlay && modal && visible) {
      overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500,
        easing: 'ease',
        fill: 'forwards',
      });

      modal.animate([{ transform: 'translateY(50px)' }, { transform: 'translateY(0)' }], {
        duration: 500,
        easing: 'ease',
      });
    }
  }, [visible, modalOverlayRef]);

  return createPortal(
    <div
      class={styles.ModalOverlay}
      ref={modalOverlayRef}
      style={{ display: visible ? undefined : 'none', opacity: 0 }}
    >
      <div class={styles.Modal} ref={modalRef}>
        <CloseButton onClick={onClose} />
        <div class={styles.ModalHeading}>
          {author && (
            <Fragment>
              <Avatar src={author.avatar_url} />
              <p>{author.name}</p>
            </Fragment>
          )}
        </div>
        <Tabs />
      </div>
    </div>,
    document.body,
  );
};