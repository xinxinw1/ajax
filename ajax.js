/***** Ajax 4.5.1 *****/

/* require tools 4.5.1 */

(function (udf){
  //// Import ////
  
  var fnp = $.fnp;
  var udfp = $.udfp;
  var arrp = $.arrp;
  var inp = $.inp;
  var map = $.map;
  var len = $.len;
  var sli = $.sli;
  var elm = $.elm;
  var elms = $.elms;
  var att = $.att;
  var las = $.las;
  var str = $.str;
  var emp = $.emp;
  var foldi = $.foldi;
  var att = $.att;
  var lat = $.lat;
  var nam = $.nam;
  var err = $.err;
  var evl = $.evl;
  
  //// Processing ////
  
  function prms(o){
    return foldi(function (s, x, i){
      if (emp(s))return i + "=" + str(x);
      return s + "&" + i + "=" + str(x);
    }, "", o);
  }
  
  //// Error ////
  
  var errfn = function (o){
    err(o.fn, "Can't " + nam(o.fn) + " a = $1 with o = $2 and f = $3 due to status $4", o.a, o.o, o.f, o.status);
  }
  
  function ajaxerr(f){
    return errfn = f;
  }
  
  //// Main ////
  
  function ajax(){
    if (window.XMLHttpRequest)return new XMLHttpRequest();
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  function ajaxstate(fn, a, o, f, tries, inner){
    var x = ajax();
    x.onreadystatechange = function (){
      if (x.readyState == 4){
        if (x.status == 200){
          f(x.responseText);
        } else if (x.status == 0 || x.status == 12029){
          if (tries() == 3)errfn({fn: fn, a: a, o: o, f: f, status: x.status});
          else lat(inner, 1000);
        } else {
          errfn({fn: fn, a: a, o: o, f: f, status: x.status});
        }
      }
    }
    return x;
  }
    
  function get(a, o){
    if (udfp(o))o = {};
    
    var x = ajax();
    x.open("GET", emp(o)?a:(a+"?"+prms(o)), false);
    x.send();
    if (!inp(x.status, 200, 304)){
      errfn({fn: get, a: a, o: o, status: x.status});
    }
    return x.responseText;
  }
  
  function post(a, o){
    if (udfp(o))o = {};
    
    var x = ajax();
    x.open("POST", a);
    x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    x.send(prms(o));
    if (!inp(x.status, 200, 304)){
      errfn({fn: post, a: a, o: o, status: x.status});
    }
    return x.responseText;
  }
  
  // aget("test.php", {name: "hey", data: "what"}, function (r){alert(r);});
  // aget("test.php", function (r){alert(r);});
  // aget("test.php");
  function aget(a, of, f){
    if (udfp(of))return aget3(a, {}, function (){});
    if (fnp(of))return aget3(a, {}, of);
    return aget3(a, of, udfp(f)?function (){}:f);
  }
  
  function aget3(a, o, f){
    var numtries = 0;
    function tries(){
      return numtries;
    }
    
    (function inner(){
      var x = ajaxstate(aget, a, o, f, tries, inner);
      x.open("GET", emp(o)?a:(a+"?"+prms(o)), true);
      x.send();
      numtries++;
    })();
  }
  
  // apost("test.php", {name: "hey", data: "what"}, function (r){alert(r);});
  // apost("test.php", function (r){alert(r);});
  // apost("test.php");
  function apost(a, of, f){
    if (udfp(of))return apost3(a, {}, function (){});
    if (fnp(of))return apost3(a, {}, of);
    return apost3(a, of, udfp(f)?function (){}:f);
  }
  
  function apost3(a, o, f){
    var numtries = 0;
    function tries(){
      return numtries;
    }
    
    (function inner(){
      var x = ajaxstate(apost, a, o, f, tries, inner);
      x.open("POST", a, true);
      x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      x.send(prms(o));
      numtries++;
    })();
  }
  
  // load("test.js")
  // load(["a.js", "b.js", "../c.js"]);
  function load(a){
    if (arrp(a))return las(map(load1, a));
    return load1(a);
  }
  
  function load1(a){
    return evl(get(a));
  }
  
  function aload(a, f){
    if (arrp(a)){
      if (len(a) == 0){
        f();
        return;
      }
      aload1(a[0], function (){
        aload(sli(a, 1), f);
      });
    } else {
      aload1(a, f);
    }
  }
  
  function aload1(a, f){
    var s = elm("script", {src: a});
    s.onreadystatechange = f;
    s.onload = f;
    att(s, elms("head")[0]);
  }

  
  //// Export ////
  
  att({
    ajaxerr: ajaxerr,
    
    get: get,
    post: post,
    aget: aget,
    apost: apost,
    
    load: load,
    load1: load1,
    
    aload: aload,
    aload1: aload1
  }, $);
  
})();
