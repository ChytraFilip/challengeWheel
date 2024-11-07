import React from 'react';
import { useWheelStore } from '../store/wheelStore';
import { X } from 'lucide-react';

export const ResultModal: React.FC = () => {
  const { selectedChallenge, closeModal } = useWheelStore();

  if (!selectedChallenge) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4">
          Challenge #{selectedChallenge.number}
        </h2>
        
        {selectedChallenge.isLocked ? (
          <div className="text-red-500">
            <p className="font-semibold">This challenge is locked!</p>
            <p className="mt-2">
              Required: {selectedChallenge.unlockCondition.threshold} {selectedChallenge.unlockCondition.type}
              {selectedChallenge.unlockCondition.type === 'donation' ? '$' : 's'}
            </p>
          </div>
        ) : (
          <div className="text-green-500">
            <p className="font-semibold">Challenge Unlocked!</p>
            <p className="mt-2">Tier: {selectedChallenge.tier}</p>
          </div>
        )}
      </div>
    </div>
  );
};