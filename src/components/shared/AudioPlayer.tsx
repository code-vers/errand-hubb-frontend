"use client";

import React, { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      <button
        type="button"
        onClick={togglePlay}
        className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-md"
      >
        {isPlaying ? (
          <Pause fill="currentColor" size={20} />
        ) : (
          <Play fill="currentColor" size={20} className="ml-1" />
        )}
      </button>
      <span className="text-gray-800 text-sm font-medium mt-1">Play</span>
    </div>
  );
};

export default AudioPlayer;
