import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from "reactstrap";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getUsers, updateUser, banUser } from "../../actions/userActions";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { SearchBar } = Search;

class Users extends Component {
  columns = [
    {
      dataField: "FName",
      text: "Nom complet",
      formatter: (cell, row) => {
        let userLink = `/user/${row.id}`;
        return <Link to={userLink}>{cell}</Link>;
      }
    },
    {
      dataField: "email",
      text: "Email"
    },
    {
      dataField: "pseudo",
      text: "Pseudo"
    },
    {
      dataField: "fb_id",
      text: "Facebook ID"
    },
    {
      dataField: "gm_id",
      text: "Google ID"
    },
    {
      dataField: "verified",
      text: "Vérifié(e)",
      formatter: cell => (
        <Badge color={cell === "1" ? "success" : "warning"}>
          {cell === "1" ? "Vérifié" : "en cours"}
        </Badge>
      )
    },
    {
      dataField: "canAddprice",
      text: "Etat",
      formatter: cell => (
        <Badge color={cell === "1" ? "success" : "danger"}>
          {cell === "1" ? "Autorisé(e)" : "Banni(e)"}
        </Badge>
      )
    },
    {
      dataField: "created_at",
      text: "crée le"
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
    this.props.getUsers();
  }

  handleBan = user_id => {
    confirmAlert({
      title: "Confirmation",
      message: "Etes-vous sure de vouloir bannir cet utilisateur ?",
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

  operationFormatter(cell, row, index, extra) {
    //console.log(row);
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          className="float-left mr-1"
          color="danger"
          onClick={() => extra.handleBan(row.id)}
        >
          {<FontAwesomeIcon icon="ban" />}
        </Button>
      </div>
    );
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
                  <i className="fa fa-align-justify" /> Utilisateurs
                </CardHeader>
                <CardBody>
                  <ToolkitProvider
                    keyField="id"
                    data={users}
                    columns={this.columns}
                    search
                  >
                    {props => (
                      <div>
                        <h3>Rechercher un utilisateur:</h3>
                        <SearchBar {...props.searchProps} />
                        <hr />
                        <BootstrapTable
                          {...props.baseProps}
                          keyField="id"
                          columns={this.columns}
                          data={users}
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
