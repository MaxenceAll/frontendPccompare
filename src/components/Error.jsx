import { Link, useRouteError } from "react-router-dom/dist";
import ErrorGif from "../assets/errors/Error.gif"

function Error() {
    const error = useRouteError()
    console.log(error)
  return (
    <div>
      <img src={ErrorGif}/>


      <h1>Oops ... une erreur est survenue (error component) : {error?.message}</h1> 
      <pre>{error?.status} {error?.statusText}</pre>
      <pre>{error?.stack}</pre>
      <Link to="/">
        Retour page principale
      </Link>
    </div>
  );
}

export default Error; 
