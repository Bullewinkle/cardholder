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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL3N0ZXAtZm9ybS1jb250cm9sbGVyL3N0ZXAtZm9ybS1jb250cm9sbGVyLXZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLHdCQUFaLEVBQXNDLFNBQUMsUUFBRCxHQUFBO1dBQy9CLFFBQVEsQ0FBQztBQUNkLHFDQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSw2QkFBQSxLQUFBLEdBQU8sS0FBUCxDQUFBOztBQUFBLDZCQU1BLE9BQUEsR0FBUyxJQU5ULENBQUE7O0FBQUEsNkJBT0EsU0FBQSxHQUFXLG1DQVBYLENBQUE7OzBCQUFBOztPQURtQyxRQUFRLENBQUMsTUFEUjtFQUFBLENBQXRDLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZ2VuZXJhdG9yL3N0ZXAtZm9ybS1jb250cm9sbGVyL3N0ZXAtZm9ybS1jb250cm9sbGVyLXZpZXcuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvci5zdGVwRm9ybScsIChTdGVwRm9ybSkgLT5cblx0Y2xhc3MgU3RlcEZvcm0uU3RlcEZvcm1WaWV3IGV4dGVuZHMgQmFja2JvbmUuVmlld1xuXHRcdGxvZ2VyOiBvZmZcblxuXHRcdCMgdGVtcGxhdGU6IChtb2RlbCkgLT5cblx0XHQjIFx0dGVtcGxhdGl6ZXIuY2FyZEdlbmVyYXRvci5zdGVwRm9ybVxuXHRcdCMgXHRcdGRhdGE6IG1vZGVsXG5cdFx0XHRcdFxuXHRcdHRhZ05hbWU6ICdsaSdcblx0XHRjbGFzc05hbWU6ICdjYXJkIHN0ZXAtZm9ybS1jb250cm9sbGVyLXdyYXBwZXInXG5cblx0XHQiXX0=