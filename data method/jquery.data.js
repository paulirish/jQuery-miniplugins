


// $.fn.data 2.0 by Paul Irish
// MIT license
// use the same data() api to retrieve data from the DOM
// proposed replacement for metadata plugin


// usage: 

// store DOM element data in the data attribute in json format:
//     <div id="foo" data-json="{name:'Paul',age:27,baller:true}">

//  or store in html5 data- attribute style
//     <div id="foo" data-name="'Paul'" data-age="27" data-baller="true">

// retrieve data with data(), just like normal
//     $('#foo').data('name');  // ==> Paul

// also data-attributes must be all lower-case and strings must be inside single quotes, too.
// double quotes, BEEYOTCH. validate your json with www.jsonlint.com

(function($){

  var _data = $.fn.data, 
      datajQueryAttr = 'data-json', 
      isJSONParse = window.JSON && JSON.parse,
      undefined;
  
  $.fn.data = function(key,value){
    
    // store right into the cache
    if (value !== undefined) return _data.call(this,key,value);
    
    // we are retrieving now. we'll check cache first
    var ret = _data.call(this,key);
    if (ret !== undefined) return ret;
    
    // if there's data on the DOM we'll throw it in the cache.
    this.each(function(){
        
      var $elem = $(this), data = $elem.attr(datajQueryAttr);
      
      // if we've got data-json stuff...
      if (data !== undefined){
        
          if (! /^(?:\{|\[)/.test(data)) { data = '{'+data+'}';  }
          try{
            data = isJSONParse && JSON.parse(data) || eval('('+data +')'); 
          } catch(e){ 
            throw('error parsing '+datajQueryAttr+' JSON: '+data);  
          }
          
      } else {
        
          data = {};
          
          // nothing found in data-json, lets grab what's in data-key
          value =  this.getAttribute('data-'+key);
          data[key] = isJSONParse && JSON.parse(value) || eval('('+value +')'); 
          this.removeAttribute('data-'+key);
      }
        
      // store what we found
      $.each(data,function(k,v){
          // unless there's something already in there
          _data.call($elem,k) === undefined && _data.call($elem,k,v);      
      });
      $elem.removeAttr(datajQueryAttr); 
    });
    
    // we return whatever is in the cache
    return _data.call(this,key);
    
  };
      

})(jQuery);





// tests
// JSON.parse requires strings to be in double quotes.


var
 num = "5",
 //string = "'string'", // JSON.parse needs double quotes
 string = '"string"',
 sstring = "single string",
 obj   = '{ "label" : true, "bar" : 4 }',
 bool  =  "true";

console.log([
    eval(num),
    eval(string),
//  eval(sstring), // will error
//  eval(obj),  // will error.
    eval(bool)
])

/* all of these will succeed */
console.log([
    eval('('+ num +')'),
    eval('('+ string +')'),
//  eval('('+ sstring +')'), // will error
    eval('('+ obj +')'),
    eval('('+ bool +')')
])



console.log([
    JSON.parse(num),
    JSON.parse(string), 
//  JSON.parse(sstring), // will error
    JSON.parse(obj),  
    JSON.parse(bool)
])

/* all of these will error 
console.log([
    JSON.parse('('+ num +')'), 
    JSON.parse('('+ string +')'),
    JSON.parse('('+ sstring +')'),
    JSON.parse('('+ obj +')'),
    JSON.parse('('+ bool +')')
])
*/



// a few more tests
var
 string = '"string"',
 obj   = '{ "label" : true, "bar" : 4 }';

value = obj;
console.log([
   window.JSON && JSON.parse && JSON.parse(value) || eval('('+value +')')
])

value = string;
console.log([
   window.JSON && JSON.parse && JSON.parse(value) || eval('('+value +')')
])



