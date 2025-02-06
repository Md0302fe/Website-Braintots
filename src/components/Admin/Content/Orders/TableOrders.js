import React, { useMemo } from "react";
import { Button, Table } from "antd";
import Loading from "../../../LoadingComponent/Loading";

import { Excel } from "antd-table-saveas-excel";

const TableOrders = (props) => {
  const { selectionType = "checkbox" } = props;
  const { isLoading = false, columns = [], data: dataSource } = props;


  // useMemo thực thi ghi nhớ và trả về 1 giá trị .
  const dataColumnsExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== "action");
    return arr;
  }, [columns]);

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === "Disabled User",
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
  const handleExportFileExcels = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(dataColumnsExport)
      .addDataSource(dataSource, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
  };
  
  return (
    <Loading isPending={isLoading}>
      <Button
        type="primary"
        className="button-exportFile"
        onClick={handleExportFileExcels}
      >
        Xuất file
      </Button>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 6 }} // Giới hạn 5 item mỗi trang
        {...props}
      />
      {/* <Button type="primary" danger>
        Xóa tất cả
      </Button> */}
    </Loading>
  );
};

export default TableOrders;
