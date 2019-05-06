import React, { Component } from "react";
import {
  FormGroup,
  Input,
  FormText,
  Label,
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import axios from "axios";

class ProductPricesModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      product_id: this.props.id,
      marketPrices: [],
      error: ""
    };

    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL_LOCAL}/markets/prices/${
          this.state.product_id
        }`
      )
      .then(res => {
        //console.log(res.data);
        this.setState({ marketPrices: res.data });
      });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onChange(e) {
    let newMP = {
      name: e.target.name,
      price: e.target.value,
      id: e.target.id
    };

    let newMarketPrices = this.state.marketPrices.map(mp => {
      if (mp.name === newMP.name) {
        return newMP;
      } else {
        return mp;
      }
    });

    this.setState({ marketPrices: newMarketPrices });
  }

  onSubmit(e) {
    e.preventDefault();

    let mps = this.state.marketPrices;
    let id = this.state.product_id;

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL_LOCAL}/markets/prices/${id}`,
        mps
      )
      .then(res => {
        console.log(res.data);

        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      });
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button color={this.props.btnColor} onClick={this.toggle}>
          {this.props.btnText}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Prix du Produit</ModalHeader>
          <ModalBody>
            <Form id="form1" onSubmit={this.onSubmit}>
              <FormGroup>
                {this.state.marketPrices.map(item => {
                  let price = item.price ? item.price : "";
                  return (
                    <div key={item.name}>
                      <Label>{item.name}</Label>
                      <Input
                        id={item.id}
                        type="number"
                        name={item.name}
                        value={price}
                        onChange={this.onChange}
                      />
                    </div>
                  );
                })}

                <FormText className="help-block">
                  Veuillez entrer les informations du produit
                </FormText>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button form="form1" type="submit" size="lg" color="primary">
              Soumettre
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ProductPricesModal;
