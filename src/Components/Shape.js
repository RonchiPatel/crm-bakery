import React, { useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import db from "../Firebaseconfig";
import { useSelector, useDispatch } from "react-redux";
import { set_indicator } from "../app/reducer";
export default function Shape(props) {
  const [ShapeInfo, setShapeInfo] = useState({
    id: props.shapeInfoItem.id,
    Name: props.shapeInfoItem.Name,
  });
  const dispatch = useDispatch();
  const updateShapeInfo = async () => {
    if (ShapeInfo.id) {
      const docRef = doc(db, "ShapeMaster", ShapeInfo.id);
      setDoc(docRef, ShapeInfo);
    } else {
      ShapeInfo.id = 0;
      const collectionRef = collection(db, "ShapeMaster");
      const docRef = await addDoc(collectionRef, ShapeInfo);
      console.log("The new ID is: " + docRef.id);
      console.log("Shape Form data - ", ShapeInfo);
    }
    dispatch(set_indicator(false));
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setShapeInfo({
      ...ShapeInfo,
      [e.target.name]: value,
    });
    console.log(ShapeInfo);
  };
  return (
    <>
      <div className="row">
        {/* left column */}
        <div className="col-md-12">
          {/* general form elements */}
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Shape Master</h3>
            </div>

            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Shape Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Enter student name"
                  name="Name"
                  onChange={handleChange}
                  value={ShapeInfo.Name}
                />
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-6">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={updateShapeInfo}
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
