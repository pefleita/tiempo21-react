import { useEffect, useState } from "react";

const API_URL = "https://www.tiempo21.cu/wp-json/wp/v2/";

export function useFetch(url) {
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fullUrl = API_URL + url;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = () => {
      fetch(fullUrl)
        .then((res) => {
          if (!res.ok) {
            throw Error(
              "Ups... Lo sentimos, al parecer el servicio de noticias no está funcionando."
            );
          }
          setTotalPages(res.headers.get("x-wp-totalpages"));
          return res.json();
        })
        .then((data) => {
          setNewsList(data);
          setIsLoading(false);
          setError(null);
        })
        .catch((err) => {
          setNewsList([]);
          setIsLoading(false);
          setError(err.message);
        });
    };
    fetchData();
  }, [fullUrl]);

  return { newsList, error, isLoading, totalPages };
}
