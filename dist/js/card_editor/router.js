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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3JvdXRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBO21TQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksWUFBWixFQUEwQixTQUFDLFVBQUQsR0FBQTtXQUNuQixVQUFVLENBQUM7QUFFaEIsK0JBQUEsQ0FBQTs7OztPQUFBOztBQUFBLHVCQUFBLE1BQUEsR0FBUSxLQUFSLENBQUE7O0FBQUEsdUJBRUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtlQUNYLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixFQUFhLFNBQUEsR0FBQTtBQUNaLFVBQUEsSUFBZ0QsSUFBQyxDQUFBLE1BQUQsS0FBVyxJQUEzRDttQkFBQSxPQUFPLENBQUMsSUFBUixDQUFhLG9CQUFiLEVBQW1DLFNBQW5DLEVBQUE7V0FEWTtRQUFBLENBQWIsRUFEVztNQUFBLENBRlosQ0FBQTs7b0JBQUE7O09BRitCLFVBQVUsQ0FBQyxXQURsQjtFQUFBLENBQTFCLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZWRpdG9yL3JvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkRWRpdG9yJywgKENhcmRFZGl0b3IpIC0+XG5cdGNsYXNzIENhcmRFZGl0b3IuUm91dGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5BcHBSb3V0ZXJcblxuXHRcdGxvZ2dlcjogb2ZmXG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsIC0+XG5cdFx0XHRcdGNvbnNvbGUuaW5mbyAnQ2FyZEVkaXRvciBSb3V0ZXI6JywgYXJndW1lbnRzIGlmIEBsb2dnZXIgaXMgb25cblxuXHRcdCMgYXBwUm91dGVzOiJdfQ==