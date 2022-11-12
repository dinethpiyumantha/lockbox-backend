module.exports = {
  appHome: { code: 200, message: `${process.env.APP_NAME} service running and this is root path` },
  nullObjectJson: { code: 500, message: 'Null object returned' },
  notFound: { code: '404', message: 'Not found' },
  success: { code: 200, message: 'Successfull' },
  NA: 'N/A',
}
