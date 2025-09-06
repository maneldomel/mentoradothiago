import React from 'react';
import { X } from 'lucide-react';

interface MayoModalProps {
  onClose: () => void;
  article: any;
}

export const MayoModal: React.FC<MayoModalProps> = ({ onClose, article }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.imgur.com/ClqsijC.png" 
                alt="Mayo Clinic" 
                className="h-8 w-auto"
              />
              <h2 className="text-xl font-bold text-gray-900">Mayo Clinic</h2>
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
              The Science Behind Herbal Support for Men's Vitality
            </h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Mayo Clinic explores the benefits and limitations of Celtic salt approaches, 
                suggesting products like BlueDrops with Celtic salt may complement traditional treatment.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Research indicates that natural supplements containing Celtic salt and other 
                botanical ingredients may offer supportive benefits for men's health and vitality.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                While more research is needed, preliminary studies suggest these natural approaches 
                may be valuable additions to comprehensive men's wellness programs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};