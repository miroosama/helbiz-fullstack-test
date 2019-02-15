import React, { Component } from 'react';
import { Modal, Button, Dropdown, Form, Alert } from 'react-bootstrap'
import axios from 'axios'

class TransferModal extends Component {

  state = {
    error: false,
    from: "From",
    to: "To",
    amount: ""
  }

  handleSelection = (event) => {
    this.setState({
    from:event.target.id
    })
  }

  handleSelection2 = (event) => {
    this.setState({
      to:event.target.id
    })
  }

  handleChange = (e) => {
    this.setState({amount: e.target.value})
  }

  handleSave = () =>{
    if(this.state.from !== this.state.to && this.state.from !== "From" && this.state.to !== "To"){
      axios.post('http://localhost:5000/api/transfers', {from: this.state.from, to:this.state.to, amount:this.state.amount })
      .then(response => console.log(response))
      .catch(error => console.log(`handle error`))
      this.props.closeModal("transferModal")

    } else{
      this.setState({error: true})
    }

  }



  render() {
    let accounts = this.props.wallets.map(wallet =>{
      return (
      <Dropdown.Item bsprefix="dropdown" onClick={this.handleSelection} id={wallet.public_key} key={wallet.public_key}>{wallet.public_key}</Dropdown.Item>
      )
    })

    let accounts2 = this.props.wallets.map(wallet =>{
      return (
      <Dropdown.Item bsprefix="dropdown" onClick={this.handleSelection2} id={wallet.public_key} key={wallet.public_key}>{wallet.public_key}</Dropdown.Item>
      )
    })
    return (
      <div>
        <Modal show={true} onHide={() => {this.props.closeModal("transferModal")}}>
          <Modal.Header>
            <Modal.Title>Transfer</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Dropdown>
                <Dropdown.Toggle value="Account" variant="success" id="dropdown-basic">
                  {this.state.from}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{overflowY: 'scroll', maxHeight: "300px"}}>
                  {accounts}
                </Dropdown.Menu>
              </Dropdown>
              <Form onChange={this.handleChange}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type="number" placeholder="0" />
                </Form.Group>
              </Form>
              <Dropdown>
                <Dropdown.Toggle value="Account" variant="success" id="dropdown-basic">
                  {this.state.to}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{overflowY: 'scroll', maxHeight: "300px"}}>
                  {accounts2}
                </Dropdown.Menu>
              </Dropdown>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {this.props.closeModal("transferModal")}}>Close</Button>
            <Button onClick={this.handleSave} variant="primary">Save changes</Button>
          </Modal.Footer>
          {this.state.error ? <Alert dismissible variant="danger">
              <Alert.Heading>Select unique accounts and enter amount</Alert.Heading>
          </Alert> : null}
        </Modal>;
      </div>
    );
  }
}

export default TransferModal;
