import { useParams } from "react-router-dom";
import {useGetAllProductsQuery} from '../slices/productApiSlice';

import Container from "../utils/Container";
import Section from "../utils/Section";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Title from "../components/Title";

const SearchResultScreen = () => {

  const {keyword } = useParams();
  const {data:collection, isLoading:loadingcollection, error:collectionError } = useGetAllProductsQuery({keyword});

  return (
    <Section className="sm:w-[90%] mx-auto">
    <Title text1={`Search`} text2={`Results`} className={'sm:text-2xl text-lg uppercase mb-8'} />
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

export default SearchResultScreen;