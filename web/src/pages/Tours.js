import React from "react";
import axios from "axios";
import useSWR from "swr";

import TourList from "../components/TourList/TourList";

const baseURL = "http://localhost:3001";

const fetcher = url => axios.get(url).then(res => res.data)

const Tours = () => {
  const { data: tours, mutate: mutateTours } = useSWR(`${baseURL}/tours`, fetcher);

  return <TourList 
    tours={tours}
    mutateTours={mutateTours}
    />
}

export default Tours;