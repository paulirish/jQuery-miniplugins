// ShareThis jQuery plugin
// copyright Paul Irish
// version 0.5

// project home  : http://www.paulirish.com/2009/sharethis-jquery-plugin

// dual license  : GPL : http://creativecommons.org/licenses/GPL/2.0/
//               : MIT : http://creativecommons.org/licenses/MIT/



;(function($){

  $.sharethis = {
    defaults : {  
      url      : 'http://w.sharethis.com/button/sharethis.js#tabs=web%2Cpost%2Cemail&amp;charset=utf-8&amp;style=default',
      position : true,
      delay    : 700, // milliseconds
      title    : document.title,
      leftAdj  : 354 // sharethis' hardcoded width of .stwrapper
    },
    newdocwrite: function(){}
  }
  
  $.fn.sharethis = function(settings){
    
    if (! this.length) return this; // quit early if we got no elements to work with
    
    settings = $.extend({}, $.sharethis.defaults, settings);
    settings.url = settings.url.replace('http:',document.location.protocol).replace('&button=false','') + '&button=false';
    
    var $elems = this;
   
    // gotta hack around document.write() with the new sharethis code.
    document._write = document.write;
    document.write = $.sharethis.newdocwrite;
    
    function attachButtons(){
    
      // and back to normal
      document.write = document._write;
        
      $elems.each(function(){
          var left = $(this).offset().left + $(this).width() - settings.leftAdj; 
          SHARETHIS
            .addEntry({	title: settings.title}, {		
              button: false, 
              offsetLeft: settings.position ? left : undefined	})
            .attachButton(this);
      });
      
      // if this is happening after window onload has fired then we must call .onReady()
      SHARETHIS.onReady();
  
    }
    
    // delay as its lower priority
    setTimeout(function(){
      if (typeof SHARETHIS !== 'undefined') attachButtons();
      else $.getScript(settings.url,attachButtons);  
    },settings.delay); 
    
    
    return this.click(function(e){ e.preventDefault() });
  }


})(jQuery);