import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../components/styles/genericContainer";
import Avatar from "../components/Avatars/Avatar";
import AvatarUpload from "../components/Avatars/AvatarUpload";

function Test() {

  const Id_customer= 6;

  return (
    <>
      <STYLEDContainer>
        <STYLEDContainerBox>
          <AvatarUpload Id_customer={Id_customer}/>
          <Avatar Id_customer={Id_customer} />
        </STYLEDContainerBox>
      </STYLEDContainer>
    </>
  );
}

export default Test;
