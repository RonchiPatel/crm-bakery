import React, { useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import db from "../Firebaseconfig";
import { useSelector, useDispatch } from "react-redux";
import { set_indicator } from "../app/reducer";
export default function Category(props) {
  const [categoryInfo, setCategoryInfo] = useState({
    id: props.categoryInfoItem.id,
    Name: props.categoryInfoItem.Name,
  });
  const dispatch = useDispatch();
  const updateCategoryInfo = async () => {
    if (categoryInfo.id) {
      const docRef = doc(db, "CategoryMaster", categoryInfo.id);
      setDoc(docRef, categoryInfo);
    } else {
      categoryInfo.id = 0;
      const collectionRef = collection(db, "CategoryMaster");
      const docRef = await addDoc(collectionRef, categoryInfo);
    }
    dispatch(set_indicator(false));
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setCategoryInfo({
      ...categoryInfo,
      [e.target.name]: value,
    });
  };
  return (
    <>
      <div className="row">
        {/* left column */}
        <div className="col-md-12">
          {/* general form elements */}
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Category Master</h3>
            </div>

            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Enter Category Name"
                  name="Name"
                  onChange={handleChange}
                  value={categoryInfo.Name}
                />
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-6">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={updateCategoryInfo}
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
