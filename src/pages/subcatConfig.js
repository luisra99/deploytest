import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Alerta2 from "./notify.js";

import { Table } from "react-bootstrap";
import { MdDelete, MdSave, MdCancel, MdAddCircleOutline } from "react-icons/md";

function SubCatConfig(props) {
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
  const [categorias, setCategorias] = useState([]);
  const [catSelected, setCatSelected] = useState(-1);

  function LoadCats() {
    axios.get(process.env.REACT_APP_SERVER + "categoria").then((response) => {
      setCategorias(response.data);
    });
  }
  useEffect(() => {
    LoadCats();
  }, []);
  const handleLoadSubCat = function (e) {
    setCatSelected(e.target.value);
    handleCategoria(parseInt(e.target.value));
  };
  function handleCategoria(id) {
    let temp = elementos.filter((subcategorias) => {
      return subcategorias.id_categoria === id;
    });
    setElementosFiltrados(temp);
  }

  const Eliminar = (id) => {
    axios
      .delete(process.env.REACT_APP_SERVER + "" + ruta + "/" + id)
      .then((response) => {
        Notificar(response);
        Load();
        setCatSelected("-1");
        handleCategoria(-1);
      });
  };
  const Agregar = (id) => {
    const newValue = buscar.charAt(0).toUpperCase() + buscar.slice(1);
    var newVal =
      '{"' +
      elemento +
      '":"' +
      newValue +
      '", "id_categoria":"' +
      catSelected +
      '"}';
    const data = JSON.parse(newVal);
    axios
      .post(process.env.REACT_APP_SERVER + "" + ruta, data)
      .then((response) => {
        Notificar(response);
        Load();
        setCatSelected("-1");
        handleCategoria(-1);
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
      .put(process.env.REACT_APP_SERVER + "" + ruta + "/" + id, data)
      .then((response) => {
        setmodoEdicion(false);
        Notificar(response);
        Load();
        setCatSelected("-1");
        handleCategoria(-1);
      });
  };
  //#region CARGA
  //Categorias
  const [elementos, setElementos] = useState([]);

  function Load() {
    axios.get(process.env.REACT_APP_SERVER + "" + ruta).then((response) => {
      setElementos(response.data);
    });
  }

  useEffect(() => {
    Load();
  });

  const [elementosFiltrados, setElementosFiltrados] = useState([]);
  useEffect(() => {
    if (buscar === "") {
      handleCategoria(parseInt(catSelected));
    } else {
      let exist = elementosFiltrados.filter((item) => {
        return item[elemento].toLowerCase() === buscar.toLocaleLowerCase();
      });
      setVerExist(exist);

      let temp = elementosFiltrados.filter((item) => {
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
      className="col-sm-4 col-md-4 col-lg-4 "
      style={{ paddingBottom: "12px" }}
    >
      <div onClick={hide}>
        <Alerta2 ref={childCompRef} visible={alerta} />
      </div>
      <h4>Categoría </h4>
      <select
        as="select"
        className="form-control"
        name="id_categoria"
        onChange={handleLoadSubCat}
        onClick={LoadCats}
        value={catSelected}
      >
        <option key="-1" value="-1">
          Seleccione una categoría
        </option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.categoria}
          </option>
        ))}
      </select>
      <h4>{nombre}</h4>
      <div className="input-group">
        <input
          className="form-control"
          placeholder={
            elementosFiltrados.length > 0 ? "Buscar " + nombre : "Agregar"
          }
          type="text"
          id={elemento}
          name="buscar"
          style={{ textTransform: "capitalize" }}
          onChange={Buscar}
        ></input>
        <button
          className={
            verExist.length > 0 || buscar === ""
              ? "btn btn-primary disabled input-group-text"
              : "btn btn-primary input-group-text"
          }
          onClick={() => {
            Agregar();
            let form = document.getElementById(elemento);
            form.value = "";
          }}
        >
          <MdAddCircleOutline size={20} />
        </button>
      </div>
      {elementos.length > 0 ? (
        <React.Fragment>
          <div
            className="table-responsive"
            style={{ maxHeight: "210px", minHeight: "210px" }}
          >
            <Table className="table table-striped table-sm">
              <tbody>
                {/* Contenido */}
                {elementosFiltrados.map((item) => {
                  return (
                    // LLave
                    <tr key={item.id}>
                      {/* Celdas */}
                      <td onClick={() => Editar(item.id)}>
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
                      <td>
                        {id === item.id && modoEdicion ? (
                          <React.Fragment>
                            <button
                              className="btn btn-primary btn-sm float-right mx-2"
                              type="submit"
                              style={{ display: "inline-block" }}
                              onClick={Guardar}
                            >
                              <MdSave size={20} />
                            </button>
                            <button
                              className="btn btn-secondary btn-sm float-right mx-2"
                              type="submit"
                              style={{ display: "inline-block" }}
                              onClick={() => Cancelar()}
                            >
                              <MdCancel size={20} />
                            </button>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <button
                              className="btn btn-danger btn-sm"
                              type="submit"
                              style={{ display: "inline-block" }}
                              onClick={() => Eliminar(item.id)}
                            >
                              <MdDelete size={20} />
                            </button>
                          </React.Fragment>
                        )}
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
export default SubCatConfig;