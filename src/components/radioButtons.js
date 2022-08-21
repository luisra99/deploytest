import React from 'react'
import Badge from 'react-bootstrap/Badge';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';  


function RadioButtons(props) {

  const{radios,pvalue}=props


  return (
        <ButtonGroup className="mb-2">
        {radios.map((radio, idx) => (
          <ToggleButton
          className='radio-buttons'
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            disabled={radio.counter==="0"}
            checked={pvalue === radio.value}
            onChange={(e) => props.onChange(e.currentTarget.value)}
          >
            {radio.name}{" "}
            <Badge pill bg="warning"
            style={radio.counter==="0"?{display:"none"}:{}}>{radio.counter}</Badge>
          </ToggleButton>
        ))}
      </ButtonGroup>

  )
}

export default RadioButtons;