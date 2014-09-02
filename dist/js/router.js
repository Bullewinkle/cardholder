(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app.module('Common', function(Common) {
    return Common.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.logger = false;

      Router.prototype.appRoutes = {
        '(/)': 'showHome',
        'card-generator(/)': 'showCardGenerator',
        'card-editor(/)': 'showCardEditor',
        'page(/)': 'showPage',
        '*other': 'showNotFound'
      };

      Router.prototype.initialize = function() {
        return this.bind('all', function() {
          if (this.logger === true) {
            return console.info('CardGenerator Router:', arguments);
          }
        });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBO21TQUFBOztBQUFBLEVBQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFYLENBQWtCLFFBQWxCLEVBQTRCLFNBQUMsTUFBRCxHQUFBO1dBQ3JCLE1BQU0sQ0FBQztBQUNaLCtCQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSx1QkFBQSxNQUFBLEdBQVEsS0FBUixDQUFBOztBQUFBLHVCQUVBLFNBQUEsR0FDQztBQUFBLFFBQUEsS0FBQSxFQUFPLFVBQVA7QUFBQSxRQUNBLG1CQUFBLEVBQXFCLG1CQURyQjtBQUFBLFFBRUEsZ0JBQUEsRUFBa0IsZ0JBRmxCO0FBQUEsUUFHQSxTQUFBLEVBQVcsVUFIWDtBQUFBLFFBSUEsUUFBQSxFQUFVLGNBSlY7T0FIRCxDQUFBOztBQUFBLHVCQVNBLFVBQUEsR0FBWSxTQUFBLEdBQUE7ZUFDWCxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxTQUFBLEdBQUE7QUFDWixVQUFBLElBQW1ELElBQUMsQ0FBQSxNQUFELEtBQVcsSUFBOUQ7bUJBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSx1QkFBYixFQUFzQyxTQUF0QyxFQUFBO1dBRFk7UUFBQSxDQUFiLEVBRFc7TUFBQSxDQVRaLENBQUE7O0FBQUEsdUJBYUEsT0FBQSxHQUFTLFNBQUMsT0FBRCxFQUFVLEtBQVYsRUFBaUIsTUFBakIsR0FBQTtBQUVSLFlBQUEsV0FBQTtBQUFBLFFBQUEsV0FBQSxHQUFjLENBQUEsQ0FBRSxZQUFGLENBQWUsQ0FBQyxJQUFoQixDQUFzQixVQUFBLEdBQVMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUF6QixHQUFtQyxJQUF6RCxDQUE2RCxDQUFDLEVBQTlELENBQWlFLENBQWpFLENBQW1FLENBQUMsTUFBcEUsQ0FBQSxDQUFkLENBQUE7QUFDQSxRQUFBLElBQUcsV0FBVyxDQUFDLE1BQVosS0FBc0IsQ0FBekI7QUFBZ0MsVUFBQSxXQUFBLEdBQWMsQ0FBQSxDQUFFLFlBQUYsQ0FBZSxDQUFDLElBQWhCLENBQXFCLHdCQUFyQixDQUE4QyxDQUFDLEVBQS9DLENBQWtELENBQWxELENBQW9ELENBQUMsTUFBckQsQ0FBQSxDQUFkLENBQWhDO1NBREE7ZUFFQSxXQUFXLENBQUMsUUFBWixDQUFxQixRQUFyQixDQUE4QixDQUFDLFFBQS9CLENBQUEsQ0FBeUMsQ0FBQyxXQUExQyxDQUFzRCxRQUF0RCxFQUpRO01BQUEsQ0FiVCxDQUFBOztvQkFBQTs7T0FEMkIsVUFBVSxDQUFDLFdBRFo7RUFBQSxDQUE1QixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJyb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuYXBwLm1vZHVsZSAnQ29tbW9uJywgKENvbW1vbikgLT5cblx0Y2xhc3MgQ29tbW9uLlJvdXRlciBleHRlbmRzIE1hcmlvbmV0dGUuQXBwUm91dGVyXG5cdFx0bG9nZ2VyOiBvZmZcblxuXHRcdGFwcFJvdXRlczogXG5cdFx0XHQnKC8pJzogJ3Nob3dIb21lJ1xuXHRcdFx0J2NhcmQtZ2VuZXJhdG9yKC8pJzogJ3Nob3dDYXJkR2VuZXJhdG9yJ1xuXHRcdFx0J2NhcmQtZWRpdG9yKC8pJzogJ3Nob3dDYXJkRWRpdG9yJ1xuXHRcdFx0J3BhZ2UoLyknOiAnc2hvd1BhZ2UnXG5cdFx0XHQnKm90aGVyJzogJ3Nob3dOb3RGb3VuZCdcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRAYmluZCAnYWxsJywgLT5cblx0XHRcdFx0Y29uc29sZS5pbmZvICdDYXJkR2VuZXJhdG9yIFJvdXRlcjonLCBhcmd1bWVudHMgaWYgQGxvZ2dlciBpcyBvblxuXG5cdFx0b25Sb3V0ZTogKHRyaWdnZXIsIHJvdXRlLCBwYXJhbXMpIC0+XG5cdFx0XHQjIGFkZCBuZXcgY3VycmVudCBsaW5rIGNsYXNzICdhY3RpdmUnXG5cdFx0XHQkYWN0aXZlTGluayA9ICQoJy5tYWluLW1lbnUnKS5maW5kKFwiYVtocmVmPScje3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZX0nXVwiKS5lcSgwKS5wYXJlbnQoKVxuXHRcdFx0aWYgJGFjdGl2ZUxpbmsubGVuZ3RoIGlzIDAgdGhlbiAkYWN0aXZlTGluayA9ICQoJy5tYWluLW1lbnUnKS5maW5kKFwiYVtocmVmPScvb3RoZXItcm91dGUnXVwiKS5lcSgwKS5wYXJlbnQoKVxuXHRcdFx0JGFjdGl2ZUxpbmsuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpIl19