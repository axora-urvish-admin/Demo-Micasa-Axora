import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Orders = () => {
  
    const [order, setOrderData] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [value, setValue] = useState({
        Order: "",
        Name: "",
        Number: "",
        from: "",
        to: "",
        deliveryStatus: "",
        paymentStatus: "",
    })
    const [searchQuery, setSearchQuery] = useState('');

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleCancel = () => {
        setValue({
            Order: "",
            Name: "",
            Number: "",
            from: "",
            to: "",
            deliveryStatus: "",
            paymentStatus: "",
        })
        setFilteredData(order)

    }

    async function getOrderdata() {
        axios.get(`${BASE_URL}/order_detail`)
            .then((res) => {
                // console.log(res.data)
                setOrderData(res.data)
                setFilteredData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getOrderdata()
    }, [])

    // Function to handle search input changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter orders based on search query
    const filteredOrders = order.filter(item =>
        item.orderno.includes(searchQuery)
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredResult = order.filter(item => {
            const orderMatch = value.Order === '' || item.orderno.includes(value.Order);

            
            // const nameMatch = value.Name === '' || item.firstname.toLowerCase().includes(value.Name.toLowerCase());
            // const numberMatch = value.Number === '' || item.mobileno.includes(value.Number);

            const nameMatch = value.Name === '' || item.firstname.toLowerCase().includes(value.Name.toLowerCase());
            const numberMatch = value.Number === '' || (item.mobileno && item.mobileno.includes(value.Number));
            
            // console.log('Filtering by Name:', value.Name, 'Item Name:', item.firstname, nameMatch);
            // console.log('Filtering by Mobile No:', value.Number, 'Item Mobile No:', item.mobileno, numberMatch);


            let dateMatch = true;
            const orderDate = item.created_date.split('T')[0];
            const from = value.from;
            const to = value.to;
            if (value.from && !value.to) {
                dateMatch = orderDate >= from;
                console.log(dateMatch, "????")
            } else if (!value.from && value.to) {
                dateMatch = orderDate <= to;
                console.log(dateMatch, "????")
            } else if (value.from && value.to) {
                dateMatch = orderDate >= from && orderDate <= to;
                console.log(dateMatch, "????")
            }
            const deliveryStatusMatch = value.deliveryStatus === 'All' || value.deliveryStatus === '' || item.ostatus === parseInt(value.deliveryStatus);
            const paymentStatusMatch = value.paymentStatus === 'All' || value.paymentStatus === '' || item.paymentStatus === parseInt(value.paymentStatus);
            console.log(item.paystatus === parseInt(value.paymentStatus), "???????")
            return orderMatch && nameMatch && numberMatch && dateMatch && deliveryStatusMatch && paymentStatusMatch;


        });
        // Update filtered data state
        setFilteredData(filteredResult);
    }




    return (
        <div class="container-fluid page-body-wrapper col-lg-10">
            <InnerHeader />
          
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Search By </h4>

                                        </div>
                                        <div>
                                            <TextField
                                                label="Search by Order ID"
                                                variant="outlined"
                                                value={searchQuery}
                                                onChange={handleSearchChange}
                                                sx={{ width: '300px', marginRight: '10px' }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <form class="forms-sample" onSubmit={handleSubmit}>
                                        <div className='row'>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Order No</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Order No" name='Order' value={value.Order} onChange={onhandleChange} />
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Customer Name</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter Name" name='Name' value={value.Name} onChange={onhandleChange} />
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Mobile No</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter Number" name='Number' value={value.Number} onChange={onhandleChange} />
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Order From</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" placeholder="Order No" name='from' value={value.from} onChange={onhandleChange} />
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">Order To</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" placeholder="Order No" name='to' value={value.to} onChange={onhandleChange} />
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Delivery Status</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" name='deliveryStatus' onChange={onhandleChange}>
                                                    <option selected>All</option>
                                                    <option value="Confirm">Confirm</option>
                                                    <option value="Dispatched">Dispatch</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>

                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleFormControlSelect1">Payment Status</label>
                                                <select class="form-control form-control-lg" id="exampleFormControlSelect1" name='paymentStatus' onChange={onhandleChange}>
                                                    <option selected>All</option>
                                                    <option value="1">Paid</option>
                                                    <option value="2">Cod</option>
                                                </select>

                                            </div>


                                        </div>

                                        <button type="submit" class="btn btn-primary mr-2">Search</button>
                                        <button type="button" class="btn btn-light" onClick={handleCancel}>Cancel</button>
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h4 class="card-title">Orders </h4>
                                            <p class="card-description">
                                                List Of Orders
                                            </p>
                                        </div>
                                        {/* <div>
                                            <Link to="/webapp/vendorform"><button className=' btn btn-primary'>Add Vendor</button></Link>
                                        </div> */}
                                    </div>

                                    <div class="table-responsive pt-3">
                                        <table class="table table-bordered">
                                            <thead>

                                                <tr>
                                                    <th>
                                                        Order Id
                                                    </th>
                                                    <th>
                                                        Order's Date & Time
                                                    </th>
                                                    <th>
                                                        Invoice No
                                                    </th>
                                                    <th>
                                                        Customer Name
                                                    </th>
                                                    <th>
                                                        Mobile No.
                                                    </th>
                                                    <th>
                                                        Amount
                                                    </th>
                                                    <th>
                                                        Payment Status
                                                    </th>
                                                    <th>
                                                        Order Status
                                                    </th>
                                                    <th>
                                                        Print Invoice
                                                    </th>
                                                    <th>
                                                        View
                                                    </th>
                                                </tr>


                                            </thead>


                                            <tbody>

                                                {filteredOrders.map((item) => {
                                                    return (
                                                        <tr >
                                                            <td>
                                                                {item.orderno}
                                                            </td>
                                                            <td>
                                                                {item.order_date}
                                                            </td>
                                                            <td>
                                                                {item.invoiceNo}
                                                            </td>
                                                            <td>
                                                                {item.firstname} {item.lastname}
                                                            </td>
                                                            <td>
                                                                {item.mobileno} 
                                                            </td>
                                                            <td>
                                                                ₹{item.totalamt}
                                                            </td>
                                                            <td>
                                                                {item.paystatus == 0 ? "pending" : "paid"}
                                                            </td>
                                                            <td>
                                                                {item.ostatus}
                                                            </td>
                                                            <td>

                                                                <button className='bt btn-sm btn-primary'>Print Invoice</button>
                                                            </td>
                                                            <td>
                                                                <Link to={`/webapp/view/${item.id}`}><RemoveRedEyeIcon className='text-primary' /></Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders