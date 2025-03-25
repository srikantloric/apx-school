import { useEffect, useState } from "react";
import carouselImage from "../../images/carousel_image.jpg";


const CarouselBlock = () => {
  const slides = [
    {
      id: 1,
      imageUrl: carouselImage,
      caption: "Slide 1",
    },
    {
      id: 2,
      imageUrl: carouselImage,
      caption: "Slide 2",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to change the slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0">
              <img
                src={slide.imageUrl}
                alt={slide.caption}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Info Block */}

        {/* <div className="min-h-40  py-10 flex flex-col justify-center">
          <div className="w-[70%] md:absolute top-[30%] grid grid-flow-row md:grid-flow-col">
            <div className="p-3 md:p-6 bg-primary text-white flex flex-row gap-3 md:justify-center items-center">
              <div className="px-2 py-5">
                <img
                  src={scholarshipIcon}
                  alt="scholarshipIcon"
                  height={70}
                  width={70}
                />
              </div>
              <div className="flex flex-col ">
                <p className="text-lg md:text-xl pb-2 hover:text-fade-light font-semibold ">
                  <Link to={"#"}>Scholarship Facility</Link>
                </p>
                <p className="text-xs md:text-sm pr-4">
                  Eimply dummy text printing ypese tting industry.
                </p>
              </div>
            </div>
            <div className="p-3 md:p-6 bg-primary text-white flex flex-row gap-3 md:justify-center items-center">
              <div className="px-2 py-5">
                <img src={bookIcon} alt="bookIcon" height={70} width={70} />
              </div>
              <div className="flex flex-col ">
                <p className="text-lg md:text-xl pb-2 hover:text-fade-light font-semibold ">
                  <Link to={"#"}>Books & Liberary</Link>
                </p>
                <p className="text-xs md:text-sm pr-4">
                  Eimply dummy text printing ypese tting industry.
                </p>
              </div>
            </div>
            <div className="p-3 md:p-6 bg-primary text-white flex flex-row gap-3 md:justify-center items-center">
              <div className="px-2 py-5">
                <img
                  src={teacherIcon}
                  alt="teacherIcon"
                  height={70}
                  width={70}
                />
              </div>
              <div className="flex flex-col ">
                <p className="text-lg md:text-xl pb-2 hover:text-fade-light font-semibold ">
                  <Link to={"#"}>Certified Teachers</Link>
                </p>
                <p className="text-xs md:text-sm pr-4">
                  Eimply dummy text printing ypese tting industry.
                </p>
              </div>
            </div>
          </div>
        </div> */}

    </div>
  );
};

export default CarouselBlock;
