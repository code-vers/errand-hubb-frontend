import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({ rating, size = "sm" }: StarRatingProps) {
  const numericRating = Math.max(0, Math.min(5, Number(rating) || 0));
  const roundedRating = Math.round(numericRating);

  const starSize = size === "sm" ? 12 : size === "md" ? 16 : 20;

  return (
    <div className="flex items-center gap-0.5 shrink-0">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const isFilled = starIndex <= roundedRating;
        return (
          <Star
            key={starIndex}
            size={starSize}
            className={
              isFilled
                ? "fill-amber-400 text-amber-400 shrink-0"
                : "fill-gray-200 text-gray-300 shrink-0"
            }
          />
        );
      })}
    </div>
  );
}
