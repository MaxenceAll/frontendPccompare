import React from "react";
import styled from "styled-components";
import { RatingStars } from "../Notes/RatingStars";

function ProductNotes(props) {
  console.log(props);
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

  

  return (
    <Notes_Content>
      <Notes_Title>Notes des utilisateurs :</Notes_Title>
      <Notes_Header>
        <RatingStars rating={moyenne} /> ({nb_note} notes), {moyenne.toFixed(1)}
        de moyenne.
      </Notes_Header>

      <Notes_Table>
        <tbody>
          <tr>
            <td>Note 1</td>
            <td>
              <ProgressBar progress={notePercentages.nb_note_1} />
            </td>
            <td>{notePercentages.nb_note_1.toFixed(1)}%</td>
          </tr>
          <tr>
            <td>Note 2</td>
            <td>
              <ProgressBar progress={notePercentages.nb_note_2} />
            </td>
            <td>{notePercentages.nb_note_2.toFixed(1)}%</td>
          </tr>
          <tr>
            <td>Note 3</td>
            <td>
              <ProgressBar progress={notePercentages.nb_note_3} />
            </td>
            <td>{notePercentages.nb_note_3.toFixed(1)}%</td>
          </tr>
          <tr>
            <td>Note 4</td>
            <td>
              <ProgressBar progress={notePercentages.nb_note_4} />
            </td>
            <td>{notePercentages.nb_note_4.toFixed(1)}%</td>
          </tr>
          <tr>
            <td>Note 5</td>
            <td>
              <ProgressBar progress={notePercentages.nb_note_5} />
            </td>
            <td>{notePercentages.nb_note_5.toFixed(1)}%</td>
          </tr>
        </tbody>
      </Notes_Table>


    </Notes_Content>
  );
}

export default ProductNotes;

const Notes_Content = styled.div`
  border-radius: 5px;
  border: 1px solid var(--main-color-300);
`;

const Notes_Title = styled.div`
  text-decoration: underline;
`;
const Notes_Header = styled.div`
  font-style: italic;
`;

const Notes_Table = styled.table`
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
`;
