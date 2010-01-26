
// idea is all courtesy micah snyder
// http://wiki.github.com/digg/dui/duitreq
// http://github.com/digg/dui/blob/master/src/DUI.treq.js


/*
   Basic usage:
*/
    $('a.follow').live('click',function(){
	    $(this).trigger('ajax',{ 
	        url  : '/followpost.php',
	        event : 'followPosted',
	        user : $(this).closest('.user').attr('data-user');
	    });
	});
	
    // the event name will be triggered on success.. 
    // anything beyond the url & event is passed in as data
    // essentially this is done for you:
    
    // $(thatAElement).trigger('followPosted',[XHRresponse,data])

	
	// so you would listen on it or a parent like this:
	$('.user').live('followPosted',function(evt,xhrdata,binddata){
	    
	})
	
	
	