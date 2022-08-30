import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
function Configuration(props) {
  const { ruta, elemento } = props;
  const [modoEdicion, setmodoEdicion] = useState(false);
  const [id, setId] = useState("");

  const Editar = (id) => {
    setmodoEdicion(true);
    setId(id);
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setElementoEdit(value);
  };
   const [elementos, setElementos] = useState([{"id":1,"categoria":"Talabartería","createdAt":"2022-06-26T07:15:13.627Z","updatedAt":"2022-06-26T07:15:13.627Z"},{"id":2,"categoria":"Calzado","createdAt":"2022-06-26T07:15:20.452Z","updatedAt":"2022-06-26T07:15:20.452Z"},{"id":3,"categoria":"Accesorios","createdAt":"2022-06-26T07:16:09.264Z","updatedAt":"2022-06-26T07:16:09.264Z"},{"id":7,"categoria":"Joyeria","createdAt":"2022-07-26T21:26:08.442Z","updatedAt":"2022-07-26T21:27:16.541Z"}]);

  function Load() {
    axios.get(process.env.REACT_APP_SERVER + "" + ruta,  {headers:{
      "Bypass-Tunnel-Reminder":1
    }}).then((response) => {
      setElementos(response.data);
      setElementosFiltrados(response.data);
    });
  }

  useEffect(() => {
    Load();
  },[]);

  const [elementosFiltrados, setElementosFiltrados] = useState([{"id":1,"categoria":"Talabartería","createdAt":"2022-06-26T07:15:13.627Z","updatedAt":"2022-06-26T07:15:13.627Z"},{"id":2,"categoria":"Calzado","createdAt":"2022-06-26T07:15:20.452Z","updatedAt":"2022-06-26T07:15:20.452Z"},{"id":3,"categoria":"Accesorios","createdAt":"2022-06-26T07:16:09.264Z","updatedAt":"2022-06-26T07:16:09.264Z"},{"id":7,"categoria":"Joyeria","createdAt":"2022-07-26T21:26:08.442Z","updatedAt":"2022-07-26T21:27:16.541Z"}]);
  useEffect(() => {
    if (buscar === "") {
      setElementosFiltrados(elementos);
    } else {
      let exist = elementos.filter((item) => {
        return item[elemento].toLowerCase() === buscar.toLocaleLowerCase();
      });
      setVerExist(exist);

      let temp = elementos.filter((item) => {
        return item[elemento]
          .toLowerCase()
          .includes(buscar.toLocaleLowerCase());
      });
      setElementosFiltrados(temp);
    }
  }, [buscar]);

  //#endregion
  return (
    <div
      className="col-12 col-sm-6 col-md-6 col-lg-4 "
      style={{ paddingBottom: "12px" }}
    >
      {elementos.length > 0 ? (
        < >
          <div
            className="table-responsive"
            style={{ maxHeight: "210px", minHeight: "210px" }}
          >
            <Table className="table table-striped table-sm" style={{textAlign: "initial"}}>
              <thead>
                <th>{props.thOne}</th>
                <th>{props.thTwo}</th>
              </thead>
              <tbody>
                {/* Contenido */}
                {elementosFiltrados.map((item) => {
                  return (
                    // LLave
                    <tr key={item.id}>
                      {/* Celdas */}
                      <td className="col-8" onClick={() => Editar(item.id)}>
                        {id === item.id && modoEdicion ? (
                          < >
                            <input
                              type="text"
                              style={{ fontSize: 11 }}
                              className="mb-2"
                              name="editValue"
                              defaultValue={item[elemento]}
                              onChange={handleChange}
                            />
                          </ >
                        ) : (
                          < >{item[elemento]}</ >
                        )}
                      </td>
                      <td className="col-4">
                       {props.valor}
                        
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </ >
      ) : (
        ""
      )}
    </div>
  );
}
export default Configuration;
