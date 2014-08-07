/***** AJAX 3.0 *****/

(function (window, undef){
  function req(obj){
    var url = obj.url;
    var params = obj.params;
    var func = obj.func;
    var type = obj.type;
    var async = obj.async;
    
    var ajax;
    if (window.XMLHttpRequest){
      ajax = new XMLHttpRequest();
    } else {
      ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    if (async === undef)async = true;
    if (async){
      ajax.onreadystatechange = function (){
        if (ajax.readyState == 4){
          if (ajax.status == 200){
            func(ajax.responseText);
          } else if (ajax.status == 0 || ajax.status == 12029){
            setTimeout(function (){sendRequest(url, params, func, type, async);}, 1000);
          } else {
            alert("An error has occurred! Status: " + ajax.status);
          }
        }
      }
    }
    
    if (type == "GET"){
      if (params != "")
        ajax.open("GET", url + "?" + params, async);
      else
        ajax.open("GET", url, async);
      ajax.send();
    } else if (type == "POST"){
      ajax.open("POST", url, async);
      ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      ajax.send(params);
    }
    
    if (!async){
      if (ajax.status != 200 && ajax.status != 304)return false;
      func(ajax.responseText);
    }
    return true;
  }
  
  window.$.ajax = req;
})(window);
