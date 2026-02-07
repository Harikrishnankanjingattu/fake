
import React from 'react';
import { PalmPrediction } from '../types';

interface ResultDisplayProps {
  result: PalmPrediction;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  return (
    <div className="w-full max-w-2xl bg-white border-4 border-yellow-500 rounded-3xl p-10 shadow-[0_0_60px_rgba(234,179,8,0.2)] animate-in fade-in zoom-in duration-500 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-yellow-500 shadow-[0_0_20px_#eab308]"></div>

      <div className="relative z-10 space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-center border-b-2 border-yellow-200 pb-6 gap-4">
          <h2 className="text-4xl font-black text-yellow-600 uppercase italic">വിധി പ്രവചനം</h2>
          <div className="bg-yellow-500 px-6 py-2 rounded-lg text-white font-black text-lg shadow-lg">
            ഭാഗ്യം: {result.rating}
          </div>
        </div>

        <section className="space-y-3">
          <h3 className="text-xs font-black text-yellow-800 uppercase tracking-[0.3em]">പ്രവചനം:</h3>
          <p className="text-2xl leading-relaxed text-gray-800 font-bold">
            {result.prediction}
          </p>
        </section>

        <section className="bg-yellow-50 p-8 rounded-2xl border-2 border-yellow-200 space-y-3">
          <h3 className="text-xs font-black text-yellow-700 uppercase tracking-[0.3em]">പരിഹാരം:</h3>
          <p className="text-xl italic text-yellow-800 font-medium">
            {result.remedy}
          </p>
        </section>

        <div className="pt-6 text-center">
          <div className="inline-block px-8 py-4 bg-yellow-500 rounded-xl border-4 border-yellow-600">
            <p className="text-lg font-black text-white italic leading-none">"{result.kumbidiWisdom}"</p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="w-full mt-10 py-5 bg-white border-4 border-yellow-500 text-yellow-600 text-xl font-black rounded-2xl hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-xl"
        >
          വീണ്ടും ശ്രമിക്കൂ
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
