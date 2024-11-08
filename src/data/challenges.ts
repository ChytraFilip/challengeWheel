import {
  Challenge,
  ChallengeTier,
  SpinType,
  ChallengeGroup,
  ChallengeData,
} from "../types/challengeTypes";

const TIER_COLORS: Record<ChallengeTier, string> = {
  common: "#4CAF50", // Green
  uncommon: "#2196F3", // Blue
  rare: "#9C27B0", // Purple
  epic: "#FF9800", // Orange
  legendary: "#F44336", // Red
  mythic: "#FFD700", // Gold
};

// Utility to generate unique IDs
let idCounter = 1;

// Define the challenges directly in the code
const challengesData: ChallengeData[] = [
  {
    tier: "Common",
    chance: 36,
    category: "Follow-Spin",
    unlockCondition: "Unlocked Automatically",
    description: "Available to everyone who follows the channel.",
    challenges: [
      {
        type: "Gaming Related",
        challenges: [
          "Max sensitivity for 3 minutes",
          "Min sensitivity for 3 minutes",
          "No sound challenge (1 match)",
          "Inverted controls (2 mins)",
          "Every death = 5 push-ups",
          "Use worst rated weapon/character",
          "Play standing for one match",
          "Chat picks loadout",
          "Show Steam playtime stats",
          "Mouse DPI at 100%",
          "Every kill requires a full 360° turn",
          "No sprinting or dashing for one match",
        ],
      },
      {
        type: "Physical/Performance",
        challenges: [
          "10 push-ups on stream",
          "15 jumping jacks between matches",
          "Cold water splash face",
          "Balance water bottle on head",
          "Gaming chair spins (10x)",
          "Speak in accent of chat's choice",
          "Wear clothes backwards",
          "Play cross-handed",
          "Weird camera angle (e.g., face close to camera for 2 mins)",
          'Do your best "gamer rage" impression',
          "T-Rex arms gaming for 2 mins",
          "Narrate gameplay like a sports commentator",
        ],
      },
      {
        type: "Story Time/Sharing",
        challenges: [
          "Tell worst rage quit story",
          "Share biggest game / in-game purchase",
          "Show oldest gaming setup",
          "Read last 5 Google searches",
          "Tell best winning streak story",
          "Show gaming desktop organization",
          "Share worst gaming review",
          "Tell story of first gaming rage",
          "Review old stream clips",
          "Go over all game consoles and describe your gaming setup evolution",
          "Share your most regretted purchase from online shop",
          "Describe your dream gaming setup",
        ],
      },
    ],
  },
  {
    tier: "Uncommon",
    chance: 26,
    category: "Follow-Spin",
    unlockCondition: "Locked behind 20 new follows threshold (per month)",
    challenges: [
      {
        type: "Gaming/Physical",
        challenges: [
          "Hot sauce on tongue",
          "Raw garlic clove challenge",
          "Hold an ice cube in each palm till they melt before starting new game/round",
          "Play with no headphones, max volume",
          "Lemon bite challenge",
          "Draw a temporary mustache on your face with a marker or eyeliner",
          "Permanent crouch only match",
          "Eat spicy chips while gaming",
          "Play with gloves",
          "Play with two fingers taped (index and middle finger)",
          "Fill your mouth with drink till next round",
          "Mix two condiments and take a spoonful",
          "Use the opposite hand for mouse/controller (entire match)",
        ],
      },
      {
        type: "Stories/Confessions",
        challenges: [
          "Rant on the worst type of teammates",
          "Share most expensive mistake you made (e.g., breaking something)",
          "Share the last time you cried from laughter and what happened",
          "Say in team voice chat you carried the lobby at the game you totally suck at",
          "Tell a story about a time you got in trouble at school",
          "Describe your biggest childhood fear and if you still have it",
          "Tell story of the funniest things you did with your friends",
          "Tell about a time you tried something new and failed spectacularly",
          "What's the one conspiracy theory you actually think is true",
          "Tell story of worst friend betrayal",
          "Tell about the game that made you rage quit the hardest",
          "Send a “dad joke” to your dad",
          "Try to say a tongue twister that chat chooses five times fast and re-spin if you fail",
        ],
      },
    ],
  },
  {
    tier: "Rare",
    chance: 18,
    category: "Follow-Spin",
    unlockCondition: "Locked behind 100 new follows threshold (per month)",
    challenges: [
      {
        type: "Physical/Performance",
        challenges: [
          "Bite a fresh jalapeño or other hot pepper",
          "Post a video of yourself doing the 'Ice bucket challenge' on Discord",
          "50 push-ups no break",
          "Warhead candy challenge",
          "Eat a whole medium-sized onion",
          "Do a handstand attempt (or try your best if you’re not experienced)",
        ],
      },
      {
        type: "Spicy Stories",
        challenges: [
          "Share your story of the night you drank till blackout",
          "Do you take a nude photo / DP? Did you send it to someone?",
          "Share old teenage photos of yourself",
          "Describe your most cringe-worthy romantic encounter",
          "Tell the story of the most embarrassing thing you've done for a crush",
          "Tell the story about a fake rumor you've made up about somebody",
        ],
      },
      {
        type: "Wild Content",
        challenges: [
          "Dye or spray-paint a small section of your hair (temporary dye)",
          "Face paint full mask",
          "Let chat suggest a dance move and try your best to recreate it",
          "Chat votes from list of weird food combos you will have to eat",
          "Post stream highlight to social media",
          "Let chat pick an accent, and speak in it for the next 10 minutes",
        ],
      },
    ],
  },
  {
    tier: "Epic",
    chance: 12,
    category: "Sub-Spin",
    unlockCondition:
      "For every sub, 1 random epic challenge gets unlocked for time of one month",
    challenges: [
      {
        type: "Physical Challenges",
        challenges: [
          "Ghost pepper challenge",
          "150 push-up challenge till the end of the stream",
          "Eat a tablespoon of wasabi",
          "Put a handful of ice cubes in your pants and keep them there for 3 minutes",
          "Chug a can of Sprite in one breath (attempt and let the burping chaos ensue)",
          'Do the "raw egg challenge" (crack an egg and drink it)',
        ],
      },
      {
        type: "Extreme Stories",
        challenges: [
          "Tell the craziest thing that’s happened to you (or you did) at a bar",
          "Share most embarrassing school story",
          "Tell the story of your most awkward family holiday or trip",
          'Share the biggest "down bad" moment',
          "Describe the most awkward morning-after situation you've been in",
          "Tell the story when someone caught you in an embarrassing situation",
        ],
      },
    ],
  },
  {
    tier: "Legendary",
    chance: 8,
    category: "Sub-Spin",
    unlockCondition:
      "For every 10 subs, 1 random legendary challenge gets unlocked for time of one month",
    description: "Exclusive challenges for dedicated subscribers.",
    challenges: [
      {
        type: "General",
        challenges: [
          "Share entire camera roll from worst party night",
          "Tell your most wild story including at least one of your siblings",
          "Repost some of the oldest social media posts/photos",
          "Show or tell the story of the weirdest or most ridiculous purchase you’ve ever made—and own up to how much you spent on it",
          "Tell story of biggest life fail",
          "Do impression of yourself at peak party mode",
          "Show us your 'game'—resurface a part of an initial conversation with your ex or your current spouse, and let chat vote on whether you are a rizzler or giving secondhand embarrassment",
          "Let your siblings share the most embarrassing thing/secret/story about you",
        ],
      },
    ],
  },
  {
    tier: "Mythic",
    chance: 4,
    category: "Donation-Spin",
    unlockCondition:
      "Locked behind 100 subs threshold. For every $25 raised in donations, 1 random mythic challenge gets unlocked for time of one month",
    challenges: [
      "Share your deepest, darkest secret that you’ve never told anyone. This could be a hidden regret, a personal struggle, or something that keeps you up at night",
      "Commit to a 24-hour streaming session within the next six months, and announce the date on stream! Bonus points if you make it a themed event",
      "Reveal a story or admission you promised yourself you would never tell anyone, whether it’s something embarrassing, cringeworthy, or deeply personal",
      "For your next stream, you have to wear themed attire the whole time. Make it fun by letting chat vote on a fun accessory you must wear with it (like sunglasses or a towel headband)",
    ],
  },
];

