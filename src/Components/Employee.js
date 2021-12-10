import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import db from "../Firebaseconfig";
import { useSelector, useDispatch } from "react-redux";
import { set_indicator } from "../app/reducer";
import LoadingComponent from "./LoadingComponent";

export default function Employee(props) {
  const [RoleLists, setRoleLists] = useState([]);
  const [Loading, setLoading] = useState(true);

  const [empInfo, setEmpInfo] = useState({
    id: props.empInfoItem.id,
    RoleId: props.empInfoItem.RoleId,
    Name: props.empInfoItem.Name,
    Phone: props.empInfoItem.Phone,
    Password: props.empInfoItem.Password,
    RoleName: props.empInfoItem.Name,
  });
  const dispatch = useDispatch();
  const handleClose = () => dispatch(set_indicator(false));
  const updateEmpInfo = async () => {
    if (empInfo.id) {
      const docRef = doc(db, "EmployeeMaster", empInfo.id);
      setDoc(docRef, empInfo);
    } else {
      empInfo.id = 0;
      console.log("form data - ", empInfo);
      const collectionRef = collection(db, "EmployeeMaster");
      const docRef = await addDoc(collectionRef, empInfo);
      console.log("The new ID is: " + docRef.id);
    }
    dispatch(set_indicator(false));
  };
  const handleSelect = (e) => {
    const Rolevalue = e.target.value;
    // console.log("Role Value", Rolevalue);
    var index = e.nativeEvent.target.selectedIndex;
    setEmpInfo({
      ...empInfo,
      RoleId: Rolevalue,
      RoleName: e.nativeEvent.target[index].text,
    });
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setEmpInfo({
      ...empInfo,
      [e.target.name]: value,
    });
  };
  useEffect(() => {
    onSnapshot(collection(db, "RoleMaster"), (snapshot) => {
      setRoleLists(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
      console.log("Role", RoleLists);
    });
  }, []);
  return (
    <>
      <div className="row">
        {/* left column */}
        <div className="col-md-12">
          {/* general form elements */}
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Employee Master</h3>
            </div>

            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Select Role</label>
                <select
                  id="RoleId"
                  name="RoleId"
                  value={empInfo.RoleId}
                  className="form-control select2"
                  style={{ width: "100%" }}
                  onChange={handleSelect}
                  // onChange={handleChange}
                >
                  {Loading && <LoadingComponent />}
                  <option selected="selected">--- Select Role ---</option>

                  {RoleLists &&
                    RoleLists.map((item, index) => {
                      return <option value={item.id}> {item.Name}</option>;
                    })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Enter student name"
                  name="Name"
                  onChange={handleChange}
                  value={empInfo.Name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Phone</label>
                <input
                  type="phone"
                  className="form-control"
                  id="Phone"
                  placeholder="91258***89"
                  name="Phone"
                  onChange={handleChange}
                  value={empInfo.Phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  placeholder="*****"
                  name="Password"
                  onChange={handleChange}
                  value={empInfo.Password}
                />
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-6">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={updateEmpInfo}
                  >
                    Submit
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    type="submit"
                    className="btn btn-danger btn-block"
                    onClick={() => {
                      handleClose();
                    }}
                  >
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
