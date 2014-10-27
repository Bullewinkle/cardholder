(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardEditor', function(CardEditor) {
    return CardEditor.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.logger = false;

      Router.prototype.initialize = function() {
        return this.bind('all', function() {
          if (this.logger === true) {
            return console.info('CardEditor Router:', arguments);
          }
        });
      };

      return Router;

    })(Marionette.AppRouter);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRFZGl0b3Ivcm91dGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxZQUFaLEVBQTBCLFNBQUMsVUFBRCxHQUFBO1dBQ25CLFVBQVUsQ0FBQztBQUVoQiwrQkFBQSxDQUFBOzs7O09BQUE7O0FBQUEsdUJBQUEsTUFBQSxHQUFRLEtBQVIsQ0FBQTs7QUFBQSx1QkFFQSxVQUFBLEdBQVksU0FBQSxHQUFBO2VBQ1gsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWEsU0FBQSxHQUFBO0FBQ1osVUFBQSxJQUFnRCxJQUFDLENBQUEsTUFBRCxLQUFXLElBQTNEO21CQUFBLE9BQU8sQ0FBQyxJQUFSLENBQWEsb0JBQWIsRUFBbUMsU0FBbkMsRUFBQTtXQURZO1FBQUEsQ0FBYixFQURXO01BQUEsQ0FGWixDQUFBOztvQkFBQTs7T0FGK0IsVUFBVSxDQUFDLFdBRGxCO0VBQUEsQ0FBMUIsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZEVkaXRvci9yb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEVkaXRvcicsIChDYXJkRWRpdG9yKSAtPlxuXHRjbGFzcyBDYXJkRWRpdG9yLlJvdXRlciBleHRlbmRzIE1hcmlvbmV0dGUuQXBwUm91dGVyXG5cblx0XHRsb2dnZXI6IG9mZlxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmluZm8gJ0NhcmRFZGl0b3IgUm91dGVyOicsIGFyZ3VtZW50cyBpZiBAbG9nZ2VyIGlzIG9uXG5cblx0XHQjIGFwcFJvdXRlczoiXX0=