import React from "react";
import CategoryList from "../components/CategoryList/CategoryList";
import axios from "axios";
import useSWR from "swr";
const fetcher = url => axios.get(url).then(res => res.data)
const baseURL = "https://agency-api31.herokuapp.com";

const Categories = () => {

  const { data: catrgories, mutate: mutateCategories} = useSWR(`${baseURL}/categories`, fetcher);
  
  return <CategoryList 
    categories={catrgories}
    mutateCategories={mutateCategories}
    />
}

export default Categories;