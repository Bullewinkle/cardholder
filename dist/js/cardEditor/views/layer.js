(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  app.module('CardEditorLayout.views', function(views) {
    var LayerState;
    LayerState = (function(_super) {
      __extends(LayerState, _super);

      function LayerState() {
        return LayerState.__super__.constructor.apply(this, arguments);
      }

      LayerState.prototype.defaults = {
        isCurrent: false
      };

      return LayerState;

    })(Backbone.Model);
    return views.Layer = (function(_super) {
      __extends(Layer, _super);

      function Layer() {
        this.template = __bind(this.template, this);
        return Layer.__super__.constructor.apply(this, arguments);
      }

      Layer.prototype.tagName = 'li';

      Layer.prototype.className = 'list-group-item ui-state-default ui-sortable-handle';

      Layer.prototype.template = function() {
        console.log(this.model.attributes);
        return templatizer.cardEditor.toolbar.layer(this.model.attributes);
      };

      Layer.prototype.initialize = function() {
        console.log('layer init');
        return this.state = new LayerState();
      };

      return Layer;

    })(Marionette.ItemView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRFZGl0b3Ivdmlld3MvbGF5ZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7c0ZBQUE7O0FBQUEsRUFBQSxHQUFHLENBQUMsTUFBSixDQUFXLHdCQUFYLEVBQXFDLFNBQUMsS0FBRCxHQUFBO0FBRXBDLFFBQUEsVUFBQTtBQUFBLElBQU07QUFDTCxtQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsMkJBQUEsUUFBQSxHQUNDO0FBQUEsUUFBQSxTQUFBLEVBQVcsS0FBWDtPQURELENBQUE7O3dCQUFBOztPQUR3QixRQUFRLENBQUMsTUFBbEMsQ0FBQTtXQUlNLEtBQUssQ0FBQztBQUNYLDhCQUFBLENBQUE7Ozs7O09BQUE7O0FBQUEsc0JBQUEsT0FBQSxHQUFTLElBQVQsQ0FBQTs7QUFBQSxzQkFDQSxTQUFBLEdBQVcscURBRFgsQ0FBQTs7QUFBQSxzQkFHQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1QsUUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQUMsQ0FBQSxLQUFLLENBQUMsVUFBbkIsQ0FBQSxDQUFBO2VBQ0EsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBL0IsQ0FBcUMsSUFBQyxDQUFBLEtBQUssQ0FBQyxVQUE1QyxFQUZTO01BQUEsQ0FIVixDQUFBOztBQUFBLHNCQU9BLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksWUFBWixDQUFBLENBQUE7ZUFDQSxJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsVUFBQSxDQUFBLEVBRkY7TUFBQSxDQVBaLENBQUE7O21CQUFBOztPQUR5QixVQUFVLENBQUMsVUFORDtFQUFBLENBQXJDLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRFZGl0b3Ivdmlld3MvbGF5ZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJhcHAubW9kdWxlICdDYXJkRWRpdG9yTGF5b3V0LnZpZXdzJywgKHZpZXdzKSAtPlxuXG5cdGNsYXNzIExheWVyU3RhdGUgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXHRcdGRlZmF1bHRzOlxuXHRcdFx0aXNDdXJyZW50OiBmYWxzZVxuXG5cdGNsYXNzIHZpZXdzLkxheWVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlld1xuXHRcdHRhZ05hbWU6ICdsaSdcblx0XHRjbGFzc05hbWU6ICdsaXN0LWdyb3VwLWl0ZW0gdWktc3RhdGUtZGVmYXVsdCB1aS1zb3J0YWJsZS1oYW5kbGUnXG5cdFx0XHRcdFxuXHRcdHRlbXBsYXRlOiA9PlxuXHRcdFx0Y29uc29sZS5sb2cgQG1vZGVsLmF0dHJpYnV0ZXNcblx0XHRcdHRlbXBsYXRpemVyLmNhcmRFZGl0b3IudG9vbGJhci5sYXllciBAbW9kZWwuYXR0cmlidXRlc1xuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdGNvbnNvbGUubG9nICdsYXllciBpbml0J1xuXHRcdFx0QHN0YXRlID0gbmV3IExheWVyU3RhdGUoKSJdfQ==