import React, { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useWheelStore } from '../store/wheelStore';
import { ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

const SPIN_DURATION = 5;
const MIN_ROTATIONS = 5;
const MAX_ROTATIONS = 10;

export const Wheel: React.FC = () => {
  const controls = useAnimation();
  const lastRotation = useRef(0);
  const { 
    challenges,
    isSpinning,
    spinType,
    setSpinning,
    setSelectedChallenge,
    unlockChallenges
  } = useWheelStore();

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const spinWheel = async () => {
    if (isSpinning) return;

    unlockChallenges();
    setSpinning(true);

    const segmentAngle = 360 / challenges.length;
    const randomSegment = Math.floor(Math.random() * challenges.length);
    
    // Calculate the target angle to align the selected segment with the pointer
    const targetAngle = 360 - (randomSegment * segmentAngle) - (segmentAngle / 2);
    const rotations = MIN_ROTATIONS + Math.random() * (MAX_ROTATIONS - MIN_ROTATIONS);
    const totalRotation = rotations * 360 + targetAngle;

    // Add the previous rotation to ensure continuous spinning
    const finalRotation = lastRotation.current + totalRotation;
    lastRotation.current = finalRotation;

    await controls.start({
      rotate: finalRotation,
      transition: {
        duration: SPIN_DURATION,
        ease: [0.2, 0.8, 0.2, 1],
      }
    });

    setSelectedChallenge(challenges[randomSegment]);
    setSpinning(false);
    
    if (!challenges[randomSegment].isLocked) {
      triggerConfetti();
    }
  };

  const segmentAngle = 360 / challenges.length;

  const getSpinTypeGradient = () => {
    switch (spinType) {
      case 'follow':
        return 'from-blue-400 to-purple-500';
      case 'sub':
        return 'from-green-400 to-emerald-600';
      case 'donation':
        return 'from-yellow-400 to-orange-500';
    }
  };

  return (
    <div className={`p-12 rounded-xl bg-gradient-to-br ${getSpinTypeGradient()}`}>
      <div className="relative w-[600px] h-[600px]">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
          <ChevronDown className="text-white w-16 h-16 drop-shadow-lg" />
          <div className="w-4 h-4 bg-white rounded-full shadow-lg" />
        </div>
        
        <motion.div
          className="absolute w-full h-full"
          animate={controls}
          initial={{ rotate: 0 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="49"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.25"
            />
            
            {challenges.map((challenge, index) => {
              const rotation = index * segmentAngle;
              const textAngle = rotation + (segmentAngle / 2);
              const textRadius = 46;
              const textX = 50 + textRadius * Math.cos((textAngle - 90) * Math.PI / 180);
              const textY = 50 + textRadius * Math.sin((textAngle - 90) * Math.PI / 180);
              
              return (
                <g key={challenge.id}>
                  <path
                    d={`M 50 50 L 50 0 A 50 50 0 0 1 ${50 + Math.sin(segmentAngle * Math.PI / 180) * 50} ${50 - Math.cos(segmentAngle * Math.PI / 180) * 50} Z`}
                    fill={challenge.isLocked ? '#374151' : challenge.color}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.25"
                    transform={`rotate(${rotation} 50 50)`}
                  />
                  <text
                    x={textX}
                    y={textY}
                    fontSize="2.5"
                    fill="#fff"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textAngle} ${textX} ${textY})`}
                  >
                    {challenge.number}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>
        
        <button
          onClick={() => !isSpinning && spinWheel()}
          disabled={isSpinning}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white shadow-lg hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center"
        >
          <span className="font-bold text-gray-800">SPIN!</span>
        </button>
      </div>
    </div>
  );
};