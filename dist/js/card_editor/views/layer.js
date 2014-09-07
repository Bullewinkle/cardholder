(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  app.module('CardEditor.views', function(views) {
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

    })(Marionette.CompositeView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O3NGQUFBOztBQUFBLEVBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVyxrQkFBWCxFQUErQixTQUFDLEtBQUQsR0FBQTtBQUU5QixRQUFBLFVBQUE7QUFBQSxJQUFNO0FBQ0wsbUNBQUEsQ0FBQTs7OztPQUFBOztBQUFBLDJCQUFBLFFBQUEsR0FDQztBQUFBLFFBQUEsU0FBQSxFQUFXLEtBQVg7T0FERCxDQUFBOzt3QkFBQTs7T0FEd0IsUUFBUSxDQUFDLE1BQWxDLENBQUE7V0FJTSxLQUFLLENBQUM7QUFDWCw4QkFBQSxDQUFBOzs7OztPQUFBOztBQUFBLHNCQUFBLE9BQUEsR0FBUyxJQUFULENBQUE7O0FBQUEsc0JBQ0EsU0FBQSxHQUFXLHFEQURYLENBQUE7O0FBQUEsc0JBR0EsUUFBQSxHQUFVLFNBQUEsR0FBQTtBQUNULFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFDLENBQUEsS0FBSyxDQUFDLFVBQW5CLENBQUEsQ0FBQTtlQUNBLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQS9CLENBQXFDLElBQUMsQ0FBQSxLQUFLLENBQUMsVUFBNUMsRUFGUztNQUFBLENBSFYsQ0FBQTs7QUFBQSxzQkFPQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1gsUUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFlBQVosQ0FBQSxDQUFBO2VBQ0EsSUFBQyxDQUFBLEtBQUQsR0FBYSxJQUFBLFVBQUEsQ0FBQSxFQUZGO01BQUEsQ0FQWixDQUFBOzttQkFBQTs7T0FEeUIsVUFBVSxDQUFDLGVBTlA7RUFBQSxDQUEvQixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkX2VkaXRvci92aWV3cy9sYXllci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImFwcC5tb2R1bGUgJ0NhcmRFZGl0b3Iudmlld3MnLCAodmlld3MpIC0+XG5cblx0Y2xhc3MgTGF5ZXJTdGF0ZSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cdFx0ZGVmYXVsdHM6XG5cdFx0XHRpc0N1cnJlbnQ6IGZhbHNlXG5cblx0Y2xhc3Mgdmlld3MuTGF5ZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXdcblx0XHR0YWdOYW1lOiAnbGknXG5cdFx0Y2xhc3NOYW1lOiAnbGlzdC1ncm91cC1pdGVtIHVpLXN0YXRlLWRlZmF1bHQgdWktc29ydGFibGUtaGFuZGxlJ1xuXHRcdFx0XHRcblx0XHR0ZW1wbGF0ZTogPT5cblx0XHRcdGNvbnNvbGUubG9nIEBtb2RlbC5hdHRyaWJ1dGVzXG5cdFx0XHR0ZW1wbGF0aXplci5jYXJkRWRpdG9yLnRvb2xiYXIubGF5ZXIgQG1vZGVsLmF0dHJpYnV0ZXNcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRjb25zb2xlLmxvZyAnbGF5ZXIgaW5pdCdcblx0XHRcdEBzdGF0ZSA9IG5ldyBMYXllclN0YXRlKCkiXX0=