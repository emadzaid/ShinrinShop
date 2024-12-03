const Section = ({ heading, children, className = "" }) => {
    return (
      <section className={`py-8 px-4 sm:px-6 lg:px-8 ${className}`}>
        {heading && <h2 className="text-md mb-8 uppercase font-bold">{heading}</h2>}
        {children}
      </section>
    );
  };
  
  export default Section;
  