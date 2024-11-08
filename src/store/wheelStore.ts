import { create } from "zustand";
import { WheelState, ChallengeTier } from "../types/wheel";
import { challenges as initialChallenges } from "../data/challenges";
import throttle from "lodash.throttle"; // Import throttle from lodash

export const useWheelStore = create<WheelState>((set, get) => {
  // Create a throttled version of unlockChallenges with a 100ms delay
  const throttledUnlockChallenges = throttle(() => {
    const { spinType, followCount, subCount, donationAmount, challenges } =
      get();

    // Define allowed tiers based on spinType
    let allowedTiers: ChallengeTier[] = ["common", "uncommon", "rare"];
    if (spinType === "sub" || spinType === "donation") {
      allowedTiers = [...allowedTiers, "epic", "legendary"];
    }
    if (spinType === "donation") {
      allowedTiers = [...allowedTiers, "mythic"];
    }

    // Calculate unlocked counts per tier based on conditions
    const unlockCounts: Record<ChallengeTier, number> = {
      common: allowedTiers.includes("common") ? 36 : 0, // All common challenges unlocked
      uncommon: allowedTiers.includes("uncommon")
        ? Math.min(followCount, 26)
        : 0, // 1 per follow up to 26
      rare: allowedTiers.includes("rare")
        ? Math.min(Math.floor(followCount / 10), 18)
        : 0, // 1 per 10 follows up to 18
      epic: allowedTiers.includes("epic") ? Math.min(subCount, 12) : 0, // 1 per sub up to 12
      legendary: allowedTiers.includes("legendary")
        ? Math.min(Math.floor(subCount / 10), 8)
        : 0, // 1 per 10 subs up to 8
      mythic: allowedTiers.includes("mythic")
        ? Math.min(Math.floor(donationAmount / 25), 4)
        : 0, // 1 per $25 donations, up to 4
    };

    // Initialize a map to keep track of unlocked counts per tier
    const unlockedCounts: Record<ChallengeTier, number> = {
      common: 0,
      uncommon: 0,
      rare: 0,
      epic: 0,
      legendary: 0,
      mythic: 0,
    };

    // Map through challenges and unlock based on unlockCounts and allowedTiers
    const updatedChallenges = challenges.map((challenge) => {
      const tier = challenge.tier;

      if (!allowedTiers.includes(tier)) {
        // Ensure challenges from non-allowed tiers are locked
        return { ...challenge, isLocked: true };
      }

      if (unlockCounts[tier] > unlockedCounts[tier]) {
        unlockedCounts[tier] += 1;
        return { ...challenge, isLocked: false };
      } else {
        return { ...challenge, isLocked: true };
      }
    });

    set({ challenges: updatedChallenges });
  }, 100); // 100ms throttle delay

  return {
    challenges: initialChallenges, // Use the transformed challenges
    isSpinning: false,
    selectedChallenge: null,
    debugMode: false,
    spinType: "follow",
    followCount: 0,
    subCount: 0,
    donationAmount: 0,
    currentRotation: 0, // Initialize rotation state
    setSpinning: (spinning) => set({ isSpinning: spinning }),
    setSelectedChallenge: (challenge) => set({ selectedChallenge: challenge }),
    toggleDebugMode: () => set((state) => ({ debugMode: !state.debugMode })),
    setSpinType: (type) => {
      set({ spinType: type });
      throttledUnlockChallenges();
    },
    setFollowCount: (count) => {
      set({ followCount: count });
      throttledUnlockChallenges();
    },
    setSubCount: (count) => {
      set({ subCount: count });
      throttledUnlockChallenges();
    },
    setDonationAmount: (amount) => {
      set({ donationAmount: amount });
      throttledUnlockChallenges();
    },
    setCurrentRotation: (rotation: number) =>
      set({ currentRotation: rotation }),
    closeModal: () => set({ selectedChallenge: null }),
    unlockChallenges: throttledUnlockChallenges, // Expose the throttled function
  };
});
