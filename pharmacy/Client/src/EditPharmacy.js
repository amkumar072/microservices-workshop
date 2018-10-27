import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

class EditPharmacy extends Component {
    constructor(props) {
        super(props)

        this.state = {

            id: this.props.match.params.id,
            pharmacy: {},
            seletValue: ''
        }
        this.getDataSingle(this.state.id)
    }
    getDataSingle = async (id) => {
        try {
            const result = await axios({
                url: 'http://localhost:3002/api/medicine/' + id,
                method: 'get'
            })
            this.setState({
                pharmacy: result.data.Pharmacy,
                seletValue: result.data.Pharmacy.Type
            })

        }
        catch (e) {
            console.log(e);
        }
    }

    onUpdate = async (event) => {

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
            //  console.log(this.state.pharmacy)
            await axios({
                url: 'http://localhost:3002/api/medicine/' + this.state.id,
                method: 'put',
                data: this.state.pharmacy
            })
            this.props.history.push('/')
        }, 1000);
    }

    selectChange = (event) => {
        //  console.log(event.target.value)
        this.setState({
            seletValue: event.target.value
        })
    }

    render() {
        return (

            <div className="container col-md-4" >
                <h3> Edit </h3>
                <br />
                <form onSubmit={this.onUpdate} >
                    <div className="form-group">
                        <label htmlFor="Name">Name :</label>
                        <input type="text" className="form-control" name="Name"
                            defaultValue={this.state.pharmacy.Name}

                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="BatchNo">BatchNo :</label>
                        <input type="text" className="form-control" name="BatchNo"
                            defaultValue={this.state.pharmacy.BatchNo}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ExpirationDate">Expiration Date :</label>
                        <input type="date" className="form-control" name="ExpirationDate"
                            defaultValue={this.state.pharmacy.ExpirationDate}
                            min="2018-10-25" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Price">Price :</label>
                        <input type="number" className="form-control" name="Price"
                            defaultValue={this.state.pharmacy.Price}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Type">Type :</label>
                        <select className="form-control" name="Type"
                            value={this.state.seletValue} onChange={this.selectChange}>
                            <option value="Capsule" >Capsule</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Syrup">Syrup</option>
                            <option value="Gel">Gel</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">Edit</button> &nbsp;
                    <Link to='/'><button className="btn btn-default">Back</button> </Link>
                </form>

            </div>
        )
    }

}


export default EditPharmacy;