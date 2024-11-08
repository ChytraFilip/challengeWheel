import * as React from "react";
import { useWheelStore } from "../store/wheelStore";
import { XMarkIcon, LockClosedIcon } from "@heroicons/react/24/solid";

export const ResultModal: React.FC = () => {
  const { selectedChallenge, closeModal } = useWheelStore();

  if (!selectedChallenge) return null;

  // Helper function to generate unlock message
  const getUnlockMessage = (type: string) => {
    switch (type) {
      case "follow":
        return "Follow the channel to unlock more challenges!";
      case "sub":
        return "Subscribe to unlock this challenge!";
      case "donation":
        return "Donate to unlock this challenge!";
      default:
        return "Unlock this challenge!";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full relative mx-4">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <div className="text-center">
          {selectedChallenge.isLocked ? (
            <div className="flex flex-col items-center text-gray-800">
              <LockClosedIcon
                className="w-14 h-14 mb-3"
                style={{ color: selectedChallenge.color }}
              />
              <p className="text-base font-semibold">
                {getUnlockMessage(selectedChallenge.unlockCondition.type)}
              </p>
            </div>
          ) : (
            <>
              <h2
                className="text-4xl font-extrabold mb-6 uppercase"
                style={{ color: selectedChallenge.color }}
              >
                Challenge #{selectedChallenge.number}
              </h2>

              <div className="relative py-4 px-2 flex flex-col items-center rounded-lg border-spacing-1 border-2 border-zinc-200 bg-">
                <p className="text-2xl font-medium text-gray-900 leading-tight mb-1">
                  {selectedChallenge.title}
                </p>
                {selectedChallenge.type && (
                  <span className="absolute bottom-0 translate-y-2.5 inline-block bg-zinc-300 text-white px-1.5 py-0.5 rounded-full text-xs font-medium">
                    {selectedChallenge.type}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
