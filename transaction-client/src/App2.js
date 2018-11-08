import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      fromDate: '',
      toDate: ''
    }
  }

  componentWillMount(){
    this.onClick()
  }

  onClick = () => {
    axios({
      url: 'http://localhost:3000/api/transactions',
      method: 'get'
    }).then(transactions => {
   //   console.log(transactions);

      this.setState({
        transactions: transactions.data.transactions
      })

    }).catch(error => {
      console.log(error)
    })

  }

  onSortAsc = () => {
    /*  let { transactions } = this.state;
     transactions.sort((x, y) => x.amount - y.amount)
     this.setState({
       transactions
     }) */
    axios({
      url: ' http://localhost:3000/api/transactions/sort2?name=amount',
      method: 'get'
    }).then(transactions => {
      console.log(transactions);

      this.setState({
        transactions: transactions.data.transactions
      })

    }).catch(error => {
      console.log(error)
    })

  }
  onSortDesc = () => {
    let { transactions } = this.state;
    transactions.sort((x, y) => y.amount - x.amount)
    this.setState({
      transactions
    })
  }

  fromDateHandler = (e) => {
    this.setState({
      fromDate: e.target.value
    })
  }

  toDateHandler = (e) => {
    this.setState({
      toDate: e.target.value
    })
  }

  onFilterDate = () => {
    axios({
      url: 'http://localhost:3000/api/transactions/date2?fromDate=' + this.state.fromDate + '&toDate=' + this.state.toDate,
      method: 'get'
    }).then(transactions => {
      console.log(transactions);

      this.setState({
        transactions: transactions.data.transactions
      })

    }).catch(error => {
      console.log(error)
    })

  }

  render() {
    return (
      <div className="App">
        <button onClick={this.onClick}> Click</button>
        <button onClick={this.onSortAsc}> Sort Asc</button>
        <button onClick={this.onSortDesc}> Sort Desc</button>
        <br />
        <input type="date" onChange={this.fromDateHandler} value={this.state.fromDate} />
        <input type="date" onChange={this.toDateHandler} value={this.state.toDate} />
        <button onClick={this.onFilterDate}> Filter</button>
        <table>
          <tbody>
            <tr>
              <th> id</th>
              <th>category</th>
              <th> date</th>
              <th> amount</th>
            </tr>
            {
              this.state.transactions.map((transaction, i) => {
                return (
                  <tr key={i}>
                    <td>{transaction.id}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.amount}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>


      </div>
    );
  }
}

export default App;
