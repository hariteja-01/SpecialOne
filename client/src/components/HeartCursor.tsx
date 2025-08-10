import { useState, useEffect } from 'react';

const HeartCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', updateCursor);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
    };
  }, []);

  return (
    <div
      className="heart-cursor"
      style={{
        left: position.x + 'px',
        top: position.y + 'px',
      }}
    >
      💖
    </div>
  );
};

export default HeartCursor;
