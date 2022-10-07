import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { useDispatch, useSelector } from "react-redux";
import GenericDatatable from "../../component/genericDatatable";
import { deleteStudentData, getStudentsData } from "../../services";
import { studentColumns } from "./studentColumns";
import { studentUniquesData } from "./studentSlice";

const Student = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);
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
    rollno: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [deleteStudentDialog, setDeleteStudentDialog] = useState(false);
  const [studentsData, setStudentsData] = useState({});
  const student = useSelector((state) => state.student.studentData);
  const loading = useSelector((state) => state.student.loading);

  useEffect(() => {
    getStudentsData(dispatch);
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const editStudent = (data) => {
    dispatch(studentUniquesData(data));
    navigate("/create-student");
  };

  const renderHeader = () => {
    return (
      <div className="table-header">
        <h2 className="mx-0 my-1">Students</h2>
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

  const confirmDeleteStudent = (data) => {
    dispatch(studentUniquesData(data));
    setStudentsData(data);
    setDeleteStudentDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editStudent(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteStudent(rowData)}
        />
      </React.Fragment>
    );
  };

  const createStudent = () => {
    dispatch(studentUniquesData(null));
    navigate("/create-student");
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Create"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={createStudent}
        />
      </React.Fragment>
    );
  };
  const hideDeleteStudentDialog = () => {
    setDeleteStudentDialog(false);
  };

  const deleteProduct = async () => {
    const response = await deleteStudentData(dispatch, studentsData);
    if(response.status === 200) {
        getStudentsData(dispatch);
    }
    dispatch(studentUniquesData(null));
    setDeleteStudentDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Student Deleted",
      life: 3000,
    });
  };

  const deleteStudentDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteStudentDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />
      <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
      <GenericDatatable
        tableData={student}
        header={renderHeader}
        columns={studentColumns}
        filters={filters}
        loading={loading}
        globalFilterFields={["name", "email", "rollno"]}
        actionBodyTemplate={actionBodyTemplate}
      />
      <Dialog
        visible={deleteStudentDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteStudentDialogFooter}
        onHide={hideDeleteStudentDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {studentsData && (
            <span>
              Are you sure you want to delete <b>{studentsData.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Student;
