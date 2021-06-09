import { useFetch } from "../hooks/useFetch";
import { useQuery } from "../hooks/useQuery";
import { Error } from "./Error";
import { NewCard } from "./NewCard";
import { Spinner } from "./Spinner";
import styles from "./NewsGrid.module.css";

export function NewsGrid() {
  const query = useQuery();
  const search = query.get("search");
  const searchUrl = search ? "posts?_embed&search=" + search : "posts?_embed";

  const { data, error, isLoading } = useFetch(searchUrl);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Error err={error} />;
  }

  return (
    <div className={styles.newsGrid}>
      <ul>
        {data.map((noticia) => {
          return <NewCard key={noticia.id} noticia={noticia} />;
        })}
      </ul>
    </div>
  );
}
