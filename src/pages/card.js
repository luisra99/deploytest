import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from "react-router-dom";
function ResumeCard(props) {
  return (
    <div className=" col-12 col-sm-6 col-xs-6 col-md-5 col-lg-4 col-xl-3" style={{marginBottom:"12px"}} >
<div className="resume-card card-body p-3" style={{borderRadius: "1rem",
boxShadow: "rgba(0, 0, 0, 0.3) 0px 10px 9px 0px",margin:"5px"}}>
          <div className="row">
            
              <div className="numbers">
                <h2 className="text-sm mb-0 text font-weight-bold">
                  <b style={{color: "#2c6975",textShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px"}}>{props.titulo}</b>
                </h2>
                <h3 className="font-weight-bolder mb-0" style={{color:"#68b2a0" ,textShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px"}}><b>{"$ "+ (props.valor===null?"0":props.valor)}</b></h3>
                <h5 className="text-sm mb-0 text-weight-bolder" style={{color: "#2c6975",textShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px"}}><b>{props.etitulo}</b>
                </h5>
                <h5 className="font-weight-bold mb-0" style={{color:"#2c6975" ,textShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px"}}><b>{"$ "+ (props.evalor===null?"0":props.evalor)}</b></h5>
              </div>
          </div>
      </div>
</div>
  );
}

export default ResumeCard;