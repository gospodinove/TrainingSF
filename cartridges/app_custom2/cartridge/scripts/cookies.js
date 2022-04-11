function getCookie(name) {
  var cookies = request.getHttpCookies()

  for(var i = 0; i < (cookies ? cookies.cookieCount : 0); i++) {
    if (cookies[i].name === name) {
      return cookies[i];
    }
  }

  return undefined
}

module.exports = {
  getCookie: getCookie
}