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

      LayersPanel.prototype.className = 'row layers';

      LayersPanel.prototype.childView = views.Layer;

      LayersPanel.prototype.initialize = function() {
        LayersPanel.__super__.initialize.apply(this, arguments);
        this.bind('all', function() {
          if (this.logging === true) {
            return console.log("LAYERS PANEL VIEW:\t", arguments);
          }
        });
        this.collection = this.editorModel.get('layerCollection');
        return this.panelViewState.set('templateOptions', {
          title: 'Слои ( пока только на первом )',
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

    })(views.BaseToolbarPanelView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyc1BhbmVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O21TQUFBOztBQUFBLEVBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVyxrQkFBWCxFQUErQixTQUFDLEtBQUQsRUFBUSxHQUFSLEdBQUE7V0FFeEIsS0FBSyxDQUFDO0FBQ1gsb0NBQUEsQ0FBQTs7Ozs7Ozs7T0FBQTs7QUFBQSw0QkFBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLDRCQUVBLFNBQUEsR0FBVyxZQUZYLENBQUE7O0FBQUEsNEJBSUEsU0FBQSxHQUFXLEtBQUssQ0FBQyxLQUpqQixDQUFBOztBQUFBLDRCQVNBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFBLDZDQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxTQUFBLEdBQUE7QUFDWixVQUFBLElBQWlELElBQUMsQ0FBQSxPQUFELEtBQVksSUFBN0Q7bUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxTQUFwQyxFQUFBO1dBRFk7UUFBQSxDQUFiLENBREEsQ0FBQTtBQUFBLFFBS0EsSUFBQyxDQUFBLFVBQUQsR0FBYyxJQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUIsaUJBQWpCLENBTGQsQ0FBQTtlQU1BLElBQUMsQ0FBQSxjQUFjLENBQUMsR0FBaEIsQ0FBb0IsaUJBQXBCLEVBQ0M7QUFBQSxVQUFBLEtBQUEsRUFBTyxnQ0FBUDtBQUFBLFVBQ0EsYUFBQSxFQUFlLGVBRGY7QUFBQSxVQUVBLGdCQUFBLEVBQWtCLGNBRmxCO1NBREQsRUFQVztNQUFBLENBVFosQ0FBQTs7QUFBQSw0QkFxQkEsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO2VBQ2xCLElBQUMsQ0FBQSxVQUFVLENBQUMsR0FBWixDQUFnQjtBQUFBLFVBQUEsU0FBQSxFQUFZLE9BQUEsR0FBOUIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFNO1NBQWhCLEVBRGtCO01BQUEsQ0FyQm5CLENBQUE7O0FBQUEsNEJBd0JBLG9CQUFBLEdBQXNCLFNBQUEsR0FBQTtBQUNyQixRQUFBLElBQUcsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLEdBQXFCLENBQXhCO0FBQ0MsVUFBQSxLQUFBLENBQU0sMEJBQU4sQ0FBQSxDQUFBO0FBQ0EsaUJBQU8sS0FBUCxDQUZEO1NBQUE7ZUFHQSx1REFBQSxTQUFBLEVBSnFCO01BQUEsQ0F4QnRCLENBQUE7O0FBQUEsNEJBOEJBLFVBQUEsR0FBWSxTQUFDLEtBQUQsR0FBQSxDQTlCWixDQUFBOztBQUFBLDRCQStCQSxhQUFBLEdBQWUsU0FBQSxHQUFBLENBL0JmLENBQUE7O3lCQUFBOztPQUQrQixLQUFLLENBQUMsc0JBRlI7RUFBQSxDQUEvQixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkX2VkaXRvci92aWV3cy9sYXllcnNQYW5lbC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImFwcC5tb2R1bGUgJ0NhcmRFZGl0b3Iudmlld3MnLCAodmlld3MsIGFwcCkgLT5cblx0XG5cdGNsYXNzIHZpZXdzLkxheWVyc1BhbmVsIGV4dGVuZHMgdmlld3MuQmFzZVRvb2xiYXJQYW5lbFZpZXdcblx0XHRsb2dnaW5nOiBvZmZcblxuXHRcdGNsYXNzTmFtZTogJ3JvdyBsYXllcnMnXG5cblx0XHRjaGlsZFZpZXc6IHZpZXdzLkxheWVyXG5cblx0XHQjIHVpOlxuXHRcdCMgZXZlbnRzOlxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdHN1cGVyXG5cdFx0XHRAYmluZCAnYWxsJywgLT5cblx0XHRcdFx0Y29uc29sZS5sb2cgXCJMQVlFUlMgUEFORUwgVklFVzpcXHRcIiwgYXJndW1lbnRzIGlmIEBsb2dnaW5nIGlzIG9uXG5cblx0XHRcdCMgQG1vZGVsID0gbmV3IEJhY2tib25lLk1vZGVsXG5cdFx0XHRAY29sbGVjdGlvbiA9IEBlZGl0b3JNb2RlbC5nZXQgJ2xheWVyQ29sbGVjdGlvbidcblx0XHRcdEBwYW5lbFZpZXdTdGF0ZS5zZXQgJ3RlbXBsYXRlT3B0aW9ucycsXG5cdFx0XHRcdHRpdGxlOiAn0KHQu9C+0LggKCDQv9C+0LrQsCDRgtC+0LvRjNC60L4g0L3QsCDQv9C10YDQstC+0LwgKSdcblx0XHRcdFx0YWRkQnV0dG9uVGV4dDogJ9CU0L7QsdCw0LLQuNGC0Ywg0YHQu9C+0LknXG5cdFx0XHRcdHJlbW92ZUJ1dHRvblRleHQ6ICfQo9C00LDQu9C40YLRjCDRgdC70L7QuSdcblxuXHRcdG9uQWRkQ2hpbGRDbGlja2VkOiA9PlxuXHRcdFx0QGNvbGxlY3Rpb24uYWRkIGxheWVyTmFtZTogXCLQodC70L7QuSAjeyBAY29sbGVjdGlvbi5sZW5ndGggfVwiXG5cblx0XHRvblJlbW92ZUNoaWxkQ2tpY2tlZDogPT5cblx0XHRcdGlmIEBjb2xsZWN0aW9uLmxlbmd0aCA8IDNcblx0XHRcdFx0YWxlcnQgJ9Cd0LXQvtCx0YXQvtC00LjQvCDRhdC+0YLRjyDQsdGLIDEg0YHQu9C+0LknXG5cdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0c3VwZXJcblxuXHRcdG9uQWRkQ2hpbGQ6IChsYXllcikgPT5cblx0XHRvblJlbW92ZUNoaWxkOiA9PlxuIl19