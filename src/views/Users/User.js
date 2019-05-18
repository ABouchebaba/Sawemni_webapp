import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Spinner from "../common/Spinner";
import { getUserPrices } from "../../actions/userActions";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import axios from "axios";

const { SearchBar } = Search;

const paginationOption = {
  sizePerPage: 5
};

class User extends Component {
  state = {
    userInfo: {},
    userPrices: [],
    userTracking: [],

    infoLoading: true,
    priceLoading: true,
    trackingLoading: true
  };

  pricesColumns = [
    {
      dataField: "PName",
      text: "Produit"
    },
    {
      dataField: "price",
      text: "Prix"
    },
    {
      dataField: "Localization",
      text: "Localisation"
    },
    {
      dataField: "created_at",
      text: "Date"
    }
  ];

  trackingColumns = [
    {
      dataField: "PName",
      text: "Produit"
    },
    {
      dataField: "type",
      text: "Type"
    },
    {
      dataField: "time",
      text: "Date"
    }
  ];

  componentDidMount() {
    let id = this.props.match.params.id;

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/users/${id}`)
      .then(res => {
        this.setState({
          userInfo: res.data,
          infoLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/userprices/${id}`)
      .then(res => {
        this.setState({
          userPrices: res.data,
          priceLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL_LOCAL}/usertracking/${id}`)
      .then(res => {
        this.setState({
          userTracking: res.data,
          trackingLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    //console.log(this.props.userPrice);
    //const { userprices, loading } = this.props.userprice;
    if (
      this.state.infoLoading ||
      this.state.priceLoading ||
      this.state.trackingLoading
    ) {
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
                  <i className="fa fa-align-justify" /> Informations de
                  l'utilisateur
                </CardHeader>
                <CardBody />
              </Card>

              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" /> Produits recherchés par{" "}
                  {this.state.userInfo.FName}
                </CardHeader>
                <CardBody>
                  <ToolkitProvider
                    keyField="created_at"
                    data={this.state.userTracking}
                    columns={this.trackingColumns}
                    search
                  >
                    {props => (
                      <div>
                        <h3>Rechercher les produits :</h3>
                        <SearchBar {...props.searchProps} />
                        <hr />
                        <BootstrapTable
                          {...props.baseProps}
                          keyField="created_at"
                          columns={this.trackingColumns}
                          data={this.state.userTracking}
                          pagination={paginationFactory(paginationOption)}
                          filter={filterFactory()}
                          striped
                          hover
                          condensed
                          responsive
                        />
                      </div>
                    )}
                  </ToolkitProvider>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" /> Prix proposés par{" "}
                  {this.state.userInfo.FName}
                </CardHeader>
                <CardBody>
                  <ToolkitProvider
                    keyField="created_at"
                    data={this.state.userPrices}
                    columns={this.pricesColumns}
                    search
                  >
                    {props => (
                      <div>
                        <h3>Rechercher le prix proposé d'un produit:</h3>
                        <SearchBar {...props.searchProps} />
                        <hr />
                        <BootstrapTable
                          {...props.baseProps}
                          keyField="created_at"
                          columns={this.pricesColumns}
                          data={this.state.userPrices}
                          pagination={paginationFactory(paginationOption)}
                          filter={filterFactory()}
                          striped
                          hover
                          condensed
                          responsive
                        />
                      </div>
                    )}
                  </ToolkitProvider>
                </CardBody>
              </Card>

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

User.propTypes = {
  getUserPrices: PropTypes.func.isRequired,
  userprice: PropTypes.object
};

const mapStateToProps = state => ({
  userprice: state.userprice
});

export { User };

export default connect(
  mapStateToProps,
  { getUserPrices }
)(User);
