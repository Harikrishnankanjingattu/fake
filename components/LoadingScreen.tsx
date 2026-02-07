
import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "കുമ്പിടി കണ്ണടച്ചു ധ്യാനിക്കുന്നു...",
  "നിന്റെ വിധി നോക്കി ചിരിച്ചു മരിക്കുന്നു...",
  "കൈരേഖകളിൽ കള്ളം തിരയുന്നു...",
  "അല്പനേരം ക്ഷമിക്കൂ, കുമ്പിടി വേഷം മാറുകയാണ്...",
  "നിന്റെ ഗ്രഹനില കണ്ടിട്ട് എനിക്ക് സഹിക്കുന്നില്ല...",
  "പോലീസ് വരുന്നതിന് മുൻപ് നോക്കട്ടെ...",
  "ഇതൊക്കെ വിശ്വസിക്കുന്ന നിന്നെ സമ്മതിക്കണം..."
];

const LoadingScreen: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-16 space-y-12">
      <div className="relative flex items-center justify-center">
        <div className="w-40 h-40 border-[10px] border-yellow-200 border-t-yellow-500 rounded-full animate-spin"></div>
        <div className="absolute w-20 h-20 bg-yellow-500 rounded-full shadow-[0_0_40px_rgba(234,179,8,0.5)] animate-pulse"></div>
      </div>
      <div className="space-y-4 text-center">
        <p className="text-3xl font-black text-yellow-700 tracking-tight transition-all duration-500">
          {MESSAGES[msgIndex]}
        </p>
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
