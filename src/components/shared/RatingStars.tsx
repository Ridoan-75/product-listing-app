import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

export default function RatingStars({ rating, size = "md" }: RatingStarsProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : star - rating < 1
              ? "fill-yellow-400 text-yellow-400 opacity-50"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-gray-700 font-semibold ml-2">{rating}</span>
    </div>
  );
}
