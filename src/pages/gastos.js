import React from "react";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Table, Row } from "react-bootstrap";
import { MdEdit, MdDelete, MdSave, MdCancel } from "react-icons/md";
import Alerta2 from "./notify.js";
import * as Yup from "yup";
import axios from "axios";

function Gastos() {
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
  const [monto, setmonto] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [gastos, setGastos] = useState([]);
  const [tipoGastos, setTipoGastos] = useState([]);
  const [modoEdicion, setmodoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [montoNuevo, setMontoNuevo] = useState("");
  function Load() {
    axios.get(process.env.REACT_APP_SERVER + "view/gastos").then((response) => {
      setGastos(response.data);
    });
  }
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER + "tipogasto").then((response) => {
      setTipoGastos(response.data);
    });
  }, []);
  useEffect(() => {
    Load();
  });
  const Editar = (id, monto) => {
    setMontoNuevo(monto);
    setmodoEdicion(true);
    setId(id);
  };
  const Guardar = () => {
    var newVal = '{"monto":"' + montoNuevo + '"}';
    const data = JSON.parse(newVal);
    axios
      .put(process.env.REACT_APP_SERVER + "gasto/" + id, data)
      .then((response) => {
        Notificar(response);
        Load();
      });
    setmodoEdicion(false);
  };
  const Cancelar = () => {
    setmodoEdicion(false);
    setId("");
  };
  const Eliminar = (id) => {
    axios
      .delete(process.env.REACT_APP_SERVER + "gasto/" + id)
      .then((response) => {
        Notificar(response);
        Load();
      });
  };
  function resetFields() {
    setmonto("");
    setdescripcion("");
    formikRef.current?.resetForm();
  }

  const formikRef = useRef();
  //#endregion

  //#region useEffects
  useEffect(() => {
    formikRef.current.setFieldValue("monto", monto);
    formikRef.current.setFieldValue("descripcion", descripcion);
  }, [monto, descripcion]);

  //#endregion
  //#region Valores iniciales
  const initialValues = {
    fecha: "",
    id_tipogasto: -1,
    nuevo: false,
    monto: "",
    descripcion: "",
  };
  //#endregion
  //#region Esquema de Validación
  const validationSchema = Yup.object().shape({
    fecha: Yup.date().required(" *"),
    id_tipogasto: Yup.number().moreThan(-1, " Seleccionar"),
    monto: Yup.number().required(" *"),
    descripcion: Yup.string().required(" *"),
    nuevo: Yup.boolean(),
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
            console.log(values);
            axios
              .post(process.env.REACT_APP_SERVER + "gasto", values)
              .then((response) => {
                Notificar(response);
                if (response.data.status === "success") {
                  resetFields();
                  Load();
                }
              });
          } else {
            axios
              .put(process.env.REACT_APP_SERVER + "local/" + id, values)
              .then((response) => {
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
                  <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 ">
                    <label>Fecha </label>
                    <ErrorMessage
                      name="fecha"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="inputProvincia"
                      type="date"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="fecha"
                      placeholder="Fecha"
                      /* Set onChange to handleChange */
                    />
                  </div>
                  <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 ">
                    <label>Tipo de gasto </label>
                    <ErrorMessage
                      name="id_tipogasto"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      as="select"
                      className="form-control"
                      name="id_tipogasto"
                    >
                      <option key="-1" value="-1">
                        Seleccionar tipo de gasto
                      </option>
                      {tipoGastos.map((tipogasto) => (
                        <option key={tipogasto.id} value={tipogasto.id}>
                          {tipogasto.tipo_gasto}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 ">
                    <label>Monto</label>
                    <ErrorMessage
                      name="monto"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="inputMonto"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="monto"
                      placeholder="Monto"
                      value={monto}
                      pattern="[0-9]*"
                      onChange={(event) =>
                        setmonto((v) =>
                          event.target.validity.valid ? event.target.value : v
                        )
                      }
                      /* Set onChange to handleChange */
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11 ">
                    <label>Descripción</label>
                    <ErrorMessage
                      name="descripcion"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="descripcion"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="descripcion"
                      placeholder="Descripción"
                      value={descripcion}
                      pattern="[a-zA-Z0-9/ -]*"
                      onChange={(event) => {
                        setdescripcion((v) =>
                          event.target.validity.valid ? event.target.value : v
                        );
                      }}
                      /* Set onChange to handleChange */
                    />
                  </div>
                  <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 ">
                    <label>
                      Nuevo
                      <Field
                        className="form-check"
                        type="checkbox"
                        id="nuevo"
                        name="nuevo"
                        style={{
                          marginRight: "30%",
                          marginLeft: "30%",
                          marginTop: "5px",
                        }}
                      />
                    </label>
                  </div>
                </Row>
              </div>
              <div className="row justify-content-center">
                <button
                  className={
                    "btn btn-success col-xs-11 col-sm-5 col-md-5 col-lg-5"
                  }
                  variant="success"
                  disabled={!props.isValid}
                  type="submit"
                  style={{
                    margin: "10px",
                  }}
                >
                  Guardar
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <h3>
        Gastos <i>{gastos.length}</i>
      </h3>
      <div className="table-responsive" style={{ paddingBottom: "30px" }}>
        <Table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {gastos.map((gasto) => {
              return (
                <tr key={gasto.id}>
                  <td>{gasto.fecha}</td>
                  <td>{gasto.tipo_gasto}</td>
                  <td>{gasto.descripcion}</td>
                  <td>
                    {id === gasto.id && modoEdicion ? (
                      <React.Fragment>
                        <input
                          type="text"
                          style={{ fontSize: 11 }}
                          className="mb-2"
                          name="editValue"
                          value={montoNuevo}
                          pattern="[0-9]*"
                          onChange={(event) =>
                            setMontoNuevo((v) =>
                              event.target.validity.valid
                                ? event.target.value
                                : v
                            )
                          }
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>{gasto.monto}</React.Fragment>
                    )}
                  </td>
                  <td>
                    {id === gasto.id && modoEdicion ? (
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
                          className="btn btn-success btn-sm float-right mx-2"
                          type="submit"
                          style={{ display: "inline-block" }}
                          onClick={() => Editar(gasto.id, gasto.monto)}
                        >
                          <MdEdit size={20} />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          type="submit"
                          style={{ display: "inline-block" }}
                          onClick={() => Eliminar(gasto.id)}
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
    </div>
  );
}
//#endregion
export default Gastos;
