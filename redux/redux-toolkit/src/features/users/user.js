import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { useDispatch, useSelector } from "react-redux";
import GenericDatatable from "../../component/genericDatatable";
import { getUsers } from "../../services";
import { userColumns } from "./userColumns";

const User = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    email: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    username: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    phone: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const user = useSelector((state) => state.user.userData);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    getUsers(dispatch);
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="table-header">
        <h2 className="mx-0 my-1">Users</h2>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const actionBodyTemplate = () => {
    return <Button type="button" icon="pi pi-cog"></Button>;
  };

  const createUser = () => {
    navigate('/create-user')
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Create"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={createUser}
        />
      </React.Fragment>
    );
  };
  return (
    <div>
      <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
      <GenericDatatable
        tableData={user}
        header={renderHeader}
        columns={userColumns}
        filters={filters}
        loading={loading}
        globalFilterFields={["name", "email", "phone", "username"]}
        actionBodyTemplate={actionBodyTemplate}
      />
    </div>
  );
};

export default User;
