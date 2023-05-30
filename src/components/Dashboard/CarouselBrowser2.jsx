import React, { useEffect, useState } from "react";
import { STYLEDContainer } from "../styles/genericContainer";
import Loader from "../Tools/Loader";
import styled from "styled-components";
import fetcher from "../../helper/fetcher";
import { STYLEDSelect } from "../styles/genericSelect";

function CarouselBrowser2() {
  const [carouselData, setCarouselData] = useState([]);
  const [selectedId, setSelectedId] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  console.log(carouselData);

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
    getData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleChange = (event) => {
    setSelectedId(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(carouselData.find((data) => data.id === selectedId));
  };

  if (isLoading) {
    return (
      <STYLEDContainer>
        <STYLEDLoader>
          <Loader />
        </STYLEDLoader>
      </STYLEDContainer>
    );
  }

  console.log(carouselData);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="select">Choisir un article du carousel :</label>
        <STYLEDSelect id="select" value={selectedId} onChange={handleChange}>
          {carouselData.map((data) => (
            <option key={data.id} value={data.id}>
              {data.id}
            </option>
          ))}
        </STYLEDSelect>
      </form>
      {selectedId !== null && (
        <table>
          <thead>
            
          </thead>
          <tbody>
          <tr>
            <td>id:</td>
            <td>{carouselData[selectedId - 1]?.id}</td>
          </tr>
          <tr>
            <td>img_src:</td>
            <td>{carouselData[selectedId - 1]?.img_src}</td>
          </tr>
          <tr>
            <td>img_alt:</td>
            <td>{carouselData[selectedId - 1]?.img_alt}</td>
          </tr>
          <tr>
            <td>description:</td>
            <td>{carouselData[selectedId - 1]?.description}</td>
          </tr>
          <tr>
            <td>button_text:</td>
            <td>{carouselData[selectedId - 1]?.button_text}</td>
          </tr>
          <tr>
            <td>createdAt:</td>
            <td>{carouselData[selectedId - 1]?.createdAt}</td>
          </tr>
          <tr>
            <td>createdBy:</td>
            <td>{carouselData[selectedId - 1]?.createdBy}</td>
          </tr>
          <tr>
            <td>deletedAt:</td>
            <td>{carouselData[selectedId - 1]?.deletedAt}</td>
          </tr>
          <tr>
            <td>deletedBy:</td>
            <td>{carouselData[selectedId - 1]?.deletedBy}</td>
          </tr>
          <tr>
            <td>modifiedAt:</td>
            <td>{carouselData[selectedId - 1]?.modifiedAt}</td>
          </tr>
          <tr>
            <td>modifiedBy:</td>
            <td>{carouselData[selectedId - 1]?.modifiedBy}</td>
          </tr>
          <tr>
            <td>navigate_to:</td>
            <td>{carouselData[selectedId - 1]?.navigate_to}</td>
          </tr>
          <tr>
            <td>long_description:</td>
            <td>{carouselData[selectedId - 1]?.long_description}</td>
          </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CarouselBrowser2;

const STYLEDLoader = styled.div`
  position: fixed;
  top: 65%;
  left: 45%;
`;
