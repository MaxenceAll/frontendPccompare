import React from "react";
import MultiRangeSlider from "../components/Product/MultiRangeSlider";

function Test() {
  return (
    <div>
      <MultiRangeSlider
        min={0}
        max={1850}
        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
      />
    </div>
  );
}

export default Test;
