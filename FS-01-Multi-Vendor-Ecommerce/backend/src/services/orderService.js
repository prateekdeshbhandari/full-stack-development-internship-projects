const { randomUUID } = require('node:crypto');

const orders = new Map();

const failure = (status, error) => ({ status, error });

const placeOrder = (products, input) => {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return failure(400, 'Order data must be a JSON object.');
  }
  if (!Array.isArray(input.items) || input.items.length === 0 || input.items.length > 100) {
    return failure(400, 'An order must contain between 1 and 100 product items.');
  }

  const quantities = new Map();
  for (const item of input.items) {
    if (
      !item ||
      typeof item !== 'object' ||
      typeof item.productId !== 'string' ||
      !item.productId.trim() ||
      !Number.isSafeInteger(item.quantity) ||
      item.quantity < 1
    ) {
      return failure(400, 'Each item must include a productId and a positive whole-number quantity.');
    }

    const productId = item.productId.trim();
    const quantity = (quantities.get(productId) || 0) + item.quantity;
    if (!Number.isSafeInteger(quantity)) {
      return failure(400, 'The requested quantity is too large.');
    }
    quantities.set(productId, quantity);
  }

  const items = [];
  let totalCents = 0;
  for (const [productId, quantity] of quantities) {
    const product = products.get(productId);
    if (!product) {
      return failure(404, `Product '${productId}' was not found.`);
    }
    if (quantity > product.inventory) {
      return failure(409, `Not enough inventory for '${product.name}'.`);
    }

    const unitPriceCents = Math.round(product.price * 100);
    const lineTotalCents = unitPriceCents * quantity;
    if (!Number.isSafeInteger(lineTotalCents) || !Number.isSafeInteger(totalCents + lineTotalCents)) {
      return failure(400, 'The order total is too large.');
    }
    totalCents += lineTotalCents;
    items.push({
      productId,
      name: product.name,
      vendor: product.vendor,
      unitPrice: unitPriceCents / 100,
      quantity,
      lineTotal: lineTotalCents / 100,
    });
  }

  const order = {
    id: randomUUID(),
    items,
    total: totalCents / 100,
    status: 'placed',
    createdAt: new Date().toISOString(),
  };

  for (const item of items) {
    const product = products.get(item.productId);
    products.set(item.productId, { ...product, inventory: product.inventory - item.quantity });
  }
  orders.set(order.id, order);

  return { order };
};

const listOrders = () => [...orders.values()];

module.exports = { placeOrder, listOrders };
