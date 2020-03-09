import React, { useState } from "react";
import Table from "../components/Table";
import FilterBox from "../components/FilterBox";
import SortBox from "../components/SortBox";
import players from "../data/Players";

function App() {
  const [appPlayers, setAppPlayers] = useState(players);

  const changeSort = (sortTypeState, sortItem) => {
    const sortingFun = (a, b) => {
      if (sortItem === "short_name") {
        a["short_name"] = a["short_name"].toUpperCase();
        b["short_name"] = b["short_name"].toUpperCase();
      }
      switch (sortTypeState) {
        case "":
          return a["overall"] < b["overall"]
            ? 1
            : a["overall"] > b["overall"]
            ? -1
            : 0;

        case "ASC":
          return a[sortItem] > b[sortItem]
            ? 1
            : a[sortItem] < b[sortItem]
            ? -1
            : 0;
        case "DES":
          return a[sortItem] < b[sortItem]
            ? 1
            : a[sortItem] > b[sortItem]
            ? -1
            : 0;
      }
    };

    let newPlayers = [...appPlayers];
    newPlayers.sort(sortingFun);
    setAppPlayers(newPlayers);
  };

  const changeFilters = (nationalityState, clubState, teamPositionState) => {
    const checkFilter = (selectedState, item) => {
      if (selectedState.length > 0) {
        return selectedState.indexOf(item) > -1 ? true : false;
      } else {
        return true;
      }
    };
    let newPlayer = players
      .filter(item => checkFilter(nationalityState, item.nationality))
      .filter(item => checkFilter(clubState, item.club))
      .filter(item => checkFilter(teamPositionState, item.team_position));
    setAppPlayers(newPlayer);
  };
  const renderTable = () => {
    return <Table players={appPlayers} />;
  };

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3 col-12">
          <FilterBox changeFilters={changeFilters} />
        </div>
        <div className="col-lg-8 col-12">
          <SortBox changeSort={changeSort} />
          {renderTable()}
        </div>
      </div>
    </div>
  );
}

export default App;
