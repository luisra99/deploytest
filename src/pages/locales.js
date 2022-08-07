import React from "react";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import Alerta2 from "./notify.js";
import { Table, Row } from "react-bootstrap";
import { MdEdit, MdDelete } from "react-icons/md";

import * as Yup from "yup";
import axios from "axios";

function Locales() {
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
  //#region Relleno del Contenido
  //#region Variables
  const [modoEdicion, setmodoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [nombre, setnombre] = useState("");
  const [direccion, setdireccion] = useState("");
  const [provincia, setprovincia] = useState("");
  const [municipio, setmunicipio] = useState("");
  const [tipo, settipo] = useState(0);
  const [locales, setLocal] = useState([{"id":2,"direccion":"Matanzas, Jaguey, calle 36 /5 y 7 507A","nombre":"Tienda Jaguey","trabajadores":0,"tipo":0,"createdAt":"2022-07-27T05:50:40.116Z","updatedAt":"2022-07-27T05:51:19.932Z"},{"id":4,"direccion":"Matanzas, Jaguey, Calle 36 / 5 y 7","nombre":"Taller Jaguey","trabajadores":0,"tipo":1,"createdAt":"2022-07-27T05:53:19.348Z","updatedAt":"2022-07-27T05:53:19.348Z"}]);
  function Load() {
    axios.get(process.env.REACT_APP_SERVER + "local",  {headers:{
      "Bypass-Tunnel-Reminder":1
    }}).then((response) => {
      setLocal(response.data);
    });
  }
  useEffect(() => {
    Load();
  },[]);
  useEffect(() => {
    console.log(tipo);
  }, [tipo]);
  const Editar = (id, nombre, direccion, tipo) => {
    setEditValues(nombre, direccion, tipo);
    setmodoEdicion(true);
    setId(id);
  };
  const Cancelar = () => {
    setmodoEdicion(false);
    setId("");
    resetFields();
  };
  const Eliminar = (id) => {
    axios
      .delete(process.env.REACT_APP_SERVER + "local/" + id,  {headers:{
        "Bypass-Tunnel-Reminder":1
      }})
      .then((response) => {
        Notificar(response);
        Load();
      });
  };
  function resetFields() {
    setnombre("");
    setdireccion("");
    setprovincia("");
    setmunicipio("");
    settipo(0);
    setmodoEdicion(false);
    formikRef.current?.resetForm();
  }

  function setEditValues(nombre, direccion, tipo) {
    const adr = direccion.split(",");
    formikRef.current.setFieldValue("provincia", adr[0]);
    setprovincia(adr[0]);

    formikRef.current.setFieldValue("municipio", adr[1].trim());
    setmunicipio(adr[1].trim());

    formikRef.current.setFieldValue("direccion", adr[2].trim());
    setdireccion(adr[2].trim());

    formikRef.current.setFieldValue("provincia", nombre);
    setnombre(nombre);
    formikRef.current.setFieldValue("tipo", tipo);
    settipo(tipo);
  }
  //#endregion
  //#region Referencias
  const formikRef = useRef();
  //#endregion

  //#region useEffects
  useEffect(() => {
    formikRef.current.setFieldValue("nombre", nombre);
    formikRef.current.setFieldValue("direccion", direccion);
    formikRef.current.setFieldValue("provincia", provincia);
    formikRef.current.setFieldValue("municipio", municipio);
    formikRef.current.setFieldValue("tipo", tipo);
  }, [nombre, direccion, municipio, provincia, tipo]);

  //#endregion
  //#region Valores iniciales
  const initialValues = {
    tipo: 0,
    municipio: "",
    nombre: "",
    direccion: "",
    provincia: "",
  };
  //#endregion
  //#region Esquema de Validación
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required(" *"),
    direccion: Yup.string().required(" *"),
    provincia: Yup.string().required(" *"),
    municipio: Yup.string().required(" *"),
    tipo: Yup.number(),
  });
  //#endregion
  //#region Componente
  return (
    <div className="newProduct">
      <div onClick={hide}>
        <Alerta2 ref={childCompRef} visible={alerta} />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        innerRef={formikRef}
        onSubmit={(values, { resetForm }) => {
          if (!modoEdicion) {
            axios
              .post(process.env.REACT_APP_SERVER + "local", values,  {headers:{
                "Bypass-Tunnel-Reminder":1
              }})
              .then((response) => {
                Notificar(response);
                resetFields();
                Load();
              });
          } else {
            axios
              .put(process.env.REACT_APP_SERVER + "local/" + id, values,  {headers:{
                "Bypass-Tunnel-Reminder":1
              }})
              .then((response) => {
                Notificar(response);
                resetFields();
                Load();
              });
          }
        }}
      >
        {(props) => {
          // console.log(props);
          return (
            <Form className="Formi">
              <div>
                <Row>
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
                    <label>Provincia </label>
                    <ErrorMessage
                      name="provincia"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="inputProvincia"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="provincia"
                      placeholder="Provincia"
                      value={provincia}
                      pattern="[a-zA-Z ]*"
                      onChange={(event) =>
                        setprovincia((v) =>
                          event.target.validity.valid ? event.target.value : v
                        )
                      }
                      /* Set onChange to handleChange */
                    />
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
                    <label>Municipio </label>
                    <ErrorMessage
                      name="municipio"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="inputMunicipio"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="municipio"
                      placeholder="Municipio"
                      value={municipio}
                      pattern="[a-zA-Z ]*"
                      onChange={(event) =>
                        setmunicipio((v) =>
                          event.target.validity.valid ? event.target.value : v
                        )
                      }
                      /* Set onChange to handleChange */
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                    <label>Dirección </label>
                    <ErrorMessage
                      name="direccion"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="inputdireccion"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="direccion"
                      placeholder="Dirección"
                      value={direccion}
                      pattern="[a-zA-Z0-9/ -]*"
                      onChange={(event) => {
                        setdireccion((v) =>
                          event.target.validity.valid ? event.target.value : v
                        );
                      }}
                      /* Set onChange to handleChange */
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
                    <label>Nombre</label>
                    <ErrorMessage
                      name="nombre"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="inputNombre"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="nombre"
                      placeholder="Nombre"
                      value={nombre}
                      pattern="[a-zA-Z0-9 ]*"
                      onChange={(event) =>
                        setnombre((v) =>
                          event.target.validity.valid ? event.target.value : v
                        )
                      }
                      /* Set onChange to handleChange */
                    />
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
                    <label>Tipo</label>
                    <Field
                      as="select"
                      className="form-control"
                      name="tipo"
                      onChange={(e) => settipo(parseInt(e.target.value))}
                      value={tipo}
                    >
                      <option key="0" value="0">
                        Tienda
                      </option>
                      <option key="1" value="1">
                        Taller
                      </option>
                    </Field>
                  </div>
                </Row>
              </div>
              <div className="row justify-content-center">
                <button
                  className={
                    !modoEdicion
                      ? "btn btn-primary col-xs-11 col-sm-5 col-md-5 col-lg-5"
                      : "btn btn-success col-xs-11 col-sm-5 col-md-5 col-lg-5"
                  }
                  variant="success"
                  disabled={!props.isValid}
                  type="submit"
                  style={{
                    margin: "10px",
                  }}
                >
                  {!modoEdicion ? "Guardar" : "Actualizar"}
                </button>
                {!modoEdicion ? (
                  ""
                ) : (
                  <React.Fragment>
                    <button
                      className="btn btn-danger col-xs-11 col-sm-5 col-md-5 col-lg-5"
                      variant="success"
                      style={{
                        margin: "10px",
                      }}
                      onClick={Cancelar}
                    >
                      Cancelar
                    </button>
                  </React.Fragment>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
      <h3>
        Locales <i>{locales.length}</i>
      </h3>
      <div className="table-responsive" id="ptable" style={{ paddingBottom: "30px" }}>
        <Table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Tipo</th>
              <th>Trabajadores</th>
              <th style={{textAlign:"center"}}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {locales.map((local) => {
              return (
                <tr key={local.id}>
                  <td>{local.nombre}</td>
                  <td>{local.direccion}</td>
                  <td>{local.tipo === 0 ? "Tienda" : "Taller"}</td>
                  <td>{local.trabajadores}</td>
                  <td style={{paddingLeft: "0px"}}>
                  <div
                      className="text-center" >
                    <button
                      className="btn btn-sm"
                      
                      onClick={() =>
                        Editar(
                          local.id,
                          local.nombre,
                          local.direccion,
                          local.tipo
                        )
                      }
                    >
                      <MdEdit size={20} />
                      Editar
                    </button>
                    <button
                     className="btn btn-sm"
                   
                      onClick={() => Eliminar(local.id)}
                    >
                      <MdDelete size={20} />Eliminar
                    </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
//#endregion
export default Locales;
