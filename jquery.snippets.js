
// usage: log('inside coolFunc',this,arguments);
// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console){
      try{
        console.log.apply(console,Array.prototype.slice.call(arguments));
      } catch(e){ console.log(arguments) }
  }
}; 




// thanks to nlogax
jQuery.fn.wait = function(time, type) {
        time = time || 1000;
        type = type || "fx";
        return this.queue(type, function() {
            var self = this;
            setTimeout(function() {
                $(self).dequeue();
            }, time);
        });
};

// http://james.padolsey.com/javascript/jquery-delay-plugin/
$.fn.delay = function(time, callback){
    // Empty function:
    jQuery.fx.step.delay = function(){};
    // Return meaningless animation, (will be added to queue)
    return this.animate({delay:1}, time, callback);
}






// nextAllUntil() by paul irish
// like nextAll() but quits when it hits a given selector
// e.g. $('dd:first').nextAllUntil('dd','dt'); // give me all dd's until a dt
// e.g. $('p#top').nextAllUntil('*','ul.more'); // give me all following siblings until a ul.more
// demo: http://jsbin.com/egije
$.fn.nextAllUntil = function(next,until){ 
 
  return this.nextAll().filter(function(){
    if (arguments.callee.isFound) return false;
    
    if ($(this).is(until)){ 
      arguments.callee.isFound = true;
      return false;
    }
    return true;
  }).filter(next);
};

// did this one much later. merge these together.
$.fn.nextAllUntil = function(sel){
    return this.nextAll().filter(function f(){ 
        if ($(this).is(sel)){ 
            f.alive = false; return false; 
        } 
        return f.alive === false ? false : true;  
    });
}






// serializeObj
// returns an object rather than array of all form values.
// usage:
//   $('form#loginForm').serializeObj();

$.fn.serializeObj = function(){
    var obj = {};
    
    $.each(this.serializeArray(), function(k, v){
        obj[v.name] = v.value;
    });
    
    return obj; 
}








// hinting with default values for text input items. 
// usage: $(':text[value!=""]').inputHint();
// author: paul irish
$.fn.inputHint = function(){
  return $(this)
    .each(function(){ 
      $(this).data('default', $(this).val());
    })
    .focus(function(){
      ($(this).val()===$(this).data('default')) && $(this).val('');
    })
    .blur(function(){
      ($(this).val()==='') && $(this).val($(this).data('default'));
    });
}


// good for IE6 and the fact that it doesnt have the :hover pseudo-selector
// usage: $('.nav li').hoverClass()  // will use 'hover'
// usage: $('.nav li').hoverClass('hovered')

$.fn.hoverClass = function(str){
  str = str || 'hover';
  return $(this).hover(function(){ $(this).addClass(str) },function(){ $(this).removeClass(str) });
}


// usage: $('div.red').indexOf('div.red.active') 
// by paul irish
$.fn.indexOf = function(selector){
  // this = group of items
  return $.inArray( $(this).filter(selector)[0], $.makeArray( this ))
}
	
// setAllToMaxHeight gets the tallest div. and sets the height of the rest of the divs to that value.
// usage: $('div.unevenheights').setAllToMaxHeight()
// by paul irish	
$.fn.setAllToMaxHeight = function(){
  return this.height( Math.max.apply(this, $.map( this , function(e){ return $(e).height() }) ) );
}



// splitAnd takes items, slices it off in sets of num, and calls the second argument on each set
// e.g.   $('div.phoneTile').splitAnd(3,$.fn.setAllToMaxHeight);
// because we only want each set (a row) to be equal height, not the whole thing
$.fn.splitAnd = function(num,func){
  var low = 0, high = num;  // this logic on this is weak and i wish i could write it better. -pi
  while(this.eq(low).length){
    func.apply(this.slice(low,high));  // this works nice with jquery plugins
    //func.apply($.makeArray(this.slice(low,high))); // this works with regular functions
    low=high;
    high = high+num; 
  }
  return this;
}


// reallyvisible - by remy sharp & paul irish
// :visible doesn't take in to account the parent's visiblity - 'reallyvisible' does...daft name, but does the job.
// not neccessary in 1.3.2+
$.expr[ ":" ].reallyvisible = function(a){ return !(jQuery(a).is(':hidden') || jQuery(a).parents(':hidden').length); };

// focus selector filter by paul irish
// works in ie6+, ff3+, chrome2+, saf4+, opera9+ 
// only works on A, INPUT, SELECT, TEXTAREA
// also, querySelectorAll has native support for :focus
$.expr[':'].focus = function(a){  return (a == document.activeElement); }


// aria custom selector
// usage:
// $(':aria')  // get all elements that have aria attributes
// $(':aria(labelledby^=hiera)') // use attribute selectors to match any particular aria attributes

$.expr[':'].aria = function(e,i,m){
  var attrs = e.attributes;
  for (var x in attrs){ 
    if (attrs[x].nodeName && attrs[x].nodeName.match(/^aria-/)){ 
      return m[3] ?  $(e).filter('[aria-'+m[3]+']').length : true; 
    }
  }
  return false;
}


// smooth scrolling to in-page anchors.
$.fn.smoothScrollTo = function(e){
    return this.live('click',function(){
        $('html,body').animate({'scrollTop': $($(this).attr('href')).offset().top-40+'px'}); // 40px buffer to top.
        e.preventDefault();
    })
}



