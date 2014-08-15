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

      Controller.prototype.showHome = function() {
        var html;
        html = templatizer.welcome.welcomePage();
        return app.mainRegion.$el.html(html);
      };

      Controller.prototype.showCardsGenerator = function() {
        return app.mainRegion.show(new CardGenerator.CardsView);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9Db250cm9sbGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxlQUFaLEVBQTZCLFNBQUMsYUFBRCxHQUFBO1dBQ3RCLGFBQWEsQ0FBQztBQUNuQixtQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsMkJBQUEsT0FBQSxHQUFTLEtBQVQsQ0FBQTs7QUFBQSwyQkFFQSxVQUFBLEdBQVksU0FBQSxHQUFBO2VBQ1gsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWEsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7QUFDWixZQUFBLElBQXlCLEtBQUMsQ0FBQSxPQUFELEtBQVksSUFBckM7cUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaLEVBQUE7YUFEWTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWIsRUFEVztNQUFBLENBRlosQ0FBQTs7QUFBQSwyQkFPQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1QsWUFBQSxJQUFBO0FBQUEsUUFBQSxJQUFBLEdBQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFwQixDQUFBLENBQVAsQ0FBQTtlQUNBLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQW5CLENBQXdCLElBQXhCLEVBRlM7TUFBQSxDQVBWLENBQUE7O0FBQUEsMkJBV0Esa0JBQUEsR0FBb0IsU0FBQSxHQUFBO2VBQ25CLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBZixDQUFvQixHQUFBLENBQUEsYUFBaUIsQ0FBQyxTQUF0QyxFQURtQjtNQUFBLENBWHBCLENBQUE7O0FBQUEsMkJBY0EsUUFBQSxHQUFVLFNBQUEsR0FBQTtBQUNULFlBQUEsSUFBQTtBQUFBLFFBQUEsSUFBQSxHQUFPLFdBQVcsQ0FBQyxJQUFaLENBQUEsQ0FBUCxDQUFBO2VBQ0EsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBbkIsQ0FBd0IsSUFBeEIsRUFGUztNQUFBLENBZFYsQ0FBQTs7QUFBQSwyQkFrQkEsWUFBQSxHQUFjLFNBQUEsR0FBQTtBQUNiLFlBQUEsSUFBQTtBQUFBLFFBQUEsSUFBQSxHQUFPLFdBQVksQ0FBQSxLQUFBLENBQVosQ0FBQSxDQUFQLENBQUE7ZUFDQSxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFuQixDQUF3QixJQUF4QixFQUZhO01BQUEsQ0FsQmQsQ0FBQTs7d0JBQUE7O09BRHNDLFVBQVUsQ0FBQyxZQUR0QjtFQUFBLENBQTdCLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRzX2dlbmVyYXRvci9Db250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRHZW5lcmF0b3InLCAoQ2FyZEdlbmVyYXRvcikgLT5cblx0Y2xhc3MgQ2FyZEdlbmVyYXRvci5Db250cm9sbGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5Db250cm9sbGVyXG5cdFx0bG9nZ2luZzogb2ZmXG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsID0+XG5cdFx0XHRcdGNvbnNvbGUubG9nIGFyZ3VtZW50cyBpZiBAbG9nZ2luZyBpcyBvblx0XHRcdFxuXHRcdFx0IyBjb25zb2xlLmxvZyAnSW5pdGlhbGl6ZTogQ2FyZEdlbmVyYXRvciBDb250cm9sbGVyJ1xuXG5cdFx0c2hvd0hvbWU6IC0+XG5cdFx0XHRodG1sID0gdGVtcGxhdGl6ZXIud2VsY29tZS53ZWxjb21lUGFnZSgpXG5cdFx0XHRhcHAubWFpblJlZ2lvbi4kZWwuaHRtbCBodG1sXG5cdFx0XG5cdFx0c2hvd0NhcmRzR2VuZXJhdG9yOiAtPlxuXHRcdFx0YXBwLm1haW5SZWdpb24uc2hvdyBuZXcgQ2FyZEdlbmVyYXRvci5DYXJkc1ZpZXdcblxuXHRcdHNob3dQYWdlOiAtPlxuXHRcdFx0aHRtbCA9IHRlbXBsYXRpemVyLnBhZ2UoKVxuXHRcdFx0YXBwLm1haW5SZWdpb24uJGVsLmh0bWwgaHRtbFxuXHRcdFx0XG5cdFx0c2hvd05vdEZvdW5kOiAtPlxuXHRcdFx0aHRtbCA9IHRlbXBsYXRpemVyWyc0MDQnXSgpXG5cdFx0XHRhcHAubWFpblJlZ2lvbi4kZWwuaHRtbCBodG1sXG5cbiJdfQ==