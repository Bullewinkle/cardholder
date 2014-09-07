(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.module('CardEditor.views', function(views) {
    var LayerCollection, LayerModel;
    LayerModel = (function(_super) {
      __extends(LayerModel, _super);

      function LayerModel() {
        return LayerModel.__super__.constructor.apply(this, arguments);
      }

      return LayerModel;

    })(Backbone.Model);
    LayerCollection = (function(_super) {
      __extends(LayerCollection, _super);

      function LayerCollection() {
        return LayerCollection.__super__.constructor.apply(this, arguments);
      }

      LayerCollection.prototype.model = LayerModel;

      return LayerCollection;

    })(Backbone.Collection);
    return views.LayersPanel = (function(_super) {
      __extends(LayersPanel, _super);

      function LayersPanel() {
        return LayersPanel.__super__.constructor.apply(this, arguments);
      }

      LayersPanel.prototype.logging = false;

      LayersPanel.prototype.className = 'row layers';

      LayersPanel.prototype.childView = views.Layer;

      LayersPanel.prototype.initialize = function() {
        this.bind('all', function() {
          if (this.logging === true) {
            return console.log("LAYERS PANEL VIEW:\t", arguments);
          }
        });
        this.model = new Backbone.Model;
        this.collection = new LayerCollection();
        return this.state.set('templateOptions', {
          title: 'Слои',
          addButtonText: 'Добавить слой',
          removeButtonText: 'Удалить слой'
        });
      };

      return LayersPanel;

    })(views.BaseToolbarPanelView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyc1BhbmVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7bVNBQUE7O0FBQUEsRUFBQSxHQUFHLENBQUMsTUFBSixDQUFXLGtCQUFYLEVBQStCLFNBQUMsS0FBRCxHQUFBO0FBRTlCLFFBQUEsMkJBQUE7QUFBQSxJQUFNO0FBQU4sbUNBQUEsQ0FBQTs7OztPQUFBOzt3QkFBQTs7T0FBeUIsUUFBUSxDQUFDLE1BQWxDLENBQUE7QUFBQSxJQUVNO0FBQ0wsd0NBQUEsQ0FBQTs7OztPQUFBOztBQUFBLGdDQUFBLEtBQUEsR0FBTyxVQUFQLENBQUE7OzZCQUFBOztPQUQ2QixRQUFRLENBQUMsV0FGdkMsQ0FBQTtXQUtNLEtBQUssQ0FBQztBQUNYLG9DQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSw0QkFBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLDRCQUVBLFNBQUEsR0FBVyxZQUZYLENBQUE7O0FBQUEsNEJBSUEsU0FBQSxHQUFXLEtBQUssQ0FBQyxLQUpqQixDQUFBOztBQUFBLDRCQVNBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFBLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixFQUFhLFNBQUEsR0FBQTtBQUNaLFVBQUEsSUFBaUQsSUFBQyxDQUFBLE9BQUQsS0FBWSxJQUE3RDttQkFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHNCQUFaLEVBQW9DLFNBQXBDLEVBQUE7V0FEWTtRQUFBLENBQWIsQ0FBQSxDQUFBO0FBQUEsUUFHQSxJQUFDLENBQUEsS0FBRCxHQUFTLEdBQUEsQ0FBQSxRQUFZLENBQUMsS0FIdEIsQ0FBQTtBQUFBLFFBSUEsSUFBQyxDQUFBLFVBQUQsR0FBa0IsSUFBQSxlQUFBLENBQUEsQ0FKbEIsQ0FBQTtlQU1BLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLGlCQUFYLEVBQ0M7QUFBQSxVQUFBLEtBQUEsRUFBTyxNQUFQO0FBQUEsVUFDQSxhQUFBLEVBQWUsZUFEZjtBQUFBLFVBRUEsZ0JBQUEsRUFBa0IsY0FGbEI7U0FERCxFQVBXO01BQUEsQ0FUWixDQUFBOzt5QkFBQTs7T0FEK0IsS0FBSyxDQUFDLHNCQVBSO0VBQUEsQ0FBL0IsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZF9lZGl0b3Ivdmlld3MvbGF5ZXJzUGFuZWwuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJhcHAubW9kdWxlICdDYXJkRWRpdG9yLnZpZXdzJywgKHZpZXdzKSAtPlxuXG5cdGNsYXNzIExheWVyTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXG5cdGNsYXNzIExheWVyQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cblx0XHRtb2RlbDogTGF5ZXJNb2RlbFx0XG5cdFxuXHRjbGFzcyB2aWV3cy5MYXllcnNQYW5lbCBleHRlbmRzIHZpZXdzLkJhc2VUb29sYmFyUGFuZWxWaWV3XG5cdFx0bG9nZ2luZzogb2ZmXG5cblx0XHRjbGFzc05hbWU6ICdyb3cgbGF5ZXJzJ1xuXG5cdFx0Y2hpbGRWaWV3OiB2aWV3cy5MYXllclxuXG5cdFx0IyB1aTpcblx0XHQjIGV2ZW50czpcblxuXHRcdGluaXRpYWxpemU6IC0+XHRcblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkxBWUVSUyBQQU5FTCBWSUVXOlxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dpbmcgaXMgb25cblxuXHRcdFx0QG1vZGVsID0gbmV3IEJhY2tib25lLk1vZGVsXG5cdFx0XHRAY29sbGVjdGlvbiA9IG5ldyBMYXllckNvbGxlY3Rpb24oKVxuXG5cdFx0XHRAc3RhdGUuc2V0ICd0ZW1wbGF0ZU9wdGlvbnMnLFxuXHRcdFx0XHR0aXRsZTogJ9Ch0LvQvtC4J1xuXHRcdFx0XHRhZGRCdXR0b25UZXh0OiAn0JTQvtCx0LDQstC40YLRjCDRgdC70L7QuSdcblx0XHRcdFx0cmVtb3ZlQnV0dG9uVGV4dDogJ9Cj0LTQsNC70LjRgtGMINGB0LvQvtC5J1xuIl19