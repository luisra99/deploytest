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
    if (coloresFilter !== -1) {
      exist = exist.filter((item) => {
        return item.id_color === coloresFilter;
      });
    }
    setElementosFiltrados(exist);
    // console.log(localFilter,exist);
    checkFilters();
  }, [
    localFilter,
    subcatFilter,
    curvaturaFilter,
    materialesFilter,
    tallasFilter,
    coloresFilter,
  ]);
  return (<>
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
                    <div className="col-6 col-sm-6 col-lg-4 col-xl-4 p-1">
                      <SelectList
                        ruta="local"
                        elemento="nombre"
                        cvalue="id"
                        value={localFilter}
                        nombre="un local"
                        handleChange={setlocalFilter}
                      />
                    </div>
                    <div className="col-6 col-sm-6 col-lg-4 col-xl-4 p-1">
                      <SelectList
                        ruta="subcategoria"
                        elemento="sub_categoria"
                        cvalue="id"
                        value={subcatFilter}
                        nombre="una sub-categorias"
                        handleChange={setsubcatFilter}
                      />
                    </div>
                    <div className="col-6 col-sm-6 col-lg-4 col-xl-4 p-1">
                      <SelectList
                        ruta="curvatura"
                        elemento="curvatura"
                        cvalue="id"
                        value={curvaturaFilter}
                        nombre="una curvaturas"
                        handleChange={setcurvaturaFilter}
                      />
                    </div>
                    <div className="col-6 col-sm-6 col-lg-4 col-xl-4 p-1">
                      <SelectList
                        ruta="material"
                        elemento="material"
                        cvalue="id"
                        value={materialesFilter}
                        nombre="un material"
                        handleChange={setmaterialesFilter}
                      />
                    </div>
                    <div className="col-6 col-sm-6 col-lg-4 col-xl-4 p-1">
                      <SelectList
                        ruta="talla"
                        elemento="talla"
                        cvalue="id"
                        value={tallasFilter}
                        nombre="una talla"
                        tipo={"number"}
                        handleChange={settallasFilter}
                      />
                    </div>
                    <div className="col-6 col-sm-6 col-lg-4 col-xl-4 p-1">
                      <SelectList
                        ruta="color"
                        elemento="color"
                        cvalue="id"
                        value={coloresFilter}
                        nombre="un color"
                        handleChange={setcoloresFilter}
                      />
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
<div  id="ptable">
      <Table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Detalles</th>
            <th></th>
            <th>Local</th>
          </tr>
        </thead>
        <tbody>
          {elementosFiltrados.map((vale) => {
            return (
              <tr key={vale.id} id={vale.id}>
                <td data-title="Producto">
                  <b>
                    {vale.sub_categoria} de {vale.material}
                    <br />
                    {vale.curvatura === "Standar" ? "" : "para"}{" "}
                    {vale.curvatura}
                  </b>
                  <br />
                  <b>Color:</b> {vale.color}
                </td>
                <td data-title="Descripción">{vale.descripcion}</td>
                <td data-title="Detalles">
                  <b>Costo:</b> {vale.costo} <br />
                  <b>Precio:</b> {vale.precio}
                  <br />
                  <b>Comisión:</b> {vale.comision}
                </td>
                <td>
                  <b>Importe:</b> {vale.importe}
                  <br />
                  <b>Ganancia:</b> {vale.ganancia}
                  <br />
                  <b>Ganancia Pura:</b> {vale.ganancia_pura}
                </td>
                <td data-title="Local">
                  <b>{vale.tienda}</b>
                  <br />
                  <b>Empleado:</b>
                  <br />
                  {vale.nombre} {vale.primer_apellido} {vale.segundo_apellido}
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
