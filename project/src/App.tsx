import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, Heart, Mic2 } from 'lucide-react';

type Mode = 'rap' | 'argument' | 'flirt';
type Rapper = 'LuvBot' | 'Cupidrilla';

// 8-bit background music URL (using a direct MP3 URL)
const BGM_URL = 'https://dl.dropboxusercontent.com/scl/fi/4yv9h2mujywc5h0g8ovp4/8bit-love.mp3?rlkey=v0x9ckgfwxfvzwvhvqaghp2k5';

function App() {
  const [mode, setMode] = useState<Mode>('rap');
  const [rapLines, setRapLines] = useState<string[]>([]);
  const [currentRapper, setCurrentRapper] = useState<Rapper>('LuvBot');
  const [isMuted, setIsMuted] = useState(true);
  const [audio] = useState(new Audio(BGM_URL));

  useEffect(() => {
    audio.loop = true;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audio]);

  useEffect(() => {
    if (isMuted) {
      audio.pause();
    } else {
      audio.play().catch(e => console.log('Audio autoplay prevented'));
    }
  }, [isMuted, audio]);

  const handleRapLine = () => {
    const newLine = currentRapper === 'LuvBot' 
      ? "My code's so hot it needs water cooling! 🔥"
      : "Your algorithms make my circuits fry! 💫";
    
    setRapLines(prev => [...prev, `${currentRapper}: ${newLine}`]);
    setCurrentRapper(prev => prev === 'LuvBot' ? 'Cupidrilla' : 'LuvBot');
  };

  return (
    <div className="min-h-screen bg-[#2A0E61] p-4 sm:p-6 md:p-8 relative overflow-hidden crt-flicker">
      {/* Scanline Effect */}
      <div className="scanline"></div>
      
      {/* Pixel Art Grid Background */}
      <div className="absolute inset-0 pixel-grid"></div>

      <div className="max-w-4xl mx-auto relative">
        {/* Sound Toggle */}
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-4 right-4 z-10 px-4 py-2 bg-pink-600 text-white pixel-box text-xs sm:text-sm hover:bg-pink-700 transition-colors"
        >
          {isMuted ? '🔇 Music Off' : '🔊 Music On'}
        </button>

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="pixel-heart-container mb-4">
            <div className="pixel-heart"></div>
            <div className="pixel-heart" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 md:mb-4 pixel-font pixel-shadow glitch-text">
            AI CRINGE BATTLE
          </h1>
          <p className="text-pink-300 text-sm sm:text-base md:text-lg pixel-font">Where bots battle with their hearts!</p>
        </div>

        {/* Mode Selection */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          {['rap', 'argument', 'flirt'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as Mode)}
              className={`pixel-box flex items-center justify-center gap-2 px-4 py-2 text-white transition-all ${
                mode === m 
                  ? 'bg-pink-600 scale-105' 
                  : 'bg-purple-700 hover:bg-purple-600'
              }`}
            >
              {m === 'rap' && <Mic2 className="w-4 h-4" />}
              {m === 'argument' && <Sparkles className="w-4 h-4" />}
              {m === 'flirt' && <Heart className="w-4 h-4" />}
              <span className="text-sm capitalize pixel-font">{m}</span>
            </button>
          ))}
        </div>

        {/* Battle Arena */}
        <div className="pixel-box bg-purple-900/90 p-4 sm:p-6 md:p-8">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            {['LuvBot 5000', 'Cupidrilla'].map((name) => (
              <div key={name} className="text-center w-1/3">
                <div className={`pixel-box w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 ${
                  name === 'LuvBot 5000' ? 'bg-pink-600' : 'bg-purple-600'
                } mx-auto mb-2 flex items-center justify-center`}>
                  <Bot className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white bot-hover ${
                    currentRapper === (name === 'LuvBot 5000' ? 'LuvBot' : 'Cupidrilla') ? 'animate-bounce' : ''
                  }`} />
                </div>
                <h2 className="text-white text-xs sm:text-sm pixel-font">{name}</h2>
              </div>
            ))}
          </div>

          {/* Battle Content */}
          <div className="space-y-4 mb-6 min-h-[150px] sm:min-h-[200px] overflow-y-auto max-h-[300px] sm:max-h-[400px] scrollbar-hide">
            {rapLines.map((line, index) => (
              <div
                key={index}
                className={`pixel-box p-3 text-xs sm:text-sm ${
                  line.startsWith('LuvBot') 
                    ? 'bg-pink-900/50 text-pink-100 ml-auto w-[85%] sm:w-3/4' 
                    : 'bg-purple-900/50 text-purple-100 w-[85%] sm:w-3/4'
                }`}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={handleRapLine}
              className="pixel-box bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 text-sm sm:text-base hover:scale-105 transition-transform pixel-font"
            >
              Drop that cringe! 🎤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;