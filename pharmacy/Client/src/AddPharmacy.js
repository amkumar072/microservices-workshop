import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'

class AddPharmacy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pharmacy: {
                Name: '',
                BatchNo: '',
                ExpirationDate: '',
                Price: '',
                Type: ''
            }
        }
    }
    onAdd = async (event) => {
        event.preventDefault();
        this.setState({
            pharmacy: {
                Name: event.target.Name.value,
                BatchNo: event.target.BatchNo.value,
                ExpirationDate: event.target.ExpirationDate.value,
                Price: event.target.Price.value,
                Type: event.target.Type.value,
            }
        })

        setTimeout(async () => {

            await axios({
                url: 'http://localhost:3002/api/medicine',
                method: 'post',
                data: this.state.pharmacy
            })
            this.props.history.push('/')
        }, 1000);
    }

    render() {
        return (

            <div className="container col-md-4">
            <h3> Add </h3>
                <br />
                <form onSubmit={this.onAdd} >
                    <div className="form-group">
                        <label htmlFor="Name">Name :</label>
                        <input type="text" className="form-control" name="Name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="BatchNo">BatchNo :</label>
                        <input type="text" className="form-control" name="BatchNo" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ExpirationDate">Expiration Date :</label>
                        <input type="date" className="form-control" name="ExpirationDate"
                             required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Price">Price :</label>
                        <input type="number" className="form-control" name="Price" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Type">Type :</label>
                        <select className="form-control" name="Type" >
                            <option value="Capsule">Capsule</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Syrup">Syrup</option>
                            <option value="Gel">Gel</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">Save</button> &nbsp;
                    <button type="reset" className="btn btn-danger">Reset</button>
                    <Link to='/'>   <button className="btn btn-default">Back</button>
                    </Link>
                </form>

            </div>
        )
    }

}


export default AddPharmacy;