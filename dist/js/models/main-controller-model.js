(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.App.MainControllerModel = App.MainControllerModel = (function(_super) {
    __extends(MainControllerModel, _super);

    function MainControllerModel() {
      return MainControllerModel.__super__.constructor.apply(this, arguments);
    }

    MainControllerModel.prototype.loger = false;

    MainControllerModel.prototype.defaults = {
      formStep: 1
    };

    MainControllerModel.prototype.initialize = function() {
      return this.bind('all', (function(_this) {
        return function(trigger, args) {
          if (_this.loger === true) {
            return console.info('MainControllerModel says :', trigger, args);
          }
        };
      })(this));
    };

    return MainControllerModel;

  })(Backbone.DeepModel);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzL21haW4tY29udHJvbGxlci1tb2RlbC5qcyIsInNvdXJjZXMiOlsibWFpbi1jb250cm9sbGVyLW1vZGVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLG1CQUFMLEdBQWlDLEdBQUcsQ0FBQztBQUNwQywwQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsa0NBQUEsS0FBQSxHQUFPLEtBQVAsQ0FBQTs7QUFBQSxrQ0FFQSxRQUFBLEdBQ0M7QUFBQSxNQUFBLFFBQUEsRUFBVyxDQUFYO0tBSEQsQ0FBQTs7QUFBQSxrQ0FLQSxVQUFBLEdBQVksU0FBQSxHQUFBO2FBQ1gsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWEsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsT0FBRCxFQUFVLElBQVYsR0FBQTtBQUNaLFVBQUEsSUFBRyxLQUFDLENBQUEsS0FBRCxLQUFVLElBQWI7bUJBQ0MsT0FBTyxDQUFDLElBQVIsQ0FBYSw0QkFBYixFQUEwQyxPQUExQyxFQUFrRCxJQUFsRCxFQUREO1dBRFk7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFiLEVBRFc7SUFBQSxDQUxaLENBQUE7OytCQUFBOztLQURnRSxRQUFRLENBQUMsVUFBMUUsQ0FBQTtBQUFBIiwic291cmNlc0NvbnRlbnQiOltudWxsXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=