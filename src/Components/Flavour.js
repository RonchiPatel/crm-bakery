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
export default function Flavour(props) {
  console.log("Print Props", props);
  const [categoryLists, setCategoryLists] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [flavourInfo, setFlavourInfo] = useState({
    CategoryId: props.flavourInfoItem.CategoryId,
    CategoryName: props.flavourInfoItem.CategoryName,
    Description: props.flavourInfoItem.Description,
    //  Image: props.flavourInfoItem.Image,
    Name: props.flavourInfoItem.Name,
    Price: props.flavourInfoItem.Price,
    id: props.flavourInfoItem.id,
  });
  const dispatch = useDispatch();
  const handleClose = () => dispatch(set_indicator(false));
  const updateFlavourInfo = async () => {
    if (flavourInfo.id) {
      const docRef = doc(db, "FlavourMaster", flavourInfo.id);
      setDoc(docRef, flavourInfo);
    } else {
      flavourInfo.id = 0;
      console.log("form data - ", flavourInfo);
      const collectionRef = collection(db, "FlavourMaster");
      const docRef = await addDoc(collectionRef, flavourInfo);
      console.log("The new ID is: " + docRef.id);
    }
    dispatch(set_indicator(false));
  };
  const handleSelect = (e) => {
    const CategoryValue = e.target.value;
    // console.log("Role Value", Rolevalue);
    var index = e.nativeEvent.target.selectedIndex;
    setFlavourInfo({
      ...flavourInfo,
      CategoryId: CategoryValue,
      CategoryName: e.nativeEvent.target[index].text,
    });
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setFlavourInfo({
      ...flavourInfo,
      [e.target.name]: value,
    });
  };
  useEffect(() => {
    onSnapshot(collection(db, "CategoryMaster"), (snapshot) => {
      setCategoryLists(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setLoading(false);
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
              <h3 className="card-title">Product/Flavour Master</h3>
            </div>

            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Select Category</label>
                <select
                  id="CategoryId"
                  name="CategoryId"
                  value={flavourInfo.CategoryId}
                  className="form-control select2"
                  style={{ width: "100%" }}
                  onChange={handleSelect}
                  // onChange={handleChange}
                >
                  {Loading && <LoadingComponent />}
                  <option selected="selected">--- Select Category ---</option>

                  {categoryLists &&
                    categoryLists.map((item, index) => {
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
                  value={flavourInfo.Name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="Price"
                  placeholder="50.00"
                  name="Price"
                  onChange={handleChange}
                  value={flavourInfo.Price}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="Image"
                  name="Image"
                  onChange={handleChange}
                  value={flavourInfo.Image}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="Description"
                  placeholder="enter extra information of products"
                  name="Description"
                  onChange={handleChange}
                  value={flavourInfo.Description}
                />
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-6">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={updateFlavourInfo}
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
