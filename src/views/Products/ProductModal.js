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
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProduct, updateProduct } from "../../actions/productActions";
import { ADD_PRODUCT, UPDATE_PRODUCT } from "../../actions/types";

class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      type: this.props.type === ADD_PRODUCT ? "Ajouter" : "Mettre à jour",
      PName: this.props.PName,
      category: this.props.category,
      barcode: this.props.barcode,
      producer: this.props.producer,
      description: this.props.description,
      RefPrice: this.props.RefPrice,
      imgURL: this.props.imgURL,
      error: ""
    };

    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onLogoChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    const id = this.props.id;
    e.preventDefault();
    const product = {
      PName: this.state.PName,
      category: this.state.category,
      barcode: this.state.barcode,
      producer: this.state.producer,
      description: this.state.description,
      RefPrice: this.state.RefPrice,
      imgURL: this.state.imgURL
    };
    if (id !== "") {
      this.props.updateProduct(id, product);
    } else {
      this.props.addProduct(product);
    }
    this.setState({
      PName: "",
      category: "",
      barcode: "",
      producer: "",
      description: "",
      RefPrice: "",
      imgURL: "",
      modal: false
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
          <ModalHeader toggle={this.toggle}>
            {this.state.type} un Produit
          </ModalHeader>
          <ModalBody>
            <Form id="form1" onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="PName">Nom</Label>
                <Input
                  type="text"
                  id="PName"
                  name="PName"
                  value={this.state.PName}
                  onChange={this.onChange}
                  placeholder="Nom du produit.."
                />
                <Label htmlFor="category">categorie</Label>
                <Input
                  type="text"
                  id="category"
                  name="category"
                  value={this.state.category}
                  onChange={this.onChange}
                  placeholder="categorie du produit .."
                />
                <Label htmlFor="barcode">Code-barre</Label>
                <Input
                  type="text"
                  id="barcode"
                  name="barcode"
                  value={this.state.barcode}
                  onChange={this.onChange}
                  placeholder="Code-barre du produit.."
                />
                <Label htmlFor="producer">producer</Label>
                <Input
                  type="text"
                  id="producer"
                  name="producer"
                  value={this.state.producer}
                  onChange={this.onChange}
                  placeholder="fabricant du produit .."
                />
                <Label htmlFor="description">description</Label>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  placeholder="Description du produit .."
                />
                <Label htmlFor="RefPrice">Prix de référence</Label>
                <Input
                  type="text"
                  id="RefPrice"
                  name="RefPrice"
                  value={this.state.RefPrice}
                  onChange={this.onChange}
                  placeholder="prix du produit .."
                />
                <Label htmlFor="imgURL">image URL</Label>
                <Input
                  type="text"
                  id="imgURL"
                  name="imgURL"
                  value={this.state.imgURL}
                  onChange={this.onChange}
                  placeholder="url de l'image .."
                />
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
ProductModal.propTypes = {
  addProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { addProduct, updateProduct }
)(ProductModal);
