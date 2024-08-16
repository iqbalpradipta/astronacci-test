import React, { useEffect, useState } from "react";
import { API } from "../../../libs/api";
import { IVideoResponse, ITitleVideo } from "../types/titleTypes";
import { useParams } from "react-router-dom";

export default function GetAllVideoHooks() {
    const [response, setResponse] = useState<IVideoResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
        try {
          const result = await API.get("/video");
          console.log("API Response:", result); 
          setResponse(result.data); 
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      }
      fetchData();
  }, []);


  return {
    response,
  };
}

export function GetVideoByIdHooks() {
    const [response, setResponse] = useState<ITitleVideo | null>(null);
    const { id } = useParams()

  useEffect(() => {
    async function fetchData() {
        try {
          const result = await API.get(`/video/${id}`);
          console.log("API Response:", result);
          setResponse(result.data.data);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      }
      if (id) {
        fetchData();
      }
  }, [id]);


  return {
    response,
  };
}
