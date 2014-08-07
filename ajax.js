/***** Ajax 4.1 *****/

/* require tools >= 3.0 */

(function (win, udef){
  //// Import ////
  
  var udefp = $.udefp;
  var apd = $.apd;
  var err = $.err;
  
  //// Processing ////
  
  function params(o){
    var s = "";
    var first = true;
    for (var i in o){
      if (!first)s += "&";
      s += i + "=" + o[i];
    }
    return s;
  }
  
  //// Main ////
  
  function ajax(){
    if (window.XMLHttpRequest)return new XMLHttpRequest();
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
    
  function get(a, o){
    if (!udefp(o)){
      var ps = params(o);
      if (ps != "")a += "?" + o;
    }
    
    var x = ajax();
    x.open("GET", a, false);
    x.send();
    if (x.status != 200 && x.status != 304){
      err(read, "AJAX exited with status = $1", x.status);
    }
    return x.responseText;
  }
  
  function post(a, o){
    var x = ajax();
    x.open("POST", a);
    x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    x.send(params(o));
    if (x.status != 200 && x.status != 304){
      err(post, "AJAX exited with status = $1", x.status);
    }
    return x.responseText;
  }
  
  function aget(a, o, f){
    if (!udefp(o)){
      var ps = params(o);
      if (ps != "")a += "?" + o;
    }
    
    var x = ajax();
    x.onreadystatechange = function (){
      if (x.readyState == 4){
        if (x.status == 200){
          f(x.responseText);
        } else if (x.status == 0 || x.status == 12029){
          setTimeout(function (){aget(a, o, f);}, 1000);
        } else {
          err(aget, "AJAX exited with status = $1", x.status);
        }
      }
    }
    x.open("GET", a, true);
    x.send();
    return true;
  }
  
  function apost(a, o, f){
    var x = ajax();
    x.onreadystatechange = function (){
      if (x.readyState == 4){
        if (x.status == 200){
          f(x.responseText);
        } else if (x.status == 0 || x.status == 12029){
          setTimeout(function (){apost(a, o, f);}, 1000);
        } else {
          err(apost, "AJAX exited with status = $1", x.status);
        }
      }
    }
    x.open("POST", a, true);
    x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    x.send(params(o));
    return true;
  }
  
  //// Export ////
  
  apd({
    get: get,
    post: post,
    aget: aget,
    apost: apost
  }, $);
  
})(window);
