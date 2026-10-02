// scripts/test_server_endpoints.ts
import http from 'http';

async function testFetch(url: string, options: http.RequestOptions = {}, postData?: string): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode || 0, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode || 0, body: data });
        }
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runTests() {
  console.log('Testing endpoints on local server (PORT 3000)...');
  try {
    const health = await testFetch('http://localhost:3000/api/health');
    console.log('1. Healthcheck:', health.status, health.body);

    const curriculum = await testFetch('http://localhost:3000/api/curriculum');
    console.log('2. Curriculum:', curriculum.status, 'Items count:', curriculum.body?.count);

    const checkoutData = JSON.stringify({
      email: 'test_walter@estudiosimple.cl',
      name: 'Walter Test',
      rut: '12.345.678-5',
      grade: '7° Básico',
      plan: 'mensual',
      amount: 19990
    });
    const checkout = await testFetch('http://localhost:3000/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(checkoutData)
      }
    }, checkoutData);
    console.log('3. Checkout persistencia en Neon:', checkout.status, 'User email:', checkout.body?.user?.email, 'Order:', checkout.body?.order?.orderNumber);

    const progressData = JSON.stringify({
      studentId: checkout.body?.user?.id || 'stu-test-01',
      lessonId: '110-7-MAT-OA01-C01',
      completed: true,
      score: 100,
      gems: 10,
      curiosityPoints: 50
    });
    const progress = await testFetch('http://localhost:3000/api/progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(progressData)
      }
    }, progressData);
    console.log('4. Progreso guardado en Neon:', progress.status, 'Success:', progress.body?.success);

  } catch (err: any) {
    console.error('Error during test:', err.message);
  }
}

runTests().catch(console.error);
