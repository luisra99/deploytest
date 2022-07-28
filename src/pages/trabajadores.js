import React from "react";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Row, Table } from "react-bootstrap";
import * as Yup from "yup";
import Alerta2 from "./notify.js";

import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";

function Trabajadores() {
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
  const [primer_apellido, setPrimerApellido] = useState("");
  const [segundo_apellido, setSegundoApellido] = useState("");
  const [ci, setCarnet] = useState("");
  const [direccion, setDireccion] = useState("");
  const [salario_base, setSalario] = useState("");
  const [contacto, setContacto] = useState("");
  const [local, setLocales] = useState([]);
  const [localSelected, setLocaleSelected] = useState(-1);
  const [trabajadores, setTrabajadores] = useState([{"id":7,"ci":"99080100702","direccion":"calle 36 entre 5 y 7","nombre":"Luis Raul","primer_apellido":"Alfonso","segundo_apellido":"Caballero","contacto":"55432748 luisraul.alfonso@gmail.com","salario_base":1000,"createdAt":"2022-07-27T05:59:41.856Z","updatedAt":"2022-07-27T06:00:01.769Z","id_local":2}]);
  function Load() {
    axios.get(process.env.REACT_APP_SERVER + "trabajador",  {headers:{
      "Bypass-Tunnel-Reminder":1
    }}).then((response) => {
      setTrabajadores(response.data);
    });
  }
  const Cancelar = () => {
    setmodoEdicion(false);
    setId("");
    resetFields();
  };
  function resetFields() {
    setnombre("");
    setPrimerApellido("");
    setSegundoApellido("");
    setCarnet("");
    setDireccion("");
    setSalario("");
    setContacto("");
    setLocaleSelected(-1);
  }
  useEffect(() => {
    Load();
  },[]);
  // useEffect(() => {
  //   console.log(localSelected)
  // }, [localSelected]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER + "local",  {headers:{
      "Bypass-Tunnel-Reminder":1
    }}).then((response) => {
      setLocales(response.data);
    });
  }, []);
  const Eliminar = (id) => {
    axios.delete(process.env.REACT_APP_SERVER + "trabajador/" + id,  {headers:{
      "Bypass-Tunnel-Reminder":1
    }}).then(() => {
      Load();
    });
  };
  const Editar = (
    id,
    ci,
    nombre,
    primer_apellido,
    segundo_apellido,
    contacto,
    direccion,
    salario_base,
    id_local
  ) => {
    setmodoEdicion(true);
    setId(id);
    setEditValues(
      ci,
      nombre,
      primer_apellido,
      segundo_apellido,
      contacto,
      direccion,
      salario_base,
      id_local
    );
  };
  function setEditValues(
    ci,
    nombre,
    primer_apellido,
    segundo_apellido,
    contacto,
    direccion,
    salario_base,
    id_local
  ) {
    formikRef.current.setFieldValue("ci", ci);
    setCarnet(ci);
    formikRef.current.setFieldValue("nombre", nombre);
    setnombre(nombre);
    formikRef.current.setFieldValue("primer_apellido", primer_apellido);
    setPrimerApellido(primer_apellido);
    formikRef.current.setFieldValue("segundo_apellido", segundo_apellido);
    setSegundoApellido(segundo_apellido);
    formikRef.current.setFieldValue("contacto", contacto);
    setContacto(contacto);
    formikRef.current.setFieldValue("direccion", direccion);
    setDireccion(direccion);
    formikRef.current.setFieldValue("salario_base", salario_base);
    setSalario(salario_base);
    formikRef.current.setFieldValue("id_local", id_local);
    setLocaleSelected(id_local);
  }
  //#endregion
  //#region Referencias
  const formikRef = useRef();
  //#endregion

  //#region useEffects
  useEffect(() => {
    formikRef.current.setFieldValue("nombre", nombre);
    formikRef.current.setFieldValue("primer_apellido", primer_apellido);
    formikRef.current.setFieldValue("segundo_apellido", segundo_apellido);
    formikRef.current.setFieldValue("ci", ci);
    formikRef.current.setFieldValue("direccion", direccion);
    formikRef.current.setFieldValue("salario_base", salario_base);
    formikRef.current.setFieldValue("contacto", contacto);
    formikRef.current.setFieldValue("id_local", localSelected);
  }, [
    nombre,
    primer_apellido,
    ci,
    segundo_apellido,
    direccion,
    salario_base,
    contacto,
    localSelected,
  ]);

  //#endregion
  //#region Valores iniciales
  const initialValues = {
    ci: "",
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    contacto: "",
    salario_base: "",
    direccion: "",
  };
  //#endregion
  //#region Esquema de Validación
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required(" *"),
    ci: Yup.string().length(11, " Debe tener once caracteres"),
    primer_apellido: Yup.string().required(" *"),
    segundo_apellido: Yup.string().required(" *"),
    contacto: Yup.string().required(" *"),
    salario_base: Yup.number().required(" *"),
    direccion: Yup.string().required(" *"),
    id_local: Yup.number().moreThan(-1),
  });
  //#endregion
  //#region Componente
  return (
    <div className="newProduct">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        innerRef={formikRef}
        onSubmit={(values) => {
          if (!modoEdicion) {
            axios
              .post(process.env.REACT_APP_SERVER + "trabajador", values,  {headers:{
                "Bypass-Tunnel-Reminder":1
              }})
              .then((response) => {
                Notificar(response);
                if (response.data.status !== "primary") resetFields();
                Load();
              });
          } else {
            axios
              .put(process.env.REACT_APP_SERVER + "trabajador/" + id, values,  {headers:{
                "Bypass-Tunnel-Reminder":1
              }})
              .then((response) => {
                Notificar(response);

                resetFields();
                setmodoEdicion(false);
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
                <div onClick={hide}>
                  <Alerta2 ref={childCompRef} visible={alerta} />
                </div>
                <Row>
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
                    <label>Carnet de identidad </label>
                    <ErrorMessage
                      name="ci"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="inputCarnet"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="ci"
                      placeholder="Carnet"
                      value={ci}
                      pattern="[0-9]*"
                      maxLength="11"
                      onChange={(event) =>
                        setCarnet((v) =>
                          event.target.validity.valid ? event.target.value : v
                        )
                      }
                      /* Set onChange to handleChange */
                    />
                  </div>
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
                      pattern="[a-zA-Z ]*"
                      onChange={(event) =>
                        setnombre((v) =>
                          event.target.validity.valid ? event.target.value : v
                        )
                      }
                      /* Set onChange to handleChange */
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 ">
                    <label>Primer Apellido </label>
                    <ErrorMessage
                      name="primer_apellido"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="inputdireccion"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="primer_apellido"
                      placeholder="Primer Apellido"
                      value={primer_apellido}
                      pattern="[a-zA-Z]*"
                      onChange={(event) => {
                        setPrimerApellido((v) =>
                          event.target.validity.valid ? event.target.value : v
                        );
                      }}
                      /* Set onChange to handleChange */
                    />
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
                    <label>Segundo Apellido </label>
                    <ErrorMessage
                      name="segundo_apellido"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="inputProvincia"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="segundo_apellido"
                      placeholder="Segundo Apellido"
                      value={segundo_apellido}
                      pattern="[a-zA-Z ]*"
                      onChange={(event) =>
                        setSegundoApellido((v) =>
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
                      pattern="[a-zA-Z0-9/ -#]*"
                      onChange={(event) => {
                        setDireccion((v) =>
                          event.target.validity.valid ? event.target.value : v
                        );
                      }}
                      /* Set onChange to handleChange */
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
                    <label>Local </label>
                    <Field
                      as="select"
                      className="form-control"
                      name="id_local"
                      onChange={(e) => setLocaleSelected(e.target.value)}
                      value={localSelected}
                    >
                      <option key="-1" value="-1">
                        Seleccione un local
                      </option>
                      {local.map((locales) => (
                        <option key={locales.id} value={locales.id}>
                          {locales.nombre + " - " + locales.direccion}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
                    <label>Salario </label>
                    <ErrorMessage
                      name="salario_base"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="inputSalario"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="salario_base"
                      placeholder="Salario"
                      value={salario_base}
                      pattern="[0-9]*"
                      onChange={(event) =>
                        setSalario((v) =>
                          event.target.validity.valid ? event.target.value : v
                        )
                      }
                      /* Set onChange to handleChange */
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                    <label>Contacto </label>
                    <ErrorMessage
                      name="contacto"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="inputContacto"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="contacto"
                      placeholder="Contacto"
                      value={contacto}
                      pattern="[a-zA-Z0-9 ,@.]*"
                      onChange={(event) => {
                        setContacto((v) =>
                          event.target.validity.valid ? event.target.value : v
                        );
                      }}
                      /* Set onChange to handleChange */
                    />
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
        Empleados <i>{trabajadores.length}</i>
      </h3>
      <div className="table-responsive" style={{ paddingBottom: "30px" }}>
        <Table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Datos</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Local</th>
            </tr>
          </thead>
          <tbody>
            {trabajadores.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    {item.ci}
                    <br />
                    {item.direccion}
                  </td>
                  <td>
                    {item.nombre}
                    <br />
                    {item.primer_apellido} {item.segundo_apellido}
                  </td>
                  <td>{item.contacto}</td>
                  <td>{item.id_local}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm float-right mx-2"
                      type="submit"
                      style={{ display: "inline-block" }}
                      onClick={() =>
                        Editar(
                          item.id,
                          item.ci,
                          item.nombre,
                          item.primer_apellido,
                          item.segundo_apellido,
                          item.contacto,
                          item.direccion,
                          item.salario_base,
                          item.id_local
                        )
                      }
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      type="submit"
                      style={{ display: "inline-block" }}
                      onClick={() => Eliminar(item.id)}
                    >
                      <MdDelete size={20} />
                    </button>
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
export default Trabajadores;
