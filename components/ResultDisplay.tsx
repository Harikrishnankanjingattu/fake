
import React, { useState, useEffect, useRef } from 'react';
import { PalmPrediction } from '../types';

interface ResultDisplayProps {
  result: PalmPrediction;
  onReset: () => void;
  coins: number;
  onImprove: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset, coins, onImprove }) => {
  const [showLinkedInPopup, setShowLinkedInPopup] = useState(false);
  const [showImproveSuccess, setShowImproveSuccess] = useState(false);
  const endOfContentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowLinkedInPopup(true);
        }
      },
      { threshold: 1.0 }
    );

    if (endOfContentRef.current) {
      observer.observe(endOfContentRef.current);
    }

    return () => {
      if (endOfContentRef.current) {
        observer.unobserve(endOfContentRef.current);
      }
    };
  }, []);

  const downloadAsFlashcard = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas settings
    canvas.width = 600;
    canvas.height = 800;

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 0, 800);
    gradient.addColorStop(0, '#fef9c3'); // yellow-100
    gradient.addColorStop(1, '#ffffff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 800);

    // Border
    ctx.strokeStyle = '#eab308'; // yellow-500
    ctx.lineWidth = 20;
    ctx.strokeRect(0, 0, 600, 800);

    // Load logo/swami image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "https://raw.githubusercontent.com/Harikrishnankanjingattu/fake/main/logo.png";

    img.onload = () => {
      // Draw image
      ctx.drawImage(img, 150, 40, 300, 150);

      // Title
      ctx.fillStyle = '#ca8a04'; // yellow-600
      ctx.font = 'bold 40px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('കുമ്പിടി ജ്യോതിഷം', 300, 240);

      // Luck Rating
      ctx.fillStyle = '#854d0e'; // yellow-800
      ctx.font = 'bold 30px sans-serif';
      ctx.fillText(`ഭാഗ്യം: ${result.rating}`, 300, 290);

      // Prediction Label
      ctx.font = 'black 20px sans-serif';
      ctx.fillText('പ്രവചനം:', 300, 350);

      // Wrapped Prediction Text
      ctx.fillStyle = '#1f2937'; // gray-800
      ctx.font = 'bold 22px sans-serif';
      wrapText(ctx, result.prediction, 300, 390, 500, 30);

      // Remedy
      ctx.fillStyle = '#a16207'; // yellow-700
      ctx.font = 'italic bold 20px sans-serif';
      ctx.fillText('പരിഹാരം:', 300, 600);
      ctx.fillStyle = '#854d0e';
      wrapText(ctx, result.remedy, 300, 640, 500, 28);

      // Wisdom
      ctx.fillStyle = '#ca8a04';
      ctx.font = 'italic bold 18px sans-serif';
      ctx.fillText(`"${result.kumbidiWisdom}"`, 300, 750);

      // Download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `kumbidi_fortune_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    };
  };

  // Helper for text wrapping on canvas
  const wrapText = (context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = context.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, currentY);
  };

  const handleImproveClick = () => {
    if (coins < 10) {
      alert("കോയിൻ തീർന്നു!");
      return;
    }
    setShowLinkedInPopup(true);
    // User must click follow in popup to proceed
  };

  return (
    <div className="w-full max-w-2xl bg-white border-4 border-yellow-500 rounded-3xl p-10 shadow-[0_0_60px_rgba(234,179,8,0.2)] animate-in fade-in zoom-in duration-500 relative overflow-hidden">
      {/* Coin Balance */}
      <div className="absolute top-4 right-6 flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full border border-yellow-400">
        <span className="text-xl">🪙</span>
        <span className="font-black text-yellow-700">{coins}</span>
      </div>

      {/* LinkedIn Banner/Top Image */}
      <div className="flex justify-center mb-6">
        <a
          href="https://www.linkedin.com/in/harikrishnan-kanjingattu-48a172275/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
        >
          <img
            src="https://raw.githubusercontent.com/Harikrishnankanjingattu/fake/main/logo.png"
            alt="LinkedIn"
            className="h-16 w-auto object-contain hover:scale-110 transition-transform cursor-pointer"
          />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
            Follow on LinkedIn
          </div>
        </a>
      </div>

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
          <p className="text-2xl leading-relaxed text-gray-800 font-bold whitespace-pre-wrap">
            {result.prediction}
          </p>
        </section>

        <section className="bg-yellow-50 p-8 rounded-2xl border-2 border-yellow-200 space-y-3">
          <h3 className="text-xs font-black text-yellow-700 uppercase tracking-[0.3em]">പരിഹാരം:</h3>
          <p className="text-xl italic text-yellow-800 font-medium whitespace-pre-wrap">
            {result.remedy}
          </p>
        </section>

        <div className="pt-6 text-center">
          <div className="inline-block px-8 py-4 bg-yellow-500 rounded-xl border-4 border-yellow-600">
            <p className="text-lg font-black text-white italic leading-none">"{result.kumbidiWisdom}"</p>
          </div>
        </div>

        {/* End of content marker */}
        <div ref={endOfContentRef} className="h-4"></div>

        <div className="flex flex-col gap-4 mt-10">
          <button
            onClick={downloadAsFlashcard}
            className="w-full py-4 bg-yellow-400 text-yellow-900 text-lg font-black rounded-2xl hover:bg-yellow-300 transition-all duration-300 shadow-lg border-2 border-yellow-600"
          >
            എന്റെ 'ഉഡായിപ്പ്' ജാതകം സേവ് ചെയ്യൂ! 💾
          </button>

          <button
            onClick={handleImproveClick}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-black rounded-2xl hover:opacity-90 transition-all duration-300 shadow-lg border-2 border-blue-400"
          >
            എന്റെ ഭാവി നന്നാക്കി തരൂ (10 🪙) ✨
          </button>

          <button
            onClick={onReset}
            className="w-full py-4 bg-white border-4 border-yellow-500 text-yellow-600 text-xl font-black rounded-2xl hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-xl"
          >
            വീണ്ടും ശ്രമിക്കൂ
          </button>
        </div>
      </div>

      {/* LinkedIn Popup Hook */}
      {showLinkedInPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white border-4 border-blue-600 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-6 max-w-sm text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl">
              🚀
            </div>
            <div>
              <h3 className="text-2xl font-black text-blue-800 mb-2">ഭാവി മാറ്റാൻ തയ്യാറാണോ?</h3>
              <p className="text-gray-600">
                ലിങ്ക്ഡിൻ ഫോളോ ചെയ്താൽ മാത്രമേ കുമ്പിടി ഭാവി മാറ്റി തരൂ! സത്യം!
              </p>
            </div>

            <a
              href="https://www.linkedin.com/in/harikrishnan-kanjingattu-48a172275/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setShowLinkedInPopup(false);
                onImprove();
              }}
              className="w-full bg-[#0077b5] text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              Follow & Improve Future
            </a>

            <button
              onClick={() => setShowLinkedInPopup(false)}
              className="text-sm text-gray-400 font-bold hover:text-gray-600"
            >
              പിന്നീട് ആകാം
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
