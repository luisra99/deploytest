import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Alert } from "react-bootstrap";

const Alerta = forwardRef((props, ref) => {
  const [tipoAlerta, setTipoAlerta] = useState("");
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");

  useImperativeHandle(ref, () => ({
    AlertaConfig(respuesta) {
      const tipo =
        respuesta.status > 300
          ? "danger"
          : respuesta.status < 200
          ? "primary"
          : "success";
      setTipoAlerta(tipo);
      setTitulo(respuesta.data.titulo);
      setMensaje(respuesta.data.mensaje);
    },
  }));
  return props.visible ? (
    <Alert variant={tipoAlerta} dismissible>
      <Alert.Heading>{titulo}</Alert.Heading>
      <p>{mensaje}</p>
    </Alert>
  ) : (
    ""
  );
});

export default Alerta;
