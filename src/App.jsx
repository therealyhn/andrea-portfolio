import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Portfolio from "./components/sections/Portfolio";
import WhyMeSec from "./components/sections/WhyMeSec";
import Contact from "./components/sections/Contact";
// import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <>
      <Hero />
      <About />
      <Portfolio />
      <WhyMeSec />
      <Contact />
      {/* <Footer /> */}
    </>
  );
}
