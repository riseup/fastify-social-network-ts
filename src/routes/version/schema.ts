export const versionSchema = {
  description: 'Get version',
  tags: ['Version'],
  response: {
    200: {
      type: 'object',
      properties: {
        version: { type: 'string' }
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