import React from "react";
import { Table } from "antd";
import Loading from "../../../LoadingComponent/Loading";

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

const TableProduct = (props) => {
  const { isLoading = false, columns = [], data = [], setRowSelected } = props;
  const { selectionType = "checkbox" } = props;

  return (
    <Loading isPending={isLoading}>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        // truyền cái hàm này qua bên table product luôn.
        // onRow (1 hành động gì đó lên row này) => thực thi hàm handle (id của product đó)
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setRowSelected(record._id);
            },
          };
        }}
      />
    </Loading>
  );
};

export default TableProduct;
