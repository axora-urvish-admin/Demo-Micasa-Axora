import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, IMG_URL } from "../../AdminComponent/BaseUrl";
import { Helmet } from "react-helmet";
import useBreadcrumb from "../../Utils/Breadcrum";

const ShippingPolicy = () => {
  const [data, setData] = useState([]);
  const [metadata, setMeta] = useState([]);

  const breaddata = useBreadcrumb(11);

  async function getmetadetail_policy() {
    axios.get(`${BASE_URL}/getfaq`, data).then((res) => {
      setData(res.data);
    });
  }

  async function getmetadetail() {
    const data = {
      page_id: 11,
    };
    axios.post(`${BASE_URL}/getmetadetail`, data).then((res) => {
      setMeta(res.data[0]);
    });
  }

  useEffect(() => {
    getmetadetail();
  }, []);

  return (
    <div>
      <div id="site-main" class="site-main">
        <Helmet>
          <title>{metadata.seo_title}</title>
          <meta
            name="description"
            content={metadata.seo_desc}
            dangerouslySetInnerHTML={{ __html: metadata.seo_desc }}
          />
          <meta name="author" content={metadata.seo_title} />
        </Helmet>
        <div id="main-content" class="main-content">
          <div id="primary" class="content-area">
            <div
              id="title"
              className="page-title"
              style={{
                backgroundImage: `url('${IMG_URL}/Breadcrumbs/${breaddata}')`,
              }}
            >
              <div class="section-container d-flex justify-content-center">
                <div class="content-title-heading">
                  {/* <h1 class="text-title-heading">Shipping Policy</h1> */}
                </div>
                <div 
                    class="breadcrumbs bg-light"
                    style={{
                        width: "fit-content",
                        padding: "5px 10px",
                    }}
                >
                  <a href="index.html">Home</a>
                  <span class="delimiter"></span>Shipping Policy
                </div>
              </div>
            </div>

            <div id="content" class="site-content" role="main">
              <div class="page-contact">
                <section class="section section-padding m-b-70">
                  <div class="section-container">
                    <div class="">
                      <div class="block-widget-wrap">
                        <div class="">
                          <h2
                            class="text-center"
                            style={{
                              fontFamily: "Arial, sans-serif",
                              fontSize: "2.5rem",
                              color: "#343a40",
                            }}
                          >
                            Shipping Policy
                          </h2>

                          <div class="mt-4">
                            <h3 class="mt-4">
                              1. Order Processing and Confirmation
                            </h3>
                            <p>
                              <strong>1.1 Order Confirmation:</strong>
                              <br />
                              -We aim to confirm all orders within 24 hours.
                              Customers will receive an email notification once
                              their order is confirmed.
                            </p>
                            <p>
                              <strong>1.2 Processing Time:</strong>
                              <br />
                              -Vendors are required to approve/update order
                              status within 24 business hours from the date of
                              order.
                              <br /> -Order processing times may vary for
                              different products, custom-made, personalized, or
                              out-of-stock items. Customers will be notified of
                              any anticipated delays and given updated timelines
                              for such items.
                            </p>

                            <h3 class="mt-4">2. Shipping Methods</h3>
                            <p>
                              -We offer various shipping methods to suit your
                              needs, which vary based on delivery speed, package
                              weight, and destination. Available options will be
                              shown at checkout.
                              <br />
                              -Each vendor selects appropriate packaging and
                              carriers for the safe and secure delivery of your
                              items.
                            </p>

                            <h3 class="mt-4">3. Delivery Timeline</h3>
                            <p>
                              -Estimated delivery timelines depend on the
                              shipping method selected, product origin, and
                              destination. While we strive to ensure timely
                              delivery, unforeseen circumstances may
                              occasionally cause delays.
                              <br />
                              -Tracking information, when available, will be
                              provided to customers once the order has been
                              dispatched.
                            </p>

                            <h3 class="mt-4">
                              4. Shipping Costs and Promotions
                            </h3>
                            <p>
                              <strong>4.1 Cost Allocation:</strong>
                              <br />
                              -Shipping costs are calculated based on the
                              selected shipping method, product weight,
                              dimensions, and destination.
                              <br />
                              -The shipping cost will be displayed at checkout
                              and included in the total order cost, allowing
                              customers to review the full amount before
                              confirming the purchase.
                            </p>
                            <p>
                              <strong>4.2 Free Shipping:</strong>
                              <br />
                              -Free shipping offers, if available, will be
                              clearly mentioned on the product page and at
                              checkout.
                            </p>

                            <h3 class="mt-4">5. Additional Information</h3>
                            <p>
                              <strong>5.1 Customs and Import Duties:</strong>
                              <br />
                              -For international shipments, customers are
                              responsible for any customs fees or import duties
                              required by their country.
                            </p>
                            <p>
                              <strong>5.2 Delivery Restrictions:</strong>
                              <br />
                              -Please note that some items may have delivery
                              restrictions due to size or weight limitations.
                              Any such restrictions will be communicated at the
                              time of purchase.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
