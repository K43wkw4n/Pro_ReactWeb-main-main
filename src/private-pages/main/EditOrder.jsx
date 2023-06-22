import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import "./privateStyle.css"
import { imagesBook } from "../../data/Data";

function EditOrder() {
  const location = useLocation();
  const item = location.state;;

  const image = (i) => {
    return imagesBook[i]
  }

  return (
    <div className="main-panel">
      <div className="content">
        <div className="OrderEditSect_1 ">

          <div style={{ width: "100%" }}>
            <NavLink to="/OrderPage">
              <button className="BackButton">
                <BiArrowBack /> Back
              </button>
            </NavLink>

            <label
              className="OrderID_EditPage"
              style={{ fontSize: 32, fontWeight: "bold" }}
            >
              Order ID: {item.id}
            </label>
          </div>

          <div
            style={{ width: "100%", display: "flex", justifyContent: "right", marginRight: 120 }}
          >
            <label
              className="OrderID_EditPage Status_EditPage"
              style={{ fontSize: 28, fontWeight: "bold", padding: 10, borderRadius: 5 }}
            >
              {item.status}
            </label>
          </div>
        </div>

        <hr />

        <div className="OrderName_EditPage">
          <label className="text_EditPage">Oder date: {item.date}</label>
          <label style={{ marginLeft: 30, fontSize: 18, fontWeight: "bolder" }}>
            Customer Name: {item.name}
          </label>
          <label style={{ fontSize: 18, fontWeight: "bolder" }}>
            {item.status}
          </label>
        </div>

        <hr />

        <div className="Header_Sect_EditPage">
          <h6>Subtotal</h6>
        </div>

        <div className="Image_Sect_EditPage">
          <img
            src={imagesBook[item.id]}
            width="120"
            alt=""
            style={{ borderRadius: 5 }}
          />

          <div className="Productname_Sect_EdiPPage">
            <label style={{ fontSize: 20, fontWeight: "bold" }}>
              {item.product_name}
            </label>
            <label
              style={{
                color: "#5B5B5B",
                fontSize: 16,
              }}
            >
              Quantity: {item.quantity}
            </label>
          </div>

          <div className="Productprice_Sect_EditPage">
            <label style={{ fontSize: 22 }}>{item.subtotal} Bath</label>
          </div>
        </div>

        <hr />

        <div>
          <div className="Productname_Sect_EdiPPage">
            <label style={{ fontWeight: "bold", fontSize: 20 }}>Delivery</label>
            <label style={{ fontSize: 18 }}>Address: {item.address}</label>
          </div>
          <div className="Productprice_Sect_EditPage">
            <label style={{ fontSize: 26, fontWeight: "bolder" }}>
              Total: {item.total}
            </label>
          </div>
        </div>

        <div
          style={{ display: "flex", justifyContent: "right", marginRight: 110 }}
        >
          <button style={{ marginRight: 10 }} className="Confirm">
            Confirm
          </button>
          <button className="Cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditOrder;