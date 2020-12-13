import React, { Component } from 'react';
import { Col, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import TableRow from './TableRow';
import Drawer from '../components/left-navbar/drawer'

class Peo extends Component {
    state = {
        data: [{
             
            name: 'Mark Brown',
            email: 'mark.brown@sjsu.edu',
            role: 'Student'
        },
        {
            name: 'Jenny Smith',
            email: 'jenny.smith@sjsu.edu',
            role: 'Student',
        },
        {
            name: 'Marry Benoth',
            email: 'marry.benoth@sjsu.edu',
            role: 'Teacher',
        },
        {
            name: 'Jony Beckar',
            email: 'jonny.beckar@sjsu.edu',
            role: 'T.A'
        },
        {
            name: 'Jonh Mathe',
            email: 'jonh.mathe@sjsu.edu',
            role: 'Student'
        }
        ]
    }
    toggleAddModal = () => {
        this.setState(prevState => ({
            addModal: !prevState.addModal,
        }));
    }

    add = (event, { name, ...rest }) => {
        this.setState(prevState => {
            prevState.data[name] = rest;
            return { ...prevState, addModal: false };
        });
    }

    // edit = (name, values) => {
    //     this.setState(prevState => {
    //         prevState.data[name] = values;
    //         return prevState;
    //     });
    // }

    remove = (name) => {
        this.setState(prevState => {
        delete prevState.data[name];
            return prevState ;
        })
    } 
    render() {
        return (
            <div >
                <Drawer title='People'/> 
                <Row>
                    <Col style={{right:'155px'}}>
                        <Button className="float-right"
                        color="primary" 
                        onClick={this.toggleAddModal}>Add People</Button>
                    </Col>    
                </Row>
                <Row>
                  <p></p>
                </Row>
                <Row>
                <p></p>
                    <Table style={{color:'white',width:"1000px", border: 'solid',marginLeft: '300px'}}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>email</th>
                                <th>Role</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(this.state.data).map(key => {
                                const row = this.state.data[key];
                                return <TableRow key={key} name={key} {...row} remove={this.remove} />
                            })}
                        </tbody>
                    </Table>
                </Row>
               <div >
                <Modal isOpen={this.state.addModal} toggle={this.toggleAddModal} style={{marginTop:'100px'}}>
               
                    <AvForm onValidSubmit={this.add} style={{backgroundColor:'rgb(35, 48, 68)', color:'white'}}>
                        <ModalHeader toggle={this.toggleAddModal}>
                            Add a new Student
          </ModalHeader>
                        <ModalBody>
                          
                                <AvField label="Name" name="name" required />
                                <AvField label="email" name="email" required />
                                <AvField label="Role" name="role" required />
                        </ModalBody>
                        <ModalFooter>
                            <Button>Save</Button>
                        </ModalFooter>
                    </AvForm>
                    </Modal>
                    </div>
            </div>


       
            
       
        );
    }
}

export default Peo;

