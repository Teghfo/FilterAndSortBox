import React, { useState, useEffect } from "react";
import nationality from "../data/Nationality";
import clubs from "../data/Clubs";
import teamPosition from "../data/TeamPositions";

function FilterBox({ changeFilters }) {
  const filters = ["nationality", "club", "team_position"];
  const [nationalityState, setNationalityState] = useState([]);
  const [clubState, setClubState] = useState([]);
  const [teamPositionState, setTeamPositionState] = useState([]);

  const changeFilter = event => {
    let filterStatus = event.target.id.split("-");
    if (event.target.checked) {
      switch (filterStatus[0]) {
        case "nationality":
          setNationalityState([...nationalityState, filterStatus[1]]);
          break;
        case "club":
          setClubState([...clubState, filterStatus[1]]);
          break;
        case "team_position":
          setTeamPositionState([...teamPositionState, filterStatus[1]]);
          break;
      }
    } else {
      switch (filterStatus[0]) {
        case "nationality":
          setNationalityState(prevState =>
            prevState.filter(item => item !== filterStatus[1])
          );
          break;
        case "club":
          setClubState(prevState =>
            prevState.filter(item => item !== filterStatus[1])
          );
          break;
        case "team_position":
          setTeamPositionState(prevState =>
            prevState.filter(item => item !== filterStatus[1])
          );
          break;
      }
    }
  };
  useEffect(() => {
    changeFilters(nationalityState, clubState, teamPositionState);
  }, [nationalityState, clubState, teamPositionState]);
  return (
    <div className="filter-box">
      <div>
        <h5 className="card-title">Filter Box</h5>
        <div class="accordion" id="accordionExample">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h2 class="mb-0">
                <button
                  id={`btn-${filters[0]}-collapse`}
                  class="btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  {filters[0]}
                </button>
              </h2>
            </div>
            <div
              id="collapseOne"
              class="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div class="card-body">
                {nationality.map(item => (
                  <div class="form-check h6">
                    <input
                      class="form-check-input position-static mr-2"
                      type="checkbox"
                      id={`${filters[0]}-${item}`}
                      onChange={changeFilter}
                      value="option1"
                      aria-label="..."
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingTwo">
              <h2 class="mb-0">
                <button
                  id={`btn-${filters[1]}-collapse`}
                  class="btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  {filters[1]}
                </button>
              </h2>
            </div>
            <div
              id="collapseTwo"
              class="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionExample"
            >
              <div class="card-body">
                {clubs.map(item => (
                  <div class="form-check h6">
                    <input
                      class="form-check-input position-static mr-2"
                      type="checkbox"
                      id={`${filters[1]}-${item}`}
                      onChange={changeFilter}
                      value="option1"
                      aria-label="..."
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingThree">
              <h2 class="mb-0">
                <button
                  id={`btn-${filters[2]}-collapse`}
                  class="btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  {filters[2]}
                </button>
              </h2>
            </div>
            <div
              id="collapseThree"
              class="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordionExample"
            >
              <div class="card-body">
                {teamPosition.map(item => (
                  <div class="form-check h6">
                    <input
                      class="form-check-input position-static mr-2"
                      type="checkbox"
                      id={`${filters[2]}-${item}`}
                      onChange={changeFilter}
                      value="option1"
                      aria-label="..."
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBox;
