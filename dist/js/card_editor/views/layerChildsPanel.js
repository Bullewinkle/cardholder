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

      LayerChildsPanel.prototype.className = 'row layer-childs';

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
        return this.panelViewState.set('templateOptions', {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyQ2hpbGRzUGFuZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxHQUFHLENBQUMsTUFBSixDQUFXLGtCQUFYLEVBQStCLFNBQUMsS0FBRCxFQUFRLEdBQVIsR0FBQTtXQUV4QixLQUFLLENBQUM7QUFDWCx5Q0FBQSxDQUFBOzs7Ozs7Ozs7T0FBQTs7QUFBQSxpQ0FBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLGlDQUVBLFNBQUEsR0FBVyxrQkFGWCxDQUFBOztBQUFBLGlDQUlBLFNBQUEsR0FBVyxLQUFLLENBQUMsVUFKakIsQ0FBQTs7QUFBQSxpQ0FTQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1gsUUFBQSxrREFBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWEsU0FBQSxHQUFBO0FBQ1osVUFBQSxJQUF1RCxJQUFDLENBQUEsT0FBRCxLQUFZLElBQW5FO21CQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksNEJBQVosRUFBMEMsU0FBMUMsRUFBQTtXQURZO1FBQUEsQ0FBYixDQURBLENBQUE7QUFBQSxRQUlBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBQyxDQUFBLFdBQVgsRUFBd0IsUUFBeEIsRUFBa0MsSUFBQyxDQUFBLE1BQW5DLENBSkEsQ0FBQTtBQUFBLFFBUUEsSUFBQyxDQUFBLFVBQUQsR0FBa0IsSUFBQSxRQUFRLENBQUMsVUFBVCxDQUFBLENBUmxCLENBQUE7ZUFVQSxJQUFDLENBQUEsY0FBYyxDQUFDLEdBQWhCLENBQW9CLGlCQUFwQixFQUNDO0FBQUEsVUFBQSxLQUFBLEVBQU8sa0JBQVA7QUFBQSxVQUNBLGFBQUEsRUFBZSxpQkFEZjtBQUFBLFVBRUEsZ0JBQUEsRUFBa0IsZ0JBRmxCO1NBREQsRUFYVztNQUFBLENBVFosQ0FBQTs7QUFBQSxpQ0F5QkEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNQLFFBQUEsSUFBQyxDQUFBLDJCQUFELEdBQStCLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixjQUFqQixDQUFnQyxDQUFDLEdBQWpDLENBQXFDLGlCQUFyQyxDQUEvQixDQUFBO2VBQ0EsSUFBQyxDQUFBLFVBQVUsQ0FBQyxLQUFaLENBQWtCLElBQUMsQ0FBQSwyQkFBMkIsQ0FBQyxNQUEvQyxFQUZPO01BQUEsQ0F6QlIsQ0FBQTs7QUFBQSxpQ0F1Q0EsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO0FBQ2xCLFFBQUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUFaLENBQWdCO0FBQUEsVUFBQSxTQUFBLEVBQVksU0FBQSxHQUFRLENBQXRDLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixHQUFtQixDQUFtQixDQUFwQjtTQUFoQixDQUFBLENBQUE7ZUFDQSxJQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUIsY0FBakIsQ0FBZ0MsQ0FBQyxHQUFqQyxDQUFxQyxpQkFBckMsQ0FBdUQsQ0FBQyxHQUF4RCxDQUE0RDtBQUFBLFVBQUEsU0FBQSxFQUFZLFNBQUEsR0FBUSxDQUFsRixJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosR0FBbUIsQ0FBK0QsQ0FBcEI7U0FBNUQsRUFGa0I7TUFBQSxDQXZDbkIsQ0FBQTs7QUFBQSxpQ0EyQ0Esb0JBQUEsR0FBc0IsU0FBQSxHQUFBO0FBQ3JCLFFBQUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUFaLENBQUEsQ0FBQSxDQUFBO2VBQ0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxHQUFiLENBQWlCLGNBQWpCLENBQWdDLENBQUMsR0FBakMsQ0FBcUMsaUJBQXJDLENBQXVELENBQUMsR0FBeEQsQ0FBQSxFQUZxQjtNQUFBLENBM0N0QixDQUFBOztBQUFBLGlDQStDQSxVQUFBLEdBQVksU0FBQSxHQUFBLENBL0NaLENBQUE7O0FBQUEsaUNBZ0RBLGFBQUEsR0FBZSxTQUFBLEdBQUEsQ0FoRGYsQ0FBQTs7OEJBQUE7O09BRG9DLEtBQUssQ0FBQyxzQkFGYjtFQUFBLENBQS9CLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyQ2hpbGRzUGFuZWwuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJhcHAubW9kdWxlICdDYXJkRWRpdG9yLnZpZXdzJywgKHZpZXdzLCBhcHApIC0+XG5cdFxuXHRjbGFzcyB2aWV3cy5MYXllckNoaWxkc1BhbmVsIGV4dGVuZHMgdmlld3MuQmFzZVRvb2xiYXJQYW5lbFZpZXdcblx0XHRsb2dnaW5nOiBvZmZcblxuXHRcdGNsYXNzTmFtZTogJ3JvdyBsYXllci1jaGlsZHMnXG5cblx0XHRjaGlsZFZpZXc6IHZpZXdzLkxheWVyQ2hpbGRcblxuXHRcdCMgdWk6XG5cdFx0IyBldmVudHM6XG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0c3VwZXJcblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkxBWUVSIENISUxEUyBQQU5FTCBWSUVXOlxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dpbmcgaXMgb25cblxuXHRcdFx0QGxpc3RlblRvIEBlZGl0b3JTdGF0ZSwgJ2NoYW5nZScsIEB1cGRhdGVcblx0XHRcdCMgQG1vZGVsID0gbmV3IEJhY2tib25lLk1vZGVsKClcblx0XHRcdCMgY29uc29sZS5sb2cgQGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJylcblxuXHRcdFx0QGNvbGxlY3Rpb24gPSBuZXcgQmFja2JvbmUuQ29sbGVjdGlvbigpXG5cblx0XHRcdEBwYW5lbFZpZXdTdGF0ZS5zZXQgJ3RlbXBsYXRlT3B0aW9ucycsXG5cdFx0XHRcdHRpdGxlOiAn0KHQu9GD0YfQsNC50L3Ri9C1INGE0LjQs9GD0YDRiydcblx0XHRcdFx0YWRkQnV0dG9uVGV4dDogJ9CU0L7QsdCw0LLQuNGC0Ywg0YTQuNCz0YPRgNGDJ1xuXHRcdFx0XHRyZW1vdmVCdXR0b25UZXh0OiAn0KPQtNCw0LvQuNGC0Ywg0YTQuNCz0YPRgNGDJ1xuXG5cdFx0dXBkYXRlOiA9PlxuXHRcdFx0QGN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvbiA9IEBlZGl0b3JTdGF0ZS5nZXQoJ2N1cnJlbnRMYXllcicpLmdldCgnc2hhcGVDb2xsZWN0aW9uJylcblx0XHRcdEBjb2xsZWN0aW9uLnJlc2V0IEBjdXJyZW50TGF5ZXJTaGFwZUNvbGxlY3Rpb24ubW9kZWxzXG5cdFx0XHQjIEBjb2xsZWN0aW9uLm9uICdhZGQnLCAobW9kZWwsIGNvbGxlY3Rpb24sIG9wdGlvbnMpIC0+XG5cdFx0XHQjIFx0Y3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uLmFkZCBtb2RlbFxuXHRcdFx0IyBcdGNvbnNvbGUud2FybiBhcmd1bWVudHMsIGN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvblxuXHRcdFx0IyBAY29sbGVjdGlvbi5vbiAncmVtb3ZlJywgKG1vZGVsLCBjb2xsZWN0aW9uLCBvcHRpb25zKSAtPlxuXHRcdFx0IyBcdGN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvbi5wb3AoKVxuXHRcdFx0IyBcdGNvbnNvbGUud2FybiBhcmd1bWVudHMsIGN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvblxuXG5cdFx0IyBhZGRUb0N1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvbjogKG1vZGVsLCBjb2xsZWN0aW9uLCBvcHRpb25zKSA9PlxuXHRcdCMgXHRAY3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uLmFkZCBtb2RlbFxuXHRcdCMgcG9wRnJvbUN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvbjogKG1vZGVsLCBjb2xsZWN0aW9uLCBvcHRpb25zKSA9PlxuXHRcdCMgXHRAY3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uLnBvcCgpXG5cdFx0b25BZGRDaGlsZENsaWNrZWQ6ID0+XG5cdFx0XHRAY29sbGVjdGlvbi5hZGQgc2hhcGVOYW1lOiBcItCk0LjQs9GD0YDQsCAjeyBAY29sbGVjdGlvbi5sZW5ndGgrMSB9XCJcblx0XHRcdEBlZGl0b3JTdGF0ZS5nZXQoJ2N1cnJlbnRMYXllcicpLmdldCgnc2hhcGVDb2xsZWN0aW9uJykuYWRkIHNoYXBlTmFtZTogXCLQpNC40LPRg9GA0LAgI3sgQGNvbGxlY3Rpb24ubGVuZ3RoKzEgfVwiXG5cblx0XHRvblJlbW92ZUNoaWxkQ2tpY2tlZDogPT5cblx0XHRcdEBjb2xsZWN0aW9uLnBvcCgpXG5cdFx0XHRAZWRpdG9yU3RhdGUuZ2V0KCdjdXJyZW50TGF5ZXInKS5nZXQoJ3NoYXBlQ29sbGVjdGlvbicpLnBvcCgpXG5cblx0XHRvbkFkZENoaWxkOiA9PlxuXHRcdG9uUmVtb3ZlQ2hpbGQ6ID0+XG4iXX0=