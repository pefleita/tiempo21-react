import { useEffect, useState } from "react";
import { get } from "../utils/httpClient";
import { NewCard } from "./NewCard";
import styles from "./NewsGrid.module.css";

export function NewsGrid() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    get("posts?_embed").then((data) => {
      setNoticias(data);
    });
  }, []);

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
