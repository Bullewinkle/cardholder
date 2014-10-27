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
        'card-generator(/)': 'showCards',
        'card-editor(/)': 'showCardEditorLayout',
        'page(/)': 'showPage',
        '*other': 'showNotFound'
      };

      Router.prototype.initialize = function() {
        return this.bind('all', function() {
          if (this.logger === true) {
            return console.info('Cards Router:', arguments);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBO21TQUFBOztBQUFBLEVBQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFYLENBQWtCLFFBQWxCLEVBQTRCLFNBQUMsTUFBRCxHQUFBO1dBQ3JCLE1BQU0sQ0FBQztBQUNaLCtCQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSx1QkFBQSxNQUFBLEdBQVEsS0FBUixDQUFBOztBQUFBLHVCQUVBLFNBQUEsR0FDQztBQUFBLFFBQUEsS0FBQSxFQUFPLFVBQVA7QUFBQSxRQUNBLG1CQUFBLEVBQXFCLFdBRHJCO0FBQUEsUUFFQSxnQkFBQSxFQUFrQixzQkFGbEI7QUFBQSxRQUdBLFNBQUEsRUFBVyxVQUhYO0FBQUEsUUFJQSxRQUFBLEVBQVUsY0FKVjtPQUhELENBQUE7O0FBQUEsdUJBU0EsVUFBQSxHQUFZLFNBQUEsR0FBQTtlQUNYLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixFQUFhLFNBQUEsR0FBQTtBQUNaLFVBQUEsSUFBMkMsSUFBQyxDQUFBLE1BQUQsS0FBVyxJQUF0RDttQkFBQSxPQUFPLENBQUMsSUFBUixDQUFhLGVBQWIsRUFBOEIsU0FBOUIsRUFBQTtXQURZO1FBQUEsQ0FBYixFQURXO01BQUEsQ0FUWixDQUFBOztBQUFBLHVCQWFBLE9BQUEsR0FBUyxTQUFDLE9BQUQsRUFBVSxLQUFWLEVBQWlCLE1BQWpCLEdBQUE7QUFFUixZQUFBLFdBQUE7QUFBQSxRQUFBLFdBQUEsR0FBYyxDQUFBLENBQUUsWUFBRixDQUFlLENBQUMsSUFBaEIsQ0FBc0IsVUFBQSxHQUFTLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBekIsR0FBbUMsSUFBekQsQ0FBNkQsQ0FBQyxFQUE5RCxDQUFpRSxDQUFqRSxDQUFtRSxDQUFDLE1BQXBFLENBQUEsQ0FBZCxDQUFBO0FBQ0EsUUFBQSxJQUFHLFdBQVcsQ0FBQyxNQUFaLEtBQXNCLENBQXpCO0FBQWdDLFVBQUEsV0FBQSxHQUFjLENBQUEsQ0FBRSxZQUFGLENBQWUsQ0FBQyxJQUFoQixDQUFxQix3QkFBckIsQ0FBOEMsQ0FBQyxFQUEvQyxDQUFrRCxDQUFsRCxDQUFvRCxDQUFDLE1BQXJELENBQUEsQ0FBZCxDQUFoQztTQURBO2VBRUEsV0FBVyxDQUFDLFFBQVosQ0FBcUIsUUFBckIsQ0FBOEIsQ0FBQyxRQUEvQixDQUFBLENBQXlDLENBQUMsV0FBMUMsQ0FBc0QsUUFBdEQsRUFKUTtNQUFBLENBYlQsQ0FBQTs7b0JBQUE7O09BRDJCLFVBQVUsQ0FBQyxXQURaO0VBQUEsQ0FBNUIsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93LmFwcC5tb2R1bGUgJ0NvbW1vbicsIChDb21tb24pIC0+XG5cdGNsYXNzIENvbW1vbi5Sb3V0ZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkFwcFJvdXRlclxuXHRcdGxvZ2dlcjogb2ZmXG5cblx0XHRhcHBSb3V0ZXM6IFxuXHRcdFx0JygvKSc6ICdzaG93SG9tZSdcblx0XHRcdCdjYXJkLWdlbmVyYXRvcigvKSc6ICdzaG93Q2FyZHMnXG5cdFx0XHQnY2FyZC1lZGl0b3IoLyknOiAnc2hvd0NhcmRFZGl0b3JMYXlvdXQnXG5cdFx0XHQncGFnZSgvKSc6ICdzaG93UGFnZSdcblx0XHRcdCcqb3RoZXInOiAnc2hvd05vdEZvdW5kJ1xuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmluZm8gJ0NhcmRzIFJvdXRlcjonLCBhcmd1bWVudHMgaWYgQGxvZ2dlciBpcyBvblxuXG5cdFx0b25Sb3V0ZTogKHRyaWdnZXIsIHJvdXRlLCBwYXJhbXMpIC0+XG5cdFx0XHQjIGFkZCBuZXcgY3VycmVudCBsaW5rIGNsYXNzICdhY3RpdmUnXG5cdFx0XHQkYWN0aXZlTGluayA9ICQoJy5tYWluLW1lbnUnKS5maW5kKFwiYVtocmVmPScje3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZX0nXVwiKS5lcSgwKS5wYXJlbnQoKVxuXHRcdFx0aWYgJGFjdGl2ZUxpbmsubGVuZ3RoIGlzIDAgdGhlbiAkYWN0aXZlTGluayA9ICQoJy5tYWluLW1lbnUnKS5maW5kKFwiYVtocmVmPScvb3RoZXItcm91dGUnXVwiKS5lcSgwKS5wYXJlbnQoKVxuXHRcdFx0JGFjdGl2ZUxpbmsuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpIl19