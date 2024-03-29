import React, { useState } from "react";
import styled from "styled-components";
import { STYLEDButton } from "../styles/genericButton";
import { useForm } from "react-hook-form";
import {
  useGetAllRoleDataQuery,
  useUpdateCustomerMutation,
} from "../../features/pccompareSlice";
import { STYLEDInput } from "../styles/genericInput";
import { STYLEDSelect } from "../styles/genericSelect";
import { STYLEDErrorMessage } from "../styles/genericParagraphError";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserDetails(props) {
  const [editMode, setEditMode] = useState(false);
  const { user } = props;

  // console.log(user)

  let allRoleDataQuery = useGetAllRoleDataQuery();
  const {
    data: allRoleData,
    error: allRoleDataError,
    isError: allRoleDataIsError,
    isLoading: allRoleDataIsLoading,
    isSuccess: allRoleDataIsSuccess,
  } = allRoleDataQuery;

  // console.log(allRoleData);

  // redux slice pour la query update
  const [updateCustomer, { updateCustomerIsLoading }] =
    useUpdateCustomerMutation();

  // Edit form logic :
  const onSubmit = async (data) => {
    data.Id_customer = user?.Id_customer;
    console.log(data);
    try {
      const response = await updateCustomer(data);
      // console.log(response);
      toast.success(`Changement avec succes !`);
    } catch (error) {
      toast.error(`Oops une erreur; retour du server : ${error}`);
    }
    setEditMode(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors = "" },
    reset,
  } = useForm();

  // console.log(user);

  // Find the role object that corresponds to the account's Id_role.
  const role = allRoleData?.data.find((r) => r.Id_role === user?.Id_role);
  // console.log(role);

  let content = "";
  if (!editMode) {
    content = (
      <StyledCard>
        <StyledHeader>Carte utilisateur.</StyledHeader>
        <StyledCardBody>
          <StyledDetail>
            <StyledLabel>Nom:</StyledLabel>
            <StyledValue>{user?.lastname}</StyledValue>
          </StyledDetail>
          <StyledDetail>
            <StyledLabel>Prénom:</StyledLabel>
            <StyledValue>{user?.firstname}</StyledValue>
          </StyledDetail>
          <StyledDetail>
            <StyledLabel>Pseudo:</StyledLabel>
            <StyledValue>{user?.pseudo}</StyledValue>
          </StyledDetail>
          <StyledDetail>
            <StyledLabel>Role:</StyledLabel>
            <StyledValue>{role?.title}</StyledValue>
          </StyledDetail>
        </StyledCardBody>
        <div>
          <STYLEDButton width={"100%"} onClick={() => setEditMode(!editMode)}>
            Edit
          </STYLEDButton>
        </div>
      </StyledCard>
    );
  } else {
    content = (
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledCard>
          <StyledHeader>Carte utilisateur.</StyledHeader>
          <StyledCardBody>
            <StyledDetail>
              <StyledLabel>Nom:</StyledLabel>
              <STYLEDInput
                defaultValue={user?.lastname}
                {...register("lastname", { required: true })}
              />
              {errors.lastname && <STYLEDErrorMessage>Champ requis !</STYLEDErrorMessage>}
            </StyledDetail>
            <StyledDetail>
              <StyledLabel>Prénom:</StyledLabel>
              <STYLEDInput
                defaultValue={user?.firstname}
                {...register("firstname", { required: true })}
              />
              {errors.firstname && (
                <STYLEDErrorMessage>Champ requis !</STYLEDErrorMessage>
              )}
            </StyledDetail>
            <StyledDetail>
              <StyledLabel>Pseudo:</StyledLabel>
              <STYLEDInput
                defaultValue={user?.pseudo}
                {...register("pseudo", { required: true })}
              />
              {errors.pseudo && (
                <STYLEDErrorMessage>Champ requis !</STYLEDErrorMessage>
              )}
            </StyledDetail>
            <StyledDetail>
              <StyledLabel>Role:</StyledLabel>
              <STYLEDSelect
                defaultValue={role?.Id_role}
                {...register("Id_role", { required: true })}
              >
                {allRoleData.data.map((role) => (
                  <option key={role.Id_role} value={role.Id_role}>
                    {role.title}
                  </option>
                ))}
              </STYLEDSelect>
              {errors.Id_role && (
                <STYLEDErrorMessage>Champ requis !</STYLEDErrorMessage>
              )}
            </StyledDetail>
          </StyledCardBody>
          <div>
            <STYLEDButton width={"70%"} onClick={() => setEditMode(!editMode)}>
              Edit
            </STYLEDButton>
            <STYLEDButton type="submit">✔️</STYLEDButton>
            <STYLEDButton onClick={() => setEditMode(!editMode)}>
              ❌
            </STYLEDButton>
          </div>
        </StyledCard>
      </form>
    );
  }

  return (
    <>
      {content}
    </>
  );
}

export default UserDetails;

const StyledCard = styled.div`
  font-size: clamp(0.5rem, 3vw, 1.5rem);
  background-color: var(--background-color);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
  margin: 20px;
`;

const StyledHeader = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
`;

const StyledCardBody = styled.div`
  margin-top: 20px;
`;

const StyledDetail = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const StyledLabel = styled.div`
  font-weight: 700;
  width: 150px;
`;

const StyledValue = styled.div`
  display: flex;
  flex: 0;
`;
