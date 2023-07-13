import React, { FC, useEffect, useRef } from 'react';

interface Props<E extends HTMLElement> {
  children: React.ReactElement<{ ref: React.Ref<E> }>;
  durationTime: number;
  afterDelete: boolean;
  afterDeleteDuration: number;
  infinite: boolean;
}

const GorkemTypeWriter: FC<Props<HTMLElement>> = ({
  children,
  durationTime,
  afterDelete,
  afterDeleteDuration,
  infinite,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    let childElements: HTMLElement[] = [];

    if (container && container.children.length === 1) {
      const parentElement = container.children[0] as HTMLDivElement;
      childElements = Array.from(parentElement.children) as HTMLElement[];

      childElements.forEach((element) => {
        const text = element.innerText;
        element.innerText = '';

        const write = (index: number): void => {
          const speed = Math.floor(Math.random() * 40) + 60;
          if (index < text.length) {
            element.innerHTML += text.charAt(index);
            setTimeout(() => write(index + 1), speed);
          } else if (afterDelete) {
            setTimeout(() => del(index - 1), afterDeleteDuration);
          }
        };

        const del = (index: number): void => {
          const speed = Math.floor(Math.random() * 60) + 80;
          if (index >= 0) {
            const chars = element.innerText.split('');
            chars.pop();
            element.innerText = chars.join('');
            setTimeout(() => del(index - 1), speed);
          } else if (infinite) {
            setTimeout(() => write(0), durationTime);
          }
        };

        setTimeout(() => write(0), durationTime);
      });
    }
  }, [afterDelete, afterDeleteDuration, durationTime, infinite]);

  return (
    <div ref={containerRef}>
      {React.cloneElement(children, { ref: containerRef })}
    </div>
  );
};

export default GorkemTypeWriter;
