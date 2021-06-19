import { useEffect, useState } from "react";
import styles from "./ImageNewDetail.module.css";
import { get } from "../utils/httpClient";

export function ImageNewDetail({ image_id }) {
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    get("media/" + image_id).then((data) => {
      setImagen(data);
    });
  }, [image_id]);

  if (!imagen) {
    return null;
  }

  return (
    <img
      width={800}
      height={430}
      className={styles.imageNewDetail}
      src={imagen.source_url}
      alt=""
    />
  );
}
