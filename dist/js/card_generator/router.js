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

      return Router;

    })(Marionette.AppRouter);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL3JvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBO21TQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksZUFBWixFQUE2QixTQUFDLGFBQUQsR0FBQTtXQUN0QixhQUFhLENBQUM7QUFDbkIsK0JBQUEsQ0FBQTs7OztPQUFBOztBQUFBLHVCQUFBLE1BQUEsR0FBUSxLQUFSLENBQUE7O0FBQUEsdUJBRUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtlQUNYLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixFQUFhLFNBQUEsR0FBQTtBQUNaLFVBQUEsSUFBbUQsSUFBQyxDQUFBLE1BQUQsS0FBVyxJQUE5RDttQkFBQSxPQUFPLENBQUMsSUFBUixDQUFhLHVCQUFiLEVBQXNDLFNBQXRDLEVBQUE7V0FEWTtRQUFBLENBQWIsRUFEVztNQUFBLENBRlosQ0FBQTs7b0JBQUE7O09BRGtDLFVBQVUsQ0FBQyxXQURsQjtFQUFBLENBQTdCLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZ2VuZXJhdG9yL3JvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yJywgKENhcmRHZW5lcmF0b3IpIC0+XG5cdGNsYXNzIENhcmRHZW5lcmF0b3IuUm91dGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5BcHBSb3V0ZXJcblx0XHRsb2dnZXI6IG9mZlxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmluZm8gJ0NhcmRHZW5lcmF0b3IgUm91dGVyOicsIGFyZ3VtZW50cyBpZiBAbG9nZ2VyIGlzIG9uIl19