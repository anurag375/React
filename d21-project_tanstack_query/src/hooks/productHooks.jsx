import { useQuery } from "@tanstack/react-query"
import { getProductsDataApi } from "../api/productApi"
import { useEffect, useState } from "react";

export const useProductApi = () => {

    // let [filteredProducts, setFilteredProducts] = useState(null);   // STEP> send this function back to ShopPage...

    let { data, isPending, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProductsDataApi,
        staleTime: 5000
    });


    // let filterProducts = (searchParams) => {         // STEP> send this function back to ShopPage...
    //     // console.log(searchParams);

    //     let filterData = data.filter((val) =>
    //         val.title.toLowerCase().includes(searchParams.toLowerCase())
    //     );
    //     console.log(filterData);

    //     setFilteredProducts(filterProducts)
    // };

    return {
        isPending,
        data,
        error,

        // filterProducts,
        // filteredProducts
    }
};


// ====


export const useProduct = () => {
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let getProducts = async () => {
    let data = await getProductsDataApi();
    setProductsData(data);
    setFilteredProducts(data);
    setIsLoading(false);
  };

  let filterProducts = (searchParams) => {
    let filteredData = productsData.filter((val) =>
      val.title.toLowerCase().includes(searchParams.toLowerCase())
    );

    if (filteredData) {
      setFilteredProducts(filteredData);
    }
    console.log(filteredData);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    productsData,
    setProductsData,
    isLoading,
    setIsLoading,
    filteredProducts,
    setFilteredProducts,
    filterProducts,
  };
};