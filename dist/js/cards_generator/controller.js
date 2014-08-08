(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator', function(CardGenerator) {
    return CardGenerator.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function() {
        return console.log('Init: Controller1');
      };

      Controller.prototype.index = function() {
        return console.log('Route to index');
      };

      Controller.prototype.any = function() {
        return console.log('Route to any');
      };

      return Controller;

    })(Marionette.Controller);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9jb250cm9sbGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxlQUFaLEVBQTZCLFNBQUMsYUFBRCxHQUFBO1dBRXRCLGFBQWEsQ0FBQztBQUVuQixtQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsMkJBQUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtlQUNYLE9BQU8sQ0FBQyxHQUFSLENBQVksbUJBQVosRUFEVztNQUFBLENBQVosQ0FBQTs7QUFBQSwyQkFFQSxLQUFBLEdBQU8sU0FBQSxHQUFBO2VBQ04sT0FBTyxDQUFDLEdBQVIsQ0FBWSxnQkFBWixFQURNO01BQUEsQ0FGUCxDQUFBOztBQUFBLDJCQUlBLEdBQUEsR0FBSyxTQUFBLEdBQUE7ZUFDSixPQUFPLENBQUMsR0FBUixDQUFZLGNBQVosRUFESTtNQUFBLENBSkwsQ0FBQTs7d0JBQUE7O09BRnNDLFVBQVUsQ0FBQyxZQUZ0QjtFQUFBLENBQTdCLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRzX2dlbmVyYXRvci9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRHZW5lcmF0b3InLCAoQ2FyZEdlbmVyYXRvcikgLT5cblxuXHRjbGFzcyBDYXJkR2VuZXJhdG9yLkNvbnRyb2xsZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbnRyb2xsZXJcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRjb25zb2xlLmxvZyAnSW5pdDogQ29udHJvbGxlcjEnXG5cdFx0aW5kZXg6IC0+XG5cdFx0XHRjb25zb2xlLmxvZyAnUm91dGUgdG8gaW5kZXgnXG5cdFx0YW55OiAtPlxuXHRcdFx0Y29uc29sZS5sb2cgJ1JvdXRlIHRvIGFueSdcblxuXHQjIEBhZGRJbml0aWFsaXplciAtPlxuXHQjIFx0Y29uc29sZS5sb2cgJ0luaXQ6IENvbnRyb2xsZXIyJywgQFxuXHQjIFx0IyBAY29udHJvbGxlciA9IG5ldyBAQ29udHJvbGxlcigpXG5cbiJdfQ==