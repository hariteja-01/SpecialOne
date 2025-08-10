import { useEffect } from 'react';

const FloatingHearts = () => {
  useEffect(() => {
    const createHeart = () => {
      const heartsContainer = document.querySelector('.floating-hearts');
      if (!heartsContainer) return;

      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.innerHTML = ['💕', '💖', '💗', '💝', '💞'][Math.floor(Math.random() * 5)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
      heart.style.animationDuration = (Math.random() * 3 + 6) + 's';

      heartsContainer.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 9000);
    };

    const interval = setInterval(createHeart, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className="floating-hearts"></div>;
};

export default FloatingHearts;
