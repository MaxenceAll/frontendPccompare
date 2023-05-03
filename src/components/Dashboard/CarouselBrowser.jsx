import React, { useEffect, useState } from "react";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";
import fetcher from "../../helper/fetcher";
import styled from "styled-components";
import Loader from "../Tools/Loader";
import { FixedSizeList } from "react-window";
import { STYLEDhr } from "../styles/genericHR";
import { STYLEDButton } from "../styles/genericButton";
import CarouselDetails from "./CarouselDetails";

function CarouselBrowser() {
  const [carouselData, setCarouselData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // console.log(carouselData);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const response = await fetcher.get("carousel", {
          signal: controller.signal,
        });
        isMounted && setCarouselData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    const timeout = setTimeout(() => {
      getData();
    }, 2000); // delay the execution by 2 seconds

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

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
  if (!isLoading) {
    const startIndex = pageSize * (currentPage - 1);
    const endIndex = startIndex + pageSize;
    // console.log(carouselData);
    const itemToDisplay = carouselData?.slice(startIndex, endIndex);
    // console.log(itemToDisplay);

    content = (
      <>
        <FixedSizeList
          height={444}
          itemCount={itemToDisplay?.length}
          itemSize={444}
          width={600}
        >
          {({ index, style }) => (
            <div style={style}>
              <CarouselDetails item={itemToDisplay[index]} />
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
              {Math.ceil(carouselData?.length / pageSize)}&nbsp;
            </span>
            <STYLEDButton
              width="30%"
              onClick={handleNextPageClick}
              disabled={
                currentPage === Math.ceil(carouselData?.length / pageSize)
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
              <option value={carouselData?.length}>
                All({carouselData?.length})
              </option>
            </STYLEDSelect>
          </div>
        </STYLEDPaginationOptions>

        <STYLEDPageContainer>
          {Array.from(
            { length: Math.ceil(carouselData?.length / pageSize) },
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

  if (isLoading) {
    return (
      <STYLEDContainer>
        <STYLEDLoader>
          <Loader />
        </STYLEDLoader>
      </STYLEDContainer>
    );
  }

  return (
    <DIV_CarouselBrowserForAdmins>
      Vous êtes admin, vous pouvez piloter le carousel:

      {/*
      <STYLEDContainer>
        <STYLEDContainerBox>
          
        toto

        </STYLEDContainerBox>
      </STYLEDContainer>
      */}


      <STYLEDContainer>
        <STYLEDContainerBox>{content}</STYLEDContainerBox>
      </STYLEDContainer>

    </DIV_CarouselBrowserForAdmins>
  );
}

export default CarouselBrowser;

const STYLEDLoader = styled.div`
  position: fixed;
  top: 65%;
  left: 45%;
`;

const DIV_CarouselBrowserForAdmins = styled.div`
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
