(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardEditorLayout', function(CardEditorLayout) {
    return CardEditorLayout.Controller = (function(_super) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRFZGl0b3IvY29udHJvbGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBO21TQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksa0JBQVosRUFBZ0MsU0FBQyxnQkFBRCxHQUFBO1dBQ3pCLGdCQUFnQixDQUFDO0FBQ3RCLG1DQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSwyQkFBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLDJCQUVBLFVBQUEsR0FBWSxTQUFBLEdBQUE7ZUFDWCxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTtBQUNaLFlBQUEsSUFBeUIsS0FBQyxDQUFBLE9BQUQsS0FBWSxJQUFyQztxQkFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFNBQVosRUFBQTthQURZO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBYixFQURXO01BQUEsQ0FGWixDQUFBOzt3QkFBQTs7T0FEeUMsVUFBVSxDQUFDLFlBRHRCO0VBQUEsQ0FBaEMsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZEVkaXRvci9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRFZGl0b3JMYXlvdXQnLCAoQ2FyZEVkaXRvckxheW91dCkgLT5cblx0Y2xhc3MgQ2FyZEVkaXRvckxheW91dC5Db250cm9sbGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5Db250cm9sbGVyXG5cdFx0bG9nZ2luZzogb2ZmXG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsID0+XG5cdFx0XHRcdGNvbnNvbGUubG9nIGFyZ3VtZW50cyBpZiBAbG9nZ2luZyBpcyBvblx0XHRcdFxuXHRcdFx0IyBjb25zb2xlLmxvZyAnSW5pdGlhbGl6ZTogQ2FyZEVkaXRvckxheW91dCBDb250cm9sbGVyJ1xuXG4iXX0=