(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.module('CardEditor.views', function(views) {
    var LayerChildCollection, LayerChildModel;
    LayerChildModel = (function(_super) {
      __extends(LayerChildModel, _super);

      function LayerChildModel() {
        return LayerChildModel.__super__.constructor.apply(this, arguments);
      }

      return LayerChildModel;

    })(Backbone.Model);
    LayerChildCollection = (function(_super) {
      __extends(LayerChildCollection, _super);

      function LayerChildCollection() {
        return LayerChildCollection.__super__.constructor.apply(this, arguments);
      }

      LayerChildCollection.prototype.model = LayerChildModel;

      return LayerChildCollection;

    })(Backbone.Collection);
    return views.LayerChildsPanel = (function(_super) {
      __extends(LayerChildsPanel, _super);

      function LayerChildsPanel() {
        return LayerChildsPanel.__super__.constructor.apply(this, arguments);
      }

      LayerChildsPanel.prototype.logging = false;

      LayerChildsPanel.prototype.className = 'row layer-childs';

      LayerChildsPanel.prototype.childView = views.LayerChild;

      LayerChildsPanel.prototype.initialize = function() {
        this.bind('all', function() {
          if (this.logging === true) {
            return console.log("LAYER CHILDS PANEL VIEW:\t", arguments);
          }
        });
        this.model = new Backbone.Model();
        this.collection = new LayerChildCollection();
        return this.state.set('templateOptions', {
          title: 'Фигуры',
          addButtonText: 'Добавить фигуру',
          removeButtonText: 'Удалить фигуру'
        });
      };

      return LayerChildsPanel;

    })(views.BaseToolbarPanelView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyQ2hpbGRzUGFuZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTttU0FBQTs7QUFBQSxFQUFBLEdBQUcsQ0FBQyxNQUFKLENBQVcsa0JBQVgsRUFBK0IsU0FBQyxLQUFELEdBQUE7QUFFOUIsUUFBQSxxQ0FBQTtBQUFBLElBQU07QUFBTix3Q0FBQSxDQUFBOzs7O09BQUE7OzZCQUFBOztPQUE4QixRQUFRLENBQUMsTUFBdkMsQ0FBQTtBQUFBLElBRU07QUFDTCw2Q0FBQSxDQUFBOzs7O09BQUE7O0FBQUEscUNBQUEsS0FBQSxHQUFPLGVBQVAsQ0FBQTs7a0NBQUE7O09BRGtDLFFBQVEsQ0FBQyxXQUY1QyxDQUFBO1dBS00sS0FBSyxDQUFDO0FBQ1gseUNBQUEsQ0FBQTs7OztPQUFBOztBQUFBLGlDQUFBLE9BQUEsR0FBUyxLQUFULENBQUE7O0FBQUEsaUNBRUEsU0FBQSxHQUFXLGtCQUZYLENBQUE7O0FBQUEsaUNBSUEsU0FBQSxHQUFXLEtBQUssQ0FBQyxVQUpqQixDQUFBOztBQUFBLGlDQVNBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFBLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixFQUFhLFNBQUEsR0FBQTtBQUNaLFVBQUEsSUFBdUQsSUFBQyxDQUFBLE9BQUQsS0FBWSxJQUFuRTttQkFBQSxPQUFPLENBQUMsR0FBUixDQUFZLDRCQUFaLEVBQTBDLFNBQTFDLEVBQUE7V0FEWTtRQUFBLENBQWIsQ0FBQSxDQUFBO0FBQUEsUUFHQSxJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsUUFBUSxDQUFDLEtBQVQsQ0FBQSxDQUhiLENBQUE7QUFBQSxRQUlBLElBQUMsQ0FBQSxVQUFELEdBQWtCLElBQUEsb0JBQUEsQ0FBQSxDQUpsQixDQUFBO2VBTUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsaUJBQVgsRUFDQztBQUFBLFVBQUEsS0FBQSxFQUFPLFFBQVA7QUFBQSxVQUNBLGFBQUEsRUFBZSxpQkFEZjtBQUFBLFVBRUEsZ0JBQUEsRUFBa0IsZ0JBRmxCO1NBREQsRUFQVztNQUFBLENBVFosQ0FBQTs7OEJBQUE7O09BRG9DLEtBQUssQ0FBQyxzQkFQYjtFQUFBLENBQS9CLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyQ2hpbGRzUGFuZWwuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJhcHAubW9kdWxlICdDYXJkRWRpdG9yLnZpZXdzJywgKHZpZXdzKSAtPlxuXG5cdGNsYXNzIExheWVyQ2hpbGRNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cblx0Y2xhc3MgTGF5ZXJDaGlsZENvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uXG5cdFx0bW9kZWw6IExheWVyQ2hpbGRNb2RlbFxuXHRcblx0Y2xhc3Mgdmlld3MuTGF5ZXJDaGlsZHNQYW5lbCBleHRlbmRzIHZpZXdzLkJhc2VUb29sYmFyUGFuZWxWaWV3XG5cdFx0bG9nZ2luZzogb2ZmXG5cblx0XHRjbGFzc05hbWU6ICdyb3cgbGF5ZXItY2hpbGRzJ1xuXG5cdFx0Y2hpbGRWaWV3OiB2aWV3cy5MYXllckNoaWxkXG5cblx0XHQjIHVpOlxuXHRcdCMgZXZlbnRzOlxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkxBWUVSIENISUxEUyBQQU5FTCBWSUVXOlxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dpbmcgaXMgb25cblxuXHRcdFx0QG1vZGVsID0gbmV3IEJhY2tib25lLk1vZGVsKClcblx0XHRcdEBjb2xsZWN0aW9uID0gbmV3IExheWVyQ2hpbGRDb2xsZWN0aW9uKClcblxuXHRcdFx0QHN0YXRlLnNldCAndGVtcGxhdGVPcHRpb25zJyxcblx0XHRcdFx0dGl0bGU6ICfQpNC40LPRg9GA0YsnXG5cdFx0XHRcdGFkZEJ1dHRvblRleHQ6ICfQlNC+0LHQsNCy0LjRgtGMINGE0LjQs9GD0YDRgydcblx0XHRcdFx0cmVtb3ZlQnV0dG9uVGV4dDogJ9Cj0LTQsNC70LjRgtGMINGE0LjQs9GD0YDRgyciXX0=