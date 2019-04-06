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
import MarketModal from "./MarketModal";
import { getMarkets, deleteMarket } from "../../actions/marketActions";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ADD_MARKET, UPDATE_MARKET } from "../../actions/types";

const handleDelete = (props, market) => {
  confirmAlert({
    title: "Confirmation",
    message: "Etes-vous sure de vouloir supprimer ce supermarché ?",
    buttons: [
      {
        label: "Oui",
        onClick: () => props.handleDelete(market.id)
      },
      {
        label: "Non",
        onClick: () => {}
      }
    ]
  });
};

function MarketRow(props) {
  let count = 0;
  const market = props.market;
  return (
    <tr key={count++}>
      <td>{market.name}</td>
      <td>{market.logo}</td>
      <td>{market.isActive}</td>
      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          className="float-left mr-1"
          color="danger"
          onClick={() => handleDelete(props, market)}
        >
          <i className="fa fa-spinner fa-trash" />
        </Button>
        <MarketModal
          id={market.id}
          type={UPDATE_MARKET}
          name={market.name}
          logo={market.logo}
          isActive={market.isActive}
          btnColor="warning"
          btnText="&#9998;"
        />
      </td>
    </tr>
  );
}

class Markets extends Component {
  componentDidMount() {
    this.props.getMarkets();
  }
  /*componentDidUpdate(prevProps) {
    if(!(this.props.markets, prevProps.markets)) 
    {
      this.props.getMarkets();
    }
  }*/

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
                  <i className="fa fa-align-justify" /> Marques
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Image</th>
                        <th scope="col">Etat</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {markets.map((market, index) => (
                        <MarketRow
                          key={index}
                          market={market}
                          handleDelete={this.props.deleteMarket}
                        />
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <Row>
                <Col xl={12}>
                  <MarketModal
                    id=""
                    type={ADD_MARKET}
                    name=""
                    logo=""
                    isActive=""
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

Markets.propTypes = {
  getMarkets: PropTypes.func.isRequired,
  deleteMarket: PropTypes.func.isRequired,
  market: PropTypes.object
};

const mapStateToProps = state => ({
  market: state.market
});

export { Markets };

export default connect(
  mapStateToProps,
  { getMarkets, deleteMarket }
)(Markets);
