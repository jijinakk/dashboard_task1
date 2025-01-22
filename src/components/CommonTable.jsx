import React from "react";
import { Table } from "react-bootstrap";
import { IoEye } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CommonTable = ({ data, columns, actions }) => {
  
  return (
    <Table responsive hover className="user-table border" striped>
      <thead>
        <tr>
          {columns.map((col) => (
            <th >{col}</th>
          ))}
          {actions && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr>
            {columns.map((col) => (
              <td >{item[col.toLowerCase()]}</td>
            ))}
            {actions && (
              <td>
                <IoEye onClick={() => actions.view(item)} />{" "}
                <FaEdit onClick={() => actions.edit(item)} />{" "}
                <MdDelete onClick={() => actions.delete(item)} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CommonTable;
