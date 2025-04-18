import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, IMG_URL } from "../../AdminComponent/BaseUrl";
import { Helmet } from "react-helmet";
import useBreadcrumb from "../../Utils/Breadcrum";

const Privacy = () => {
  const [data, setData] = useState([]);
  const [metadata, setMeta] = useState([]);

  const breaddata = useBreadcrumb(9);

  async function getmetadetail_faq() {
    axios.get(`${BASE_URL}/getfaq`, data).then((res) => {
      setData(res.data);
    });
  }

  async function getmetadetail() {
    const data = {
      page_id: 9,
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
                  <span class="delimiter"></span>Privacy Policy
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
                          <h3
                            class="text-center"
                            style={{
                              fontFamily: "Arial, sans-serif",
                              fontSize: "2.5rem",
                              color: "#343a40",
                            }}
                          >
                            Privacy Policy
                          </h3>

                          {/* <!-- Section A - F --> */}
                          <div class="mt-4">
                            <p>
                              <strong>Effective Date:</strong> 24/10/2024
                            </p>
                            <p>
                              <strong>Last Updated:</strong> 24/10/2024
                            </p>
                            <p>
                              <strong>
                                <a
                                  href="https://micasasucasa.in/"
                                  class="text-muted"
                                >
                                micasasucasa.in
                                </a>
                              </strong> is committed to protecting the
                              privacy of users (“you,” “your”) who visit our
                              furniture marketplace platform. This Privacy
                              Policy outlines how we collect, use, store, and
                              disclose your personal information in compliance
                              with applicable Indian data protection laws,
                              including the Information Technology Act, 2000 and
                              the Information Technology (Reasonable Security
                              Practices and Procedures and Sensitive Personal
                              Data or Information) Rules, 2011.
                            </p>
                            <p>
                              By accessing or using [Website Name], you agree to
                              this Privacy Policy. If you do not agree, please
                              discontinue use of our website.
                            </p>
                          </div>
                          <div class="mt-4">
                            <h3>1. Information We Collect</h3>
                            <p>
                              We collect the following categories of personal
                              information:
                            </p>
                            <h3>1.1 Information You Provide Directly</h3>
                            <ul>
                              <li>
                                <strong>Account Information:</strong> When you
                                create an account, we collect your name, email
                                address, phone number, billing/shipping address,
                                and other details necessary for purchasing
                                furniture.
                              </li>
                              <li>
                                <strong>Payment Information:</strong> We collect
                                payment details, such as credit/debit card
                                information, bank account numbers, UPI IDs, or
                                other financial data for processing
                                transactions. Payments are processed securely
                                via third-party payment gateways.
                              </li>
                              <li>
                                <strong>Communication:</strong> If you contact
                                our customer service or engage with us through
                                chat, email, or other forms of communication, we
                                collect the details of that correspondence.
                              </li>
                              <li>
                                <strong>Feedback and Reviews:</strong> When you
                                provide product reviews or feedback, we collect
                                that information.
                              </li>
                            </ul>
                            <h3>1.2 Automatically Collected Information</h3>
                            <ul>
                              <li>
                                <strong>Device and Usage Information:</strong>
                                We collect data such as your IP address, browser
                                type, operating system, and device information
                                when you use our website.
                              </li>
                              <li>
                                <strong>
                                  Cookies and Tracking Technologies:
                                </strong>
                                We use cookies, web beacons, and similar
                                technologies to enhance your experience on the
                                website. You can manage cookie preferences
                                through your browser settings.
                              </li>
                            </ul>
                            <h3>1.3 Information from Third Parties</h3>
                            <p>
                              We may collect information from third-party
                              vendors, service providers, or publicly available
                              sources, such as social media accounts linked to
                              your profile.
                            </p>

                            <h3>2. How We Use Your Information</h3>
                            <ul>
                              <li>
                                <strong>Providing Services:</strong> To
                                facilitate transactions, process orders, deliver
                                products, and manage your account.
                              </li>
                              <li>
                                <strong>Customer Support:</strong> To respond to
                                your inquiries, provide customer support, and
                                handle complaints.
                              </li>
                              <li>
                                <strong>Marketing:</strong> With your consent,
                                we may use your email or contact information to
                                send promotional offers, newsletters, or updates
                                about new furniture collections.
                              </li>
                              <li>
                                <strong>Improving Website:</strong> To analyse
                                how our website is used, improve user
                                experience, and enhance our platform’s
                                functionality.
                              </li>
                              <li>
                                <strong>Security:</strong> To prevent fraud,
                                safeguard the platform, and enforce our terms of
                                service.
                              </li>
                              <li>
                                <strong>Compliance:</strong> To comply with
                                legal obligations, respond to legal requests,
                                and exercise our legal rights.
                              </li>
                            </ul>

                            <h3>3. Sharing Your Information</h3>
                            <p>
                              We do not sell your personal information. However,
                              we may share your information under the following
                              circumstances:
                            </p>
                            <ul>
                              <li>
                                <strong>With Vendors:</strong> When you place an
                                order, your details (name, address, phone
                                number) are shared with the respective furniture
                                vendors for delivery and order fulfilment.
                              </li>
                              <li>
                                <strong>With Service Providers:</strong> We work
                                with third-party service providers who assist us
                                in operating the marketplace, including payment
                                processors, delivery partners, marketing
                                agencies, and IT support.
                              </li>
                              <li>
                                <strong>Legal Obligations:</strong> We may share
                                personal information if required by law,
                                government requests, legal processes, or to
                                protect our legal rights or the safety of
                                others.
                              </li>
                              <li>
                                <strong>Business Transfers:</strong> In the
                                event of a merger, acquisition, or sale of our
                                business, your personal data may be transferred
                                as part of that transaction.
                              </li>
                            </ul>

                            <h3>4. Your Rights and Choices</h3>
                            <ul>
                              <li>
                                <strong>Access:</strong> You can request a copy
                                of the personal data we hold about you.
                              </li>
                              <li>
                                <strong>Correction:</strong> You can request the
                                correction of inaccurate or incomplete
                                information.
                              </li>
                              <li>
                                <strong>Deletion:</strong> You can request the
                                deletion of your personal information, subject
                                to legal retention requirements.
                              </li>
                              <li>
                                <strong>Withdraw Consent:</strong> You can
                                withdraw your consent for the use of your
                                personal information for marketing purposes at
                                any time.
                              </li>
                              <li>
                                <strong>Data Portability:</strong> In certain
                                circumstances, you may request the transfer of
                                your personal data to another service provider.
                              </li>
                            </ul>

                            <h3>5. Security of Your Information</h3>
                            <p>
                              We take appropriate technical and organizational
                              measures to secure your personal information
                              against unauthorized access, loss, or misuse.
                              However, no method of transmission over the
                              internet is 100% secure, and we cannot guarantee
                              absolute security.
                            </p>

                            <h3>6. Data Retention</h3>
                            <p>
                              We retain your personal information for as long as
                              necessary to fulfil the purposes outlined in this
                              Privacy Policy or as required by law.
                            </p>

                            <h3>7. Third-Party Links</h3>
                            <p>
                              Our website may contain links to third-party
                              websites. We are not responsible for the privacy
                              practices or content of those sites. We encourage
                              you to review the privacy policies of any
                              third-party sites you visit.
                            </p>

                            <h3>8. Children's Privacy</h3>
                            <p>
                              Our website is not intended for use by individuals
                              under the age of 18. We do not knowingly collect
                              personal information from children.
                            </p>

                            <h3>9. Changes to This Privacy Policy</h3>
                            <p>
                              We reserve the right to update or modify this
                              Privacy Policy at any time. Any changes will be
                              posted on this page with the updated effective
                              date.
                            </p>

                            <h3>10. Phishing</h3>
                            <p>
                              We prioritize safeguarding your information
                              against identity theft, including phishing. The
                              Platform will never request your credit card
                              information or identification numbers through
                              unsolicited emails or phone calls.
                            </p>

                            <h3>11. Contact Us</h3>
                            <p>
                              If you have any questions, concerns, or requests
                              regarding this Privacy Policy or your personal
                              data, please contact us:
                            </p>
                            <p>
                              <strong>Email:</strong> info@micasasucasa.in
                            </p>
                            <p>
                              <strong>Phone:</strong> +918989000066
                            </p>
                          </div>

                          <div class="mt-4">
                            <p class="text-muted">
                              This Privacy Policy describes how and its
                              affiliates (collectively "ARCH INTERNATIONAL , we,
                              our, us") collect, use, share, protect or
                              otherwise process your information/ personal data
                              through our website &ensp;
                              <a
                                href="https://micasasucasa.in/"
                                class="text-muted"
                              >
                                https://micasasucasa.in/
                              </a>
                              (hereinafter referred to as Platform). Please note
                              that you may be able to browse certain sections of
                              the Platform without registering with us. We do
                              not offer any product/service under this Platform
                              outside India and your personal data will
                              primarily be stored and processed in India. By
                              visiting this Platform, providing your information
                              or availing any product/service offered on the
                              Platform, you expressly agree to be bound by the
                              terms and conditions of this Privacy Policy, the
                              Terms of Use and the applicable service/product
                              terms and conditions, and agree to be governed by
                              the laws of India including but not limited to the
                              laws applicable to data protection and privacy. If
                              you do not agree please do not use or access our
                              Platform. Collection-We collect your personal data
                              when you use our Platform, services or otherwise
                              interact with us during the course of our
                              relationship and related information provided from
                              time to time. Some of the information that we may
                              collect includes but is not limited to personal
                              data / information provided to us during
                              sign-up/registering or using our Platform such as
                              name, date of birth, address, telephone/mobile
                              number, email ID and/or any such information
                              shared as proof of identity or address. Some of
                              the sensitive personal data may be collected with
                              your consent, such as your bank account or credit
                              or debit card or other payment instrument
                              information or biometric information such as your
                              facial features or physiological information (in
                              order to enable use of certain features when opted
                              for, available on the Platform) etc all of the
                              above being in accordance with applicable law(s)
                              You always have the option to not provide
                              information, by choosing not to use a particular
                              service or feature on the Platform. We may track
                              your behaviour, preferences, and other information
                              that you choose to provide on our Platform. This
                              information is compiled and analysed on an
                              aggregated basis. We will also collect your
                              information related to your transactions on
                              Platform and such third-party business partner
                              platforms. When such a third-party business
                              partner collects your personal data directly from
                              you, you will be governed by their privacy
                              policies. We shall not be responsible for the
                              third-party business partner’s privacy practices
                              or the content of their privacy policies, and we
                              request you to read their privacy policies prior
                              to disclosing any information. If you receive an
                              email, a call from a person/association claiming
                              to be ARCH INTERNATIONAL seeking any personal data
                              like debit/credit card PIN, net-banking or mobile
                              banking password, we request you to never provide
                              such information. If you have already revealed
                              such information, report it immediately to an
                              appropriate law enforcement agency. Usage- We use
                              personal data to provide the services you request.
                              To the extent we use your personal data to market
                              to you, we will provide you the ability to opt-out
                              of such uses. We use your personal data to assist
                              sellers and business partners in handling and
                              fulfilling orders; enhancing customer experience;
                              to resolve disputes; troubleshoot problems; inform
                              you about online and offline offers, products,
                              services, and updates; customise your experience;
                              detect and protect us against error, fraud and
                              other criminal activity; enforce our terms and
                              conditions; conduct marketing research, analysis
                              and surveys; and as otherwise described to you at
                              the time of collection of information. You
                              understand that your access to these
                              products/services may be affected in the event
                              permission is not provided to us. Sharing- We may
                              share your personal data internally within our
                              group entities, our other corporate entities, and
                              affiliates to provide you access to the services
                              and products offered by them. These entities and
                              affiliates may market to you as a result of such
                              sharing unless you explicitly opt-out. We may
                              disclose personal data to third parties such as
                              sellers, business partners, third party service
                              providers including logistics partners, prepaid
                              payment instrument issuers, third-party reward
                              programs and other payment opted by you. These
                              disclosure may be required for us to provide you
                              access to our services and products offered to
                              you, to comply with our legal obligations, to
                              enforce our user agreement, to facilitate our
                              marketing and advertising activities, to prevent,
                              detect, mitigate, and investigate fraudulent or
                              illegal activities related to our services. We may
                              disclose personal and sensitive personal data to
                              government agencies or other authorised law
                              enforcement agencies if required to do so by law
                              or in the good faith belief that such disclosure
                              is reasonably necessary to respond to subpoenas,
                              court orders, or other legal process. We may
                              disclose personal data to law enforcement offices,
                              third party rights owners, or others in the good
                              faith belief that such disclosure is reasonably
                              necessary to: enforce our Terms of Use or Privacy
                              Policy; respond to claims that an advertisement,
                              posting or other content violates the rights of a
                              third party; or protect the rights, property or
                              personal safety of our users or the general
                              public. Security Precautions- To protect your
                              personal data from unauthorised access or
                              disclosure, loss or misuse we adopt reasonable
                              security practices and procedures. Once your
                              information is in our possession or whenever you
                              access your account information, we adhere to our
                              security guidelines to protect it against
                              unauthorised access and offer the use of a secure
                              server. However, the transmission of information
                              is not completely secure for reasons beyond our
                              control. By using the Platform, the users accept
                              the security implications of data transmission
                              over the internet and the World Wide Web which
                              cannot always be guaranteed as completely secure,
                              and therefore, there would always remain certain
                              inherent risks regarding use of the Platform.
                              Users are responsible for ensuring the protection
                              of login and password records for their account.
                              Data Deletion and Retention- You have an option to
                              delete your account by visiting your profile and
                              settings on our Platform , this action would
                              result in you losing all information related to
                              your account. You may also write to us at the
                              contact information provided below to assist you
                              with these requests. We may in event of any
                              pending grievance, claims, pending shipments or
                              any other services we may refuse or delay deletion
                              of the account. Once the account is deleted, you
                              will lose access to the account. We retain your
                              personal data information for a period no longer
                              than is required for the purpose for which it was
                              collected or as required under any applicable law.
                              However, we may retain data related to you if we
                              believe it may be necessary to prevent fraud or
                              future abuse or for other legitimate purposes. We
                              may continue to retain your data in anonymised
                              form for analytical and research purposes. Your
                              Rights- You may access, rectify, and update your
                              personal data directly through the functionalities
                              provided on the Platform. Consent- By visiting our
                              Platform or by providing your information, you
                              consent to the collection, use, storage,
                              disclosure and otherwise processing of your
                              information on the Platform in accordance with
                              this Privacy Policy. If you disclose to us any
                              personal data relating to other people, you
                              represent that you have the authority to do so and
                              permit us to use the information in accordance
                              with this Privacy Policy. You, while providing
                              your personal data over the Platform or any
                              partner platforms or establishments, consent to us
                              (including our other corporate entities,
                              affiliates, lending partners, technology partners,
                              marketing channels, business partners and other
                              third parties) to contact you through SMS, instant
                              messaging apps, call and/or e-mail for the
                              purposes specified in this Privacy Policy. You
                              have an option to withdraw your consent that you
                              have already provided by writing to the Grievance
                              Officer at the contact information provided below.
                              Please mention “Withdrawal of consent for
                              processing personal data” in your subject line of
                              your communication. We may verify such requests
                              before acting on our request. However, please note
                              that your withdrawal of consent will not be
                              retrospective and will be in accordance with the
                              Terms of Use, this Privacy Policy, and applicable
                              laws. In the event you withdraw consent given to
                              us under this Privacy Policy, we reserve the right
                              to restrict or deny the provision of our services
                              for which we consider such information to be
                              necessary. Changes to this Privacy Policy- Please
                              check our Privacy Policy periodically for changes.
                              We may update this Privacy Policy to reflect
                              changes to our information practices. We may alert
                              / notify you about the significant changes to the
                              Privacy Policy, in the manner as may be required
                              under applicable laws.
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

export default Privacy;
