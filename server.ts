import Fastify, { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import { createServer } from 'http';
import { connectToMongoDB } from './src/config/mongoose';
import url from './src/models/url';
import { urlsRoutes } from './src/routes/urlsRoutes';
import { connectToRedis } from './src/config/redis';

const PORT = process.env.PORT;

// Fastify server instance
const fastify = Fastify();

// Configure server
fastify
  .register(fastifyCors) // Register CORS
  .register(
    async (fastify: FastifyInstance) => {
      fastify.register(urlsRoutes); // Register URL routes
    },
    { prefix: '/api' },
  );

const startServer = async () => {
  try {
    await connectToMongoDB();
    await connectToRedis();

    // app.get('/urls', async (req, res) => {
    //   try {
    //     const urls = await url.find();
    //     res.status(200).json(urls);
    //   } catch (err) {
    //     console.error('Error fetching URLs:', err);
    //     res.status(500).json({ error: 'Failed to fetch URLs' });
    //   }
    // });
    // app.post('/urls', async (req, res) => {
    //   try {
    //     const { originalUrl, shortenUrlKey } = req.body;
    //     const newUrl = new url({ originalUrl, shortenUrlKey });
    //     await newUrl.save();
    //     res.status(201).json(newUrl);
    //   } catch (err) {
    //     console.error('Error creating URL:', err);
    //     res.status(500).json({ error: 'Failed to create URL' });
    //   }
    // });

    await fastify.listen({
      port: Number(PORT!),
      host: 'lohcalhost',
    });

    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};
startServer();
