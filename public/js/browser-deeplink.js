(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('deeplink', factory(root));
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root['deeplink'] = factory(root);
  }
})(window || this, function (root) {
  'use strict';

  if (!root.document || !root.navigator) {
    return;
  }

  var timeout;
  var settings = {};
  var defaults = {
    iOS: {},
    android: {},
    androidDisabled: false,
    fallback: true,
    fallbackToWeb: false,
    delay: 1000,
    delta: 500,
  };

  var extend = function (defaults, options) {
    var extended = {};
    for (var key in defaults) {
      extended[key] = defaults[key];
    }
    for (var key in options) {
      extended[key] = options[key];
    }
    return extended;
  };

  /**
   * Generate the app store link for iOS / Apple app store
   *
   * @private
   * @returns {String} App store itms-apps:// link
   */
  var getStoreURLiOS = function () {
    var baseurl = 'itms-apps://itunes.apple.com/app/';
    var name = settings.iOS.appName;
    var id = settings.iOS.appId;
    return id && name ? baseurl + name + '/id' + id + '?mt=8' : null;
  };

  var getStoreURLAndroid = function () {
    var baseurl = 'market://details?id=';
    var id = settings.android.appId;
    return id ? baseurl + id : null;
  };

  var getStoreLink = function () {
    var linkmap = {
      ios: settings.iOS.storeUrl || getStoreURLiOS(),
      android: settings.android.storeUrl || getStoreURLAndroid(),
    };

    return linkmap[settings.platform];
  };

  var getWebLink = function () {
    var linkmap = {
      ios: settings.iOS.fallbackWebUrl || location.href,
      android: settings.android.fallbackWebUrl || location.href,
    };

    return linkmap[settings.platform];
  };

  var isAndroid = function () {
    return navigator.userAgent.match('Android');
  };

  var isIOS = function () {
    return (
      navigator.userAgent.match('iPad') ||
      navigator.userAgent.match('iPhone') ||
      navigator.userAgent.match('iPod')
    );
  };
  var isMobile = function () {
    return isAndroid() || isIOS();
  };
  var openFallback = function (ts) {
    return function () {
      var link = settings.fallbackToWeb ? getWebLink() : getStoreLink();
      var wait = settings.delay + settings.delta;
      if (typeof link === 'string' && Date.now() - ts < wait) {
        window.location.href = link;
      }
    };
  };

  var setup = function (options) {
    settings = extend(defaults, options);
    if (isAndroid()) settings.platform = 'android';
    if (isIOS()) settings.platform = 'ios';
  };

  var open = function (uri) {
    if (!isMobile()) {
      return false;
    }

    if (isAndroid() && settings.androidDisabled) {
      return;
    }

    if (isAndroid() && !navigator.userAgent.match(/Firefox/)) {
      var matches = uri.match(/([^:]+):\/\/(.+)$/i);
      uri = 'intent://' + matches[2] + '#Intent;scheme=' + matches[1];
      uri += ';package=' + settings.android.appId + ';end';
    }

    if (settings.fallback || settings.fallbackToWeb) {
      timeout = setTimeout(openFallback(Date.now()), settings.delay);
    }

    var iframe = document.createElement('iframe');
    iframe.onload = function () {
      clearTimeout(timeout);
      iframe.parentNode.removeChild(iframe);
      window.location.href = uri;
    };

    iframe.src = uri;
    iframe.setAttribute('style', 'display:none;');
    document.body.appendChild(iframe);

    return true;
  };

  // Public API
  return {
    setup: setup,
    open: open,
  };
});
