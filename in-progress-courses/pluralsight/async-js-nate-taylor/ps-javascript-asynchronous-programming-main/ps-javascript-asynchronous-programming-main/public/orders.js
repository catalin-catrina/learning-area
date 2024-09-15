// let statuses = [];
// showWaiting();
//
// axios
//   .get('http://localhost:3000/api/orderStatuses/')
//   .then(({ data }) => {
//     console.log('statuses:', data);
//     statuses = data;
//
//     return axios.get('http://localhost:3000/api/orders/');
//   })
//   .then(({ data }) => {
//     console.log('orders', data);
//     let orders = data.map(order => ({
//       ...order,
//       orderStatus: statuses.find(s => s.id === order.orderStatusId).description,
//     }));
//
//     showOrderList('#order-list', orders);
//   })
//   .catch(error => showError('#order-list', error))
//   .finally(() => hideWaiting());

let statusReq = axios.get('http://localhost:3000/api/orderStatuses');
let addressReq = axios.get('http://localhost:3000/api/addresses');
let addressTypeReq = axios.get('http://localhost:3000/api/addressTypes');

let statuses = [];
let addresses = [];
let addressTypes = [];

// Promise.all([]) takes an array of promises and resolves when all promises resolve or when one of them fails. Catches first rejection
// Promise.allSettled([]) takes an array of promises and is resolved with an array of all the provided promises whether they were resolved or rejected - catch not needed but recommended
// Promise.any([]) takes an array of promises and returns the first fulfilled. Catches if all reject
// Promise.race([]) takes an array of promises and returns the first settled promise, whether its resolved or rejected

// Promise.all([statusReq, addressReq, addressTypeReq])
//   .then(([statusResult, addressResult, addressTypeResult]) => {
//     statuses = statusResult.data;
//     addresses = addressResult.data;
//     addressTypeReq = addressTypeResult.data;
//     console.log('addresses', addresses);
//
//     return axios.get('http://localhost:3000/api/orders');
//   })
//   .then(({ data }) => {
//     console.log('orders', data);
//     let orders = data.map(order => {
//       const status = statuses.find(status => status.id === order.orderStatusId);
//       const orderAddress = addresses.find(
//         address => address.id === order.shippingAddress
//       );
//       console.log(orderAddress);
//       return {
//         ...order,
//         orderStatus: status.description,
//         shippingAddressText: `${orderAddress.street} ${orderAddress.city}`,
//       };
//     });
//
//     showOrderList('#order-list', orders);
//   })
//   .catch(error => showError('#order-list', error));

Promise.allSettled([statusReq, addressReq, addressTypeReq])
  .then(([statusResult, addressResult, addressTypeResult]) => {
    if (statusResult.status === 'fulfilled') {
      statuses = statusResult.data;
    } else {
      window.alert('Order status error', statusResult.reason.message);
    }

    if (addressResult.status === 'fulfilled') {
      addresses = addressResult.data;
    } else {
      window.alert('Address error', addressResult.reason.message);
    }

    if (addressTypeResult.status === 'fulfilled') {
      addressTypeReq = addressTypeResult.data;
    } else {
      window.alert('Address type  error', addressTypeResult.reason.message);
    }

    console.log('addresses', addresses);

    return axios.get('http://localhost:3000/api/orders');
  })
  .then(({ data }) => {
    console.log('orders', data);
    let orders = data.map(order => {
      const status = statuses.find(status => status.id === order.orderStatusId);
      const orderAddress = addresses.find(
        address => address.id === order.shippingAddress
      );
      console.log(orderAddress);
      return {
        ...order,
        orderStatus: status.description,
        shippingAddressText: `${orderAddress.street} ${orderAddress.city}`,
      };
    });

    showOrderList('#order-list', orders);
  })
  .catch(error => showError('#order-list', error));
