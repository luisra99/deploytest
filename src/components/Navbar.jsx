import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { IoIosAddCircle } from "react-icons/io";
import { BsReceiptCutoff, BsPeopleFill } from "react-icons/bs";
import { AiFillSetting, AiTwotoneShop } from "react-icons/ai";
import { GiSewingMachine, GiTakeMyMoney } from "react-icons/gi";
export const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const menuItem = [
    {
      path: "/",
      name: "Existencia",
      icon: <HiShoppingCart />,
    },
    {
      path: "/exist/create",
      name: "Nuevo Producto",
      icon: <IoIosAddCircle />,
    },
    {
      path: "/vales",
      name: "Vales",
      icon: <BsReceiptCutoff />,
    },
    {
      path: "/locales",
      name: "Locales",
      icon: <AiTwotoneShop />,
    },
    {
      path: "/trabajadores",
      name: "Trabajadores",
      icon: <BsPeopleFill />,
    },
    {
      path: "/merma",
      name: "Reparación",
      icon: <GiSewingMachine />,
    },
    {
      path: "/cont",
      name: "Contabilidad",
      icon: <GiTakeMyMoney />,
    },
    {
      path: "/config",
      name: "Configuración",
      icon: <AiFillSetting />,
    },
  ];

  return (
    <div>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <h4
          className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
          onClick={toggle}
        >
          CASACALZADO
        </h4>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggle}
          style={{ padding: "0px" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Form.Control
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <h6 className="nav-link h5x-3">Sign out</h6>
          </div>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className={
              isOpen
                ? "col-md-3 col-lg-2 d-md-block bg-light sidebar collapse show"
                : "col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
            }
            style={{ paddingLeft: "0px", paddingRight: "0px" }}
          >
            <div className="position-sticky pt-3">
              <div className="buttons">
                {menuItem.map((item, index) => (
                  <NavLink
                    to={item.path}
                    key={index}
                    className="link-nav"
                    onClick={close}
                  >
                    <div className="icon">{item.icon}</div>
                    <div style={{ display: "block" }} className="link_text-nav">
                      {item.name}
                    </div>
                  </NavLink>
                ))}
              </div>
              {/* 
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
        </h6>
        {
          menuItem.map((item,index)=>(
<NavLink to={item.path} key={index} className="link-nav" >
  <div className="icon">{item.icon}</div>
          <div style={{display:"block"} } className="link_text-nav">{item.name}</div>
</NavLink>
         ))
        }  */}
            </div>
          </nav>
          <main
            className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
            style={{ marginTop: "10px" }}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
