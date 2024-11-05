const amqp = require('amqplib');

// Connection URL for your AMQ broker
const url = 'amqp://ex-aao-hdls-svc:61616';

// Queue name
const queue = 'myAddress0';

async function sendMessage() {
  try {
    // Create a connection
    const connection = await amqp.connect(url);
    
    // Create a channel
    const channel = await connection.createChannel();
    
    // Ensure the queue exists
    await channel.assertQueue(queue, { durable: true });
    
    // Message to send
    const message = 'Hello from Node.js producer!';
    
    // Send the message
    channel.sendToQueue(queue, Buffer.from(message));
    
    console.log(`Sent message: ${message}`);
    
    // Close the connection after a short delay
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Send a message every 5 seconds
setInterval(sendMessage, 5000);
