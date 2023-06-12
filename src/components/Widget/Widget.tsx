import { FunctionComponent, Fragment } from 'preact';
import { useEffect, useState, useRef } from 'preact/compat';

import { AnimatedText, AnimatedTextRef } from 'components/AnimatedText';

import { useRepository } from 'hooks/useRepository';

import styles from './Widget.module.scss';
import { CloseButton } from '../CloseButton';
import { Avatar } from '../Avatar/Avatar';
import { Modal } from '../Modal';

export const Widget: FunctionComponent = () => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<AnimatedTextRef>(null);
  const { loading, author } = useRepository();

  const [dismissed, setDismissed] = useState(false);
  const [detailsShown, setDetailsShown] = useState(false);
  const [animatedOnce, setAnimatedOnce] = useState(false);

  const dismiss = () => setDismissed(true);
  const showDetails = () => {
    setDetailsShown(true);
    setAnimatedOnce(true);
  };
  const hideDetails = () => setDetailsShown(false);

  useEffect(() => {
    const element = widgetRef.current;

    if (element && !animatedOnce && !loading) {
      void element
        .animate(
          [
            {
              opacity: 0,
              transform: 'translate(50%, 200%) scale(0.5)',
            },
            {
              opacity: 1,
              transform: 'translate(0, 0) scale(1)',
            },
          ],
          { duration: 500, easing: 'ease', fill: 'forwards' },
        )
        .finished.then(() => {
          void textRef.current?.start().then(() => setAnimatedOnce(true));
        });
    }
  }, [animatedOnce, loading]);

  if (dismissed || loading || !author) return null;

  return (
    <Fragment>
      <Modal onClose={hideDetails} visible={detailsShown} />
      <div
        role="button"
        class={styles.Widget}
        style={{ opacity: animatedOnce ? 1 : 0, display: detailsShown ? 'none' : undefined }}
        onClick={showDetails}
        ref={widgetRef}
      >
        <Avatar src={author.avatar_url} />
        <AnimatedText ref={textRef} shouldAnimate={!animatedOnce}>
          Hi, I’m Mike, and this is my pet project called Tweeter, click the popup to read more
          about it.
        </AnimatedText>
        <CloseButton onClick={dismiss} className={styles.WidgetClose} />
      </div>
    </Fragment>
  );
};
