import React from "react";
import styled from "styled-components";
import { FaLinkedin, FaGithub, FaGlobe, FaFolderOpen } from "react-icons/fa";


const ContactLinks = () => {


  return (
    <div>
        <div>


        <h1>Bienvenue sur {import.meta.env.VITE_APP_NAME}</h1>
      <p>Il s'agit d'un petit projet personnel qui me .... bla bla bla</p>



      <CardContainer>
        <CardLink href="https://github.com/MaxenceAll?tab=repositories">
          <CardIcon>
            <FaGithub />
          </CardIcon>
          <p>Github</p>
        </CardLink>
      </CardContainer>


      <CardContainer>
        <CardLink
          href="www.linkedin.com/in/maxence-allart"
        >
          <CardIcon>
            <FaLinkedin />
          </CardIcon>
          <p>LinkedIn</p>
        </CardLink>
      </CardContainer>

      <CardContainer>
        <CardLink href="https://www.maxenceallart.fr/">
          <CardIcon>
            <FaGlobe />
          </CardIcon>
          <p>Site Perso</p>
        </CardLink>
      </CardContainer>

      <CardContainer>
        <CardLink href="https://maxenceall.github.io/ProjectCV/">
          <CardIcon>
            <FaFolderOpen />
          </CardIcon>
          <p>Lien vers mon CV</p>
        </CardLink>
      </CardContainer>




      </div>
    </div>
  );
};

export default ContactLinks;


const CardContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
gap: 5%;
padding-left: 2%;
padding-right: 2%;
`;

const CardLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65%;
  height: 25px;
  background-color: var(--background-color-200);
  border-radius: 5px;
  border: 1px solid var(--main-color-100);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    background-color: var(--background-color-300);
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    color: var(--main-color-300);
  }
`;

const CardIcon = styled.p`
  margin-right: 10px;
`;