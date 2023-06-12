import { FunctionComponent } from 'preact';
import { createPortal, useEffect, useRef } from 'preact/compat';

import { Avatar } from 'components/Avatar';
import { Tabs } from 'components/Tabs';
import { CloseButton } from 'components/CloseButton';

import { useEscape } from 'hooks/useEscape';
import { useClickAway } from 'hooks/useClickAway';
import { useData } from 'hooks/useData';

import styles from './Modal.module.scss';

export interface ModalProps {
  onClose: () => void;
  visible?: boolean;
}

export const Modal: FunctionComponent<ModalProps> = ({ onClose, visible = false }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { data } = useData();

  const { author } = data ?? {};

  useEscape(onClose);
  const modalOverlayRef = useClickAway<HTMLDivElement>(onClose);

  const overlay = modalOverlayRef.current;
  const modal = modalRef.current;

  const refsReady = overlay && modal;

  useEffect(() => {
    if (refsReady) {
      if (visible) {
        overlay.style.display = 'flex';
        overlay.scrollTo({ top: 0 });

        overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 500,
          easing: 'ease',
          fill: 'forwards',
        });

        modal.animate([{ transform: 'translateY(50px)' }, { transform: 'translateY(0)' }], {
          duration: 500,
          easing: 'ease',
        });
      } else {
        overlay.style.display = 'none';
      }
    }
  }, [visible, refsReady, overlay, modal]);

  if (!author) return null;

  return createPortal(
    <div class={styles.ModalOverlay} ref={modalOverlayRef}>
      <div class={styles.Modal} ref={modalRef}>
        <div class={styles.ModalHeader}>
          <div class={styles.HeaderLeft}>
            <Avatar src={author.avatar_url} className={styles.ModalAvatar} />
            <p class={styles.AuthorName}>{author.name}</p>
          </div>
          <div class={styles.HeaderRight}>
            <CloseButton onClick={onClose} className={styles.ModalClose} />
            <a
              class={styles.RepositoryLink}
              href={`https://github.com/${import.meta.env.VITE_APP_GH_REPOSITORY}`}
              target="_blank"
              rel="noreferrer"
            >
              Go to repository
            </a>
          </div>
        </div>
        <Tabs />
      </div>
    </div>,
    document.body,
  );
};
