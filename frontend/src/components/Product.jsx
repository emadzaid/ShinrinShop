import { Link } from "react-router-dom";

const Product = ({ product }) => {
  
  const images = product.image.slice(0, 2);
  return (
    <div className="w-full max-w-sm rounded-lg overflow-hidden py-2 px-1 mx-auto hover:bg-gray-100 transition duration-300 ease-in-out px-2">
      <Link to={`/collections/${product.category}/${product.type}/${product._id}`}>
        <div className="relative overflow-hidden aspect-w-[1] aspect-h-[1.5] mb-4">
          <img
            className="absolute inset-0 w-full h-full"
            src={images[0]}
            onMouseOver={(e) => (e.target.src = images[1])}
            onMouseOut={(e) => (e.target.src = images[0])}
            alt={product.name}
          />
        </div>
        
        <span className="uppercase font-bold font-md">{product.type}</span>
        <p className=" mb-2 text-sm font-light">{product.name}</p>
        <span className="font-md">${product.price.toFixed(2)}</span>
      </Link>
    </div>
  );
};

export default Product;