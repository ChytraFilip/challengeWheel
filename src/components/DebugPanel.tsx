import * as React from "react";
import { useWheelStore } from "../store/wheelStore";
import { SpinType } from "../types/wheel";

export const DebugPanel: React.FC = () => {
  const {
    debugMode,
    toggleDebugMode,
    spinType,
    setSpinType,
    followCount,
    subCount,
    donationAmount,
    setFollowCount,
    setSubCount,
    setDonationAmount,
    unlockChallenges, // Import the throttled unlockChallenges function
  } = useWheelStore();

  const spinTypes: SpinType[] = ["follow", "sub", "donation"];

  if (!debugMode) {
    return (
      <button
        onClick={toggleDebugMode}
        className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded"
      >
        Show Debug
      </button>
    );
  }

  const getSpinTypeColor = (type: SpinType) => {
    switch (type) {
      case "follow":
        return "bg-blue-500";
      case "sub":
        return "bg-green-500";
      case "donation":
        return "bg-yellow-500";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg w-80">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-bold mb-2">Spin Type</h3>
          <div className="flex gap-2">
            {spinTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSpinType(type)}
                className={`px-3 py-1 rounded flex-1 ${
                  spinType === type ? getSpinTypeColor(type) : "bg-gray-600"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-2">Follows ({followCount})</h3>
          <input
            type="range"
            min="0"
            max="200"
            value={followCount}
            onChange={(e) => {
              setFollowCount(Number(e.target.value));
              unlockChallenges(); // Invoke unlockChallenges onChange
            }}
            className="w-full accent-blue-400"
          />
        </div>

        <div>
          <h3 className="font-bold mb-2">Subs ({subCount})</h3>
          <input
            type="range"
            min="0"
            max="200"
            value={subCount}
            onChange={(e) => {
              setSubCount(Number(e.target.value));
              unlockChallenges(); // Invoke unlockChallenges onChange
            }}
            className="w-full accent-green-500"
          />
        </div>

        <div>
          <h3 className="font-bold mb-2">Donations (${donationAmount})</h3>
          <input
            type="range"
            min="0"
            max="200"
            value={donationAmount}
            onChange={(e) => {
              setDonationAmount(Number(e.target.value));
              unlockChallenges(); // Invoke unlockChallenges onChange
            }}
            className="w-full accent-yellow-500"
          />
        </div>

        <button
          onClick={toggleDebugMode}
          className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-500"
        >
          Hide Debug
        </button>
      </div>
    </div>
  );
};
