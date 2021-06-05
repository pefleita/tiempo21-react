import { useEffect, useState } from "react";
import { useQuery } from "../hooks/useQuery";
import { get } from "../utils/httpClient";
import { NewCard } from "./NewCard";
import styles from "./NewsGrid.module.css";
import { Spinner } from "./Spinner";

export function NewsGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const [noticias, setNoticias] = useState([]);

  const query = useQuery();
  const search = query.get("search");

  useEffect(() => {
    setIsLoading(true);
    const searchUrl = search ? "posts?_embed&search=" + search : "posts?_embed";
    get(searchUrl).then((data) => {
      setNoticias(data);
      setIsLoading(false);
    });
  }, [search]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.newsGrid}>
      <ul>
        {noticias.map((noticia) => {
          return <NewCard key={noticia.id} noticia={noticia} />;
        })}
      </ul>
    </div>
  );
}
