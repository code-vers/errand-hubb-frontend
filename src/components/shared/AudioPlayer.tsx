"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Headphones, Volume2 } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  label?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, label = "Audio Overview" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (timeSec: number) => {
    if (isNaN(timeSec) || timeSec === 0) return "0:00";
    const mins = Math.floor(timeSec / 60);
    const secs = Math.floor(timeSec % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex flex-col gap-2 p-3 bg-orange-50/80 border border-orange-200/70 rounded-2xl shadow-sm max-w-xs w-full">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Header Label - Explicitly Audio Overview */}
      <div className="flex items-center justify-between text-xs font-bold text-gray-800">
        <span className="flex items-center gap-1.5 text-[#f47a22]">
          <Headphones size={15} />
          <span>{label}</span>
        </span>
        <span className="text-[10px] font-medium text-gray-500">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* Player Controls & Scrubber */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={togglePlay}
          className="w-8 h-8 flex items-center justify-center bg-[#f47a22] hover:bg-[#e06812] text-white rounded-full transition-all shadow-sm active:scale-95 shrink-0 cursor-pointer"
          aria-label={isPlaying ? "Pause Audio Overview" : "Listen to Audio Overview"}
        >
          {isPlaying ? (
            <Pause fill="currentColor" size={14} />
          ) : (
            <Play fill="currentColor" size={14} className="ml-0.5" />
          )}
        </button>

        {/* Progress bar slider */}
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-[#f47a22]"
          aria-label="Audio Seek Slider"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
