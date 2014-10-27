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

      Controller.prototype.showCards = function() {
        return app.mainRegion.show(new app.Cards.CardsView());
      };

      Controller.prototype.showCardEditorLayout = function() {
        return app.mainRegion.show(new app.CardEditor.CardEditorLayout());
      };

      Controller.prototype.showPage = function() {
        var html;
        html = templatizer.pages.page();
        return app.mainRegion.$el.html(html);
      };

      Controller.prototype.showNotFound = function() {
        var html;
        html = templatizer.pages['404']();
        return app.mainRegion.$el.html(html);
      };

      return Controller;

    })(Marionette.Controller);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTttU0FBQTs7QUFBQSxFQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBWCxDQUFrQixRQUFsQixFQUE0QixTQUFDLE1BQUQsR0FBQTtXQUNyQixNQUFNLENBQUM7QUFDWixtQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsMkJBQUEsT0FBQSxHQUFTLEtBQVQsQ0FBQTs7QUFBQSwyQkFFQSxVQUFBLEdBQVksU0FBQSxHQUFBO2VBQ1gsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWEsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7QUFDWixZQUFBLElBQXlCLEtBQUMsQ0FBQSxPQUFELEtBQVksSUFBckM7cUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaLEVBQUE7YUFEWTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWIsRUFEVztNQUFBLENBRlosQ0FBQTs7QUFBQSwyQkFNQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1QsWUFBQSxJQUFBO0FBQUEsUUFBQSxJQUFBLEdBQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFwQixDQUFBLENBQVAsQ0FBQTtlQUNBLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQW5CLENBQXdCLElBQXhCLEVBRlM7TUFBQSxDQU5WLENBQUE7O0FBQUEsMkJBVUEsU0FBQSxHQUFXLFNBQUEsR0FBQTtlQUNWLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBZixDQUF3QixJQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBVixDQUFBLENBQXhCLEVBRFU7TUFBQSxDQVZYLENBQUE7O0FBQUEsMkJBYUEsb0JBQUEsR0FBc0IsU0FBQSxHQUFBO2VBQ3JCLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBZixDQUF3QixJQUFBLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWYsQ0FBQSxDQUF4QixFQURxQjtNQUFBLENBYnRCLENBQUE7O0FBQUEsMkJBZ0JBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDVCxZQUFBLElBQUE7QUFBQSxRQUFBLElBQUEsR0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQWxCLENBQUEsQ0FBUCxDQUFBO2VBQ0EsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBbkIsQ0FBd0IsSUFBeEIsRUFGUztNQUFBLENBaEJWLENBQUE7O0FBQUEsMkJBb0JBLFlBQUEsR0FBYyxTQUFBLEdBQUE7QUFDYixZQUFBLElBQUE7QUFBQSxRQUFBLElBQUEsR0FBTyxXQUFXLENBQUMsS0FBTSxDQUFBLEtBQUEsQ0FBbEIsQ0FBQSxDQUFQLENBQUE7ZUFDQSxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFuQixDQUF3QixJQUF4QixFQUZhO01BQUEsQ0FwQmQsQ0FBQTs7d0JBQUE7O09BRCtCLFVBQVUsQ0FBQyxZQURoQjtFQUFBLENBQTVCLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuYXBwLm1vZHVsZSAnQ29tbW9uJywgKENvbW1vbikgLT5cblx0Y2xhc3MgQ29tbW9uLkNvbnRyb2xsZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbnRyb2xsZXJcblx0XHRsb2dnaW5nOiBvZmZcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRAYmluZCAnYWxsJywgPT5cblx0XHRcdFx0Y29uc29sZS5sb2cgYXJndW1lbnRzIGlmIEBsb2dnaW5nIGlzIG9uXHRcdFx0XG5cblx0XHRzaG93SG9tZTogLT5cblx0XHRcdGh0bWwgPSB0ZW1wbGF0aXplci53ZWxjb21lLndlbGNvbWVQYWdlKClcblx0XHRcdGFwcC5tYWluUmVnaW9uLiRlbC5odG1sIGh0bWxcblx0XHRcblx0XHRzaG93Q2FyZHM6IC0+XG5cdFx0XHRhcHAubWFpblJlZ2lvbi5zaG93IG5ldyBhcHAuQ2FyZHMuQ2FyZHNWaWV3KClcblxuXHRcdHNob3dDYXJkRWRpdG9yTGF5b3V0OiAtPlxuXHRcdFx0YXBwLm1haW5SZWdpb24uc2hvdyBuZXcgYXBwLkNhcmRFZGl0b3IuQ2FyZEVkaXRvckxheW91dCgpXG5cblx0XHRzaG93UGFnZTogLT5cblx0XHRcdGh0bWwgPSB0ZW1wbGF0aXplci5wYWdlcy5wYWdlKClcblx0XHRcdGFwcC5tYWluUmVnaW9uLiRlbC5odG1sIGh0bWxcblx0XHRcdFxuXHRcdHNob3dOb3RGb3VuZDogLT5cblx0XHRcdGh0bWwgPSB0ZW1wbGF0aXplci5wYWdlc1snNDA0J10oKVxuXHRcdFx0YXBwLm1haW5SZWdpb24uJGVsLmh0bWwgaHRtbFxuXG4iXX0=