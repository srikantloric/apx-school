import { useState, useEffect, useRef } from "react";
import card1 from "../../images/courseimg1.jpg";
import card2 from "../../images/courseimg2.jpg";
import card3 from "../../images/courseimg3.jpg";
import { CardProps } from "../../types/home";
import { Link } from "react-router-dom";

const cards: CardProps[] = [
  {
    image: card1,
    tag: "Science Side",
    title: "10+2 Level",
    description: "Intermediate course in Science (Math / Biology)",
  },
  {
    image: card2,
    tag: "Art Side",
    title: "10+2 Level",
    description: "",
  },
  {
    image: card3,
    tag: "Commerce Side",
    title: "10+2 Level",
    description: "Intermediate course in Commerce (Accounting / Banking)",
  },
];

const CardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fix: Use ReturnType<typeof setInterval> for the ref type
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(handleNext, 3000);
    };

    const stopInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    startInterval();

    return () => {
      stopInterval();
    };
  }, []);

  const visibleCards = cards.slice(currentIndex, currentIndex + 3);

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / cards.length)}%)`,
        }}
      >
        {visibleCards.map((card, index) => (
          <div
            key={index}
            className="w-[90%] md:w-1/3 mx-3 flex-shrink-0 bg-white rounded-lg shadow-md hover:bg-[#002147] hover:text-white transition-colors duration-700 ease-in-out"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-48 object-cover mb-4"
            />
            <div className="p-4">
              <p className="text-[#ff0000] text-sm">
                <Link to={"#"}>{card.tag}</Link>
              </p>
              <h3 className="text-xl font-semibold my-2">{card.title}</h3>
              <p className="text-sm">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <button
          className="bg-primary hover:bg-[#6b0427] text-white font-bold py-2 px-4 rounded"
          onClick={handlePrev}
        >
          Prev
        </button>
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <button
          className="bg-primary hover:bg-[#6b0427] text-white font-bold py-2 px-4 rounded"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardCarousel;
