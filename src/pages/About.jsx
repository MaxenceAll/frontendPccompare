import ContactLinks from "../components/About/ContactLinks";
import ContactForm from "../components/About/ContactForm";
import { STYLEDContainer } from "../components/styles/genericContainer";
import usePageTitle from "../Hooks/usePageTitle";
import Faq from "../components/About/Faq";

function About() {
  // set title logic:
  usePageTitle(`${import.meta.env.VITE_APP_NAME} | A propos`);

  return (
    <STYLEDContainer>
      <h1>Bienvenue sur {import.meta.env.VITE_APP_NAME}</h1>
      <p>
        A quoi sert ce site ? Il permet de trouver les meilleurs prix pour faire
        votre setup fixe de rêve !
      </p>
      <Faq />
      <ContactForm />
      <ContactLinks />
    </STYLEDContainer>
  );
}

export default About;
