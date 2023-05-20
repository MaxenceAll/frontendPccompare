import React from "react";
import styled from "styled-components";
import { RatingStars } from "../Notes/RatingStars";

function ProductNotes(props) {
  // console.log(props);
  const { nb_note_1, nb_note_2, nb_note_3, nb_note_4, nb_note_5, nb_note } =
    props;
  const moyenne =
    (nb_note_1 +
      nb_note_2 * 2 +
      nb_note_3 * 3 +
      nb_note_4 * 4 +
      nb_note_5 * 5) /
    (nb_note_1 + nb_note_2 + nb_note_3 + nb_note_4 + nb_note_5);

  const notePercentages = {
    nb_note_1: (nb_note_1 / nb_note) * 100,
    nb_note_2: (nb_note_2 / nb_note) * 100,
    nb_note_3: (nb_note_3 / nb_note) * 100,
    nb_note_4: (nb_note_4 / nb_note) * 100,
    nb_note_5: (nb_note_5 / nb_note) * 100,
  };

  // console.log(notePercentages);

  return (
    <Notes_Content>
      <Notes_Title>Notes des utilisateurs :</Notes_Title>
      <RatingStars rating={moyenne} />
      <Notes_Header>
        <Notes_Header>
          {moyenne
            ? `(${nb_note} notes), ${moyenne.toFixed(2)} de moyenne.`
            : `Aucune donnée`}
        </Notes_Header>
      </Notes_Header>

      <Note_wrapper>
        <Note_note_header>5/5</Note_note_header>
        <ProgressBarWrapper>
          <ProgressBar progress={notePercentages.nb_note_5} />
        </ProgressBarWrapper>
        <Note_note_footer>
          {notePercentages.nb_note_5.toFixed(0)}%({nb_note_5})
        </Note_note_footer>
      </Note_wrapper>

      <Note_wrapper>
        <Note_note_header>4/5</Note_note_header>
        <ProgressBarWrapper>
          <ProgressBar progress={notePercentages.nb_note_4} />
        </ProgressBarWrapper>
        <Note_note_footer>
          {notePercentages.nb_note_4.toFixed(0)}%({nb_note_4})
        </Note_note_footer>
      </Note_wrapper>

      <Note_wrapper>
        <Note_note_header>3/5</Note_note_header>
        <ProgressBarWrapper>
          <ProgressBar progress={notePercentages.nb_note_3} />
        </ProgressBarWrapper>
        <Note_note_footer>
          {notePercentages.nb_note_3.toFixed(0)}%({nb_note_3})
        </Note_note_footer>
      </Note_wrapper>

      <Note_wrapper>
        <Note_note_header>2/5</Note_note_header>
        <ProgressBarWrapper>
          <ProgressBar progress={notePercentages.nb_note_2} />
        </ProgressBarWrapper>
        <Note_note_footer>
          {notePercentages.nb_note_2.toFixed(0)}%({nb_note_2})
        </Note_note_footer>
      </Note_wrapper>

      <Note_wrapper>
        <Note_note_header>1/5</Note_note_header>
        <ProgressBarWrapper>
          <ProgressBar progress={notePercentages.nb_note_1} />
        </ProgressBarWrapper>
        <Note_note_footer>
          {notePercentages.nb_note_1.toFixed(0)}%({nb_note_1})
        </Note_note_footer>
      </Note_wrapper>
    </Notes_Content>
  );
}

export default ProductNotes;

const Note_note_header = styled.div`
  padding-right: 5%;
`;
const Note_note_footer = styled.div`
  font-size: 0.5rem;
  padding-left: 5%;
`;

const Notes_Content = styled.div`
  text-align: center;
  border-radius: 5px;
  border: 1px solid var(--main-color-300);
  background-color: var(--background-color-200);
  padding: 2%;

  box-shadow: -32px 0px 70px -13px rgba(0,0,0,0.5),inset 20px 20px 15px 0px rgba(0,0,0,0.1),inset -20px -20px 15px -3px rgba(0,0,0,0.1),inset -20px 20px 15px 0px rgba(0,0,0,0.1);  border-radius: 15px;

`;

const Notes_Title = styled.div`
  text-decoration: underline;
`;
const Notes_Header = styled.div`
  font-style: italic;
  font-size: 0.7rem;
`;

const ProgressBar = styled.div`
  width: ${(props) => props.progress}%;
  height: 10px;
  border-radius: 5px;
  background-color: var(--main-color-300);
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-color: var(--background-color-100);
`;

const Note_wrapper = styled.div`
  display: flex;
  margin: 2%;
  position: relative;
  padding-left: 5%;
  padding-right: 5%;
`;
