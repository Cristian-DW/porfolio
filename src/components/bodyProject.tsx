import React from 'react';
import ProjectsCard from './extras/Cards';

/**
 * Props for the BodyProject component.
 */
interface BodyProjectProps {
  imgUrl: string;
  alt: string;
}

/**
 * Project data structure.
 */
interface Project {
  title: string;
  description: string;
  fecha: string;
  backgroundImage: string;
  link: string;
  link2: string;
}

/**
 * Example projects data. Replace this with actual data as needed.
 */
const projects: Project[] = [
  {
    title: 'Project 1',
    description: 'Description for project 1',
    fecha: '2023-01-01',
    backgroundImage: 'https://via.placeholder.com/150',
    link: 'https://example.com/project1',
    link2: 'https://example.com/project1/details',
  },
  // Add more projects here
];

/**
 * BodyProject component.
 * This component displays a series of images and a list of similar projects using the ProjectsCard component.
 *
 * @param {string} imgUrl - The URL of the image to display.
 * @param {string} alt - The alt text for the image.
 */
const BodyProject: React.FC<BodyProjectProps> = ({ imgUrl, alt }) => {
  return (
    <section>
      <div>
        {Array.from({ length: 5 }, (_, i) => (
          <img key={i} src={imgUrl} alt={alt} />
        ))}
      </div>

      <div>
        <p>Proyectos similares</p>
        <h3>Descubre mis creaciones</h3>
        <div className="flex flex-wrap justify-center items-center mx-auto gap-6 p-5 2xl:p-0">
          {projects.map((project, index) => (
            <ProjectsCard
              key={index}
              title={project.title}
              description={project.description}
              fecha={project.fecha}
              backgroundImage={project.backgroundImage}
              link={project.link}
              link2={project.link2}
            />
          ))}
        </div>
        <img src={imgUrl} alt={alt} />
      </div>
    </section>
  );
}

export default BodyProject;
