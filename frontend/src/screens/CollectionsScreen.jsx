import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {useGetProductsByCategoryQuery, useGetProductsByTypeAndCategoryQuery } from "../slices/productApiSlice";

import Title from "../components/Title";
import Section from "../utils/Section";
import Container from "../utils/Container";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

const CollectionsScreen = () => {

    const {category, type} = useParams();    
    const {data:collection, isLoading:loadingcollection, refetch, error:collectionError} = type ? useGetProductsByTypeAndCategoryQuery({category, type}) : useGetProductsByCategoryQuery({category}) ;
 
    //  Refetch when category/type changes (if needed)
    
    useEffect(() => {
      refetch();
    }, [category, type]);

    return (
    <Section className="sm:w-[90%] mx-auto">
        <Title text1={`${category}`} text2={`${type?.replace(/-/g, ' ') || 'Collection'}`} className={'sm:text-2xl text-lg uppercase mb-8'} />
        <Container>
            {loadingcollection ? (<Loader />) : collectionError ? (<Message error={collectionError?.message || collectionError.data?.message} />) : (
              <>
              <p className="text-end mb-6"><strong>{collection?.length}</strong> products</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-3 px-4">
                  {collection.map((product) => {
                  return <Product product={product} key={product._id}/>
                  })}
              </div>
            </>
        )}
        </Container>
    </Section>
  )
}

export default CollectionsScreen