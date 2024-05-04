// useToggle.js
import { useState } from "react";

const useToggle = (initialState) => {
  const [toggleValue, setToggleValue] = useState(initialState);

  const toggler = (value) => {
    setToggleValue(value);
  };

  return [toggleValue, toggler];
};

export default useToggle;
