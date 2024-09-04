export const unfollowSchema = {
  description: 'Unfollow a user',
  tags: ['Followers'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' }
    },
    required: ['id']
  },
  response: {
    204: {
      type: 'object',
      description: 'No Content'
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      },
      example: {
        message: 'User not found'
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
