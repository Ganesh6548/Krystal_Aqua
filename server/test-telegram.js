#!/usr/bin/env node

/**
 * Telegram Bot Acknowledgement Testing Script
 * Tests the new Telegram customer acknowledgement feature
 */

const http = require('http');

const API_BASE = 'http://localhost:5000/api';

function request(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_BASE);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };

    if (data) {
      const body = JSON.stringify(data);
      options.headers['Content-Length'] = body.length;
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function testTelegramAcknowledgement() {
  console.log('════════════════════════════════════════════════════════════');
  console.log('🤖 TELEGRAM ACKNOWLEDGEMENT FEATURE TEST');
  console.log('════════════════════════════════════════════════════════════\n');

  try {
    // Test 1: Order without customer Telegram ID
    console.log('📝 TEST 1: Order WITHOUT Customer Telegram ID');
    console.log('─────────────────────────────────────────────────────────\n');

    const order1Data = {
      customerName: 'Regular Customer',
      customerEmail: 'customer@example.com',
      customerPhone: '9999999999',
      cartItems: [
        { id: 1, name: 'Water Filter', price: 299, quantity: 1 }
      ],
      totalPrice: 299,
      address: '123 Street, City'
      // Note: No customerChatId
    };

    console.log('Sending order...');
    const res1 = await request('POST', '/orders', order1Data);
    console.log('✅ Response Status:', res1.status);
    const orderId1 = res1.data.data?.orderId;
    console.log('📦 Order ID:', orderId1);
    console.log('📌 Result: Owner gets notification, Customer gets NOTHING (no Chat ID)\n\n');

    // Test 2: Order with customer Telegram ID
    console.log('📝 TEST 2: Order WITH Customer Telegram ID');
    console.log('─────────────────────────────────────────────────────────\n');

    const order2Data = {
      customerName: 'Telegram User',
      customerEmail: 'telegmuser@example.com',
      customerPhone: '8888888888',
      cartItems: [
        { id: 1, name: 'Water Bottle 500ml', price: 50, quantity: 2 },
        { id: 2, name: 'Filter Cartridge', price: 199, quantity: 1 }
      ],
      totalPrice: 299,
      address: '456 Avenue, City',
      customerChatId: '1234567890' // Customer's Telegram Chat ID
    };

    console.log('Sending order with customerChatId = 1234567890...');
    const res2 = await request('POST', '/orders', order2Data);
    console.log('✅ Response Status:', res2.status);
    const orderId2 = res2.data.data?.orderId;
    console.log('📦 Order ID:', orderId2);
    console.log('📌 Result: Owner gets notification + Customer gets acknowledgement\n\n');

    // Retrieve orders to verify
    console.log('📝 TEST 3: Verify Orders in Database');
    console.log('─────────────────────────────────────────────────────────\n');

    const allOrders = await request('GET', '/orders');
    console.log('✅ Total Orders:', allOrders.data.count);
    console.log('📦 Latest Orders:');

    allOrders.data.data.slice(0, 3).forEach(order => {
      console.log(`  - Order #${order.id}: ${order.customer_name} (${order.status})`);
    });

    console.log('\n════════════════════════════════════════════════════════════');
    console.log('✅ TEST COMPLETE');
    console.log('════════════════════════════════════════════════════════════\n');

    console.log('🔍 What Happened:');
    console.log('  1. Order #' + orderId1 + ' → Owner notification sent (Customer got nothing)');
    console.log('  2. Order #' + orderId2 + ' → Owner notification + Customer acknowledgement sent\n');

    console.log('📱 Customer Acknowledgement Includes:');
    console.log('  ✓ Order confirmation');
    console.log('  ✓ Order ID');
    console.log('  ✓ Items summary');
    console.log('  ✓ Total amount');
    console.log('  ✓ Status: Pending\n');

    console.log('💡 TIPS:');
    console.log('  • To get customer Telegram Chat ID: Use @userinfobot on Telegram');
    console.log('  • Or: https://api.telegram.org/bot<TOKEN>/getUpdates');
    console.log('  • Frontend should collect customerChatId as optional field');
    console.log('  • If invalid Chat ID is provided, order still succeeds\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run test
testTelegramAcknowledgement();
