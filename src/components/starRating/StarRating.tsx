import { ReactElement, useState } from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  numOfStar: number;
}

export default function StarRating({ numOfStar }: StarRatingProps) {
  const [activeStar, setActiveStar] = useState<number>(-1);

  const [hoveredStar, setHoveredStar] = useState<number>(-1);

  const renderedStars: ReactElement[] = [];
  for (let i = 0; i < numOfStar; i++) {
    const hovered = i <= hoveredStar ? "yellow" : undefined;
    const active = i <= activeStar ? "yellow" : undefined;

    renderedStars.push(
      <FaStar
        className="text-4xl"
        style={{ color: hovered || active }}
        // style={{
        //   color: i <= (activeStar || hoveredStar) ? "yellow" : undefined,
        // }}
        onMouseEnter={() => setHoveredStar(i)}
        onMouseLeave={() => setHoveredStar(-1)}
        onClick={() => setActiveStar(i)}
      />
    );
  }

  return <div className="flex justify-center h-screen">{renderedStars}</div>;
}
