// eslint-disable-next-line no-unused-vars
import React from "react";
import { ImageWithPopover } from "./extras/Popover";
import ImgMicrosoft from "../assets/microsoft.png";
import ImgGoogle from "../assets/google.png";
import ImgSena from "../assets/sena.png"; 
import ImgLinkedIn from "../assets/linke.png"
import { useTranslation } from 'react-i18next';


/**
 * Education component.
 * This component displays educational background and  with popovers for detailed information.
 */
const Education: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div
      id="education"
      className="p-10 mb-24 mt-20 md:py-40 md:pb-24 2xl:grid grid-cols-7 gap-x-10 justify-center items-center 2xl:px-40 2xl:min-h-screen"
    >
      <div className="md:mb-8 2xl:col-span-4 flex-col 2xl:flex justify-center 2xl:border-r-2 2xl:pr-4">
        <h3 className="subtitle text-center 2xl:text-left">
          {t('education.title')}
        </h3>
        <p className="text-md font-light 2xl:text-lg">
          {t('education.description')}
        </p>
      </div>
      <div className="2xl:col-span-3 flex justify-between md:justify-around 2xl:justify-between">
        <article className="hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgSena}
            name={t('education.sena.name')}
            bio={t('education.sena.bio')}
            fecha={t('education.sena.fecha')}
            ubication={t('education.sena.ubication')}
          />
        </article>

        <article className = "hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgMicrosoft}
            name={t('education.microsoft.name')}
            bio={t('education.microsoft.bio')}
            fecha={t('education.microsoft.fecha')}
            ubication={t('education.microsoft.ubication')}
          />
        </article>

        <article className="hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgLinkedIn}
            name={t('education.linkedin.name')}
            bio={t('education.linkedin.bio')}
            fecha={t('education.linkedin.fecha')}
            ubication={t('education.linkedin.ubication')}
          />
        </article>
        
        <article className="hidden 2xl:block hover:cursor-pointer">
          <ImageWithPopover
            imageUrl={ImgGoogle}
            name={t('education.google.name')}
            bio={t('education.google.bio')}
            fecha={t('education.google.fecha')}
            ubication={t('education.google.ubication')}
          />
        </article>
      </div>
    </div>
  );
}

export default Education;
