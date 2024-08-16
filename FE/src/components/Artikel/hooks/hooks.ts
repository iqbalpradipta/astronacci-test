import React, { useEffect, useState } from "react";
import { API } from "../../../libs/api";
import { IArtikelResponse, ITitleArtikel } from "../types/titleTypes";
import { useParams } from "react-router-dom";

export default function GetAllArtikelHooks() {
    const [response, setResponse] = useState<IArtikelResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
        try {
          const result = await API.get("/artikel");
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

export function GetArtikelByIdHooks() {
    const [response, setResponse] = useState<ITitleArtikel | null>(null);
    const { id } = useParams()

  useEffect(() => {
    async function fetchData() {
        try {
          const result = await API.get(`/artikel/${id}`);
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
