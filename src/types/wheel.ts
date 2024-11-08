import {
  Challenge,
  ChallengeTier,
  SpinType,
  WheelState as WheelStateType,
} from "./challengeTypes";

export type WheelStateAlias = WheelStateType;
export type { Challenge, ChallengeTier, SpinType };

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
