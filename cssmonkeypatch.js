
// css() upgrade for a few shorthand values
// paul irish. MIT license.

// by default you can't do $(elem).css('margin'), but instead $(elem).css('marginTop') and so on.
// this monkeypatch allows lets you retrieve all four values in shorthand style:
//   e.g. $(this).css('padding')

(function($){

 var css = $.fn.css, methods = {'padding':1,'margin':1}, dirs = 'Top Right Bottom Left'.split(' ');

 $.fn.css = function(prop,val){
    var jq = this;
    if ( val || !(prop in methods)) return css.apply(jq,arguments);
    return $.map(dirs, function(k){  return css.call(jq,prop+k) }).join(' ');
 }

})(jQuery);




// The CSS property backgroundPosition does not exist in the accessible DOM properties within IE 8. 
// this monkeypatch retifies that issue

// usage: $(elem).css('backgroundPosition');
// ticket: http://dev.jquery.com/ticket/5749

(function($){  
    
    var _css = $.fn.css; 
  
    $.fn.css = function(name,val){
     
     if (!val && /background[-p|P]osition/.test(name)){
         var value = _css.apply(this,arguments);
         return  value !== undefined ? value : 
                [_css.call(this,"backgroundPositionX"), "px ",
                _css.call(this,"backgroundPositionY"), "px"].join(""); 
     } else {
         return _css.apply(this,arguments);
     }  
    }
    
})(jQuery);