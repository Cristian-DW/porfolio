// eslint-disable-next-line no-unused-vars
import React from "react";
import { ImageWithPopover } from "./extras/Popover";
import ImgMicrosoft from "../assets/microsoft.png";
import ImgGoogle from "../assets/google.png";
import ImgSena from "../assets/sena.png"; 
import ImgLinkedIn from "../assets/linke.png"

/**
 * Education component.
 * This component displays educational background and certifications with popovers for detailed information.
 */
function Education: React.FC = () => {
  return (
    <div
      id="education"
      className="p-10 mb-24 mt-20 md:py-40 md:pb-24 2xl:grid grid-cols-7 gap-x-10 justify-center items-center 2xl:px-40 2xl:min-h-screen"
    >
      <div className="md:mb-8 2xl:col-span-4 flex-col 2xl:flex justify-center 2xl:border-r-2 2xl:pr-4">
        <h3 className="subtitle text-center 2xl:text-left">
          Educación
        </h3>
        <p className="text-md font-light 2xl:text-lg">
          Profesional capacitado y apasionado por la creación de soluciones tecnológicas innovadoras. Mi sólida formación en análisis y desarrollo de aplicaciones me ha brindado una comprensión profunda de cómo crear sistemas eficientes y robustos. Sin embargo, mi enfoque va más allá de la funcionalidad técnica: combino mis habilidades técnicas con un conocimiento profundo de marketing digital y diseño UX/UI para ofrecer productos que no solo cumplen con los requisitos técnicos, sino que también cautivan a los usuarios y generan resultados comerciales positivos.
        </p>
      </div>
      <div className="2xl:col-span-3 flex justify-between md:justify-around 2xl:justify-between">
        <article className="hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgSena}
            name="Certificación tecnólogo en Análisis y Desarrollo de Software"
            bio="Adquirí habilidades sólidas en el diseño, creación y mantenimiento de aplicaciones informáticas. Mi formación en el SENA me ha preparado para enfrentar desafíos en el mundo tecnológico."
            fecha="2024"
            ubication="Bogotá DC"
          />
        </article>

        <article className="hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgMicrosoft}
            name="Certificación en fundamentos profesionales del Desarrollo de Software"
            bio="He ganado una comprensión profunda de los principios de la programación, algoritmos y estructuras de datos. Esta certificación respaldada por Microsoft valida mis conocimientos en un estándar reconocido en la industria."
            fecha="2023"
            ubication="Online"
          />
        </article>

        <article className="hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgLinkedIn}
            name="Certificación en Diseño UI/UX: Creando Conexiones Digitales"
            bio="Gracias a LinkedIn Learning he adquirido experiencia en crear experiencias digitales atractivas y funcionales, garantizando la satisfacción del usuario a través de diseños intuitivos y efectivos."
            fecha="2023"
            ubication="Online"
          />
        </article>
        
        <article className="hidden 2xl:block hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgGoogle}
            name="Certificación en fundamentos del Marketing Digital"
            bio="He adquirido habilidades en estrategias de publicidad, análisis de audiencia y técnicas de SEO. Con esta certificación, demuestro mi capacidad para promocionar eficazmente productos en el entorno digital."
            fecha="2023"
            ubication="Online"
          />
        </article>
      </div>
    </div>
  );
}

export default Education;
