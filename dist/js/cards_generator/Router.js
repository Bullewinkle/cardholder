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
        var $activeLink;
        $activeLink = $('.main-menu').find("a[href='" + window.location.pathname + "']").eq(0).parent();
        if ($activeLink.length === 0) {
          $activeLink = $('.main-menu').find("a[href='/other-route']").eq(0).parent();
        }
        return $activeLink.addClass('active').siblings().removeClass('active');
      };

      return Router;

    })(Marionette.AppRouter);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9yb3V0ZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLGVBQVosRUFBNkIsU0FBQyxhQUFELEdBQUE7V0FDdEIsYUFBYSxDQUFDO0FBRW5CLCtCQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSx1QkFBQSxNQUFBLEdBQVEsS0FBUixDQUFBOztBQUFBLHVCQUVBLFVBQUEsR0FBWSxTQUFBLEdBQUE7ZUFDWCxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxTQUFBLEdBQUE7QUFDWixVQUFBLElBQW1ELElBQUMsQ0FBQSxNQUFELEtBQVcsSUFBOUQ7bUJBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSx1QkFBYixFQUFzQyxTQUF0QyxFQUFBO1dBRFk7UUFBQSxDQUFiLEVBRFc7TUFBQSxDQUZaLENBQUE7O0FBQUEsdUJBTUEsU0FBQSxHQUNDO0FBQUEsUUFBQSxLQUFBLEVBQU8sVUFBUDtBQUFBLFFBQ0Esb0JBQUEsRUFBc0Isb0JBRHRCO0FBQUEsUUFFQSxTQUFBLEVBQVcsVUFGWDtBQUFBLFFBR0EsUUFBQSxFQUFVLGNBSFY7T0FQRCxDQUFBOztBQUFBLHVCQVlBLE9BQUEsR0FBUyxTQUFDLE9BQUQsRUFBVSxLQUFWLEVBQWlCLE1BQWpCLEdBQUE7QUFFUixZQUFBLFdBQUE7QUFBQSxRQUFBLFdBQUEsR0FBYyxDQUFBLENBQUUsWUFBRixDQUFlLENBQUMsSUFBaEIsQ0FBc0IsVUFBQSxHQUFTLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBekIsR0FBbUMsSUFBekQsQ0FBNkQsQ0FBQyxFQUE5RCxDQUFpRSxDQUFqRSxDQUFtRSxDQUFDLE1BQXBFLENBQUEsQ0FBZCxDQUFBO0FBQ0EsUUFBQSxJQUFHLFdBQVcsQ0FBQyxNQUFaLEtBQXNCLENBQXpCO0FBQWdDLFVBQUEsV0FBQSxHQUFjLENBQUEsQ0FBRSxZQUFGLENBQWUsQ0FBQyxJQUFoQixDQUFxQix3QkFBckIsQ0FBOEMsQ0FBQyxFQUEvQyxDQUFrRCxDQUFsRCxDQUFvRCxDQUFDLE1BQXJELENBQUEsQ0FBZCxDQUFoQztTQURBO2VBRUEsV0FBVyxDQUFDLFFBQVosQ0FBcUIsUUFBckIsQ0FBOEIsQ0FBQyxRQUEvQixDQUFBLENBQXlDLENBQUMsV0FBMUMsQ0FBc0QsUUFBdEQsRUFKUTtNQUFBLENBWlQsQ0FBQTs7b0JBQUE7O09BRmtDLFVBQVUsQ0FBQyxXQURsQjtFQUFBLENBQTdCLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRzX2dlbmVyYXRvci9yb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvcicsIChDYXJkR2VuZXJhdG9yKSAtPlxuXHRjbGFzcyBDYXJkR2VuZXJhdG9yLlJvdXRlciBleHRlbmRzIE1hcmlvbmV0dGUuQXBwUm91dGVyXG5cblx0XHRsb2dnZXI6IG9mZlxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmluZm8gJ0NhcmRHZW5lcmF0b3IgUm91dGVyOicsIGFyZ3VtZW50cyBpZiBAbG9nZ2VyIGlzIG9uXG5cblx0XHRhcHBSb3V0ZXM6IFxuXHRcdFx0JygvKSc6ICdzaG93SG9tZSdcblx0XHRcdCdjYXJkcy1nZW5lcmF0b3IoLyknOiAnc2hvd0NhcmRzR2VuZXJhdG9yJ1xuXHRcdFx0J3BhZ2UoLyknOiAnc2hvd1BhZ2UnXG5cdFx0XHQnKm90aGVyJzogJ3Nob3dOb3RGb3VuZCdcblxuXHRcdG9uUm91dGU6ICh0cmlnZ2VyLCByb3V0ZSwgcGFyYW1zKSAtPlxuXHRcdFx0IyBhZGQgbmV3IGN1cnJlbnQgbGluayBjbGFzcyAnYWN0aXZlJ1xuXHRcdFx0JGFjdGl2ZUxpbmsgPSAkKCcubWFpbi1tZW51JykuZmluZChcImFbaHJlZj0nI3t3aW5kb3cubG9jYXRpb24ucGF0aG5hbWV9J11cIikuZXEoMCkucGFyZW50KClcblx0XHRcdGlmICRhY3RpdmVMaW5rLmxlbmd0aCBpcyAwIHRoZW4gJGFjdGl2ZUxpbmsgPSAkKCcubWFpbi1tZW51JykuZmluZChcImFbaHJlZj0nL290aGVyLXJvdXRlJ11cIikuZXEoMCkucGFyZW50KClcblx0XHRcdCRhY3RpdmVMaW5rLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKSJdfQ==