import React, { useState } from "react";
import { useGetAllUserDataQuery } from "../../features/pccompareSlice";
import styled from "styled-components";
import { STYLEDButton } from "../styles/genericButton";
import { STYLEDhr } from "../styles/genericHR";
import Loader from "../Tools/Loader";
import { FixedSizeList, VariableSizeList } from "react-window";
import UserDetails from "./UserDetails";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";

function UserBrowser() {
  let allUserDataQuery = useGetAllUserDataQuery();

  const {
    data: allUserData,
    error: allUserDataError,
    isError: allUserDataIsError,
    isLoading: allUserDataIsLoading,
    isSuccess: allUserDataIsSuccess,
  } = allUserDataQuery;

  // console.log(allUserData);

  // // PAGINATION LOGIC
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage + 1);
    setActiveButtonIndex(selectedPage);
  };
  const handleNextPageClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setActiveButtonIndex((prevPage) => prevPage + 1);
  };
  const handlePrevPageClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    setActiveButtonIndex((prevPage) => prevPage - 1);
  };
  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
    setActiveButtonIndex(0);
  };

  let content = "";
  if (allUserDataIsSuccess) {
    const startIndex = pageSize * (currentPage - 1);
    const endIndex = startIndex + pageSize;
    const usersToDisplay = allUserData?.data?.slice(startIndex, endIndex);

    content = (
      <>
        <FixedSizeList
          height={300}
          itemCount={usersToDisplay.length}
          itemSize={300}
          width={375}
        >
          {({ index, style }) => (
            <div style={style}>
              <UserDetails user={usersToDisplay[index]} />
            </div>
          )}
        </FixedSizeList>
        <STYLEDPaginationOptions>
          <STYLEDhr />
          <div>
            <STYLEDButton
              width="30%"
              onClick={handlePrevPageClick}
              disabled={currentPage === 1}
            >
              Page Précédente
            </STYLEDButton>
            <span>
              &nbsp;{currentPage}&nbsp;sur&nbsp;
              {Math.ceil(allUserData?.data?.length / pageSize)}&nbsp;
            </span>
            <STYLEDButton
              width="30%"
              onClick={handleNextPageClick}
              disabled={
                currentPage === Math.ceil(allUserData?.data?.length / pageSize)
              }
            >
              Page Suivante
            </STYLEDButton>
          </div>

          <div>
            <label htmlFor="pageSize">Affichage par page:</label>
            <STYLEDSelect
              id="pageSize"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value={allUserData?.data?.length}>
                Tous({allUserData?.data?.length})
              </option>
            </STYLEDSelect>
          </div>
        </STYLEDPaginationOptions>

        <STYLEDPageContainer>
          {Array.from(
            { length: Math.ceil(allUserData?.data?.length / pageSize) },
            (_, i) => (
              <STYLEDButton
                style={{
                  backgroundColor:
                    activeButtonIndex === i
                      ? "var(--background-color-300)"
                      : "var(--background-color-200)",
                  color:
                    activeButtonIndex === i
                      ? "var(--main-color-300)"
                      : "var(--main-color-200)",
                }}
                key={i}
                onClick={() => handlePageChange(i)}
              >
                {i + 1}
              </STYLEDButton>
            )
          )}
        </STYLEDPageContainer>
      </>
    );
  }

  if (allUserDataIsError) {
    content = <>Oops error detectée, {allUserDataError}</>;
  }
  if (allUserDataIsLoading) {
    content = (
      <>
        <Loader />
      </>
    );
  }

  return (
    <DIV_UserBrowserForAdmins>
      <STYLEDContainer>
        <STYLEDContainerBox>
          <DIV_UserBrowser_Content>
            Vous êtes admin, <br /> vous pouvez modifier les utilisateurs:
          </DIV_UserBrowser_Content>
          {content}
        </STYLEDContainerBox>
      </STYLEDContainer>
    </DIV_UserBrowserForAdmins>
  );
}

export default UserBrowser;

const DIV_UserBrowser_Content = styled.div`
  padding: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-style:italic;
`

const DIV_UserBrowserForAdmins = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const STYLEDPaginationOptions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const STYLEDPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const STYLEDSelect = styled.select`
  text-align: center;
  background: var(--background-color-100);
  color: var(--main-color-100);
  border: 1px solid var(--main-color-100);
  border-radius: 50px;

  &:hover {
    background: var(--background-color-300);
    color: var(--main-color-300);
    border: 1px solid var(--main-color-300);
  }

  option {
    background-color: var(--background-color-400);
    color: var(--main-color-100);
    &:hover {
      background: var(--background-color-300);
      color: var(--main-color-300);
      border: 1px solid var(--main-color-300);
    }
  }
`;
