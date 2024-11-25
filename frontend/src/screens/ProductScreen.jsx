import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useGetProductByIdQuery } from "../slices/productApiSlice";

import Container from "../utils/Container";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {

    const [image, setImage] = useState('');
    const { id: productId } = useParams();
    const {data:product, isLoading, error} = useGetProductByIdQuery(productId);

    useEffect(() => {
        setImage(product?.image[0]);
    }, [isLoading])

  return (

    <Container>
        {isLoading ? (<Loader />) : error ? (<Message error={error?.message || error?.data?.message} />) : (
            <>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                
                <div className="border-t-2 pt-10 trasnition-opacity ease-in duration-500 opacity-100">
                    <div className="flex gap-12 flex-col sm:flex-row">
                        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal gap-4 sm:w-[18.7%] w-full">
                                {
                                    product.image.map((img, index) => {
                                        return <img onClick={(e) => setImage(e.target.src)} src={img} key={index} alt={product.name} className="cursor-pointer w-[24%] sm:w-[80%] sm:mb-3 flex-shrink-0 object-cover"/>
                                    })
                                }

                            </div>
                            <div className="">
                                <img className="w-full h-full object-cover" src={image} alt={product.name}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )}
    </Container>
  )
}

export default ProductScreen;