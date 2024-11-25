import Carousel from "../components/Carousel";
import Section from "../utils/Section";
import Product from "../components/Product";
import Loader from '../components/Loader';
import Message from "../components/Message";
import Container from "../utils/Container";

import {useGetMenProductsQuery, useGetWomenProductsQuery} from '../slices/productApiSlice';


export const HomeScreen = () => {

  const {data:menCollection, isLoading: loadingMenCollection, error: menCollectionError} = useGetMenProductsQuery();
  const {data:womenCollection, isLoading: loadingWomenCollection, error: womenCollectionError} = useGetWomenProductsQuery()


  const slides = ['../../public/images/Cherry-blossom-Japanese-kimono-robe.jpg', '../../public/images/Cherry-blossom-Japanese-kimono-robe.jpg', '../../public/images/Cherry-blossom-Japanese-kimono-robe.jpg']
  
  return (
    <>
      <Carousel slides={slides} />
      <Container>
        <Section heading={'BestSellers (For Her)'}>
          {loadingWomenCollection ? (<Loader />) : womenCollectionError ? (<Message error={womenCollectionError?.message} />) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-3 px-4">
              {womenCollection.map((product) => {
                return <Product product={product} key={product._id}/>
              })}
            </div>

            )}
        </Section>
            
        <Section heading={'BestSellers (For Him)'}>
          {loadingMenCollection ? (<Loader />) : menCollectionError ? (<Message error={menCollectionError?.message || menCollectionError.data?.message} />) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-3 px-4">
              {menCollection.map((product) => {
                return <Product product={product} key={product._id}/>
              })}
            </div>
          )}
        </Section>
      </Container>

</>
  )
}

export default HomeScreen;

