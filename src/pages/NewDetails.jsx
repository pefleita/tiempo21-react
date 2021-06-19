import { useParams } from "react-router-dom";
import { FiCalendar, FiUser } from "react-icons/fi";
import { Spinner } from "../components/Spinner";
import styles from "./NewDetails.module.css";
import { useFetch } from "../hooks/useFetch";
import { Error } from "../components/Error";

export function NewDetails() {
  const { newSlug } = useParams();
  const url = "posts?_embed&slug=" + newSlug;

  const { newsList, error, isLoading } = useFetch(url);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Error err={error} />;
  }

  return (
    <>
      {newsList.map((noticia) => {
        return (
          <div key={noticia.id} className={styles.detailsContainer}>
            <div>
              <div className={styles.imageContainer}>
                <img
                  width={800}
                  height={420}
                  src={
                    noticia._embedded["wp:featuredmedia"][0].media_details.sizes
                      .full.source_url
                  }
                  alt={noticia.title.rendered}
                />
              </div>
              <h2
                dangerouslySetInnerHTML={{ __html: noticia.title.rendered }}
              ></h2>
              <ul className={styles.meta}>
                <li>
                  <FiUser size={15} />{" "}
                  <span>{noticia._embedded.author[0].name}</span>
                </li>
                <li>
                  <FiCalendar size={15} />{" "}
                  <span>{new Date(noticia.date).toLocaleDateString()}</span>
                </li>
              </ul>
              <div
                dangerouslySetInnerHTML={{ __html: noticia.content.rendered }}
              ></div>
            </div>
          </div>
        );
      })}
    </>
  );
}
