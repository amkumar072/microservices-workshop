import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class ViewPharmacy extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Pharmacy: [],
            pharmacySingle: {},
            checkboxes: []
        }
    }

    componentWillMount() {
        this.onGetData();
    }

    onDelete = async (id) => {
        try {
            const result = await axios({
                url: 'http://localhost:3002/api/medicine/' + id,
                method: 'delete'
            })
            console.log(result)
            this.onGetData();

        } catch (e) {
            console.log(e);
        }
    }

    onGetData = async () => {
        try {
            const result = await axios({
                url: 'http://localhost:3002/api/medicine',
                method: 'get'
            })
            //  console.log(result.data.Pharmacy);
            this.setState({
                Pharmacy: result.data.Pharmacy
            })

            this.setState({
                checkboxes: result.data.Pharmacy.map((value) => {
                    return value.id;
                })
            })
            //   console.log(this.state.checkboxes);
        }
        catch (e) {
            console.log(e);
        }
    }


    handleItemClick = (value, checked) => {
        //   console.log(value, checked);

        /*   this.setState({
              items: this.state.items.map(item => item.value === value ? { value, checked: !checked } : item)
          }); */
        //   let checker = document.getElementById(value);
        //    console.log(checker);

        /*   let toggleCheckbox = [...this.state.checkboxes];
  
          console.log(toggleCheckbox)
          toggleCheckbox[value].checked = !value.checked
          this.setState({
              checkboxes: toggleCheckbox
          })
  
  
          console.log(this.setState.checkboxes) */
    }

    render() {
        return (
            <div className='container'>
                <Link to="/add"> <button className="btn-xs btn-success"> Add </button>
                </Link>
                <table className='table text-left'>
                    <tbody>
                        <tr>
                            <th> Name </th>
                            <th> BatchNo </th>
                            <th> ExpirationDate</th>
                            <th> Price </th>
                            <th> Type</th>
                            <th> Edit/Delete </th>
                        </tr>
                        {
                            // this.props.data.Pharmacy.map(value => {

                            this.state.Pharmacy.map(value => {
                                return (
                                    <tr key={value.id}>
                                        {/*  <td>  <input type="checkbox" id={value.id}  
                                            onChange={this.handleItemClick} /></td> */}
                                        <td key={value.Name}> {value.Name} </td>
                                        <td key={value.BatchNo}> {value.BatchNo}</td>
                                        <td key={value.ExpirationDate}> {value.ExpirationDate} </td>
                                        <td key={value.Price}> {value.Price}</td>
                                        <td key={value.Type}> {value.Type} </td>
                                        <td>   <Link onClick={this.getDataSingle} to={
                                            {
                                                pathname: "/edit/" + value.id
                                            }
                                        }><button className="btn-sm btn-primary"> Edit</button>
                                        </Link> &nbsp;
                  <button className="btn-sm btn-danger" onClick={() => this.onDelete(value.id)}> Delete</button> </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

}


export default ViewPharmacy;