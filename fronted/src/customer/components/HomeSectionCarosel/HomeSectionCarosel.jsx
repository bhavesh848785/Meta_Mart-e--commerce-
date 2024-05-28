import React, { useState, useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";
import "react-alice-carousel/lib/alice-carousel.css";

const HomeSectionCarosel = ({ data, sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  // const slidePrev = () => setActiveIndex(activeIndex - 1);
  // const slideNext = () => setActiveIndex(activeIndex + 1);

  const slidePrev = () => {
    const newIndex = Math.max(activeIndex - 1, 0);
    setActiveIndex(newIndex);
    console.log("Prev button clicked, activeIndex:", newIndex);
    carouselRef.current.slideTo(newIndex);
  };

  const slideNext = () => {
    const newIndex = Math.min(activeIndex + 1, items.length - 1);
    setActiveIndex(newIndex);
    console.log("Next button clicked, activeIndex:", newIndex);
    carouselRef.current.slideTo(newIndex);
  };

  const syncActiveIndex = ({ item }) => {
    setActiveIndex(item);
    console.log("Slide changed, activeIndex:", item);
  };

  // const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = data
    .slice(0, 10)
    .map((item) => <HomeSectionCard product={item} />);

  // const items = data // Use data directly, no need for slicing
  //   .map((item) => <HomeSectionCard key={item.imageUrl} product={item} />);

  return (
    <div className="border">
      <h2 className="text-2xl font-extrabold text-gray-800 py-5">
        {sectionName}
      </h2>
      <div className="relative p-5">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          onSlideChange={syncActiveIndex}
          activeIndex={activeIndex}
          // transform={translateX}
        />

        {activeIndex !== items.length - 5 && (
          <Button
            variant="contained"
            className="z-50 bg-white"
            onClick={slideNext}
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateX(50%) rotate(90deg)",
              bgcolor: "white",
            }}
            aria-label="next"
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}
        {activeIndex !== 0 && (
          <Button
            onClick={slidePrev}
            variant="contained"
            className="z-50 bg-white"
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0rem",
              transform: "translateX(-50%) rotate(-90deg)",
              bgcolor: "white",
            }}
            aria-label="next"
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(-90deg)", color: "black" }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarosel;
