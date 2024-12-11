import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import heroImage from '/images/Kimono-Collection-Banner_2400x.jpg';

const Hero = () => {
  return (
    <div className="relative sm:bg-center bg-right bg-cover bg-no-repeat h-[500px] w-full mx-auto border-gray-400 bg-[url('/images/Kimono-Collection-Banner_2400x.jpg')]">
      {/* Gradient Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-gradient-to-tl from-black opacity-80"></div>

      {/* Hero Content */}
      <div className="relative flex flex-col justify-center items-center h-full text-center text-white px-6 md:px-12">
        <h1 className="text-3xl md:text-5xl font-light leading-tight tracking-wider">
          Explore Our Exquisite Kimono Collection
        </h1>
        <p className="text-lg md:text-xl mt-4 font-light">
          Discover timeless pieces designed for elegance and comfort
        </p>

      </div>
    </div>
  );
};
  export default Hero;
