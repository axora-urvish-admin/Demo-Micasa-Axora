import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from './BaseUrl';
import InnerHeader from './InnerHeader';
import { DataGrid } from '@mui/x-data-grid';

const SalesReport = () => {
    const [sales, setsalesData] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [value, setValue] = useState({
        sales: "",
        Name: "",
        Number: "",
        from: "",
        to: "",
        deliveryStatus: "",
        paymentStatus: "",
    })

    const onhandleChange = (e) => {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleCancel = () => {
        setValue({
            sales: "",
            Name: "",
            Number: "",
            from: "",
            to: "",
            deliveryStatus: "",
            paymentStatus: "",
        })
        setFilteredData(sales)

    }

    async function getsalesdata() {
        axios.get(`${BASE_URL}/sales_detail`)
            .then((res) => {
                console.log(res.data)
                setsalesData(res.data)
                setFilteredData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getsalesdata()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredResult = sales.filter(item => {
            // Apply sales filter   
            const salesMatch = value.sales === '' || item.salesno.includes(value.sales);
            const nameMatch = value.Name === '' || item.firstname.toLowerCase().includes(value.Name.toLowerCase());
            const numberMatch = value.Number === '' || item.mobileno.includes(value.Number);

            let dateMatch = true;
            const salesDate = item.created_date.split('T')[0];
            const from = value.from;
            const to = value.to;
            if (value.from && !value.to) {
                dateMatch = salesDate >= from;
                console.log(dateMatch, "????")
            } else if (!value.from && value.to) {
                dateMatch = salesDate <= to;
                console.log(dateMatch, "????")
            } else if (value.from && value.to) {
                dateMatch = salesDate >= from && salesDate <= to;
                console.log(dateMatch, "????")
            }
            const deliveryStatusMatch = value.deliveryStatus === 'All' || value.deliveryStatus === '' || item.ostatus === parseInt(value.deliveryStatus);

            const paymentStatusMatch = value.paymentStatus === 'All' || value.paymentStatus === '' || item.paymentStatus === parseInt(value.paymentStatus);
            console.log(item.paystatus === parseInt(value.paymentStatus), "???????")
            return salesMatch && nameMatch && numberMatch && dateMatch && deliveryStatusMatch && paymentStatusMatch;


        });
        // Update filtered data state
        setFilteredData(filteredResult);
    }


    const rows = sales.map((row, index) => ({ index: index + 1, ...row }));

    const columns = [
        {
            field: 'index',
            headerName: 'ID',
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            flex: 1,

        },
        { field: 'firstname', headerName: 'Firstname', flex: 2 },
        { field: 'lastname', headerName: 'Lastname', flex: 2 },
        {
            field: 'email',
            headerName: 'Email',
            flex: 4
        },
        {
            field: 'deleted_date',
            headerName: 'Deleted Date',
            flex: 4
        },
     
    ];



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
                                    </div>
                                    <form class="forms-sample" onSubmit={handleSubmit}>
                                        <div className='row'>
                                       
                                            <div class="form-group col-lg-3">
                                                <label for="exampleInputUsername1">Customer Name</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter Name" name='Name' value={value.Name} onChange={onhandleChange} />
                                            </div>
                                         
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">sales From</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" placeholder="sales No" name='from' value={value.from} onChange={onhandleChange} />
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="exampleInputUsername1">sales To</label>
                                                <input type="date" class="form-control" id="exampleInputUsername1" placeholder="sales No" name='to' value={value.to} onChange={onhandleChange} />
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
                                            <h4 class="card-title">Sales Report </h4>
                                            <p class="card-description">
                                                List Of sales
                                            </p>
                                        </div>
                                        {/* <div>
                                            <Link to="/webapp/vendorform"><button className=' btn btn-primary'>Add Vendor</button></Link>
                                        </div> */}
                                    </div>

                                    <div class="table-responsive pt-3">
                                       <DataGrid
                                            rows={rows}
                                            columns={columns}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { pageSize: 10, page: 0 },
                                                },
                                            }}
                                        />
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

export default SalesReport ;