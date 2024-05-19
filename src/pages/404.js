import * as React from "react";
import "../styles/MainPage.module.css";
import { Link } from "gatsby";

const NotFoundPage = () => {
  const isDev = process.env.NODE_ENV === "development";
  const msg = isDev
    ? "Back to the drawing board, n00b. "
    : "Sorry, we couldn’t find what you were looking for. ";

  return (
    <main>
      <h1>Page not found</h1>
      <p className>
        {msg}
        <Link to="/">Go home</Link>.
      </p>
    </main>
  );
};

export default NotFoundPage;

export const Head = () => <title>404 Not found</title>;
