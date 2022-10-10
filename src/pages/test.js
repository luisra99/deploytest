import React from "react";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import Alerta2 from "./notify.js";
import { Table, Row, Modal, Button } from "react-bootstrap";
import { MdEdit, MdDelete, MdAddCircle } from "react-icons/md";
import * as Yup from "yup";
import Accordion from "react-bootstrap/Accordion";
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
  const [show, setShow] = useState(false);
  const Close = () => {
    setShow(false);
  };

  const [modoEdicion, setmodoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [nombre, setnombre] = useState("");
  const [direccion, setdireccion] = useState("");
  const [provincia, setprovincia] = useState("");
  const [municipio, setmunicipio] = useState("");
  const [tipo, settipo] = useState(0);
  const [locales, setLocal] = useState([
    {"id":1,"direccion":"Matanzas, Jaguey, Calle 36","nombre":"Tienda Jaguey 2","tipo":0,"importe_hoy":null,"comision_hoy":null,"importe_semana":"24","comision_semana":"2","importe_mes":"24","comision_mes":"2","l":"24","cl":"2","m":null,"cm":null,"w":null,"cw":null,"j":null,"cj":null,"v":null,"cv":null,"s":null,"cs":null,"d":null,"cd":null,"trabajadores":"2","importe_year":"216","comision_year":"18"},{"id":35,"direccion":"Matanzas, Cardenas, Calle real entres espada y cuchillo","nombre":"Tienda de Cardenas","tipo":0,"importe_hoy":null,"comision_hoy":null,"importe_semana":null,"comision_semana":null,"importe_mes":null,"comision_mes":null,"l":null,"cl":null,"m":null,"cm":null,"w":null,"cw":null,"j":null,"cj":null,"v":null,"cv":null,"s":null,"cs":null,"d":null,"cd":null,"trabajadores":"1","importe_year":null,"comision_year":null}
  ]);
  function Load() {
    axios
      .get(process.env.REACT_APP_SERVER + "view/trabajador", {
        headers: {
          "Bypass-Tunnel-Reminder": 1,
        },
      })
      .then((response) => {
        setLocal(response.data);
      });
  }
  useEffect(() => {
    Load();
  }, []);
  const Editar = (id, nombre, direccion, tipo) => {
    setEditValues(nombre, direccion, tipo);
    setmodoEdicion(true);
    setId(id);
  };
  const Cancelar = () => {
    setShow(false);
    setmodoEdicion(false);
    setId(undefined);
    resetFields();
  };
  const Eliminar = (id) => {
    axios
      .delete(process.env.REACT_APP_SERVER + "local" + id, {
        headers: {
          "Bypass-Tunnel-Reminder": 1,
        },
      })
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
  const formikRef = useRef();

  useEffect(() => {
    formikRef.current.setFieldValue("nombre", nombre);
    formikRef.current.setFieldValue("direccion", direccion);
    formikRef.current.setFieldValue("provincia", provincia);
    formikRef.current.setFieldValue("municipio", municipio);
    formikRef.current.setFieldValue("tipo", tipo);
  }, [nombre, direccion, municipio, provincia, tipo]);

  const initialValues = {
    tipo: 0,
    municipio: "",
    nombre: "",
    direccion: "",
    provincia: "",
  };
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required(" *"),
    direccion: Yup.string().required(" *"),
    provincia: Yup.string().required(" *"),
    municipio: Yup.string().required(" *"),
    tipo: Yup.number(),
  });
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
              .post(process.env.REACT_APP_SERVER + "local", values, {
                headers: {
                  "Bypass-Tunnel-Reminder": 1,
                },
              })
              .then((response) => {
                Notificar(response);
                resetFields();
                Close();
                Load();
              });
          } else {
            axios
              .put(process.env.REACT_APP_SERVER + "local/" + id, values, {
                headers: {
                  "Bypass-Tunnel-Reminder": 1,
                },
              })
              .then((response) => {
                Notificar(response);
                resetFields();
                Close()
                Load();
              });
          }
        }}
      >
        {(props) => {
          // console.log(props);
          return (
            <Modal
              show={show}
              onExiting={Cancelar}
              onHide={Close}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Form className="Formi">
                <h4 style={{ textAlign: "center" }}>
                  {id !== undefined ? "Editar" : "Nuevo Local"}
                </h4>
                <div>
                  <Row>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
                      <label>Provincia </label>
                      <ErrorMessage
                        name="provincia"
                        render={(msg) => (
                          <span className="up-error">{msg}</span>
                        )}
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
                        render={(msg) => (
                          <span className="up-error">{msg}</span>
                        )}
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
                  
                      <button
                        className="btn btn-secondary col-xs-11 col-sm-5 col-md-5 col-lg-5"
                        variant="success"
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
          );
        }}
      </Formik>
      <div className="text-center">
      <h4>
        Locales{" "}
        <Button
          style={{ maxWidth: "150px" }}
          variant="success btn-sm"
          onClick={() => setShow(true)}
        >
          <MdAddCircle size={15} /> Agregar
        </Button>
      </h4>
        </div>
      {locales.map((local) => {
              return (
                <div className="details-card" key={local.id}>
                
                      <Accordion
              defaultActiveKey="1"
              flush
              className="text-center col-12"
              style={{ padding: "0px" }}
            >
              <Accordion.Item  style={{background:"none"}} eventKey="0">
             <h5>{local.nombre +" "+local.primer_apellido+" "+local.segundo_apellido}  </h5>  <h6><i>{local.direccion}</i></h6><h6>Contacto: <i>{local.contacto}</i></h6>  <h6>Salario Base: <i>$ {local.salario_base}</i></h6>  <h6>CI: <i>{local.ci}</i></h6>  
              <div className="text-center"> <button
                className="btn btn-sm"
                style={{padding:"0px",marginBottom:"3px", marginRight:"10px",color:"whitesmoke"}}
                onClick={() => {
                  setShow(true)
                  Editar(
                    local.id,
                    local.nombre,
                    local.direccion,
                    local.tipo
                  );
                }}
              >
                <MdEdit size={20} />
               
              </button>
              <button
                className="btn btn-sm"
                style={{padding:"0px",marginBottom:"3px",color:"whitesmoke"}}
                onClick={() => Eliminar(local.id)}
              >
                <MdDelete size={20} />
                
              </button> <Accordion.Header
                  style={{ display: "inline-block" ,marginTop:"3px"}}
                >
                  </Accordion.Header></div>
               
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
                <tr >
                  <td data-title="Momento">Hoy</td>
                  <td data-title="Importe">${local.importe_hoy??0}</td>
                  <td data-title="Comisión">${local.comision_hoy??0}</td>
                  <td data-title="Margen Comercial">${local.importe_hoy-local.comision_hoy} </td>
                </tr>
                <tr >
                  <td data-title="Momento">Semana</td>
                  <td data-title="Importe">${local.importe_semana??0}</td>
                  <td data-title="Comisión">${local.comision_semana??0}</td>
                  <td data-title="Margen Comercial">${local.importe_semana-local.comision_semana} </td>
                </tr>
              
                <tr className="trdetail" >
                  <td data-title="Momento">Lunes</td>
                  <td data-title="Importe">${local.l??0}</td>
                  <td data-title="Comisión">${local.cl??0}</td>
                  <td data-title="Margen Comercial">${local.l-local.cl} </td>
                </tr>
                <tr className="trdetail">
                  <td data-title="Momento">Martes</td>
                  <td data-title="Importe">${local.m??0}</td>
                  <td data-title="Comisión">${local.cm??0}</td>
                  <td data-title="Margen Comercial">${local.m-local.cm} </td>
                </tr>
                <tr className="trdetail">
                  <td data-title="Momento">Miércoles</td>
                  <td data-title="Importe">${local.w??0}</td>
                  <td data-title="Comisión">${local.cw??0}</td>
                  <td data-title="Margen Comercial">${local.w-local.cw} </td>
                </tr>
                <tr  className="trdetail">
                  <td data-title="Momento">Jueves</td>
                  <td data-title="Importe">${local.j??0}</td>
                  <td data-title="Comisión">${local.cj??0}</td>
                  <td data-title="Margen Comercial">${local.j-local.cj} </td>
                </tr>
                <tr className="trdetail">
                  <td data-title="Momento">Viernes</td>
                  <td data-title="Importe">${local.v??0}</td>
                  <td data-title="Comisión">${local.cv??0}</td>
                  <td data-title="Margen Comercial">${local.v-local.cv} </td>
                </tr>
                <tr className="trdetail">
                  <td data-title="Momento">Sábado</td>
                  <td data-title="Importe">${local.s??0}</td>
                  <td data-title="Comisión">${local.cs??0}</td>
                  <td data-title="Margen Comercial">${local.s-local.cs} </td>
                </tr><tr className="trdetail"  >
                  <td data-title="Momento">Domingo</td>
                  <td data-title="Importe">${local.d??0}</td>
                  <td data-title="Comisión">${local.cd??0}</td>
                  <td data-title="Margen Comercial">${local.d-local.cd} </td>
                </tr>

                <tr >
                  <td data-title="Momento">Mes</td>
                  <td data-title="Importe">${local.importe_mes??0}</td>
                  <td data-title="Comisión">${local.comision_mes??0}</td>
                  <td data-title="Margen Comercial">${local.importe_mes-local.comision_mes} </td>
                </tr>
                <tr >
                  <td data-title="Momento">Año</td>
                  <td data-title="Importe">${local.importe_year??0}</td>
                  <td data-title="Comisión">${local.comision_year??0}</td>
                  <td data-title="Margen Comercial">${local.importe_year-local.comision_year} </td>
                </tr>
              
          </tbody>
        </Table>
      </div>
        <Accordion.Header id="acordeonb" style={{display:"inline-block"}}/>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
      
    </div>)
            })
            }</div>
  );
}
export default Locales;
