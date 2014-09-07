(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.module('CardEditor.views', function(views) {
    return views.Layer = (function(_super) {
      __extends(Layer, _super);

      function Layer() {
        this.template = __bind(this.template, this);
        return Layer.__super__.constructor.apply(this, arguments);
      }

      Layer.prototype.tagName = 'li';

      Layer.prototype.className = 'list-group-item ui-state-default ui-sortable-handle';

      Layer.prototype.template = function() {
        return templatizer.cardEditor.toolbar.layer({});
      };

      Layer.prototype.initialize = function() {
        return console.log('layer init');
      };

      return Layer;

    })(Marionette.CompositeView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O21TQUFBOztBQUFBLEVBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVyxrQkFBWCxFQUErQixTQUFDLEtBQUQsR0FBQTtXQUN4QixLQUFLLENBQUM7QUFDWCw4QkFBQSxDQUFBOzs7OztPQUFBOztBQUFBLHNCQUFBLE9BQUEsR0FBUyxJQUFULENBQUE7O0FBQUEsc0JBQ0EsU0FBQSxHQUFXLHFEQURYLENBQUE7O0FBQUEsc0JBR0EsUUFBQSxHQUFVLFNBQUEsR0FBQTtlQUNULFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQS9CLENBQXFDLEVBQXJDLEVBRFM7TUFBQSxDQUhWLENBQUE7O0FBQUEsc0JBTUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtlQUNYLE9BQU8sQ0FBQyxHQUFSLENBQVksWUFBWixFQURXO01BQUEsQ0FOWixDQUFBOzttQkFBQTs7T0FEeUIsVUFBVSxDQUFDLGVBRFA7RUFBQSxDQUEvQixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkX2VkaXRvci92aWV3cy9sYXllci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImFwcC5tb2R1bGUgJ0NhcmRFZGl0b3Iudmlld3MnLCAodmlld3MpIC0+XG5cdGNsYXNzIHZpZXdzLkxheWVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3XG5cdFx0dGFnTmFtZTogJ2xpJ1xuXHRcdGNsYXNzTmFtZTogJ2xpc3QtZ3JvdXAtaXRlbSB1aS1zdGF0ZS1kZWZhdWx0IHVpLXNvcnRhYmxlLWhhbmRsZSdcblx0XHRcdFx0XG5cdFx0dGVtcGxhdGU6ID0+XG5cdFx0XHR0ZW1wbGF0aXplci5jYXJkRWRpdG9yLnRvb2xiYXIubGF5ZXIge31cblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRjb25zb2xlLmxvZyAnbGF5ZXIgaW5pdCciXX0=