import React, { useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import db from "../Firebaseconfig";
import { useSelector, useDispatch } from "react-redux";
import { set_indicator } from "../app/reducer";
export default function Role(props) {
  const [RoleInfo, setRoleInfo] = useState({
    id: props.roleInfoItem.id,
    Name: props.roleInfoItem.Name,
  });
  const dispatch = useDispatch();
  const updateRoleInfo = async () => {
    if (RoleInfo.id) {
      const docRef = doc(db, "RoleMaster", RoleInfo.id);
      setDoc(docRef, RoleInfo);
    } else {
      RoleInfo.id = 0;
      const collectionRef = collection(db, "RoleMaster");
      const docRef = await addDoc(collectionRef, RoleInfo);
      console.log("The new ID is: " + docRef.id);
      console.log("Role Form data - ", RoleInfo);
    }
    dispatch(set_indicator(false));
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setRoleInfo({
      ...RoleInfo,
      [e.target.name]: value,
    });
    console.log(RoleInfo);
  };
  return (
    <>
      <div className="row">
        {/* left column */}
        <div className="col-md-12">
          {/* general form elements */}
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Role Master</h3>
            </div>

            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Role Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Enter student name"
                  name="Name"
                  onChange={handleChange}
                  value={RoleInfo.Name}
                />
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-6">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={updateRoleInfo}
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
