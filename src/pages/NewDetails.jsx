import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import { ImageNewDetail } from "../components/ImageNewDetail";
import { FiCalendar, FiUser } from "react-icons/fi";
import { Spinner } from "../components/Spinner";
import { get } from "../utils/httpClient";
import styles from "./NewDetails.module.css";

export function NewDetails() {
  const { newSlug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    get("posts?_embed&slug=" + newSlug).then((data) => {
      setNoticia(data);
      setIsLoading(false);
    });
  }, [newSlug]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {noticia.map((noticia) => {
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
