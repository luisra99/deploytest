import React from "react";

function HomeCard(props) {
  const { header,children} = props;
  return (
    <div className="container home-card" >
<h2 className="home-header">{header}</h2>
<div className="row justify-content-around">
{children}
</div>
</div>
  );
}

export default HomeCard;
