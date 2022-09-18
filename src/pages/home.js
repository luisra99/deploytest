import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import HomeCard from "../components/homeCard.js";
import HomeCardBody from "../components/homeCardBody.js";

function Home() {
  const [resumen, setResumen] = useState({"importe":"24","comision":"24","gastos":"9","importew":"24","comisionw":"24","gastosw":"9","l":null,"cl":null,"m":null,"cm":null,"w":null,"cw":null,"j":null,"cj":null,"v":null,"cv":null,"s":null,"cs":null,"d":"24","cd":"24","importey":"586","comisiony":"68","gastosy":"34","ctimporte":"110","ctcomision":"10","stimporte":null,"stcomision":null,"ttimporte":"476","ttcomision":"58","ptimporte":null,"ptcomision":null,"importem":"36","comisionm":"36","gastosm":"34"});
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
    Load();
  }, []);

  return (
    
    <div style={{color:"whitesmoke",textShadow: "rgb(0, 0, 0) 1px 1px 4px"}}>
       <HomeCard header="Hoy">
        <HomeCardBody type='primary' title='Ingreso' value={resumen.importe}/>
        <HomeCardBody type='primary' title='Comisión' value={resumen.comision}/>
        <HomeCardBody type='primary' title='Gastos' value={resumen.gastos}/>
        </HomeCard>
       <HomeCard header="Esta semana">
        <HomeCardBody type='primary' title='Ingreso' value={resumen.importew}/>
        <HomeCardBody type='primary' title='Comisión' value={resumen.comisionw}/>
        <HomeCardBody type='primary' title='Gastos' value={resumen.gastosw}/>
        <HomeCard header="Detalles">
        <HomeCardBody title='Lunes' value={resumen.l}/>
        <HomeCardBody title='Martes' value={resumen.m}/>
        <HomeCardBody title='Miércoles' value={resumen.w}/>
        <HomeCardBody title='Jueves' value={resumen.j}/>
        <HomeCardBody title='Viernes' value={resumen.v}/>
        <HomeCardBody title='Sábado' value={resumen.s}/>
        <HomeCardBody title='Domingo' value={resumen.d}/>
        </HomeCard>
        </HomeCard>
        <HomeCard header="Este Mes">
        <HomeCardBody type='primary' title='Ingreso' value={resumen.importem}/>
        <HomeCardBody type='primary' title='Comisión' value={resumen.comisionm}/>
        <HomeCardBody type='primary' title='Gastos' value={resumen.gastosm}/>
        </HomeCard>
        <HomeCard header="Esta año">
        <HomeCardBody type='primary' title='Ingreso' value={resumen.importey}/>
        <HomeCardBody type='primary' title='Comisión' value={resumen.comisiony}/>
        <HomeCardBody type='primary' title='Gastos' value={resumen.gastosy}/>
        <HomeCard header="Trimestres">
        <HomeCardBody title='Primero' value={resumen.ptimporte}/>
        <HomeCardBody title='Segundo' value={resumen.stimporte}/>
        <HomeCardBody title='Tercero' value={resumen.ttimporte}/>
        <HomeCardBody title='Cuarto' value={resumen.ctimporte}/>
        </HomeCard>
        </HomeCard>
      {/*<HomeCard header="Esta Semana" titles={[{h:"Ingreso",v:{importew}},{h:"Comision",v:{comisionw}},{h:"Gastos",v:{gastosw}}]} stitles={[{h:"Lunes",v:{l}},{h:"Martes",v:{m}},{h:"Miercoles",v:{w}},{h:"Jueves",v:{j}},{h:"Viernes",v:{v}},{h:"Sabado",v:{s}},{h:"Domingo",v:{d}}]}/>
      <HomeCard header="Este Año" sheader="Trimestres" titles={[{h:"Ingreso",v:{importey}},{h:"Comision",v:{comisiony}},{h:"Gastos",v:{gastosy}}]} stitles={[{h:"Primero",v:{ptimporte}},{h:"Segundo",v:{stimporte}},{h:"Tercero",v:{ttimporte}},{h:"Cuarto",v:{ctimporte}}]}/> */}
    </div>
      
  );
}
//#endregion
export default Home;
