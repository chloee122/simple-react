import { ReactElement, useState } from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  numOfStar?: number;
}

export default function StarRating({ numOfStar = 5 }: StarRatingProps) {
  const [rating, setRating] = useState<number>(0);

  const [hover, setHover] = useState<number>(0);

  const renderedStars: ReactElement[] = [...Array(numOfStar)].map(
    (_, index) => {
      index += 1;
      return (
        <FaStar
          key={index}
          style={{ color: index <= (hover || rating) ? "yellow" : undefined }}
          onMouseEnter={() => {
            setHover(index);
          }}
          onMouseLeave={() => setHover(0)}
          onClick={() => setRating(index)}
          size={40}
        />
      );
    }
  );

  return <div className="flex justify-center h-screen">{renderedStars}</div>;
}
