module.exports = {
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },

  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)', // transformar axios también
  ],

  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // mocks para estilos
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js', // mocks para imágenes
    '^axios$': 'axios/dist/node/axios.cjs', // versión compatible de axios
  },

  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],

  extensionsToTreatAsEsm: ['.js', '.jsx'],
};
