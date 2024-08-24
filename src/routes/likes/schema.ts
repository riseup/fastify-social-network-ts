
export const likeSchema = {
  description: 'Like a post',
  tags: ['Likes'],
  params: {
    type: 'object',
    properties: {
      postId: { type: 'number' },
    },
    required: ['postId'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        user: { type: 'object', properties: { id: { type: 'number' }, username: { type: 'string' } } },
        post: { type: 'object', properties: { id: { type: 'number' } } },
        createdAt: { type: 'string', format: 'date-time' },
      },
      example: {
        id: 1,
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
