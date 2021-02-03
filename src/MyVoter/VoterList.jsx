import React from "react";
import { Table } from "react-bootstrap";

export default function VoterList({ voterData }) {
  return (
    <div>
      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>Vote</th>
            <th>Ward</th>
            <th>Name</th>
            <th>FatherName</th>
            <th>Village</th>
            <th>Caste</th>
            <th>Support</th>
            <th>Sex</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {voterData.map((e) => {
            return (
              <tr>
                <td>{e.VoteId}</td>
                <td>{e.Ward}</td>
                <td>{e.Name}</td>
                <td>{e.FatherName}</td>
                <td>{e.Village}</td>
                <td>{e.Caste}</td>
                <td>{e.Support}</td>
                <td>{e.Gender}</td>
                <td>{e.Remarks}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
