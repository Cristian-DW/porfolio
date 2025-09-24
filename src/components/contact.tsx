// eslint-disable-next-line no-unused-vars
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * ContactForm component.
 * This component displays a contact form allowing users to input their name, email, and a message.
 * The form data is managed using the useState hook.
 */
const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  /**
   * Handles input changes and updates the formData state.
   *
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event object.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission.
   *
   * @param {FormEvent<HTMLFormElement>} e - The form event object.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes agregar el código para enviar el formulario a tu servidor o realizar alguna acción con los datos recopilados.
    console.log(formData);
  };

  return (
    <div
      id="contact"
      className="px-10 md:px-40 lg:px-96 mb-24 py-10 2xl:grid grid-cols-7 justify-center items-center 2xl:px-40 2xl:min-h-screen"
    >
      <div className="mb-8 2xl:col-span-3 2xl:col-start-2 flex-col justify-center items 2xl:pr-32">
        <h3 className="subtitle text-center 2xl:text-left">{t('contact.title')}</h3>
        <h4 className="text text-center 2xl:text-left">
          <span className="text-xl 2xl:text-3xl">
            {t('contact.subtitle')}
          </span>
        </h4>
        <p className="text-md font-light text-center 2xl:text-left 2xl:text-2xl">
          {t('contact.description')}
        </p>
      </div>

      <div className="2xl:col-span-2 2xl:2xl:col-start-5">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="mb-1 font-light">{t('contact.form.name.label')}</label>
            <input
              className="w-full 2xl:w-full px-4 py-3 border border-gray-300 bg-transparent focus:ring-fondo2 focus:border-fondo2 focus:outline-none focus:ring-2 transition-colors"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-1 font-light">{t('contact.form.email.label')}</label>
            <input
              className="w-full 2xl:w-full px-4 py-3 border border-gray-300 bg-transparent focus:ring-fondo2 focus:border-fondo2 focus:outline-none focus:ring-2 transition-colors"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="message" className="mb-1 font-light">{t('contact.form.message.label')}</label>
            <textarea
              className="w-full 2xl:w-full min-h-20 max-h-32 px-4 py-3 border border-gray-300 bg-transparent focus:ring-fondo2 focus:border-fondo2 focus:outline-none focus:ring-2 transition-colors"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="flex mx-auto h-12 w-full md:w-[28.2rem] 2xl:w-full mt-10 items-center justify-center overflow-hidden bg-transparent border shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:bg-white before:text-opacity-10 before:duration-500 before:ease-out hover:shadow-white hover:before:h-12 hover:before:w-[28.2rem] hover:text-fondo"
            type="submit"
          >
            <span className="z-20">{t('contact.form.submit')}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
