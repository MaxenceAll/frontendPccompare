import React, { useState } from "react";
import styled from "styled-components";
import { STYLEDButton } from "../styles/genericButton";

function CarouselDetails(props) {
  const [editMode, setEditMode] = useState(false);
  const { item } = props;
  console.log(item);

  return (
    <>
      <CardWrapper>
        <Img src={item.img_src} alt={item.img_alt} />
        <Title>{item.description}</Title>
        <Description>{item.long_description}</Description>
        <STYLEDButton>{item.button_text}</STYLEDButton>
      </CardWrapper>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>id:</td>
            <td>{item.id}</td>
          </tr>
          <tr>
            <td>img_src:</td>
            <td>{item.img_src}</td>
          </tr>
          <tr>
            <td>img_alt:</td>
            <td>{item.img_alt}</td>
          </tr>
          <tr>
            <td>description:</td>
            <td>{item.description}</td>
          </tr>
          <tr>
            <td>button_text:</td>
            <td>{item.button_text}</td>
          </tr>
          <tr>
            <td>createdAt:</td>
            <td>{new Date(item.createdAt).toLocaleString()}</td>
          </tr>
          <tr>
            <td>createdBy:</td>
            <td>{item.createdBy}</td>
          </tr>
          <tr>
            <td>deletedAt:</td>
            <td>{new Date(item.deletedAt).toLocaleString()}</td>
          </tr>
          <tr>
            <td>deletedBy:</td>
            <td>{item.deletedBy}</td>
          </tr>
          <tr>
            <td>modifiedAt:</td>
            <td>{new Date(item.modifiedAt).toLocaleString()}</td>
          </tr>
          <tr>
            <td>modifiedBy:</td>
            <td>{item.modifiedBy}</td>
          </tr>
          <tr>
            <td>navigate_to:</td>
            <td>{item.navigate_to}</td>
          </tr>
          <tr>
            <td>long_description:</td>
            <td>{item.long_description}</td>
          </tr>
        </tbody>
      </table>
      <STYLEDButton width="90%">Edit</STYLEDButton>
    </>
  );
}

export default CarouselDetails;

const CardWrapper = styled.div`
  /* width: 400px; */
  /* border: 1px solid #ccc; */
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Img = styled.img`
  display: block;
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 0 auto;
  max-width: 100%;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;

  &:hover {
    background-color: #0069d9;
  }
`;
