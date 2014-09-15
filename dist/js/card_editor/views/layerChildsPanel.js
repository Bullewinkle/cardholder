(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.module('CardEditor.views', function(views, app) {
    return views.LayerChildsPanel = (function(_super) {
      __extends(LayerChildsPanel, _super);

      function LayerChildsPanel() {
        this.onRemoveChild = __bind(this.onRemoveChild, this);
        this.onAddChild = __bind(this.onAddChild, this);
        this.onRemoveChildCkicked = __bind(this.onRemoveChildCkicked, this);
        this.onAddChildClicked = __bind(this.onAddChildClicked, this);
        this.update = __bind(this.update, this);
        return LayerChildsPanel.__super__.constructor.apply(this, arguments);
      }

      LayerChildsPanel.prototype.logging = false;

      LayerChildsPanel.prototype.className = 'layer-childs';

      LayerChildsPanel.prototype.childView = views.LayerChild;

      LayerChildsPanel.prototype.initialize = function() {
        LayerChildsPanel.__super__.initialize.apply(this, arguments);
        this.bind('all', function() {
          if (this.logging === true) {
            return console.log("LAYER CHILDS PANEL VIEW:\t", arguments);
          }
        });
        this.listenTo(this.editorState, 'change', this.update);
        this.collection = new Backbone.Collection();
        return this.panelViewState.set({
          title: 'Случайные фигуры',
          gotBody: true,
          addRemoveButtons: true,
          addButtonText: 'Добавить фигуру',
          removeButtonText: 'Удалить фигуру'
        });
      };

      LayerChildsPanel.prototype.update = function() {
        this.currentLayerShapeCollection = this.editorState.get('currentLayer').get('shapeCollection');
        return this.collection.reset(this.currentLayerShapeCollection.models);
      };

      LayerChildsPanel.prototype.onAddChildClicked = function() {
        this.collection.add({
          shapeName: "Фигура " + (this.collection.length + 1)
        });
        return this.editorState.get('currentLayer').get('shapeCollection').add({
          shapeName: "Фигура " + (this.collection.length + 1)
        });
      };

      LayerChildsPanel.prototype.onRemoveChildCkicked = function() {
        this.collection.pop();
        return this.editorState.get('currentLayer').get('shapeCollection').pop();
      };

      LayerChildsPanel.prototype.onAddChild = function() {};

      LayerChildsPanel.prototype.onRemoveChild = function() {};

      return LayerChildsPanel;

    })(views._BaseToolbarPanelView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyQ2hpbGRzUGFuZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxHQUFHLENBQUMsTUFBSixDQUFXLGtCQUFYLEVBQStCLFNBQUMsS0FBRCxFQUFRLEdBQVIsR0FBQTtXQUV4QixLQUFLLENBQUM7QUFDWCx5Q0FBQSxDQUFBOzs7Ozs7Ozs7T0FBQTs7QUFBQSxpQ0FBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLGlDQUVBLFNBQUEsR0FBVyxjQUZYLENBQUE7O0FBQUEsaUNBSUEsU0FBQSxHQUFXLEtBQUssQ0FBQyxVQUpqQixDQUFBOztBQUFBLGlDQVNBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFBLGtEQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxTQUFBLEdBQUE7QUFDWixVQUFBLElBQXVELElBQUMsQ0FBQSxPQUFELEtBQVksSUFBbkU7bUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSw0QkFBWixFQUEwQyxTQUExQyxFQUFBO1dBRFk7UUFBQSxDQUFiLENBREEsQ0FBQTtBQUFBLFFBR0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsV0FBWCxFQUF3QixRQUF4QixFQUFrQyxJQUFDLENBQUEsTUFBbkMsQ0FIQSxDQUFBO0FBQUEsUUFPQSxJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLFFBQVEsQ0FBQyxVQUFULENBQUEsQ0FQbEIsQ0FBQTtlQVFBLElBQUMsQ0FBQSxjQUFjLENBQUMsR0FBaEIsQ0FDQztBQUFBLFVBQUEsS0FBQSxFQUFPLGtCQUFQO0FBQUEsVUFDQSxPQUFBLEVBQVMsSUFEVDtBQUFBLFVBRUEsZ0JBQUEsRUFBa0IsSUFGbEI7QUFBQSxVQUdBLGFBQUEsRUFBZSxpQkFIZjtBQUFBLFVBSUEsZ0JBQUEsRUFBa0IsZ0JBSmxCO1NBREQsRUFUVztNQUFBLENBVFosQ0FBQTs7QUFBQSxpQ0F5QkEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNQLFFBQUEsSUFBQyxDQUFBLDJCQUFELEdBQStCLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixjQUFqQixDQUFnQyxDQUFDLEdBQWpDLENBQXFDLGlCQUFyQyxDQUEvQixDQUFBO2VBQ0EsSUFBQyxDQUFBLFVBQVUsQ0FBQyxLQUFaLENBQWtCLElBQUMsQ0FBQSwyQkFBMkIsQ0FBQyxNQUEvQyxFQUZPO01BQUEsQ0F6QlIsQ0FBQTs7QUFBQSxpQ0F1Q0EsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO0FBQ2xCLFFBQUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUFaLENBQWdCO0FBQUEsVUFBQSxTQUFBLEVBQVksU0FBQSxHQUFRLENBQXRDLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixHQUFtQixDQUFtQixDQUFwQjtTQUFoQixDQUFBLENBQUE7ZUFDQSxJQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUIsY0FBakIsQ0FBZ0MsQ0FBQyxHQUFqQyxDQUFxQyxpQkFBckMsQ0FBdUQsQ0FBQyxHQUF4RCxDQUE0RDtBQUFBLFVBQUEsU0FBQSxFQUFZLFNBQUEsR0FBUSxDQUFsRixJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosR0FBbUIsQ0FBK0QsQ0FBcEI7U0FBNUQsRUFGa0I7TUFBQSxDQXZDbkIsQ0FBQTs7QUFBQSxpQ0EyQ0Esb0JBQUEsR0FBc0IsU0FBQSxHQUFBO0FBQ3JCLFFBQUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUFaLENBQUEsQ0FBQSxDQUFBO2VBQ0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxHQUFiLENBQWlCLGNBQWpCLENBQWdDLENBQUMsR0FBakMsQ0FBcUMsaUJBQXJDLENBQXVELENBQUMsR0FBeEQsQ0FBQSxFQUZxQjtNQUFBLENBM0N0QixDQUFBOztBQUFBLGlDQStDQSxVQUFBLEdBQVksU0FBQSxHQUFBLENBL0NaLENBQUE7O0FBQUEsaUNBZ0RBLGFBQUEsR0FBZSxTQUFBLEdBQUEsQ0FoRGYsQ0FBQTs7OEJBQUE7O09BRG9DLEtBQUssQ0FBQyx1QkFGYjtFQUFBLENBQS9CLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyQ2hpbGRzUGFuZWwuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJhcHAubW9kdWxlICdDYXJkRWRpdG9yLnZpZXdzJywgKHZpZXdzLCBhcHApIC0+XG5cdFxuXHRjbGFzcyB2aWV3cy5MYXllckNoaWxkc1BhbmVsIGV4dGVuZHMgdmlld3MuX0Jhc2VUb29sYmFyUGFuZWxWaWV3XG5cdFx0bG9nZ2luZzogb2ZmXG5cblx0XHRjbGFzc05hbWU6ICdsYXllci1jaGlsZHMnXG5cblx0XHRjaGlsZFZpZXc6IHZpZXdzLkxheWVyQ2hpbGRcblxuXHRcdCMgdWk6XG5cdFx0IyBldmVudHM6XG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0c3VwZXJcblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkxBWUVSIENISUxEUyBQQU5FTCBWSUVXOlxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dpbmcgaXMgb25cblx0XHRcdEBsaXN0ZW5UbyBAZWRpdG9yU3RhdGUsICdjaGFuZ2UnLCBAdXBkYXRlXG5cdFx0XHQjIEBtb2RlbCA9IG5ldyBCYWNrYm9uZS5Nb2RlbCgpXG5cdFx0XHQjIGNvbnNvbGUubG9nIEBlZGl0b3JTdGF0ZS5nZXQoJ2N1cnJlbnRMYXllcicpXG5cblx0XHRcdEBjb2xsZWN0aW9uID0gbmV3IEJhY2tib25lLkNvbGxlY3Rpb24oKVxuXHRcdFx0QHBhbmVsVmlld1N0YXRlLnNldFxuXHRcdFx0XHR0aXRsZTogJ9Ch0LvRg9GH0LDQudC90YvQtSDRhNC40LPRg9GA0YsnXG5cdFx0XHRcdGdvdEJvZHk6IHRydWVcblx0XHRcdFx0YWRkUmVtb3ZlQnV0dG9uczogdHJ1ZVxuXHRcdFx0XHRhZGRCdXR0b25UZXh0OiAn0JTQvtCx0LDQstC40YLRjCDRhNC40LPRg9GA0YMnXG5cdFx0XHRcdHJlbW92ZUJ1dHRvblRleHQ6ICfQo9C00LDQu9C40YLRjCDRhNC40LPRg9GA0YMnXG5cblx0XHR1cGRhdGU6ID0+XG5cdFx0XHRAY3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uID0gQGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJykuZ2V0KCdzaGFwZUNvbGxlY3Rpb24nKVxuXHRcdFx0QGNvbGxlY3Rpb24ucmVzZXQgQGN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvbi5tb2RlbHNcblx0XHRcdCMgQGNvbGxlY3Rpb24ub24gJ2FkZCcsIChtb2RlbCwgY29sbGVjdGlvbiwgb3B0aW9ucykgLT5cblx0XHRcdCMgXHRjdXJyZW50TGF5ZXJTaGFwZUNvbGxlY3Rpb24uYWRkIG1vZGVsXG5cdFx0XHQjIFx0Y29uc29sZS53YXJuIGFyZ3VtZW50cywgY3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uXG5cdFx0XHQjIEBjb2xsZWN0aW9uLm9uICdyZW1vdmUnLCAobW9kZWwsIGNvbGxlY3Rpb24sIG9wdGlvbnMpIC0+XG5cdFx0XHQjIFx0Y3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uLnBvcCgpXG5cdFx0XHQjIFx0Y29uc29sZS53YXJuIGFyZ3VtZW50cywgY3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uXG5cblx0XHRcdCMgYWRkVG9DdXJyZW50TGF5ZXJTaGFwZUNvbGxlY3Rpb246IChtb2RlbCwgY29sbGVjdGlvbiwgb3B0aW9ucykgPT5cblx0XHRcdCMgXHRAY3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uLmFkZCBtb2RlbFxuXHRcdFx0IyBwb3BGcm9tQ3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uOiAobW9kZWwsIGNvbGxlY3Rpb24sIG9wdGlvbnMpID0+XG5cdFx0XHQjIFx0QGN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvbi5wb3AoKVxuXHRcdG9uQWRkQ2hpbGRDbGlja2VkOiA9PlxuXHRcdFx0QGNvbGxlY3Rpb24uYWRkIHNoYXBlTmFtZTogXCLQpNC40LPRg9GA0LAgI3sgQGNvbGxlY3Rpb24ubGVuZ3RoKzEgfVwiXG5cdFx0XHRAZWRpdG9yU3RhdGUuZ2V0KCdjdXJyZW50TGF5ZXInKS5nZXQoJ3NoYXBlQ29sbGVjdGlvbicpLmFkZCBzaGFwZU5hbWU6IFwi0KTQuNCz0YPRgNCwICN7IEBjb2xsZWN0aW9uLmxlbmd0aCsxIH1cIlxuXG5cdFx0b25SZW1vdmVDaGlsZENraWNrZWQ6ID0+XG5cdFx0XHRAY29sbGVjdGlvbi5wb3AoKVxuXHRcdFx0QGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJykuZ2V0KCdzaGFwZUNvbGxlY3Rpb24nKS5wb3AoKVxuXG5cdFx0b25BZGRDaGlsZDogPT5cblx0XHRvblJlbW92ZUNoaWxkOiA9PlxuIl19