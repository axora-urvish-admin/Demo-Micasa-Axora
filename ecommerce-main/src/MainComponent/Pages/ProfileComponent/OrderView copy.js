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

  return (
    <div className="row p-5">
      <div className="col-lg-4 col-md-4 col-12">
        <ProfileSidebar />
      </div>
      <div className="col-lg-8 col-md-4 col-12">
        <div className="row ">
          <div className=" col-lg-6">
            <div className="card p-3">
              <div>
                <h2>Order Details :</h2>
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
            <div className="card p-3">
              <div>
                <h2>Shipping Address:</h2>
              </div>
              <hr />
              <div>
                <p>
                  {order.shipaddress},{order.shipcity}-{order.shippostcode}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-lg-12">
            <div>
              <h2>Order Details :</h2>
            </div>
            <table border="1" style={{ borderColor: "#76885B" }}>
              <thead>
                <th className="text-center">SR.NO</th>
                <th className="text-center">PRODUCT IMAGE</th>
                <th className="text-center">PRODUCT NAME</th>
                <th className="text-center">PRICE</th>
                <th className="text-center">SIZE</th>
                <th className="text-center">QUANTITY</th>
                <th className="text-center">TOTAL</th>
              </thead>
              <tbody>
                {cart.map((item, index) => {
                  const ptotal = item.price * item.pqty;
                  return (
                    <tr>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">
                        {" "}
                        <img
                          style={{ width: "100px" }}
                          src={`${IMG_URL}/productimg/` + item.image1}
                          className=""
                          alt=""
                        />{" "}
                      </td>
                      <td className="text-center">{item.pname}</td>
                      <td className="text-center">₹{item.price}</td>
                      <td className="text-center">xs</td>
                      <td className="text-center">{item.pqty}</td>
                      <td className="text-center">Rs .{ptotal}</td>
                    </tr>
                  );
                })}

                <tr style={{ height: "50px" }}>
                  <td className="text-right" colSpan="6">
                    Sub Total:
                  </td>
                  <td className="text-center">Rs .{order.totalamt}</td>
                </tr>
                <tr style={{ height: "50px" }}>
                  <td className="text-right" colSpan="6">
                    Cgst:
                  </td>
                  <td className="text-center">Rs .{totalcgst}</td>
                </tr>
                <tr style={{ height: "50px" }}>
                  <td className="text-right" colSpan="6">
                    Sgst:
                  </td>
                  <td className="text-center">Rs .{totalsgst}</td>
                </tr>
                <tr style={{ height: "50px" }}>
                  <td className="text-right" colSpan="6">
                    Grand Total:
                  </td>
                  <td className="text-center">Rs .{order.totalamt}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default OrderView;
