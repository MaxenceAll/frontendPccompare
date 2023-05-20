import React from 'react'
import styled from 'styled-components';
import { DateDuJour } from '../../components/Tools/DateDuJour'
import Avatar from '../Avatars/Avatar';
import { STYLEDContainer, STYLEDContainerBox } from '../styles/genericContainer';

function ProductAddComment({customer}) {
  console.log(customer)
  return (
    <CommentContainer>

      <CommentCreator>
        <Avatar Id_customer={customer?.Id_customer}/>
        {customer?.pseudo}
        <CommentRating>
          ***
        </CommentRating>
      </CommentCreator>

      <CommentSeparator />
        <CommentContent>
          <textarea name="text" placeholder='Ajoutez votre commentaire ici'></textarea>
        </CommentContent>
      <CommentSeparator />

      <CommentDate>
        Posté le : &nbsp;
        <DateDuJour/>        
      </CommentDate>


    </CommentContainer>
  )
}

export default ProductAddComment

const CommentContainer = styled.div`
  background-color: var(--background-color-200);
  border: 1px solid var(--secondary-color-200);
  border-radius: 15px;
  padding: 2%;
  margin-bottom: 10px;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.5),
    inset 20px 20px 15px 0px rgba(0, 0, 0, 0.1),
    inset -20px -20px 15px -3px rgba(0, 0, 0, 0.1),
    -20px 20px 15px -3px rgba(0, 0, 0, 0.1);
  /* position: relative; */
  width: 100vw;
  height: 50vh;
`;

const CommentOptions = styled.div`
  position: absolute;
  top: 5%;
  right: 1%;
`;

const CommentContent = styled.div`
  margin-bottom: 5px;
  & textarea {
    padding: 1%;
    width: 50%;
    height: 50%;
    resize: vertical;
    border: none;
    background-color: transparent;
    color: var(--main-color-100);
    background-color: var(--background-color-100);
  }
`;

const CommentCreator = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;
  font-weight: bold;
`;

const CommentDate = styled.div`
  font-size: 0.8rem;
  text-align:left;
  display:flex;
`;

const CommentRating = styled.div`
  font-size: 1.5rem;
`;

const CommentSeparator = styled.hr`
  margin-top: 10px;
`;

const CommentTimeAgo = styled.span`
  margin-left: 10px;
  font-size: 0.7em;
  color: var(--main-color-200);
`;
