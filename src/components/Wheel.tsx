import { motion, useAnimation } from "framer-motion";
import { useWheelStore } from "../store/wheelStore";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import confetti from "canvas-confetti";

const SPIN_DURATION = 5;
const MIN_ROTATIONS = 5;
const MAX_ROTATIONS = 10;

export const Wheel: React.FC = () => {
  const controls = useAnimation();
  const {
    challenges,
    isSpinning,
    spinType,
    setSpinning,
    setSelectedChallenge,
    unlockChallenges,
    currentRotation,
    setCurrentRotation,
  } = useWheelStore();

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const spinWheel = async () => {
    if (isSpinning) return;

    unlockChallenges(); // Ensure challenges are unlocked before spinning
    setSpinning(true);

    const randomDegree = Math.floor(Math.random() * 360);
    const rotations =
      MIN_ROTATIONS +
      Math.floor(Math.random() * (MAX_ROTATIONS - MIN_ROTATIONS + 1));
    const totalRotation = rotations * 360 + randomDegree;

    const finalRotation = currentRotation + totalRotation;
    setCurrentRotation(finalRotation);

    await controls.start({
      rotate: finalRotation,
      transition: {
        duration: SPIN_DURATION,
        ease: [0.2, 0.8, 0.2, 1],
      },
    });

    const modDegree = finalRotation % 360;
    const segmentAngle = 360 / challenges.length;
    const segmentIndex =
      Math.floor((360 - modDegree) / segmentAngle) % challenges.length;
    const selectedChallenge = challenges[segmentIndex];
    setSelectedChallenge(selectedChallenge);
    setSpinning(false);

    if (!selectedChallenge.isLocked) {
      triggerConfetti();
    }
  };

  const segmentAngle = 360 / challenges.length;

  const getSpinTypeGradient = () => {
    switch (spinType) {
      case "follow":
        return "from-green-400 via-teal-500 to-blue-600";
      case "sub":
        return "from-purple-500 via-pink-500 to-yellow-500";
      case "donation":
        return "from-yellow-500 via-red-500 to-pink-500";
      default:
        return "from-gray-400 via-gray-500 to-gray-600";
    }
  };

  const getSpinTypeText = () => {
    switch (spinType) {
      case "follow":
        return "New Follower!";
      case "sub":
        return "New Subscriber!";
      case "donation":
        return "Donation!";
      default:
        return "Challenges";
    }
  };

  return (
    <div
      className={`w-full h-full relative flex flex-col items-center justify-between px-8 py-12 bg-gradient-to-br ${getSpinTypeGradient()}`}
    >
      <h1 className="text-6xl font-bold text-white text-center">
        {getSpinTypeText()}
      </h1>
      <div className="absolute bottom-0 scale-1 translate-y-[40%] w-[750px] h-[750px] md:static md:translate-y-0">
        <div className="absolute left-1/2 transform -top-[8%] rotate-90 z-10 flex flex-col items-center">
          <PaperAirplaneIcon className="text-white left-1/2 transform -translate-y-1/2 translate-x-4 w-20 h-20 drop-shadow-lg absolute" />
        </div>

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_0px_8px_rgba(0,0,0,0.3)]"
        >
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0"
          />

          <motion.g
            animate={controls}
            initial={{ rotate: 0 }}
            style={{ transformOrigin: "50px 50px" }}
          >
            {challenges.map((challenge, index) => {
              const rotation = index * segmentAngle;
              const textAngle = rotation + segmentAngle / 2;
              const textRadius = 47;
              const textX =
                50 + textRadius * Math.cos(((textAngle - 90) * Math.PI) / 180);
              const textY =
                50 + textRadius * Math.sin(((textAngle - 90) * Math.PI) / 180);

              return (
                <g key={challenge.id}>
                  <path
                    d={`M 50 50 L 50 0 A 50 50 0 0 1 ${
                      50 + Math.sin((segmentAngle * Math.PI) / 180) * 50
                    } ${50 - Math.cos((segmentAngle * Math.PI) / 180) * 50} Z`}
                    fill={challenge.isLocked ? "#394151" : challenge.color}
                    stroke="rgba(255,255,255,1)"
                    strokeWidth="0.05"
                    transform={`rotate(${rotation} 50 50)`}
                  />
                  <text
                    x={textX}
                    y={textY}
                    fontSize="1.5"
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
          </motion.g>
        </svg>

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
