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

    })(views.BaseToolbarPanelView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyQ2hpbGRzUGFuZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxHQUFHLENBQUMsTUFBSixDQUFXLGtCQUFYLEVBQStCLFNBQUMsS0FBRCxFQUFRLEdBQVIsR0FBQTtXQUV4QixLQUFLLENBQUM7QUFDWCx5Q0FBQSxDQUFBOzs7Ozs7Ozs7T0FBQTs7QUFBQSxpQ0FBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLGlDQUVBLFNBQUEsR0FBVyxjQUZYLENBQUE7O0FBQUEsaUNBSUEsU0FBQSxHQUFXLEtBQUssQ0FBQyxVQUpqQixDQUFBOztBQUFBLGlDQVNBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFBLGtEQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxTQUFBLEdBQUE7QUFDWixVQUFBLElBQXVELElBQUMsQ0FBQSxPQUFELEtBQVksSUFBbkU7bUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSw0QkFBWixFQUEwQyxTQUExQyxFQUFBO1dBRFk7UUFBQSxDQUFiLENBREEsQ0FBQTtBQUFBLFFBSUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsV0FBWCxFQUF3QixRQUF4QixFQUFrQyxJQUFDLENBQUEsTUFBbkMsQ0FKQSxDQUFBO0FBQUEsUUFRQSxJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLFFBQVEsQ0FBQyxVQUFULENBQUEsQ0FSbEIsQ0FBQTtlQVVBLElBQUMsQ0FBQSxjQUFjLENBQUMsR0FBaEIsQ0FDQztBQUFBLFVBQUEsS0FBQSxFQUFPLGtCQUFQO0FBQUEsVUFDQSxhQUFBLEVBQWUsaUJBRGY7QUFBQSxVQUVBLGdCQUFBLEVBQWtCLGdCQUZsQjtTQURELEVBWFc7TUFBQSxDQVRaLENBQUE7O0FBQUEsaUNBeUJBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDUCxRQUFBLElBQUMsQ0FBQSwyQkFBRCxHQUErQixJQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUIsY0FBakIsQ0FBZ0MsQ0FBQyxHQUFqQyxDQUFxQyxpQkFBckMsQ0FBL0IsQ0FBQTtlQUNBLElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBWixDQUFrQixJQUFDLENBQUEsMkJBQTJCLENBQUMsTUFBL0MsRUFGTztNQUFBLENBekJSLENBQUE7O0FBQUEsaUNBdUNBLGlCQUFBLEdBQW1CLFNBQUEsR0FBQTtBQUNsQixRQUFBLElBQUMsQ0FBQSxVQUFVLENBQUMsR0FBWixDQUFnQjtBQUFBLFVBQUEsU0FBQSxFQUFZLFNBQUEsR0FBUSxDQUF0QyxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosR0FBbUIsQ0FBbUIsQ0FBcEI7U0FBaEIsQ0FBQSxDQUFBO2VBQ0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxHQUFiLENBQWlCLGNBQWpCLENBQWdDLENBQUMsR0FBakMsQ0FBcUMsaUJBQXJDLENBQXVELENBQUMsR0FBeEQsQ0FBNEQ7QUFBQSxVQUFBLFNBQUEsRUFBWSxTQUFBLEdBQVEsQ0FBbEYsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLEdBQW1CLENBQStELENBQXBCO1NBQTVELEVBRmtCO01BQUEsQ0F2Q25CLENBQUE7O0FBQUEsaUNBMkNBLG9CQUFBLEdBQXNCLFNBQUEsR0FBQTtBQUNyQixRQUFBLElBQUMsQ0FBQSxVQUFVLENBQUMsR0FBWixDQUFBLENBQUEsQ0FBQTtlQUNBLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixjQUFqQixDQUFnQyxDQUFDLEdBQWpDLENBQXFDLGlCQUFyQyxDQUF1RCxDQUFDLEdBQXhELENBQUEsRUFGcUI7TUFBQSxDQTNDdEIsQ0FBQTs7QUFBQSxpQ0ErQ0EsVUFBQSxHQUFZLFNBQUEsR0FBQSxDQS9DWixDQUFBOztBQUFBLGlDQWdEQSxhQUFBLEdBQWUsU0FBQSxHQUFBLENBaERmLENBQUE7OzhCQUFBOztPQURvQyxLQUFLLENBQUMsc0JBRmI7RUFBQSxDQUEvQixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkX2VkaXRvci92aWV3cy9sYXllckNoaWxkc1BhbmVsLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLm1vZHVsZSAnQ2FyZEVkaXRvci52aWV3cycsICh2aWV3cywgYXBwKSAtPlxuXHRcblx0Y2xhc3Mgdmlld3MuTGF5ZXJDaGlsZHNQYW5lbCBleHRlbmRzIHZpZXdzLkJhc2VUb29sYmFyUGFuZWxWaWV3XG5cdFx0bG9nZ2luZzogb2ZmXG5cblx0XHRjbGFzc05hbWU6ICdsYXllci1jaGlsZHMnXG5cblx0XHRjaGlsZFZpZXc6IHZpZXdzLkxheWVyQ2hpbGRcblxuXHRcdCMgdWk6XG5cdFx0IyBldmVudHM6XG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0c3VwZXJcblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkxBWUVSIENISUxEUyBQQU5FTCBWSUVXOlxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dpbmcgaXMgb25cblxuXHRcdFx0QGxpc3RlblRvIEBlZGl0b3JTdGF0ZSwgJ2NoYW5nZScsIEB1cGRhdGVcblx0XHRcdCMgQG1vZGVsID0gbmV3IEJhY2tib25lLk1vZGVsKClcblx0XHRcdCMgY29uc29sZS5sb2cgQGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJylcblxuXHRcdFx0QGNvbGxlY3Rpb24gPSBuZXcgQmFja2JvbmUuQ29sbGVjdGlvbigpXG5cblx0XHRcdEBwYW5lbFZpZXdTdGF0ZS5zZXRcblx0XHRcdFx0dGl0bGU6ICfQodC70YPRh9Cw0LnQvdGL0LUg0YTQuNCz0YPRgNGLJ1xuXHRcdFx0XHRhZGRCdXR0b25UZXh0OiAn0JTQvtCx0LDQstC40YLRjCDRhNC40LPRg9GA0YMnXG5cdFx0XHRcdHJlbW92ZUJ1dHRvblRleHQ6ICfQo9C00LDQu9C40YLRjCDRhNC40LPRg9GA0YMnXG5cblx0XHR1cGRhdGU6ID0+XG5cdFx0XHRAY3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uID0gQGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJykuZ2V0KCdzaGFwZUNvbGxlY3Rpb24nKVxuXHRcdFx0QGNvbGxlY3Rpb24ucmVzZXQgQGN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvbi5tb2RlbHNcblx0XHRcdCMgQGNvbGxlY3Rpb24ub24gJ2FkZCcsIChtb2RlbCwgY29sbGVjdGlvbiwgb3B0aW9ucykgLT5cblx0XHRcdCMgXHRjdXJyZW50TGF5ZXJTaGFwZUNvbGxlY3Rpb24uYWRkIG1vZGVsXG5cdFx0XHQjIFx0Y29uc29sZS53YXJuIGFyZ3VtZW50cywgY3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uXG5cdFx0XHQjIEBjb2xsZWN0aW9uLm9uICdyZW1vdmUnLCAobW9kZWwsIGNvbGxlY3Rpb24sIG9wdGlvbnMpIC0+XG5cdFx0XHQjIFx0Y3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uLnBvcCgpXG5cdFx0XHQjIFx0Y29uc29sZS53YXJuIGFyZ3VtZW50cywgY3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uXG5cblx0XHQjIGFkZFRvQ3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uOiAobW9kZWwsIGNvbGxlY3Rpb24sIG9wdGlvbnMpID0+XG5cdFx0IyBcdEBjdXJyZW50TGF5ZXJTaGFwZUNvbGxlY3Rpb24uYWRkIG1vZGVsXG5cdFx0IyBwb3BGcm9tQ3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uOiAobW9kZWwsIGNvbGxlY3Rpb24sIG9wdGlvbnMpID0+XG5cdFx0IyBcdEBjdXJyZW50TGF5ZXJTaGFwZUNvbGxlY3Rpb24ucG9wKClcblx0XHRvbkFkZENoaWxkQ2xpY2tlZDogPT5cblx0XHRcdEBjb2xsZWN0aW9uLmFkZCBzaGFwZU5hbWU6IFwi0KTQuNCz0YPRgNCwICN7IEBjb2xsZWN0aW9uLmxlbmd0aCsxIH1cIlxuXHRcdFx0QGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJykuZ2V0KCdzaGFwZUNvbGxlY3Rpb24nKS5hZGQgc2hhcGVOYW1lOiBcItCk0LjQs9GD0YDQsCAjeyBAY29sbGVjdGlvbi5sZW5ndGgrMSB9XCJcblxuXHRcdG9uUmVtb3ZlQ2hpbGRDa2lja2VkOiA9PlxuXHRcdFx0QGNvbGxlY3Rpb24ucG9wKClcblx0XHRcdEBlZGl0b3JTdGF0ZS5nZXQoJ2N1cnJlbnRMYXllcicpLmdldCgnc2hhcGVDb2xsZWN0aW9uJykucG9wKClcblxuXHRcdG9uQWRkQ2hpbGQ6ID0+XG5cdFx0b25SZW1vdmVDaGlsZDogPT5cbiJdfQ==