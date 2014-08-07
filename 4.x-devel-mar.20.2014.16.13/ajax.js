/***** Ajax Devel *****/

/* require tools >= 3.0 */

(function (win, udf){
  //// Import ////
  
  var fnp = $.fnp;
  var udfp = $.udfp;
  var emp = $.emp;
  var inp = $.inp;
  var str = $.str;
  var apd = $.apd;
  var rdc = $.rdc;
  var lat = $.lat;
  var err = $.err;
  
  //// Processing ////
  
  function prms(o){
    return rdc(function (s, x, i){
      if (emp(s))return i + "=" + str(x);
      return s + "&" + i + "=" + str(x);
    }, "", o);
  }
  
  //// Main ////
  
  function ajax(){
    if (window.XMLHttpRequest)return new XMLHttpRequest();
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
    
  function get(a, o){
    if (udfp(o))o = {};
    
    var x = ajax();
    x.open("GET", emp(o)?a:(a+"?"+prms(o)), false);
    x.send();
    if (!inp(x.status, 200, 304)){
      err(get, "Can't get a = $1 with o = $2 due to status $3", a, o, x.status);
    }
    return x.responseText;
  }
  
  function pst(a, o){
    if (udfp(o))o = {};
    
    var x = ajax();
    x.open("POST", a);
    x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    x.send(prms(o));
    if (!inp(x.status, 200, 304)){
      err(pst, "Can't pst a = $1 with o = $2 due to status $3", a, o, x.status);
    }
    return x.responseText;
  }
  
  function aget(a, of, f){
    if (udfp(of))return aget3(a, {}, function (){});
    if (fnp(of))return aget3(a, {}, of);
    return aget3(a, of, udfp(f)?function (){}:f);
  }
  
  function aget3(a, o, f){
    var x = ajax();
    x.onreadystatechange = function (){
      if (x.readyState == 4){
        if (x.status == 200){
          f(x.responseText);
        } else if (inp(x.status, 0, 12029)){
          lat(function (){aget3(a, o, f);}, 1000);
        } else {
          err(aget3, "Can't aget a = $1 with o = $2 and f = $3 due to status $4", a, o, f, x.status);
        }
      }
    }
    x.open("GET", emp(o)?a:(a+"?"+prms(o)), true);
    x.send();
  }
  
  function apst(a, of, f){
    if (udfp(of))return apst3(a, {}, function (){});
    if (fnp(of))return apst3(a, {}, of);
    return apst3(a, of, udfp(f)?function (){}:f);
  }
  
  function apst3(a, o, f){
    var x = ajax();
    x.onreadystatechange = function (){
      if (x.readyState == 4){
        if (x.status == 200){
          f(x.responseText);
        } else if (inp(x.status, 0, 12029)){
          lat(function (){apst3(a, o, f);}, 1000);
        } else {
          err(apst3, "Can't apst a = $1 with o = $2 and f = $3 due to status $4", a, o, f, x.status);
        }
      }
    }
    x.open("POST", a, true);
    x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    x.send(prms(o));
  }
  
  //// Export ////
  
  apd({
    get: get,
    pst: pst,
    aget: aget,
    apst: apst
  }, $);
  
})(window);
