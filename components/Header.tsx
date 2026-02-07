
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-10 space-y-3">
      <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-yellow-500 via-yellow-600 to-yellow-800 animate-pulse tracking-tighter">
        കുമ്പിടി ജ്യോതിഷം
      </h1>
      <p className="text-yellow-700 text-xl font-medium">
        "ഞാൻ ഇവിടെയുമുണ്ട്, അവിടെയുമുണ്ട്... നിന്റെ കൈരേഖയിലും ഉണ്ട്!"
      </p>
      <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mt-4"></div>
    </header>
  );
};

export default Header;
