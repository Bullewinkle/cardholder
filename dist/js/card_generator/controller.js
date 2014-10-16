(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator', function(CardGenerator) {
    return CardGenerator.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.logging = false;

      Controller.prototype.initialize = function() {
        return this.bind('all', (function(_this) {
          return function() {
            if (_this.logging === true) {
              return console.log(arguments);
            }
          };
        })(this));
      };

      return Controller;

    })(Marionette.Controller);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL2NvbnRyb2xsZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLGVBQVosRUFBNkIsU0FBQyxhQUFELEdBQUE7V0FDdEIsYUFBYSxDQUFDO0FBQ25CLG1DQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSwyQkFBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLDJCQUVBLFVBQUEsR0FBWSxTQUFBLEdBQUE7ZUFDWCxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTtBQUNaLFlBQUEsSUFBeUIsS0FBQyxDQUFBLE9BQUQsS0FBWSxJQUFyQztxQkFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFNBQVosRUFBQTthQURZO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBYixFQURXO01BQUEsQ0FGWixDQUFBOzt3QkFBQTs7T0FEc0MsVUFBVSxDQUFDLFlBRHRCO0VBQUEsQ0FBN0IsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZF9nZW5lcmF0b3IvY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yJywgKENhcmRHZW5lcmF0b3IpIC0+XG5cdGNsYXNzIENhcmRHZW5lcmF0b3IuQ29udHJvbGxlciBleHRlbmRzIE1hcmlvbmV0dGUuQ29udHJvbGxlclxuXHRcdGxvZ2dpbmc6IG9mZlxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCA9PlxuXHRcdFx0XHRjb25zb2xlLmxvZyBhcmd1bWVudHMgaWYgQGxvZ2dpbmcgaXMgb25cdFx0XHRcblx0XHRcdCMgY29uc29sZS5sb2cgJ0luaXRpYWxpemU6IENhcmRHZW5lcmF0b3IgQ29udHJvbGxlcidcblxuIl19