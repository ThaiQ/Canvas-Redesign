
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import Navbar from '../../components/left-navbar/drawer'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} style={{ color:'white'}}  />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} style={{ color:'white'}}/>),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}  />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}  />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}  />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} style={{ color:'white'}} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}  />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}  />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}  />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} style={{ color:'white'}}/>),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} style={{ color:'white'}} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}  />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),

};

// const api = axios.create({
//   baseURL: `https://reqres.in/api`
// })


function validateEmail(email) {
  // eslint-disable-next-line
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01\x08\x0b\x0c\x0e\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01\x09\x0b\x0c\x0e\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01\x08\x0b\x0c\x0e\x1f\x21-\x5a\x53-\x7f]|\\[\x01\x09\x0b\x0c\x0e\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

function People() {

  var columns = [
    { title: "id", field: "id", hidden: true },
    { title: "", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.first_name} /> },
    { title: "Name", field: "name" },
    { title: "email", field: "email" },
    { title: "Role", field: "role" }
  ]
  const [data, setData] = useState({
    //  [
    //   { name: 'Jonh Nguyen', email: 'john.nguyen@sjsu.edu', role: 'Student' }
    //   name: 'Jessica Brown', email:'jessica.brown@sjsu.edu',role:'T.A'},
    //  ]
  }); //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  // useEffect(() => {
  //   //  api.get("/users")
  //   api.get("")
  //     .then(res => {
  //       setData(res.data.data)
  //     })
  //     .catch(error => {
  //       console.log("Error")
  //     })
  // }, [])

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if (newData.name === "") {
      errorList.push("Please enter name")
    }
    if (newData.role === "") {
      errorList.push("Please enter role")
    }
    if (newData.email === "" || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email")
    }
    if (newData.email === "cmpe133group@yahoo.com") {
      errorList.push("Invalid email")
    }


    // if (errorList.length < 1) {
    //   api.patch("/users/" + newData.id, newData)
    //     .then(res => {
    //       const dataUpdate = [...data];
    //       const index = oldData.tableData.id;
    //       dataUpdate[index] = newData;
    //       setData([...dataUpdate]);
    //       resolve()
    //       setIserror(false)
    //       setErrorMessages([])
    //     })
    //     .catch(error => {
    //       setErrorMessages(["Update failed! Server error"])
    //       setIserror(true)
    //       resolve()

    //     })
    // } else {
    //   setErrorMessages(errorList)
    //   setIserror(true)
    //   resolve()

    // }

  }

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = []
    if (newData.name === undefined) {
      errorList.push("Please enter name")
    }
    if (newData.role === undefined) {
      errorList.push("Please enter role")
    }
    if (newData.email === undefined || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email")
    }
    if (newData.email === "cmpe133group@yahoo.com") {
      errorList.push("Invalid email")
    }


    // if (errorList.length < 1) { //no error
    //   api.post("/users", newData)
    //     .then(res => {
    //       let dataToAdd = [...data];
    //       dataToAdd.push(newData);
    //       setData(dataToAdd);
    //       resolve()
    //       setErrorMessages([])
    //       setIserror(false)
    //     })
    //     .catch(error => {
    //       setErrorMessages(["Cannot add data. Server error!"])
    //       setIserror(true)
    //       resolve()
    //     })
    // } else {
    //   setErrorMessages(errorList)
    //   setIserror(true)
    //   resolve()
    // }


  }

  const handleRowDelete = (oldData, resolve) => {

    // api.delete("/users/" + oldData.id)
    //   .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      // .catch(error => {
      //   setErrorMessages(["Delete failed! Server error"])
      //   setIserror(true)
      //   resolve()
      // })
  }

function Peo(){
  return  <List style={{ color:'white'}}>
      <Grid container spacing={1} style={{ color:'white'}} >
        <Grid item xs={3} style={{ color:'white'}}></Grid>
        <Grid item xs={6} style={{ color:'white'}} >
        <div style={{ color:'white'}} >
            {iserror &&
              <Alert severity="error" style={{ color:'white' }}>
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>
                })}
              </Alert>
            }
          </div>
          <MaterialTable
          style={{ borderColor: "lightblue", borderStyle: 'solid', width: '900px', color:'white', fontSize:'20px',background:'white' }}
            title=""
            columns={columns}
            data={data}
            icons={tableIcons}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);
                }),
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleRowAdd(newData, resolve)
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve)
                }),
            }}
          />
        </Grid>
        <Grid item xs={3} style={{ color:'white'}}></Grid>
      </Grid>
    </List>
}
     return(
      <Navbar Title=' People' content={Peo} />
      
  );
    
  
     }

export default People;

const List = styled.div`
   
    margin: 170px ;
    /* width: 200px;  */
   
    position: absolute; 
    left: -150px;
    `;