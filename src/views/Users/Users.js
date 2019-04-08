import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
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
import { getUsers, updateUser } from "../../actions/userActions";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const checkban = (props, user) => {
  confirmAlert({
    title: "Confirmation",
    message: "Etes-vous sure de vouloir banner cet utilisateur ?",
    buttons: [
      {
        label: "Oui",
        onClick: () => props.checkban(user.id)
      },
      {
        label: "Non",
        onClick: () => {}
      }
    ]
  });
};

function UserRow(props) {
  let count = 0;
  const user = props.user;
  // const userLink = `/user/${user.id}`
  return (
    <tr key={count++}>
    {/* <td><Link to={userLink}>{user.id}</Link></td> */}
      <td>{user.FName}</td>
      <td>{user.LName}</td>
      <td>{user.email}</td>
      <td>{user.pseudo}</td>
      <td>{user.phone}</td>
      <td>{user.fb_id}</td>
      <td>{user.gm_id}</td>
      <td>{user.created_at}</td>
      <td>
          <Badge color={(user.verified === '1') ? 'success' : 'warning'}>
          {(user.verified === '1') ? 'Vérifié' : 'en cours'}</Badge>
      </td>
      <td>
          <Badge color={(user.canAddprice === '1') ? 'success' : 'warning' }>
          {(user.canAddprice) === '1' ? 'OUI' : 'NON'}</Badge>
      </td>
    
      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          className="float-left mr-1"
          color="secondary"
          onClick={() => checkban(props, user)}
        >
          <i className="fa fa-spinner fa-circle-x" />
        </Button>
      </td>
    </tr>
  );
}

class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

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
                        <th scope="col">Nom</th>
                        <th scope="col">Prénom</th>
                        <th scope="col">Mail</th>
                        <th scope="col">Pseudo</th>
                        <th scope="col">Tél</th>
                        <th scope="col">Facebook</th>
                        <th scope="col">Google</th>
                        <th scope="col">crée le</th>
                        <th scope="col">vérificaion</th>
                        <th scope="col">ajout prix</th>
                        <th scope="col">changer<br/>permission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <UserRow
                          key={index}
                          user={user}
                          checkban={this.props.updateUser}
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
  User: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user
});

export { Users };

export default connect(
  mapStateToProps,
  { getUsers, updateUser }
)(Users);
