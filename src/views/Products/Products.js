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
import ProductPricesModal from "./ProductPricesModal";

function ProductRow(props) {
  const product = props.product;
  return (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.PName}</td>
      <td>{product.category}</td>
      <td>{product.barcode}</td>
      <td>{product.producer}</td>
      <td>{product.description}</td>
      <td>{product.RefPrice}</td>
      <td>
        <img
          src={process.env.REACT_APP_BACKEND_URL_LOCAL + "/" + product.imgURL}
          width="75px"
          height="75px"
        />
      </td>
      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <ProductPricesModal id={product.id} btnColor="success" btnText="P" />
        <Button
          className="float-left mr-1 mf-1"
          color="danger"
          onClick={() => props.handleDelete(product.id)}
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

  handleDelete = product_id => {
    confirmAlert({
      title: "Confirmation",
      message: "Etes-vous sure de vouloir supprimer ce produit ?",
      buttons: [
        {
          label: "Oui",
          onClick: () => this.props.deleteProduct(product_id)
        },
        {
          label: "Non",
          onClick: () => {}
        }
      ]
    });
  };

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
                      {products.map((product, index) => {
                        return (
                          <ProductRow
                            key={index}
                            product={product}
                            handleDelete={this.handleDelete}
                          />
                        );
                      })}
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
                    className="Ajouteurssss"
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
