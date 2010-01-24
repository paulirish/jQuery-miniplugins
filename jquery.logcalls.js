// sorta like manual profiling. 
// peek into your jquery method calls to see why they are being called so much

// usage:
// $.logCallsTo('append');
// $.logCallsTo('curCSS',true);

// output:
// http://gyazo.com/40cec25d875a7a767e95fd7a2f451b32.png

$.logCallsTo = function(method,isOn$){
    var old = isOn$ ? $[method] : $.fn[method],
        that = this;
    
    (isOn$ ? $ : $.fn)[method] = function(){
      window.console && console.log.apply(console,[this,method,arguments]);    
      return old.apply(this,arguments);
    }

}