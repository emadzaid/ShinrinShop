import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {useGetWomenCollectionQuery, useGetMenCollectionQuery, useGetAccessoriesQuery, useGetProductsByTypeAndCategoryQuery } from "../slices/productApiSlice";

import Title from "../components/Title";
import Section from "../utils/Section";
import Container from "../utils/Container";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

const CollectionsScreen = () => {
  const { category, type } = useParams();
  const { data: collection, isLoading: loadingcollection, error: collectionError } =
    type && category
      ? useGetProductsByTypeAndCategoryQuery({ category, type })
      : category === 'women'
      ? useGetWomenCollectionQuery()
      : category === 'men'
      ? useGetMenCollectionQuery()
      : useGetAccessoriesQuery();

  const [sortedCollection, setSortedCollection] = useState([]);

  useEffect(() => {
    if (collection) setSortedCollection(collection); // Initialize sortedCollection with fetched data
  }, [collection]);

  const handleSortChange = (e) => {
    const sortOption = e.target.value;

    if (sortOption === 'recommended') {
      setSortedCollection(collection); // Reset to original order
    } else if (sortOption === 'highToLow') {
      setSortedCollection([...collection].sort((a, b) => b.price - a.price));
    } else if (sortOption === 'lowToHigh') {
      setSortedCollection([...collection].sort((a, b) => a.price - b.price));
    } else if (sortOption === 'bestSelling') {
      setSortedCollection([...collection].sort((a, b) => {
        if (a.bestSelling === b.bestSelling) return 0;
        return a.bestSelling ? -1 : 1; // Prioritize `true` over `false`
      }));
    }
  };

  return (
    <Section className="sm:w-[90%] mx-auto">
      <Title
        text1={`${category}`}
        text2={`${type?.replace(/-/g, ' ') || 'Collection'}`}
        className={'sm:text-2xl text-lg uppercase mb-8'}
      />
      <Container>
        {loadingcollection ? (
          <Loader />
        ) : collectionError ? (
          <Message error={collectionError?.message || collectionError.data?.message} />
        ) : (
          <>
            <div className="flex max-[450px]:flex-col items-center gap-2 justify-between mb-4">
              <p className="text-gray-500 max-sm:text-sm max-[450px]:self-start">
                <strong>{sortedCollection?.length}</strong> products
              </p>
              <form className="max-[450px]:self-end">
                <select className="select select-bordered" onChange={handleSortChange}>
                  <option value="recommended">Recommended</option>
                  <option value="bestSelling">Best Selling</option>
                  <option value="highToLow">Price: High to Low</option>
                  <option value="lowToHigh">Price: Low to High</option>
                </select>
              </form>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-3 px-4">
              {sortedCollection.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          </>
        )}
      </Container>
    </Section>
  );
};

export default CollectionsScreen;
