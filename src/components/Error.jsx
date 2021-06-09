import styles from "./Error.module.css";

export function Error({ err }) {
  if (err === "Failed to fetch") {
    return (
      <div className={styles.errorContainer}>
        <div>
          <span>
            No se pudo conectar con la web de noticias. <br />
            Revice su conexión
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.errorContainer}>
      <div>
        <span>{err}</span>
      </div>
    </div>
  );
}
