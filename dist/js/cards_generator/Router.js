(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator', function(CardGenerator) {
    return CardGenerator.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.logger = false;

      Router.prototype.initialize = function() {
        return this.bind('all', function() {
          if (this.logger === true) {
            return console.info('CardGenerator Router:', arguments);
          }
        });
      };

      Router.prototype.appRoutes = {
        '(/)': 'showHome',
        'cards-generator(/)': 'showCardsGenerator',
        'page(/)': 'showPage',
        '*other': 'showNotFound'
      };

      Router.prototype.onRoute = function(trigger, route, params) {
        return $('.main_menu').find("a[href='" + window.location.pathname + "']").eq(0).parent().addClass('active').siblings().removeClass('active');
      };

      return Router;

    })(Marionette.AppRouter);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9Sb3V0ZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLGVBQVosRUFBNkIsU0FBQyxhQUFELEdBQUE7V0FDdEIsYUFBYSxDQUFDO0FBRW5CLCtCQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSx1QkFBQSxNQUFBLEdBQVEsS0FBUixDQUFBOztBQUFBLHVCQUVBLFVBQUEsR0FBWSxTQUFBLEdBQUE7ZUFDWCxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxTQUFBLEdBQUE7QUFDWixVQUFBLElBQW1ELElBQUMsQ0FBQSxNQUFELEtBQVcsSUFBOUQ7bUJBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSx1QkFBYixFQUFzQyxTQUF0QyxFQUFBO1dBRFk7UUFBQSxDQUFiLEVBRFc7TUFBQSxDQUZaLENBQUE7O0FBQUEsdUJBTUEsU0FBQSxHQUNDO0FBQUEsUUFBQSxLQUFBLEVBQU8sVUFBUDtBQUFBLFFBQ0Esb0JBQUEsRUFBc0Isb0JBRHRCO0FBQUEsUUFFQSxTQUFBLEVBQVcsVUFGWDtBQUFBLFFBR0EsUUFBQSxFQUFVLGNBSFY7T0FQRCxDQUFBOztBQUFBLHVCQVlBLE9BQUEsR0FBUyxTQUFDLE9BQUQsRUFBVSxLQUFWLEVBQWlCLE1BQWpCLEdBQUE7ZUFDUixDQUFBLENBQUUsWUFBRixDQUFlLENBQUMsSUFBaEIsQ0FBc0IsVUFBQSxHQUFTLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBekIsR0FBbUMsSUFBekQsQ0FBNkQsQ0FBQyxFQUE5RCxDQUFpRSxDQUFqRSxDQUFtRSxDQUFDLE1BQXBFLENBQUEsQ0FBNEUsQ0FBQyxRQUE3RSxDQUFzRixRQUF0RixDQUErRixDQUFDLFFBQWhHLENBQUEsQ0FBMEcsQ0FBQyxXQUEzRyxDQUF1SCxRQUF2SCxFQURRO01BQUEsQ0FaVCxDQUFBOztvQkFBQTs7T0FGa0MsVUFBVSxDQUFDLFdBRGxCO0VBQUEsQ0FBN0IsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZHNfZ2VuZXJhdG9yL1JvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yJywgKENhcmRHZW5lcmF0b3IpIC0+XG5cdGNsYXNzIENhcmRHZW5lcmF0b3IuUm91dGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5BcHBSb3V0ZXJcblxuXHRcdGxvZ2dlcjogb2ZmXG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsIC0+XG5cdFx0XHRcdGNvbnNvbGUuaW5mbyAnQ2FyZEdlbmVyYXRvciBSb3V0ZXI6JywgYXJndW1lbnRzIGlmIEBsb2dnZXIgaXMgb25cblxuXHRcdGFwcFJvdXRlczogXG5cdFx0XHQnKC8pJzogJ3Nob3dIb21lJ1xuXHRcdFx0J2NhcmRzLWdlbmVyYXRvcigvKSc6ICdzaG93Q2FyZHNHZW5lcmF0b3InXG5cdFx0XHQncGFnZSgvKSc6ICdzaG93UGFnZSdcblx0XHRcdCcqb3RoZXInOiAnc2hvd05vdEZvdW5kJ1xuXG5cdFx0b25Sb3V0ZTogKHRyaWdnZXIsIHJvdXRlLCBwYXJhbXMpIC0+XG5cdFx0XHQkKCcubWFpbl9tZW51JykuZmluZChcImFbaHJlZj0nI3t3aW5kb3cubG9jYXRpb24ucGF0aG5hbWV9J11cIikuZXEoMCkucGFyZW50KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpIl19