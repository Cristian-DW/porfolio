import { useState, useEffect } from 'react';
import Hero from './components/hero';
import Nav from './components/nav';
import Social from './components/social';
import About from './components/about';
import Education from './components/education';
import Skills from './components/skills';
import Project from './components/project';
import ContactForm from './components/contact';
import Footer from './components/footer';
import Logo from './assets/logo.svg';
import './App.css';
import Theme from './components/extras/Theme';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('bg-fondo2'); // Comenzamos con el tema morado

  useEffect(() => {
    // Recuperar el tema guardado del localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      setSelectedColor(savedTheme);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const changeBackgroundColor = (colorClass: string) => {
    setSelectedColor(colorClass);
    // Guardar el tema en localStorage
    localStorage.setItem('portfolio-theme', colorClass);
  };

  return (
    <div className={`App ${isLoading ? 'loading' : ''}`}>
      <div
        className={`loading-screen ${selectedColor} ${
          isLoading ? 'loading-active' : 'loading-inactive'
        }`}
      >
        <img
          width="100"
          height="100"
          src={Logo}
          alt="logo"
          className="animate-jump-out animate-once animate-delay-500 animate-duration-[1500ms]"
        />
      </div>
      <div className="relative">
        <Hero selectedColor={selectedColor} />
        <div className="fixed top-0 left-0 w-full z-50">
          <Nav />
          <Theme changeBackgroundColor={changeBackgroundColor} />
          <Social selectedColor={selectedColor} />
        </div>
          <main className="relative z-30 bg-gradient-to-b from-transparent bg-fondo mt-[100vh]">
            <About selectedColor={selectedColor} />
            <Skills selectedColor={selectedColor} />
            <Education/>
            <Project/>
            <ContactForm/>
            <Footer selectedColor={selectedColor} />
          </main>
        </div>
      </div>
  );
}

export default App;