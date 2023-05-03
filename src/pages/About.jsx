import React, { useEffect } from "react";
import ContactLinks from "../components/About/ContactLinks";
import ContactForm from "../components/About/ContactForm";


function About() {

    // set title logic:
    useEffect(() => {
      document.title = `${
        import.meta.env.VITE_APP_NAME
      } | Page principale | A propos`;
    }, []);

  return (
    <div>
      <ContactLinks />
      <ContactForm />
    </div>
  );
}

export default About;
