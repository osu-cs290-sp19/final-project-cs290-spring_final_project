(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['product'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"/"
    + alias4(((helper = (helper = helpers.petname || (depth0 != null ? depth0.petname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"petname","hash":{},"data":data}) : helper)))
    + "\" class=\"product\">\r\n	<img class=\"product-image\" src=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">\r\n	<div class=\"product-meta\">\r\n		<h2 class=\"product-text\"> "
    + alias4(((helper = (helper = helpers.petname || (depth0 != null ? depth0.petname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"petname","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.petspecies || (depth0 != null ? depth0.petspecies : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"petspecies","hash":{},"data":data}) : helper)))
    + ")</h2>\r\n		<p class=\"product-price\"> "
    + alias4(((helper = (helper = helpers.petprice || (depth0 != null ? depth0.petprice : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"petprice","hash":{},"data":data}) : helper)))
    + " </p>\r\n	</div>\r\n</a>\r\n\r\n";
},"useData":true});
})();