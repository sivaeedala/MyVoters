import React, { useState } from "react";
import { Input, AutoComplete } from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Row, Col } from "react-bootstrap";

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

export const AutoSearch = ({ data, handleOnSearch, ClearSearch }) => {
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const inputResult = (value) => {
    const result = data
      .filter((e) => e.Name.toLowerCase().includes(value.toLowerCase()))
      .map((t) => t.Name);
    //   .filter((e) => e.Name.toLowerCase().includes(value))
    //   .map((e) => {
    //     Name: e.Name;
    //   });
    if (result) {
      setOptions(result);
    }
  };

  const handleSearch = (value) => {
    if (value.length >= 3) {
      inputResult(value);
    }
    setSearchValue(value);
    if (value.length < 3) {
      setOptions([]);
    }
  };

  const onSelect = (value) => {
    console.log("onSelect", value);
    setSearchValue(value);
  };

  const handleSearchClick = () => {
    handleOnSearch(searchValue);
  };

  const { Option } = AutoComplete;
  return (
    <>
      <div className="row">
        <div className="col-8 col-sm-12">
          <AutoComplete
            dropdownMatchSelectWidth={252}
            style={{ width: 200 }}
            onSelect={onSelect}
            onSearch={handleSearch}
            notFoundContent={"No Data"}
            placeholder={"Search by Name"}
          >
            {options.map((Name) => (
              <Option key={Name} value={Name}>
                {Name}
              </Option>
            ))}
          </AutoComplete>
        </div>
        <div className="col-4 col-sm-12">
          <Button
            as="input"
            type="submit"
            value="Search"
            onClick={handleSearchClick}
            size="sm"
          />
        </div>
      </div>
      {/*  */}

      {/* */}
    </>
  );
};
