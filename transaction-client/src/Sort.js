import React, { Component } from 'react';

class Sort extends Component {

    render() {
        let { transactions, onClick } = this.props;
        return (
            <div className="App">
                <button onClick={onClick}>Sort</button>
                {
                    ///  this.state.transactions.map(transaction => {
                    transactions.map(transaction => {
                        return <h3 key={transaction.id} >{transaction.category} </h3>
                    })
                }


            </div>
        );
    }
}

export default Sort;
