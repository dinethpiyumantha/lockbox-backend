var time = false
var logLevel = 'debug'
const Logger = {
  disable: (window) => window.console.log = () => {},
  timeEnable: () => (time = true),
  timeDisable: () => (time = false),
  head: (text) => {
    console.log(
      `${Colors.BgGreen}${Colors.FgBlack} ${text} ${Colors.Reset}`,
    )
  },
  link: (text) => {
    console.log(`${Colors.Dim}${text}${Colors.Reset}`)
  },
  info: (text) => {
    console.log(
      `${Colors.BgCyan}${Colors.FgBlack} ${'INFO '} ${Colors.Reset}${
        Colors.FgCyan
      }\t${text}${Colors.Reset}`,
    )
  },
  warn: (text) => {
    console.log(
      `${Colors.BgYellow}${Colors.FgBlack} ${'WARN '} ${Colors.Reset}${
        Colors.FgYellow
      }\t${text}${Colors.Reset}`,
    )
  },
  error: (text) => {
    console.log(
      `${Colors.BgRed}${Colors.FgBlack} ${'ERROR'} ${Colors.Reset}${
        Colors.FgRed
      }\t${text}${Colors.Reset}`,
    )
  },
  debug: (text) => {
    if (logLevel == 'debug') {
      console.log(
        `${Colors.BgMagenta}${Colors.FgBlack} ${'DEBUG'} ${Colors.Reset}${
          Colors.FgMagenta
        }\t${text}${Colors.Reset}`,
      )
    }
  },
  log: (text) => {
    console.log(
      `${Colors.BgWhite}${Colors.FgBlack} ${'LOG  '} ${Colors.Reset}${
        Colors.FgWhite
      }\t${text}${Colors.Reset}`,
    )
  },
  setLevel: (level) => {
    if (level === 'info') {
      logLevel = 'info'
    } else if (level === 'debug') {
      logLevel = 'debug'
    } else {
      logLevel = 'debug'
    }
  },
}

const Colors = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',
  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',
  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
}

module.exports = Logger
