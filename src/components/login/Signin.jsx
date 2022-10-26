import React from "react";
import './signin.css';
import logo  from '../../images/logo512.png'
function Login() {
  
  return (

    
<main className="form-signin w-100 m-auto text-center" style={{height:'100vh',width:'100vh',backgroundColor:"#e0ecde",backgroundSize:'cover'}}>
  <form>
    <div className="form-floating">
      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
      <label htmlFor="floatingInput">Usuario</label>
    </div>
    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
      <label htmlFor="floatingPassword">Contraseña</label>
    </div>

    <div className="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"/> Recordar
      </label>
    </div>
    <button className="w-100 btn btn-lg btn-primary" type="submit" style={{backgroundColor: '#00465a'}}>Acceder</button>
    
  </form>
</main>


    

  );
};
export default Login;