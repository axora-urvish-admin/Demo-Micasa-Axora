// DocumentComponent.jsx
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image, Font } from '@react-pdf/renderer';
import logo from '../assets/images/chair.jpg'
import { BASE_URL } from './BaseUrl';
import axios from 'axios';
// Create styles




const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: "lightslategrey"
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '2px solid #000',
    paddingBottom: 10,
    marginBottom: 20,
  },
  headerLeft: {
    textAlign: 'left'
  },
  headerRight: {
    textAlign: 'right'
  },
  billTo: {
    marginBottom: 15
  },
  itemsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',

  },
  tableCellHeader: {
    borderBottom: '1px solid #ddd',
    padding: 8,
    fontWeight: '800'
  },
  tableCell: {
    borderBottom: '1px solid #ddd',
    padding: 8
  },
  totals: {
    marginBottom: 20
  },
  footer: {
    marginBottom: 20
  },
  signatory: {
    textAlign: 'right',
    marginTop: 40
  }
});

// Create Document Component
const MyDocument = (props) => {
  const [order, setOrder] = useState([])
  const [cart, setCart] = useState([])


  async function getOrderDetails() {
    const data = {
      order_id: props.orderid
    }
    axios.post(`${BASE_URL}/order_view`, data)
      .then((res) => {
        setOrder(res.data[0])
      })
  }

  async function getcartdata() {

    const data = {
      order_id: props.orderid
    }

    axios.post(`${BASE_URL}/getcartData`, data)
      .then((res) => {
        console.log(res)

        setCart(res.data)


      })
  }

  useEffect(() => {
    getcartdata()
    getOrderDetails()
  }, [])


 const totalcgst = cart.reduce((total, row) => total + Number(row.cgst), 0);
  const totalsgst = cart.reduce((total, row) => total + Number(row.sgst), 0);

  const totalgst = totalcgst + totalsgst

  const finalamt = totalgst + Number(order.totalamt) 
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={{ lineHeight: "1.3", color: "#000" }}>ARCH INTERNATIONAL</Text>
            <Text style={{ lineHeight: "1.3", color: "#000" }}>HEAD OFFICE</Text>
            <Text style={{ lineHeight: "1.3" }}>Shop Number 1 ,1223/61</Text>
            <Text style={{ lineHeight: "1.3" }}>Opposite Aditya Bakery, Link Road , Tikari</Text>
            <Text>
              <Text style={{ lineHeight: "1.3", color: "#000" }}>Cell: </Text>
              <Text>+91 999999999 | musu@gmail.com</Text>
            </Text>
          </View>
          <View style={styles.headerRight}>
            <View>

            </View>
            <Text style={{ lineHeight: "1.3", color: "#000" }}>Invoice</Text>
            <Text style={{ display: "flex" }}>
              <Text style={{ lineHeight: "1.3", color: "#000" }}>Invoice No: </Text>
              <Text>RST-WS/23-24/001</Text>
            </Text>
            <Text style={{ display: "flex" }}>
              <Text style={{ lineHeight: "1.3", color: "#000" }}>GSTIN: </Text>
              <Text>23CUBPG8579D1ZN</Text>
            </Text>
            <Text style={{ display: "flex" }}>
              <Text style={{ lineHeight: "1.3", color: "#000" }}>State: </Text>
              <Text>Madhya Pradesh</Text>
            </Text>
            <Text style={{ display: "flex" }}>
              <Text style={{ lineHeight: "1.3", color: "#000" }}>Dated: </Text>
              <Text>04-10-2023</Text>
            </Text>

          </View>
        </View>
        <View style={styles.billTo}>
          <Text style={{ backgroundColor: "#02416A", fontSize: 10, padding: "6px", color: "#fff" }}>Bill To:</Text>
          <Text style={{ marginTop: "10px" }}>
            <Text style={{ lineHeight: "1.2", color: "#000" }}>Name: </Text>
            <Text>{order.sfirstname} {order.slastname}</Text>
          </Text>

          <Text style={{ display: "flex" }}>
            <Text style={{ lineHeight: "1.2", color: "#000" }}>Address:</Text>
            <Text style={{ lineHeight: "1.2" }}>{order.shipaddress},{order.shipcity}-{order.shippostcode}</Text>
          </Text>



        </View>

        <View style={styles.itemsTable}>
          <View style={{ flexDirection: "row", backgroundColor: "#02416A", color: "#fff" }}>
            <Text style={{ fontWeight: "800", width: "30%", borderBottom: "1px solid #000", padding: 6 }}>Description</Text>
            <Text style={{ fontWeight: "800", width: "20%", borderBottom: "1px solid #000", padding: 6 }}>Hsn Code</Text>
            <Text style={{ fontWeight: "800", width: "10%", borderBottom: "1px solid #000", padding: 6 }}>Size</Text>
            <Text style={{ fontWeight: "800", width: "10%", borderBottom: "1px solid #000", padding: 6 }}>Quantity</Text>
            <Text style={{ fontWeight: "800", width: "10%", borderBottom: "1px solid #000", padding: 6 }}>Rate</Text>
            <Text style={{ fontWeight: "800", width: "20%", borderBottom: "1px solid #000", padding: 6 }}>Amount</Text>
          </View>
          {cart.map((item) => {
            const ptotal = item.price * item.pqty
            return (
              <View style={styles.tableRow}>
                <Text style={{ fontWeight: "800", width: "30%", borderBottom: "1px solid #ddd", padding: 6, color: "000" }}>{item.pname}</Text>
                <Text style={{ fontWeight: "800", width: "20%", borderBottom: "1px solid #ddd", padding: 6 }}>NA</Text>
                <Text style={{ fontWeight: "800", width: "10%", borderBottom: "1px solid #ddd", padding: 6 }}>s</Text>
                <Text style={{ fontWeight: "800", width: "10%", borderBottom: "1px solid #ddd", padding: 6 }}>{item.pqty}</Text>
                <Text style={{ fontWeight: "800", width: "10%", borderBottom: "1px solid #ddd", padding: 6 }}>{item.price}</Text>
                <Text style={{ fontWeight: "800", width: "20%", borderBottom: "1px solid #ddd", padding: 6 }}>{ptotal}</Text>
              </View>

            )
          })}


          {/* <View style={styles.tableRow}>
            <Text style={{ fontWeight: "800", width: "30%", borderBottom: "1px solid #ddd", padding: 6, color: "000" }}>Irish Blue</Text>
            <Text style={{ fontWeight: "800", width: "20%", borderBottom: "1px solid #ddd", padding: 6 }}>5007</Text>
            <Text style={{ fontWeight: "800", width: "10%", borderBottom: "1px solid #ddd", padding: 6 }}>N/A</Text>
            <Text style={{ fontWeight: "800", width: "10%", borderBottom: "1px solid #ddd", padding: 6 }}>1</Text>
            <Text style={{ fontWeight: "800", width: "10%", borderBottom: "1px solid #ddd", padding: 6 }}>10</Text>
            <Text style={{ fontWeight: "800", width: "20%", borderBottom: "1px solid #ddd", padding: 6 }}>10</Text>
          </View> */}
          <View style={styles.tableRow}>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "900", fontSize: "10px", width: "40%", borderBottom: "1px solid #ddd", padding: 3, color: "#000" }}>Total Amount Before Tax:</Text>
            <Text style={{ fontWeight: "800", fontSize: "10px", width: "20%", borderBottom: "1px solid #ddd", padding: 3 }}>{order.totalamt}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "900", fontSize: "10px", width: "40%", borderBottom: "1px solid #ddd", padding: 3, color: "#000" }}>Cgst:</Text>
            <Text style={{ fontWeight: "800", fontSize: "10px", width: "20%", borderBottom: "1px solid #ddd", padding: 3 }}>{totalcgst}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "900", fontSize: "10px", width: "40%", borderBottom: "2px solid #000", padding: 3, color: "#000" }}>Sgst:</Text>
            <Text style={{ fontWeight: "800", fontSize: "10px", width: "20%", borderBottom: "2px solid #000", padding: 3 }}>{totalsgst}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "900", fontSize: "10px", width: "40%", borderBottom: "1px solid #ddd", padding: 3, color: "#000" }}>Total Amount After Tax:</Text>
            <Text style={{ fontWeight: "800", fontSize: "10px", width: "20%", borderBottom: "1px solid #ddd", padding: 3 }}>{finalamt}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 6 }}></Text>
            <Text style={{ fontWeight: "900", fontSize: "10px", width: "40%", borderBottom: "1px solid #ddd", padding: 3, color: "#000" }}>Shipping Amt:</Text>
            <Text style={{ fontWeight: "800", fontSize: "10px", width: "20%", borderBottom: "1px solid #ddd", padding: 3 }}>0</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={{ fontWeight: "800", width: "10%", padding: 3 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 3 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 3 }}></Text>
            <Text style={{ fontWeight: "800", width: "10%", padding: 3 }}></Text>
            <Text style={{ fontWeight: "900", fontSize: "10px", width: "40%", borderBottom: "2px solid #000", padding: 3, color: "#000" }}>Final Amt:</Text>
            <Text style={{ fontWeight: "800", fontSize: "10px", width: "20%", borderBottom: "2px solid #000", padding: 3 }}>{finalamt}</Text>
          </View>
        </View>

        <View>
          <Text style={{ borderBottom: "2px solid #000" }}></Text>
        </View>

        <View style={{ backgroundColor: "#02416A", fontSize: 10, padding: "6px", color: "#fff", marginBottom: "30px" }}>
          <Text>Rupees: FIFTEEN THOUSAND ONE HUNDRED AND TEN</Text>
        </View>

        <View style={styles.footer}>
          <Text style={{ color: "#000" }} >Make all checks payable to</Text>
          <Text style={{ lineHeight: "1.2", color: "#000" }}>For Online Transfer, Kindly make it to</Text>
          <Text style={{ lineHeight: "1.2" }}><strong>RAAGA SILK TALES</strong></Text>
          <Text style={{ lineHeight: "1.2" }}>Axis Bank, A/c no: 919020001974574</Text>
          <Text style={{ lineHeight: "1.2" }}>Swift Code: UTIB0000647</Text>
          <Text style={{ lineHeight: "1.2" }}>Account Type: Current</Text>
          <Text style={styles.signatory}>(Authorised Signatory)</Text>
          <Text style={{ color: "#000", lineHeight: "1.2" }}>Thank you for your business !!!</Text>
        </View>
      </Page>
    </Document>
  )

};

// export default function DocumentComponent() {
//   return (
//     <div>
//       <PDFDownloadLink document={<MyDocument />} fileName="example.pdf">
//         {({ blob, url, loading, error }) =>
//           loading ? 'Loading document...' : 'Download PDF'
//         }
//       </PDFDownloadLink>
//     </div>
//   );
// }

export default MyDocument

