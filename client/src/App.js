import React, { Component } from 'react';
import { Navbar, Table, Button, ButtonToolbar } from 'react-bootstrap'
import WalletInfo from './walletInfo'
import TransferModal from './transfer'
import axios from 'axios'
import { axiosInstance } from "./services"
import './App.css';

class App extends Component {

  state = {
    filter: "all",
    wallets: [],
    clickedId: "",
    transferModal: false
  }

    componentDidMount(){
      axiosInstance.get(`/wallets`, { params: { filter: this.state.filter } })
          .then(response => this.setState({wallets: response.data.wallets}))
          .catch(error => console.log(`handle error`))
  }


  handleClick = (e) => {
    this.setState({clickedId: e.target.attributes[0].value})
  }

  handleClose = (modal) =>{
      if(modal === "info"){
      this.setState({clickedId: ""})
    } else {
      this.setState({transferModal: false})
    }
  }

  handleTransfer = () => {
    this.setState({transferModal: !this.state.transferModal})
  }

  handleFilter = (e) =>{
    axiosInstance.get(`/wallets`, { params: { filter: e.target.id } })
        .then(response => this.setState({wallets: response.data.wallets}))
        .catch(error => console.log(`handle error`))
      }

  render() {
    let accountList = this.state.wallets.map(wallet =>{
      return (
        <tr key={wallet._id}>
          <td value={wallet._id} onClick={this.handleClick}>{wallet.public_key}</td>
        </tr>
    )}
  )

    return (
      <div className="App">
        <Navbar bg="secondary" expand="lg" className="justify-content-between">
         <Navbar.Brand style={{color:"white"}}>HB Exchange</Navbar.Brand>
           <ButtonToolbar>
         <Button onClick={this.handleTransfer} variant="primary">Transfer</Button>
         <Button onClick={this.handleFilter} id="all" variant="primary">All</Button>
         <Button onClick={this.handleFilter} id="claimed" variant="primary">Claimed</Button>
         <Button onClick={this.handleFilter} id="deposited" variant="primary">Deposited</Button>
          </ButtonToolbar>
        </Navbar>
        <Table striped bordered hover variant="light">
        <tbody>
        {accountList}
          </tbody>
        </Table>
        {this.state.clickedId ? <WalletInfo wallet={this.state.clickedId} closeModal={this.handleClose}/> : null}
        {this.state.transferModal ? <TransferModal wallets={this.state.wallets} closeModal={this.handleClose}/> : null}
      </div>
    );
  }
}

export default App;
