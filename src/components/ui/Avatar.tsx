// components/ui/Avatar.tsx
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import { getImageUrl } from "@/configs/api.config";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export const Avatar: FC<AvatarProps> = ({
  src,
  alt,
  size = "md",
  className,
}) => {
  const finalSrc = getImageUrl(src) || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop";
  
  return (
    <Image
      src={finalSrc}
      alt={alt}
      height={200}
      width={200}
      className={cn("rounded object-cover", sizeClasses[size], className)}
      loading='lazy'
    />
  );
};
