(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator.stepForm', function(StepForm) {
    return StepForm.StepFormModel = (function(_super) {
      __extends(StepFormModel, _super);

      function StepFormModel() {
        return StepFormModel.__super__.constructor.apply(this, arguments);
      }

      StepFormModel.prototype.loger = false;

      StepFormModel.prototype.defaults = {
        currentStep: 1
      };

      StepFormModel.prototype.initialize = function() {
        return this.bind('all', (function(_this) {
          return function(trigger, args) {
            if (_this.loger === true) {
              return console.info('StepFormModel says :', trigger, args);
            }
          };
        })(this));
      };

      return StepFormModel;

    })(Backbone.DeepModel);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL3N0ZXAtZm9ybS1jb250cm9sbGVyL3N0ZXAtZm9ybS1jb250cm9sbGVyLW1vZGVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSx3QkFBWixFQUFzQyxTQUFDLFFBQUQsR0FBQTtXQUMvQixRQUFRLENBQUM7QUFDZCxzQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsOEJBQUEsS0FBQSxHQUFPLEtBQVAsQ0FBQTs7QUFBQSw4QkFFQSxRQUFBLEdBQ0M7QUFBQSxRQUFBLFdBQUEsRUFBYyxDQUFkO09BSEQsQ0FBQTs7QUFBQSw4QkFLQSxVQUFBLEdBQVksU0FBQSxHQUFBO2VBQ1gsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWEsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFDLE9BQUQsRUFBVSxJQUFWLEdBQUE7QUFDWixZQUFBLElBQUcsS0FBQyxDQUFBLEtBQUQsS0FBVSxJQUFiO3FCQUNDLE9BQU8sQ0FBQyxJQUFSLENBQWEsc0JBQWIsRUFBb0MsT0FBcEMsRUFBNEMsSUFBNUMsRUFERDthQURZO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBYixFQURXO01BQUEsQ0FMWixDQUFBOzsyQkFBQTs7T0FEb0MsUUFBUSxDQUFDLFdBRFQ7RUFBQSxDQUF0QyxDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkX2dlbmVyYXRvci9zdGVwLWZvcm0tY29udHJvbGxlci9zdGVwLWZvcm0tY29udHJvbGxlci1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yLnN0ZXBGb3JtJywgKFN0ZXBGb3JtKSAtPlxuXHRjbGFzcyBTdGVwRm9ybS5TdGVwRm9ybU1vZGVsIGV4dGVuZHMgQmFja2JvbmUuRGVlcE1vZGVsXG5cdFx0bG9nZXI6IG9mZlxuXG5cdFx0ZGVmYXVsdHM6XG5cdFx0XHRjdXJyZW50U3RlcCA6IDFcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRAYmluZCAnYWxsJywgKHRyaWdnZXIsIGFyZ3MpID0+IFxuXHRcdFx0XHRpZiBAbG9nZXIgaXMgb25cblx0XHRcdFx0XHRjb25zb2xlLmluZm8gJ1N0ZXBGb3JtTW9kZWwgc2F5cyA6Jyx0cmlnZ2VyLGFyZ3NcblxuIl19