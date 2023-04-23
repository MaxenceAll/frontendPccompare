import { useNavigate } from "react-router-dom";
import { STYLEDButton } from "../styles/genericButton";

function ButtonReturnToProps(props) {
  const navigate = useNavigate();
  // console.log(props.destinationUrl)
  // TODO fix props.destinationUrl not working
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
