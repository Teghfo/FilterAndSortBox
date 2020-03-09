import React, { useState, useEffect } from "react";
import sortType from "../data/SortType";

function SortBox({ changeSort }) {
  const [styleState, setStyleState] = useState("btn-outline-primary");
  const [sortItem, setSortItem] = useState("");
  const [sortTypeState, setSortTypeState] = useState("");

  const fields = ["age", "short_name", "value"];

  const changeSelectedSort = event => {
    let stateButton = event.target.id.split("-")[2];
    if (stateButton === sortItem) {
      switch (sortTypeState) {
        case "":
          setSortTypeState(sortType.DES);
          break;
        case sortType.DES:
          setSortTypeState(sortType.ASC);
          break;
        case sortType.ASC:
          setSortTypeState("");
          break;
      }
    } else {
      setSortItem(stateButton);
      setSortTypeState(sortType.DES);
    }
  };

  const setClassName = () => {
    switch (sortTypeState) {
      case "":
        setStyleState("btn-outline-primary");
        break;
      case sortType.DES:
        setStyleState("btn-success");
        break;
      case sortType.ASC:
        setStyleState("btn-info");
        break;
    }
  };

  useEffect(() => {
    changeSort(sortTypeState, sortItem);
    setClassName();
  }, [sortTypeState, sortItem]);

  return (
    <div id="sort-box-container" className="d-flex py-2">
      {fields.map(field => (
        <button
          id={`sort-btn-${field}`}
          type="button"
          onClick={changeSelectedSort}
          className={`btn mx-2 sort-btn ${
            sortItem === field ? styleState : "btn-outline-primary"
          }`}
        >
          {field}
        </button>
      ))}
    </div>
  );
}

export default SortBox;
