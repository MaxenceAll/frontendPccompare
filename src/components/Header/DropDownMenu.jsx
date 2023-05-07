import React from "react";
import { NavLink } from "react-router-dom";
import CPU_IMAGE from "../../assets/generics/CPU.jpg";
import GPU_IMAGE from "../../assets/generics/GPU.jpg";
import MEMORY_IMAGE from "../../assets/generics/MEMORY.jpg";
import MB_IMAGE from "../../assets/generics/MOTHERBOARD.jpg";
import { useGetAllCategoryDataQuery } from "../../features/pccompareSlice";
import {
  STYLEDContainer,
  STYLEDContainerBox,
} from "../styles/genericContainer";
import Loader from "../Tools/Loader";
import { STYLEDErrorMessage } from "../styles/genericParagraphError";

function DropDownMenu() {
  const { data, isLoading, isError } = useGetAllCategoryDataQuery();

//   console.log(data)

  if (isLoading) {
    return (
      <STYLEDContainer>
        <STYLEDContainerBox>
          <Loader />
        </STYLEDContainerBox>
      </STYLEDContainer>
    );
  }

  if (isError) {
    return <STYLEDErrorMessage>Erreur lors de la recherche des categories.</STYLEDErrorMessage>;
  }

  return (
    <>
      {data &&
        data.data.map((category) => (
          <NavLink
            to={`/compare/${category.code}`}
            key={category.Id_category}
          >
            <div>
              {category.category_name}
              <img
                src={
                  {
                    gpu: GPU_IMAGE,
                    cpu: CPU_IMAGE,
                    mb: MB_IMAGE,
                    ram: MEMORY_IMAGE,
                  }[category.code]
                }
                alt={category.img_alt}
              />
            </div>
          </NavLink>
        ))}
    </>
  );
}

export default DropDownMenu;
