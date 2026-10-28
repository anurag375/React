import { axiosInstance } from '../config/axiosInstance'

export let getProductsDataApi = async() => {
    try{
    //   let res = await axios.get('https://dummyjson.com/products');     // never use "axios" directly here..
      let res = await axiosInstance.get('/products');
      console.log('1st res:', res.data.products);
    //   setProductsData(res.data.products);    // *U* cannot write this here..
    return res.data.products;
    } catch(error) {
      console.log("error in products api:", error);
    } 
    // finally {  
    //   setIsLoading(false);     // *U* cannot write this here..
    // }
  }