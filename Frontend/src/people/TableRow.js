import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { AvForm, AvInput } from 'availity-reactstrap-validation';

class Peo extends Component {
  state = {};
  save = (event, values) => {
    this.setState(prevState => ({
        editing: !prevState.editing, 
    }));
    this.props.edit(this.props.username, values);
  }

  remove = () => {
    this.props.remove(this.props.id);
  }
  render() {
    return (
        <tr>
        <td>
          {this.state.editing
            ? <AvForm onValidSubmit={this.save}>
            <AvInput name="username" defaultValue={this.props.username} /> 
            </AvForm>
             : this.props.username}
            </td>
            <td>
          {this.state.editing
            ? <AvForm onValidSubmit={this.save}>
            <AvInput name="email" defaultValue={this.props.email} />        
            </AvForm>
            : this.props.email}
            </td>
            <td>
            {this.state.editing
            ? <AvForm onValidSubmit={this.save}>
            <AvInput name="role" defaultValue={this.props.role} />        
            </AvForm>
            : this.props.role}
        </td>
        <td><Button outline color="primary" onClick={this.remove}>Remove</Button></td>
      </tr>
    )
  }
}

export default Peo;
