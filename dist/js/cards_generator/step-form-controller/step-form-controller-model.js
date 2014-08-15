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
        formStep: 1
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9zdGVwLWZvcm0tY29udHJvbGxlci9zdGVwLWZvcm0tY29udHJvbGxlci1tb2RlbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBO21TQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksd0JBQVosRUFBc0MsU0FBQyxRQUFELEdBQUE7V0FDL0IsUUFBUSxDQUFDO0FBQ2Qsc0NBQUEsQ0FBQTs7OztPQUFBOztBQUFBLDhCQUFBLEtBQUEsR0FBTyxLQUFQLENBQUE7O0FBQUEsOEJBRUEsUUFBQSxHQUNDO0FBQUEsUUFBQSxRQUFBLEVBQVcsQ0FBWDtPQUhELENBQUE7O0FBQUEsOEJBS0EsVUFBQSxHQUFZLFNBQUEsR0FBQTtlQUNYLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixFQUFhLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQyxPQUFELEVBQVUsSUFBVixHQUFBO0FBQ1osWUFBQSxJQUFHLEtBQUMsQ0FBQSxLQUFELEtBQVUsSUFBYjtxQkFDQyxPQUFPLENBQUMsSUFBUixDQUFhLHNCQUFiLEVBQW9DLE9BQXBDLEVBQTRDLElBQTVDLEVBREQ7YUFEWTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWIsRUFEVztNQUFBLENBTFosQ0FBQTs7MkJBQUE7O09BRG9DLFFBQVEsQ0FBQyxXQURUO0VBQUEsQ0FBdEMsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZHNfZ2VuZXJhdG9yL3N0ZXAtZm9ybS1jb250cm9sbGVyL3N0ZXAtZm9ybS1jb250cm9sbGVyLW1vZGVsLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRHZW5lcmF0b3Iuc3RlcEZvcm0nLCAoU3RlcEZvcm0pIC0+XG5cdGNsYXNzIFN0ZXBGb3JtLlN0ZXBGb3JtTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5EZWVwTW9kZWxcblx0XHRsb2dlcjogb2ZmXG5cblx0XHRkZWZhdWx0czpcblx0XHRcdGZvcm1TdGVwIDogMVxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAodHJpZ2dlciwgYXJncykgPT4gXG5cdFx0XHRcdGlmIEBsb2dlciBpcyBvblxuXHRcdFx0XHRcdGNvbnNvbGUuaW5mbyAnU3RlcEZvcm1Nb2RlbCBzYXlzIDonLHRyaWdnZXIsYXJnc1xuXG4iXX0=