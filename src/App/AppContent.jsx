import React, { useState } from "react";
import { AutoSearch } from "../MyVoter/AutoSearch";
import { Navbar, Button, Badge } from "react-bootstrap";
import VoterList from "../MyVoter/VoterList";
import { votersData } from "../data/votersData";
import WardFilter from "../MyVoter/WardFilter";

export default function AppContent() {
  const [filterData, setFilterData] = useState(votersData);
  const [casteCount, setCasteCount] = useState({
    oc: 0,
    bc: 0,
    scMl: 0,
    scMd: 0,
  });
  const [villageCount, setVillageCount] = useState({
    gGudem: 0,
    kGudem: 0,
    other: 0,
  });

//   useEffect(() => {

//   }, []);

  const handleOnSearch = (input) => {
    if (input !== "") {
      const result = filterData.filter((e) =>
        e.Name.toLowerCase().includes(input.toLowerCase())
      );
      setFilterData(result);
    } else {
      setFilterData(votersData);
    }
  };

  const handleWardFilter = (input) => {
    if (input === "All") {
      setFilterData(votersData);
    } else {
      const result = votersData.filter((e) => e.Ward === input);
      setFilterData(result);
    }
  };
  const ClearSearch = () => {
    setFilterData(votersData);
  };
  return (
    <div>
      <div className="row">
        <div className="col-12 col-xs-12">
          <WardFilter handleWardFilter={handleWardFilter}></WardFilter>
        </div>
      </div>
      <div className="row">
        <div className="col-8 col-xs-12">
          <AutoSearch
            data={filterData}
            handleOnSearch={handleOnSearch}
            ClearSearch={ClearSearch}
          ></AutoSearch>
        </div>
        <div className="col-4 col-xs-12">
          <Button variant="secondary" onClick={ClearSearch} size="sm">
            Clear
          </Button>
        </div>
      </div>
      <div className="row">
        <div class="col">
          <Badge variant="info">{`Gollagudem-${villageCount.gGudem}`}</Badge>
        </div>
        <div class="col">
          <Badge variant="success">{`Kothgudem-${villageCount.kGudem}`}</Badge>
        </div>
        <div class="col">
          <Badge variant="light">{`Others-${villageCount.other}`}</Badge>
        </div>
      </div>
      <div className="row">
        <div class="col">
          <Badge variant="warning">{`OC-${casteCount.oc}`}</Badge>
        </div>
        <div class="col">
          <Badge variant="info">{`BC-${casteCount.bc}`}</Badge>
        </div>
        <div class="col">
          <Badge variant="primary">{`SC-ML-${casteCount.scMl}`}</Badge>
        </div>
        <div class="col">
          <Badge variant="dark">{`SC-MD-${casteCount.scMd}`}</Badge>
        </div>
      </div>
      <div className="row">
        <div class="col">
          <VoterList voterData={filterData}></VoterList>
        </div>
      </div>
    </div>
  );
}
