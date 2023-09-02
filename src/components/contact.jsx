// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar el código para enviar el formulario a tu servidor o realizar alguna acción con los datos recopilados.
    console.log(formData);
  };

  return (
    <div
      id="contact"
      className=" p-10 mb-24   2xl:grid  grid-cols-7 justify-center items-center 2xl:px-40 2xl:min-h-screen  "
    >
      <div className="mb-8 2xl:col-span-3 2xl:col-start-2 flex-col  justify-center items-center  2xl:pr-32">
        <h3 className="subtitle text-center 2xl:text-left">Contáctame</h3>
        <h4 className="text lg:text-center ">
          <span className="text-xl 2xl:text-3xl ">
            ¿Tienes un problema que resolver?
          </span>
        </h4>
        <p className="text-md font-light   2xl:text-lg lg:text-center">
          Cuéntame tus ideas para desarrollar el sitio web de tus sueños.
        </p>
      </div>

      <div className="2xl:col-span-2 2xl:col-start-5 flex flex-col items-center justify-center ">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="mb-1 font-light ">
              Nombre
            </label>
            <input
              className=" 2xl:w-full px-4 py-3 border border-gray-300  bg-transparent focus:ring-fondo2 focus:border-fondo2 focus:outline-none focus:ring-2 transition-colors  "
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-1 font-light ">
              Email
            </label>
            <input
              className=" 2xl:w-full px-4 py-3 border border-gray-300  bg-transparent focus:ring-fondo2 focus:border-fondo2 focus:outline-none focus:ring-2 transition-colors "
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="message" className="mb-1 font-light  ">
              Mensaje
            </label>
            <textarea
              className=" 2xl:w-full min-h-20 max-h-32   px-4 py-3 border border-gray-300  bg-transparent focus:ring-fondo2 focus:border-fondo2 focus:outline-none focus:ring-2 transition-colors "
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="flex h-12 w-80  2xl:w-full mt-10 items-center justify-center overflow-hidden bg-transparent border shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:bg-white  before:text-opacity-10 before:duration-500 before:ease-out hover:shadow-white hover:before:h-12 hover:before:w-[20rem] 2xl:hover:before:w-[28.2rem] hover:text-fondo"
            type="submit"
          >
            <span className="z-20">Enviar &#x1F680;</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

