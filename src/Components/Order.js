import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";
import Menu from "./Menu";
import { onSnapshot, collection } from "firebase/firestore";
import db from "../Firebaseconfig";
export default function Order() {
  const [flavourLists, setFlavourLists] = useState([]);
  const [flavourLoading, setFlavourLoading] = useState(true);
  const [shapeLists, setShapeLists] = useState([]);

  const [shapeLoading, setShapeLoading] = useState(true);
  useEffect(() => {
    onSnapshot(collection(db, "FlavourMaster"), (snapshot) => {
      setFlavourLists(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setFlavourLoading(false);
    });
    onSnapshot(collection(db, "ShapeMaster"), (snapshot) => {
      setShapeLists(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );

      setShapeLoading(false);
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
              <div className="card card-olive collapsed-card">
                <div className="card-header">
                  <h3 className="card-title">Last Order Details</h3>
                  <div class="card-tools">
                    <button
                      type="button"
                      class="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body table-responsive p-0">
                  <table className="table table-head-fixed text-nowrap">
                    <thead>
                      <tr>
                        <th>View</th>
                        <th>Order #</th>
                        <th>Receipt No</th>
                        <th>Date</th>
                        <th>Delivery / Takeway</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Discount</th>
                        <th>Due</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {Loading && <LoadingComponent />} */}
                      <LoadingComponent />
                      {/* {empLists &&
                          empLists.map((item, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{item.RoleName}</td>
                                <td>{item.Name}</td>
                                <td>{item.Phone}</td>

                                <td>
                                  <a
                                    href="#"
                                    class="text-muted"
                                    onClick={() => {
                                      setEmpInfoItem(item);

                                      handleShow();
                                    }}
                                  >
                                    <i
                                      className="fas fa-edit"
                                      style={{ color: "#23272B" }}
                                    />
                                  </a>
                                </td>
                                <td>
                                  <a href="#" className="text-muted">
                                    <i
                                      className="fas fa-trash"
                                      style={{ color: "#dc3545" }}
                                    />
                                  </a>
                                </td>
                              </tr>
                            );
                          })} */}
                    </tbody>
                  </table>
                </div>
                {/* /.card-body */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <div className="card card-green">
                <div className="card-header">
                  <h3 className="card-title">Customer Details</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-12">
                      <label>Order#</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        placeholder="Enter student name"
                        name="Name"
                        //   onChange={handleChange}
                        //   value={ShapeInfo.Name}
                      />
                    </div>
                    <div className="form-group col-12">
                      <label>Receipt No</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        placeholder="Enter student name"
                        name="Name"
                        //   onChange={handleChange}
                        //   value={ShapeInfo.Name}
                      />
                    </div>
                    <div className="form-group col-12">
                      <label>Phone </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        placeholder="Enter student name"
                        name="Name"
                        //   onChange={handleChange}
                        //   value={ShapeInfo.Name}
                      />
                    </div>
                    <div className="form-group col-12">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        placeholder="Enter student name"
                        name="Name"
                        //   onChange={handleChange}
                        //   value={ShapeInfo.Name}
                      />
                    </div>
                    <div className="form-group col-12">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        placeholder="Enter student name"
                        name="Name"
                        //   onChange={handleChange}
                        //   value={ShapeInfo.Name}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="card card-gray">
                <div className="card-header">
                  <h3 className="card-title">Shape Name List</h3>
                  <div className="card-tools">
                    <div className="input-group input-group-sm">
                      <div
                        className="input-group-append"
                        style={{ marginLeft: 20 }}
                      >
                        <a className="btn btn-dark btn-flat text-white">
                          <i className="fa fa-plus-circle" />
                          Order List
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div class="form-group col-4">
                      <label>Flavour </label>
                      <select
                        id="Flavour"
                        name="Flavour"
                        //  value={empInfo.RoleId}
                        className="form-control select2"
                        style={{ width: "100%" }}
                        // onChange={handleSelect}
                        // onChange={handleChange}
                      >
                        {flavourLoading && <LoadingComponent />}
                        <option selected="selected">
                          --- Select Flavour ---
                        </option>

                        {flavourLists &&
                          flavourLists.map((item, index) => {
                            return (
                              <option value={item.id}> {item.Name}</option>
                            );
                          })}
                      </select>
                    </div>
                    <div class="form-group col-2">
                      <label>Shape </label>
                      <select
                        id="Shape"
                        name="Shape"
                        //  value={empInfo.RoleId}
                        className="form-control select2"
                        style={{ width: "100%" }}
                        // onChange={handleSelect}
                        // onChange={handleChange}
                      >
                        {shapeLoading && <LoadingComponent />}
                        <option selected="selected">
                          --- Select Shape ---
                        </option>

                        {shapeLists &&
                          shapeLists.map((item, index) => {
                            return (
                              <option value={item.id}> {item.Name}</option>
                            );
                          })}
                      </select>
                    </div>
                    <div class="form-group col-3">
                      <label>Delivery Date </label>
                      <input
                        type="date"
                        className="form-control"
                        id="Name"
                        name="Name"
                      />
                    </div>
                    <div class="form-group col-3">
                      <label>Delivery Time </label>
                      <input
                        type="time"
                        className="form-control"
                        id="Name"
                        name="Name"
                      />
                    </div>
                    <div class="form-group col-2">
                      <label>Qty / Weight</label>
                      <input
                        type="number"
                        className="form-control"
                        id="Name"
                        name="Name"
                      />
                    </div>
                    <div class="form-group col-2">
                      <label>Price</label>
                      <input
                        type="number"
                        className="form-control"
                        id="Name"
                        name="Name"
                      />
                    </div>
                    <div class="form-group col-2">
                      <label>Kg/Per Price</label>
                      <input
                        type="number"
                        className="form-control"
                        id="Name"
                        name="Name"
                      />
                    </div>
                    <div class="form-group col-2">
                      <label>Wishing msg</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        name="Name"
                      />
                    </div>
                    <div class="form-group col-3">
                      <label>Extra Note</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        name="Name"
                      />
                    </div>
                    <div class="form-group col-4">
                      <label>How to Delivered ?</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        name="Name"
                      />
                    </div>
                    <div class="form-group col-4">
                      <label> Cake On Photo</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        name="Name"
                      />
                    </div>
                    <div class="form-group col-4">
                      <label> Cake Need Same As </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        name="Name"
                      />
                    </div>
                    <div class="form-group col-4">
                      <label> Delivery Address </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        name="Name"
                      />
                    </div>
                    <div class="form-group col-12">
                      <button
                        type="button"
                        class="btn btn-block btn-outline-primary btn-flat"
                      >
                        Add To Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="card card-success">
                <div className="card-header">
                  <h3 className="card-title">Order Details</h3>
                  <div class="card-tools">
                    <button
                      type="button"
                      class="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i class="fas fa-minus"></i>
                    </button>
                  </div>
                </div>

                <div className="card-body table-responsive p-0">
                  <table className="table table-head-fixed text-nowrap">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Shape</th>
                        <th>Qty/Weight</th>
                        <th>Price</th>
                        <th>Wishing Msg</th>
                        <th>Photo</th>
                        <th>Same Photo</th>
                        <th>Extra Note</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {Loading && <LoadingComponent />} */}
                      <LoadingComponent />
                      {/* {empLists &&
                          empLists.map((item, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{item.RoleName}</td>
                                <td>{item.Name}</td>
                                <td>{item.Phone}</td>

                                <td>
                                  <a
                                    href="#"
                                    class="text-muted"
                                    onClick={() => {
                                      setEmpInfoItem(item);

                                      handleShow();
                                    }}
                                  >
                                    <i
                                      className="fas fa-edit"
                                      style={{ color: "#23272B" }}
                                    />
                                  </a>
                                </td>
                                <td>
                                  <a href="#" className="text-muted">
                                    <i
                                      className="fas fa-trash"
                                      style={{ color: "#dc3545" }}
                                    />
                                  </a>
                                </td>
                              </tr>
                            );
                          })} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card card-warning">
                <div className="card-header">
                  <h3 className="card-title">Payment</h3>
                  <div class="card-tools">
                    <button
                      type="button"
                      class="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i class="fas fa-minus"></i>
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div class="form-group col-4">
                      <label>Total </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        placeholder="Enter student name"
                        name="Name"
                      />
                    </div>
                    <div class="form-group col-4">
                      <label>Advance </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Name"
                        placeholder="Enter student name"
                        name="Name"
                      />
                    </div>
                    <div class="form-group col-4">
                      <label>Pay</label>
                      <input
                        type="number"
                        className="form-control"
                        id="Name"
                        name="Name"
                      />
                    </div>
                    <div class="form-group col-4">
                      <label>Return </label>
                      <input
                        type="number"
                        className="form-control"
                        id="Name"
                        name="Name"
                      />
                    </div>
                    <div class="form-group col-4">
                      <label>Due </label>
                      <input
                        type="number"
                        className="form-control"
                        id="Name"
                        name="Name"
                      />
                    </div>
                    <div class="form-group col-4">
                      <label>Employee</label>
                      <input
                        type="number"
                        className="form-control"
                        id="Name"
                        name="Name"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <button type="button" class="btn btn-block btn-success btn-flat">
                Place Order
              </button>
            </div>
            <div className="col-6">
              <button type="button" class="btn btn-block btn-danger btn-flat">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
