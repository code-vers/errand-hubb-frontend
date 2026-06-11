"use client";

import { FC } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getImageUrl } from "@/configs/api.config";

interface UserAvatarProps {
  src?: string;
  alt: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

const UserAvatar: FC<UserAvatarProps> = ({
  src,
  alt,
  initials,
  size = "md",
  className,
}) => {
  const imageUrl = getImageUrl(src);

  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        height={300}
        width={300}
        alt={alt}
        className={cn(
          "rounded-xl border-white border-4 object-cover",
          sizeClasses[size],
          className,
        )}
        loading='lazy'
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-lg bg-surface-dim flex items-center justify-center font-bold text-foreground",
        sizeClasses[size],
        className,
      )}>
      {initials || alt.charAt(0).toUpperCase()}
    </div>
  );
};

export default UserAvatar;
