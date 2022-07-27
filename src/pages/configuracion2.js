import React from "react";
import Configuration from "./configuracion";
import SubCatConfig from "./subcatConfig.js";
function Configuracion2() {
  return (
    <div className="row">
      <Configuration
        ruta={"curvatura"}
        elemento={"curvatura"}
        nombre={"Curvatura"}
      />
      <Configuration
        ruta={"material"}
        elemento={"material"}
        nombre={"Materiales"}
      />
      <Configuration ruta={"talla"} elemento={"talla"} nombre={"Tallas"} />
      <Configuration ruta={"color"} elemento={"color"} nombre={"Colores"} />
      <Configuration
        ruta={"tipogasto"}
        elemento={"tipo_gasto"}
        nombre={"Tipo de gasto"}
      />
      <Configuration
        ruta={"categoria"}
        elemento={"categoria"}
        nombre={"Categorías"}
      />
      <SubCatConfig
        ruta={"subcategoria"}
        elemento={"sub_categoria"}
        nombre={"Sub-Categorías"}
      />
    </div>
  );
}
export default Configuracion2;
