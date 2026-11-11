const http = require('node:http');
const { randomUUID } = require('node:crypto');

const PORT = Number.parseInt(process.env.PORT || '4000', 10);
const MAX_BODY_BYTES = 16 * 1024;
const products = new Map(
  [
    {
      id: 'everyday-tote',
      name: 'Everyday Canvas Tote',
      description: 'A sturdy, reusable canvas tote for daily errands.',
      price: 24.99,
      category: 'Accessories',
      vendor: 'Northstar Goods',
      inventory: 42,
    },
    {
      id: 'ceramic-mug',
      name: 'Hand-thrown Ceramic Mug',
      description: 'A small-batch stoneware mug with a comfortable handle.',
      price: 18.5,
      category: 'Home',
      vendor: 'Clay & Kiln',
      inventory: 16,
    },
    {
      id: 'desk-notebook',
      name: 'Recycled Paper Notebook',
      description: 'An everyday notebook made with 100% recycled paper.',
      price: 12,
      category: 'Stationery',
      vendor: 'Paper Trail Studio',
      inventory: 30,
    },
  ].map((product) => [product.id, product]),
);

const sendJson = (response, statusCode, data) => {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(JSON.stringify(data));
};

const readJsonBody = (request) =>
  new Promise((resolve, reject) => {
    let body = '';
    let tooLarge = false;

    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body, 'utf8') > MAX_BODY_BYTES) {
        tooLarge = true;
      }
    });
    request.on('end', () => {
      if (tooLarge) {
        reject(Object.assign(new Error('Request body is too large.'), { status: 413 }));
        return;
      }

      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(Object.assign(new Error('Request body must be valid JSON.'), { status: 400 }));
      }
    });
    request.on('error', reject);
  });

const validateProduct = (input, existing = {}) => {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { error: 'Product data must be a JSON object.' };
  }

  const product = {
    name: input.name ?? existing.name,
    description: input.description ?? existing.description,
    price: input.price ?? existing.price,
    category: input.category ?? existing.category,
    vendor: input.vendor ?? existing.vendor,
    inventory: input.inventory ?? existing.inventory,
  };

  if (
    typeof product.name !== 'string' ||
    !product.name.trim() ||
    product.name.trim().length > 120
  ) {
    return { error: 'Name is required and must be at most 120 characters.' };
  }
  if (
    typeof product.description !== 'string' ||
    product.description.trim().length > 2000
  ) {
    return { error: 'Description must be a string of at most 2000 characters.' };
  }
  if (typeof product.price !== 'number' || !Number.isFinite(product.price) || product.price < 0) {
    return { error: 'Price must be a non-negative number.' };
  }
  if (
    typeof product.category !== 'string' ||
    !product.category.trim() ||
    product.category.length > 80
  ) {
    return { error: 'Category is required and must be at most 80 characters.' };
  }
  if (
    typeof product.vendor !== 'string' ||
    !product.vendor.trim() ||
    product.vendor.length > 120
  ) {
    return { error: 'Vendor is required and must be at most 120 characters.' };
  }
  if (!Number.isSafeInteger(product.inventory) || product.inventory < 0) {
    return { error: 'Inventory must be a non-negative whole number.' };
  }

  return {
    value: {
      name: product.name.trim(),
      description: product.description.trim(),
      price: Math.round(product.price * 100) / 100,
      category: product.category.trim(),
      vendor: product.vendor.trim(),
      inventory: product.inventory,
    },
  };
};

const server = http.createServer(async (request, response) => {
  const frontendOrigin = process.env.FRONTEND_ORIGIN;
  const requestOrigin = request.headers.origin;

  if (frontendOrigin && requestOrigin === frontendOrigin) {
    response.setHeader('Access-Control-Allow-Origin', frontendOrigin);
    response.setHeader('Vary', 'Origin');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  let url;
  try {
    url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  } catch {
    sendJson(response, 400, { message: 'Invalid request URL.' });
    return;
  }

  if (url.pathname === '/api/health' && request.method === 'GET') {
    sendJson(response, 200, { status: 'ok', service: 'multi-vendor-ecommerce-api' });
    return;
  }

  if (url.pathname === '/api/products' && request.method === 'GET') {
    const search = (url.searchParams.get('q') || '').trim().toLowerCase();
    const category = (url.searchParams.get('category') || '').trim().toLowerCase();
    const sort = url.searchParams.get('sort');

    if (sort && !['price-asc', 'price-desc'].includes(sort)) {
      sendJson(response, 400, { message: 'Sort must be price-asc or price-desc.' });
      return;
    }

    const results = [...products.values()].filter((product) => {
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.vendor.toLowerCase().includes(search);
      return matchesSearch && (!category || product.category.toLowerCase() === category);
    });

    if (sort) {
      const direction = sort === 'price-asc' ? 1 : -1;
      results.sort((first, second) => direction * (first.price - second.price));
    }

    sendJson(response, 200, { products: results, total: results.length });
    return;
  }

  const productMatch = url.pathname.match(/^\/api\/products\/([^/]+)$/);
  if (productMatch) {
    const id = decodeURIComponent(productMatch[1]);
    const existing = products.get(id);

    if (request.method === 'GET') {
      if (!existing) {
        sendJson(response, 404, { message: 'Product not found.' });
        return;
      }
      sendJson(response, 200, { product: existing });
      return;
    }

    if (request.method === 'PATCH') {
      if (!existing) {
        sendJson(response, 404, { message: 'Product not found.' });
        return;
      }
      if (request.headers['content-type']?.split(';')[0].trim() !== 'application/json') {
        sendJson(response, 415, { message: 'Content-Type must be application/json.' });
        return;
      }

      try {
        const validation = validateProduct(await readJsonBody(request), existing);
        if (validation.error) {
          sendJson(response, 400, { message: validation.error });
          return;
        }

        const product = { id, ...validation.value };
        products.set(id, product);
        sendJson(response, 200, { product });
      } catch (error) {
        sendJson(response, error.status || 400, { message: error.message });
      }
      return;
    }

    if (request.method === 'DELETE') {
      if (!existing) {
        sendJson(response, 404, { message: 'Product not found.' });
        return;
      }
      products.delete(id);
      response.writeHead(204);
      response.end();
      return;
    }
  }

  if (url.pathname === '/api/products' && request.method === 'POST') {
    if (request.headers['content-type']?.split(';')[0].trim() !== 'application/json') {
      sendJson(response, 415, { message: 'Content-Type must be application/json.' });
      return;
    }

    try {
      const validation = validateProduct(await readJsonBody(request));
      if (validation.error) {
        sendJson(response, 400, { message: validation.error });
        return;
      }

      const product = { id: randomUUID(), ...validation.value };
      products.set(product.id, product);
      sendJson(response, 201, { product });
    } catch (error) {
      sendJson(response, error.status || 400, { message: error.message });
    }
    return;
  }

  const knownPath =
    url.pathname === '/api/health' ||
    url.pathname === '/api/products' ||
    productMatch !== null;
  if (knownPath) {
    response.setHeader('Allow', productMatch ? 'GET, PATCH, DELETE' : 'GET, POST');
    sendJson(response, 405, { message: 'Method not allowed.' });
    return;
  }

  sendJson(response, 404, { message: 'Route not found.' });
});

server.listen(PORT, () => {
  console.log(`Ecommerce API listening on http://localhost:${PORT}`);
});
