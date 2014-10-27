(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('Cards.stepForm', function(StepForm) {
    return StepForm.StepFormView = (function(_super) {
      __extends(StepFormView, _super);

      function StepFormView() {
        return StepFormView.__super__.constructor.apply(this, arguments);
      }

      StepFormView.prototype.loger = false;

      StepFormView.prototype.tagName = 'li';

      StepFormView.prototype.className = 'card step-form-controller-wrapper';

      return StepFormView;

    })(Backbone.View);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzL3N0ZXAtZm9ybS1jb250cm9sbGVyL3N0ZXAtZm9ybS1jb250cm9sbGVyLXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLGdCQUFaLEVBQThCLFNBQUMsUUFBRCxHQUFBO1dBQ3ZCLFFBQVEsQ0FBQztBQUNkLHFDQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSw2QkFBQSxLQUFBLEdBQU8sS0FBUCxDQUFBOztBQUFBLDZCQU1BLE9BQUEsR0FBUyxJQU5ULENBQUE7O0FBQUEsNkJBT0EsU0FBQSxHQUFXLG1DQVBYLENBQUE7OzBCQUFBOztPQURtQyxRQUFRLENBQUMsTUFEaEI7RUFBQSxDQUE5QixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkcy9zdGVwLWZvcm0tY29udHJvbGxlci9zdGVwLWZvcm0tY29udHJvbGxlci12aWV3LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRzLnN0ZXBGb3JtJywgKFN0ZXBGb3JtKSAtPlxuXHRjbGFzcyBTdGVwRm9ybS5TdGVwRm9ybVZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cdFx0bG9nZXI6IG9mZlxuXG5cdFx0IyB0ZW1wbGF0ZTogKG1vZGVsKSAtPlxuXHRcdCMgXHR0ZW1wbGF0aXplci5jYXJkcy5zdGVwRm9ybVxuXHRcdCMgXHRcdGRhdGE6IG1vZGVsXG5cdFx0XHRcdFxuXHRcdHRhZ05hbWU6ICdsaSdcblx0XHRjbGFzc05hbWU6ICdjYXJkIHN0ZXAtZm9ybS1jb250cm9sbGVyLXdyYXBwZXInXG5cblx0XHQiXX0=