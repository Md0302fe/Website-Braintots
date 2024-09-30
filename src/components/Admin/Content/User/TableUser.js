import React from "react";
import { Table } from "antd";

const TableUser = (props) => {
  const { selectionType = "checkbox" } = props;
  const { isLoading = false, columns = [], data = [], ...rest } = props;

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...rest}
      />
    </div>
  );
};

export default TableUser;
