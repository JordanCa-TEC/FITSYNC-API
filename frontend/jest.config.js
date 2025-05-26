export default {
  testEnvironment: 'jsdom',

  // Transforma archivos JS y JSX con babel-jest
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },

  // Trata estos archivos como módulos ESM
  extensionsToTreatAsEsm: ['.js', '.jsx'],

  // Transforma incluso axios (usa ESM)
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)',
  ],

  // Ignora CSS y assets durante pruebas
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // Archivos de prueba
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],

    preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/", // transforma axios
  ],
  extensionsToTreatAsEsm: [".js"],
  moduleNameMapper: {
    "axios": "axios/dist/node/axios.cjs" // usa versión CJS para Jest
  }
};
