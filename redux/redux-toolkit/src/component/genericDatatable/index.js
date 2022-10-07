import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./DataTableDemo.css";

const GenericDatatable = (props) => {
  const {
    tableData,
    columns,
    header,
    globalFilterFields,
    loading,
    filters,
    actionBodyTemplate,
  } = props;
  return (
    <div className="datatable-crud-demo">
      <div className="card">
        <DataTable
          value={tableData}
          paginator
          className="p-datatable-customers"
          header={header ? header : null}
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
          dataKey="id"
          rowHover
          filters={filters}
          filterDisplay="menu"
          loading={loading}
          responsiveLayout="scroll"
          globalFilterFields={globalFilterFields}
          emptyMessage="No Data found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          {columns &&
            columns.length > 0 &&
            columns.map((column, index) => (
              <Column
                key={index}
                field={column.field}
                header={column.header}
                sortable={column.sortable}
                filter
                filterPlaceholder={`Search by ${column.header}`}
                style={{ width: "4rem" }}
              />
            ))}
          <Column
            headerStyle={{ width: "4rem", textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
            body={actionBodyTemplate}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default GenericDatatable;
