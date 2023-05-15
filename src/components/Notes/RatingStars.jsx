import { FaStar, FaRegStar, FaStarHalf, FaStarHalfAlt } from 'react-icons/fa';
import styled from 'styled-components';

export const RatingStars = ({ rating }) => {
  if (isNaN(rating)) {
    return <div>---</div>;
  }

  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;
  const halfStar = decimal >= 0.25 && decimal < 0.75;
  const roundedRating = Math.round(rating * 2) / 2; // Round to the nearest half star
  const emptyStars = 5 - Math.ceil(roundedRating);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`star_${i}`} />);
  }

  if (halfStar) {
    stars.push(<FaStarHalfAlt key="star_half" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`star_empty_${i}`} />);
  }

  return <StyledStar>{stars}</StyledStar>;
};

const StyledStar = styled.div`
  color: var(--secondary-color-100);
`;
