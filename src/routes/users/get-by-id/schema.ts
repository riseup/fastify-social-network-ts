export const userSchema = {
  description: 'Get a user by ID',
  tags: ['Users'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number', description: 'User ID' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' }
      }
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};
