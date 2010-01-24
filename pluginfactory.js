// jquery plugin factory 
// by Paul Irish. public domain
// based on scott gonzales's code (http://pastie.org/517177)


// allows for jQuery UI style api for methods
// eg. $(elem).myplugin('mymethodname','args',5,true)

// it accepts both constructors or object literals as the second argument
// eg. $.plugin('stepper',Stepper);


// a limitation of this plugin is that the methods are only cognizant
//   on a per-element basis. They do not know the entire set.


$.plugin = function(name, object) {
  // create a new plugin with the given name
  $.fn[name] = function(options) {
    
    var args = Array.prototype.slice.call(arguments, 1);
    return this.each(function() {
      
      // check the data() cache, if it's there we'll call the method requested
      var instance = $.data(this, name);
      if (instance) {
        options && instance[options].apply(instance, args);
      } else {
        // if a constructor was passed in...
        if (typeof object === 'function') instance = new object(options, this);
        // else an object was passed in
        else {
          // create a constructor out of it
          function F(){};
          F.prototype = object;
          instance = new F()
          instance.init(options,this);
        }
        
        $.data(this, name, instance);
      }
    });
  };
};


/*
 * example stepper plugin.
 * defined as an object literal.

 * just as easily this could be written as a class with 
 * resig's simple inheritance script: http://ejohn.org/blog/simple-javascript-inheritance/
 * e.g. 
 *   var Stepper = Class.extend({ ...
*/

var Stepper = {
      // init will be called when plugin initalized for an elem
      init: function(options, element) {
              this.options = $.extend({
                      value: 0,
                      stepSize: 1
              }, options);
              this.$elem = $(element);
              this.display();
      },
      stepUp: function(steps) {
              this.options.value += this.options.stepSize * steps;
              this.display();
      },
      stepDown: function(steps) {
              this.options.value -= this.options.stepSize * steps;
              this.display();
      },
      value: function() {
              return this.options.value;
      },
      display: function() {
              this.$elem.html(this.options.value);
      }
};


// install the plugin
$.plugin('stepper',Stepper);

// instantiate a new instance  (init will be called)
jQuery('#hobo').stepper({ value: 5 });

// use a method
jQuery('#hobo').stepper('stepUp',4);

