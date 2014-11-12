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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzL21vZGVscy9zdGVwLWZvcm0tY29udHJvbGxlci1tb2RlbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBO21TQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksZ0JBQVosRUFBOEIsU0FBQyxRQUFELEdBQUE7V0FDdkIsUUFBUSxDQUFDO0FBQ2Qsc0NBQUEsQ0FBQTs7OztPQUFBOztBQUFBLDhCQUFBLEtBQUEsR0FBTyxLQUFQLENBQUE7O0FBQUEsOEJBRUEsUUFBQSxHQUNDO0FBQUEsUUFBQSxXQUFBLEVBQWMsQ0FBZDtPQUhELENBQUE7O0FBQUEsOEJBS0EsVUFBQSxHQUFZLFNBQUEsR0FBQTtlQUNYLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixFQUFhLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQyxPQUFELEVBQVUsSUFBVixHQUFBO0FBQ1osWUFBQSxJQUFHLEtBQUMsQ0FBQSxLQUFELEtBQVUsSUFBYjtxQkFDQyxPQUFPLENBQUMsSUFBUixDQUFhLHNCQUFiLEVBQW9DLE9BQXBDLEVBQTRDLElBQTVDLEVBREQ7YUFEWTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWIsRUFEVztNQUFBLENBTFosQ0FBQTs7MkJBQUE7O09BRG9DLFFBQVEsQ0FBQyxXQURqQjtFQUFBLENBQTlCLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRzL21vZGVscy9zdGVwLWZvcm0tY29udHJvbGxlci1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkcy5zdGVwRm9ybScsIChTdGVwRm9ybSkgLT5cblx0Y2xhc3MgU3RlcEZvcm0uU3RlcEZvcm1Nb2RlbCBleHRlbmRzIEJhY2tib25lLkRlZXBNb2RlbFxuXHRcdGxvZ2VyOiBvZmZcblxuXHRcdGRlZmF1bHRzOlxuXHRcdFx0Y3VycmVudFN0ZXAgOiAxXG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsICh0cmlnZ2VyLCBhcmdzKSA9PiBcblx0XHRcdFx0aWYgQGxvZ2VyIGlzIG9uXG5cdFx0XHRcdFx0Y29uc29sZS5pbmZvICdTdGVwRm9ybU1vZGVsIHNheXMgOicsdHJpZ2dlcixhcmdzXG5cbiJdfQ==