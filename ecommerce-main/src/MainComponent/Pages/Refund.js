import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, IMG_URL } from "../../AdminComponent/BaseUrl";
import { Helmet } from "react-helmet";
import useBreadcrumb from "../../Utils/Breadcrum";

const Refund = () => {
  const [data, setData] = useState([]);
  const [metadata, setMeta] = useState([]);
  const breaddata = useBreadcrumb(10);

  async function getmetadetail_refund() {
    axios.get(`${BASE_URL}/getfaq`, data).then((res) => {
      setData(res.data);
    });
  }

  async function getmetadetail() {
    const data = {
      page_id: 10,
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
                
                </div>
                <div 
                    class="breadcrumbs bg-light"
                    style={{
                        width: "fit-content",
                        padding: "5px 10px",
                    }}
                >
                  <a href="index.html">Home</a>
                  <span class="delimiter"></span>Return & Refund
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
                            RETURNS AND REFUNDS
                          </h2>

                          <div class="mt-4">
                            <h3 class="mt-4">1.Order Cancellation</h3>
                            <p>
                              <strong>•</strong> If an item arrives with a
                              manufacturing defect that impacts its
                              functionality or usability, it may qualify for
                              return or replacement. Examples include issues
                              like imbalanced structures, opening wooden joints,
                              or similar faults.
                              <br />
                              <strong>•</strong> Variations in appearance or
                              texture, especially for items made from solid
                              wood, are considered natural characteristics and
                              do not constitute defects.
                            </p>

                            <h3 class="mt-4">
                              2. Eligibility for Return or Replacement
                            </h3>
                            <p>
                              <strong>
                                Items may be eligible for return or replacement
                                under the following conditions:
                              </strong>
                              <br />
                            </p>
                            <p>
                              <strong>2.1 Defective Products:</strong>
                              <br />
                              <strong>•</strong> If an item arrives with a
                              manufacturing defect that impacts its
                              functionality or usability, it may qualify for
                              return or replacement. This includes issues such
                              as imbalanced structures, opening wooden joints,
                              or similar faults.
                              <br />
                              <strong>•</strong> Please note that variations in
                              appearance or texture, particularly for items made
                              from solid wood, are considered natural
                              characteristics of the material and do not
                              constitute defects.
                            </p>

                            <strong class="mt-4">
                              2.2 Incorrect Item Received:
                            </strong>
                            <p>
                              <strong>•</strong> If the delivered item differs
                              in dimension, shape from the image displayed on
                              our website, it qualifies for return or
                              replacement.
                            </p>

                            <strong class="mt-4">
                              2.3 Non-Functional Products (Dead on Arrival):
                            </strong>
                            <p>
                              <strong>•</strong> If a product requiring
                              batteries or an electrical source is
                              non-functional upon arrival (such as certain
                              appliances, clocks, lights, or bulbs), it is
                              eligible for a replacement only. Please note that
                              refunds are not available for non-functional
                              items.
                            </p>

                            <h3 class="mt-4">
                              3. Steps to Raise a Return/Replacement Request
                            </h3>
                            <p>
                              <strong>
                                Photograph Requirements: To initiate a return or
                                replacement request, please take clear
                                photographs of the product, following these
                                guidelines:
                              </strong>
                              <br />
                              <strong>•</strong> 1-2 Full Product Images: Ensure
                              the photos show the entire product clearly.
                              <br />
                              <strong>•</strong> 1-2 Close-up Images of
                              Damage/Defect: Provide zoomed-in images of the
                              specific area with the defect or damage, clearly
                              showing the concern.
                              <br />
                              <strong>
                                Note: These photos, along with opening proof,
                                are required to assess eligibility for a refund.
                              </strong>
                            </p>

                            <h3>4. Return Process and Timeline</h3>
                            <p>
                            <strong>1.</strong> Request Submission: Contact our customer
                              support team within 7 days of receiving the item,
                              along with the required photographs.
                              <br /> <strong>2.</strong> Inspection and Approval: Once the
                              request is submitted, we will review the images
                              and assess the eligibility of the item for return
                              or replacement.
                              <br /> <strong>3.</strong> Processing: If approved, we will guide
                              you on next steps, which may include instructions
                              for returning the item or shipping details for the
                              replacement.
                              <br /> <strong>4.</strong>Refund Processing: For approved returns,
                              the refund will be issued to the e-wallet within 7
                              business days after inspection. Customers will
                              receive an email confirmation once the refund has
                              been processed.
                            </p>

                            <strong>
                              Please Note: Only items that meet the eligibility
                              criteria outlined above will be accepted for
                              returns or replacements. We reserve the right to
                              decline requests if they do not meet the stated
                              requirements.
                            </strong>
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

export default Refund;
