import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div>
            <h1>Oops, cette page n'existe pas !</h1>
            <Link to="/">Retour page principale</Link>
        </div>
    )
}
