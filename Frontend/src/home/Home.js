import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom'
import Login from '../components/auth/Login'
import Logout from '../components/auth/Logout'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label, FormText } from 'reactstrap';

const axios = require("axios")

function App() {

  //Making sure that user is login
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
  const [create, setCreate] = useState(false);
  
  const [id, setID] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    findUser()
  }, [])

  function handleModal(){
    setCreate(!create)
  }

  async function findUser() {

    if (user.Name != null) window.location.href='/profile'

    let res = await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/getUser", JSON.stringify({}))
    let found = await res.data.Items.filter(elem => elem.AccountEmail === (user.email?user.email:user.AccountEmail))
    if (found.length === 0 && user) {
      setCreate(!create)
    }
    else if (found.length === 1 && user){
      let updateUser = {
        ...found[0],
        Name: user.name,
        FirstName: user.givenName,
        LastName: user.familyName,
      }
      localStorage.setItem('user', JSON.stringify(updateUser));
      window.location.href='/profile'
    }
  }

  function handleRole(event){
    setRole(event.target.value)
  }
  function handleID(event){
    setID(event.target.value)
  }
  async function handleClick(){
    if (id && role){
      handleModal()
      let body = JSON.stringify({
        AccountEmail: user.email,
        ContactInformation: user.email,
        AccessLevel: role,
        ProfilePictureURL: user.imageUrl,
        StudentID: parseInt(id),
      })
      let res = await axios.post("https://bvr02h55bk.execute-api.us-east-1.amazonaws.com/Prod/user", body)
      let updateUser = {
        AccountEmail: user.email,
        ContactInformation: user.email,
        AccessLevel: role,
        ProfilePictureURL: user.imageUrl,
        StudentID: parseInt(id),
        FirstName: user.givenName,
        LastName: user.familyName,
        Name: user.name
      }
      localStorage.setItem('user', JSON.stringify(updateUser));
      window.location.href='/profile'
    }
    else {
      alert("Fill in your School-ID and Role")
    }
  }

  return (
    <div className="App">
      <header className="App-header">

        <h1 id='home-title'>RE : CANVAS</h1>

        {user ? <Logout reload={true} /> : <Login reload={true} />}
      </header>

      <Modal id='home-modal' isOpen={create}>
        <ModalHeader toggle={handleModal} className='home-modal-title'>First Timer!</ModalHeader>
        <ModalBody className={""+create?"home-modal-body":''}>
        <Input type="email" name="email" id="exampleEmail" placeholder="School ID" onChange={handleID}/>
          <p id='home-modal-sub'>Are you a:</p>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" value = "Student" onClick={handleRole}/>{' '}
            Student
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="radio1" value = "Teacher" onClick={handleRole}/>{' '}
            Teacher
          </Label>
        </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>{handleClick()}}>Submit</Button>{' '}
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
