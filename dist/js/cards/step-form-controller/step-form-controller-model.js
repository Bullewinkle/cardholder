(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('Cards.stepForm', function(StepForm) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzL3N0ZXAtZm9ybS1jb250cm9sbGVyL3N0ZXAtZm9ybS1jb250cm9sbGVyLW1vZGVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxnQkFBWixFQUE4QixTQUFDLFFBQUQsR0FBQTtXQUN2QixRQUFRLENBQUM7QUFDZCxzQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsOEJBQUEsS0FBQSxHQUFPLEtBQVAsQ0FBQTs7QUFBQSw4QkFFQSxRQUFBLEdBQ0M7QUFBQSxRQUFBLFdBQUEsRUFBYyxDQUFkO09BSEQsQ0FBQTs7QUFBQSw4QkFLQSxVQUFBLEdBQVksU0FBQSxHQUFBO2VBQ1gsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWEsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFDLE9BQUQsRUFBVSxJQUFWLEdBQUE7QUFDWixZQUFBLElBQUcsS0FBQyxDQUFBLEtBQUQsS0FBVSxJQUFiO3FCQUNDLE9BQU8sQ0FBQyxJQUFSLENBQWEsc0JBQWIsRUFBb0MsT0FBcEMsRUFBNEMsSUFBNUMsRUFERDthQURZO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBYixFQURXO01BQUEsQ0FMWixDQUFBOzsyQkFBQTs7T0FEb0MsUUFBUSxDQUFDLFdBRGpCO0VBQUEsQ0FBOUIsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZHMvc3RlcC1mb3JtLWNvbnRyb2xsZXIvc3RlcC1mb3JtLWNvbnRyb2xsZXItbW9kZWwuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZHMuc3RlcEZvcm0nLCAoU3RlcEZvcm0pIC0+XG5cdGNsYXNzIFN0ZXBGb3JtLlN0ZXBGb3JtTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5EZWVwTW9kZWxcblx0XHRsb2dlcjogb2ZmXG5cblx0XHRkZWZhdWx0czpcblx0XHRcdGN1cnJlbnRTdGVwIDogMVxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAodHJpZ2dlciwgYXJncykgPT4gXG5cdFx0XHRcdGlmIEBsb2dlciBpcyBvblxuXHRcdFx0XHRcdGNvbnNvbGUuaW5mbyAnU3RlcEZvcm1Nb2RlbCBzYXlzIDonLHRyaWdnZXIsYXJnc1xuXG4iXX0=