# What you need to run this project?
1. NodeJS
    - `window and mac`: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

    - if using linux `sudo apt install nodejs` and `sudo apt install npm`

To check for you installation:
```
node --version
npm --version
```
![image](https://user-images.githubusercontent.com/18486562/101970610-3aca9480-3be0-11eb-8696-2753eca4e455.png)

<br><br><br><br>

# Backend and Tests
The backend is developed with NodeJS and Amazon Web Services (AWS) using Javascript.

The infrastructure can be descibe as:
- API gateway: handle RESTful API requests
- Lambda: Amazon Serverless service to deploy RESTful API handlers
- Dynamodb: Amazon's NoSQL Database

![infra](https://user-images.githubusercontent.com/18486562/99199635-654a3e80-2755-11eb-8a14-b4c40e1746a0.png)

<br><br>

## Running Unit tests
Requirements:
* Tests are defined in the \_\_tests__ folder in this project. Use `npm` to install the [Jest test framework](https://jestjs.io/) and run unit tests.
```bash
npm install
npm run test
```

![image](https://user-images.githubusercontent.com/18486562/101970933-65b5e800-3be2-11eb-89b9-104c3f9fa991.png)

<br><br>

# Frontend
Frontend is developed using [React](https://reactjs.org/), [Material](https://material-ui.com/), and [Reactstrap](https://reactstrap.github.io/), use `npm` to install the dependencies and run React.
```bash
cd ./Frontend
npm install
npm start
```

## Visit Git Repository
[https://github.com/ThaiQ/cmpe133project](https://github.com/ThaiQ/cmpe133project)