
import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';
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
import Alert from '@material-ui/lab/Alert';
import Navbar from '../../components/left-navbar/drawer'

export default function MaterialTableDemo() {
      
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
    
    function validateEmail(email) {
        // eslint-disable-next-line
        const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01\x08\x0b\x0c\x0e\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01\x09\x0b\x0c\x0e\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01\x08\x0b\x0c\x0e\x1f\x21-\x5a\x53-\x7f]|\\[\x01\x09\x0b\x0c\x0e\x7f])+)\]))$/;
        return re.test(String(email).toLowerCase());
      }
  const [state, setState] = React.useState({
      columns: [
        {
        title: "", render: rowData => <Avatar maxInitials={1} size={40}
        round={true} name={rowData === undefined ? " " : rowData.name} />
        },
      { title: 'Name', field: 'name' },
      { title: 'email', field: 'email' },
      { title: 'Role', field: 'role'},
     
    ],
    data: [
      { name: 'Jonh Nguyen', email: 'john.nguyen@sjsu.edu', role:'Student'},
      {
        name: 'Jessica Brown',
        email: 'jessica.brown@sjsu.edu',
        role: 'Student',
        
      },
    ],
  });
  const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])
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
        if (newData.email === "@yahoo.com") {
            errorList.push("Invalid email")
          }
        if (errorList.length < 1) {
            const data = [...state.data];
                data.push(newData);
                setState({ ...state, data });
            resolve()
            setIserror(false)
            setErrorMessages([])
        }
        else {

        setErrorMessages(errorList)
        setIserror(true)
        resolve()
    }
    }
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
        if (errorList.length < 1) {
            const data = [...state.data];
            data[data.indexOf(oldData)] = newData;
            setState({ ...state, data });
            resolve()
            setIserror(false)
            setErrorMessages([])
        }
        else {

        setErrorMessages(errorList)
        setIserror(true)
        resolve()
    }
    }

  
        function Peo() {
            return <div style={{ color:'white'}} >
             {iserror &&
              <Alert severity="error" style={{ color:'white', fontSize: '20px' }}>
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>
                })}
              </Alert>
              }
            
            <MaterialTable
                title=""
                style={{
                    background: 'white', borderColor: "lightblue",
                    borderStyle: 'solid', width: '1000px',
                    color: 'white', fontSize: '16px', left:'100px',top:'100px'
                }}

                columns={state.columns}
                icons={tableIcons}
                data={state.data}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            handleRowAdd(newData, resolve)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            handleRowUpdate(newData, oldData, resolve)
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                const data = [...state.data];
                                data.splice(data.indexOf(oldData), 1);
                                setState({ ...state, data });
                            }, 600);
                        }),
                }}
                />
                </div> 
        }
        return (
            <Navbar Title=' People' content={Peo} style={{ color: 'red' }} />
        
    
        );
    }
