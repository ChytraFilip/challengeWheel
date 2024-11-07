import { Challenge, ChallengeTier, SpinType } from '../types/wheel';

const TIER_COLORS = {
  common: '#4CAF50',      // Green
  uncommon: '#2196F3',    // Blue
  rare: '#9C27B0',       // Purple
  epic: '#FF9800',       // Orange
  legendary: '#F44336',   // Red
  mythic: '#FFD700'      // Gold
};

const createChallenge = (
  id: number,
  tier: ChallengeTier,
  type: SpinType,
  threshold: number
): Challenge => ({
  id,
  number: id,
  tier,
  isLocked: true,
  color: TIER_COLORS[tier],
  unlockCondition: {
    type,
    threshold
  }
});

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateChallenges = (): Challenge[] => {
  let id = 1;
  
  // Generate challenges for each tier
  const commonChallenges = Array(36).fill(null).map(() => 
    createChallenge(id++, 'common', 'follow', 1)
  );

  const uncommonChallenges = Array(26).fill(null).map(() => 
    createChallenge(id++, 'uncommon', 'follow', 20)
  );

  const rareChallenges = Array(18).fill(null).map(() => 
    createChallenge(id++, 'rare', 'follow', 100)
  );

  const epicChallenges = Array(12).fill(null).map(() => 
    createChallenge(id++, 'epic', 'sub', 1)
  );

  const legendaryChallenges = Array(8).fill(null).map(() => 
    createChallenge(id++, 'legendary', 'sub', 10)
  );

  const mythicChallenges = Array(4).fill(null).map(() => 
    createChallenge(id++, 'mythic', 'donation', 25)
  );

  // Combine and shuffle all challenges
  return shuffleArray([
    ...commonChallenges,
    ...uncommonChallenges,
    ...rareChallenges,
    ...epicChallenges,
    ...legendaryChallenges,
    ...mythicChallenges
  ]);
};

export const challenges = generateChallenges();