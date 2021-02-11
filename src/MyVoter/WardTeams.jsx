import React, { useState } from "react";
import { Select } from "antd";
import { Table } from "react-bootstrap";
import { wardTeams } from "../data/wardTeams";
import "./style/voter.css";
import { connect, useSelector } from "react-redux";
import { useHistory, Link, withRouter } from "react-router-dom";

function WardTeams() {
  const { Option } = Select;
  const [selectWard, setSelectWard] = useState("select");
  const [wardFilterData, setWardFilterData] = useState({});
  const { userName, ward, village } = useSelector((state) => state);

  const handleWardFilter = (value) => {
    if (value !== "select") {
      let filterdata = wardTeams.filter((e) => e.ward === value)[0];

      setWardFilterData(filterdata);
    } else {
      setWardFilterData({});
    }
  };

  const handleValueChange = (value) => {
    setSelectWard(value);
    handleWardFilter(value);
    // alert(value);
  };
  const history = useHistory();
  return (
    <>
      {userName !== "" ? (
        <div>
          <br />
          <div className="row">
            <div className="col">
              <Select
                style={{ width: 250 }}
                placeholder="Select a Wards"
                optionFilterProp="children"
                onChange={handleValueChange}
                value={selectWard}
                // className="form-group form-control"
                // disabled={isDisable}
              >
                <Option value="select">Select Ward</Option>
                <Option value="1">Ward-1</Option>
                <Option value="2">Ward-2</Option>
                <Option value="3">Ward-3</Option>
                <Option value="4">Ward-4</Option>
                <Option value="5">Ward-5</Option>
                <Option value="6">Ward-6</Option>
                <Option value="7">Ward-7</Option>
                <Option value="8">Ward-8</Option>
                <Option value="9">Ward-9</Option>
                <Option value="10">Ward-10</Option>
                <Option value="11">Ward-11</Option>
                <Option value="12">Ward-12</Option>
              </Select>
            </div>
          </div>
          <div>
            {wardFilterData && Object.keys(wardFilterData).length > 0 ? (
              <div>
                <br />
                <div class="row border">
                  <div class="col">
                    <h5>{`Ward-${wardFilterData.ward}`}</h5>
                  </div>
                </div>
                <div class="row border">
                  <div class="col-4">Category:</div>
                  <div class="col-8">
                    <strong>{wardFilterData.category}</strong>
                  </div>
                </div>
                <div class="row border">
                  <div class="col-4">Member:</div>
                  <div class="col-8">
                    <strong>{wardFilterData.member}</strong>
                  </div>
                </div>
                <div class="row border">
                  <div class="col-4">Phone:</div>
                  <div class="col-8">
                    <a href={`tel:+91-${wardFilterData.contact}`}>
                      <strong>{wardFilterData.contact}</strong>
                    </a>
                  </div>
                </div>
                <br></br>
                <div class="row">
                  <div class="col-12">
                    <h5>Team:</h5>
                  </div>
                </div>
                <div>
                  <Table striped bordered hover size="sm" responsive>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Member</th>
                        <th>Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wardFilterData.Team.map((e) => {
                        return (
                          <tr>
                            <td>{e.id}</td>
                            <td>{e.teamMember}</td>
                            <td>
                              <a href={`tel:+91-${e.mobile}`}>{e.mobile}</a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            ) : selectWard !== "select" ? (
              "No Data"
            ) : (
              "Please Select Ward"
            )}
          </div>
        </div>
      ) : (
        history.push("/")
      )}
    </>
  );
}

export default connect()(WardTeams);
