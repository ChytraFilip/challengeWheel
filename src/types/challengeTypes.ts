export type ChallengeTier =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary"
  | "mythic";

export type SpinType = "follow" | "sub" | "donation";

export interface ChallengeGroup {
  type: string;
  challenges: string[];
}

export interface ChallengeData {
  tier: string;
  chance: number;
  category: string;
  unlockCondition: string;
  description?: string;
  challenges: ChallengeGroup[] | string[];
}

export interface Challenge {
  id: number;
  number: number;
  tier: ChallengeTier;
  isLocked: boolean;
  color: string;
  unlockCondition: {
    type: SpinType;
    threshold: number;
  };
  description?: string;
  title: string;
  category: string;
  type?: string;
}

export interface WheelState {
  challenges: Challenge[];
  isSpinning: boolean;
  selectedChallenge: Challenge | null;
  debugMode: boolean;
  spinType: SpinType;
  followCount: number;
  subCount: number;
  donationAmount: number;
  setSpinning: (spinning: boolean) => void;
  setSelectedChallenge: (challenge: Challenge | null) => void;
  toggleDebugMode: () => void;
  setSpinType: (type: SpinType) => void;
  setFollowCount: (count: number) => void;
  setSubCount: (count: number) => void;
  setDonationAmount: (amount: number) => void;
  unlockChallenges: () => void;
  closeModal: () => void;
  currentRotation: number;
  setCurrentRotation: (rotation: number) => void;
}
