import styles from "./App.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NewDetails } from "./pages/NewDetails";
import { LandingPage } from "./pages/LandingPage";

export function App() {
  return (
    <Router>
      <header>
        <Link to="/">
          <h1 className={styles.title}>Tiempo21 Noticias</h1>
        </Link>
      </header>
      <main className={styles.siteContainer}>
        <Switch>
          <Route exact path="/news/:newSlug">
            <NewDetails />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </main>
      <footer className={styles.footer}>
        © {new Date().getFullYear()} <br /> Tiempo21 - Radio Victoria, Las
        Tunas, Cuba.
      </footer>
    </Router>
  );
}
