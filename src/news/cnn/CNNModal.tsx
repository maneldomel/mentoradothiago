import React from 'react';
import { X } from 'lucide-react';

interface CNNModalProps {
  onClose: () => void;
}

export const CNNModal: React.FC<CNNModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.imgur.com/0twf89j.png" 
                alt="CNN" 
                className="h-8 w-auto"
              />
              <h2 className="text-xl font-bold text-gray-900">CNN Health</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              A Surprising Natural Solution to Men's Performance Issues
            </h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                CNN reveals the growing demand for Celtic salt solutions among men over 40. 
                Products like BlueDrops with Celtic salt are gaining ground as alternatives to traditional treatments.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Recent studies have shown promising results for natural approaches to men's health concerns, 
                with Celtic salt-based formulations showing particular promise in clinical trials.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Health experts are increasingly recommending these natural alternatives as part of 
                comprehensive wellness approaches for men's vitality and performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};