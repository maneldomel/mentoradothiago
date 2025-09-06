import React from 'react';
import { X } from 'lucide-react';

interface WebMDModalProps {
  onClose: () => void;
  article: any;
}

export const WebMDModal: React.FC<WebMDModalProps> = ({ onClose, article }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.imgur.com/hEggmdK.png" 
                alt="WebMD" 
                className="h-8 w-auto"
              />
              <h2 className="text-xl font-bold text-gray-900">WebMD</h2>
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
              Natural Male Enhancers Gaining Ground in 2025
            </h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                WebMD highlights studies on the use of Celtic salt to improve male sexual health 
                and performance naturally. Recent research has shown promising results for men 
                seeking alternatives to traditional treatments.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Clinical trials have demonstrated that natural formulations containing Celtic salt 
                can provide significant benefits for men's vitality and overall wellness.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Medical professionals are increasingly recognizing the potential of these natural 
                approaches as part of comprehensive men's health strategies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};