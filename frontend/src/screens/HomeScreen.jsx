import { useEffect } from "react";
import { Link } from "react-router-dom";
import {useGetBestSellingProductsQuery} from '../slices/productApiSlice';

import Hero from "../components/Hero";
import Title from "../components/Title";
import Section from "../utils/Section";
import Product from "../components/Product";
import Loader from '../components/Loader';
import Message from "../components/Message";
import NewsLetterBox from "../components/NewsLetterBox";
import Container from "../utils/Container";
import { FaRegPaperPlane, FaRegCreditCard, FaUndo, FaDiscourse   } from "react-icons/fa";

export const HomeScreen = () => {

  const {data:menCollection, isLoading: loadingMenCollection, refetch:womenRefetch, error: menCollectionError} = useGetBestSellingProductsQuery({category: "men"});
  const {data:womenCollection, isLoading: loadingWomenCollection, refetch:menRefetch, error: womenCollectionError} = useGetBestSellingProductsQuery({category: "women"})
  
  useEffect(() => {
    menRefetch();
    womenRefetch();
  }, [menCollection, womenCollection])

  return (
    <>
      
      <Container>
        <Hero />
        <Section className="sm:w-[90%] mt-8 mx-auto">
          <Title text1={'BESTSELLERS'} text2={'FOR HER'} className={'sm:text-2xl text-lg'} />
          {loadingWomenCollection ? (<Loader />) : womenCollectionError ? (<Message error={womenCollectionError?.message || womenCollectionError.data?.message} />) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-3 px-4">
              {womenCollection.map((product) => {
                return <Product product={product} key={product._id}/>
              })}
            </div>

            )}
        </Section>
            
        <Section className="sm:w-[90%] mx-auto ">
        <Title text1={'BESTSELLERS'} text2={'FOR HIM'} className={'sm:text-2xl text-lg my-2'} />
          {loadingMenCollection ? (<Loader />) : menCollectionError ? (<Message error={menCollectionError?.message || menCollectionError.data?.message} />) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-3 px-4">
              {menCollection.map((product) => {
                return <Product product={product} key={product._id}/>
              })}
            </div>
          )}
        </Section>

      <div className="w-full h-[1px] bg-gray-300 sm:my-8 my-4"> </div>

        <div className="sm:w-[80%] w-[90%] mx-auto pb-4 rounded">
          <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-8">
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <FaRegPaperPlane className="text-2xl mb-2"/>
                <h4 className="font-bold uppercase text-sm">Worldwide Shipping</h4>
              </div>
              <p className="text-justify text-[16px] text-gray-500">We deliver your fashion dreams to your doorstep, no matter where you are in the world. Explore Japanese style effortlessly.</p>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <FaRegCreditCard className="text-2xl mb-2"/>
                <h4 className="font-bold uppercase text-sm">Secure Payment</h4>
              </div>
              <p className="text-justify text-[16px] text-gray-500">Shop with confidence! Our payment system guarantees the security of your transactions and the protection of your information.</p>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <FaUndo className="text-2xl mb-2"/>
                <h4 className="font-bold uppercase text-sm">15-Days Free Returns</h4>
              </div>
              <p className="text-justify text-[16px] text-gray-500">Not satisfied with your purchase? Enjoy hassle-free returns within 15 days, as your satisfaction is our priority.</p>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <FaDiscourse className="text-2xl mb-2"/>
                <h4 className="font-bold uppercase text-sm">24/7 Customer Support</h4>
              </div>
              <p className="text-justify text-[16px] text-gray-500">We are here for you, anytime, anywhere. Our customer support team is ready to assist you at any time.</p>
            </div>

          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-300 sm:my-8 my-4"> </div>

        <Section className="w-[80%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="relative aspect-w-4 aspect-h-3">
                <img
                  src="/images/Women-Collection.jpg"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-row justify-end items-end bg-black/50 hover:bg-transparent text-white p-4 transition">
                  <Link
                    to="/collections/women/"
                    className="sm:text-[14px] text-[10px] uppercase tracking-widest font-bold bg-black hover:bg-black/50 px-4 py-2 rounded transition hover:-translate-y-1"
                  >
                    View
                  </Link>
                </div>
              </div>

              <div className="relative aspect-w-4 aspect-h-3">
                <img
                  src="/images/Men-Collection.jpg"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-row justify-end items-end bg-black/50 hover:bg-transparent text-white p-4 transition">
                  <Link
                    to="/collections/men/"
                    className="sm:text-[14px] text-[10px] uppercase tracking-widest font-bold bg-black hover:bg-black/50 px-4 py-2 rounded transition hover:-translate-y-1"
                  >
                    View
                  </Link>
                </div>
              </div>

              <div className="relative aspect-w-4 aspect-h-3">
                <img
                  src="/images/Accessories-main.jpg"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-row justify-end items-end bg-black/50 hover:bg-transparent text-white p-4 transition">
                  <Link
                    to="/collections/accessories/"
                    className="sm:text-[14px] text-[10px] uppercase tracking-widest font-bold bg-black hover:bg-black/50 px-4 py-2 rounded transition hover:-translate-y-1"
                  >
                    View
                  </Link>
                </div>
              </div>
          </div>

        </Section>

          <div className="py-16">
            <NewsLetterBox />
          </div>

      </Container>

</>
  )
}

export default HomeScreen;

