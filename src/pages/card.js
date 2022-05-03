import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from "react-router-dom";
function ResumeCard(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <div className='text-center'>
        <label style={{fontSize:"35px"}}>${props.month}</label>
        <p>Este mes</p>
        </div>
        
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Este año: ${props.year}</ListGroup.Item>
        <ListGroup.Item>Esta semana: ${props.week}</ListGroup.Item>
        <ListGroup.Item>Este día: ${props.day}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <NavLink to={props.link}>Detalles</NavLink>
      </Card.Body>
    </Card>
  );
}

export default ResumeCard;