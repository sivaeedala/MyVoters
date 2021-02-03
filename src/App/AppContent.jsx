import React, { useState, useEffect } from "react";
import { AutoSearch } from "../MyVoter/AutoSearch";
import { Navbar, Button, Badge } from "react-bootstrap";
import VoterList from "../MyVoter/VoterList";
import { votersData } from "../data/votersData";
import WardFilter from "../MyVoter/WardFilter";

export default function AppContent() {
  const [filterData, setFilterData] = useState(votersData);
  const [resetAll, setResetAll] = useState(false);
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

  const getCasteCount = (data, input) => {
    return data.filter((e) => e.Caste === input).length;
  };

  const getVillageCount = (data, input) => {
    return data.filter((e) => e.Village === input).length;
  };

  const getOtherVillageCount = (data) => {
    return data.filter(
      (e) => e.Village !== "Gollagudem" && e.Village !== "Kothagudem"
    ).length;
  };

  const setCastNVillageCnt = (inputData) => {
    const ocCnt = getCasteCount(inputData, "OC");
    const bcCnt = getCasteCount(inputData, "BC");
    const scMdCnt = getCasteCount(inputData, "SC-MD");
    const scMlCnt = getCasteCount(inputData, "SC-ML");
    setCasteCount({
      ...casteCount,
      oc: ocCnt,
      bc: bcCnt,
      scMd: scMdCnt,
      scMl: scMlCnt,
    });

    const ggCnt = getVillageCount(inputData, "Gollagudem");
    const kgCnt = getVillageCount(inputData, "Kothagudem");
    const otherVillageCnt = getOtherVillageCount(inputData);

    setVillageCount({
      ...villageCount,
      gGudem: ggCnt,
      kGudem: kgCnt,
      other: otherVillageCnt,
    });
  };

  useEffect(() => {
    setCastNVillageCnt(votersData);
  }, []);

  const handleOnSearch = (input) => {
    setResetAll(true);
    if (input !== "") {
      const result = votersData.filter((e) =>
        e.Name.toLowerCase().includes(input.toLowerCase())
      );
      setFilterData(result);
      setCastNVillageCnt(result);
    } else {
      setFilterData(votersData);
      setCastNVillageCnt(votersData);
    }
  };

  const handleWardFilter = (input) => {
    setResetAll(false);
    if (input === "All") {
      setFilterData(votersData);
      setCastNVillageCnt(votersData);
    } else {
      const result = votersData.filter((e) => e.Ward === input);
      setFilterData(result);
      setCastNVillageCnt(result);
    }
  };
  const ClearSearch = () => {
    setFilterData(votersData);
    setCastNVillageCnt(votersData);
    setResetAll(true);
  };
  return (
    <div className="mycontent">
      <div className="row border">
        <div className="col-12 col-xs-12">
          <WardFilter
            handleWardFilter={handleWardFilter}
            reset={resetAll}
          ></WardFilter>
        </div>
      </div>
      <div className="row border">
        <div className="col-8 col-xs-12">
          <AutoSearch
            data={votersData}
            handleOnSearch={handleOnSearch}
          ></AutoSearch>
        </div>
        <div className="col-4 col-xs-12">
          <Button variant="secondary" onClick={ClearSearch} size="sm">
            Clear
          </Button>
        </div>
      </div>
      <div className="row border">
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
      <div className="row border">
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
