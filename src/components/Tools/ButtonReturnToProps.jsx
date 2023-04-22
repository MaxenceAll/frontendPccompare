import { useNavigate } from "react-router-dom";
import { STYLEDButton } from "../styles/genericButton";

function ButtonReturnToProps(props) {
  const navigate = useNavigate();
  return (
    <>
      <p>{props.msg}</p>
      <STYLEDButton onClick={() => navigate(`/${props.destinationUrl}`)}>
        Retour à la page {props.destinationMsg}
      </STYLEDButton>
    </>
  );
}

export default ButtonReturnToProps;
