(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('Cards', function(Cards) {
    return Cards.Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.logger = false;

      Router.prototype.initialize = function() {
        return this.bind('all', function() {
          if (this.logger === true) {
            return console.info('Cards Router:', arguments);
          }
        });
      };

      return Router;

    })(Marionette.AppRouter);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzL3JvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBO21TQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksT0FBWixFQUFxQixTQUFDLEtBQUQsR0FBQTtXQUNkLEtBQUssQ0FBQztBQUNYLCtCQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSx1QkFBQSxNQUFBLEdBQVEsS0FBUixDQUFBOztBQUFBLHVCQUVBLFVBQUEsR0FBWSxTQUFBLEdBQUE7ZUFDWCxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxTQUFBLEdBQUE7QUFDWixVQUFBLElBQTJDLElBQUMsQ0FBQSxNQUFELEtBQVcsSUFBdEQ7bUJBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxlQUFiLEVBQThCLFNBQTlCLEVBQUE7V0FEWTtRQUFBLENBQWIsRUFEVztNQUFBLENBRlosQ0FBQTs7b0JBQUE7O09BRDBCLFVBQVUsQ0FBQyxXQURsQjtFQUFBLENBQXJCLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRzL3JvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkcycsIChDYXJkcykgLT5cblx0Y2xhc3MgQ2FyZHMuUm91dGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5BcHBSb3V0ZXJcblx0XHRsb2dnZXI6IG9mZlxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmluZm8gJ0NhcmRzIFJvdXRlcjonLCBhcmd1bWVudHMgaWYgQGxvZ2dlciBpcyBvbiJdfQ==