import { Link, useRouteError } from "react-router-dom/dist";
import ErrorGif from "../assets/errors/Error.gif"

function ErrorHandler() {
  const error = useRouteError()
  const isDevelopment = import.meta.env.VITE_APP_ENV === 'development';

  return (
    <div>
      <img src={ErrorGif} alt="Error" />
      <h1>Oops ... une erreur est survenue (error component) : {error?.message}</h1>
      <pre>{error?.status} {error?.statusText}</pre>
      {isDevelopment && <pre>{error?.stack}</pre>}
      <Link to="/">Retour page principale</Link>
    </div>
  );
}

export default ErrorHandler;
