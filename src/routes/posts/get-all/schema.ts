export const getAllPostsSchema = {
  description: 'Get all posts',
  tags: ['Posts'],
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          content: { type: 'string' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              username: { type: 'string' }
            }
          },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },
      example: [
        {
          id: 1,
          content: 'This is my first post!',
          user: { id: 123, username: 'john_doe' },
          createdAt: '2023-10-01T12:34:56Z'
        },
        {
          id: 2,
          content: 'Another post here!',
          user: { id: 456, username: 'jane_doe' },
          createdAt: '2023-10-02T10:20:30Z'
        }
      ]
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
