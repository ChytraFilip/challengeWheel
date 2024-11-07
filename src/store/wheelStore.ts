import { create } from 'zustand';
import { WheelState, SpinType, Challenge } from '../types/wheel';
import { challenges } from '../data/challenges';

const isUnlockableForSpinType = (challenge: Challenge, spinType: SpinType): boolean => {
  switch (spinType) {
    case 'follow':
      return ['common', 'uncommon', 'rare'].includes(challenge.tier);
    case 'sub':
      return ['common', 'uncommon', 'rare', 'epic', 'legendary'].includes(challenge.tier);
    case 'donation':
      return true;
    default:
      return false;
  }
};

const getUnlockedCount = (tier: string, total: number, count: number, multiplier: number = 1): number => {
  const unlockedCount = Math.floor(count / multiplier);
  return Math.min(unlockedCount, total);
};

export const useWheelStore = create<WheelState>((set, get) => ({
  challenges,
  isSpinning: false,
  selectedChallenge: null,
  debugMode: false,
  spinType: 'follow',
  followCount: 0,
  subCount: 0,
  donationAmount: 0,
  setSpinning: (spinning) => set({ isSpinning: spinning }),
  setSelectedChallenge: (challenge) => set({ selectedChallenge: challenge }),
  toggleDebugMode: () => set((state) => ({ debugMode: !state.debugMode })),
  setSpinType: (type) => {
    set({ spinType: type });
    get().unlockChallenges();
  },
  setFollowCount: (count) => {
    set({ followCount: count });
    get().unlockChallenges();
  },
  setSubCount: (count) => {
    set({ subCount: count });
    get().unlockChallenges();
  },
  setDonationAmount: (amount) => {
    set({ donationAmount: amount });
    get().unlockChallenges();
  },
  closeModal: () => set({ selectedChallenge: null }),
  unlockChallenges: () => set((state) => {
    const challengesByTier = {
      uncommon: challenges.filter(c => c.tier === 'uncommon'),
      rare: challenges.filter(c => c.tier === 'rare'),
      epic: challenges.filter(c => c.tier === 'epic'),
      legendary: challenges.filter(c => c.tier === 'legendary'),
      mythic: challenges.filter(c => c.tier === 'mythic')
    };

    // Calculate unlocked counts for each tier
    const uncommonUnlocked = getUnlockedCount('uncommon', challengesByTier.uncommon.length, state.followCount);
    const rareUnlocked = getUnlockedCount('rare', challengesByTier.rare.length, state.followCount, 10);
    const epicUnlocked = getUnlockedCount('epic', challengesByTier.epic.length, state.subCount);
    const legendaryUnlocked = getUnlockedCount('legendary', challengesByTier.legendary.length, state.subCount, 10);
    const mythicUnlocked = getUnlockedCount('mythic', challengesByTier.mythic.length, state.donationAmount, 25);

    return {
      challenges: state.challenges.map(challenge => {
        if (!isUnlockableForSpinType(challenge, state.spinType)) {
          return { ...challenge, isLocked: true };
        }

        let isLocked = true;
        const tierChallenges = challengesByTier[challenge.tier as keyof typeof challengesByTier] || [];
        const challengeIndexInTier = tierChallenges.findIndex(c => c.id === challenge.id);

        switch (challenge.tier) {
          case 'common':
            isLocked = false;
            break;
          case 'uncommon':
            isLocked = challengeIndexInTier >= uncommonUnlocked;
            break;
          case 'rare':
            isLocked = challengeIndexInTier >= rareUnlocked;
            break;
          case 'epic':
            isLocked = challengeIndexInTier >= epicUnlocked;
            break;
          case 'legendary':
            isLocked = challengeIndexInTier >= legendaryUnlocked;
            break;
          case 'mythic':
            isLocked = challengeIndexInTier >= mythicUnlocked;
            break;
        }

        return { ...challenge, isLocked };
      })
    };
  }),
}));