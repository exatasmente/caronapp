import React, { Component } from 'react';
import FormGroup from "rsuite";
import ControlLabel from "rsuite";
import FormControl from "rsuite";

class FormInput extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { name, label, accepter, ...rest } = this.props;
        return (
           <FormGroup>
              <ControlLabel>{label} </ControlLabel>
              <FormControl name={name} accepter={accepter} {...rest} />
           </FormGroup>
        );
    }
}
export default FormInput;