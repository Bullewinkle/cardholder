(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardEditor', function(CardEditor) {
    return CardEditor.Controller = (function(_super) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRFZGl0b3IvY29udHJvbGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBO21TQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksWUFBWixFQUEwQixTQUFDLFVBQUQsR0FBQTtXQUNuQixVQUFVLENBQUM7QUFDaEIsbUNBQUEsQ0FBQTs7OztPQUFBOztBQUFBLDJCQUFBLE9BQUEsR0FBUyxLQUFULENBQUE7O0FBQUEsMkJBRUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtlQUNYLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixFQUFhLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO0FBQ1osWUFBQSxJQUF5QixLQUFDLENBQUEsT0FBRCxLQUFZLElBQXJDO3FCQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksU0FBWixFQUFBO2FBRFk7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFiLEVBRFc7TUFBQSxDQUZaLENBQUE7O3dCQUFBOztPQURtQyxVQUFVLENBQUMsWUFEdEI7RUFBQSxDQUExQixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkRWRpdG9yL2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEVkaXRvcicsIChDYXJkRWRpdG9yKSAtPlxuXHRjbGFzcyBDYXJkRWRpdG9yLkNvbnRyb2xsZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbnRyb2xsZXJcblx0XHRsb2dnaW5nOiBvZmZcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRAYmluZCAnYWxsJywgPT5cblx0XHRcdFx0Y29uc29sZS5sb2cgYXJndW1lbnRzIGlmIEBsb2dnaW5nIGlzIG9uXHRcdFx0XG5cdFx0XHQjIGNvbnNvbGUubG9nICdJbml0aWFsaXplOiBDYXJkRWRpdG9yIENvbnRyb2xsZXInXG5cbiJdfQ==