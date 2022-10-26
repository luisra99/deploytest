import React from "react";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Row, Table, Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import Accordion from "react-bootstrap/Accordion";
import Alerta2 from "./notify.js";
import axios from "axios";
import { MdEdit, MdDelete, MdAddCircle } from "react-icons/md";

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
  const [show, setShow] = useState(false);
  const Close = () => {
    setAlerta(false);
    setShow(false);
  };

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
  const [passw, setPassw] = useState("");
  const [local, setLocales] = useState([]);
  const [localSelected, setLocaleSelected] = useState(-1);
  const [trabajadores, setTrabajadores] = useState([
    {
      id: 7,
      ci: "99080100702",
      direccion: "calle 36 entre 5 y 7",
      nombre: "Luis Raul",
      primer_apellido: "Alfonso",
      segundo_apellido: "Caballero",
      contacto: "55432748 luisraul.alfonso@gmail.com",
      salario_base: 1000,
      createdAt: "2022-07-27T05:59:41.856Z",
      updatedAt: "2022-07-27T06:00:01.769Z",
      id_local: 2,
    },
  ]);
  function Load() {
    axios
      .get(process.env.REACT_APP_SERVER + "view/trabajador", {
        headers: {
          "Bypass-Tunnel-Reminder": 1,
        },
      })
      .then((response) => {
        if(response.data.titulo!=="Error")
        setTrabajadores(response.data);
      });
  }
  const Cancelar = () => {
    setShow(false);
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
  }, []);
  // useEffect(() => {
  //   console.log(localSelected)
  // }, [localSelected]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER + "local", {
        headers: {
          "Bypass-Tunnel-Reminder": 1,
        },
      })
      .then((response) => {
        setLocales(response.data);
      });
  }, []);
  const Eliminar = (id) => {
    axios
      .delete(process.env.REACT_APP_SERVER + "trabajador/" + id, {
        headers: {
          "Bypass-Tunnel-Reminder": 1,
        },
      })
      .then(() => {
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
    passw:"",
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
    passw:Yup.string().matches('[a-zA-Z0-9 ,@.]*'," No válida")
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
              .post(process.env.REACT_APP_SERVER + "trabajador", values, {
                headers: {
                  "Bypass-Tunnel-Reminder": 1,
                },
              })
              .then((response) => {
                Notificar(response);
                if (response.data.status !== "primary") {
                  resetFields();
                }
                Close();
                Load();
              });
          } else {
            axios
              .put(process.env.REACT_APP_SERVER + "trabajador/" + id, values, {
                headers: {
                  "Bypass-Tunnel-Reminder": 1,
                },
              })
              .then((response) => {
                Notificar(response);
                resetFields();
                setmodoEdicion(false);
                Load();
                Close();
              });
          }
        }}
      >
        {(props) => {
          // console.log(props);
          return (
            <>
              <div onClick={hide}>
                <Alerta2 ref={childCompRef} visible={alerta} />
              </div>
              <Modal
                show={show}
                onHide={Close}
                onExiting={Cancelar}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Form className="Formi">
                  <div>
                    <Row>
                      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
                        <label>Carnet de identidad </label>
                        <ErrorMessage
                          name="ci"
                          render={(msg) => (
                            <span className="up-error">{msg}</span>
                          )}
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
                              event.target.validity.valid
                                ? event.target.value
                                : v
                            )
                          }
                          /* Set onChange to handleChange */
                        />
                      </div>
                      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
                        <label>Nombre</label>
                        <ErrorMessage
                          name="nombre"
                          render={(msg) => (
                            <span className="up-error">{msg}</span>
                          )}
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
                              event.target.validity.valid
                                ? event.target.value
                                : v
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
                          render={(msg) => (
                            <span className="up-error">{msg}</span>
                          )}
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
                              event.target.validity.valid
                                ? event.target.value
                                : v
                            );
                          }}
                          /* Set onChange to handleChange */
                        />
                      </div>
                      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
                        <label>Segundo Apellido </label>
                        <ErrorMessage
                          name="segundo_apellido"
                          render={(msg) => (
                            <span className="up-error">{msg}</span>
                          )}
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
                              event.target.validity.valid
                                ? event.target.value
                                : v
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
                          render={(msg) => (
                            <span className="up-error">{msg}</span>
                          )}
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
                              event.target.validity.valid
                                ? event.target.value
                                : v
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
                          render={(msg) => (
                            <span className="up-error">{msg}</span>
                          )}
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
                              event.target.validity.valid
                                ? event.target.value
                                : v
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
                          render={(msg) => (
                            <span className="up-error">{msg}</span>
                          )}
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
                              event.target.validity.valid
                                ? event.target.value
                                : v
                            );
                          }}
                          /* Set onChange to handleChange */
                        />
                      </div>
                    </Row>
                    <Row>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                        <label>Contraseña </label>
                        <ErrorMessage
                          name="passw"
                          render={(msg) => (
                            <span className="up-error">{msg}</span>
                          )}
                        />
                        <Field
                          className="form-control"
                          id="inputContacto"
                          type="text"
                          /* This name property is used to access the value of the form element via values.nameOfElement */
                          name="passw"
                          placeholder="Contraseña"
                          value={passw}
                          pattern="[a-zA-Z0-9@.]*"
                          onChange={(event) => {
                            setPassw((v) =>
                              event.target.validity.valid
                                ? event.target.value
                                : v
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

                    <button
                      className="btn btn-secondary col-xs-11 col-sm-5 col-md-5 col-lg-5"
                      type="button"
                      style={{
                        margin: "10px",
                      }}
                      onClick={Cancelar}
                    >
                      Cancelar
                    </button>
                  </div>
                </Form>
              </Modal>
            </>
          );
        }}
      </Formik>
      <h4>
        Empleados{" "}
        <Button
          style={{ maxWidth: "150px" }}
          variant="success btn-sm"
          onClick={() => setShow(true)}
        >
          <MdAddCircle size={15} /> Agregar
        </Button>
      </h4>
      {trabajadores.map((local) => {
        return (
          <div className="details-card" key={local.id}>
            <Accordion
              defaultActiveKey="1"
              flush
              className="text-center col-12"
              style={{ padding: "0px" }}
            >
              <Accordion.Item style={{ background: "none" }} eventKey="0">
                <h5>
                  {`${local.nombre} ${local.primer_apellido} ${local.segundo_apellido}`}{" "}
                </h5>{" "}
                <h6>
                  <i>{local.direccion}</i>
                </h6>
                <h6>
                  Contacto: <i>{local.contacto}</i>
                </h6>{" "}
                <h6>
                  Salario Base: <i>$ {local.salario_base}</i>
                </h6>{" "}
                <h6>
                  CI: <i>{local.ci}</i>
                </h6>{" "}
                <h6>
                  Comisión hoy: <i>${local.comision_hoy ?? 0}</i>
                </h6>
                <div className="text-center">
                  {" "}
                  <button
                    className="btn btn-sm"
                    style={{
                      padding: "0px",
                      marginBottom: "3px",
                      marginRight: "10px",
                      color: "whitesmoke",
                    }}
                    onClick={() => {
                      setShow(true);
                      Editar(
                        local.id,
                        local.ci,
                        local.nombre,
                        local.primer_apellido,
                        local.segundo_apellido,
                        local.contacto,
                        local.direccion,
                        local.salario_base,
                        local.id_local
                      );
                    }}
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{
                      padding: "0px",
                      marginBottom: "3px",
                      color: "whitesmoke",
                    }}
                    onClick={() => Eliminar(local.id)}
                  >
                    <MdDelete size={20} />
                  </button>{" "}
                  <Accordion.Header
                    style={{ display: "inline-block", marginTop: "3px" }}
                  ></Accordion.Header>
                </div>
                <Accordion.Body style={{ padding: "0px" }}>
                  <div
                    className="table-responsive"
                    id="ptable"
                    style={{ paddingBottom: "0px" }}
                  >
                    <Table className="table table-striped table-sm">
                      <thead>
                        <tr>
                          <th>Momento</th>
                          <th>Importe</th>
                          <th>Comisión</th>
                          <th>Margen</th>
                        </tr>
                      </thead>
                      <tbody id="body-detail">
                        <tr>
                          <td data-title="Momento">Hoy</td>
                          <td data-title="Importe">
                            ${local.importe_hoy ?? 0}
                          </td>
                          <td data-title="Comisión">
                            ${local.comision_hoy ?? 0}
                          </td>
                          <td data-title="Margen Comercial">
                            ${local.importe_hoy - local.comision_hoy||0}
                          </td>
                        </tr>
                        <tr>
                          <td data-title="Momento">Semana</td>
                          <td data-title="Importe">
                            ${local.importe_semana ?? 0}
                          </td>
                          <td data-title="Comisión">
                            ${local.comision_semana ?? 0}
                          </td>
                          <td data-title="Margen Comercial">
                            ${local.importe_semana - local.comision_semana||0}
                          </td>
                        </tr>

                        <tr className="trdetail">
                          <td data-title="Momento">Lunes</td>
                          <td data-title="Importe">${local.l ?? 0}</td>
                          <td data-title="Comisión">${local.cl ?? 0}</td>
                          <td data-title="Margen Comercial">
                            ${local.l - local.cl||0}{" "}
                          </td>
                        </tr>
                        <tr className="trdetail">
                          <td data-title="Momento">Martes</td>
                          <td data-title="Importe">${local.m ?? 0}</td>
                          <td data-title="Comisión">${local.cm ?? 0}</td>
                          <td data-title="Margen Comercial">
                            ${local.m - local.cm||0}{" "}
                          </td>
                        </tr>
                        <tr className="trdetail">
                          <td data-title="Momento">Miércoles</td>
                          <td data-title="Importe">${local.w ?? 0}</td>
                          <td data-title="Comisión">${local.cw ?? 0}</td>
                          <td data-title="Margen Comercial">
                            ${local.w - local.cw||0}{" "}
                          </td>
                        </tr>
                        <tr className="trdetail">
                          <td data-title="Momento">Jueves</td>
                          <td data-title="Importe">${local.j ?? 0}</td>
                          <td data-title="Comisión">${local.cj ?? 0}</td>
                          <td data-title="Margen Comercial">
                            ${local.j - local.cj||0}{" "}
                          </td>
                        </tr>
                        <tr className="trdetail">
                          <td data-title="Momento">Viernes</td>
                          <td data-title="Importe">${local.v ?? 0}</td>
                          <td data-title="Comisión">${local.cv ?? 0}</td>
                          <td data-title="Margen Comercial">
                            ${local.v - local.cv||0}{" "}
                          </td>
                        </tr>
                        <tr className="trdetail">
                          <td data-title="Momento">Sábado</td>
                          <td data-title="Importe">${local.s ?? 0}</td>
                          <td data-title="Comisión">${local.cs ?? 0}</td>
                          <td data-title="Margen Comercial">
                            ${local.s - local.cs||0}{" "}
                          </td>
                        </tr>
                        <tr className="trdetail">
                          <td data-title="Momento">Domingo</td>
                          <td data-title="Importe">${local.d ?? 0}</td>
                          <td data-title="Comisión">${local.cd ?? 0}</td>
                          <td data-title="Margen Comercial">
                            ${local.d - local.cd||0}{" "}
                          </td>
                        </tr>

                        <tr>
                          <td data-title="Momento">Mes</td>
                          <td data-title="Importe">
                            ${local.importe_mes ?? 0}
                          </td>
                          <td data-title="Comisión">
                            ${local.comision_mes ?? 0}
                          </td>
                          <td data-title="Margen Comercial">
                            ${local.importe_mes - local.comision_mes||0}{" "}
                          </td>
                        </tr>
                        <tr>
                          <td data-title="Momento">Año</td>
                          <td data-title="Importe">
                            ${local.importe_year ?? 0}
                          </td>
                          <td data-title="Comisión">
                            ${local.comision_year ?? 0}
                          </td>
                          <td data-title="Margen Comercial">
                            ${local.importe_year - local.comision_year||0}{" "}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <Accordion.Header
                    id="acordeonb"
                    style={{ display: "inline-block" }}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}
//#endregion
export default Trabajadores;
