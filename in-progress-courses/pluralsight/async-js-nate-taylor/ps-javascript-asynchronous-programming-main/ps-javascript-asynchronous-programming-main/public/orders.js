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

// let statusReq = axios.get('http://localhost:3000/api/orderStatuses');
// let addressReq = axios.get('http://localhost:3000/api/addresses');
// let addressTypeReq = axios.get('http://localhost:3000/api/addressTypes');
//
// let statuses = [];
// let addresses = [];
// let addressTypes = [];

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

// Promise.allSettled([statusReq, addressReq, addressTypeReq])
//   .then(([statusResult, addressResult, addressTypeResult]) => {
//     if (statusResult.status === 'fulfilled') {
//       statuses = statusResult.value.data;
//     } else {
//       window.alert('Order status error', statusResult.reason.message);
//     }
//
//     if (addressResult.status === 'fulfilled') {
//       addresses = addressResult.value.data;
//     } else {
//       window.alert('Address error', addressResult.reason.message);
//     }
//
//     if (addressTypeResult.status === 'fulfilled') {
//       addressTypeReq = addressTypeResult.value.data;
//     } else {
//       window.alert('Address type  error', addressTypeResult.reason.message);
//     }
//
//     return axios.get('http://localhost:3000/api/orders');
//   })
//   .then(({ data }) => {
//     let orders = data.map(order => {
//       const status = statuses.find(status => status.id === order.orderStatusId);
//       const orderAddress = addresses.find(
//         address => address.id === order.shippingAddress
//       );
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

// here orders request will start only after orderStatuses request ends
// async function get() {
// const { data: statuses } = await axios.get(
//   'http://localhost:3000/api/orderStatuses'
// );
//   const { data } = await axios.get('http://localhost:3000/api/orders');
//
//   const orders = data.map(order => {
//     return {
//       ...order,
//       orderStatus: statuses.find(status => status.id === order.id).description,
//     };
//   });
//
//   showOrderList('#order-list', orders);
// }
//
// get();

// with this technique both requests are made at the same time
// const get = async () => {
//   const statusesReq = axios.get('http://localhost:3000/api/orderStatuses');
//   const ordersReq = axios.get('http://localhost:3000/api/orders');
//
//   const { data: statuses } = await statusesReq;
//   const { data: orders } = await ordersReq;
//
//   const newOrders = orders.map(order => {
//     return {
//       ...order,
//       orderStatus: statuses.find(status => status.id === order.id).description,
//     };
//   });
//
//   showOrderList('#order-list', newOrders);
// };
//
// get();

// same thing as above but this allows us to make changes to the UI while we wait for stuff to happen
async function get() {
  await Promise.all([
    (async () => {
      const { data } = await axios.get(
        'http://localhost:3000/api/orderStatuses'
      );
      showMessage('Statuses fetched');
    })(),
    (async () => {
      const { data } = await axios.get('http://localhost:3000/api/orders');
      showOrderList('#order-list', data);
    })(),
  ]);
}

get();
