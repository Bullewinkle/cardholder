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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9yb3V0ZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7c0JBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxlQUFaLEVBQTZCLFNBQUMsYUFBRCxHQUFBO0FBRTVCLElBQU0sYUFBYSxDQUFDO0FBRW5CLCtCQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSx1QkFBQSxVQUFBLEdBQVksU0FBQSxHQUFBO2VBQ1gsT0FBTyxDQUFDLEdBQVIsQ0FBWSxjQUFaLEVBRFc7TUFBQSxDQUFaLENBQUE7O0FBQUEsdUJBR0EsU0FBQSxHQUNDO0FBQUEsUUFBQSxLQUFBLEVBQU8sT0FBUDtBQUFBLFFBQ0EsUUFBQSxFQUFVLEtBRFY7QUFBQSxRQUVBLFFBQUEsRUFBVSxVQUZWO09BSkQsQ0FBQTs7QUFBQSx1QkFRQSxVQUFBLEdBQWdCLElBQUEsYUFBYSxDQUFDLFVBQWQsQ0FBQSxDQVJoQixDQUFBOztBQUFBLHVCQVVBLE9BQUEsR0FBUyxTQUFBLEdBQUE7QUFDUixZQUFBLElBQUE7QUFBQSxRQURTLDhEQUNULENBQUE7ZUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQVosRUFEUTtNQUFBLENBVlQsQ0FBQTs7b0JBQUE7O09BRmtDLFVBQVUsQ0FBQyxVQUE5QyxDQUFBO1dBZUEsSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsU0FBQSxHQUFBO2FBQ2YsT0FBTyxDQUFDLEdBQVIsQ0FBWSxjQUFaLEVBQWdDLElBQUEsYUFBYSxDQUFDLFVBQWQsQ0FBQSxDQUFoQyxFQURlO0lBQUEsQ0FBaEIsRUFqQjRCO0VBQUEsQ0FBN0IsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZHNfZ2VuZXJhdG9yL3JvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yJywgKENhcmRHZW5lcmF0b3IpIC0+XG5cblx0Y2xhc3MgQ2FyZEdlbmVyYXRvci5Sb3V0ZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkFwcFJvdXRlclxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdGNvbnNvbGUubG9nICdJbml0OiBSb3V0ZXInXG5cblx0XHRhcHBSb3V0ZXM6IFxuXHRcdFx0JygvKSc6ICdpbmRleCdcblx0XHRcdCdhbnkoLyknOiAnYW55J1xuXHRcdFx0JypvdGhlcic6ICdub3RGb3VuZCdcblxuXHRcdGNvbnRyb2xsZXI6IG5ldyBDYXJkR2VuZXJhdG9yLkNvbnRyb2xsZXIoKVxuXG5cdFx0b25Sb3V0ZTogKGFyZ3MuLi4pIC0+XG5cdFx0XHRjb25zb2xlLmxvZyBhcmdzXG5cblx0QGFkZEluaXRpYWxpemVyIC0+XHRcblx0XHRjb25zb2xlLmxvZyAnSW5pdDogUm91dGVyJywgbmV3IENhcmRHZW5lcmF0b3IuQ29udHJvbGxlcigpXG5cdFx0IyBAcm91dGVyID0gbmV3IENhcmRHZW5lcmF0b3IuUm91dGVyKClcblx0IyBAYWRkSW5pdGlhbGl6ZXIgLT4iXX0=