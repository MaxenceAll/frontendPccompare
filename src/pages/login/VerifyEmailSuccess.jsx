import ButtonReturnToLogin from "../../components/Tools/ButtonReturnToLogin";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../../styles/genericContainer";


const VerifyEmailSuccess = () => {
  return (
    <STYLEDContainer>
      <STYLEDContainerBox>
        <u>E-mail vérifié avec successss !</u>
        <ButtonReturnToLogin msg={"Votre adresse mail est vérifiée, vous pouvez vous identifier !"}/>
      </STYLEDContainerBox>
    </STYLEDContainer>
  );
};

export default VerifyEmailSuccess;