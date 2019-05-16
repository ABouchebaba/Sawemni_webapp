import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Spinner from "../common/Spinner";
import MarketModal from "./MarketModal";
import { getMarkets, deleteMarket } from "../../actions/marketActions";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ADD_MARKET, UPDATE_MARKET } from "../../actions/types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Img from "react-image";

const { SearchBar } = Search;

class Markets extends Component {
  columns = [
    {
      dataField: "Logo",
      text: "Logo",
      formatter: (cell, row) => (
        <Img
          width="75px"
          height="75px"
          src={[
            process.env.REACT_APP_BACKEND_URL_LOCAL + "/" + cell,
            "../../assets/img/default.jpg"
          ]}
          alt={row.name}
        />
      )
    },
    {
      dataField: "name",
      text: "Nom"
    },
    {
      dataField: "isActive",
      text: "Etat",
      formatter: cell => (cell === "1" ? "Actif" : "Inactif")
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
    this.props.getMarkets();
  }

  handleDelete = market_id => {
    confirmAlert({
      title: "Confirmation",
      message: "Etes-vous sure de vouloir supprimer ce supermarché ?",
      buttons: [
        {
          label: "Oui",
          onClick: () => this.props.deleteMarket(market_id)
        },
        {
          label: "Non",
          onClick: () => {}
        }
      ]
    });
  };

  operationFormatter(cell, row, index, extra) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          className="float-left mr-1"
          color="danger"
          onClick={() => extra.handleDelete(row.id)}
        >
          {<FontAwesomeIcon icon="trash" />}
        </Button>
        <MarketModal
          id={row.id}
          type={UPDATE_MARKET}
          name={row.name}
          logo={row.Logo}
          isActive={row.isActive}
          btnColor="primary"
          btnText={<FontAwesomeIcon icon="pen" />} //"&#9998;"
        />
      </div>
    );
  }

  render() {
    const { markets, loading } = this.props.market;
    if (!markets || loading) {
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
                  <i className="fa fa-align-justify" /> Magasins
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xl={12}>
                      <MarketModal
                        id=""
                        type={ADD_MARKET}
                        name=""
                        logo=""
                        isActive="1"
                        btnColor="primary"
                        btnText="Ajouter"
                      />
                    </Col>
                  </Row>

                  <ToolkitProvider
                    keyField="id"
                    data={markets}
                    columns={this.columns}
                    search
                  >
                    {props => (
                      <div>
                        <h3>Rechercher un magasin:</h3>
                        <SearchBar {...props.searchProps} />
                        <hr />
                        <BootstrapTable
                          {...props.baseProps}
                          keyField="id"
                          columns={this.columns}
                          data={markets}
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

Markets.propTypes = {
  getMarkets: PropTypes.func.isRequired,
  deleteMarket: PropTypes.func.isRequired,
  market: PropTypes.object
};

const mapStateToProps = state => ({
  market: state.market
});

//export { Markets };

export default connect(
  mapStateToProps,
  { getMarkets, deleteMarket }
)(Markets);
