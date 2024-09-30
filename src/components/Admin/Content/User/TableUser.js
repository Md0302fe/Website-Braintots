import React, { useMemo } from "react";
import { Button, Table } from "antd";
import { Excel } from "antd-table-saveas-excel";
import Loading from "../../../LoadingComponent/Loading";

const TableUser = (props) => {
  const { selectionType = "checkbox" } = props;
  // get Props List
  const { isLoading = false, columns = [], data: dataSource, ...rest } = props;

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
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
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
      
      <Button type="primary" className="button-exportFile" onClick={handleExportFileExcels}>
        Xuất file
      </Button>

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...rest}
      />
    </Loading>
  );
};

export default TableUser;
