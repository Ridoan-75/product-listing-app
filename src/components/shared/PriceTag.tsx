interface PriceTagProps {
  price: number;
  size?: "sm" | "md" | "lg";
}

export default function PriceTag({ price, size = "md" }: PriceTagProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <span className={`font-bold text-violet-600 ${sizeClasses[size]}`}>
      ${price.toFixed(2)}
    </span>
  );
}
