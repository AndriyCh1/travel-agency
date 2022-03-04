import React from "react";
import GuideList from "../components/GuideList/GuideList";

import axios from "axios";
import useSWR from "swr";

const fetcher = url => axios.get(url).then(res => res.data)
const baseURL = "https://agency-api31.herokuapp.com";

const Guides = () => {
  const { data: guides, mutate: mutateGuides} = useSWR(`${baseURL}/guides`, fetcher);

  return <GuideList 
    guides={guides}
    mutateGuides={mutateGuides}
  />
}

export default Guides;