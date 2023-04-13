import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, subject, message } = data;
    //TODO envoyer le mail en prenant ces données.
    // console.log("Nom: ", name);
    // console.log("Mail: ", email);
    // console.log("Sujet: ", subject);
    // console.log("Message: ", message);
    alert("pas encore fonctionnel !");
    reset();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          Pour me contacter depuis le site, utilisez ce petit formulaire !
          <hr />
          <input
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
          ></input>
          <input
            type="email"
            name="email"
            {...register("email", {
              required: true,
              pattern:
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            })}
            placeholder="Votre adresse mail ici"
          ></input>
          <input
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
          ></input>
          <input
            height="60px"
            rows={3}
            name="message"
            {...register("message", {
              required: true,
            })}
            placeholder="Votre message ici"
          ></input>
          <hr />
          <button width="80%" height="35px" type="submit">
            Envoyer votre message
          </button>
          <div>
            {errors.name && (
              <p className="errorMessage">{errors.name.message}</p>
            )}
            {errors.email && (
              <p className="errorMessage">
                Merci de saisir une adresse mail valide.
              </p>
            )}
            {errors.subject && <p>{errors.subject.message}</p>}
            {errors.message && (
              <p>Il faut saisir un message sinon ça sert à rien !</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
