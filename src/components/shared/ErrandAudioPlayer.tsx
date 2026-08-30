"use client";

import React, { useState, useRef, useEffect } from "react";
import { Pause } from "lucide-react";

interface ErrandAudioPlayerProps {
  src: string;
  label?: string;
  className?: string;
}

const ErrandAudioPlayer: React.FC<ErrandAudioPlayerProps> = ({
  src,
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.error("Audio playback error:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <audio ref={audioRef} src={src} preload="metadata" />

      <button
        type="button"
        onClick={togglePlay}
        className="inline-flex items-center gap-2.5 group cursor-pointer active:scale-95 transition-all select-none"
        aria-label={isPlaying ? "Pause Audio" : "Play Audio"}
      >
        {/* Fixed Icon Container - 36px x 36px */}
        <div className="w-9 h-9 relative flex items-center justify-center shrink-0">
          {isPlaying ? (
            <div className="w-8.5 h-8.5 rounded-full bg-[#ff6900] text-white flex items-center justify-center shadow-md">
              <Pause size={18} fill="currentColor" />
            </div>
          ) : (
            <svg
              className="w-8.5 h-8.5 shrink-0 transition-transform group-hover:scale-110 drop-shadow-xs"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M7 6.5C7 5.14 8.49 4.3 9.65 5.01L24.8 14.51C25.92 15.2 25.92 16.8 24.8 17.49L9.65 26.99C8.49 27.7 7 26.86 7 25.5V6.5Z"
                fill="#ff6900"
              />
            </svg>
          )}
        </div>

        {/* Fixed Text Container - Width 80px */}
        <div className="w-[80px] text-left shrink-0">
          <span
            className={`text-[26px] font-black tracking-wider uppercase transition-colors leading-none block ${
              isPlaying ? "text-[#ff6900]" : "text-[#14233c] group-hover:text-[#ff6900]"
            }`}
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            PLAY
          </span>
        </div>
      </button>
    </div>
  );
};

export default ErrandAudioPlayer;
