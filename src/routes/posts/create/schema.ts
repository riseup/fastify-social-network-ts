export const postSchema = {
  description: 'Create a new post',
  tags: ['Posts'],
  body: {
    type: 'object',
    properties: {
      content: { type: 'string', minLength: 1 }
    },
    required: ['content']
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        content: { type: 'string' },
        user: {
          type: 'object',
          properties: { id: { type: 'number' }, username: { type: 'string' } }
        },
        createdAt: { type: 'string', format: 'date-time' }
      },
      example: {
        id: 1,
        content: 'This is my first post!',
        user: { id: 123, username: 'john_doe' },
        createdAt: '2023-10-01T12:34:56Z'
      }
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      },
      example: {
        message: 'Internal Server Error'
      }
    }
  }
};
