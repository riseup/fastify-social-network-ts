
export const commentSchema = {
  description: 'Create a new comment',
  tags: ['Comments'],
  params: {
    type: 'object',
    properties: {
      postId: { type: 'number' },
    },
    required: ['postId'],
  },
  body: {
    type: 'object',
    properties: {
      content: { type: 'string', minLength: 1 },
    },
    required: ['content'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        content: { type: 'string' },
        user: { type: 'object', properties: { id: { type: 'number' }, username: { type: 'string' } } },
        post: { type: 'object', properties: { id: { type: 'number' } } },
        createdAt: { type: 'string', format: 'date-time' },
      },
      example: {
        id: 1,
        content: 'This is a great post!',
        user: { id: 123, username: 'john_doe' },
        post: { id: 456 },
        createdAt: '2023-10-01T12:34:56Z',
      },
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      example: {
        message: 'Post not found',
      },
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      example: {
        message: 'Internal Server Error',
      },
    },
  },
};