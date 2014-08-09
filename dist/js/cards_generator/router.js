(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  this.app.module('CardGenerator', function(CardGenerator) {
    CardGenerator.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.initialize = function() {
        return console.log('Init: Router');
      };

      Router.prototype.appRoutes = {
        '': 'index',
        '(/)': 'index',
        'any(/)': 'any',
        '*other': 'notFound'
      };

      Router.prototype.controller = new CardGenerator.Controller();

      Router.prototype.onRoute = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return console.log(args);
      };

      return Router;

    })(Marionette.AppRouter);
    return this.addInitializer(function() {
      return console.log('Init: Router', new CardGenerator.Controller());
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9yb3V0ZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7c0JBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxlQUFaLEVBQTZCLFNBQUMsYUFBRCxHQUFBO0FBRTVCLElBQU0sYUFBYSxDQUFDO0FBRW5CLCtCQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSx1QkFBQSxVQUFBLEdBQVksU0FBQSxHQUFBO2VBQ1gsT0FBTyxDQUFDLEdBQVIsQ0FBWSxjQUFaLEVBRFc7TUFBQSxDQUFaLENBQUE7O0FBQUEsdUJBR0EsU0FBQSxHQUNDO0FBQUEsUUFBQSxFQUFBLEVBQUksT0FBSjtBQUFBLFFBQ0EsS0FBQSxFQUFPLE9BRFA7QUFBQSxRQUVBLFFBQUEsRUFBVSxLQUZWO0FBQUEsUUFHQSxRQUFBLEVBQVUsVUFIVjtPQUpELENBQUE7O0FBQUEsdUJBU0EsVUFBQSxHQUFnQixJQUFBLGFBQWEsQ0FBQyxVQUFkLENBQUEsQ0FUaEIsQ0FBQTs7QUFBQSx1QkFXQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1IsWUFBQSxJQUFBO0FBQUEsUUFEUyw4REFDVCxDQUFBO2VBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaLEVBRFE7TUFBQSxDQVhULENBQUE7O29CQUFBOztPQUZrQyxVQUFVLENBQUMsVUFBOUMsQ0FBQTtXQWdCQSxJQUFDLENBQUEsY0FBRCxDQUFnQixTQUFBLEdBQUE7YUFDZixPQUFPLENBQUMsR0FBUixDQUFZLGNBQVosRUFBZ0MsSUFBQSxhQUFhLENBQUMsVUFBZCxDQUFBLENBQWhDLEVBRGU7SUFBQSxDQUFoQixFQWxCNEI7RUFBQSxDQUE3QixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkc19nZW5lcmF0b3Ivcm91dGVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRHZW5lcmF0b3InLCAoQ2FyZEdlbmVyYXRvcikgLT5cblxuXHRjbGFzcyBDYXJkR2VuZXJhdG9yLlJvdXRlciBleHRlbmRzIE1hcmlvbmV0dGUuQXBwUm91dGVyXG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0Y29uc29sZS5sb2cgJ0luaXQ6IFJvdXRlcidcblxuXHRcdGFwcFJvdXRlczogXG5cdFx0XHQnJzogJ2luZGV4J1xuXHRcdFx0JygvKSc6ICdpbmRleCdcblx0XHRcdCdhbnkoLyknOiAnYW55J1xuXHRcdFx0JypvdGhlcic6ICdub3RGb3VuZCdcblxuXHRcdGNvbnRyb2xsZXI6IG5ldyBDYXJkR2VuZXJhdG9yLkNvbnRyb2xsZXIoKVxuXG5cdFx0b25Sb3V0ZTogKGFyZ3MuLi4pIC0+XG5cdFx0XHRjb25zb2xlLmxvZyBhcmdzXG5cblx0QGFkZEluaXRpYWxpemVyIC0+XHRcblx0XHRjb25zb2xlLmxvZyAnSW5pdDogUm91dGVyJywgbmV3IENhcmRHZW5lcmF0b3IuQ29udHJvbGxlcigpXG5cdFx0IyBAcm91dGVyID0gbmV3IENhcmRHZW5lcmF0b3IuUm91dGVyKClcblx0IyBAYWRkSW5pdGlhbGl6ZXIgLT4iXX0=