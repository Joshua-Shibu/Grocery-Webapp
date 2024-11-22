import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoaderSpinner from '../../components/LoaderSpinner'

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [statusForm, setStatusForm] = useState({
    status: 'Confirmed', // Default status
  });

  // Simulating isLoading with a useEffect delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating 2 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  // Fetch data when not loading
  useEffect(() => {
    getData()
  }, []);


  const getData = () => {
    axios.get('http://localhost:5100/orders')
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
  }

  const onSubmit = (formData) => {
    axios.put(`http://localhost:5100/orders/${selectedOrderId}`,formData)
    .then((response) => {
        setIsUpdate(false);
        getData()
    }).catch((e) => {
        console.log(e)
    })
  };

  const onChangeStatus = (orderId) => {
    setIsUpdate(true);
    setSelectedOrderId(orderId);
  };

  return (
    <div style={{marginTop:'10vh'}}>
      {isLoading ? (
        <div style={{height:'100vh',alignItems:'center',justifyContent:'center'}}>
          <LoaderSpinner/>
        </div>
      ) : (
        <div className="container" style={{textAlign:'start'}}>
          <h1 style={{ color: 'rgb(62,62,62)', fontSize: '38px', fontWeight: 'bold' }} className="mb-4">
            Orders
          </h1>
          {data.length === 0 ? (
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <img
                  src="https://img.freepik.com/free-vector/black-friday-concept-illustration_114360-3667.jpg?size=626&ext=jpg&ga=GA1.2.796843707.1683431325&semt=ais"
                  alt="No Cart Items" className="img-fluid"
                />
                <h3 className="mt-3" style={{ color: 'rgb(62,62,62)', fontWeight: 'bold' }}>
                  No Orders
                </h3>
                <p style={{ color: '#787878' }}>No orders in your shop!</p>
              </div>
            </div>
          ) : (
            <div>
              {isUpdate ? (
                <div>
                  <form onSubmit={(e) => { e.preventDefault(); onSubmit(statusForm); }}>
                    <div className="form-group">
                      <label htmlFor="statusSelect">Select Status</label>
                      <select className="form-control" id="statusSelect" value={statusForm.status} onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </form>
                </div>
              ) : null}
              {!isUpdate ? <div className="row">
                {data.map((item) => (
                  <div key={item._id} className="card mb-2">
                    <div className="card-body">
                      <h5 className="card-title"><strong>Order ID:</strong> {item._id}</h5>
                      <p className="card-text"><strong>Fullname:</strong> {item.firstname} {item.lastname}</p>
                      <p className="card-text"><strong>Phone:</strong> {item.phone}</p>
                      <p className="card-text"><strong>Product ID:</strong> {item.productId}</p>
                      <p className="card-text"><strong>Quantity:</strong> {item.quantity}</p>
                      <p className="card-text"><strong>Total price:</strong> {item.price}</p>
                      <p className="card-text"><strong>Payment Method:</strong> {item.paymentMethod}</p>
                      <p className="card-text"><strong>Address:</strong> {item.address}</p>
                      <p className="card-text"><strong>Created At:</strong> {item.createdAt}</p>
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="card-text"><strong>Status:</strong> {item.status}</p>
                        {item.status !== 'Canceled' && item.status !== 'Delivered'?<button className="btn" onClick={() => onChangeStatus(item._id)} disabled={item.status === 'Delivered'}  style={{ backgroundColor: 'rgb(98, 90, 252)', color: '#fff', width: '150px' }} >Update status</button>:""}
                        {item.status === 'Canceled'?<button onClick={() => onChangeStatus(item._id)} disabled={item.status === 'Canceled'} className="btn btn-danger">Customer Canceled</button>:''}
                        {item.status === 'Delivered'?<button onClick={() => onChangeStatus(item._id)} disabled={item.status === 'Delivered'} className="btn btn-success">Delivered</button>:''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>:''}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
