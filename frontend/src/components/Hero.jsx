import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import heroImage from '/images/Kimono-Collection-Banner_2400x.jpg';

const Hero = () => {

    return (
      <div className="flex flex-col sm:flex-row border border-gray-400">
        {/* Hero Left Side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 bg-neutral-100/50 ">
          <div className="text-[#414141]">
            <div className="flex items-center gap-2 ">
              <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
              <p className="font-medium text-sm md:text-base ">OUR BESTSELLERS</p>
            </div>
            <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed ">
              {' '}
              Latest Arrivals
            </h1>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm md:text-base ">SHOP NOW</p>
              <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
            </div>
          </div>
        </div>  
        <LazyLoadImage src={heroImage} alt="hero-banner"  className="w-full sm:w-1/2" />
      </div>
    );
  };
  
  export default Hero;