import { Link } from "react-router-dom";
import styles from "./NewCard.module.css";
import { FiCalendar } from "react-icons/fi";

export function NewCard({ noticia }) {
  return (
    <li className={styles.newCard}>
      <Link to={"/news/" + noticia.slug}>
        <img
          width={150}
          height={150}
          className={styles.newImage}
          src={ noticia._embedded["wp:featuredmedia"] ?
            noticia._embedded["wp:featuredmedia"][0].media_details.sizes
              .thumbnail.source_url : "null.jpg"
          }
          alt={noticia.title.rendered}
        />
        <div>
          <h3 dangerouslySetInnerHTML={{ __html: noticia.title.rendered }}></h3>
          <div className={styles.date}>
            <FiCalendar size={15} />
            <span>{new Date(noticia.date).toLocaleDateString()}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
