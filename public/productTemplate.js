(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['product'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"product\">\n	<img class=\"product-image\" src=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"product-meta\">\n		<h2 class=\"product-text\"> "
    + alias4(((helper = (helper = helpers.petname || (depth0 != null ? depth0.petname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"petname","hash":{},"data":data}) : helper)))
    + " </h2>\n\n		<h2 class=\"product-species\"> "
    + alias4(((helper = (helper = helpers.species || (depth0 != null ? depth0.species : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"species","hash":{},"data":data}) : helper)))
    + " </h2>\n		<h2 class=\"product-color\"> "
    + alias4(((helper = (helper = helpers.petcolor || (depth0 != null ? depth0.petcolor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"petcolor","hash":{},"data":data}) : helper)))
    + " </h2>\n\n		<p class=\"product-price\"> "
    + alias4(((helper = (helper = helpers.petprice || (depth0 != null ? depth0.petprice : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"petprice","hash":{},"data":data}) : helper)))
    + " </p>\n	</div>\n</div>\n";
},"useData":true});
})();