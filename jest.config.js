module.exports = {
  testEnvironment: 'node',

  coverageDirectory: './coverage/',

  collectCoverageFrom: [
    'lib/**'
  ],

  setupFilesAfterEnv: [
    './test/utils/setup'
  ],

  testPathIgnorePatterns: [
    'test/fixtures/.*/.*?/'
  ],

  transformIgnorePatterns: [
    'node_modules/(?!(@nuxt|nuxt|@babel\/runtime))'
  ],

  transform: {
    '^.+\\.js$': 'babel-jest'
  },

  moduleFileExtensions: [
    'js',
    'json'
  ],

  expand: true,

  forceExit: false
}