// a goodie for ie.
// usage: $('div.wonky').triggerHasLayout()
$.fn.triggerHasLayout = function(){ 
  return  (! $.browser.msie) ? this : this.each(function(){
    $(this).css('zoom', ($(this).css('zoom') == 1) ? 0 : 1 );  
  });
};

  
// by: remy sharp  
// there's some argument that I should just overload the change event handler
// but I want to run it past a few 'jQueryians' first - IE does treat keyboard
// navigation, i.e. selecting the radio element as a click...bizarre - but useful.
$.fn.radioChange = function (fn) { 
  return this.each(function () {
    if (!$.browser.msie) {
      $(this).change(fn);
    } else {
      $(this).click(fn);
    }
  });
};



// yellow fade technique
// paul irish. public domain
jQuery.fn.yft = function(speed){
  var bg =  $(this).css('backgroundColor');
  return this.css('backgroundColor','#F4FA58').animate({backgroundColor:bg},speed || 'slow',function(){ $(this).css('backgroundColor','') });
};


// for when you're calling a flash method
$.fn.getFlashObj = function(){   // does NOT return a jQuery object. cannot take multiple elements., just one!
  if (!this[0].id){ this[0].id='flashobj'+(+new Date); }
  return (jQuery.browser.msie) ? window[this[0].id] : document[this[0].id];
  // return window[this[0].id] || document[this[0].id]; // would that work?
};




// usually you can just use position() instead.
$.fn.offsetFrom = function(parentElem){
  var po = $(parentElem).offset();
  var to = $(this).offset();
  return { left: to.left - po.left, top: to.top - po.top};
}







//	parseUri 1.2.1, 	(c) 2007 Steven Levithan <stevenlevithan.com>, 	MIT License
//  http://blog.stevenlevithan.com/archives/parseuri
//  jquery-ized by paul irish

// usage:
// $.parseUri('http://www.foo.com/bar?arg1=yup#anch')   // returns object representing given url
// $.parseUri()                                         // returns object of the current url
$.parseUri = function(url){
  function parseUri(str){var o=parseUri.options,m=o.parser[o.strictMode?"strict":"loose"].exec(str),uri={},i=14;while(i--)uri[o.key[i]]=m[i]||"";uri[o.q.name]={};uri[o.key[12]].replace(o.q.parser,function($0,$1,$2){if($1)uri[o.q.name][$1]=$2});return uri};parseUri.options={strictMode:false,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};

  if (typeof url === 'string') return parseUri(url);
  return parseUri(document.location.href);
}




/*!
 * Benchmark - v0.8.1 - 9/3/09
 * A collaboration of Ben Alman and Paul Irish
 * 
 * http://benalman.com/code/javascript/ba-benchmark.js
 * http://pastie.org/596731
 */
 
// Usage: benchmark( [ context, ] [ iterations, ] func [, func ... ] );
// 
// Example:
// 
// benchmark(
//   10000,
//   function(){ document.body.appendChild( document.createElement('div') ); },
//   function(){ document.body.appendChild( document.createElement('span') ); },
//   function teardown(){ $('div,span').remove(); },
//   function(){ document.body.appendChild( document.createElement('p') ); }
// );

window.benchmark = (function(){
  var empty_func = function(){},
    
    // Some convenient shortcuts.
    window = this,
    aps = Array.prototype.slice,
    
    // Reused internal string.
    length = 'length',
    
    // Use debug instead of console, it's cooler, and works in IE 6-7 too!
    // http://benalman.com/projects/javascript-debug-console-log/
    
    con = window.console,
    dbg = window.debug,
    log = dbg && dbg.log
      ? dbg.log
      : con && con.log
        ? function(){ con.log.apply( con, aps.call( arguments ) ); }
        : empty_func;
  
  return function() {
    var args = aps.call( arguments ),
      context = typeof args[0] === 'object' ? args.shift() : this,
      iterations = typeof args[0] === 'number' ? args.shift() : 1000,
      done = empty_func;
    
    log( 'tests: ' + args[length] + ', iterations each: ' + iterations );
    
    (function next() {
      
      // Weird structure, right? There's a reason:
      // http://www.quirksmode.org/blog/archives/2009/08/when_to_read_ou.html
      
      setTimeout(function(){
        done();
        
        if ( args[length] ) {
          var i = iterations,
            fn = args.shift(),
            isTeardown = ( fn + '' ).match(/ (.*?)\(\)/)[1] === 'teardown',
            fn_str = ( fn + '' ).replace( /^[^{]+\{\s+(.*)\s+\}$/, '$1' ).replace( /\s+/g, ' ' ),
            start = +new Date,
            stop1,
            stop2;
          
          if (isTeardown)  fn.call( context );
          else {
            while ( --i ) {
              fn.call( context );
            }
          }
          
          stop1 = +new Date;
          
          done = function() {
            stop2 = +new Date;
            
            // Log the in-function time, the post-function time, and a function reference string.
            !isTeardown && log( stop1 - start, stop2 - start, fn_str[length] <= 60 ? fn_str : fn_str.slice( 0, 60 ) + '...' );
          };
          
          next();
        }
        
      }, 10);
      
    })();
  };
  
})();



/* 
firebug lite. open mutiline by default.

<script type='text/javascript' src='http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js'></script>
<script>
  (function () {
      if (window.firebug && window.firebug.version) {
            setTimeout(function(){ window.firebug.d.console.toggleML(); },200);
      } else {
          setTimeout(arguments.callee, 100)
      }
  })()
</script>

// as a bookmarklet:

javascript:if(!window.firebug){window.firebug=document.createElement("script");firebug.setAttribute("src","http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js");document.body.appendChild(firebug);(function(){if(window.firebug.version){firebug.init()}else{setTimeout(arguments.callee)}})();void%20(firebug);if(window.debug&&debug.setCallback){(function(){if(window.firebug&&window.firebug.version){setTimeout(function(){window.firebug.d.console.toggleML()},200)}else{setTimeout(arguments.callee,100)}})()}};

*/