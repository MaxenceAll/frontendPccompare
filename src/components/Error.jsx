import { Link, useRouteError } from "react-router-dom/dist";

function Error() {
    const error = useRouteError()
  return (
    <div>
      <h1>Oops ... une erreur est survenue (error component) : {error?.message}</h1> 
      <pre>{error?.status} {error?.statusText}</pre>
      <Link to="/">
        Retour page principale
      </Link>
    </div>
  );
}

export default Error; 
