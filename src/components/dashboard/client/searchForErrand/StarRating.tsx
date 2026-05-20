interface StarRatingProps {
  rating: number;
  size?: "sm" | "md";
}

export default function StarRating({ rating, size = "sm" }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const filled = index < Math.floor(rating);
    return filled;
  });

  const sizeClass = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div className='flex text-yellow-400'>
      {stars.map((filled, index) => (
        <svg
          key={index}
          className={`${sizeClass} fill-current`}
          viewBox='0 0 20 20'>
          <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
        </svg>
      ))}
    </div>
  );
}
