import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import HomeCard from "../components/homeCard.js";
import HomeCardBody from "../components/homeCardBody.js";

function Home() {
  const [resume, setResume] = useState({"importe":"24","comision":"24","gastos":"9","importew":"24","comisionw":"24","gastosw":"9","l":null,"cl":null,"m":null,"cm":null,"w":null,"cw":null,"j":null,"cj":null,"v":null,"cv":null,"s":null,"cs":null,"d":"24","cd":"24","importey":"586","comisiony":"68","gastosy":"34","ctimporte":"110","ctcomision":"10","stimporte":null,"stcomision":null,"ttimporte":"476","ttcomision":"58","ptimporte":null,"ptcomision":null,"importem":"36","comisionm":"36","gastosm":"34"});
  function Load() {
    axios
      .get(process.env.REACT_APP_SERVER + "view/resumen/general", {
        headers: {
          "Bypass-Tunnel-Reminder": 1,
        },
      })
      .then((response) => {
        setResume(response.data);
      });
  }
  useEffect(() => {
    Load();
  }, []);

  return (
    
    <div style={{color:"whitesmoke",textShadow: "rgb(0, 0, 0) 1px 1px 4px"}}>
       <HomeCard header="Hoy">
        <HomeCardBody type='primary' title='Ingreso' value={resume.importe}/>
        <HomeCardBody type='primary' title='Comisión' value={resume.comision}/>
        <HomeCardBody type='primary' title='Gastos' value={resume.gastos}/>
        </HomeCard>
       <HomeCard header="Esta semana">
        <HomeCardBody type='primary' title='Ingreso' value={resume.importew}/>
        <HomeCardBody type='primary' title='Comisión' value={resume.comisionw}/>
        <HomeCardBody type='primary' title='Gastos' value={resume.gastosw}/>
        <HomeCard header="Detalles">
        <HomeCardBody title='Lunes' value={resume.l}/>
        <HomeCardBody title='Martes' value={resume.m}/>
        <HomeCardBody title='Miércoles' value={resume.w}/>
        <HomeCardBody title='Jueves' value={resume.j}/>
        <HomeCardBody title='Viernes' value={resume.v}/>
        <HomeCardBody title='Sábado' value={resume.s}/>
        <HomeCardBody title='Domingo' value={resume.d}/>
        </HomeCard>
        </HomeCard>
        <HomeCard header="Este Mes">
        <HomeCardBody type='primary' title='Ingreso' value={resume.importem}/>
        <HomeCardBody type='primary' title='Comisión' value={resume.comisionm}/>
        <HomeCardBody type='primary' title='Gastos' value={resume.gastosm}/>
        </HomeCard>
        <HomeCard header="Esta año">
        <HomeCardBody type='primary' title='Ingreso' value={resume.importey}/>
        <HomeCardBody type='primary' title='Comisión' value={resume.comisiony}/>
        <HomeCardBody type='primary' title='Gastos' value={resume.gastosy}/>
        <HomeCard header="Trimestres">
        <HomeCardBody title='Primero' value={resume.ptimporte}/>
        <HomeCardBody title='Segundo' value={resume.stimporte}/>
        <HomeCardBody title='Tercero' value={resume.ttimporte}/>
        <HomeCardBody title='Cuarto' value={resume.ctimporte}/>
        </HomeCard>
        </HomeCard>
      {/*<HomeCard header="Esta Semana" titles={[{h:"Ingreso",v:{importew}},{h:"Comision",v:{comisionw}},{h:"Gastos",v:{gastosw}}]} stitles={[{h:"Lunes",v:{l}},{h:"Martes",v:{m}},{h:"Miercoles",v:{w}},{h:"Jueves",v:{j}},{h:"Viernes",v:{v}},{h:"Sabado",v:{s}},{h:"Domingo",v:{d}}]}/>
      <HomeCard header="Este Año" sheader="Trimestres" titles={[{h:"Ingreso",v:{importey}},{h:"Comision",v:{comisiony}},{h:"Gastos",v:{gastosy}}]} stitles={[{h:"Primero",v:{ptimporte}},{h:"Segundo",v:{stimporte}},{h:"Tercero",v:{ttimporte}},{h:"Cuarto",v:{ctimporte}}]}/> */}
    </div>
      
  );
}
//#endregion
export default Home;
