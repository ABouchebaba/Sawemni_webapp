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
import { addMarket, updateMarket } from "../../actions/marketActions";
import { ADD_MARKET } from "../../actions/types";
import FileBase64 from "react-file-base64";

class MarketModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      type: this.props.type === ADD_MARKET ? "Ajouter" : "Mettre à jour",
      id: this.props.id,
      name: this.props.name,
      logo: this.props.logo,
      isActive: this.props.isActive,
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
  onLogoChange = e => {
    this.setState({
      logo: e
    });
  };
  onSubmit(e) {
    const id = this.props.id;
    e.preventDefault();
    const market = [
      {
        id: this.state.id,
        name: this.state.name,
        isActive: this.state.isActive
      },
      this.state.logo
    ];
    if (id !== "") {
      this.props.updateMarket(id, market);
    } else {
      this.props.addMarket(market);
    }
    this.setState({
      name: "",
      isActive: "",
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
            {this.state.type} un Magazin
          </ModalHeader>
          <ModalBody>
            <Form id="form1" onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="name">Nom</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  placeholder="Nom du marché.."
                />

                <Label htmlFor="logo">Image</Label>
                <FileBase64
                  id="logo"
                  name="logo"
                  multiple={false}
                  onDone={this.onLogoChange}
                />
                <Label htmlFor="isActive">état</Label>
                <Input
                  type="text"
                  id="isActive"
                  name="isActive"
                  value={this.state.isActive}
                  onChange={this.onChange}
                  placeholder="Etat du marché.."
                />
                <FormText className="help-block">
                  Veuillez entrer les informations du marché
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
MarketModal.propTypes = {
  addMarket: PropTypes.func.isRequired,
  updateMarket: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { addMarket, updateMarket }
)(MarketModal);
