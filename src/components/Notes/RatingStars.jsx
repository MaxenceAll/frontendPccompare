import { FaStar, FaRegStar } from 'react-icons/fa';
import styled from 'styled-components';

export const RatingStars = ({ rating }) => {

  // console.log(rating)

  if (isNaN(rating)) {
    return <div>---</div>;
  }

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`star_${i}`} />);
  }

  if (halfStar) {
    stars.push(<FaStar half key={`star_half`} />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`star_empty_${i}`} />);
  }

  return <STYLEDStar>{stars}</STYLEDStar>;
};


const STYLEDStar = styled.div`
  color: var(--secondary-color-100);
`