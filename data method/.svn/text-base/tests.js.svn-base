
// documentation on writing tests here: http://docs.jquery.com/QUnit


module("data() 2.0 tests");


test('data-json attribute',function(){
  expect(8);
  
  // JSON.parse returns null here due to spec. eval returns undefined.
  equals(JSON && null || undefined,$('body').data('__doesntexist__'),'Unknown key');
  
  equals('ben alman', $('#ben').data('name'),'String (initial pull)')
  equals(39, $('#ben').data('age'),'Number')
  equals(true, $('#ben').data('isAwesome'),'Boolean')

  equals(undefined, $('#ben').data('__doesntexist__'),'Unknown key from data-json')
  
  
  equals($('#ben')[0], $('#ben').data('isAwesome',false)[0], 'data() return on setting is jquery obj')
  equals(false, $('#ben').data('isAwesome'),'Boolean updated via data()')
  
  equals(null,$('#ben')[0].getAttribute('data-json'),'data-json DOM attribute removed')
  })

// these test things from script.js
test('html5 data attributes',function(){
  expect(5);

  equals('rebecca murphey',$('#rebecca').data('name'),'String (doubley quoted)')
  equals(25,$('#rebecca').data('age'),'Number')
  equals(true,$('#rebecca').data('isawesome'),'Boolean')

  equals('ajpiano',$('#adam').data('name') && $('#adam').data('name').nick,'Object')

  // tbh i have no idea how you'd eval something into a date object... 

  equals(null,$('#rebecca')[0].getAttribute('data-name'),'data-name DOM attribute removed')

})

  
  

