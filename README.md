# Intuitive Ajax Library

A couple of functions that make js ajax calls much more intuitive. For obvious reasons, this doesn't work in Node.js

## How to use in HTML

1. Go to https://github.com/xinxinw1/tools/releases and download the latest release.
2. Go to https://github.com/xinxinw1/ajax/releases and download the latest release.
3. Extract `tools.js` from the first download and `ajax.js` from the second download into your project directory.
4. Add
   
   ```html
   <script src="tools.js"></script>
   <script src="ajax.js"></script>
   ```
   
   to your html file.
5. Run `$.al($.get("ajax.js"))` to make sure it works.

See http://xinxinw1.github.io/ajax/ for a demo.

## Function reference

```
Note: The ajax library adds its functions to the $ object from the tools
  library, so these are all accessed by $.<insert name>

get(a, o)         get url a with parameters in o
                    (eg. get("test.txt", {te: 53, a: "test"})
                         -> GET test.txt?te=53&a=test )
get(a)            same as above but with no params

post(a, o)        same semantics as get(a, o) but uses http post and
                    Content-type application/x-www-form-urlencoded
post(a)           same as above but with no params

aget(a, o, f)     asyncronous get url a with params o and callback f
aget(a, o)        same as above but with no callback
aget(a, f)        same as aget(a, o, f) but with no params
aget(a)           aget(a, o, f) but with no params or callback

apost(a, o, f)    same semantics as aget(a, o, f) but with http post
apost(a, o)
apost(a, f)
apost(a)

```
