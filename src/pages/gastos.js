import React from "react";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Table, Row,Modal,Button } from "react-bootstrap";
import { MdEdit, MdDelete, MdSave, MdCancel,MdAddCircle } from "react-icons/md";
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
  const [gastos, setGastos] = useState([{"id":28,"fecha":"2022-07-07","monto":1000,"descripcion":"Viaje a matanzas","createdAt":"2022-07-26T21:45:45.670Z","updatedAt":"2022-07-26T21:45:45.670Z","id_tipogasto":1},{"id":31,"fecha":"2022-07-15","monto":20004,"descripcion":"Cientos y cientos de tiritas de cuero","createdAt":"2022-07-26T21:52:27.211Z","updatedAt":"2022-07-26T21:52:40.180Z","id_tipogasto":2},{"id":32,"fecha":"2022-07-28","monto":2,"descripcion":"Cartera de Tela Color: Rojo CVT: Hombre (Tienda Jaguey)","createdAt":"2022-07-28T09:23:22.986Z","updatedAt":"2022-07-28T09:23:22.986Z","id_tipogasto":11}]);
  const [tipoGastos, setTipoGastos] = useState([]);
  const [modoEdicion, setmodoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [montoNuevo, setMontoNuevo] = useState("");
  function Load() {
    axios.get(process.env.REACT_APP_SERVER + "view/gastos",  {headers:{
      "Bypass-Tunnel-Reminder":1
    }}).then((response) => {
if(response.data.status!=="danger")
  setGastos(response.data);
    });
  }
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER + "tipogasto",  {headers:{
      "Bypass-Tunnel-Reminder":1
    }}).then((response) => {
      setTipoGastos(response.data);
    });
  }, []);
  useEffect(() => {
    Load();
  },[]);
   const Editar = (id, monto) => {
    setMontoNuevo(monto);
    setmodoEdicion(true);
    setId(id);
  };
  const Guardar = () => {
    var newVal = '{"monto":"' + montoNuevo + '"}';
    const data = JSON.parse(newVal);
    axios
      .put(process.env.REACT_APP_SERVER + "gasto/" + id, data,  {headers:{
        "Bypass-Tunnel-Reminder":1
      }})
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
      .delete(process.env.REACT_APP_SERVER + "gasto/" + id,  {headers:{
        "Bypass-Tunnel-Reminder":1
      }})
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
  const [show, setShow] = useState(false);
  const Close = () => {
    setShow(false);
    setmonto("");
    setdescripcion("");
    formikRef.current?.resetForm();
  };

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
    <>
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
              .post(process.env.REACT_APP_SERVER + "gasto", values,  {headers:{
                "Bypass-Tunnel-Reminder":1
              }})
              .then((response) => {
                Notificar(response);
                if (response.data.status === "success") {
                  resetFields();
                  Load();
                }
              });
          } else {
            axios
              .put(process.env.REACT_APP_SERVER + "local/" + id, values,  {headers:{
                "Bypass-Tunnel-Reminder":1
              }})
              .then((response) => {
                Load();
              });
          }
        }}
      >
        {(props) => {
          // console.log(props);
          return (<>
            <Modal
              show={show}
              onExiting={Cancelar}
              onHide={Close}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
            <Form className="Formi">
              <div>
                <h4 className="text-center">Crear Gasto</h4>
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
                  <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 ">
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
                  <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 ">
                    <label>
                      Nuevo
                      <Field
                        className="form-check"
                        type="checkbox"
                        id="nuevo"
                        name="nuevo"
                        style={{
                          marginRight: "40%",
                          marginLeft: "40%",
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
                    "btn btn-secondary col-xs-11 col-sm-5 col-md-5 col-lg-5"
                  }
                  onClick={Close}
                  type="button"
                  style={{
                    margin: "10px",
                  }}
                >
                  Cancelar
                </button>
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
            </Modal>
            </>
          );
        }}
      </Formik>
      <h3>
        Gastos{" "}
        <Button
          style={{ maxWidth: "150px" }}
          variant="success btn-sm"
          onClick={() => setShow(true)}
        >
          <MdAddCircle size={15} /> Agregar
        </Button>
      </h3>
      <div id="ptable" className="table-responsive" style={{ paddingBottom: "30px" }}>
        <Table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Monto</th>
              <th style={{textAlign:"center"}}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {gastos.map((gasto) => {
              return (
                <tr key={gasto.id}>
                  <td data-title="Fecha">{gasto.fecha}</td>
                  <td data-title="Tipo de gasto">{gasto.tipo_gasto}</td>
                  <td data-title="Descripción">{gasto.descripcion}</td>
                  <td data-title="Monto">
                    {id === gasto.id && modoEdicion ? (
                      < >
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
                      </ >
                    ) : (
                      < >{gasto.monto}</ >
                    )}
                  </td>
                  <td  style={{paddingLeft: "0px"}}>
                    {id === gasto.id && modoEdicion ? (
                      <div
                      className="text-center">
                        <button
                          className="btn btn-sm"
                          onClick={Guardar}
                          style={{paddingLeft:"5px"}}

                        >
                          <MdSave size={20} /> Guardar
                        </button>
                        <button
                          className="btn btn-sm"
                          style={{paddingLeft:"5px"}}
                          onClick={() => Cancelar()}
                        >
                          <MdCancel size={20} />Cancelar
                        </button>
                      </div>
                    ) : (
                      <div
                            className="text-center"
                          
                          >
                        <button
                          className="btn btn-sm "
                          onClick={() => Editar(gasto.id, gasto.monto)}
                        >
                          <MdEdit size={20} />Editar
                        </button>
                        <button
                          className="btn btn-sm"
                          onClick={() => Eliminar(gasto.id)}
                        >
                          <MdDelete size={20} />Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}
//#endregion
export default Gastos;
