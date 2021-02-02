import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";

export default function WardFilter({ handleWardFilter, reset }) {
  const { Option } = Select;
  const handleValueChange = (value) => {
    setSelectWard(value);
    handleWardFilter(value);
    // alert(value);
  };
  const [selectWard, setSelectWard] = useState("All");
  useEffect(() => {
    setSelectWard("All");
  }, [reset]);
  return (
    <div>
      <Row className="align-items-center">
        <Col xs="12">
          <Select
            style={{ width: 250 }}
            placeholder="Select a Wards"
            optionFilterProp="children"
            onChange={handleValueChange}
            value={selectWard}
            // className="form-group form-control"
          >
            <Option value="All">All Wards</Option>
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
        </Col>
      </Row>
    </div>
  );
}
