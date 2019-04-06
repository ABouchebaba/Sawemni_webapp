import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from "reactstrap";  
import Spinner from "../common/Spinner";
import { getUserPrices } from "../../actions/userActions";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "react-confirm-alert/src/react-confirm-alert.css";


function UserRow(props) {
  let count = 0;
  const userprice = props.userprice;
  return (
    <tr key={count++}>
      <td>{userprice.id}</td>
      <td>{userprice.PName}</td>
      <td>{userprice.price}</td>
      <td>{userprice.localization}</td>
      <td>{userprice.created_at}</td>
    </tr>
  );
}

class User extends Component {
  componentDidMount() {
    this.props.getUserPrices();
  }

  render() {
    //console.log(this.props.userPrice);
    const { userprices, loading } = this.props.userprice;
    if (!userprices || loading) {
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
                        <th scope="col">id</th>
                        <th scope="col">produit</th>
                        <th scope="col">prix</th>
                        <th scope="col">localisation</th>
                        <th scope="col">crée le</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userprices.map((userprice, index) => (
                        <UserRow
                          key={index}
                          userprice={userprice}
                        />
                      ))}
                    </tbody>
                  </Table>
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
