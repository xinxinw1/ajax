/***** Ajax 2.0 *****/

(function (window, undefined){
  function sendRequest(file, params, func, type, async){
    var ajax;
    if (window.XMLHttpRequest){
      ajax = new XMLHttpRequest();
    } else {
      ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    if (async == undefined)async = true;
    if (async){
      ajax.onreadystatechange = function (){
        if (ajax.readyState == 4){
          if (ajax.status == 200){
            func(ajax.responseText);
          } else if (ajax.status == 0 || ajax.status == 12029){
            setTimeout(function (){sendRequest(file, params, func, type, async);}, 1000);
          } else {
            alert("An error has occurred! Status: " + ajax.status);
          }
        }
      }
    }
    
    if (type == "GET"){
      ajax.open("GET", file + "?" + params, true);
      ajax.send();
    } else if (type == "POST"){
      ajax.open("POST", file, true);
      ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      ajax.send(params);
    }
    
    if (!async)func(ajax.responseText);
  }
  
  window.Ajax = {sendRequest: sendRequest};
})(window);
