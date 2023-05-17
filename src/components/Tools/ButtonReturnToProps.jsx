import { NavLink } from "react-router-dom";
import { STYLEDButton } from "../styles/genericButton";

function ButtonReturnToProps(props) {

  return (
    <>
      <p>{props.msg}</p>
      <NavLink to={props.destinationUrl}>
        <STYLEDButton>Retour à la page {props.destinationMsg}</STYLEDButton>
      </NavLink>
    </>
  );
}

export default ButtonReturnToProps;