// Type guard to check if challenges is ChallengeGroup[]
const isChallengeGroupArray = (
  challenges: ChallengeData["challenges"]
): challenges is ChallengeGroup[] => {
  return (
    challenges.length > 0 &&
    typeof challenges[0] === "object" &&
    "type" in challenges[0]
  );
};

// Function to shuffle an array (Fisher-Yates shuffle)
const shuffleArray = <T>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Function to transform challengesData into Challenge[] format and shuffle them
const transformChallenges = (): Challenge[] => {
  const transformed: Challenge[] = [];

  challengesData.forEach((tierData: ChallengeData) => {
    const { tier, category, unlockCondition, description, challenges } =
      tierData;

    if (isChallengeGroupArray(challenges)) {
      // Handle array of ChallengeGroup
      challenges.forEach((challengeGroup: ChallengeGroup) => {
        const { type, challenges: challengeList } = challengeGroup;

        challengeList.forEach((challengeText: string) => {
          transformed.push({
            id: idCounter,
            number: idCounter,
            tier: tier.toLowerCase() as ChallengeTier,
            isLocked: unlockCondition !== "Unlocked Automatically",
            color: TIER_COLORS[tier.toLowerCase() as ChallengeTier],
            unlockCondition: {
              type: determineSpinType(unlockCondition),
              threshold: extractThreshold(unlockCondition),
            },
            description,
            title: challengeText,
            category,
            type: type || "General",
          });
          idCounter++;
        });
      });
    } else {
      // Handle array of strings
      (challenges as string[]).forEach((challengeText: string) => {
        transformed.push({
          id: idCounter,
          number: idCounter,
          tier: tier.toLowerCase() as ChallengeTier,
          isLocked: unlockCondition !== "Unlocked Automatically",
          color: TIER_COLORS[tier.toLowerCase() as ChallengeTier],
          unlockCondition: {
            type: determineSpinType(unlockCondition),
            threshold: extractThreshold(unlockCondition),
          },
          description,
          title: challengeText,
          category,
          type: "General",
        });
        idCounter++;
      });
    }
  });

  // Shuffle the transformed challenges
  const shuffledChallenges = shuffleArray(transformed);

  // Assign new numbers based on shuffled order
  shuffledChallenges.forEach((challenge, index) => {
    challenge.number = index + 1;
  });

  return shuffledChallenges;
};

// Helper function to determine SpinType based on unlockCondition string
const determineSpinType = (condition: string): SpinType => {
  if (condition.toLowerCase().includes("donations")) return "donation";
  if (condition.toLowerCase().includes("subs")) return "sub";
  return "follow";
};

// Helper function to extract threshold number from unlockCondition string
const extractThreshold = (condition: string): number => {
  const match = condition.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
};

export const challenges: Challenge[] = transformChallenges();
