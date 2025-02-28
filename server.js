// PUNK SERVER CONFIGURATION - BECAUSE DEFAULT SERVERS ARE FOR CONFORMISTS
import { createServer } from '@react-router/node';
import { handler } from './build/server/index.js';

// GET THE PORT FROM ENVIRONMENT OR DEFAULT TO 4269 BECAUSE WE'RE REBELS
const PORT = process.env.PORT || 4269;

// CREATE THE SERVER WITH OUR HANDLER
const server = createServer(handler);

// MAKE IT SCREAM ON THE RIGHT PORT
server.listen(PORT, () => {
  console.log(`🔥 PUNK SERVER UNLEASHED ON PORT ${PORT} 🔥`);
  console.log(`🖕 CONFORMITY REJECTED 🖕`);
}); 