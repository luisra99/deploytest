import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import{ MdAddCircle,MdHome,MdShoppingCart,MdReceipt,MdStore,MdPeopleAlt,MdMonetizationOn,MdSettings} from 'react-icons/md'
export const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const menuItem = [
    {
      path: "/",
      name: "Inicio",
      icon: <MdHome size={25}/>,
    },
    {
      path: "/existencia",
      name: "Existencia",
      icon: <MdShoppingCart size={25}/>,
    },
    {
      path: "/vales",
      name: "Vales",
      icon: <MdReceipt size={25}/>,
    },
    {
      path: "/locales",
      name: "Locales",
      icon: <MdStore size={25}/>,
    },
    {
      path: "/trabajadores",
      name: "Trabajadores",
      icon: <MdPeopleAlt size={25}/>,
    },
    {
      path: "/test",
      name: "Test",
      icon: <MdSettings size={25}/>,
    },
    {
      path: "/cont",
      name: "Contabilidad",
      icon: <MdMonetizationOn size={25}/>,
    },
    {
      path: "/config",
      name: "Configuración",
      icon: <MdSettings size={25}/>,
    },
    
  ];

  return (
    <div>
      <header className="navbar navbar-dark sticky-top  flex-md-nowrap p-0 shadow" style={{background:"#063139"}}>
        <h4
          className="navbar-brand col-md-3 col-lg-2 col-xl-2 me-0 px-3"
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
        
        {/* <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <h6 className="nav-link h5x-3">Sign out</h6>
          </div>
        </div> */}
      </header>
      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className={
              isOpen
                ? "col-md-3 col-lg-2 col-xl-2 d-md-block sidebar collapse show"
                : "col-md-3 col-lg-2 col-xl-2 d-md-block sidebar collapse"
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
