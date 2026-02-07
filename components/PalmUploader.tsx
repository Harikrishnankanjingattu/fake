
import React, { useRef } from 'react';

interface PalmUploaderProps {
  onImageSelected: (base64: string) => void;
  disabled: boolean;
}

const PalmUploader: React.FC<PalmUploaderProps> = ({ onImageSelected, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        onImageSelected(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-10 bg-white rounded-3xl border-4 border-yellow-500 transition-all duration-300 shadow-[0_0_30px_rgba(234,179,8,0.2)] hover:shadow-[0_0_50px_rgba(234,179,8,0.4)]">
      <div className="w-28 h-28 bg-yellow-100 rounded-full flex items-center justify-center animate-bounce shadow-[0_0_20px_rgba(234,179,8,0.3)]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-2xl font-black text-yellow-600 uppercase tracking-wide">നിങ്ങളുടെ കൈപ്പത്തി കാണിക്കൂ!</h3>
        <p className="text-yellow-800 font-bold uppercase text-xs tracking-widest">കുമ്പിടി നിങ്ങളുടെ ഭാവി പ്രവചിക്കും</p>
      </div>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={disabled}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        className={`px-10 py-4 bg-yellow-500 text-white text-xl font-black rounded-xl shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 uppercase tracking-tighter ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400'}`}
      >
        അപ്‌ലോഡ് ചെയ്യൂ
      </button>
    </div>
  );
};

export default PalmUploader;
