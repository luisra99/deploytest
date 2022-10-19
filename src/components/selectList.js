import React from "react";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function SelectList(props, { handleChange }) {
  const { ruta, elemento, cvalue, value, nombre, tipo,fref,name} = props;
  const [elementos, setElementos] = useState([]);
  function Load() {
    switch (ruta) {
      case "local":
        setElementos([{"id":7,"direccion":"Matanzas, Cardenaz, Real y linea","nombre":"Tienda Cardenaz","trabajadores":0,"tipo":0,"createdAt":"2022-08-01T07:03:47.873Z","updatedAt":"2022-08-01T07:03:47.873Z"},{"id":6,"direccion":"Matanzas, Jaguey, calle 36","nombre":"Tienda Jaguey","trabajadores":0,"tipo":0,"createdAt":"2022-07-31T08:24:39.998Z","updatedAt":"2022-08-01T07:03:56.730Z"},{"id":8,"direccion":"matanzas, jovellanos, calle 54 entre 3 y 5","nombre":"papatos mios","trabajadores":0,"tipo":0,"createdAt":"2022-08-04T09:33:36.923Z","updatedAt":"2022-08-04T09:33:36.923Z"}]);
        break;
      case "subcategoria":
        setElementos([{"id":1,"sub_categoria":"Cartera","createdAt":"2022-06-26T07:18:39.781Z","updatedAt":"2022-06-26T07:18:39.781Z","id_categoria":1},{"id":2,"sub_categoria":"Cinto","createdAt":"2022-06-26T07:19:26.762Z","updatedAt":"2022-06-26T07:19:26.762Z","id_categoria":1},{"id":3,"sub_categoria":"Riñonera","createdAt":"2022-06-26T07:19:50.810Z","updatedAt":"2022-06-26T07:19:50.810Z","id_categoria":1},{"id":4,"sub_categoria":"Zandalia","createdAt":"2022-06-26T07:20:24.830Z","updatedAt":"2022-06-26T07:20:24.830Z","id_categoria":2},{"id":5,"sub_categoria":"Mocasines","createdAt":"2022-06-26T07:20:44.805Z","updatedAt":"2022-06-26T07:20:44.805Z","id_categoria":2},{"id":7,"sub_categoria":"Pulsera","createdAt":"2022-06-26T07:22:03.871Z","updatedAt":"2022-06-26T07:22:03.871Z","id_categoria":3},{"id":8,"sub_categoria":"Colgante","createdAt":"2022-06-26T07:22:27.621Z","updatedAt":"2022-06-26T07:22:27.621Z","id_categoria":3},{"id":9,"sub_categoria":"Muñequera","createdAt":"2022-06-26T07:22:59.501Z","updatedAt":"2022-06-26T07:22:59.501Z","id_categoria":3},{"id":10,"sub_categoria":"As","createdAt":"2022-07-24T05:39:41.419Z","updatedAt":"2022-07-24T05:39:41.419Z","id_categoria":null},{"id":6,"sub_categoria":"Botas","createdAt":"2022-06-26T07:20:52.629Z","updatedAt":"2022-07-26T21:33:50.728Z","id_categoria":2},{"id":25,"sub_categoria":"Pandora","createdAt":"2022-07-27T06:29:31.584Z","updatedAt":"2022-07-27T06:29:31.584Z","id_categoria":7},{"id":28,"sub_categoria":"Laptop","createdAt":"2022-07-31T08:14:05.242Z","updatedAt":"2022-07-31T08:14:05.242Z","id_categoria":9}]);
        break;
      case "curvatura":
        setElementos([{"id":1,"curvatura":"Mujer","createdAt":"2022-06-26T07:25:32.855Z","updatedAt":"2022-06-26T07:25:32.855Z"},{"id":2,"curvatura":"Hombre","createdAt":"2022-06-26T07:25:54.805Z","updatedAt":"2022-06-26T07:25:54.805Z"},{"id":3,"curvatura":"Niño","createdAt":"2022-06-26T07:26:00.690Z","updatedAt":"2022-06-26T07:26:00.690Z"}]);
        break;
      case "material":
        setElementos([{"id":2,"material":"Tela","createdAt":"2022-06-26T07:29:16.609Z","updatedAt":"2022-06-26T07:29:16.609Z"},{"id":3,"material":"Algodón","createdAt":"2022-06-26T07:29:48.557Z","updatedAt":"2022-06-26T07:29:48.557Z"},{"id":1,"material":"Cuero","createdAt":"2022-06-26T07:29:10.512Z","updatedAt":"2022-07-26T17:26:54.885Z"}]);
        break;
      case "talla":
        setElementos([{"id":36,"talla":"34","createdAt":"2022-07-31T08:15:29.835Z","updatedAt":"2022-07-31T08:15:29.835Z"},{"id":37,"talla":"35","createdAt":"2022-07-31T08:15:33.975Z","updatedAt":"2022-07-31T08:15:33.975Z"},{"id":38,"talla":"36","createdAt":"2022-07-31T08:15:37.798Z","updatedAt":"2022-07-31T08:15:37.798Z"},{"id":40,"talla":"41","createdAt":"2022-07-31T08:15:56.826Z","updatedAt":"2022-07-31T08:16:31.939Z"},{"id":41,"talla":"2","createdAt":"2022-08-14T09:59:28.198Z","updatedAt":"2022-08-14T09:59:28.198Z"},{"id":42,"talla":"3","createdAt":"2022-08-14T09:59:30.605Z","updatedAt":"2022-08-14T09:59:30.605Z"},{"id":43,"talla":"4","createdAt":"2022-08-14T09:59:33.457Z","updatedAt":"2022-08-14T09:59:33.457Z"}]);
        break;
      case "color":
        setElementos([{"id":18,"color":"Rojo","createdAt":"2022-07-31T08:16:50.034Z","updatedAt":"2022-07-31T08:16:50.034Z"},{"id":20,"color":"Blanco","createdAt":"2022-07-31T08:17:25.250Z","updatedAt":"2022-07-31T08:17:25.250Z"},{"id":21,"color":"Negro","createdAt":"2022-07-31T08:17:29.594Z","updatedAt":"2022-07-31T08:17:29.594Z"},{"id":22,"color":"Naranja","createdAt":"2022-07-31T08:17:38.420Z","updatedAt":"2022-07-31T08:17:38.420Z"}]);
        break;

      default:
        break;
    }
    axios
      .get(process.env.REACT_APP_SERVER + "" + ruta, {
        headers: {
          "Bypass-Tunnel-Reminder": 1,
        },
      })
      .then((response) => {
        tipo === "number"
          ? setElementos(
              response.data.sort(
                (a, b) => parseInt(a[elemento]) > parseInt(b[elemento])
              )
            )
          : setElementos(
              response.data.sort((a, b) => a[elemento] > b[elemento])
            );
      });
  }

  useEffect(() => {
    Load();
  }, []);

  return (
    <Form.Select
    className="form-control"
      name={elemento}
      onChange={(e) => {
        if(value!==undefined)
        props.handleChange(parseInt(e.target.value));
        else{
        props.handleChange(fref,parseInt(e.target.value))}
      }}
      value={value}
    >
      <option key={-1} value={-1}>
        {nombre}
      </option>
      {elementos.map((item) => {
        return (
          <option key={item.id} value={item[cvalue]}>
            {item[elemento]}
          </option>
        );
      })}
    </Form.Select>
  );
}

export default SelectList;
