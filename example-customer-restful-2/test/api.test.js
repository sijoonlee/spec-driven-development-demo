const http = require('http');
const { app } = require('../src/app');

const BASE_URL = 'http://localhost:3001/api/v1/customers';
let testCustomerId = null;

const requests = {
  post: (path, body) => sendRequest('POST', path, body),
  get: (path) => sendRequest('GET', path),
  put: (path, body) => sendRequest('PUT', path, body),
  del: (path) => sendRequest('DELETE', path),
};

function sendRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: { 'Content-Type': 'application/json' },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: data ? JSON.parse(data) : null });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTests() {
  let passed = 0,
    failed = 0;
  let server = null;

  console.log('\n=== Customer API Tests ===\n');
  console.log('Starting test server on port 3001...');

  process.env.PORT = '3001';
  process.env.MONGODB_URI = 'mongodb://localhost:27017/customers_test';

  const { start } = require('../src/app');
  server = await start();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Test 1: Create valid customer
  console.log('Test 1: POST /api/v1/customers - Create valid customer');
  const createResp = await requests.post(BASE_URL, {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1-555-123-4567',
  });
  if (createResp.status === 201 && createResp.body.firstName === 'John') {
    console.log('✓ PASS: Customer created with 201 status');
    passed++;
    testCustomerId = createResp.body._id;
  } else {
    console.log('✗ FAIL: Expected 201 status');
    failed++;
  }

  // Test 2: Create customer with missing fields
  console.log('\nTest 2: POST /api/v1/customers - Missing required fields');
  const missingResp = await requests.post(BASE_URL, { firstName: 'John' });
  if (missingResp.status === 400 && missingResp.body.errors && missingResp.body.errors.length > 0) {
    console.log('✓ PASS: Returns 400 with errors array');
    passed++;
  } else {
    console.log('✗ FAIL: Expected 400 with errors');
    failed++;
  }

  // Test 3: Create customer with invalid phone
  console.log('\nTest 3: POST /api/v1/customers - Invalid phone number');
  const invalidPhoneResp = await requests.post(BASE_URL, {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: 'invalid',
  });
  if (invalidPhoneResp.status === 400 && invalidPhoneResp.body.errors.length > 0) {
    console.log('✓ PASS: Returns 400 for invalid phone');
    passed++;
  } else {
    console.log('✗ FAIL: Expected 400 for invalid phone');
    failed++;
  }

  // Test 4: Duplicate phone number
  console.log('\nTest 4: POST /api/v1/customers - Duplicate phone number');
  const duplicateResp = await requests.post(BASE_URL, {
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1-555-123-4567',
  });
  if (duplicateResp.status === 409) {
    console.log('✓ PASS: Returns 409 for duplicate phone');
    passed++;
  } else {
    console.log('✗ FAIL: Expected 409 for duplicate');
    failed++;
  }

  await sleep(500);

  // Test 5: GET all customers
  console.log('\nTest 5: GET /api/v1/customers - List all');
  const listResp = await requests.get(BASE_URL);
  if (listResp.status === 200 && Array.isArray(listResp.body) && listResp.body.length >= 1) {
    console.log('✓ PASS: Returns 200 with array of customers');
    passed++;
  } else {
    console.log('✗ FAIL: Expected 200 with array');
    failed++;
  }

  // Test 6: GET customer by ID
  console.log('\nTest 6: GET /api/v1/customers/:id - Get by ID');
  const getResp = await requests.get(`${BASE_URL}/${testCustomerId}`);
  if (getResp.status === 200 && getResp.body.firstName === 'John') {
    console.log('✓ PASS: Returns 200 with customer data');
    passed++;
  } else {
    console.log('✗ FAIL: Expected 200 with customer');
    failed++;
  }

  // Test 7: GET non-existent customer
  console.log('\nTest 7: GET /api/v1/customers/:id - Non-existent ID');
  const notFoundId = '60d5ecb98b24e8a09b24e8a1';
  const notFoundResp = await requests.get(`${BASE_URL}/${notFoundId}`);
  if (notFoundResp.status === 404 && notFoundResp.body.errors) {
    console.log('✓ PASS: Returns 404 with errors');
    passed++;
  } else {
    console.log('✗ FAIL: Expected 404 for non-existent');
    failed++;
  }

  // Test 8: GET with invalid ID format
  console.log('\nTest 8: GET /api/v1/customers/:id - Invalid ID format');
  const invalidIdResp = await requests.get(`${BASE_URL}/invalid-id`);
  if (invalidIdResp.status === 400) {
    console.log('✓ PASS: Returns 400 for invalid ID format');
    passed++;
  } else {
    console.log('✗ FAIL: Expected 400 for invalid ID');
    failed++;
  }

  await sleep(500);

  // Test 9: PUT update customer
  console.log('\nTest 9: PUT /api/v1/customers/:id - Update customer');
  const updateResp = await requests.put(`${BASE_URL}/${testCustomerId}`, {
    firstName: 'Johnny',
    lastName: 'Doe',
    phoneNumber: '+1-555-123-4567',
  });
  if (updateResp.status === 200 && updateResp.body.firstName === 'Johnny') {
    console.log('✓ PASS: Returns 200 with updated customer');
    passed++;
  } else {
    console.log('✗ FAIL: Expected 200 with updated data');
    failed++;
  }

  // Test 10: PUT with validation error
  console.log('\nTest 10: PUT /api/v1/customers/:id - Update with validation error');
  const updateErrorResp = await requests.put(`${BASE_URL}/${testCustomerId}`, {
    firstName: '',
    lastName: 'Doe',
    phoneNumber: '+1-555-123-4567',
  });
  if (updateErrorResp.status === 400 && updateErrorResp.body.errors) {
    console.log('✓ PASS: Returns 400 with errors');
    passed++;
  } else {
    console.log('✗ FAIL: Expected 400 for validation error');
    failed++;
  }

  // Test 11: PUT non-existent customer
  console.log('\nTest 11: PUT /api/v1/customers/:id - Update non-existent');
  const updateNotFoundResp = await requests.put(`${BASE_URL}/${notFoundId}`, {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1-555-999-9999',
  });
  if (updateNotFoundResp.status === 404) {
    console.log('✓ PASS: Returns 404 for non-existent');
    passed++;
  } else {
    console.log('✗ FAIL: Expected 404');
    failed++;
  }

  await sleep(500);

  // Test 12: DELETE customer
  console.log('\nTest 12: DELETE /api/v1/customers/:id - Delete customer');
  const deleteResp = await requests.del(`${BASE_URL}/${testCustomerId}`);
  if (deleteResp.status === 204 && !deleteResp.body) {
    console.log('✓ PASS: Returns 204 No Content');
    passed++;
  } else {
    console.log('✗ FAIL: Expected 204 No Content');
    failed++;
  }

  // Test 13: DELETE non-existent customer
  console.log('\nTest 13: DELETE /api/v1/customers/:id - Delete non-existent');
  const deleteNotFoundResp = await requests.del(`${BASE_URL}/${testCustomerId}`);
  if (deleteNotFoundResp.status === 404) {
    console.log('✓ PASS: Returns 404 for already deleted');
    passed++;
  } else {
    console.log('✗ FAIL: Expected 404');
    failed++;
  }

  // Test 14: GET deleted customer
  console.log('\nTest 14: GET /api/v1/customers/:id - Get deleted customer');
  const getDeletedResp = await requests.get(`${BASE_URL}/${testCustomerId}`);
  if (getDeletedResp.status === 404) {
    console.log('✓ PASS: Returns 404 for deleted customer');
    passed++;
  } else {
    console.log('✗ FAIL: Expected 404');
    failed++;
  }

  console.log(`\n=== Results: ${passed} passed, ${failed} failed ===\n`);

  if (server) {
    server.close();
  }
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
