import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  audioUrl: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    const audio = audioRef.current;
    
    // reset state when url changes
    setIsPlaying(false);
    setError(false);
    audio.src = audioUrl;

    const handleError = () => setError(true);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (!audioRef.current || error) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.error("Audio playback failed", e);
        setError(true);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  if (error) return null;

  return (
    <div 
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 hover:scale-105 shadow-glass dark:shadow-glass-dark ${isPlaying ? 'animate-wiggle' : ''}`}
    >
      <div 
        onClick={togglePlay}
        className="glass-panel p-3 rounded-full flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center relative overflow-hidden backdrop-blur-md">
          {isPlaying ? (
            <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-70">
              <span className="w-1 bg-current h-3 animate-[pulse_1s_ease-in-out_infinite]"></span>
              <span className="w-1 bg-current h-5 animate-[pulse_1.2s_ease-in-out_infinite_0.2s]"></span>
              <span className="w-1 bg-current h-2 animate-[pulse_0.8s_ease-in-out_infinite_0.4s]"></span>
            </div>
          ) : (
            <Play size={20} className="text-gray-700 dark:text-gray-300 ml-1 group-hover:text-black dark:group-hover:text-white transition-colors" />
          )}
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-white/20 dark:bg-black/20 backdrop-blur-sm transition-opacity">
              <Pause size={20} className="text-gray-900 dark:text-gray-100" />
            </div>
          )}
        </div>
        
        <div className="pr-2 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] whitespace-nowrap">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold font-display tracking-widest text-gray-700 dark:text-gray-300">
              BGM {isPlaying ? 'PLAYING' : 'PAUSED'}
            </span>
            <button 
              onClick={toggleMute}
              className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
