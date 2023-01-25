export const buyerOrderSchema = {
  $id: 'bazar/buyer/orders',
  title: 'register buyer order asset transaction asset',
  type: 'object',
  properties: {
    productName: {
      fieldNumber: 1,
      dataType: 'string',
      maxLength: 100,
    },
    quantity: {
      fieldNumber: 2,
      dataType: 'uint64',
    },
    price: {
      fieldNumber: 3,
      dataType: 'uint64',
    },
    sellerOrderId: {
      fieldNumber: 4,
      dataType: 'string',
      maxLength: 50,
    },
  }
};