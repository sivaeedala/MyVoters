import React, { useState, useEffect } from "react";
import { AutoSearch } from "./AutoSearch";
import { Navbar, Button, Badge } from "react-bootstrap";
import VoterList from "./VoterList";
import { votersData } from "../data/votersData";
//import { votersData } from "../data/tempData";
import WardFilter from "./WardFilter";
import { useHistory, Link, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { Select } from "antd";
import "./style/voter.css";

function AppContent() {
  const { Option } = Select;
  const history = useHistory();
  // console.log("App useHistory()", useHistory());
  const { userName, ward, village } = useSelector((state) => state);
  // console.log("Siva111", userName, ward);
  const [filterData, setFilterData] = useState(votersData);
  const [resetAll, setResetAll] = useState(false);
  const [resetSearch, setResetSearch] = useState(false);
  const [selectVillage, setSelectVillage] = useState("All");
  const [selectWard, setSelectWard] = useState(ward);
  const [casteCount, setCasteCount] = useState({
    oc: 0,
    bc: 0,
    scMl: 0,
    scMd: 0,
    na: 0,
  });
  const [villageCount, setVillageCount] = useState({
    gGudem: 0,
    kGudem: 0,
    other: 0,
  });
  const [casteSelect, setCasteSelect] = useState("");

  const getCasteCount = (data, input) => {
    return data.filter((e) => e.Caste === input).length;
  };

  const getNoCasteCount = (data) => {
    return data.filter(
      (e) =>
        e.Caste !== "OC" &&
        e.Caste !== "BC" &&
        e.Caste !== "SC-ML" &&
        e.Caste !== "SC-MD"
    ).length;
  };

  const getVillageCount = (data, input) => {
    return data.filter((e) => e.Village === input).length;
  };

  const getOtherVillageCount = (data) => {
    return data.filter(
      (e) => e.Village !== "Gollagudem" && e.Village !== "Kothagudem"
    ).length;
  };

  const getVotersData = (ward, village) => {
    // console.log("votersData", votersData);
    if (village !== "" && village !== "All") {
      //  votersData.filter(
      //   (e) => e.Ward === ward && e.Village.toLowerCase() === village
      // );
      if (village === "other") {
        let otherData = votersData.filter(
          (e) =>
            e.Village.toLowerCase() !== "gollagudem" &&
            e.Village.toLowerCase() !== "kothagudem"
        );
        return ward === "All"
          ? otherData
          : otherData.filter((e) => e.Ward === ward);
      } else {
        return ward === "All"
          ? votersData.filter((e) => e.Village.toLowerCase() === village)
          : votersData.filter(
              (e) => e.Ward === ward && e.Village.toLowerCase() === village
            );
      }
    } else {
      return ward === "All"
        ? votersData
        : votersData.filter((e) => e.Ward === ward);
    }
  };

  const getWardData = (input, village) => {
    const data = getVotersData(input, village);
    if (input === "All") {
      // setFilterData(votersData);
      // setCastNVillageCnt(votersData);
      setFilterData(data);
      setCastNVillageCnt(data);
    } else {
      // const result = votersData.filter((e) => e.Ward === input);
      // setFilterData(result);
      // setCastNVillageCnt(result);
      const result = data.filter((e) => e.Ward === input);
      setFilterData(result);
      setCastNVillageCnt(result);
    }
  };

  const setCastNVillageCnt = (inputData) => {
    const ocCnt = getCasteCount(inputData, "OC");
    const bcCnt = getCasteCount(inputData, "BC");
    const scMdCnt = getCasteCount(inputData, "SC-MD");
    const scMlCnt = getCasteCount(inputData, "SC-ML");
    const naCnt = getNoCasteCount(inputData);
    setCasteCount({
      ...casteCount,
      oc: ocCnt,
      bc: bcCnt,
      scMd: scMdCnt,
      scMl: scMlCnt,
      na: naCnt,
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
    if (village) {
      setSelectVillage(village === "" ? "All" : village);
    } else {
      setSelectVillage("All");
    }
    // setCastNVillageCnt(votersData);
    getWardData(ward, village);
  }, []);

  const handleOnSearch = (input) => {
    // setResetAll(true);
    setSelectWard(ward);
    setResetSearch(false);
    // const searchData =
    //   ward === "All" ? votersData : votersData.filter((e) => e.Ward === ward);
    // const searchData = getVotersData(ward, village);
    const searchData = getVotersData(ward, selectVillage);
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
  const handleVillageSelect = (value) => {
    setSelectVillage(value);
    getWardData(selectWard, value);

    // if (value === "All") {
    //   getWardData(selectWard, value);
    // } else {
    //   getWardData(selectWard, value);
    // }
  };

  const handleWardFilter = (input) => {
    setResetAll(false);
    setResetSearch(true);
    setSelectVillage(village === "" ? "All" : village);
    // getWardData(input);
    getWardData(input, village);
  };
  const ClearSearch = () => {
    // const vData =
    //   ward === "All" ? votersData : votersData.filter((e) => e.Ward === ward);
    const vData = getVotersData(ward, village);

    setFilterData(vData);
    setResetSearch(true);
    setCastNVillageCnt(vData);
    setResetAll(true);
    setSelectVillage(village === "" ? "All" : village);
    setSelectWard(ward);
    setCasteSelect("");
  };

  const handleCasteSelect = (selCaste) => {
    const data = getVotersData(selectWard, selectVillage);
    setCasteSelect(selCaste);

    if (selCaste !== "other") {
      const result = data.filter((e) => e.Caste === selCaste);
      setFilterData(result);
      //setCastNVillageCnt(result);
    } else {
      const result = data.filter(
        (e) =>
          e.Caste !== "OC" &&
          e.Caste !== "BC" &&
          e.Caste !== "SC-ML" &&
          e.Caste !== "SC-MD"
      );
      setFilterData(result);
      //setCastNVillageCnt(result);
    }
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
                // ward={ward}
                isDisable={ward !== "All" ? true : false}
                selectWard={selectWard}
                setSelectWard={setSelectWard}
              ></WardFilter>
            </div>
          </div>

          <div className="row border">
            <div className="col-12 col-xs-12">
              <Select
                style={{ width: 250 }}
                placeholder="Select a Village"
                optionFilterProp="children"
                onChange={handleVillageSelect}
                value={selectVillage}
                // className="form-group form-control"
                disabled={village !== "" && village !== "All" ? true : false}
              >
                <Option value="All">All Villages</Option>
                <Option value="gollagudem">Gollagudem</Option>
                <Option value="kothagudem">kothagudem</Option>
                <Option value="other">other</Option>
              </Select>
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
                reset={resetSearch}
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
              <Badge variant="warning">{`Gollagudem-${villageCount.gGudem}`}</Badge>
            </div>
            <div class="col">
              <Badge variant="success">{`Kothgudem-${villageCount.kGudem}`}</Badge>
            </div>
            <div class="col">
              <Badge variant="light">{`Others-${villageCount.other}`}</Badge>
            </div>
          </div>
          <div className="row border">
            <div
              className="col"
              //className={casteSelect === "OC" ? "col btn-select" : "col"}
            >
              <Button
                variant="warning"
                onClick={() => {
                  handleCasteSelect("OC");
                }}
                size="sm"
                className={casteSelect === "OC" ? "btn-caste" : ""}
                // style={
                //   casteSelect === "OC" ? { border: "2px solid black" } : ""
                // }
              >
                <Badge variant="light">{`OC -${casteCount.oc}`}</Badge>
              </Button>
            </div>
            <div className="col">
              <Button
                variant="info"
                onClick={() => {
                  handleCasteSelect("BC");
                }}
                size="sm"
                className={casteSelect === "BC" ? "btn-caste" : ""}
              >
                <Badge variant="light">{`BC-${casteCount.bc}`}</Badge>
              </Button>
            </div>
            <div className="col">
              <Button
                variant="primary"
                onClick={() => {
                  handleCasteSelect("SC-ML");
                }}
                size="sm"
                className={casteSelect === "SC-ML" ? "btn-caste" : ""}
              >
                <Badge variant="light">{`SC-ML-${casteCount.scMl}`}</Badge>
              </Button>
            </div>
            <div className="col">
              <Button
                variant="dark"
                onClick={() => {
                  handleCasteSelect("SC-MD");
                }}
                size="sm"
                className={casteSelect === "SC-MD" ? "btn-caste" : ""}
              >
                <Badge variant="light">{`SC-MD-${casteCount.scMd}`}</Badge>
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Button
                variant="secondary"
                onClick={() => {
                  handleCasteSelect("other");
                }}
                size="sm"
                className={casteSelect === "other" ? "btn-caste" : ""}
              >
                <Badge variant="light">{`NA-${casteCount.na}`}</Badge>
              </Button>
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
