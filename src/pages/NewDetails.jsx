import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImageNewDetail } from "../components/ImageNewDetail";
import { get } from "../utils/httpClient";
import styles from "./NewDetails.module.css";

export function NewDetails() {
  const { newSlug } = useParams();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    get("posts?slug=" + newSlug).then((data) => {
      setNoticia(data);
    });
  }, [newSlug]);

  if (!noticia) {
    return null;
  }

  return (
    <>
      {noticia.map((noticia) => {
        return (
          <div key={noticia.id} className={styles.detailsContainer}>
            <div>
              <ImageNewDetail
                image_id={noticia.featured_media}
              ></ImageNewDetail>
              <h2
                dangerouslySetInnerHTML={{ __html: noticia.title.rendered }}
              ></h2>
              <span>{new Date(noticia.date).toLocaleDateString()}</span>
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
