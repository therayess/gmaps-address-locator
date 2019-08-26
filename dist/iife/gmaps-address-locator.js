var gmapsAddressLocator=function(){'use strict';function a(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function b(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function c(a,c,d){return c&&b(a.prototype,c),d&&b(a,d),a}function d(a,b){var c=b.get(a);if(!c)throw new TypeError("attempted to get private field on non-instance");return c.get?c.get.call(a):c.value}var e=/*#__PURE__*/function(){function b(){var c=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null,e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},g=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};return a(this,b),f.set(this,{writable:!0,value:{locale:null,mobileView:!1,initialPosition:null,autocompleteFieldId:null,recenterBtnId:null,secondaryActionBtn:null,confirmBtn:null}}),c?void(this.selectedLocation=null,this.mapElId=c,this.options=Object.assign({},d(this,f),e),this.userMapSettings=g,this.initMap(),this.initInfoWindow(),this.initMarker(),this.options.autocompleteFieldId&&this.initAutocomplete(),this.options.secondaryActionBtn&&this.addSecondaryActionBtn(),this.options.confirmBtn&&this.addConfirmBtn(),this.options.initialPosition?this.goToPoint(this.options.initialPosition):this.getNavigatorLocation()):(console.error("Please specify map element id"),!1)}return c(b,[{key:"initMap",value:function(){var a=this;try{var b={zoom:6,zoomControl:!this.options.mobileView,mapTypeControl:!1,streetViewControl:!1,fullscreenControl:!1},c=Object.assign({},b,this.userMapSettings);this.mapEl=document.getElementById(this.mapElId),this.map=new google.maps.Map(this.mapEl,c),this.map.addListener("click",function(b){a.goToPoint(b.latLng)}),google.maps.event.addListenerOnce(this.map,"tilesloaded",function(){a.autocompleteInputField&&a.autocompleteInputField.classList.remove("hidden"),a.centerControlBtn&&a.centerControlBtn.classList.remove("hidden"),a.confirmBtn&&a.confirmBtn.classList.remove("hidden"),a.secondaryActionBtn&&a.secondaryActionBtn.classList.remove("hidden")})}catch(a){console.error(a)}}},{key:"initMarker",value:function(){var a=this;this.marker=new google.maps.Marker({map:this.map,draggable:!0,animation:google.maps.Animation.DROP}),this.marker.addListener("dragstart",function(){a.infoWindow.close()}),this.marker.addListener("dragend",function(b){a.goToPoint(b.latLng)})}},{key:"initInfoWindow",value:function(){this.infoWindow=new google.maps.InfoWindow}},{key:"initAutocomplete",value:function(){var a=this;try{// Setup the autocomplete field and add it to map
var b={};this.options.locale&&(b.componentRestrictions={country:this.options.locale}),this.autocompleteInputField=document.getElementById(this.options.autocompleteFieldId),this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.autocompleteInputField);var c=new google.maps.places.Autocomplete(this.autocompleteInputField,b);c.setFields(["name","formatted_address","address_components","geometry"]),c.addListener("place_changed",function(){var b=c.getPlace();a.updateLocationOnMap(b)})}catch(a){console.error(a)}}},{key:"initRecenter",value:function(a){var b=this;// Add recenter button to map
try{this.centerControlBtn=document.getElementById(this.options.recenterBtnId),this.centerControlBtn.index=1,this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.centerControlBtn),this.centerControlBtn.addEventListener("click",function(){return b.goToPoint(a)})}catch(a){console.error(a)}}},{key:"addSecondaryActionBtn",value:function(){this.secondaryActionBtn=document.getElementById(this.options.secondaryActionBtn),this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.secondaryActionBtn)}},{key:"addConfirmBtn",value:function(){this.confirmBtn=document.getElementById(this.options.confirmBtn),this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(this.confirmBtn)}},{key:"setInitialCenter",value:function(){var a=this,b=new google.maps.Geocoder,c=this.options.locale,d={};c&&(d.componentRestrictions={country:c}),b.geocode(d,function(b,d){d==google.maps.GeocoderStatus.OK?a.map.setCenter(b[0].geometry.location):console.error("Could not find location: "+c)})}},{key:"getNavigatorLocation",value:function(){var a=this;navigator.geolocation?navigator.geolocation.getCurrentPosition(function(b){var c={lat:b.coords.latitude,lng:b.coords.longitude};// Add Recenter button
a.options.recenterBtnId&&a.initRecenter(c),a.goToPoint(c)},function(){a.setInitialCenter(),console.warn("User denied access to location")}):console.warn("Browser doesn't support geolocation")}},{key:"setSelectedLocation",value:function(a){this.selectedLocation=a}},{key:"getSelectedLocation",value:function(){return this.selectedLocation}},{key:"goToPoint",value:function(a){var b=this,c=new google.maps.Geocoder;c.geocode({location:a},function(a,c){if("OK"===c){var d=a[0];if(d){var e=b.options.locale;if(e){var f=d.address_components.find(function(a){return-1<a.types.indexOf("country")});if(f.short_name!==e)return void alert("Location out of ".concat(e," country boundary"))}b.updateLocationOnMap(d)}else console.log("No results found")}else console.log("Geocoder failed due to: "+c)})}},{key:"updateLocationOnMap",value:function(a){var b=a.geometry.location,c=this.cleanAddress(a.formatted_address);a.name&&(c="".concat(a.name,", ").concat(c)),a.formatted_address2=c;var d=a.address_components.find(function(a){return-1<a.types.indexOf("administrative_area_level_1")});d&&(a.city=d.short_name||""),this.map.setZoom(14),this.map.panTo(b),this.marker&&this.marker.setPosition(b),this.infoWindow&&(this.infoWindow.setContent(c),this.infoWindow.setPosition(b),this.infoWindow.open(this.map,this.marker)),this.setSelectedLocation(a),this.onPointSelectionFn&&this.onPointSelectionFn(a)}},{key:"cleanAddress",value:function(a){return a.split("-")[0]}},{key:"showMap",value:function(){this.mapEl.style.display="block"}},{key:"hideMap",value:function(){this.mapEl.style.display="none"}},{key:"onConfirm",value:function(a){var b=this;this.confirmBtn&&this.confirmBtn.addEventListener("click",function(){a(b.selectedLocation)})}},{key:"onSecondaryAction",value:function(a){this.secondaryActionBtn&&this.secondaryActionBtn.addEventListener("click",function(){a()})}},{key:"onPointSelection",value:function(a){this.onPointSelectionFn=a}}]),b}(),f=new WeakMap;return e}();
