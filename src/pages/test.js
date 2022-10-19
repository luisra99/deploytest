import React from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import RadioButtons from "../components/radioButtons.js";
import SelectList from "../components/selectList.js";
import Accordion from "react-bootstrap/Accordion";

function Vales() {
  const [vales_de_venta, setValesDeVenta] = useState([{"id":151,"sub_categoria":"Cartera","curvatura":"Niño","material":"Tela","color":"Verde","descripcion":"Cartera chica con imagen de Ben10","fecha":"2022-02-02T08:00:00.000Z","costo":"50","precio":"100","comision":"10","unidades":1,"importe":"100","utilidades":"10","ganancia":"90","ganancia_pura":"40","nombre":"Luis Raul","primer_apellido":"Alfonso","segundo_apellido":"Caballero","tienda":"Tienda Jaguey"}]);
  const [filtrosActivados, setFiltrosActivados] = useState(false);
  const [localFilter, setlocalFilter] = useState(-1);
  const [subcatFilter, setsubcatFilter] = useState(-1);
  const [curvaturaFilter, setcurvaturaFilter] = useState(-1);
  const [materialesFilter, setmaterialesFilter] = useState(-1);
  const [tallasFilter, settallasFilter] = useState(-1);
  const [coloresFilter, setcoloresFilter] = useState(-1);
  const [fechaFilter, setfechaFilter] = useState("");
  const [fechaFilterTwo, setfechaFilterTwo] = useState("");
  const [elementosFiltrados, setElementosFiltrados] = useState([])
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER + "view/vales").then((response) => {
      setValesDeVenta(response.data);
      setElementosFiltrados(response.data)
    });
  }, []);
  function checkFilters() {
    setFiltrosActivados(
        localFilter !== -1 ||
        subcatFilter !== -1 ||
        curvaturaFilter !== -1 ||
        materialesFilter !== -1 ||
        tallasFilter !== -1 ||
        coloresFilter !== -1
    );
  }
  useEffect(() => {
    let exist = vales_de_venta;
    if (localFilter !== -1) {
      exist = exist.filter((item) => {
        return item.id_local === localFilter;
      });
    }
    if (subcatFilter !== -1) {
      exist = exist.filter((item) => {
        return item.id_subcategoria === subcatFilter;
      });
    }
    if (materialesFilter !== -1) {
      exist = exist.filter((item) => {
        return item.id_material === materialesFilter;
      });
    }
    if (tallasFilter !== -1) {
      exist = exist.filter((item) => {
        return item.id_talla === tallasFilter;
      });
    }
    if (curvaturaFilter !== -1) {
      exist = exist.filter((item) => {
        return item.id_curvatura === curvaturaFilter;
      });
    }
    if (fechaFilterTwo !== "") exist = exist.filter((item) => {
      return fechaFilter<fechaFilterTwo ? item.fecha>= fechaFilter && item.fecha<=fechaFilterTwo : item.fecha<= fechaFilter && item.fecha>=fechaFilterTwo;
    }); else {
      if (fechaFilter !== "") {
        exist = exist.filter((item) => {
          return item.fecha=== fechaFilter;
        });
      }
    }
    if (coloresFilter !== -1) {
      exist = exist.filter((item) => {
        return item.id_color === coloresFilter;
      });
    }
    setElementosFiltrados(exist);
    checkFilters();
  }, [
    localFilter,
    subcatFilter,
    curvaturaFilter,
    materialesFilter,
    tallasFilter,
    coloresFilter,
    fechaFilter,
    fechaFilterTwo
  ]);
  return (
    <>
      <div className="row">
        <Accordion
          defaultActiveKey="1"
          flush
          className="col-12 text-center"
          style={{ padding: "0px" }}
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header
              style={{ display: "inline-block" }}
            ></Accordion.Header>
            <Accordion.Body style={{ padding: "0px" }}>
              <div className="row" style={{ margin: "5px" }}>
                <div className="col-6 col-sm-4 col-lg-4 col-xl-4 p-1">
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setfechaFilter(e.target.value);
                    }}
                  />
                </div>
                <div className="col-6 col-sm-4 col-lg-4 col-xl-4 p-1">
                  <input
                    type="date"
                    className="form-control"
                    disabled={fechaFilter === ""}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setfechaFilterTwo(e.target.value);
                    }}
                  />
                </div>
                <div className="col-6 col-sm-4 col-lg-4 col-xl-4 p-1">
                  <SelectList
                    ruta="color"
                    elemento="color"
                    cvalue="id"
                    value={coloresFilter}
                    nombre="Colores"
                    handleChange={setcoloresFilter}
                  />
                </div>
                <div className="col-6 col-sm-6 col-lg-4 col-xl-4 p-1">
                  <SelectList
                    ruta="local"
                    elemento="nombre"
                    cvalue="id"
                    value={localFilter}
                    nombre="Locales"
                    handleChange={setlocalFilter}
                  />
                </div>
                <div className="col-6 col-sm-6 col-lg-4 col-xl-4 p-1">
                  <SelectList
                    ruta="subcategoria"
                    elemento="sub_categoria"
                    cvalue="id"
                    value={subcatFilter}
                    nombre="Sub-Categorias"
                    handleChange={setsubcatFilter}
                  />
                </div>
                <div className="col-6 col-sm-6 col-lg-4 col-xl-4 p-1">
                  <SelectList
                    ruta="curvatura"
                    elemento="curvatura"
                    cvalue="id"
                    value={curvaturaFilter}
                    nombre="Curvaturas"
                    handleChange={setcurvaturaFilter}
                  />
                </div>
                <div className="col-6 col-sm-6 col-lg-4 col-xl-4 p-1">
                  <SelectList
                    ruta="material"
                    elemento="material"
                    cvalue="id"
                    value={materialesFilter}
                    nombre="Materiales"
                    handleChange={setmaterialesFilter}
                  />
                </div>
                
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div id="ptable">
        <Table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Vale de venta</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {elementosFiltrados.map((vale) => {
              return (
                <tr key={vale.id} id={vale.id}>
                  <td data-title="Vale de venta">
                    <b>Fecha: </b>
                    {vale.fecha}
                    <br />
                    <b>Hora: </b> {vale.hora}
                    <br />
                    <b>Importe: </b>${vale.precio}
                    <br />
                    <b>Comisión: </b>${vale.comision}
                    <br />
                    <b>Margen: </b>${vale.precio - vale.comision}
                    <br />
                  </td>
                  <td data-title="Detalles">
                    <b>Empleado: </b>
                    {vale.nombre} {vale.primer_apellido} {vale.segundo_apellido}
                    <br />
                    <b>Local: </b>
                    {vale.tienda} <br />
                    <b>Artículo: </b> {vale.sub_categoria} de {vale.material}{" "}
                    {vale.curvatura === "Standar" ? "" : "para"}{" "}
                    {vale.curvatura} ({vale.color})
                    <br />
                    <i>{vale.descripcion}</i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}
export default Vales;
