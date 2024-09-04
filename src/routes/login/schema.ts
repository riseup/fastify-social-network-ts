export const authSchema = {
  description: 'Login',
  tags: ['Login'],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 }
    },
    required: ['email', 'password'],
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' }
      },
      example: {
        token: 'your.jwt.token.here'
      }
    },
    401: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      },
      example: {
        message: 'Invalid email or password'
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
