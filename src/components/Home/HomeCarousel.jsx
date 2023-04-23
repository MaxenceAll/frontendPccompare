import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomeCarousel.css";

import styled from "styled-components";

import { STYLEDButton } from "../styles/genericButton";
import fetcher from "../../helper/fetcher";
import { NavLink } from "react-router-dom";
import { STYLEDhr } from "../styles/genericHR";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";
import CardFromCarousel from "./CardFromCarousel";

export default function HomeCarousel() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [carouselData, setCarouselData] = useState();
  // console.log(carouselData)
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const response = await fetcher.get("carousel", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setCarouselData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <div className="carousel--container">
        <Slider {...settings}>
          {carouselData &&
            carouselData.map((card) => (
              <div key={card.id} className="carousel-card--container">
                <img alt={card.img_alt} src={card.img_src} />
                <NavLink to={card.navigate_to}>
                  <p>{card.description}</p>
                  <STYLEDButton className="btn">
                    {card.button_text}
                  </STYLEDButton>
                </NavLink>
              </div>
            ))}
        </Slider>
      </div>
      <STYLEDhr/>
      <STYLEDCardContainer>
        {carouselData &&
          carouselData.map((card) => (
            <CardFromCarousel
              key={card.id}
              img_alt={card.img_alt}
              img_src={card.img_src}
              description={card.description}
              button_text={card.button_text}
              navigate_to={card.navigate_to}
            />
          ))}
      </STYLEDCardContainer>
    </>
  );
}



const STYLEDCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  &:hover {
      
    }
`;
