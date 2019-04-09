import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from "reactstrap";
import Spinner from "../common/Spinner";
import { getUsers, updateUser, banUser } from "../../actions/userActions";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function UserRow(props) {
  const user = props.user;
  //const userLink = `/user/${user.id}`;
  return (
    <tr key={user.id}>
      <td>{user.pseudo}</td>
      <td>{user.FName}</td>
      <td>{user.LName}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
        <Badge color={user.verified === "1" ? "success" : "warning"}>
          {user.verified === "1" ? "Vérifié" : "en cours"}
        </Badge>
      </td>
    </tr>
  );
}

class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  handleBan = user_id => {
    confirmAlert({
      title: "Confirmation",
      message: "Etes-vous sure de vouloir banner cet utilisateur ?",
      buttons: [
        {
          label: "Oui",
          onClick: () => this.props.banUser(user_id)
        },
        {
          label: "Non",
          onClick: () => {}
        }
      ]
    });
  };

  render() {
    const { users, loading } = this.props.user;
    if (!users || loading) {
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
                        <th scope="col">Pseudo</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prénom</th>
                        <th scope="col">email</th>
                        <th scope="col">Tél</th>
                        <th scope="col">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <UserRow
                          key={index}
                          user={user}
                          handleBan={this.handleBan}
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

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  banUser: PropTypes.func.isRequired,
  User: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user
});

export { Users };

export default connect(
  mapStateToProps,
  { getUsers, updateUser, banUser }
)(Users);
