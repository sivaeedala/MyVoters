import React, { useState, useEffect } from "react";
import { AutoSearch } from "./AutoSearch";
import { Navbar, Button, Badge } from "react-bootstrap";
import VoterList from "./VoterList";
import { votersData } from "../data/votersData";
//import { votersData } from "../data/tempData";
import WardFilter from "./WardFilter";
import { useHistory, Link, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

function AppContent() {
  const history = useHistory();
  console.log("App useHistory()", useHistory());
  const { userName, ward } = useSelector((state) => state);
  console.log("Siva111", userName, ward);
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

  const getWardData = (input) => {
    if (input === "All") {
      setFilterData(votersData);
      setCastNVillageCnt(votersData);
    } else {
      const result = votersData.filter((e) => e.Ward === input);
      setFilterData(result);
      setCastNVillageCnt(result);
    }
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
    // setCastNVillageCnt(votersData);
    getWardData(ward);
  }, []);

  const handleOnSearch = (input) => {
    setResetAll(true);
    let x = votersData;
    const searchData =
      ward === "All" ? votersData : votersData.filter((e) => e.Ward === ward);
    if (input !== "") {
      const result = searchData.filter((e) =>
        e.Name.toLowerCase().includes(input.toLowerCase())
      );
      setFilterData(result);
      setCastNVillageCnt(result);
    } else {
      setFilterData(searchData);
      setCastNVillageCnt(searchData);
    }
  };

  const handleWardFilter = (input) => {
    setResetAll(false);
    getWardData(input);
  };
  const ClearSearch = () => {
    const vData =
      ward === "All" ? votersData : votersData.filter((e) => e.Ward === ward);
    setFilterData(vData);
    setCastNVillageCnt(vData);
    setResetAll(true);
  };
  return (
    <div className="mycontent">
      {userName !== "" && ward !== "" ? (
        <div>
          <div className="row border">
            <div className="col-12 col-xs-12">
              <WardFilter
                handleWardFilter={handleWardFilter}
                reset={resetAll}
                ward={ward}
              ></WardFilter>
            </div>
          </div>
          <div className="row border">
            <div className="col-8 col-xs-12">
              <AutoSearch
                data={
                  ward === "All"
                    ? votersData
                    : votersData.filter((e) => e.Ward === ward)
                }
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
      ) : (
        history.push("/")
      )}
    </div>
  );
}

export default connect()(AppContent);
