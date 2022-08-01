import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Table, Dropdown, Modal } from "react-bootstrap";
import CrearExistencia from "./crearExistencia.js";
import MrmaForm from "./mrmaform.js";
import Alerta2 from "./notify.js";

function Existencia() {
  const childCompRef = useRef();
  const [alerta, setAlerta] = useState(false);
  const [orden, setOrden] = useState(true);
  function Notificar(respuesta) {
    setAlerta(false);
    childCompRef.current.AlertaConfig(respuesta);
    setAlerta(true);
  }
  function hide() {
    setAlerta(false);
  }
  const [seleccionado, setSeleccionado] = useState("");
  const [productos_existencia, setProductosExistentes] = useState([{"id_existencia":67,"descripcion":"Acabado rojo  y cordones de cuero","costo":"175","precio":"300","comision":"25","merma_c":false,"total":20,"almacen":19,"area_de_venta":1,"id_producto":18,"sub_categoria":"Mocasines","curvatura":"Hombre","material":"Cuero","talla":"38","nombre":"Tienda Jaguey","color":"Negro"},{"id_existencia":42,"descripcion":"Venta en pares 20% de algodon","costo":"100","precio":"175","comision":"15","merma_c":false,"total":0,"almacen":0,"area_de_venta":0,"id_producto":20,"sub_categoria":"Muñequera","curvatura":"Niño","material":"Tela","talla":"10","nombre":"Tienda Jaguey","color":"Rojo"},{"id_existencia":68,"descripcion":"Cartera chica con imagen de Ben10","costo":"50","precio":"100","comision":"10","merma_c":false,"total":3,"almacen":3,"area_de_venta":0,"id_producto":36,"sub_categoria":"Cartera","curvatura":"Niño","material":"Tela","talla":"10","nombre":"Tienda Jaguey","color":"Verde"}]);
  function Load() {
    axios
      .get(process.env.REACT_APP_SERVER + "view/existencia",  {headers:{
        "Bypass-Tunnel-Reminder":1
      }})
      .then((response) => {
        setProductosExistentes(
          orden
            ? response.data.sort((a, b) => a.area_de_venta - b.area_de_venta)
            : response.data.sort((a, b) => a.total - b.total)
        );
      });
  }
  useEffect(() => {
    Load();
  },[]);
  useEffect(() => {
    if (alerta) setTimeout(hide, 15000);
  }, [alerta]);
  const [show, setShow] = useState(false);
  const [showm, setShowM] = useState(false);
  const handleClose = (respuesta) => {
    Notificar(respuesta);
    setShow(false);
    setShowM(false);
  };
  const Close = () => {
    setShow(false);
    setShowM(false);
  };
  const [totalm, settotalm] = useState(0);
  const [almam, setalmam] = useState(0);
  const [exposm, setexposm] = useState(0);
  const [costo, setcosto] = useState(0);
  const [precio, setprecio] = useState(0);
  const [mrmc, setmrmc] = useState(false);
  const GestionMerma=(id,total,almacen,exp,mc,c,p)=>{
setmrmc(mc)
settotalm(total)
setalmam(almacen)
setexposm(exp)
setcosto(c)
setprecio(p)
Gestion(id,4)
  }
  const Ordenar = () => {
    setOrden(!orden);
    orden
      ? setProductosExistentes(
          productos_existencia.sort((a, b) => a.area_de_venta - b.area_de_venta)
        )
      : setProductosExistentes(
          productos_existencia.sort((a, b) => a.total - b.total)
        );
  };
  const handleShow = () => setShow(true);
  const handleShowM = () => setShowM(true);

  function Gestion(id, opcion) {
    switch (opcion) {
      case 1:
        axios
          .post(process.env.REACT_APP_SERVER + "productoexist/sold/" + id,  {headers:{
            "Bypass-Tunnel-Reminder":1
          }})
          .then((response) => {
            Notificar(response);
            Load();
          });
        break;
      case 2:
        console.log("Trasladar");
        break;
      case 3:
        handleShow();
        break;
      case 4:
        handleShowM()
        break;
      case 5:
        if (window.confirm("Esta seguro que desea eliminar el producto?")) {
          axios
            .delete(process.env.REACT_APP_SERVER + "productoexist/" + id,  {headers:{
              "Bypass-Tunnel-Reminder":1
            }})
            .then((response) => {
              childCompRef.current.AlertaConfig(response);
              setAlerta(true);
              Load();
            });
        }
        break;
      default:
        console.log(opcion);
        break;
    }
  }
  return (
    <div>
      {/* <Alerta2/> */}
      <h5>Artículos: {productos_existencia.length}</h5>
      {/* <h1>{process.env.REACT_APP_SERVER}</h1> */}

      <div className="table-responsive" style={{ paddingBottom: "30px" }}>
        <div onClick={hide}>
          <Alerta2 ref={childCompRef} visible={alerta} />
        </div>
        <Table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Artículo</th>
              <th>Detalles</th>
              <th>Descripcion</th>
              <th onClick={Ordenar}>Existencias</th>
              <th>Local</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos_existencia.map((producto) => {
              return (
                <tr key={producto.id_existencia}>
                  <td>
                    <b>
                      {producto.sub_categoria} de {producto.material}
                      <br />
                      {producto.curvatura === "Standar" ? "" : "para"}{" "}
                      {producto.curvatura}
                    </b>
                    <br />
                    <b>Color:</b> {producto.color}
                  </td>
                  <td>
                    <b>Talla:</b> {producto.talla}
                    <br />
                    <b>Precio:</b> {producto.precio}
                    <br />
                    <b>Total:</b> {producto.total}
                  </td>
                  <td>{producto.descripcion}</td>
                  <td
                    style={
                      producto.total > 0
                        ? producto.area_de_venta === 0
                          ? { color: "coral" }
                          : { color: "black" }
                        : { color: "red" }
                    }
                  >
                    <b>{producto.total > 0 ? "Total: " : "Inexistente"}</b>{" "}
                    {producto.total !== 0 ? producto.total : ""}
                    <br />
                    {producto.total !== 0 && <b>Almacen:</b>}
                    {producto.total !== 0 ? producto.almacen : ""} <br />
                    {producto.total !== 0 && <b>Exposición:</b>}{" "}
                    {producto.total !== 0
                      ? producto.area_de_venta > 0
                        ? producto.area_de_venta
                        : "No Representado"
                      : ""}
                  </td>
                  <td>{producto.nombre}</td>
                  <td>
                    <Dropdown id={producto.id_existencia}>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Acciones
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {producto.total > 0 ? (
                          <>
                            <Dropdown.Item
                              onClick={() => Gestion(producto.id_existencia, 1)}
                            >
                              Vender
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => Gestion(producto.id_existencia, 2)}
                            >
                              Trasladar
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                setSeleccionado(producto.id_existencia);
                                GestionMerma(producto.id_existencia,producto.total,producto.almacen,producto.area_de_venta,producto.merma_c,producto.costo,producto.precio)}
                              }
                            >
                              Mermar
                            </Dropdown.Item>
                          </>
                        ) : (
                          ""
                        )}
                        <Dropdown.Item
                          onClick={() => {
                            setSeleccionado(producto.id_existencia);
                            Gestion(producto.id_existencia, 3);
                          }}
                        >
                          Modificar
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => Gestion(producto.id_existencia, 5)}
                        >
                          Eliminar
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Modal
          show={show}
          onHide={Close}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="container">
            <CrearExistencia
              id={seleccionado}
              close={Close}
              save={handleClose}

              load={Load}
            />
          </div>
        </Modal>
        <Modal
          show={showm}
          onHide={Close}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="container">
            <MrmaForm
              id={seleccionado}
              totalp={totalm}
              alp={almam}
              exp={exposm}
              c={costo}
              p={precio}
              close={Close}
              save={handleClose}
              mrmc={mrmc}
              load={Load}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}
export default Existencia;
