import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { getProductsDataApi } from '../api/productApi';
import { useQuery } from '@tanstack/react-query';
import { useProduct, useProductApi } from '../hooks/productHooks';
import Filters from '../components/Filters';

const ShopPage = () => {

  // ====  ====  ====
  // handled by Tanstack query:
  // const [productsData, setProductsData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  
  // const [filteredProducts, setFilteredProducts] = useState([]);


  // ================

  // let getProductsData = async() => {   // STEP 5 from copy> send these to "productApi.jsx"
  //   try{
  //     let res = await axios.get('https://dummyjson.com/products');
  //     console.log(res.data.products);
  //     setProductsData(res.data.products);
  //   } catch(error) {
  //     console.log("error in products api:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // let getProducts = async() => {     // 7>
  //   let data = await getProductsDataApi();
  //   setProductsData(data);
  //   setIsLoading(false);

  //   setFilteredProducts(data);
  // }

    // let filterProducts = (searchParams) => {       // 7>
    //     // console.log(searchParams);

    //     let filteredData = productsData.filter((val) =>
    //         val.title.toLowerCase().includes(searchParams.toLowerCase())
    //     );
    //     console.log(filteredData);

    //     setFilteredProducts(filteredData)
    // };

  // useEffect(() => {      // 7>
  //   // getProductsData();
  //   getProducts();
  // }, []);


  // ==== PROBLEM: ====
  // let data = getProductsDataApi();   // ***U*** returns a "Promise", (since "productApi.jsx" has a async function)
  // console.log('2nd res: ', data);

  // getProductsDataApi().then((val) => setProductsData(val));
  // ***U*** [NO async-await or .then]
  // ====   ====   ====


  // ====  ====  ====
  // NOT handled by Tanstack query:
  // let getData = async() => {
  //   let data = await getProductsDataApi();
  //   console.log('2nd res: ', data);
  //   setProductsData(data);

  //   setIsLoading(false);
  // } 

  // useEffect(() => {
  //   getData();
  // }, []);
  // ================

  // STEP 6> Using Tanstack Queries:
  // const query = useQuery({ 
    // or...
  // const {data, isPending, error} = useQuery({ 
  //   queryKey: ['products'], 
  //   queryFn: getProductsDataApi ,
  //   staleTime: 5000
  // })

  // const {isPending, data, error} = useProductApi();

  // if(error) return <h1> {error.message} </h1>

  let {filteredProducts, filterProducts, isLoading} = useProduct();

  return (
    <div className="min-h-screen bg-black p-8">

      <Filters filterProducts={filterProducts} />
      {/* <Filters /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {/* 1> Without card skeleton */}
        {/* {
          productsData.map((product) => {
            return <ProductCard key={product.id} product={product} />
          })
        } */}

        {/* 2> With card skeleton */}
        {
          isLoading ?
          // isPending ?
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton   key={index} />
          ))
          : filteredProducts?.map((product) => (
          // : productsData?.map((product) => (
          // : data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </div>
  )
}

export default ShopPage
