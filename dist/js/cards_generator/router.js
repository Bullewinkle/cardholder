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

      Router.prototype.routes = {
        '(/)': 'index',
        'any(/)': 'any'
      };

      Router.prototype.controller = CardGenerator.Controller;

      Router.prototype.onRoute = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return console.log(args);
      };

      return Router;

    })(Marionette.AppRouter);
    return this.addInitializer(function() {
      console.log('Init: Router', new CardGenerator.Controller());
      return this.router = new CardGenerator.Router();
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9yb3V0ZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7c0JBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxlQUFaLEVBQTZCLFNBQUMsYUFBRCxHQUFBO0FBRTVCLElBQU0sYUFBYSxDQUFDO0FBRW5CLCtCQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSx1QkFBQSxVQUFBLEdBQVksU0FBQSxHQUFBO2VBQ1gsT0FBTyxDQUFDLEdBQVIsQ0FBWSxjQUFaLEVBRFc7TUFBQSxDQUFaLENBQUE7O0FBQUEsdUJBR0EsTUFBQSxHQUNDO0FBQUEsUUFBQSxLQUFBLEVBQU8sT0FBUDtBQUFBLFFBQ0EsUUFBQSxFQUFVLEtBRFY7T0FKRCxDQUFBOztBQUFBLHVCQU9BLFVBQUEsR0FBWSxhQUFhLENBQUMsVUFQMUIsQ0FBQTs7QUFBQSx1QkFTQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1IsWUFBQSxJQUFBO0FBQUEsUUFEUyw4REFDVCxDQUFBO2VBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaLEVBRFE7TUFBQSxDQVRULENBQUE7O29CQUFBOztPQUZrQyxVQUFVLENBQUMsVUFBOUMsQ0FBQTtXQWNBLElBQUMsQ0FBQSxjQUFELENBQWdCLFNBQUEsR0FBQTtBQUNmLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxjQUFaLEVBQWdDLElBQUEsYUFBYSxDQUFDLFVBQWQsQ0FBQSxDQUFoQyxDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsTUFBRCxHQUFjLElBQUEsYUFBYSxDQUFDLE1BQWQsQ0FBQSxFQUZDO0lBQUEsQ0FBaEIsRUFoQjRCO0VBQUEsQ0FBN0IsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZHNfZ2VuZXJhdG9yL3JvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yJywgKENhcmRHZW5lcmF0b3IpIC0+XG5cblx0Y2xhc3MgQ2FyZEdlbmVyYXRvci5Sb3V0ZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkFwcFJvdXRlclxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdGNvbnNvbGUubG9nICdJbml0OiBSb3V0ZXInXG5cblx0XHRyb3V0ZXM6IFxuXHRcdFx0JygvKSc6ICdpbmRleCdcblx0XHRcdCdhbnkoLyknOiAnYW55J1xuXG5cdFx0Y29udHJvbGxlcjogQ2FyZEdlbmVyYXRvci5Db250cm9sbGVyXG5cblx0XHRvblJvdXRlOiAoYXJncy4uLikgLT5cblx0XHRcdGNvbnNvbGUubG9nIGFyZ3NcblxuXHRAYWRkSW5pdGlhbGl6ZXIgLT5cdFxuXHRcdGNvbnNvbGUubG9nICdJbml0OiBSb3V0ZXInLCBuZXcgQ2FyZEdlbmVyYXRvci5Db250cm9sbGVyKClcblx0XHRAcm91dGVyID0gbmV3IENhcmRHZW5lcmF0b3IuUm91dGVyKClcblx0IyBAYWRkSW5pdGlhbGl6ZXIgLT4iXX0=