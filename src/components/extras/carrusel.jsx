"use client";
import { Carousel } from "keep-react";

export const CarouselComponent = () => {
  return (
    <Carousel indicatorsType="ring" indicators={true} itemToShow={3} autoPlay={false}>
      <div className="card">
        {/* Card 1 content */}
        <h3>Card 1</h3>
        <p>Card 1 description</p>
      </div>
      <div className="card">
        {/* Card 2 content */}
        <h3>Card 2</h3>
        <p>Card 2 description</p>
      </div>
      <div className="card">
        {/* Card 3 content */}
        <h3>Card 3</h3>
        <p>Card 3 description</p>
      </div>
      <div className="card">
        {/* Card 4 content */}
        <h3>Card 4</h3>
        <p>Card 4 description</p>
      </div>
    </Carousel>
  )
}
