import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {navigate('/') }
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
      command: () => {navigate('/student') }
    },
  ];

  return (
    <div className="card">
      <Menubar
        model={items}
        start={<InputText placeholder="Search" type="text" />}
      />
    </div>
  );
};

export default Header;
