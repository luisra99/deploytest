import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Alerta2 from "./notify.js";
import { Table } from "react-bootstrap";
import { MdDelete, MdSave, MdCancel, MdAddCircleOutline } from "react-icons/md";
function Configuration(props) {
  const childCompRef = useRef();
  const [alerta, setAlerta] = useState(false);
  function Notificar(respuesta) {
    setAlerta(false);

    childCompRef.current.AlertaConfig(respuesta);
    setAlerta(true);
  }
  function hide() {
    setAlerta(false);
  }
  const { ruta, elemento, nombre } = props;
  //Controles
  const [modoEdicion, setmodoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [elementoEdit, setElementoEdit] = useState("");
  const [verExist, setVerExist] = useState([]);
  const [buscar, setbuscar] = useState("");

  const Eliminar = (id) => {
    axios
      .delete(process.env.REACT_APP_SERVER + "" + ruta + "/" + id,  {headers:{
        "Bypass-Tunnel-Reminder":1
      }})
      .then((response) => {
        Notificar(response);
        Load();
      });
  };
  const Agregar = (id) => {
    const newValue = buscar.charAt(0).toUpperCase() + buscar.slice(1);
    var newVal = '{"' + elemento + '":"' + newValue + '"}';
    const data = JSON.parse(newVal);
    axios
      .post(process.env.REACT_APP_SERVER + "" + ruta, data,  {headers:{
        "Bypass-Tunnel-Reminder":1
      }})
      .then((response) => {
        Notificar(response);
        Load();
      });
  };
  const Editar = (id) => {
    setmodoEdicion(true);
    setId(id);
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setElementoEdit(value);
  };
  const Buscar = (e) => {
    const { value } = e.target;
    setbuscar(value);
  };
  const Cancelar = () => {
    setmodoEdicion(false);
  };
  const Guardar = () => {
    var newVal = '{"' + elemento + '":"' + elementoEdit + '"}';
    const data = JSON.parse(newVal);
    axios
      .put(process.env.REACT_APP_SERVER + "" + ruta + "/" + id, data,  {headers:{
        "Bypass-Tunnel-Reminder":1
      }})
      .then((response) => {
        Notificar(response);
        Load();
      });
    setmodoEdicion(false);
  };
  //#region CARGA
  //Categorias
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
        <React.Fragment>
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
                          <React.Fragment>
                            <input
                              type="text"
                              style={{ fontSize: 11 }}
                              className="mb-2"
                              name="editValue"
                              defaultValue={item[elemento]}
                              onChange={handleChange}
                            />
                          </React.Fragment>
                        ) : (
                          <React.Fragment>{item[elemento]}</React.Fragment>
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
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
}
export default Configuration;
