const isAppveyor = !!process.env.APPVEYOR
describe.skip.appveyor = isAppveyor ? describe.skip : describe
test.skip.appveyor = isAppveyor ? test.skip : test

const isWin = process.platform === 'win32'
describe.skip.win = isWin ? describe.skip : describe
test.skip.win = isWin ? test.skip : test

jest.setTimeout(60000)
