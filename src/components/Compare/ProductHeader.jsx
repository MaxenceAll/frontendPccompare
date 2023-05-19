import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function ProductHeader(props) {

  // console.log(props);
  const { model } = props;
  const { article } = props;
  const { category } = props;
  
  console.log(article[0].code)

  return (
    <>
      <STYLED_Category>
        <NavLink to={`/compare/${article[0].code}`}>{category}</NavLink>
      </STYLED_Category>
      <STYLED_Model>
        <NavLink to={`/compare/${article[0].code}`}>{model}</NavLink>
      </STYLED_Model>
      <STYLED_Article>
        <h1>{article[0].designation}</h1>
      </STYLED_Article>
      {/* <p>(Total note ****) here</p>
      <p>(Favorite it) here</p> */}
    </>
  );
}

export default ProductHeader;

const STYLED_Category = styled.div`
  text-decoration: underline;
  color: var(--main-color-200);
`;
const STYLED_Model = styled.div``;
const STYLED_Article = styled.div``;
