import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { MdInfoOutline, MdDone, MdWarningAmber } from "react-icons/md";

const Alerta2 = forwardRef((props, ref) => {
  const [tipoAlerta, setTipoAlerta] = useState("danger");
  const [titulo, setTitulo] = useState("Venta satisfactoria");
  const [mensaje, setMensaje] = useState(
    "El producto se ha vendido correctamente"
  );
  const [icono, setIcono] = useState(<MdWarningAmber size={20} />);

  useImperativeHandle(ref, () => ({
    AlertaConfig(respuesta) {
      const ico =
        respuesta.data.status === "danger" ? (
          <MdWarningAmber size={20} />
        ) : respuesta.data.status === "primary" ? (
          <MdInfoOutline size={20} />
        ) : (
          <MdDone size={20} />
        );
      setTipoAlerta(respuesta.data.status);
      setIcono(ico);
      setTitulo(respuesta.data.titulo);
      setMensaje(respuesta.data.mensaje);
    },
  }));
  return props.visible ? (
    <ToastContainer
      position={"bottom-end"}
      className="position-fixed"
      style={{ padding: "10px", zIndex: "100" }}
    >
      <Toast
        onClose={() => ref.hide}
        bg={tipoAlerta}
        delay={3000}
        autohide={true}
      >
        <Toast.Header>
          {icono}
          <strong
            style={{ marginLeft: "5px", color: "#2d2d2d" }}
            className="me-auto"
          >
            {titulo}
          </strong>
        </Toast.Header>
        <Toast.Body>
          <strong style={{ color: "whitesmoke" }}>{mensaje}</strong>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  ) : (
    ""
  );
});

export default Alerta2;
