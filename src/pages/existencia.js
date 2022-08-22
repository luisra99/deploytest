import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import {Modal,Table } from "react-bootstrap";
import  RadioButtons  from "../components/radioButtons.js";
import Badge from 'react-bootstrap/Badge';

import CrearExistencia from "./crearExistencia.js";
import  SelectList  from "../components/selectList.js";
import MrmaForm from "./mrmaform.js";
import Accordion from 'react-bootstrap/Accordion';
import { MdWarning,MdOutlineProductionQuantityLimits,MdOutlineAttachMoney,MdEdit} from "react-icons/md";

import Alerta2 from "./notify.js";

function Existencia() {
  const [elementosFiltrados, setElementosFiltrados] = useState([{"id_existencia":95,"descripcion":"Pulsera de hilo","costo":"100","precio":"120","comision":"10","merma_c":true,"total":10,"almacen":8,"area_de_venta":2,"id_producto":45,"sub_categoria":"Pulsera","curvatura":"Niño","material":"Tela","talla":"34","nombre":"Tienda Jaguey","color":"Rojo","sc_id":7,"curv_id":3,"mat_id":2,"tall_id":36,"loc_id":6,"col_id":18},{"id_existencia":94,"descripcion":"Alpargatas","costo":"120","precio":"250","comision":"12","merma_c":false,"total":10,"almacen":8,"area_de_venta":2,"id_producto":44,"sub_categoria":"Mocasines","curvatura":"Hombre","material":"Tela","talla":"35","nombre":"Tienda Jaguey","color":"Rojo","sc_id":5,"curv_id":2,"mat_id":2,"tall_id":37,"loc_id":6,"col_id":18},{"id_existencia":93,"descripcion":"Cinto con evilla de plata","costo":"140","precio":"1220","comision":"20","merma_c":false,"total":1,"almacen":1,"area_de_venta":0,"id_producto":32,"sub_categoria":"Cinto","curvatura":"Mujer","material":"Tela","talla":"35","nombre":"Tienda Cardenaz","color":"Rojo","sc_id":2,"curv_id":1,"mat_id":2,"tall_id":37,"loc_id":7,"col_id":18},{"id_existencia":96,"descripcion":"Dige de sombrero de cobre","costo":"10","precio":"12","comision":"12","merma_c":false,"total":0,"almacen":0,"area_de_venta":0,"id_producto":46,"sub_categoria":"Colgante","curvatura":"Mujer","material":"Cuero","talla":"36","nombre":"Tienda Jaguey","color":"Negro","sc_id":8,"curv_id":1,"mat_id":1,"tall_id":38,"loc_id":6,"col_id":21},{"id_existencia":92,"descripcion":"Cartera con adornos en oro","costo":"12","precio":"120","comision":"12","merma_c":false,"total":100,"almacen":99,"area_de_venta":1,"id_producto":9,"sub_categoria":"Cartera","curvatura":"Hombre","material":"Cuero","talla":"3","nombre":"Tienda Cardenaz","color":"Negro","sc_id":1,"curv_id":2,"mat_id":1,"tall_id":42,"loc_id":7,"col_id":21}]);
  const [filtrosActivados, setFiltrosActivados] = useState(false);
  const [localFilter, setlocalFilter] = useState(-1);
  const [subcatFilter, setsubcatFilter] = useState(-1);
  const [curvaturaFilter, setcurvaturaFilter] = useState(-1);
  const [materialesFilter, setmaterialesFilter] = useState(-1);
  const [tallasFilter, settallasFilter] = useState(-1);
  const [coloresFilter, setcoloresFilter] = useState(-1);
  const [filtroGeneral, setFiltroGeneral] = useState("1");


  useEffect(() => {
    let exist = productos_existencia;
    if (localFilter !==-1) {
      exist = exist.filter((item) => {
        return item.loc_id === localFilter;
      });
    }
    if (subcatFilter !==-1) {
      exist = exist.filter((item) => {
        return item.sc_id === subcatFilter;
      });
    }
    if (materialesFilter !==-1) {
      exist = exist.filter((item) => {
        return item.mat_id === materialesFilter;
      });
    }
    if (tallasFilter !==-1) {
      exist = exist.filter((item) => {
        return item.tall_id === tallasFilter;
      });
    }
    if (curvaturaFilter !==-1) {
      exist = exist.filter((item) => {
        return item.curv_id === curvaturaFilter;
      });
    }
    if (coloresFilter !==-1) {
      exist = exist.filter((item) => {
        return item.col_id === coloresFilter;
      });
    }
    switch (filtroGeneral) {
      case "2":
        exist = exist.filter((item) => {
          return item.merma_c;
        });
        break;
        case "3":
          exist = exist.filter((item) => {
            return item.almacen>0 && item.area_de_venta===0;
          });
          break;
          case "4":
        exist = exist.filter((item) => {
          return item.total===0;
        });
        break;
      default:
        break;
    }
    setElementosFiltrados(exist);
    // console.log(localFilter,exist);
    checkFilters()
  }, [
    localFilter,filtroGeneral,
    subcatFilter,
    curvaturaFilter,
    materialesFilter,
    tallasFilter,
    coloresFilter,
  ]);


  var [counter, setCounter] = useState({"inx":"1","nr":"1","mc":"1"});
  var [countermc, setCounterm] = useState(0);
  var [counterinx, setCounteri] = useState(0);
  var [counternr, setCountern] = useState(0);
  useEffect(() => {
    setCounteri(counter.inx)
    setCounterm(counter.mc)
    setCountern(counter.nr)
  }, [counter]);
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
  function resetFilters() {
    setFiltroGeneral("1")
    setlocalFilter(-1)
    setsubcatFilter(-1)
    settallasFilter(-1)
    setcoloresFilter(-1)
    setcurvaturaFilter(-1)
    setmaterialesFilter(-1)
  }
  function checkFilters() {
    setFiltrosActivados(filtroGeneral !=="1" || localFilter !==-1 || subcatFilter !==-1 ||curvaturaFilter !==-1 ||materialesFilter !==-1 ||tallasFilter !==-1 ||coloresFilter !==-1 )
  }
  const [seleccionado, setSeleccionado] = useState("");
  const [productos_existencia, setProductosExistentes] = useState([{"id_existencia":95,"descripcion":"Pulsera de hilo","costo":"100","precio":"120","comision":"10","merma_c":true,"total":10,"almacen":8,"area_de_venta":2,"id_producto":45,"sub_categoria":"Pulsera","curvatura":"Niño","material":"Tela","talla":"34","nombre":"Tienda Jaguey","color":"Rojo","sc_id":7,"curv_id":3,"mat_id":2,"tall_id":36,"loc_id":6,"col_id":18},{"id_existencia":94,"descripcion":"Alpargatas","costo":"120","precio":"250","comision":"12","merma_c":false,"total":10,"almacen":8,"area_de_venta":2,"id_producto":44,"sub_categoria":"Mocasines","curvatura":"Hombre","material":"Tela","talla":"35","nombre":"Tienda Jaguey","color":"Rojo","sc_id":5,"curv_id":2,"mat_id":2,"tall_id":37,"loc_id":6,"col_id":18},{"id_existencia":93,"descripcion":"Cinto con evilla de plata","costo":"140","precio":"1220","comision":"20","merma_c":false,"total":1,"almacen":1,"area_de_venta":0,"id_producto":32,"sub_categoria":"Cinto","curvatura":"Mujer","material":"Tela","talla":"35","nombre":"Tienda Cardenaz","color":"Rojo","sc_id":2,"curv_id":1,"mat_id":2,"tall_id":37,"loc_id":7,"col_id":18},{"id_existencia":96,"descripcion":"Dige de sombrero de cobre","costo":"10","precio":"12","comision":"12","merma_c":false,"total":0,"almacen":0,"area_de_venta":0,"id_producto":46,"sub_categoria":"Colgante","curvatura":"Mujer","material":"Cuero","talla":"36","nombre":"Tienda Jaguey","color":"Negro","sc_id":8,"curv_id":1,"mat_id":1,"tall_id":38,"loc_id":6,"col_id":21},{"id_existencia":92,"descripcion":"Cartera con adornos en oro","costo":"12","precio":"120","comision":"12","merma_c":false,"total":100,"almacen":99,"area_de_venta":1,"id_producto":9,"sub_categoria":"Cartera","curvatura":"Hombre","material":"Cuero","talla":"3","nombre":"Tienda Cardenaz","color":"Negro","sc_id":1,"curv_id":2,"mat_id":1,"tall_id":42,"loc_id":7,"col_id":21}]);
  function Load() {
    axios
      .get(process.env.REACT_APP_SERVER + "view/existencia",  {headers:{
        "Bypass-Tunnel-Reminder":1
      }})
      .then((response) => {
        setProductosExistentes(
          orden
            ? response.data[0].sort((a, b) => a.area_de_venta - b.area_de_venta)
            : response.data[0].sort((a, b) => a.total - b.total)
        );
        setElementosFiltrados(response.data[0])
        setCounter(response.data[1][0])
        // console.log(response.data[1][0])
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
          elementosFiltrados.sort((a, b) => a.area_de_venta - b.area_de_venta)
        )
      : setProductosExistentes(
          elementosFiltrados.sort((a, b) => a.total - b.total)
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
      {productos_existencia.length>0?<div>
      {/* <Alerta2/> */}
      <h5>Artículos <Badge pill bg="warning" onClick={resetFilters}
            style={!filtrosActivados?{display:"none",cursor:"pointer"}:{cursor:"pointer"}}>Filtros Activados</Badge></h5>
      <div className="row">
<Accordion defaultActiveKey="1" flush className="col-12 text-center" style={{padding:"0px"}}>
      <Accordion.Item eventKey="0">
      <RadioButtons radios={[
      { name: 'Todos', value: '1',counter:productos_existencia.length},
      { name: 'MC', value: '2',counter:countermc },
      { name: 'NR', value: '3',counter:counternr},
      { name: 'INX', value: '4',counter:counterinx }
    ]} pvalue={filtroGeneral} onChange={setFiltroGeneral}/>
        <Accordion.Header style={{display: "inline-block"}}></Accordion.Header>
        <Accordion.Body style={{padding:"0px"}}>
      <div className="row" style={{margin:"5px"}}>
        <div className="col-6 col-sm-6 col-lg-4 col-xl-4 p-1">
    <SelectList ruta="local" elemento="nombre" cvalue="id" value={localFilter} nombre="Locales" onChange={setlocalFilter}/>
    </div>
    <div className="col-6 col-sm-6 col-lg-4 col-xl-4 p-1">
    <SelectList ruta="subcategoria" elemento="sub_categoria" cvalue="id" value={subcatFilter} nombre="Sub-Categorias" onChange={setsubcatFilter}/>
    </div>
    <div className="col-6 col-sm-6 col-lg-4 col-xl-4 p-1">
    <SelectList ruta="curvatura" elemento="curvatura" cvalue="id" value={curvaturaFilter} nombre="Curvaturas" onChange={setcurvaturaFilter}/>
    </div>
    <div className="col-6 col-sm-6 col-lg-4 col-xl-4 p-1">
    <SelectList ruta="material" elemento="material" cvalue="id" value={materialesFilter} nombre="Materiales" onChange={setmaterialesFilter}/>
    </div>
    <div className="col-6 col-sm-6 col-lg-4 col-xl-4 p-1">
    <SelectList ruta="talla" elemento="talla" cvalue="id" value={tallasFilter} nombre="Tallas"  tipo={"number"} onChange={settallasFilter}/>
    </div>
    <div className="col-6 col-sm-6 col-lg-4 col-xl-4 p-1">
    <SelectList ruta="color" elemento="color" cvalue="id" value={coloresFilter} nombre="Colores" onChange={setcoloresFilter}/>
    </div>
    </div>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
    </div>
      {/* <h1>{process.env.REACT_APP_SERVER}</h1> */}
      {elementosFiltrados.length>0?<div className="table-responsive" style={{ paddingBottom: "30px" }}>
        <div onClick={hide}>
          <Alerta2 ref={childCompRef} visible={alerta} />
        </div>
        <div id="ptable" >
        <Table striped bordered hover >
          <thead className="cf">
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
            {elementosFiltrados.map(function(producto) {
              
              return (

                <tr key={producto.id_existencia} style={{ marginTop:"5px"}}>

                 
                  <td style={{minWidth:"140px"}}
                    data-title="Artículo"
                  >
                    <b>
                      {producto.sub_categoria} de {producto.material}
                      <br />
                      {producto.curvatura === "Standar" ? "" : "para"}{" "}
                      {producto.curvatura} 
                    </b>
                    <br />
                    <b>Color:</b> {producto.color} <br/>
                    <MdWarning size={25}
                     style={
                      producto.total > 0
                        ? producto.area_de_venta === 0
                          ? { animation: "blinkingText3 2s infinite",color:"orange",marginTop: "-9px" }
                          : {minWidth:"140px",display:"none"}
                        : {
                          animation: "blinkingText3 2s infinite",color:"red",marginTop: "-9px"}
                    }/>
                  </td>
                  <td
style={{minWidth:"100px"}}
                    data-title="Detalles"
                  >
                    <b>Talla:</b> {producto.talla}
                    <br />
                    <b>Precio:</b> {producto.precio}
                    <br />
                    <b>Total:</b> {producto.total}
                  </td>
                  <td
                    data-title="Descripción"
                    style={{ minWidth:"150px"}}
                  >
                    {producto.descripcion}
                  </td>
                  <td
                    data-title="Existencias"
                    style={
                      producto.total > 0
                        ? producto.area_de_venta === 0
                          ? { animation: "blinkingText 2s infinite",minWidth:"140px" }
                          : { color: "black" ,minWidth:"140px"}
                        : {
                          animation: "blinkingText 2s infinite",minWidth:"140px"}
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
                  <td
                    data-title="Local"
                  >
                    {producto.nombre}
                  </td>
                  <td id="acciones" style={{padding:"0px" }}
                  >
                    <div className="text-center" >
                    {producto.total > 0 ? (
                      <>
                        <button
                              className="btn btn-sm "
                          onClick={() => Gestion(producto.id_existencia, 1)}
                        >
                          <MdOutlineAttachMoney size={18}/>
                          Vender
                        </button>
                        <button
                              className="btn btn-sm "
                          onClick={() => {
                            setSeleccionado(producto.id_existencia);
                            GestionMerma(
                              producto.id_existencia,
                              producto.total,
                              producto.almacen,
                              producto.area_de_venta,
                              producto.merma_c,
                              producto.costo,
                              producto.precio
                            );
                          }}
                          
                        ><MdOutlineProductionQuantityLimits  size={18}/>
                        Mermar
                        </button>
                        
                      </>
                    ) : (
                      ""
                    )}
                    <>
                    <button
                              className="btn btn-sm "

                      onClick={() => {
                        setSeleccionado(producto.id_existencia);
                        Gestion(producto.id_existencia, 3);
                      }}
                    >
                                               <MdEdit size={18}/>
Editar
                    </button>
                    <button 
                              className="btn btn-sm "
                              onClick={() => Gestion(producto.id_existencia, 5)}><MdWarning size={18} />
                      Borrar
                    </button>
                    </>
                    </div>
                  </td>
                </tr>
              );
            })}
            
          </tbody>
        </Table>
        </div>
        
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
      </div>:<h1 style={{textAlign: "center",
color: "#2c6975",
textShadow: "1px 1px 3px rgb(34, 80, 89)"}}>No existen productos con estas características</h1>}
    
    
    </div>:<h1 style={{textAlign: "center",
color: "#2c6975",
textShadow: "1px 1px 3px rgb(34, 80, 89)"}}>No existen productos registrados por el momento</h1>}
    </div>
  );
}
export default Existencia;
