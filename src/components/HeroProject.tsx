import React from "react";

/**
 * Props for the HeroProject component.
 */
interface HeroProjectProps {
  date: string;
  name: string;
  description: string;
  type: string;
  imageUrl: string;
  alt: string;
}

/**
 * HeroProject component.
 * This component renders a project hero section with an image, project details, and a link to view the project.
 * 
 * @param {string} date - The date of the project.
 * @param {string} name - The name of the project.
 * @param {string} description - A brief description of the project.
 * @param {string} type - The type/category of the project.
 * @param {string} imageUrl - The URL of the project's image.
 * @param {string} alt - The alt text for the project's image.
 */
const HeroProject: React.FC<HeroProjectProps> = ({ date, name, description, type, imageUrl, alt }) => {
  return (
    <section>
      <div className="" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className="w-full">
        <div className="">
          <img src={imageUrl} alt="imagen volver" />
          <p>Volver</p>
        </div>
        <div>
          <p>{date}</p>
          <h3>{name}</h3>
          <p>{description}</p>
          <p>{type}</p>
        </div>
        <div>
          <button><a href="">Ver Proyecto</a></button>
          <img width="16px" height="16px" src={imageUrl} alt={alt} className="" />
        </div>
      </div>
    </section>
  );
}

export default HeroProject;
