import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { STYLEDInput } from "../styles/genericInput";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";
import { STYLEDButton } from "../styles/genericButton";
import { STYLEDForm } from "../styles/genericForm";
import { STYLEDhr } from "../styles/genericHR";
import { STYLEDErrorMessage } from "../styles/genericParagraphError";
import fetcher from "../../helper/fetcher";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const resp = await toast.promise(fetcher.post("about/contactme", data), {
      pending: "Préparation du mail ! 🟠",
      success: "Mail prêt ! 🟢",
      error: "Oops erreur pendant l'écriture du mail ! 🔴",
    });
    if (resp.result) {
      toast.success("Mail envoyé avec succès !");
    } else {
      toast.error(`Mail non envoyé :( retour du server : ${resp.error}`);
    }
    reset();
  };

  return (
    <STYLEDContainer>
      <STYLEDContainerBox>
        <STYLEDForm onSubmit={handleSubmit(onSubmit)} noValidate>
          Pour me contacter depuis le site, utilisez ce petit formulaire !
          <STYLEDhr />
          <STYLEDInput
            type="text"
            name="name"
            {...register("name", {
              required: {
                value: true,
                message: "Merci de saisir votre nom.",
              },
              maxLength: {
                value: 30,
                message: "Un nom de plus de 30 signes, vraiment ?!",
              },
            })}
            placeholder="Votre nom ?"
          ></STYLEDInput>
          <STYLEDInput
            type="email"
            name="email"
            {...register("email", {
              required: true,
              pattern:
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            })}
            placeholder="Votre adresse mail ici"
          ></STYLEDInput>
          <STYLEDInput
            type="text"
            name="subject"
            {...register("subject", {
              required: {
                value: true,
                message: "Il faut saisir un sujet.",
              },
              maxLength: {
                value: 75,
                message: "Un sujet plus court svp, moins de 75 signes.",
              },
            })}
            placeholder="Le sujet ?"
          ></STYLEDInput>
          <STYLEDInput
            height="60px"
            rows={3}
            name="message"
            {...register("message", {
              required: true,
            })}
            placeholder="Votre message ici"
          ></STYLEDInput>
          <STYLEDhr />
          <STYLEDButton width="80%" height="35px" type="submit">
            Envoyer votre message
          </STYLEDButton>
          <div>
            {errors.name && (
              <STYLEDErrorMessage>{errors.name.message}</STYLEDErrorMessage>
            )}
            {errors.email && (
              <STYLEDErrorMessage>
                Merci de saisir une adresse mail valide.
              </STYLEDErrorMessage>
            )}
            {errors.subject && (
              <STYLEDErrorMessage>{errors.subject.message}</STYLEDErrorMessage>
            )}
            {errors.message && (
              <STYLEDErrorMessage>
                Il faut saisir un message sinon ça sert à rien !
              </STYLEDErrorMessage>
            )}
          </div>
        </STYLEDForm>
      </STYLEDContainerBox>
    </STYLEDContainer>
  );
};

export default ContactForm;
