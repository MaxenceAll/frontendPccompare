import ContactLinks from "../components/About/ContactLinks";
import ContactForm from "../components/About/ContactForm";
import { STYLEDContainer } from "../components/styles/genericContainer";
import usePageTitle from "../Hooks/usePageTitle";

function About() {

  // set title logic:
  usePageTitle(`${import.meta.env.VITE_APP_NAME} | Page principale | A propos`);

  return (
    <STYLEDContainer>
      <ContactLinks />
      <ContactForm />
    </STYLEDContainer>
  );
}

export default About;
