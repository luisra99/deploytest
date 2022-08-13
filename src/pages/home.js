import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./card.js";
function Home() {
  const [resumen, setResumen] = useState({"comision_actual":"45","comision_estimada":"338","ganancia_actual":"475","ganancia_estimada":"6492","ingreso_actual":"520","ingreso_estimado":"6830","iday":"400","pdia":"130","cdia":"0","imes":"520","pmes":"520","cmes":"45","isemana":"440","psemana":"260","csemana":"15","gasto_dia":null,"gasto_semana":"223","gasto_mes":"235","gasto_year":"356"});
  function Load() {
    axios
      .get(process.env.REACT_APP_SERVER + "view/resumen/general", {
        headers: {
          "Bypass-Tunnel-Reminder": 1,
        },
      })
      .then((response) => {
        console.log(response.data);
        setResumen(response.data);
      });
  }
  useEffect(() => {
    Load();
  }, []);
  return (
    <div className="text-center">
      <div className="card-container row justify-content-around">
        <h2 className="text-sm mb-0 text font-weight-bold">
          <b>Hoy</b>
        </h2>
        <Card
          titulo="Ingreso"
          valor={resumen.iday}
          etitulo="Ingreso promedio"
          evalor={resumen.pdia}
        />
        <Card
          titulo="Comisiones"
          valor={resumen.cdia}
          etitulo="Ganancia"
          evalor={resumen.iday - resumen.cdia}
        />
        <Card
          titulo="Gastos"
          valor={resumen.gasto_dia}
          etitulo="Capital restante"
          evalor={resumen.iday - resumen.cdia - resumen.gasto_dia}
        />
      </div>
      <div className="card-container row justify-content-around">
        <h2 className="text-sm mb-0 text font-weight-bold">
          <b>Esta semana</b>
        </h2>
        <Card
          titulo="Ingreso"
          valor={resumen.iday}
          etitulo="Ingreso promedio"
          evalor={resumen.pdia}
        />
        <Card
          titulo="Comisiones"
          valor={resumen.cdia}
          etitulo="Ganancia"
          evalor={resumen.iday - resumen.cdia}
        />
        <Card
          titulo="Gastos"
          valor={resumen.gasto_dia}
          etitulo="Capital restante"
          evalor={resumen.iday - resumen.cdia - resumen.gasto_dia}
        />
      </div>
      <div className="card-container row justify-content-around">
        <h2 className="text-sm mb-0 text font-weight-bold">
          <b>Este Mes</b>
        </h2>
        <Card
          titulo="Ingreso"
          valor={resumen.iday}
          etitulo="Ingreso promedio"
          evalor={resumen.pdia}
        />
        <Card
          titulo="Comisiones"
          valor={resumen.cdia}
          etitulo="Ganancia"
          evalor={resumen.iday - resumen.cdia}
        />
        <Card
          titulo="Gastos"
          valor={resumen.gasto_dia}
          etitulo="Capital restante"
          evalor={resumen.iday - resumen.cdia - resumen.gasto_dia}
        />
      </div>
      <div className="card-container row justify-content-around">
        <h2 className="text-sm mb-0 text font-weight-bold">
          <b>Este Año</b>
        </h2>
        <Card
          titulo="Ingreso"
          valor={resumen.iday}
          etitulo="Ingreso promedio"
          evalor={resumen.pdia}
        />
        <Card
          titulo="Comisiones"
          valor={resumen.cdia}
          etitulo="Ganancia"
          evalor={resumen.iday - resumen.cdia}
        />
        <Card
          titulo="Gastos"
          valor={resumen.gasto_dia}
          etitulo="Capital restante"
          evalor={resumen.iday - resumen.cdia - resumen.gasto_dia}
        />
      </div>
    </div>
  );
}
//#endregion
export default Home;
