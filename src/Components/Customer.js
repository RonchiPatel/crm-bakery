import React, { useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import db from "../Firebaseconfig";
import { useSelector, useDispatch } from "react-redux";
import { set_indicator } from "../app/reducer";
export default function Customer(props) {
  const [CustomerInfo, setCustomerInfo] = useState({
    id: props.customerInfoItem.id,
    Name: props.customerInfoItem.Name,
    Email: props.customerInfoItem.Email,
    Phone: props.customerInfoItem.Phone,
    Address: props.customerInfoItem.Address,
  });
  const indicator = useSelector((state) => state.indicator);
  const dispatch = useDispatch();
  const updateCustomerInfo = async () => {
    if (CustomerInfo.id) {
      const docRef = doc(db, "CustomerMaster", CustomerInfo.id);
      setDoc(docRef, CustomerInfo);
    } else {
      CustomerInfo.id = 0;
      const collectionRef = collection(db, "CustomerMaster");
      const docRef = await addDoc(collectionRef, CustomerInfo); // add 1st main collection
      console.log("The new ID is: " + docRef.id);
    }
    dispatch(set_indicator(false));
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setCustomerInfo({
      ...CustomerInfo,
      [e.target.name]: value,
    });
    console.log(CustomerInfo);
  };
  return (
    <>
      <div className="row">
        {/* left column */}
        <div className="col-md-12">
          {/* general form elements */}
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Customer Registration</h3>
            </div>

            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Enter student name"
                  name="Name"
                  onChange={handleChange}
                  value={CustomerInfo.Name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="studentEmail"
                  placeholder="abc@gmail.com"
                  name="Email"
                  onChange={handleChange}
                  value={CustomerInfo.Email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="978**9855"
                  name="Phone"
                  onChange={handleChange}
                  value={CustomerInfo.Phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Address</label>
                <textarea
                  className="form-control"
                  id="Address"
                  placeholder="Gandhi Road"
                  name="Address"
                  col="50"
                  onChange={handleChange}
                  value={CustomerInfo.Address}
                />
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-6">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={updateCustomerInfo}
                  >
                    Submit
                  </button>
                </div>
                <div className="col-md-6">
                  <button type="submit" className="btn btn-danger btn-block">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
