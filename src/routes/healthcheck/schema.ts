export const healthCheckSchema = {
  description: 'Health check',
  tags: ['Health check'],
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' }
      }
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};
