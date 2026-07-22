import React, { useState, useEffect, useRef } from 'react';
import styles from './SplashScreen.module.css';

interface SplashScreenProps {
  visible: boolean;
  onComplete: () => void;
  duration?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  visible,
  onComplete,
  duration = 3200,
}) => {
  const [svgHtml, setSvgHtml] = useState<string>('');
  const [phase, setPhase] = useState<'idle' | 'drawing' | 'done'>('idle');
  const svgRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  // Fetch SVG once
  useEffect(() => {
    fetch('/NilkanthEnterprise.svg')
      .then((res) => res.text())
      .then((text) => setSvgHtml(text));
  }, []);

  // Animate when visible
  useEffect(() => {
    if (!visible || !svgHtml) return;
    clearTimers();
    setPhase('idle');

    const t1 = setTimeout(() => {
      const container = svgRef.current;
      if (!container) return;

      const path = container.querySelector('path');
      if (!path) return;

      const length = path.getTotalLength();

      // Reset
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.fill = 'transparent';
      path.style.transition = 'none';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          path.style.transition = `
            stroke-dashoffset 1.6s cubic-bezier(0.65, 0, 0.35, 1) 0.15s,
            fill 0.9s ease-in-out 1.5s
          `;
          path.style.strokeDashoffset = '0';
          path.style.fill = '#5d4037';
          setPhase('drawing');
        });
      });
    }, 100);

    const t2 = setTimeout(() => {
      setPhase('done');
    }, 2200);

    const t3 = setTimeout(() => {
      onComplete();
    }, duration);

    timersRef.current = [t1, t2, t3];

    return clearTimers;
  }, [visible, svgHtml, onComplete, duration]);

  return (
    <div className={`${styles.overlay} ${!visible ? styles.hidden : ''}`}>
      <div className={styles.content}>
        <div
          ref={svgRef}
          className={styles.svgWrapper}
          dangerouslySetInnerHTML={{ __html: svgHtml }}
        />
        <p className={`${styles.tagline} ${phase === 'done' ? styles.taglineVisible : ''}`}>
          Premium Furniture Craftsmen
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
