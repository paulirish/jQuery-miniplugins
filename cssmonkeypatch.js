
// allow $('elem').css({ 'left' : '+=10px' });
// so you dont need to do:
//   $('elem').animate({ 'left' : '+=10px' }, 0);
// by paul irish
// for ralph holzmann
// http://github.com/paulirish/lazyweb-requests/issues#issue/10
(function($, oldcss) {

    // magic from the core.
    var rfxnum = /^([+\-]=)?([\d+.\-]+)(.*)$/;

    $.fn.css = function(obj, val) {


        var parts = rfxnum.exec(val),
            that = this;


        if ($.isPlainObject(obj)) {
            $.each(obj, function(k, v) {
                $(that).css(k, v);
            });

            // here's the magic.  
        } else if (val && parts && parts[1]) {

            var end = parseFloat(parts[2])

            return oldcss.call(this, obj, function(index, currentValue) {
                return ((parts[1] === "-=" ? -1 : 1) * end) + parseFloat(currentValue);
            });

            // no fancypants  
        } else {

            return oldcss.apply(this, arguments);
        }

        return this;

    };

})(jQuery, jQuery.fn.css);




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