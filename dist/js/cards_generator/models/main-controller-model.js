(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator.models', function(Models) {
    return Models.mainControllerModel = (function(_super) {
      __extends(mainControllerModel, _super);

      function mainControllerModel() {
        return mainControllerModel.__super__.constructor.apply(this, arguments);
      }

      mainControllerModel.prototype.loger = false;

      mainControllerModel.prototype.defaults = {
        formStep: 1
      };

      mainControllerModel.prototype.initialize = function() {
        return this.bind('all', (function(_this) {
          return function(trigger, args) {
            if (_this.loger === true) {
              return console.info('MainControllerModel says :', trigger, args);
            }
          };
        })(this));
      };

      return mainControllerModel;

    })(Backbone.DeepModel);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9tb2RlbHMvbWFpbi1jb250cm9sbGVyLW1vZGVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxzQkFBWixFQUFvQyxTQUFDLE1BQUQsR0FBQTtXQUM3QixNQUFNLENBQUM7QUFDWiw0Q0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsb0NBQUEsS0FBQSxHQUFPLEtBQVAsQ0FBQTs7QUFBQSxvQ0FFQSxRQUFBLEdBQ0M7QUFBQSxRQUFBLFFBQUEsRUFBVyxDQUFYO09BSEQsQ0FBQTs7QUFBQSxvQ0FLQSxVQUFBLEdBQVksU0FBQSxHQUFBO2VBQ1gsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWEsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFDLE9BQUQsRUFBVSxJQUFWLEdBQUE7QUFDWixZQUFBLElBQUcsS0FBQyxDQUFBLEtBQUQsS0FBVSxJQUFiO3FCQUNDLE9BQU8sQ0FBQyxJQUFSLENBQWEsNEJBQWIsRUFBMEMsT0FBMUMsRUFBa0QsSUFBbEQsRUFERDthQURZO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBYixFQURXO01BQUEsQ0FMWixDQUFBOztpQ0FBQTs7T0FEd0MsUUFBUSxDQUFDLFdBRGY7RUFBQSxDQUFwQyxDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkc19nZW5lcmF0b3IvbW9kZWxzL21haW4tY29udHJvbGxlci1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yLm1vZGVscycsIChNb2RlbHMpIC0+XG5cdGNsYXNzIE1vZGVscy5tYWluQ29udHJvbGxlck1vZGVsIGV4dGVuZHMgQmFja2JvbmUuRGVlcE1vZGVsXG5cdFx0bG9nZXI6IG9mZlxuXG5cdFx0ZGVmYXVsdHM6XG5cdFx0XHRmb3JtU3RlcCA6IDFcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRAYmluZCAnYWxsJywgKHRyaWdnZXIsIGFyZ3MpID0+IFxuXHRcdFx0XHRpZiBAbG9nZXIgaXMgb25cblx0XHRcdFx0XHRjb25zb2xlLmluZm8gJ01haW5Db250cm9sbGVyTW9kZWwgc2F5cyA6Jyx0cmlnZ2VyLGFyZ3NcblxuIl19