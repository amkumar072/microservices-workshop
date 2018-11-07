import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
/* import Sort from './Sort'; */

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      transactions: [],
      formDate: '',
      toDate: '',
      filter: '',
      transaction: {}
    }
  }

  componentWillMount() {
    /* axios({
      url: "http://localhost:3001/transactions",
      method: "get"
    })
      .then(transactions => {
        //  console.log(transactions.data.data);

        this.setState({
          transactions: transactions.data.data.transactions
        })
      })
      .catch(error => {

      }) */

      this.setState({
        transaction: {
          category: "milkyBar",
          date: Date.now(),
          amount: 158
        }
      })

    this.onClick();
  }

  onSort = () => {
    let { transactions } = this.state;
    transactions.sort((x, y) => x.amount - y.amount)
    this.setState({
      transactions
    })
  }



  onSortNode = () => {
    axios({
      url: "http://localhost:3001/transactions/sort",
      method: "get"
    })
      .then(transactions => {
        //   console.log(transactions.data.data);

        this.setState({
          transactions: transactions.data.data.transactions
        })
      })
      .catch(error => {

      })
  }

  onClick = () => {
    axios({
      url: "http://localhost:3001/transactions",
      method: "get"
    })
      .then(transactions => {
        console.log(transactions.data.data);

        this.setState({
          transactions: transactions.data.data.transactions
        })
      })
      .catch(error => {

      })
  }


  onDateQuery = () => {
    axios({
      url: "http://localhost:3001/transactions?formDate=" + this.state.formDate + "&toDate=" + this.state.toDate,
      method: "get"
    })
      .then(transactions => {
        //  console.log(transactions.data.data);

        this.setState({
          transactions: transactions.data.data.transactions
        })
      })
      .catch(error => {

      })

    //   console.log(this.state.transaction);
  }
  onFromDate = (e) => {

    this.setState({
      formDate: e.target.value
    })

    //console.log(this.state.formDate)
  }

  onToDate = (e) => {
    this.setState({
      toDate: e.target.value
    })

    //  console.log(this.state.toDate)
  }

  handlefilter = (e) => {
    this.onClick();
    this.setState({
      filter: e.target.value
    });
  }

  onFilter = () => {
    //console.log(e.target.value);

    let { transactions, filter } = this.state;
    let result = transactions.filter((value) => {
      if (value.id === filter) {
        return value;
      } else {
        return null
      }
    });
    this.setState({
      transactions: result
    })
    //   console.log(result)
  }

  onAdd = () => {
  

    axios({
      url: 'http://localhost:3001/transactions',
      method: 'post',
      data: this.state.transaction
    })
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.onAdd}> Add </button>

        <button onClick={this.onClick}>Click</button>
        {/*  <button onClick={this.onSort}>Sort</button>
        {
          this.state.transactions.map(transaction => {
            return <h3 key={transaction.id}>{transaction.category} </h3>
          })
        } */}

        <br />
        <input type="date" value={this.state.formDate} onChange={this.onFromDate} />

        <input type="date" value={this.state.toDate} onChange={this.onToDate} />


        <button onClick={this.onDateQuery}>Date</button>

        <hr />
        {/*  <Sort transactions={this.state.transactions} onClick={this.onSort} /> */}
        {/*  <Sort transactions={this.state.transactions} onClick={this.onSortNode} /> */}

        <input onChange={this.handlefilter} /> &nbsp;
        <button onClick={() => this.onFilter()}> Filter </button>

        <table>
          <tbody>
            <tr>
              <th> id </th>
              <th> category </th>
              <th> amount </th>
            </tr>

            {
              this.state.transactions.map((trans, i) => {
                return (
                  <tr key={i}>
                    <td> {trans.id}</td>
                    <td> {trans.category}</td>
                    <td> {trans.amount}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        {/* <Test /> */}


      </div>
    );
  }
}

export default App;
