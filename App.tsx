import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import PalmUploader from './components/PalmUploader';
import ResultDisplay from './components/ResultDisplay';
import LoadingScreen from './components/LoadingScreen';
import { analyzePalm } from './services/geminiService';
import { PalmPrediction, AppState } from './types';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [prediction, setPrediction] = useState<PalmPrediction | null>(null);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/kumbidi.mp3');
  }, []);

  const startIntro = () => {
    audioRef.current?.play().catch(() => {});
    setTimeout(() => {
      setShowIntro(false);
      setShowDisclaimer(true);
    }, 7000);
  };

  const handleImageSelected = async (base64: string) => {
    setState(AppState.LOADING);
    setError(null);
    try {
      const result = await analyzePalm(base64);
      setPrediction(result);
      setState(AppState.RESULT);
    } catch (err: any) {
      setError(err.message || "എന്തോ തകരാർ സംഭവിച്ചു!");
      setState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setState(AppState.IDLE);
    setPrediction(null);
    setError(null);
  };

  /* ================= INTRO ================= */
  if (showIntro) {
    return (
      <div
        onClick={startIntro}
        className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 p-6 text-center cursor-pointer"
      >
        <img
          src="https://raw.githubusercontent.com/Harikrishnankanjingattu/fake/main/logo.png"
          alt="Kumbidis Logo"
          className="w-64 h-auto animate-in zoom-in duration-1000 mb-8"
        />

        <p className="text-2xl font-black text-yellow-600 italic animate-in slide-in-from-bottom duration-1000 delay-500">
          "താൻ ആരാണെന്ന് തനിക്ക് അറിയില്ലെങ്കിൽ  
          <br />
          താൻ ഇവിടെ വാ, ഞാൻ പറഞ്ഞു തരാം!"
        </p>

        <p className="mt-6 text-sm text-gray-500">
          Tap anywhere to begin
        </p>
      </div>
    );
  }

  /* ================= DISCLAIMER ================= */
  if (showDisclaimer) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 p-6 text-center space-y-8">
        <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-4xl">⚠️</span>
        </div>

        <h2 className="text-3xl font-black text-yellow-600 uppercase">
          ഒരു മുന്നറിയിപ്പ്!
        </h2>

        <p className="text-xl text-yellow-800 font-bold max-w-md leading-relaxed">
          ഇതൊരു ഉഡായിപ്പ് പരിപാടിയാണ്.  
          ഇതിൽ പറയുന്ന കാര്യങ്ങൾ സത്യമാണെന്ന് കരുതി  
          ലോട്ടറി എടുക്കാൻ പോകരുത്!
          <br /><br />
          (Purely for fun. Don’t lose money!)
        </p>

        <button
          onClick={() => {
            setShowDisclaimer(false);
            setShowAd(true);
          }}
          className="px-10 py-4 bg-yellow-500 text-white font-black text-lg rounded-xl hover:bg-yellow-400 transition"
        >
          ശരി, പറ്റിക്കപ്പെടാൻ ഞാൻ തയ്യാർ
        </button>
      </div>
    );
  }

  /* ================= CREDITS ================= */
  if (showAd) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 p-6 text-center space-y-8">
        <h2 className="text-3xl font-black text-yellow-600 uppercase">
          ഈ തരികിടയ്ക്ക് പിന്നിൽ
        </h2>

        <div className="flex flex-col space-y-4 w-full max-w-xs">
          <a
            href="https://www.linkedin.com/in/harikrishnan-kanjingattu-48a172275/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#0077b5] text-white font-bold text-lg rounded-xl shadow hover:scale-105 transition"
          >
            LinkedIn
          </a>

          <a
            href="https://www.instagram.com/harikrishnan__kanjingattu?igsh=MXNhcmV0am43ZjVhdA=="
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold text-lg rounded-xl shadow hover:scale-105 transition"
          >
            Instagram
          </a>
        </div>

        <button
          onClick={() => setShowAd(false)}
          className="mt-8 text-yellow-600 font-bold underline"
        >
          മതി, ഇനി പ്രവചനം കേൾക്കട്ടെ
        </button>
      </div>
    );
  }

  /* ================= MAIN APP ================= */
  return (
    <div className="min-h-screen flex flex-col items-center px-4 pb-20 max-w-4xl mx-auto">
      <Header />

      <main className="w-full mt-6 flex flex-col items-center">
        {state === AppState.IDLE && (
          <div className="w-full max-w-md text-center">
            <p className="text-xl font-bold text-yellow-800 mb-10">
              കുമ്പിടി നിങ്ങളുടെ രഹസ്യങ്ങൾ വിളിച്ചു പറയും!  
              <br />
              ധൈര്യമുണ്ടെങ്കിൽ തൊടൂ!
            </p>
            <PalmUploader onImageSelected={handleImageSelected} disabled={false} />
          </div>
        )}

        {state === AppState.LOADING && <LoadingScreen />}

        {state === AppState.RESULT && prediction && (
          <ResultDisplay result={prediction} onReset={handleReset} />
        )}

        {state === AppState.ERROR && (
          <div className="border-4 border-yellow-500 p-10 rounded-3xl text-center">
            <h2 className="text-3xl font-black text-yellow-600 mb-4">
              കുമ്പിടിക്ക് ദേഷ്യം വന്നു!
            </h2>
            <p className="text-yellow-800 text-lg mb-6">
              {error}
            </p>
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-yellow-500 text-white font-bold rounded-xl"
            >
              തിരികെ പോകാം
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
