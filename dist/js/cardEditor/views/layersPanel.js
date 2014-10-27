(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.module('CardEditor.views', function(views, app) {
    return views.LayersPanel = (function(_super) {
      __extends(LayersPanel, _super);

      function LayersPanel() {
        this.onRemoveChild = __bind(this.onRemoveChild, this);
        this.onAddChild = __bind(this.onAddChild, this);
        this.onRemoveChildCkicked = __bind(this.onRemoveChildCkicked, this);
        this.onAddChildClicked = __bind(this.onAddChildClicked, this);
        return LayersPanel.__super__.constructor.apply(this, arguments);
      }

      LayersPanel.prototype.logging = false;

      LayersPanel.prototype.className = 'layers';

      LayersPanel.prototype.childView = views.Layer;

      LayersPanel.prototype.initialize = function() {
        LayersPanel.__super__.initialize.apply(this, arguments);
        this.bind('all', function() {
          if (this.logging === true) {
            return console.log("LAYERS PANEL VIEW:\t", arguments);
          }
        });
        this.collection = this.editorModel.get('layerCollection');
        return this.panelViewState.set({
          title: 'Слои ( пока только на первом )',
          addRemoveButtons: true,
          addButtonText: 'Добавить слой',
          removeButtonText: 'Удалить слой'
        });
      };

      LayersPanel.prototype.onAddChildClicked = function() {
        return this.collection.add({
          layerName: "Слой " + this.collection.length
        });
      };

      LayersPanel.prototype.onRemoveChildCkicked = function() {
        if (this.collection.length < 3) {
          alert('Необходим хотя бы 1 слой');
          return false;
        }
        return LayersPanel.__super__.onRemoveChildCkicked.apply(this, arguments);
      };

      LayersPanel.prototype.onAddChild = function(layer) {};

      LayersPanel.prototype.onRemoveChild = function() {};

      return LayersPanel;

    })(views._BaseToolbarPanelView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRFZGl0b3Ivdmlld3MvbGF5ZXJzUGFuZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxHQUFHLENBQUMsTUFBSixDQUFXLGtCQUFYLEVBQStCLFNBQUMsS0FBRCxFQUFRLEdBQVIsR0FBQTtXQUN4QixLQUFLLENBQUM7QUFDWCxvQ0FBQSxDQUFBOzs7Ozs7OztPQUFBOztBQUFBLDRCQUFBLE9BQUEsR0FBUyxLQUFULENBQUE7O0FBQUEsNEJBRUEsU0FBQSxHQUFXLFFBRlgsQ0FBQTs7QUFBQSw0QkFJQSxTQUFBLEdBQVcsS0FBSyxDQUFDLEtBSmpCLENBQUE7O0FBQUEsNEJBU0EsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNYLFFBQUEsNkNBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxRQUNBLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixFQUFhLFNBQUEsR0FBQTtBQUNaLFVBQUEsSUFBaUQsSUFBQyxDQUFBLE9BQUQsS0FBWSxJQUE3RDttQkFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHNCQUFaLEVBQW9DLFNBQXBDLEVBQUE7V0FEWTtRQUFBLENBQWIsQ0FEQSxDQUFBO0FBQUEsUUFLQSxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixpQkFBakIsQ0FMZCxDQUFBO2VBTUEsSUFBQyxDQUFBLGNBQWMsQ0FBQyxHQUFoQixDQUNDO0FBQUEsVUFBQSxLQUFBLEVBQU8sZ0NBQVA7QUFBQSxVQUNBLGdCQUFBLEVBQWtCLElBRGxCO0FBQUEsVUFFQSxhQUFBLEVBQWUsZUFGZjtBQUFBLFVBR0EsZ0JBQUEsRUFBa0IsY0FIbEI7U0FERCxFQVBXO01BQUEsQ0FUWixDQUFBOztBQUFBLDRCQXNCQSxpQkFBQSxHQUFtQixTQUFBLEdBQUE7ZUFDbEIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUFaLENBQWdCO0FBQUEsVUFBQSxTQUFBLEVBQVksT0FBQSxHQUE5QixJQUFDLENBQUEsVUFBVSxDQUFDLE1BQU07U0FBaEIsRUFEa0I7TUFBQSxDQXRCbkIsQ0FBQTs7QUFBQSw0QkF5QkEsb0JBQUEsR0FBc0IsU0FBQSxHQUFBO0FBQ3JCLFFBQUEsSUFBRyxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosR0FBcUIsQ0FBeEI7QUFDQyxVQUFBLEtBQUEsQ0FBTSwwQkFBTixDQUFBLENBQUE7QUFDQSxpQkFBTyxLQUFQLENBRkQ7U0FBQTtlQUdBLHVEQUFBLFNBQUEsRUFKcUI7TUFBQSxDQXpCdEIsQ0FBQTs7QUFBQSw0QkErQkEsVUFBQSxHQUFZLFNBQUMsS0FBRCxHQUFBLENBL0JaLENBQUE7O0FBQUEsNEJBZ0NBLGFBQUEsR0FBZSxTQUFBLEdBQUEsQ0FoQ2YsQ0FBQTs7eUJBQUE7O09BRCtCLEtBQUssQ0FBQyx1QkFEUjtFQUFBLENBQS9CLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRFZGl0b3Ivdmlld3MvbGF5ZXJzUGFuZWwuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJhcHAubW9kdWxlICdDYXJkRWRpdG9yLnZpZXdzJywgKHZpZXdzLCBhcHApIC0+XG5cdGNsYXNzIHZpZXdzLkxheWVyc1BhbmVsIGV4dGVuZHMgdmlld3MuX0Jhc2VUb29sYmFyUGFuZWxWaWV3XG5cdFx0bG9nZ2luZzogb2ZmXG5cblx0XHRjbGFzc05hbWU6ICdsYXllcnMnXG5cblx0XHRjaGlsZFZpZXc6IHZpZXdzLkxheWVyXG5cblx0XHQjIHVpOlxuXHRcdCMgZXZlbnRzOlxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdHN1cGVyXG5cdFx0XHRAYmluZCAnYWxsJywgLT5cblx0XHRcdFx0Y29uc29sZS5sb2cgXCJMQVlFUlMgUEFORUwgVklFVzpcXHRcIiwgYXJndW1lbnRzIGlmIEBsb2dnaW5nIGlzIG9uXG5cblx0XHRcdCMgQG1vZGVsID0gbmV3IEJhY2tib25lLk1vZGVsXG5cdFx0XHRAY29sbGVjdGlvbiA9IEBlZGl0b3JNb2RlbC5nZXQgJ2xheWVyQ29sbGVjdGlvbidcblx0XHRcdEBwYW5lbFZpZXdTdGF0ZS5zZXRcblx0XHRcdFx0dGl0bGU6ICfQodC70L7QuCAoINC/0L7QutCwINGC0L7Qu9GM0LrQviDQvdCwINC/0LXRgNCy0L7QvCApJ1xuXHRcdFx0XHRhZGRSZW1vdmVCdXR0b25zOiB0cnVlXG5cdFx0XHRcdGFkZEJ1dHRvblRleHQ6ICfQlNC+0LHQsNCy0LjRgtGMINGB0LvQvtC5J1xuXHRcdFx0XHRyZW1vdmVCdXR0b25UZXh0OiAn0KPQtNCw0LvQuNGC0Ywg0YHQu9C+0LknXG5cblx0XHRvbkFkZENoaWxkQ2xpY2tlZDogPT5cblx0XHRcdEBjb2xsZWN0aW9uLmFkZCBsYXllck5hbWU6IFwi0KHQu9C+0LkgI3sgQGNvbGxlY3Rpb24ubGVuZ3RoIH1cIlxuXG5cdFx0b25SZW1vdmVDaGlsZENraWNrZWQ6ID0+XG5cdFx0XHRpZiBAY29sbGVjdGlvbi5sZW5ndGggPCAzXG5cdFx0XHRcdGFsZXJ0ICfQndC10L7QsdGF0L7QtNC40Lwg0YXQvtGC0Y8g0LHRiyAxINGB0LvQvtC5J1xuXHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdHN1cGVyXG5cblx0XHRvbkFkZENoaWxkOiAobGF5ZXIpID0+XG5cdFx0b25SZW1vdmVDaGlsZDogPT5cbiJdfQ==