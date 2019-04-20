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
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Img from "react-image";

const { SearchBar } = Search;

class Products extends Component {
  columns = [
    {
      dataField: "imgURL",
      text: "Image",
      formatter: (cell, row) => (
        <Img
          width="75px"
          height="75px"
          src={[
            process.env.REACT_APP_BACKEND_URL_LOCAL + "/" + cell,
            "../../assets/img/default.jpg"
          ]}
          alt={row.PName}
        />
      )
    },
    {
      dataField: "PName",
      text: "Nom"
      //filter: textFilter()
    },
    {
      dataField: "category",
      text: "Catégorie"
    },
    {
      dataField: "barcode",
      text: "Code-barres"
    },
    {
      dataField: "producer",
      text: "Fabriquant"
    },
    {
      dataField: "description",
      text: "Description"
    },
    {
      dataField: "RefPrice",
      text: "Prix Ref"
    },
    {
      dataField: "df1",
      isDummyField: true,
      text: "Opérations",
      formatter: this.operationFormatter,
      formatExtraData: this
    }
  ];
  componentDidMount() {
    this.props.getProducts();
  }

  handleDelete(product_id) {
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
  }

  operationFormatter(cell, row, index, extra) {
    //console.log(row.PName);
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ProductPricesModal
          id={row.id}
          btnColor="success"
          btnText={<FontAwesomeIcon icon="store" />}
        />
        <Button
          className="ml-2 mr-2 "
          color="danger"
          onClick={() => {
            extra.handleDelete(row.id);
          }}
        >
          {<FontAwesomeIcon icon="trash" />}
        </Button>
        <ProductModal
          id={row.id}
          type={UPDATE_PRODUCT}
          PName={row.PName}
          barcode={row.barcode}
          category={row.category}
          producer={row.producer}
          description={row.description}
          RefPrice={row.RefPrice}
          imgURL={row.imgURL}
          btnColor="primary"
          btnText={<FontAwesomeIcon icon="pen" />} //"&#9998;"
        />
      </div>
    );
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
                  <i className="fa fa-align-justify" /> Produits
                </CardHeader>
                <CardBody>
                  <ToolkitProvider
                    keyField="id"
                    data={products}
                    columns={this.columns}
                    search
                  >
                    {props => (
                      <div>
                        <h3>Rechercher un produit:</h3>
                        <SearchBar {...props.searchProps} />
                        <hr />
                        <BootstrapTable
                          {...props.baseProps}
                          keyField="id"
                          columns={this.columns}
                          data={products}
                          pagination={paginationFactory()}
                          filter={filterFactory()}
                          striped
                          hover
                          condensed
                        />
                      </div>
                    )}
                  </ToolkitProvider>
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
