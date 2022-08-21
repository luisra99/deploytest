import React from "react";
import  RadioButtons  from "../components/radioButtons.js";
function Existencia() {
  return (<div>

    <RadioButtons radios={[
      { name: 'Todo', value: '1',counter:"0" },
      { name: 'MC', value: '2',counter:"4" },
      { name: 'NR', value: '3',counter:"2" },
      { name: 'INX', value: '4',counter:"9" }
    ]}></RadioButtons>
  </div>
    );
}
export default Existencia;
