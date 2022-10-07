import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { createStudentData, editStudentData } from "../../services";
import "./createStudent.css";

export const CreateStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const student = useSelector((state) => state.student.studentUniqueData);
  const [showMessage, setShowMessage] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollno: "",
  });

  useEffect(() => {
    setStudentData(student);
  }, [student]);

  const setStudentData = () => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        rollno: student.rollno,
      });
      setEditFlag(true);
    }
  };

  const createUser = async (data, formik) => {
    const response = await createStudentData(dispatch, data);
    setShowMessage(true);
    formik.resetForm();
  };

  const editUser = async (data, formik) => {
    const response = await editStudentData(dispatch, data, student);
    setShowMessage(true);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "Name is required.";
      }

      if (!data.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Invalid email address. E.g. example@email.com";
      }

      if (!data.rollno) {
        errors.rollno = "Roll No is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      if (editFlag) {
        editUser(data, formik);
      } else {
        createUser(data, formik);
      }
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const successStudent = () => {
    setShowMessage(false);
    navigate("/student");
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={successStudent}
      />
    </div>
  );

  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Student {editFlag ? "Update" : "Create"} Successful!</h5>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h2 className="text-center">
            {editFlag ? "Edit Student" : "Create Student"}
          </h2>
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="field">
              <span className="p-float-label">
                <InputText
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  autoFocus
                  className={classNames({
                    "p-invalid": isFormFieldValid("name"),
                  })}
                />
                <label
                  htmlFor="name"
                  className={classNames({
                    "p-error": isFormFieldValid("name"),
                  })}
                >
                  Name*
                </label>
              </span>
              {getFormErrorMessage("name")}
            </div>
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("email"),
                  })}
                />
                <label
                  htmlFor="email"
                  className={classNames({
                    "p-error": isFormFieldValid("email"),
                  })}
                >
                  Email*
                </label>
              </span>
              {getFormErrorMessage("email")}
            </div>
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <InputText
                  type="number"
                  id="rollno"
                  name="rollno"
                  value={formik.values.rollno}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("rollno"),
                  })}
                />
                <label
                  htmlFor="rollno"
                  className={classNames({
                    "p-error": isFormFieldValid("rollno"),
                  })}
                >
                  Rollno*
                </label>
              </span>
              {getFormErrorMessage("rollno")}
            </div>
            <Button type="submit" label="Submit" className="mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
};
