(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardEditorLayout', function(CardEditorLayout) {
    return CardEditorLayout.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.logger = false;

      Router.prototype.initialize = function() {
        return this.bind('all', function() {
          if (this.logger === true) {
            return console.info('CardEditorLayout Router:', arguments);
          }
        });
      };

      return Router;

    })(Marionette.AppRouter);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRFZGl0b3Ivcm91dGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxrQkFBWixFQUFnQyxTQUFDLGdCQUFELEdBQUE7V0FDekIsZ0JBQWdCLENBQUM7QUFFdEIsK0JBQUEsQ0FBQTs7OztPQUFBOztBQUFBLHVCQUFBLE1BQUEsR0FBUSxLQUFSLENBQUE7O0FBQUEsdUJBRUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtlQUNYLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixFQUFhLFNBQUEsR0FBQTtBQUNaLFVBQUEsSUFBc0QsSUFBQyxDQUFBLE1BQUQsS0FBVyxJQUFqRTttQkFBQSxPQUFPLENBQUMsSUFBUixDQUFhLDBCQUFiLEVBQXlDLFNBQXpDLEVBQUE7V0FEWTtRQUFBLENBQWIsRUFEVztNQUFBLENBRlosQ0FBQTs7b0JBQUE7O09BRnFDLFVBQVUsQ0FBQyxXQURsQjtFQUFBLENBQWhDLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRFZGl0b3Ivcm91dGVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRFZGl0b3JMYXlvdXQnLCAoQ2FyZEVkaXRvckxheW91dCkgLT5cblx0Y2xhc3MgQ2FyZEVkaXRvckxheW91dC5Sb3V0ZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkFwcFJvdXRlclxuXG5cdFx0bG9nZ2VyOiBvZmZcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRAYmluZCAnYWxsJywgLT5cblx0XHRcdFx0Y29uc29sZS5pbmZvICdDYXJkRWRpdG9yTGF5b3V0IFJvdXRlcjonLCBhcmd1bWVudHMgaWYgQGxvZ2dlciBpcyBvblxuXG5cdFx0IyBhcHBSb3V0ZXM6Il19