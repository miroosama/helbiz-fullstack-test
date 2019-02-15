import React, { Component } from 'react';
import { Modal, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { axiosInstance, axiosMongoInstance } from "./services"
import './App.css';
import Web3 from "web3"
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/e7e240cdeda947cdbaf41a2092c85ff5"))


class WalletInfo extends Component {

  state = {
    info: [],
    transfers: [],
    ethBal: "",

  }

  componentDidMount(){
    axiosInstance.get(`/wallets/show`, { params: { _id: this.props.wallet } })
        .then(response => this.setState({info: response.data}))
        .then(resp => {
          this.getETH()
        })
        .catch(error => console.log(`handle error`))

    axios.get('http://localhost:5000/api/transfers')
        .then(response => this.setState({transfers: response.data}))
        .catch(error => console.log(`handle error`))

  }

    getETH = () =>{
      console.log(this.state.info.public_key)
      web3.eth.getBalance(this.state.info.public_key)
      .then(res => this.setState({ethBal: res}))
    }



  render() {
    console.log(this.state)
    let balance = 0
    // internal balance alg complexity O(n)
    this.state.transfers.forEach(transfer =>{
      if(this.state.info.public_key === transfer.from){
        balance -= transfer.amount
      }
      else if(this.state.info.public_key === transfer.to){
        balance +=  transfer.amount
      }
    })
    return (
      <div className="App">
        <Modal show={true} onHide={() => {this.props.closeModal("info")}}>
          <Modal.Header>
            <Modal.Title>Wallet Info</Modal.Title>
          </Modal.Header>
            <Modal.Body>
            {this.state.info.public_key?
              <div>
              <p>Public Key: {this.state.info.public_key}</p>
              <p>Balance : {this.state.info.balance_hbz + balance}</p>
              <p>ETH Balance: {this.state.ethBal} </p>
              </div>
              : <span>Loading...</span>
            }
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {this.props.closeModal("info")}}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default WalletInfo;
