import react from 'react'
import ProjectsCard from './extras/cards';









const BodyProject = ({imgUrl, alt}) =>{

    return (
      <>
        <section>
          <div>
          <img src={imgUrl} alt={alt} />
          <img src={imgUrl} alt={alt} />
          <img src={imgUrl} alt={alt} />
          <img src={imgUrl} alt={alt} />
          <img src={imgUrl} alt={alt} />
          </div>

          <div>
            <p>Proyectos similares</p>
            <h3>Descubre mis creaciones</h3>
            <div className="flex flex-wrap justify-center items-center  mx-auto gap-6 p-5 2xl:p-0 ">
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
        <img src={imgUrl} alt={alt}  />
          </div>
          </div>
        </section>
      </>
    );
}

export default BodyProject;