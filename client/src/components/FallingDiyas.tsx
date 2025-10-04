import { useEffect, useState } from 'react';

interface Diya {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
}

export function FallingDiyas() {
  const [diyas, setDiyas] = useState<Diya[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Only show animation on first load
    if (hasAnimated) return;

    const createDiyas = () => {
      const newDiyas: Diya[] = [];
      
      for (let i = 0; i < 15; i++) {
        newDiyas.push({
          id: i,
          x: Math.random() * 100,
          y: -10 - Math.random() * 20,
          size: 32 + Math.random() * 20, // bigger emoji size
          delay: 1,
          duration: 3 + Math.random() * 2,
          rotation: 0, // no rotation - keep diyas upright
        });
      }
      
      setDiyas(newDiyas);
      setHasAnimated(true);
    };

    // Start animation after a short delay
    const timer = setTimeout(createDiyas, 10);
    
    return () => clearTimeout(timer);
  }, [hasAnimated]);

  if (!diyas.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {diyas.map((diya) => (
        <div
          key={diya.id}
          className="absolute animate-falling-diya"
          style={{
            left: `${diya.x}%`,
            top: `${diya.y}%`,
            animationDuration: `${diya.duration}s`,
            fontSize: `${diya.size}px`,
          }}
        >
          <span className="drop-shadow-lg">🪔</span>
        </div>
      ))}
    </div>
  );
}
