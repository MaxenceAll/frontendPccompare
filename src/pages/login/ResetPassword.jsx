import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../../components/styles/genericContainer";
import { STYLEDForm } from "../../components/styles/genericForm";
import { STYLEDInput } from "../../components/styles/genericInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiCheck, HiBan } from "react-icons/hi";
import { STYLEDhr } from "../../components/styles/genericHR";
import { STYLEDErrorMessage } from "../../components/styles/genericParagraphError";
import { STYLEDButton } from "../../components/styles/genericButton";
import fetcher from "../../helper/fetcher";
import usePageTitle from "../../Hooks/usePageTitle";
import { SiKeepassxc } from "react-icons/si";

function ResetPassword() {

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();  
  // set title logic:
  usePageTitle(`${import.meta.env.VITE_APP_NAME} | Modification de mot de passe`);
  
  const {
    register,
    handleSubmit,
    formState: { errors = "" },
    getValues,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password1 !== data.password2) {
      toast.error(`Oooooops les mots de passe ne correspondent pas !`);
      return;
    }
    const token = searchParams.get("t");
    data.token = token;
    const resp = await fetcher.post("reset/newpassword", data);
    console.log(resp);
    if (resp.result) {
      toast.success("Changement de mot de passe avec succès !"
      );
      navigate("/login");
    } else {
      toast.error(`Oops erreur, retour de l'api : ${resp.message}`);
    }
  };

  return (
    <STYLEDContainer>
      <STYLEDContainerBox>
        <STYLEDForm onSubmit={handleSubmit(onSubmit)}>
          <div style={{fontSize:"10rem"}}><SiKeepassxc /></div>
          <h2>Re-initialisation de mot de passe.</h2>
          <STYLEDhr />
          <div>
            <label htmlFor="password1">Nouveau mot de passe :</label>
            <STYLEDInput
              placeholder="Saisir votre mot de passe"
              autoComplete="current-password"
              type="password"
              name="password1"
              {...register("password1", {
                required: true,
                validate: {
                  checkLength: (value) => value.length >= 4,
                  // matchPattern: (value) =>
                  //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                  //     value
                  //   ),
                },
              })}
            />
            {errors.password1 ? (
              <HiBan style={{ color: "red" }} />
            ) : (
              <HiCheck style={{ color: "green" }} />
            )}
          </div>
          {errors.password1?.type === "matchPattern" && (
            <STYLEDErrorMessage>
              Doit contenir au moins une Majuscule, une minuscule, une chiffre
              et un caractère spécial..
            </STYLEDErrorMessage>
          )}
          {errors.password1?.type === "required" && (
            <STYLEDErrorMessage>
              Il faut saisir un mot de passe voyons !
            </STYLEDErrorMessage>
          )}
          {errors.password1?.type === "checkLength" && (
            <STYLEDErrorMessage>
              Le mot de passe doit être de 4 signes minimum, bah wé.
            </STYLEDErrorMessage>
          )}

          {/* ///////////////////////////////////////////// */}
          <div>
            <label htmlFor="password2">Validez mot de passe :</label>
            <STYLEDInput
              placeholder="Valider votre mot de passe"
              autoComplete="current-password"
              type="password"
              name="password2"
              {...register("password2", {
                required: true,
                validate: {
                  checkLength: (value) => value.length >= 4,
                  // matchPattern: (value) =>
                  //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                  //     value
                  //   ),
                },
              })}
            />

            {errors.password2 ? (
              <HiBan style={{ color: "red" }} />
            ) : (
              <HiCheck style={{ color: "green" }} />
            )}
          </div>

          {errors.password2?.type === "matchPattern" && (
            <STYLEDErrorMessage>
              Doit contenir au moins une Majuscule, une minuscule, une chiffre
              et un caractère spécial..
            </STYLEDErrorMessage>
          )}
          {errors.password2?.type === "required" && (
            <STYLEDErrorMessage>
              Il faut saisir un mot de passe voyons !
            </STYLEDErrorMessage>
          )}
          {errors.password2?.type === "checkLength" && (
            <STYLEDErrorMessage>
              Le mot de passe doit être de 4 signes minimum, bah wé.
            </STYLEDErrorMessage>
          )}
          <STYLEDhr />
          <STYLEDButton type="submit" width="40%">
            Valider
          </STYLEDButton>
        </STYLEDForm>
      </STYLEDContainerBox>
    </STYLEDContainer>
  );
}

export default ResetPassword;
