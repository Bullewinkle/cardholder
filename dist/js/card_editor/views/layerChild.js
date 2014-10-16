(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.module('CardEditor.views', function(views) {
    return views.LayerChild = (function(_super) {
      __extends(LayerChild, _super);

      function LayerChild() {
        this.template = __bind(this.template, this);
        return LayerChild.__super__.constructor.apply(this, arguments);
      }

      LayerChild.prototype.tagName = 'li';

      LayerChild.prototype.className = 'list-group-item ui-state-default ui-sortable-handle';

      LayerChild.prototype.template = function() {
        return templatizer.cardEditor.toolbar.layerChild(this.model.attributes);
      };

      LayerChild.prototype.initialize = function() {
        return console.log('layerChild init');
      };

      return LayerChild;

    })(Marionette.ItemView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyQ2hpbGQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxHQUFHLENBQUMsTUFBSixDQUFXLGtCQUFYLEVBQStCLFNBQUMsS0FBRCxHQUFBO1dBQ3hCLEtBQUssQ0FBQztBQUNYLG1DQUFBLENBQUE7Ozs7O09BQUE7O0FBQUEsMkJBQUEsT0FBQSxHQUFTLElBQVQsQ0FBQTs7QUFBQSwyQkFDQSxTQUFBLEdBQVcscURBRFgsQ0FBQTs7QUFBQSwyQkFHQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2VBQ1QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBL0IsQ0FBMEMsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUFqRCxFQURTO01BQUEsQ0FIVixDQUFBOztBQUFBLDJCQU1BLFVBQUEsR0FBWSxTQUFBLEdBQUE7ZUFDWCxPQUFPLENBQUMsR0FBUixDQUFZLGlCQUFaLEVBRFc7TUFBQSxDQU5aLENBQUE7O3dCQUFBOztPQUQ4QixVQUFVLENBQUMsVUFEWjtFQUFBLENBQS9CLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyQ2hpbGQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJhcHAubW9kdWxlICdDYXJkRWRpdG9yLnZpZXdzJywgKHZpZXdzKSAtPlxuXHRjbGFzcyB2aWV3cy5MYXllckNoaWxkIGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlld1xuXHRcdHRhZ05hbWU6ICdsaSdcblx0XHRjbGFzc05hbWU6ICdsaXN0LWdyb3VwLWl0ZW0gdWktc3RhdGUtZGVmYXVsdCB1aS1zb3J0YWJsZS1oYW5kbGUnXG5cblx0XHR0ZW1wbGF0ZTogPT5cblx0XHRcdHRlbXBsYXRpemVyLmNhcmRFZGl0b3IudG9vbGJhci5sYXllckNoaWxkIEBtb2RlbC5hdHRyaWJ1dGVzXG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0Y29uc29sZS5sb2cgJ2xheWVyQ2hpbGQgaW5pdCciXX0=