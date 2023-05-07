import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function ProductHeader(props) {
  const { model } = props;
  const { article } = props;
  const { category } = props;

  console.log(model);
  console.log(article);
  console.log(category);

  return (
    <>
      <STYLED_Category>
        <NavLink to={"/compare/gpu"}>{category.name}</NavLink>
      </STYLED_Category>
      <STYLED_Model>
        <NavLink to={"/compare/gpu"}>{model.name}</NavLink>
      </STYLED_Model>
      <STYLED_Article>
        <h1>{article.designation}</h1>
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
