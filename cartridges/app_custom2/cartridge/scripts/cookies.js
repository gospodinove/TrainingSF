function getCookie(name) {
  var cookies = request.getHttpCookies()

  for(var i = 0; i < (cookies ? cookies.cookieCount : 0); i++) {
    if (cookies[i].name === name) {
      return cookies[i];
    }
  }

  return undefined
}

function deleteCookie(name) {
  // FIX: This doesn't return any cookies when triggered from notifyAvailable.js
  var cookies = request.getHttpCookies()

  for(var i = 0; i < (cookies ? cookies.cookieCount : 0); i++) {
    if (cookies[i].name === name) {
      cookies[i].setMaxAge(0);
      return;
    }
  }
}

module.exports = {
  getCookie: getCookie,
  deleteCookie: deleteCookie
}