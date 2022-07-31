import React from "react";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Row, Col } from "react-bootstrap";
import Alerta2 from "./notify.js";
import * as Yup from "yup";
import axios from "axios";

function CrearExistencia({ id, close, load }) {
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
  const [productoEditable, setProductoEditable] = useState({
    productoExist: {
      id: "",
      descripcion: "",
      costo: "",
      precio: "",
      comision: "",
      merma_c: "",
      total: "",
      almacen: "",
      area_de_venta: "",
      createdAt: "",
      updatedAt: "",
      id_producto: "",
      id_talla: "",
      id_local: "",
      id_color: "",
    },
    productoDetails: {
      id: "",
      createdAt: "",
      updatedAt: "",
      id_subcategoria: "",
      id_curvatura: "",
      id_material: "",
    },
    productoCat: {
      id: "",
      sub_categoria: "",
      createdAt: "",
      updatedAt: "",
      id_categoria: "",
    },
  });
  const [categorias, setCategorias] = useState([]);
  const [subCategorias, setSubCategorias] = useState([]);
  const [subcats, setSubCategoriasFiltradas] = useState([]);
  const [tallas, setTallas] = useState([]);
  const [materiales, setMaterial] = useState([]);
  const [curvaturas, setCurvaturas] = useState([]);
  const [local, setLocal] = useState([]);
  const [colores, setColor] = useState([]);
  //#endregion
  //#region Relleno del Contenido
  useEffect(() => {
    if (id !== undefined) {
      axios
        .get(process.env.REACT_APP_SERVER + "productoexist/" + id,  {headers:{
          "Bypass-Tunnel-Reminder":1
        }})
        .then((response) => {
          setProductoEditable(response.data);
        });
    }
  }, [id]);
  useEffect(() => {
    if (productoEditable.productoExist.id !== "") {
      setEditValues();
    }
  }, [productoEditable]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER + "categoria",  {headers:{
      "Bypass-Tunnel-Reminder":1
    }}).then((response) => {
      setCategorias(response.data);
    });
  }, []);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER + "subcategoria",  {headers:{
        "Bypass-Tunnel-Reminder":1
      }})
      .then((response) => {
        setSubCategorias(response.data);
      });
  }, []);
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER + "talla",  {headers:{
      "Bypass-Tunnel-Reminder":1
    }}).then((response) => {
      setTallas(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER + "material",  {headers:{
      "Bypass-Tunnel-Reminder":1
    }}).then((response) => {
      setMaterial(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER + "color",  {headers:{
      "Bypass-Tunnel-Reminder":1
    }}).then((response) => {
      setColor(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER + "curvatura",  {headers:{
      "Bypass-Tunnel-Reminder":1
    }}).then((response) => {
      setCurvaturas(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER + "local",  {headers:{
      "Bypass-Tunnel-Reminder":1
    }}).then((response) => {
      setLocal(response.data);
    });
  }, []);
  //#endregion

  //#region Contenido Circunstancial
  const handleLoadSubCat = function (e) {
    formikRef.current.setFieldValue("id_categoria", parseInt(e.target.value));
    handleCategoria(parseInt(e.target.value));
  };
  function handleCategoria(id) {
    let temp = subCategorias.filter((subcategorias) => {
      return subcategorias.id_categoria === id;
    });
    setSubCategoriasFiltradas(temp);
  }
  //#endregion

  //#region Variables
  const [activeState, setActiveState] = useState(false);
  const [costo, setcosto] = useState("");
  const [precio, setprecio] = useState("");
  const [comision, setcomision] = useState("");
  const [total, settotal] = useState("");
  const [av, setAv] = useState("");
  const [al, setAl] = useState("");

  function resetFields() {
    setActiveState(false);
    setcosto("");
    setprecio("");
    setcomision("");
    settotal("");
    setAl("");
    setAv("");
    formikRef.current.setFieldValue("id_categoria", -1);
  }
  //#endregion
  function setEditValues() {
    formikRef.current.setFieldValue(
      "id_local",
      productoEditable.productoExist.id_local
    );
    formikRef.current.setFieldValue(
      "id_talla",
      productoEditable.productoExist.id_talla
    );
    formikRef.current.setFieldValue(
      "id_curvatura",
      productoEditable.productoDetails.id_curvatura
    );
    formikRef.current.setFieldValue(
      "id_material",
      productoEditable.productoDetails.id_material
    );
    formikRef.current.setFieldValue(
      "descripcion",
      productoEditable.productoExist.descripcion
    );
    formikRef.current.setFieldValue(
      "id_color",
      productoEditable.productoExist.id_color
    );
    formikRef.current.setFieldValue(
      "merma_c",
      productoEditable.productoExist.merma_c
    );
    setActiveState(productoEditable.productoExist.merma_c)
    setcosto(productoEditable.productoExist.costo);
    setprecio(productoEditable.productoExist.precio);
    setcomision(productoEditable.productoExist.comision);
    settotal(productoEditable.productoExist.total);
    setAl(productoEditable.productoExist.almacen);
    setAv(productoEditable.productoExist.area_de_venta);
  }
  //#region Referencias
  const formikRef = useRef();
  //#endregion

  //#region useEffects
  useEffect(() => {
    const totali = document.getElementById("inputTotal").value;
    const newVal = totali - al;
    newVal < 0 ? setAv("Déficit") : setAv(newVal);
    formikRef.current.setFieldValue("almacen", al);
  }, [al, total]);
  useEffect(() => {
    av === "Déficit"
      ? formikRef.current.setFieldValue("area_de_venta", "Déficit")
      : formikRef.current.setFieldValue("area_de_venta", av);
  }, [av]);
  useEffect(() => {
    formikRef.current.setFieldValue("costo", costo);
    formikRef.current.setFieldValue("precio", precio);
    formikRef.current.setFieldValue("comision", comision);
    formikRef.current.setFieldValue("total", total);
  }, [costo, precio, comision, total]);

  //#endregion
  //#region Valores iniciales
  const initialValues = {
    // id_categoria:"-1",
    id_local: -1,
    id_material: -1,
    id_subcategoria: -1,
    id_talla: -1,
    id_curvatura: -1,
    descripcion: "",
    costo: "",
    precio: "",
    comision: "",
    merma_c: false,
    id_color: "#A67B5B",
    total: "",
    almacen: "",
    area_de_venta: "",
    color: "#A67B5B",
  };
  //#endregion
  //#region Esquema de Validación
  const validationSchema = Yup.object().shape({
    id_local: Yup.number().moreThan(-1),
    id_categoria: id === undefined ? Yup.number().moreThan(-1) : Yup.number(),
    id_subcategoria:
      id === undefined ? Yup.number().moreThan(-1) : Yup.number(),
    id_material: id === undefined ? Yup.number().moreThan(-1) : Yup.number(),
    id_talla: Yup.number().moreThan(-1),
    id_curvatura: Yup.number().moreThan(-1),
    descripcion: Yup.string().required(" (especifique)"),
    costo: Yup.number()
      .typeError(" (valor numérico)")
      .required(" *")
      .moreThan(0, " Inaceptable"),
    precio: Yup.number()
      .when("merma_c", (merma_c, field) =>
        !merma_c ? field.min(costo, " Pérdida") : field
      )
      .typeError(" (valor numérico)")
      .required(" *")
      .moreThan(0),
    comision: Yup.number().typeError(" (valor numérico)").required(" *").min(0),
    total: Yup.number()
      .typeError(" (valor numérico)")
      .required(" *")
      .moreThan(0, " Inaceptable"),
    almacen: Yup.number()
      .max(total, " Déficit")
      .typeError(" (valor numérico)")
      .required(" *")
      .min(0),
    area_de_venta: Yup.number()
      .typeError(" (valor numérico)")
      .required(" *")
      .min(0),
    merma_c: Yup.boolean(),
    id_color: Yup.number().moreThan(-1),
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
          if (id === undefined) {
            axios
              .post(process.env.REACT_APP_SERVER + "productoexist", values,  {headers:{
                "Bypass-Tunnel-Reminder":1
              }})
              .then((response) => {
                Notificar(response);
                response.data.titulo = "Producto Creado" ? resetForm() : "";
                resetFields();
              });
          } else {
            axios
              .put(process.env.REACT_APP_SERVER + "productoexist/" + id, values,  {headers:{
                "Bypass-Tunnel-Reminder":1
              }})
              .then((response) => {
                close(response);
                load();
              });
          }
        }}
      >
        {(props) => {
          // console.log(props);
          return (
            <Form className="Formi">
              <div onClick={hide}>
                <Alerta2 ref={childCompRef} visible={alerta} />
              </div>
              <div>
                {id !== undefined ? (
                  <h4 style={{ textAlign: "center" }}>Editar</h4>
                ) : (
                  ""
                )}
                <label>Local </label>
                <Field as="select" className="form-control" name="id_local">
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
              {id === undefined ? (
                <div>
                  <Row>
                    <Col>
                      <label>Categoría </label>
                      <Field
                        as="select"
                        className="form-control"
                        name="id_categoria"
                        onChange={handleLoadSubCat}
                      >
                        <option key="-1" value="-1">
                          Seleccione una categoría
                        </option>
                        {categorias.map((categoria) => (
                          <option key={categoria.id} value={categoria.id}>
                            {categoria.categoria}
                          </option>
                        ))}
                      </Field>
                    </Col>
                    <Col>
                      <label>SubCategoría </label>
                      <Field
                        as="select"
                        className="form-control"
                        name="id_subcategoria"
                      >
                        <option key="-1" value="-1">
                          Seleccione una sub-categoría
                        </option>
                        {subcats.map((subCategoria) => (
                          <option key={subCategoria.id} value={subCategoria.id}>
                            {subCategoria.sub_categoria}
                          </option>
                        ))}
                      </Field>
                    </Col>
                  </Row>
                </div>
              ) : (
                ""
              )}
              <div>
                <Row>
                  <Col>
                    <label>Talla </label>
                    <Field as="select" className="form-control" name="id_talla">
                      <option key="0" value="0">
                        Standar
                      </option>
                      <option key="-1" value="-1">
                        Seleccionar Talla
                      </option>
                      {tallas.map((talla) => (
                        <option key={talla.id} value={talla.id}>
                          {talla.talla}
                        </option>
                      ))}
                    </Field>
                  </Col>
                  <Col>
                    <label>Curvatura </label>
                    <Field
                      as="select"
                      className="form-control"
                      name="id_curvatura"
                    >
                      <option key="0" value="0">
                        Standar
                      </option>
                      <option key="-1" value="-1">
                        Seleccionar Curvatura
                      </option>
                      {curvaturas.map((curvatura) => (
                        <option key={curvatura.id} value={curvatura.id}>
                          {curvatura.curvatura}
                        </option>
                      ))}
                    </Field>
                  </Col>
                  {id === undefined ? (
                    <Col>
                      <label>Material </label>
                      <Field
                        as="select"
                        className="form-control"
                        name="id_material"
                      >
                        <option key="-1" value="-1">
                          Seleccionar Material
                        </option>
                        {materiales.map((material) => (
                          <option key={material.id} value={material.id}>
                            {material.material}
                          </option>
                        ))}
                      </Field>
                    </Col>
                  ) : (
                    ""
                  )}
                </Row>
              </div>
              <Row>
                <Col>
                  <label>Descripción </label>
                  <ErrorMessage
                    name="descripcion"
                    render={(msg) => <span className="up-error">{msg}</span>}
                  />
                  <Field
                    className="form-control"
                    id="inputDescrip"
                    type="text"
                    name="descripcion"
                    placeholder="Descripción"
                  />
                </Col>
                <Col>
                  <label>Color </label>
                  <Field as="select" className="form-control" name="id_color">
                    <option key="-1" value="-1">
                      Seleccionar Color
                    </option>
                    {colores.map((color) => (
                      <option key={color.id} value={color.id}>
                        {color.color}
                      </option>
                    ))}
                  </Field>
                </Col>
                <Col>
                  <label>
                    MC
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
                </Col>
              </Row>
              <div>
                <Row>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 ">
                    <label>Costo</label>
                    <ErrorMessage
                      name="costo"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="inputCosto"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="costo"
                      placeholder="Costo"
                      value={costo}
                      pattern="[0-9]*"
                      onChange={(event) =>
                        setcosto((v) =>
                          event.target.validity.valid ? event.target.value : v
                        )
                      }
                      /* Set onChange to handleChange */
                    />
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 ">
                    <label>Precio </label>
                    <ErrorMessage
                      name="precio"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="inputPrecio"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="precio"
                      placeholder="Precio"
                      value={precio}
                      pattern="[0-9]*"
                      onChange={(event) => {
                        setprecio((v) =>
                          event.target.validity.valid ? event.target.value : v
                        );
                      }}
                      /* Set onChange to handleChange */
                    />
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 ">
                    <label>Comisión </label>
                    <ErrorMessage
                      name="comision"
                      render={(msg) => <span className="up-error">{msg}</span>}
                    />
                    <Field
                      className="form-control"
                      id="inputComision"
                      type="text"
                      /* This name property is used to access the value of the form element via values.nameOfElement */
                      name="comision"
                      placeholder="Comisión"
                      value={comision}
                      pattern="[0-9]*"
                      onChange={(event) =>
                        setcomision((v) =>
                          event.target.validity.valid ? event.target.value : v
                        )
                      }
                      /* Set onChange to handleChange */
                    />
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 ">
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
                  </div>
                </Row>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-primary col-xs-11 col-sm-7 col-md-7 col-lg-7"
                  variant="success"
                  disabled={!props.isValid}
                  type="submit"
                  style={{
                    margin: "10px",
                  }}
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
export default CrearExistencia;
