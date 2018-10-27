import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import ViewPharmacy from './ViewPharmacy';
import AddPharmacy from './AddPharmacy';
import EditPharmacy from './EditPharmacy';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Pharmacy: []
    }
  }


  render() {
    return (
      <div className="App">
        <h1 className="text-center"> MEDICINE </h1>
        <hr />
        <Router>
          <div>
            <nav>

              <ul className="navbar-nav">
                <li className="nav-item" >
                  {/* <Link to="/add"> <button className="btn-xs btn-success"> Add Pharmacy</button>
                  </Link> */}
                </li>

              </ul>

            </nav>
            <div>
              <Route exact path="/" component={ViewPharmacy} />
              <Route exact path="/add" component={AddPharmacy} />
              <Route exact path="/edit/:id" component={EditPharmacy} />
            </div>
          </div>
        </Router>

        {/*  <br />
        <ViewPharmacy data={this.state} /> */}
      </div >
    );
  }
}


export default App;
