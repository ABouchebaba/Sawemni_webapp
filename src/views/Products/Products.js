import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from "reactstrap";
import Spinner from "../common/Spinner";
import ProductModal from "./ProductModal.js";
import { getProducts, deleteProduct } from "../../actions/productActions";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ADD_PRODUCT, UPDATE_PRODUCT } from "../../actions/types";

const handleDelete = (props, product) => {
  confirmAlert({
    title: "Confirmation",
    message: "Etes-vous sure de vouloir supprimer ce produit ?",
    buttons: [
      {
        label: "Oui",
        onClick: () => props.handleDelete(product.id)
      },
      {
        label: "Non",
        onClick: () => {}
      }
    ]
  });
};

function ProductRow(props) {
  let count = 0;
  const product = props.product;
  return (
    <tr key={count++}>
      <td>{product.id}</td>
      <td>{product.PName}</td>
      <td>{product.category}</td>
      <td>{product.barcode}</td>
      <td>{product.producer}</td>
      <td>{product.description}</td>
      <td>{product.RefPrice}</td>
      <td>{product.imgURL}</td>
      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          className="float-left mr-1"
          color="danger"
          onClick={() => handleDelete(props, product)}
        >
          <i className="fa fa-spinner fa-trash" />
        </Button>
        <ProductModal
          id={product.id}
          type={UPDATE_PRODUCT}
          PName={product.PName}
          barcode={product.barcode}
          category={product.category}
          producer={product.producer}
          description={product.description}
          RefPrice={product.RefPrice}
          imgURL={product.imgURL}
          btnColor="warning"
          btnText="&#9998;"
        />
      </td>
    </tr>
  );
}

class Products extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products, loading } = this.props.product;
    if (!products || loading) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={6}>
              <Spinner />;
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" /> Marques
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Catégorie</th>
                        <th scope="col">Code-barre</th>
                        <th scope="col">fabriquant</th>
                        <th scope="col">description</th>
                        <th scope="col">prix réf</th>
                        <th scope="col">Image</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <ProductRow
                          key={index}
                          product={product}
                          handleDelete={this.props.deleteProduct}
                        />
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <Row>
                <Col xl={12}>
                  <ProductModal
                    id=""
                    type={ADD_PRODUCT}
                    PName=""
                    category=""
                    barcode=""
                    producer=""
                    description=""
                    RefPrice=""
                    imgURL=""
                    btnColor="primary"
                    btnText="Ajouter"
                  />
                </Col>
              </Row>

              <br />
              <br />
            </Col>
          </Row>
          <NotificationContainer />
        </div>
      );
    }
  }
}

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  product: PropTypes.object
};

const mapStateToProps = state => ({
  product: state.product
});

export { Products };

export default connect(
  mapStateToProps,
  { getProducts, deleteProduct }
)(Products);
