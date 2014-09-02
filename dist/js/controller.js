(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app.module('Common', function(Common) {
    return Common.Controller = (function(_super) {
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

      Controller.prototype.showHome = function() {
        var html;
        html = templatizer.welcome.welcomePage();
        return app.mainRegion.$el.html(html);
      };

      Controller.prototype.showCardGenerator = function() {
        return app.mainRegion.show(new app.CardGenerator.CardsView);
      };

      Controller.prototype.showCardEditor = function() {
        return app.mainRegion.show(new app.CardEditor.CardEditorView);
      };

      Controller.prototype.showPage = function() {
        var html;
        html = templatizer.page();
        return app.mainRegion.$el.html(html);
      };

      Controller.prototype.showNotFound = function() {
        var html;
        html = templatizer['404']();
        return app.mainRegion.$el.html(html);
      };

      return Controller;

    })(Marionette.Controller);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTttU0FBQTs7QUFBQSxFQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBWCxDQUFrQixRQUFsQixFQUE0QixTQUFDLE1BQUQsR0FBQTtXQUNyQixNQUFNLENBQUM7QUFDWixtQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsMkJBQUEsT0FBQSxHQUFTLEtBQVQsQ0FBQTs7QUFBQSwyQkFFQSxVQUFBLEdBQVksU0FBQSxHQUFBO2VBQ1gsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWEsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7QUFDWixZQUFBLElBQXlCLEtBQUMsQ0FBQSxPQUFELEtBQVksSUFBckM7cUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaLEVBQUE7YUFEWTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWIsRUFEVztNQUFBLENBRlosQ0FBQTs7QUFBQSwyQkFNQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1QsWUFBQSxJQUFBO0FBQUEsUUFBQSxJQUFBLEdBQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFwQixDQUFBLENBQVAsQ0FBQTtlQUNBLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQW5CLENBQXdCLElBQXhCLEVBRlM7TUFBQSxDQU5WLENBQUE7O0FBQUEsMkJBVUEsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO2VBQ2xCLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBZixDQUFvQixHQUFBLENBQUEsR0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUExQyxFQURrQjtNQUFBLENBVm5CLENBQUE7O0FBQUEsMkJBYUEsY0FBQSxHQUFnQixTQUFBLEdBQUE7ZUFDZixHQUFHLENBQUMsVUFBVSxDQUFDLElBQWYsQ0FBb0IsR0FBQSxDQUFBLEdBQU8sQ0FBQyxVQUFVLENBQUMsY0FBdkMsRUFEZTtNQUFBLENBYmhCLENBQUE7O0FBQUEsMkJBZ0JBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDVCxZQUFBLElBQUE7QUFBQSxRQUFBLElBQUEsR0FBTyxXQUFXLENBQUMsSUFBWixDQUFBLENBQVAsQ0FBQTtlQUNBLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQW5CLENBQXdCLElBQXhCLEVBRlM7TUFBQSxDQWhCVixDQUFBOztBQUFBLDJCQW9CQSxZQUFBLEdBQWMsU0FBQSxHQUFBO0FBQ2IsWUFBQSxJQUFBO0FBQUEsUUFBQSxJQUFBLEdBQU8sV0FBWSxDQUFBLEtBQUEsQ0FBWixDQUFBLENBQVAsQ0FBQTtlQUNBLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQW5CLENBQXdCLElBQXhCLEVBRmE7TUFBQSxDQXBCZCxDQUFBOzt3QkFBQTs7T0FEK0IsVUFBVSxDQUFDLFlBRGhCO0VBQUEsQ0FBNUIsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5hcHAubW9kdWxlICdDb21tb24nLCAoQ29tbW9uKSAtPlxuXHRjbGFzcyBDb21tb24uQ29udHJvbGxlciBleHRlbmRzIE1hcmlvbmV0dGUuQ29udHJvbGxlclxuXHRcdGxvZ2dpbmc6IG9mZlxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCA9PlxuXHRcdFx0XHRjb25zb2xlLmxvZyBhcmd1bWVudHMgaWYgQGxvZ2dpbmcgaXMgb25cdFx0XHRcblxuXHRcdHNob3dIb21lOiAtPlxuXHRcdFx0aHRtbCA9IHRlbXBsYXRpemVyLndlbGNvbWUud2VsY29tZVBhZ2UoKVxuXHRcdFx0YXBwLm1haW5SZWdpb24uJGVsLmh0bWwgaHRtbFxuXHRcdFxuXHRcdHNob3dDYXJkR2VuZXJhdG9yOiAtPlxuXHRcdFx0YXBwLm1haW5SZWdpb24uc2hvdyBuZXcgYXBwLkNhcmRHZW5lcmF0b3IuQ2FyZHNWaWV3XG5cblx0XHRzaG93Q2FyZEVkaXRvcjogLT5cblx0XHRcdGFwcC5tYWluUmVnaW9uLnNob3cgbmV3IGFwcC5DYXJkRWRpdG9yLkNhcmRFZGl0b3JWaWV3XG5cblx0XHRzaG93UGFnZTogLT5cblx0XHRcdGh0bWwgPSB0ZW1wbGF0aXplci5wYWdlKClcblx0XHRcdGFwcC5tYWluUmVnaW9uLiRlbC5odG1sIGh0bWxcblx0XHRcdFxuXHRcdHNob3dOb3RGb3VuZDogLT5cblx0XHRcdGh0bWwgPSB0ZW1wbGF0aXplclsnNDA0J10oKVxuXHRcdFx0YXBwLm1haW5SZWdpb24uJGVsLmh0bWwgaHRtbFxuXG4iXX0=