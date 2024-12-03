const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="border-t px-8 pt-12 pb-4">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm ">
        <div className="">
        <span className="logo-text">ShinrinShop</span> 
          <p className="w-full sm:w-2/3 text-gray-600">
            Shop with us and experience the convenience of online shopping
            like never before.
          </p>
        </div>

        <div className="">
          <p className="text-xl font-medium mb-5">COMPANY</p>

          <ul className="flex flex-col flex-1 text-gray-600 cursor-pointer">
            <li onClick={scrollToTop} className="mb-2">
              Home
            </li>
            <li onClick={scrollToTop} className="mb-2">
              About Us
            </li>
            <li onClick={scrollToTop} className="mb-2">
              Delivery
            </li>
            <li onClick={scrollToTop} className="mb-2">
              Privacy policy
            </li>
          </ul>
        </div>

        <div className="">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col flex-1 text-gray-600">
            <li className="mb-2">+123 456 7890</li>
            <li className="mb-2">contact@shinrinshop.com </li>
          </ul>
        </div>
      </div>
      <div>
  
        <p className="py-5 text-sm text-center">
          &copy; Copyright, shinrinshop.com, 2024 - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;