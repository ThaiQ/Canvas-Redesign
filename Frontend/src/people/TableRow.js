import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { AvForm, AvInput } from 'availity-reactstrap-validation';

class Peo extends Component {
  state = {};
//   edit = () => {
//     this.setState(prevState => ({
//       editing: !prevState.editing,
//     }));
//   }

  save = (event, values) => {
    this.setState(prevState => ({
      editing: !prevState.editing,
    }));
    this.props.edit(this.props.name, values);
  }

  remove = () => {
    this.props.remove(this.props.name);
  }
  render() {
    return (
        <tr>
        <td>
          {this.state.editing
            ? <AvForm onValidSubmit={this.save}>
            <AvInput name="name" defaultValue={this.props.name} /> 
            </AvForm>
             : this.props.name}
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
        {/* <td>
        <Button color="info" onClick={this.edit}>{this.state.editing ? 'Cancel' : 'Edit'}</Button>
        </td> */}
        <td><Button outline color="primary" onClick={this.remove}>Remove</Button></td>
      </tr>
    )
  }
}

export default Peo;
