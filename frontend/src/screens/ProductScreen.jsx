import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useGetProductByIdOnlyQuery } from "../slices/productApiSlice";
import { useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Container from "../utils/Container";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import Section from "../utils/Section";
import { FaPlus, FaMinus } from "react-icons/fa";
import KimonoSizeGuideModel from "../components/KimonoSizeGuideModel";
import RobeSizeGuideModel from "../components/RobeSizeGuideModel";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

const ProductScreen = () => {

    const [image, setImage] = useState('');
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState('');

    const { id: productId } = useParams();
    const {data:product, isLoading, error} = useGetProductByIdOnlyQuery(productId);

    const dispatch = useDispatch();

    useEffect(() => {
        if(product) {
            setImage(product?.image[0]);
            product.size.length > 0 && setSize(product.size[0]);
        }

    }, [product])


    const incrementQty = () => {
        qty < 20 && setQty(qty + 1);
    };

    const decrementQty = () => {
     
        qty > 1 && setQty(qty - 1);
        
    };

    const addToCartHandler = (e) => {
        e.preventDefault();
        dispatch(addToCart({...product, qty, selectedSize: size}));
        toast.success(`${product.name } added to cart`)
    }

  return (

    <Container>
        {isLoading ? (<Loader />) : error ? (<Message error={error?.message || error?.data?.message} />) : (
            <>
              
                <div className="pt-10 trasnition-opacity ease-in duration-500 opacity-100">
                    <div>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-12">
                            {/* GRID 1 */}
                            <div className="flex sm:flex-row flex-col-reverse gap-4 justify-end overflow-hidden">
                                <div className="max-sm:flex gap-3 items-end max-sm:overflow-x-scroll p-1">
                                    {
                                        product.image.map((img, index) => {
                                            return <LazyLoadImage onClick={() => setImage(img)} src={img} key={index} alt={product.name} className={`${image  === img ? "ring-1 ring-black brightness-75" : ""} cursor-pointer sm:mb-3 sm:w-[80px] w-[20%] object-cover`}/>
                                        })
                                    }

                                </div>
                           
                                <div className="sm:w-[500px] w-full ">
                                    <LazyLoadImage effect="blur" src={image} alt={product.name}/>
                                </div>
                            </div>

                            {/* GRID 2 */}
                            <div className="text-center flex flex-col justify-start items-center">
                                <div className="my-4 p-2">
                                    <h3 className="heading-tertiary mb-4">{product.name}</h3>
                                    <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
                                    <span className="text-sm italic bg-gray-100 px-3 py-1 rounded-full">
                                        Tax included - Free shipping for orders above $500
                                    </span>
                                </div>

                            
                                <div className="my-4 w-full">

                                    {product.size?.length > 0 ? (

                                        <>
                                            {product.type === 'robe' && <RobeSizeGuideModel /> }
                                            <label className="mr-2" >Size: </label>
                                            <select className="select select-bordered w-full max-w-xs uppercase w-10/12" onChange={(e) => setSize(e.target.value)} >
                                                {product.size.map((s,i) => <option value={s} key={i}>{s}</option>)}
                                            </select>
                                        </>
                                    ) 
                                                                    
                                    : (
                                        <>
                                            {(product.type === 'kimono' || product.type === 'kimono-jacket') && <KimonoSizeGuideModel /> }
                                        </>
                                    )}

                                </div>

                                <Rating value={product.ratings} text={`${product.numReviews} reviews`} className="text-2xl my-4" />

                                <div className="my-4 flex items-center gap-4 justify-center">
                                    Quantity: 
                                    <button onClick={decrementQty} className="btn"><FaMinus /> </button> 
                                        {qty} 
                                    <button onClick={incrementQty} className="btn"> <FaPlus /> </button>
                                </div>

                                <div className="my-4 w-full">
                                    <button onClick={addToCartHandler} disabled={product.countInStock === 0} className="sm:w-1/2 w-9/12 btn-main">{product.countInStock === 0 ? 'Out of Stock' : ' Add to cart'}</button>
                                </div>

                            </div>
  
                        </div>

                        <div className="md:w-[85%] text-justify mx-auto">
                            <Section>
                                <h2 className="sm:text-3xl text-xl mb-6 font-semibold uppercase">Product Details</h2>
                                <h3 className="heading-tertiary mb-4 sm:text-xl text-lg">Why we love it?</h3>
                                <p className="text-xl tracking-wide leading-10">{product.description}</p>
                            </Section>
                        </div>
                    </div>
                </div>
            </>
        )}
    </Container>
  )
}

export default ProductScreen;

