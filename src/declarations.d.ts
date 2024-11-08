// Remove the module declaration for challenges.json
// declare module "./challenges.json" {
//   import type { ChallengesJSON } from "./types/challengeTypes";
//   const value: ChallengesJSON;
//   export default value;
// }

// Retain other declarations if needed
declare module "*.json" {
  const value: unknown;
  export default value;
}
