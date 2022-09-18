import React from "react";

function HomeCardBody(props) {
  const { title,value,type} = props;
  return (
  type==="primary"?<div className="text-center col-4 col-sm-4 col-md-4 col-xl-4  " style={{minWidth:"max-content",marginBottom:"10px"}}>
  <h3 className="home-title">{title}</h3>
  <h4 className="home-main-value">${value===null?"0":value}</h4>
  </div>:
<div className="text-center col-2 col-sm-1 col-md-1 col-xl-1  " style={{minWidth:"max-content",marginBottom:"10px"}}>
  <h4 className="week-day">{title}</h4>
  <h5 className="home-sec-value">${value===null?"0":value}</h5>
  </div>

  );
}

export default HomeCardBody;
