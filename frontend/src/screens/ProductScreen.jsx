import { useState, useEffect } from "react";
import { useParams, Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
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
import { toast } from "react-toastify"
import Title from '../components/Title';
import Product from '../components/Product';

import { addToCart } from "../slices/cartSlice";
import { useGetProductByIdOnlyQuery } from "../slices/productApiSlice";
import { useCreateReviewMutation, useGetRelatedProductsQuery} from "../slices/productApiSlice";

const ProductScreen = () => {

    const [image, setImage] = useState('');
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState('');

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    
    const {userInfo} = useSelector((state) => state.auth);

    const { id: productId } = useParams();
    const {data:product, isLoading, refetch, error} = useGetProductByIdOnlyQuery(productId);
    const {data:relatedProducts, isLoading:loadingRelatedProducts} = useGetRelatedProductsQuery(productId);


    const [createReview,{isLoading:creatingReviewLoad}] = useCreateReviewMutation();

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

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createReview({productId, name, title, comment, rating}).unwrap();
            refetch();
            toast.success('Review Added');
        } catch (err) {
            console.log(err)
            toast.error(err?.data?.message || err.error);
        }
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

                        {/* RELATED PRODUCTS */}

                            {!loadingRelatedProducts && relatedProducts.length !==0 &&  (
                            <div className="md:w-[85%] w-full mx-auto">
                                <Section>
                                    <Title text1={'Related'} text2={"Products"}  className={'sm:text-2xl text-lg'} />
                                    <div className="grid sm:grid-cols-3 grid-cols-1">
                                        {relatedProducts.map((product, i) => {
                                            return <Product product={product} key={i}/>
                                        })}
                                    </div>

                                </Section>
                            </div>

                            )}

                        {/* CUSTOMER REVIEWS */}
                        <div className="sm:w-[85%] w-full mx-auto border">
                            <Section>
                                <Title text1={'Customer'} text2={'Reviews'}  className={'sm:text-2xl text-lg'} />
                                <div className="border-b py-4 flex sm:flex-row flex-col justify-between sm:items-center gap-2">
                                    <div>
                                        <Rating value={product.ratings} className="text-2xl my-4" />
                                        <p>Based on {product.numReviews} reviews</p>
                                    </div>
                                    

                                    {!userInfo ? (<Link to='/login' className="btn"> Please login to review </Link>) : (
                                    <>
                                    <button className="btn" onClick={()=>document.getElementById('my_review').showModal()}>Write a review</button>
                                    <dialog id="my_review" className="modal">
                                    <div className="modal-box w-11/12 max-w-5xl">

                                        <form onSubmit={submitHandler} className="flex flex-col gap-6 text-xl uppercase">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="name">Enter your name (Displayed Publicly) </label>
                                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder="Enter your name (public)" className="input input-bordered w-full" />
                                            </div>

                                            <div className="flex gap-2">
                                                <label> Rating </label>
                                                <div className="rating">
                                                {[1, 2, 3, 4, 5].map((value, i) => ( 
                                                    <input
                                                        key={i}
                                                        value={value}
                                                        onChange={(e) => setRating(Number(e.target.value))}
                                                        type="radio"
                                                        name="rating"
                                                        className="mask mask-star"
                                                        checked={rating === value} // Ensures the selected rating is highlighted
                                                    />
                                                    ))}
                                                                                    
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="review-title"> Review Title </label>
                                                <input value={title} onChange={(e) => setTitle(e.target.value)} className='input input-bordered w-full'  placeholder="Give your review a title" type="text" id="review-title" />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="review-desc">Review </label>
                                                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your comments here" type="text" rows={7} id="review-desc" className="textarea textarea-bordered w-full"/>
                                            </div>

                                            <button type="submit" className="btn-main w-[200px]">{creatingReviewLoad ? (<Loader />) : ('Submit Review')}</button>
                                            
                                        </form>
                                        
                                        
                                        <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn">Close</button>
                                        </form>
                                        </div>
                                        </div>
                                        </dialog>

                                    </>

                                    )}
                                                                    
                                </div>

                                <div>
                                    <ul>
                                        {product.reviews.length === 0 ? (<Message error={'No reviews yet'} />) : (
                                            product.reviews.map((review, i) => 
                                                <li className="py-4 border-b" key={i}>
                                                    <div className="flex my-2">   
                                                        <span className="uppercase border-2 border-gray-500 bg-gray-200 font-light rounded-full px-4 py-2 text-center inline-block text-2xl">{review.name[0]}</span>
                                                        <div className="flex flex-col items-start justify-center gap-1 ml-2">
                                                            <Rating value={review.rating} className="text-xl" />
                                                            <p>{review.name}</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-semibold text-xl mb-2">{review.title}</p>
                                                    <p>{review.comment}</p>
                                                </li>
                                            )
                                        )}
                                
                                    </ul>
                                </div>

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

