import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./card.js";
function Home() {
  const [resumen, setResumen] = useState({"ier":"6830","ia":"520","ger":"6492","ga":"475","ceap":"338","ca":"45","impd":"40","pimpd":"130","impw":"440","pimpw":"260","impm":"520","pimpm":"520","gastos":null});
  function Load() {
    axios
      .get(process.env.REACT_APP_SERVER + "view/resumen/general", {
        headers: {
          "Bypass-Tunnel-Reminder": 1,
        },
      })
      .then((response) => {
        setResumen(response.data);
      });
  }
  useEffect(() => {
    Load()
  }, []);
  return (
    <div className="text-center">
      <div className="row justify-content-center">
        <Card
          titulo="Ingreso Actual"
          valor={resumen.ia}
          etitulo="Ingreso Restante Estimado"
          evalor={resumen.ier}
        />
        <Card
          titulo="Ingreso de hoy"
          valor={resumen.impd}
          etitulo="Ingreso promedio"
          evalor={resumen.pimpd}
        />
        <Card
          titulo="Esta semana"
          valor={resumen.impw}
          etitulo="Ingreso promedio"
          evalor={resumen.pimpw}
        />
        <Card
          titulo="Este mes"
          valor={resumen.impm}
          etitulo="Ingreso promedio"
          evalor={resumen.pimpm}
        />
        <Card
          titulo="Comisiones"
          valor={resumen.ca}
          etitulo="Comisiones estimadas"
          evalor={resumen.ceap}
        />
        <Card
          titulo="Ganancia"
          valor={resumen.ga}
          etitulo="Ganancia Estimada"
          evalor={resumen.ger}
        />
        <Card
          titulo="Gastos"
          valor={resumen.gastos}
          etitulo="Dinero Libre"
          evalor={(resumen.ia-resumen.gastos)}
        />
        {/* <Card
          titulo="Productos"
          valor="$53,000"
          etitulo="Existencias Totales"
          evalor="$53,000"
        /> */}
      </div>
    </div>
  );
}
//#endregion
export default Home;
