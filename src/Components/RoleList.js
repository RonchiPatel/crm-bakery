import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Role from "./Role";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import db from "../Firebaseconfig";
import { onSnapshot, collection } from "firebase/firestore";
import LoadingComponent from "./LoadingComponent";
import { useSelector, useDispatch } from "react-redux";
import { set_indicator } from "../app/reducer";
export default function RoleList() {
  const [RoleLists, setRoleLists] = useState([]);
  const [filterCustomerList, setfilterCustomerList] = useState([]);

  const [Loading, setLoading] = useState(true);
  const [roleInfoItem, setRoleInfoItem] = useState({});
  const indicator = useSelector((state) => state.indicator);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(set_indicator(false));
  const handleShow = () => {
    dispatch(set_indicator(true));
  };
  useEffect(() => {
    onSnapshot(collection(db, "RoleMaster"), (snapshot) => {
      setRoleLists(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      setLoading(false);
    });
  }, []);
  return (
    <>
      <Header></Header>
      <Menu></Menu>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Role Name List</h3>
                  <div className="card-tools">
                    <div className="input-group input-group-sm">
                      <input
                        type="text"
                        name="table_search"
                        className="form-control float-right"
                        placeholder="Search"
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-default">
                          <i className="fas fa-search" />
                        </button>
                      </div>

                      <div
                        className="input-group-append"
                        style={{ marginLeft: 20 }}
                      >
                        <a
                          onClick={() => {
                            handleShow();
                            setRoleInfoItem({});
                          }}
                          className="btn btn-dark btn-flat text-white"
                        >
                          <i className="fa fa-plus-circle" />
                          Add New Role
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body table-responsive p-0">
                  <table className="table table-head-fixed text-nowrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Loading && <LoadingComponent />}

                      {RoleLists &&
                        RoleLists.map((item, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>

                              <td>{item.Name}</td>

                              <td>
                                <a
                                  href="#"
                                  class="text-muted"
                                  onClick={() => {
                                    setRoleInfoItem(item);

                                    handleShow();
                                  }}
                                >
                                  <i class="fas fa-edit"></i>
                                </a>
                              </td>
                              <td>
                                <a href="#" class="text-muted">
                                  <i class="fas fa-trash"></i>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>

      <Modal
        show={indicator}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Role Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Role roleInfoItem={roleInfoItem}></Role>
        </Modal.Body>
      </Modal>
    </>
  );
}
