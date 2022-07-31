import React from "react";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Row, Col } from "react-bootstrap";
import Alerta2 from "./notify.js";
import * as Yup from "yup";
import axios from "axios";
import { GiAvoidance } from "react-icons/gi";

function MrmaForm({ id, close, load,totalp,alp,exp,mrmc,p,c }) {
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
  const [precion, setprecion] = useState(p);
  const [avmc, setavmc] = useState(0);
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

  const formikRef = useRef();
  //#endregion

  useEffect(() => {
    formikRef.current.setFieldValue("total", merma);
    formikRef.current.setFieldValue("avmc", avmc);
    formikRef.current.setFieldValue("precio", precion);
  }, [merma,avmc,precion]);

  //#endregion
  //#region Valores iniciales
  const initialValues = {
    total: "",
    almacen: "",
    area_de_venta: "",
    merma_c: false,
avmc:""
  };
  //#endregion
  //#region Esquema de Validación
  const validationSchema = Yup.object().shape({
    total: Yup.number()
      .typeError(" (valor numérico)")
      .required(" *")
      .max(total, " Inaceptable"),
    merma_c: Yup.boolean(),
      avmc: Yup.number()
      .when(["merma_c"],{
        is:(merma_c)=>merma_c===true,
        then: Yup.number().typeError(" (valor numérico)").max(merma, " Inaceptable").required(" *")
      }),
      precio: Yup.number()
      .when(["merma_c"],{
        is:(merma_c)=>merma_c===true,
        then: Yup.number().typeError(" (valor numérico)").max(p, " Mayor que el precio actual").required(" *")
      }),

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
          var newVal = '{"total":' + totaln + ',"areav":' + avn + ',"almac":' + aln + ',"merma":' + merma + ',"merma_c":' + activeState + ',"avmrc":' + avmc + ',"precion":' + precion + '}';
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
            <Form className="Formi" style={{margin:"15px"}}>
              <div onClick={hide}>
                <Alerta2 ref={childCompRef} visible={alerta} />
              </div>
              <div>
                <Row className="justify-content-center">
                  <div className="col-12">
                    <label>Mermar </label>
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
                      value={merma}
                      pattern="[0-9]*"
                      onChange={(event) =>
                        setmerma((v) =>
                        event.target.value===""?event.target.value:event.target.validity.valid ? event.target.value :v
                        )
                      }
                      /* Set onChange to handleChange */
                    />
                  </div>
                  <div className="col-12" >
                   {
                    !mrmc?<div><div>
                      <label>Area de venta (Merma Comercial) </label>
                    <ErrorMessage
                      name="avmc"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    </div>
                    <div style={{display:"flex"}}>
                    <Field
                      className="form-control"
                      id="inputTotal"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="avmc"
                      placeholder={!activeState?"Merma Comercial":"Area de Venta"}
                      value={avmc}
                      disabled={!activeState}
                      pattern="[0-9]*"
                      onChange={(event) =>
                        setavmc((v) =>
                        event.target.value===""?event.target.value:event.target.validity.valid ? event.target.value : v
                        )
                      }
                      /* Set onChange to handleChange */
                    /><label>
                    <Field
                      className="form-check"
                      type="checkbox"
                      id="merma_c"
                      name="merma_c"
                      style={{
                        marginRight: "30%",
                        marginLeft: "30%",
                        marginTop: "5px",
                      }}
                      checked={activeState}
                      onClick={() => {
                        setActiveState(!activeState);
                      }}
                    />
                  </label>
                  
                  </div>
                  <div>
                  <label>Precio </label>
                    <ErrorMessage
                      name="precio"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                  <Field
                      className="form-control"
                      id="inputTotal"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="precio"
                      value={precion}
                      disabled={!activeState}
                      pattern="[0-9]*"
                      onChange={(event) =>
                        setprecion((v) =>
                        event.target.value===""?event.target.value:event.target.validity.valid ? event.target.value : v
                        )
                      }
                      /* Set onChange to handleChange */
                    />
                  </div></div>:""
                    }
                    </div>
                  <div className="col-12">
                    <label><b> Costo:</b> {c} </label> <label> <b>Precio:</b> {p} </label> <br/>
                    <label>Estado Actual </label><br/>
                    <label><b> Total:</b> {total} </label> <label> <b>Almacen:</b> {al} </label> <label> <b> Exposición:</b> {av} </label><br/>
                    <label>Nuevo Estado </label><br/>
                    <label><b> Total:</b> {totaln} </label> <label> <b>Almacen:</b> {aln} </label> <label> <b> Exposición:</b> {avn} </label><br/>
                  </div>
                </Row>
                <button
                  className="btn btn-primary col-12 "
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
