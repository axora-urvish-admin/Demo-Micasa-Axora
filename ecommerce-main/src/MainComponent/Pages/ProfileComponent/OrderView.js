import React, { useEffect, useState } from "react";
import ProfileSidebar from "../../Subcomponents/ProfileSidebar";
import axios from "axios";
import { BASE_URL, IMG_URL } from "../../../AdminComponent/BaseUrl";
import custdecryptedUserId from "../../../Utils/CustUserid";
import { useParams } from "react-router-dom";

const OrderView = () => {

  const [order, setOrder] = useState([]);
  const [cart, setCart] = useState([]);

  const { orderid } = useParams();

  async function getOrderDetails() {
    const data = {
      order_id: orderid,
    };
    axios.post(`${BASE_URL}/order_view`, data).then((res) => {
      setOrder(res.data[0]);
    });
  }

  async function getcartdata() {
    const data = {
      order_id: orderid,
    };

    axios.post(`${BASE_URL}/getcartData`, data).then((res) => {
      console.log(res);

      setCart(res.data);
    });
  }

  useEffect(() => {
    getcartdata();
    getOrderDetails();
  }, []);

  const timestamp = order.order_date;
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice();

  const formattedDate = `${day}-${month}-${year}`;

  const totalcgst = cart.reduce((total, row) => total + Number(row.cgst), 0);
  const totalsgst = cart.reduce((total, row) => total + Number(row.sgst), 0);


  const finalamount = Number(order.totalamt) + Number(totalcgst)  + Number(totalsgst)

  return (
    <div className="row p-5" style={{marginTop:"5rem"}}>
  <div className="col-lg-4 col-md-4 col-12">
    <ProfileSidebar />
  </div>

  <div className="col-lg-8 col-md-8 col-12">
    <div className="row">
      <div className="col-lg-6">
        <div className="card shadow-sm rounded p-3">
          <div>
            <h2 class="display-6 fw-bold ">Order Details :</h2>
          </div>
          <hr />
          <div>
          <h5>
                  Order No :{" "}
                  <span style={{ fontSize: "17px", fontWeight: "300" }}>
                    {order.orderno}
                  </span>
                </h5>
                <h5>
                  Order Date :{" "}
                  <span style={{ fontSize: "17px", fontWeight: "300" }}>
                    {formattedDate}
                  </span>
                </h5>
                <h5>
                  Order Status :{" "}
                  <span style={{ fontSize: "17px", fontWeight: "300" }}>
                    {order.ostatus}
                  </span>
                </h5>
                <h5>
                  Payment Mode :{" "}
                  <span style={{ fontSize: "17px", fontWeight: "300", textTransform:"uppercase" }}>
                    {order.paymode}
                  </span>
                </h5>
          </div>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="card shadow-sm rounded p-3">
          <div>
            <h2 class="display-6 fw-bold ">Shipping Address:</h2>
          </div>
          <hr />
          <div>
            <p>{order.shipaddress}, {order.shipcity} - {order.shippostcode}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="row py-3">
      <div className="col-lg-12">
        <h2 class="display-6 fw-bold ">Order Items :</h2>

        {/* Table for Desktop View */}
        <table className="table table-bordered table-hover table-striped d-none d-lg-table">
          <thead>
            <tr>
              <th className="text-center">SR.NO</th>
              <th className="text-center">PRODUCT IMAGE</th>
              <th className="text-center">PRODUCT NAME</th>
              <th className="text-center">PRICE</th>
    
              <th className="text-center">QUANTITY</th>
              <th className="text-center">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => {
              const ptotal = item.price * item.pqty;

              return (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">
                    <img style={{ width: "80px",height:"80px" }} src={`${IMG_URL}/productimg/` + item.image1} alt="Product" />
                  </td>
                  <td className="text-center">{item.pname}</td>
                  <td className="text-center">₹{item.price}</td>
              
                  <td className="text-center">{item.pqty}</td>
                  <td className="text-center">₹{ptotal}</td>
                </tr>
              );
            })}
            <tr>
              <td className="text-start" colSpan="5" style={{ textAlign: "right" }}>Sub Total:</td>
              <td className="text-center">₹{order.totalamt}</td>
            </tr>
            <tr>
              <td className="text-start" colSpan="5" style={{ textAlign: "right" }}>Cgst:</td>
              <td className="text-center">₹{totalcgst}</td>
            </tr>
            <tr>
              <td className="text-start" colSpan="5" style={{ textAlign: "right" }}>Sgst:</td>
              <td className="text-center">₹{totalsgst}</td>
            </tr>
            <tr>
              <td className="text-start" colSpan="5" style={{ textAlign: "right" }}>Grand Total:</td>
              <td className="text-center">₹{finalamount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        {/* Cards for Mobile View */}
        <div className="d-lg-none">
  <div className="card mb-3 shadow-sm rounded">
    <div className="card-body">
      <h5 className="card-title text-dark"><strong>Order Details</strong></h5>
      {cart.map((item, index) => {
        const ptotal = item.price * item.pqty;
        return (
          <div key={index} className="mb-4">
            <h6 className="mb-3"><strong>Product {index + 1}:</strong></h6>
            <div className="row align-items-center mb-3">
              <div className="col-4">
                <img style={{ width: "100%", borderRadius: "5px" }} src={`${IMG_URL}/productimg/` + item.image1} alt="Product" />
              </div>
              <div className="col-8">
                <p><strong>Product Name:</strong> {item.pname}</p>
                <p><strong>Price:</strong> ₹{item.price}</p>
              
                <p><strong>Quantity:</strong> {item.pqty}</p>
                <p><strong>Total:</strong> ₹{ptotal}</p>
              </div>
            </div>
            <hr />
          </div>
        );
      })}

      <div className="order-summary">
        <h6><strong>Order Summary</strong></h6>
        <p><strong>Sub Total:</strong> ₹{order.totalamt}</p>
        <p><strong>Cgst:</strong> ₹{totalcgst}</p>
        <p><strong>Sgst:</strong> ₹{totalsgst}</p>
        <p><strong>Grand Total:</strong> ₹{order.totalamt}</p>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  </div>
</div>

  );
};

export default OrderView;
