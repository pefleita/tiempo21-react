import { useEffect, useState } from "react";

const API_URL = "https://www.tiempo21.cu/wp-json/wp/v2/";

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
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
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsLoading(false);
          setError(null);
        })
        .catch((err) => {
          setData([]);
          setIsLoading(false);
          setError(err.message);
        });
    };
    fetchData();
  }, [fullUrl]);

  return { data, error, isLoading };
}
