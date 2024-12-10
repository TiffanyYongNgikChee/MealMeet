import React, { useState, useEffect } from "react";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of images and descriptions
  const slides = [
    { image: "https://images.twistedfood.co.uk/drmlai3o99aaz.cloudfront.net/wp-content/uploads/317A0175.jpg_C6H6CW?tr=w-600", title: "Panettone Pistachio Bread Pudding", description: "Gifted a panettone and you don't know what to do with it? Make this! Gooey panettone bread and butter pudding, pistachio cream, dark chocolate, and chopped pistachios for the ultimate festive pudding." },
    { image: "https://images.twistedfood.co.uk/drmlai3o99aaz.cloudfront.net/wp-content/uploads/317A0090.jpg_3RnmJm?tr=w-600", title: "Smoked Salmon Potato Pancake", description: "This is kind of like a cross between a rosti and a latke, but giant! Topped with creme fraiche, smoked salmon, and fresh herbs, this is the perfect sharer for Christmas morning!" },
    { image: "https://images.twistedfood.co.uk/drmlai3o99aaz.cloudfront.net/wp-content/uploads/balls.jpg_aVzNKO?tr=w-600", title: "Stuffing Balls & Cheat's Gravy Dip", description: "This recipe rectifies this egregious error and brings them centre stage. Sausage meat, roasted chestnuts, orange zest - the gang are back together!" },
  ];

  useEffect(() => {
    // Set up interval to change slides every 4 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [slides.length]);

  return (
    <div className="poster-carousel">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="carousel-description">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
