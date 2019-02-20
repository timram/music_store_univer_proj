module.exports = {
  dbConnection: {
    host: 'localhost',
    user: 'music_store_client',
    password: '1234',
    database: 'musicstore'
  },
  jwt: {
    secret: 'some_random_secret'
  },
  instrumentAttributes: {
    types: 'type',
    brands: 'brand'
  },
  pagination: {
    default: {
      limit: 10,
      offset: 0
    }
  },
  content_pagination: {
    default: {
      limit: 5,
      offset: 0
    }
  },
  cdn: {
    url: 'http://localhost:3000'
  }
};
