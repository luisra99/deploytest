import React from "react";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Row, Col } from "react-bootstrap";
import Alerta2 from "./notify.js";
import * as Yup from "yup";
import axios from "axios";

function MrmaForm({ id, close, load,totalp,alp,exp }) {
  //#region Contenido
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
  // useEffect(() => {
  //   if (productoEditable.productoExist.id !== "") {
  //     setEditValues();
  //   }
  // }, [productoEditable]);
  
  const [activeState, setActiveState] = useState(false);

  const [merma, setmerma] = useState("");
  const [idd, setid] = useState(67);
  const [total, settotal] = useState(totalp);
  const [av, setAv] = useState(exp);
  const [al, setAl] = useState(alp);
  const [totaln, settotaln] = useState(totalp);
  const [avn, setAvn] = useState(exp);
  const [aln, setAln] = useState(alp);
function setn(t,e,a) {
  settotaln(t)
  setAvn(e)
  setAln(a)
}
  function resetFields() {
    setActiveState(false);
    settotal("");
    setAl("");
    setAv("");
  }
  useEffect(() => {
if(merma===""){
  setn(total,av,al)
}else{
  if(merma>al){
setAvn(av-merma+al)
settotaln(total-merma)
setAln(0)

  }else{
settotaln(total-merma)
setAln(al-merma)
  }
}
  }, [merma]);
  //#endregion
  // function setEditValues() {
  //   settotal(productoEditable.productoExist.total);
  //   setAl(productoEditable.productoExist.almacen);
  //   setAv(productoEditable.productoExist.area_de_venta);
  // }
  //#region Referencias
  const formikRef = useRef();
  //#endregion

  // //#region useEffects
  // useEffect(() => {
  //   const totali = document.getElementById("inputTotal").value;
  //   const newVal = totali - al;
  //   newVal < 0 ? setAv("Déficit") : setAv(newVal);
  //   formikRef.current.setFieldValue("almacen", al);
  // }, [al, total]);
  // useEffect(() => {
  //   av === "Déficit"
  //     ? formikRef.current.setFieldValue("area_de_venta", "Déficit")
  //     : formikRef.current.setFieldValue("area_de_venta", av);
  // }, [av]);
  useEffect(() => {
    formikRef.current.setFieldValue("total", merma);
  }, [merma]);

  //#endregion
  //#region Valores iniciales
  const initialValues = {
    total: "",
    almacen: "",
    area_de_venta: "",
  };
  //#endregion
  //#region Esquema de Validación
  const validationSchema = Yup.object().shape({
    total: Yup.number()
      .typeError(" (valor numérico)")
      .required(" *")
      .max(total, " Inaceptable")
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
        onSubmit={(values, { resetForm }) => {
          var newVal = '{"total":"' + totaln + '","areav":"' + avn + '","almac":"' + aln + '","merma":"' + merma + '"}';
          const data = JSON.parse(newVal);
          
          axios
            .post(process.env.REACT_APP_SERVER + "productoexist/mermar/" + id, data, {
              headers: {
                "Bypass-Tunnel-Reminder": 1,
              },
            })
            .then((response) => {
              close(response);
              load();
            });
        }
        }
      >
        {(props) => {
          //  console.log(props);
          return (
            <Form className="Formi">
              <div onClick={hide}>
                <Alerta2 ref={childCompRef} visible={alerta} />
              </div>
              <div>
                <Row className="justify-content-center">
                  <div className="col-xs-12 col-sm-12 col-md-8 col-lg-4 ">
                  <label>Total </label>
                    <ErrorMessage
                      name="total"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="inputTotal"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="total"
                      placeholder="Total"
                      value={total}
                      pattern="[0-9]*"
                      onChange={(event) =>
                        settotal((v) =>
                          event.target.validity.valid ? event.target.value : v
                        )
                      }
                      /* Set onChange to handleChange */
                    />
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 ">
                    <label>Almacen </label>
                    <ErrorMessage
                      name="almacen"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="inputAlmacen"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="almacen"
                      placeholder="Almacen"
                      value={al}
                      style={
                        al === "Déficit" ? { color: "red" } : { color: "green" }
                      }
                      pattern="[0-9]*"
                      onChange={(event) =>
                        setAl((v) =>
                          event.target.validity.valid ? event.target.value : v
                        )
                      }
                      /* Set onChange to handleChange */
                    />
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 ">
                    <label>Exposición </label>
                    <ErrorMessage
                      name="area_de_venta"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="area_de_venta"
                      type="text"
                      value={av}
                      style={
                        av === "Déficit" ? { color: "red" } : { color: "green" }
                      }
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="area_de_venta"
                      placeholder="Área de venta"
                      /* Set onChange to handleChange */
                      disabled
                    />
                    <label>Estado Actual </label><br/>
                    <label><b>Total:</b> {total} <b>Almacen:</b> {al} <b>Exposición:</b> {av} </label><br/>
                    <label>Nuevo Estado </label><br/>
                    <p><b>Total:</b> {totaln} <b>Almacen:</b> {aln} <b>Exposición:</b> {avn} </p>
                  </div>
                </Row>
                <button
                  className="btn btn-primary col-12 col-sm-10 col-md-8 col-lg-7"
                  variant="success"
                  disabled={!props.isValid}
                  type="submit"
                  
                >
                  {id === undefined ? "Guardar" : "Actualizar"}
                </button>
              </div>
              </Form>
          );
        }}
      </Formik>
    </div>
  );
}
//#endregion
export default MrmaForm;
