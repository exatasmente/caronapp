import React, { Component } from 'react';
import {ControlLabel, DatePicker, FormGroup, ErrorMessage} from "rsuite";


class InputDate extends Component {
    constructor(props) {
        super(props);
    }

   
    render() {
        const { name, onSelect, errorMessage, format, ...rest} = this.props;
        const errorVisible = errorMessage != null
        return (
           <FormGroup>
              <ControlLabel>{name} </ControlLabel>
              <DatePicker 
              format = {format}
              onSelect = {onSelect}
              locale={{
                  sunday: 'Dom',
                  monday: 'Seg',
                  tuesday: 'Ter',
                  wednesday: 'Qua',
                  thursday: 'Qui',
                  friday: 'Sex',
                  saturday: 'Sab',
                  ok: 'OK',
                  today: 'Hoje',
                  yesterday: null,
                  hours: 'Horas',
                  minutes: 'Minutos',
                  seconds: 'Segundos'
               }} 
               { ...rest }
               />
              <ErrorMessage style={{ display: errorVisible ? 'block' : 'none', color: 'red', marginTop: 6 }} show={errorVisible} > 
                {errorMessage} 
                
              </ErrorMessage>
              
           </FormGroup>
        );
    }


}
export default InputDate;