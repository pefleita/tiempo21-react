import { useFetch } from "../hooks/useFetch";
import { useQuery } from "../hooks/useQuery";
import { Error } from "./Error";
import { NewCard } from "./NewCard";
import { Spinner } from "./Spinner";
import styles from "./NewsGrid.module.css";
import { useEffect, useState } from "react";

export function NewsGrid() {
  const [page, setPage] = useState(1);
  const [noticias, setNoticias] = useState([]);

  const query = useQuery();
  const search = query.get("search");
  
  useEffect(() => {
    setPage(1);
    setNoticias([]);
  }, [search]);

  const searchUrl = search
    ? "posts?_embed&search=" + search + `&page=${page}`
    : `posts?_embed&page=${page}`;

  const { newsList, error, isLoading, totalPages } = useFetch(searchUrl);

  useEffect(() => {
    if (page === 1) {
      setNoticias([]);
    }
    setNoticias((noticias) => [...noticias, ...newsList]);
  }, [newsList]);

  if (!isLoading) {
    console.log(noticias);
    console.log(search);
    console.log(searchUrl);
    console.log(totalPages);
    console.log(newsList);
    console.log("Page: " + page);
  }

  if (isLoading && page === 1) {
    return <Spinner />;
  }

  if (error) {
    return <Error err={error} />;
  }

  return (
    <div className={styles.newsGrid}>
      <ul>
        {noticias.map((noticia) => {
          return <NewCard key={noticia.id} noticia={noticia} />;
        })}
      </ul>
      <div className={styles.loadMoreButton}>
        {totalPages !== page && (
          <button disabled={isLoading ? true : false} className={isLoading ? styles.btnDisable : styles.btnEnable} onClick={() => setPage(page + 1)}>
            {isLoading ? "Cargando..." : "Cargar más"}
          </button>
        )}
      </div>
    </div>
  );
}
