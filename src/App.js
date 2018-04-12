import React from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import StudentsPage from './containers/StudentsPage';
import AddStudentPage from './containers/AddStudentPage';
import ModifyStudentPage from './containers/ModifyStudentPage';
// Assets
import logo from './images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <nav className="main-nav">
                        <ul>
                        <li><NavLink activeClassName="selected" to ="/students/1">Student List</NavLink></li>
                            <li><NavLink activeClassName="selected" to ="/addStudents">Add Students</NavLink></li>
                        </ul>
                    </nav>
                </div>

                <div className="container">
                    <Route path="/students/:pageNo?" component={StudentsPage}/>
                    <Route path="/addStudents" component={AddStudentPage}/>
                    <Route path="/editStudents/:id" component={ModifyStudentPage}/>
                </div>
            </div>
        </Router>
    );
};

export default App;
