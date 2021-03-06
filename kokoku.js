if (window.addEventListener) {
  window.addEventListener('load', kokoku, false);
}
else if(window.attachEvent) {
  window.attachEvent('onload', kokoku);
}
else {
  document.addEventListener('load', kokoku, false);
}
function kokoku() {
  var links = document.getElementsByTagName('link'),
  i = links.length,
  lang = document.documentElement.lang;
  while (i--) {
    var rel = (links[i].getAttribute('rel') || '');
    if (rel == 'kokoku') {
      var href = links[i].href;
    }
  }
  if (href) {
    var request = new XMLHttpRequest();
    request.open('GET', href);
    request.onload = function() {
      if (request.status == 200) {
        var json = JSON.parse(request.responseText),
        kokokus = document.querySelectorAll('[data-kokoku]'),
        i = kokokus.length;
        while (i--) {
          var put = [];
          var which = kokokus[i].dataset.kokoku;
          if (which == 'any') {
            for (value in json) {
              if (json[value].lang == lang || json[value].lang == 'any' || lang == 'undefined') {
                put.push(value);
              }
            }
          }
          else {
            var which = kokokus[i].dataset.kokoku.split(','),
            ii = which.length;
            while (ii--) {
              if (json.hasOwnProperty(which[ii]) === true) {
                if (json[which[ii]].lang == lang || json[which[ii]].lang == 'any' || lang == undefined) {
                  put.push(which[ii]);
                }
              }
            }
          }
          if (put != undefined && put != '') {
            var rnd = put[Math.floor(Math.random() * put.length)];
            kokokus[i].innerHTML = json[rnd].code;
            if (json[rnd].ping != undefined) {
              var rq = new XMLHttpRequest();
              rq.open('GET', json[rnd].ping);
              rq.send(null);
            }
          }
        }
      }
    }
    request.send(null);
  }
}
