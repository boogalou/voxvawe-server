export const websocketGatewayConfig = {
  transports: ['websocket'],
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
    withCredentials: true
  },
}