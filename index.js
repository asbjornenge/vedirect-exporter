var vedirect = require( 'vedirect' );
var bmvdata = {};
vedirect.open('/dev/ttyBMV0');
forever {
  bmvdata = vedirect.update();
  console.log(bmvdata.V);
}
vedirect.close('/dev/ttyBMV0');
