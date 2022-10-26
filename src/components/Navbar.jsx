import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import{ MdHome,MdShoppingCart,MdReceipt,MdStore,MdPeopleAlt,MdMonetizationOn,MdSettings,MdKeyboardArrowDown} from 'react-icons/md'
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
        
          <div className="navbar-brand nav-link dropdown-toggle col-md-3 col-lg-2 col-xl-2 me-0 px-3" data-bs-toggle="dropdown" aria-expanded="false"
          onClick={()=>{
            console.log("algo")
          }} style={{cursor:'pointer',userSelect: 'none'}}>Luis Raul Alfonso </div>
         <ul className="dropdown-menu">
          <h6 className="text-center">Administrador</h6>
          <hr/>
              <li><a className="text-center dropdown-item" href="#">Mis Ventas</a></li>
              <li><a className="text-center dropdown-item" href="#">Configuración</a></li>
              <li><a className="text-center dropdown-item" href="#" style={{color:"red"}}>Cerrar Sesión</a></li>
            </ul>
        
           
          
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
