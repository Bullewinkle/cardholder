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
          title: 'Фигуры',
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyQ2hpbGRzUGFuZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxHQUFHLENBQUMsTUFBSixDQUFXLGtCQUFYLEVBQStCLFNBQUMsS0FBRCxFQUFRLEdBQVIsR0FBQTtXQUV4QixLQUFLLENBQUM7QUFDWCx5Q0FBQSxDQUFBOzs7Ozs7Ozs7T0FBQTs7QUFBQSxpQ0FBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLGlDQUVBLFNBQUEsR0FBVyxrQkFGWCxDQUFBOztBQUFBLGlDQUlBLFNBQUEsR0FBVyxLQUFLLENBQUMsVUFKakIsQ0FBQTs7QUFBQSxpQ0FTQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1gsUUFBQSxrREFBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWEsU0FBQSxHQUFBO0FBQ1osVUFBQSxJQUF1RCxJQUFDLENBQUEsT0FBRCxLQUFZLElBQW5FO21CQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksNEJBQVosRUFBMEMsU0FBMUMsRUFBQTtXQURZO1FBQUEsQ0FBYixDQURBLENBQUE7QUFBQSxRQUlBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBQyxDQUFBLFdBQVgsRUFBd0IsUUFBeEIsRUFBa0MsSUFBQyxDQUFBLE1BQW5DLENBSkEsQ0FBQTtBQUFBLFFBUUEsSUFBQyxDQUFBLFVBQUQsR0FBa0IsSUFBQSxRQUFRLENBQUMsVUFBVCxDQUFBLENBUmxCLENBQUE7ZUFVQSxJQUFDLENBQUEsY0FBYyxDQUFDLEdBQWhCLENBQW9CLGlCQUFwQixFQUNDO0FBQUEsVUFBQSxLQUFBLEVBQU8sUUFBUDtBQUFBLFVBQ0EsYUFBQSxFQUFlLGlCQURmO0FBQUEsVUFFQSxnQkFBQSxFQUFrQixnQkFGbEI7U0FERCxFQVhXO01BQUEsQ0FUWixDQUFBOztBQUFBLGlDQXlCQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ1AsUUFBQSxJQUFDLENBQUEsMkJBQUQsR0FBK0IsSUFBQyxDQUFBLFdBQVcsQ0FBQyxHQUFiLENBQWlCLGNBQWpCLENBQWdDLENBQUMsR0FBakMsQ0FBcUMsaUJBQXJDLENBQS9CLENBQUE7ZUFDQSxJQUFDLENBQUEsVUFBVSxDQUFDLEtBQVosQ0FBa0IsSUFBQyxDQUFBLDJCQUEyQixDQUFDLE1BQS9DLEVBRk87TUFBQSxDQXpCUixDQUFBOztBQUFBLGlDQXVDQSxpQkFBQSxHQUFtQixTQUFBLEdBQUE7QUFDbEIsUUFBQSxJQUFDLENBQUEsVUFBVSxDQUFDLEdBQVosQ0FBZ0I7QUFBQSxVQUFBLFNBQUEsRUFBWSxTQUFBLEdBQVEsQ0FBdEMsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLEdBQW1CLENBQW1CLENBQXBCO1NBQWhCLENBQUEsQ0FBQTtlQUNBLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixjQUFqQixDQUFnQyxDQUFDLEdBQWpDLENBQXFDLGlCQUFyQyxDQUF1RCxDQUFDLEdBQXhELENBQTREO0FBQUEsVUFBQSxTQUFBLEVBQVksU0FBQSxHQUFRLENBQWxGLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixHQUFtQixDQUErRCxDQUFwQjtTQUE1RCxFQUZrQjtNQUFBLENBdkNuQixDQUFBOztBQUFBLGlDQTJDQSxvQkFBQSxHQUFzQixTQUFBLEdBQUE7QUFDckIsUUFBQSxJQUFDLENBQUEsVUFBVSxDQUFDLEdBQVosQ0FBQSxDQUFBLENBQUE7ZUFDQSxJQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUIsY0FBakIsQ0FBZ0MsQ0FBQyxHQUFqQyxDQUFxQyxpQkFBckMsQ0FBdUQsQ0FBQyxHQUF4RCxDQUFBLEVBRnFCO01BQUEsQ0EzQ3RCLENBQUE7O0FBQUEsaUNBK0NBLFVBQUEsR0FBWSxTQUFBLEdBQUEsQ0EvQ1osQ0FBQTs7QUFBQSxpQ0FnREEsYUFBQSxHQUFlLFNBQUEsR0FBQSxDQWhEZixDQUFBOzs4QkFBQTs7T0FEb0MsS0FBSyxDQUFDLHNCQUZiO0VBQUEsQ0FBL0IsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZF9lZGl0b3Ivdmlld3MvbGF5ZXJDaGlsZHNQYW5lbC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImFwcC5tb2R1bGUgJ0NhcmRFZGl0b3Iudmlld3MnLCAodmlld3MsIGFwcCkgLT5cblx0XG5cdGNsYXNzIHZpZXdzLkxheWVyQ2hpbGRzUGFuZWwgZXh0ZW5kcyB2aWV3cy5CYXNlVG9vbGJhclBhbmVsVmlld1xuXHRcdGxvZ2dpbmc6IG9mZlxuXG5cdFx0Y2xhc3NOYW1lOiAncm93IGxheWVyLWNoaWxkcydcblxuXHRcdGNoaWxkVmlldzogdmlld3MuTGF5ZXJDaGlsZFxuXG5cdFx0IyB1aTpcblx0XHQjIGV2ZW50czpcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRzdXBlclxuXHRcdFx0QGJpbmQgJ2FsbCcsIC0+XG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiTEFZRVIgQ0hJTERTIFBBTkVMIFZJRVc6XFx0XCIsIGFyZ3VtZW50cyBpZiBAbG9nZ2luZyBpcyBvblxuXG5cdFx0XHRAbGlzdGVuVG8gQGVkaXRvclN0YXRlLCAnY2hhbmdlJywgQHVwZGF0ZVxuXHRcdFx0IyBAbW9kZWwgPSBuZXcgQmFja2JvbmUuTW9kZWwoKVxuXHRcdFx0IyBjb25zb2xlLmxvZyBAZWRpdG9yU3RhdGUuZ2V0KCdjdXJyZW50TGF5ZXInKVxuXG5cdFx0XHRAY29sbGVjdGlvbiA9IG5ldyBCYWNrYm9uZS5Db2xsZWN0aW9uKClcblxuXHRcdFx0QHBhbmVsVmlld1N0YXRlLnNldCAndGVtcGxhdGVPcHRpb25zJyxcblx0XHRcdFx0dGl0bGU6ICfQpNC40LPRg9GA0YsnXG5cdFx0XHRcdGFkZEJ1dHRvblRleHQ6ICfQlNC+0LHQsNCy0LjRgtGMINGE0LjQs9GD0YDRgydcblx0XHRcdFx0cmVtb3ZlQnV0dG9uVGV4dDogJ9Cj0LTQsNC70LjRgtGMINGE0LjQs9GD0YDRgydcblxuXHRcdHVwZGF0ZTogPT5cblx0XHRcdEBjdXJyZW50TGF5ZXJTaGFwZUNvbGxlY3Rpb24gPSBAZWRpdG9yU3RhdGUuZ2V0KCdjdXJyZW50TGF5ZXInKS5nZXQoJ3NoYXBlQ29sbGVjdGlvbicpXG5cdFx0XHRAY29sbGVjdGlvbi5yZXNldCBAY3VycmVudExheWVyU2hhcGVDb2xsZWN0aW9uLm1vZGVsc1xuXHRcdFx0IyBAY29sbGVjdGlvbi5vbiAnYWRkJywgKG1vZGVsLCBjb2xsZWN0aW9uLCBvcHRpb25zKSAtPlxuXHRcdFx0IyBcdGN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvbi5hZGQgbW9kZWxcblx0XHRcdCMgXHRjb25zb2xlLndhcm4gYXJndW1lbnRzLCBjdXJyZW50TGF5ZXJTaGFwZUNvbGxlY3Rpb25cblx0XHRcdCMgQGNvbGxlY3Rpb24ub24gJ3JlbW92ZScsIChtb2RlbCwgY29sbGVjdGlvbiwgb3B0aW9ucykgLT5cblx0XHRcdCMgXHRjdXJyZW50TGF5ZXJTaGFwZUNvbGxlY3Rpb24ucG9wKClcblx0XHRcdCMgXHRjb25zb2xlLndhcm4gYXJndW1lbnRzLCBjdXJyZW50TGF5ZXJTaGFwZUNvbGxlY3Rpb25cblxuXHRcdCMgYWRkVG9DdXJyZW50TGF5ZXJTaGFwZUNvbGxlY3Rpb246IChtb2RlbCwgY29sbGVjdGlvbiwgb3B0aW9ucykgPT5cblx0XHQjIFx0QGN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvbi5hZGQgbW9kZWxcblx0XHQjIHBvcEZyb21DdXJyZW50TGF5ZXJTaGFwZUNvbGxlY3Rpb246IChtb2RlbCwgY29sbGVjdGlvbiwgb3B0aW9ucykgPT5cblx0XHQjIFx0QGN1cnJlbnRMYXllclNoYXBlQ29sbGVjdGlvbi5wb3AoKVxuXHRcdG9uQWRkQ2hpbGRDbGlja2VkOiA9PlxuXHRcdFx0QGNvbGxlY3Rpb24uYWRkIHNoYXBlTmFtZTogXCLQpNC40LPRg9GA0LAgI3sgQGNvbGxlY3Rpb24ubGVuZ3RoKzEgfVwiXG5cdFx0XHRAZWRpdG9yU3RhdGUuZ2V0KCdjdXJyZW50TGF5ZXInKS5nZXQoJ3NoYXBlQ29sbGVjdGlvbicpLmFkZCBzaGFwZU5hbWU6IFwi0KTQuNCz0YPRgNCwICN7IEBjb2xsZWN0aW9uLmxlbmd0aCsxIH1cIlxuXG5cdFx0b25SZW1vdmVDaGlsZENraWNrZWQ6ID0+XG5cdFx0XHRAY29sbGVjdGlvbi5wb3AoKVxuXHRcdFx0QGVkaXRvclN0YXRlLmdldCgnY3VycmVudExheWVyJykuZ2V0KCdzaGFwZUNvbGxlY3Rpb24nKS5wb3AoKVxuXG5cdFx0b25BZGRDaGlsZDogPT5cblx0XHRvblJlbW92ZUNoaWxkOiA9PlxuIl19