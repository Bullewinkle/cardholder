(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator.stepForm', function(StepForm) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9zdGVwLWZvcm0tY29udHJvbGxlci9zdGVwLWZvcm0tY29udHJvbGxlci12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSx3QkFBWixFQUFzQyxTQUFDLFFBQUQsR0FBQTtXQUMvQixRQUFRLENBQUM7QUFDZCxxQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsNkJBQUEsS0FBQSxHQUFPLEtBQVAsQ0FBQTs7QUFBQSw2QkFNQSxPQUFBLEdBQVMsSUFOVCxDQUFBOztBQUFBLDZCQU9BLFNBQUEsR0FBVyxtQ0FQWCxDQUFBOzswQkFBQTs7T0FEbUMsUUFBUSxDQUFDLE1BRFI7RUFBQSxDQUF0QyxDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkc19nZW5lcmF0b3Ivc3RlcC1mb3JtLWNvbnRyb2xsZXIvc3RlcC1mb3JtLWNvbnRyb2xsZXItdmlldy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yLnN0ZXBGb3JtJywgKFN0ZXBGb3JtKSAtPlxuXHRjbGFzcyBTdGVwRm9ybS5TdGVwRm9ybVZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cdFx0bG9nZXI6IG9mZlxuXG5cdFx0IyB0ZW1wbGF0ZTogKG1vZGVsKSAtPlxuXHRcdCMgXHR0ZW1wbGF0aXplci5jYXJkc0dlbmVyYXRvci5zdGVwRm9ybVxuXHRcdCMgXHRcdGRhdGE6IG1vZGVsXG5cdFx0XHRcdFxuXHRcdHRhZ05hbWU6ICdsaSdcblx0XHRjbGFzc05hbWU6ICdjYXJkIHN0ZXAtZm9ybS1jb250cm9sbGVyLXdyYXBwZXInXG5cblx0XHQiXX0=