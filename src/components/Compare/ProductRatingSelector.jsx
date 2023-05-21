import { FaStar } from "react-icons/fa";
import styled from "styled-components";

export default function RatingSelector({ note, setNote }) {
  const handleClick = (value) => {
    setNote(value);
  };

  return (
    <CommentRating>
      {[1, 2, 3, 4, 5].map((value) => (
        <Tooltip key={value} text={getTooltipText(value)}>
          <Star
            filled={value <= note ? "true" : "false"}
            onClick={() => handleClick(value)}
          />
        </Tooltip>
      ))}
    </CommentRating>
  );
}

const CommentRating = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
`;

const Star = styled(FaStar)`
  cursor: pointer;
  color: ${({ filled }) => (filled === "true" ? "gold" : "gray")};
  &:hover {
    color: gold;
  }
`;

const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  &:hover::after {
    content: ${({ text }) => `"${text}"`};
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem;
    background-color: var(--background-color-100);
    color: var(--main-color-100);
    border: 1px solid var(--secondary-color-100);
    border-radius: 5px;
    font-size: 1rem;
    white-space: nowrap;
    pointer-events: none;
  }
`;

function getTooltipText(value) {
  switch (value) {
    case 1:
      return "Mauvais";
    case 2:
      return "Bof";
    case 3:
      return "Correct";
    case 4:
      return "Très bon";
    case 5:
      return "Parfait";
    default:
      return "";
  }
}
