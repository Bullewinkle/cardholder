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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyQ2hpbGRzUGFuZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxHQUFHLENBQUMsTUFBSixDQUFXLGtCQUFYLEVBQStCLFNBQUMsS0FBRCxFQUFRLEdBQVIsR0FBQTtXQUV4QixLQUFLLENBQUM7QUFDWCx5Q0FBQSxDQUFBOzs7Ozs7Ozs7T0FBQTs7QUFBQSxpQ0FBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLGlDQUVBLFNBQUEsR0FBVyxjQUZYLENBQUE7O0FBQUEsaUNBSUEsU0FBQSxHQUFXLEtBQUssQ0FBQyxVQUpqQixDQUFBOztBQUFBLGlDQVNBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFBLGtEQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxTQUFBLEdBQUE7QUFDWixVQUFBLElBQXVELElBQUMsQ0FBQSxPQUFELEtBQVksSUFBbkU7bUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSw0QkFBWixFQUEwQyxTQUExQyxFQUFBO1dBRFk7UUFBQSxDQUFiLENBREEsQ0FBQTtBQUFBLFFBSUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsV0FBWCxFQUF3QixRQUF4QixFQUFrQyxJQUFDLENBQUEsTUFBbkMsQ0FKQSxDQUFBO0FBQUEsUUFRQSxJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLFFBQVEsQ0FBQyxVQUFULENBQUEsQ0FSbEIsQ0FBQTtlQVVBLElBQUMsQ0FBQSxjQUFjLENBQUMsR0FBaEIsQ0FDQztBQUFBLFVBQUEsS0FBQSxFQUFPLGtCQUFQO0FBQUEsVUFDQSxnQkFBQSxFQUFrQixJQURsQjtBQUFBLFVBRUEsYUFBQSxFQUFlLGlCQUZmO0FBQUEsVUFHQSxnQkFBQSxFQUFrQixnQkFIbEI7U0FERCxFQVhXO01BQUEsQ0FUWixDQUFBOztBQUFBLGlDQTBCQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ1AsUUFBQSxJQUFDLENBQUEsMkJBQUQsR0FBK0IsSUFBQyxDQUFBLFdBQVcsQ0FBQyxHQUFiLENBQWlCLGNBQWpCLENBQWdDLENBQUMsR0FBakMsQ0FBcUMsaUJBQXJDLENBQS9CLENBQUE7ZUFDQSxJQUFDLENBQUEsVUFBVSxDQUFDLEtBQVosQ0FBa0IsSUFBQyxDQUFBLDJCQUEyQixDQUFDLE1BQS9DLEVBRk87TUFBQSxDQTFCUixDQUFBOztBQUFBLGlDQXdDQSxpQkFBQSxHQUFtQixTQUFBLEdBQUE7QUFDbEIsUUFBQSxJQUFDLENBQUEsVUFBVSxDQUFDLEdBQVosQ0FBZ0I7QUFBQSxVQUFBLFNBQUEsRUFBWSxTQUFBLEdBQVEsQ0FBdEMsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLEdBQW1CLENBQW1CLENBQXBCO1NBQWhCLENBQUEsQ0FBQTtlQUNBLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixjQUFqQixDQUFnQyxDQUFDLEdBQWpDLENBQXFDLGlCQUFyQyxDQUF1RCxDQUFDLEdBQXhELENBQTREO0FBQUEsVUFBQSxTQUFBLEVBQVksU0FBQSxHQUFRLENBQWxGLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixHQUFtQixDQUErRCxDQUFwQjtTQUE1RCxFQUZrQjtNQUFBLENBeENuQixDQUFBOztBQUFBLGlDQTRDQSxvQkFBQSxHQUFzQixTQUFBLEdBQUE7QUFDckIsUUFBQSxJQUFDLENBQUEsVUFBVSxDQUFDLEdBQVosQ0FBQSxDQUFBLENBQUE7ZUFDQSxJQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUIsY0FBakIsQ0FBZ0MsQ0FBQyxHQUFqQyxDQUFxQyxpQkFBckMsQ0FBdUQsQ0FBQyxHQUF4RCxDQUFBLEVBRnFCO01BQUEsQ0E1Q3RCLENBQUE7O0FBQUEsaUNBZ0RBLFVBQUEsR0FBWSxTQUFBLEdBQUEsQ0FoRFosQ0FBQTs7QUFBQSxpQ0FpREEsYUFBQSxHQUFlLFNBQUEsR0FBQSxDQWpEZixDQUFBOzs4QkFBQTs7T0FEb0MsS0FBSyxDQUFDLHVCQUZiO0VBQUEsQ0FBL0IsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZF9lZGl0b3Ivdmlld3MvbGF5ZXJDaGlsZHNQYW5lbC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImFwcC5tb2R1bGUgJ0NhcmRFZGl0b3Iudmlld3MnLCAodmlld3MsIGFwcCkgLT5cblx0XG5cdGNsYXNzIHZpZXdzLkxheWVyQ2hpbGRzUGFuZWwgZXh0ZW5kcyB2aWV3cy5fQmFzZVRvb2xiYXJQYW5lbFZpZXdcblx0XHRsb2dnaW5nOiBvZmZcblxuXHRcdGNsYXNzTmFtZTogJ2xheWVyLWNoaWxkcydcblxuXHRcdGNoaWxkVmlldzogdmlld3MuTGF5ZXJDaGlsZFxuXG5cdFx0IyB1aTpcblx0XHQjIGV2ZW50czpcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRzdXBlclxuXHRcdFx0QGJpbmQgJ2FsbCcsIC0+XG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiTEFZRVIgQ0hJTERTIFBBTkVMIFZJRVc6XFx0XCIsIGFyZ3VtZW50cyBpZiBAbG9nZ2luZyBpcyBvblxuXG5cdFx0XHRAbGlzdGVuVG8gQGVkaXRvclN0YXRlLCAnY2hhbmdlJywgQHVwZGF0ZVxuXHRcdFx0IyBAbW9kZWwgPSBuZXcgQmFja2JvbmUuTW9kZWwoKVxuXHRcdFx0IyBjb25zb2xlLmxvZyBAZWRpdG9yU3RhdGUuZ2V0KCdjdXJyZW50TGF5ZXInKVxuXG5cdFx0XHRAY29sbGVjdGlvbiA9IG5ldyBCYWNrYm9uZS5Db2xsZWN0aW9uKClcblxuXHRcdFx0QHBhbmVsVmlld1N0YXRlLnNldFxuXHRcdFx0XHR0aXRsZTogJ9Ch0LvRg9GH0LDQudC90YvQtSDRhNC40LPRg9GA0YsnXG5cdFx0XHRcdGFkZFJlbW92ZUJ1dHRvbnM6IHRydWVcblx0XHRcdFx0YWRkQnV0dG9uVGV4dDogJ9CU0L7QsdCw0LLQuNGC0Ywg0YTQuNCz0YPRgNGDJ1xuXHRcdFx0XHRyZW1vdmVCdXR0b25UZXh0OiAn0KPQtNCw0LvQuNGC0Ywg0YTQuNCz0YPRgNGDJ1xuXG5cdFx0dXBkYXRlOiA9PlxuXHRcdFx0QGN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvbiA9IEBlZGl0b3JTdGF0ZS5nZXQoJ2N1cnJlbnRMYXllcicpLmdldCgnc2hhcGVDb2xsZWN0aW9uJylcblx0XHRcdEBjb2xsZWN0aW9uLnJlc2V0IEBjdXJyZW50TGF5ZXJTaGFwZUNvbGxlY3Rpb24ubW9kZWxzXG5cdFx0XHQjIEBjb2xsZWN0aW9uLm9uICdhZGQnLCAobW9kZWwsIGNvbGxlY3Rpb24sIG9wdGlvbnMpIC0+XG5cdFx0XHQjIFx0Y3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uLmFkZCBtb2RlbFxuXHRcdFx0IyBcdGNvbnNvbGUud2FybiBhcmd1bWVudHMsIGN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvblxuXHRcdFx0IyBAY29sbGVjdGlvbi5vbiAncmVtb3ZlJywgKG1vZGVsLCBjb2xsZWN0aW9uLCBvcHRpb25zKSAtPlxuXHRcdFx0IyBcdGN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvbi5wb3AoKVxuXHRcdFx0IyBcdGNvbnNvbGUud2FybiBhcmd1bWVudHMsIGN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvblxuXG5cdFx0XHQjIGFkZFRvQ3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uOiAobW9kZWwsIGNvbGxlY3Rpb24sIG9wdGlvbnMpID0+XG5cdFx0XHQjIFx0QGN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvbi5hZGQgbW9kZWxcblx0XHRcdCMgcG9wRnJvbUN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvbjogKG1vZGVsLCBjb2xsZWN0aW9uLCBvcHRpb25zKSA9PlxuXHRcdFx0IyBcdEBjdXJyZW50TGF5ZXJTaGFwZUNvbGxlY3Rpb24ucG9wKClcblx0XHRvbkFkZENoaWxkQ2xpY2tlZDogPT5cblx0XHRcdEBjb2xsZWN0aW9uLmFkZCBzaGFwZU5hbWU6IFwi0KTQuNCz0YPRgNCwICN7IEBjb2xsZWN0aW9uLmxlbmd0aCsxIH1cIlxuXHRcdFx0QGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJykuZ2V0KCdzaGFwZUNvbGxlY3Rpb24nKS5hZGQgc2hhcGVOYW1lOiBcItCk0LjQs9GD0YDQsCAjeyBAY29sbGVjdGlvbi5sZW5ndGgrMSB9XCJcblxuXHRcdG9uUmVtb3ZlQ2hpbGRDa2lja2VkOiA9PlxuXHRcdFx0QGNvbGxlY3Rpb24ucG9wKClcblx0XHRcdEBlZGl0b3JTdGF0ZS5nZXQoJ2N1cnJlbnRMYXllcicpLmdldCgnc2hhcGVDb2xsZWN0aW9uJykucG9wKClcblxuXHRcdG9uQWRkQ2hpbGQ6ID0+XG5cdFx0b25SZW1vdmVDaGlsZDogPT5cbiJdfQ==