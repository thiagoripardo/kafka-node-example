import 'dotenv/config';
import expressServer from './rest-api/express-server';
import kafkaConsumer from './services/consumer.service';

// Init servers and services
const init = async () => {

  try {
    await kafkaConsumer();
  } catch (err) {
    console.error(err);
  }
  
  try {
    const server = await expressServer();
    const port = process.env.PORT_API || 3002;
    server.listen(port, () => {
      console.log(`API listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
  }

  
}

init();