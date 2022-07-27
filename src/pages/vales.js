import React from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";

function Vales() {
  const [vales_de_venta, setValesDeVenta] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER + "view/vales").then((response) => {
      setValesDeVenta(response.data);
    });
  }, []);

  return (
    <div className="table-responsive">
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
          {vales_de_venta.map((vale) => {
            return (
              <tr key={vale.id} id={vale.id}>
                <td>
                  <b>
                    {vale.sub_categoria} de {vale.material}
                    <br />
                    {vale.curvatura === "Standar" ? "" : "para"}{" "}
                    {vale.curvatura}
                  </b>
                  <br />
                  <b>Color:</b> {vale.color}
                </td>
                <td>{vale.descripcion}</td>
                <td>
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
                <td>
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
  );
}
export default Vales;
