import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem('token');
    await navigate("/login");
  }

  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/");
      },
    },
    // {
    //   label: "Users",
    //   icon: "pi pi-fw pi-user",
    //   command: () => {navigate('/user') }
    // },
    // {
    //   label: "Counter",
    //   icon: "pi pi-fw pi-plus",
    //   command: () => {navigate('/counter') }
    // },
    {
      label: "Student",
      icon: "pi pi-fw pi-user",
      command: () => {
        navigate("/student");
      },
    },
    {
      label: "Logout",
      icon: "pi pi-fw pi-sign-out",
      command: () => {
        logout();
      },
    },
  ];

  return (
    <div className="card">
      <Menubar
        model={items}
        end={<InputText placeholder="Search" type="text" />}
      />
    </div>
  );
};

export default Header;
