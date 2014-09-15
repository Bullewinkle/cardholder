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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyc1BhbmVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O21TQUFBOztBQUFBLEVBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVyxrQkFBWCxFQUErQixTQUFDLEtBQUQsRUFBUSxHQUFSLEdBQUE7V0FDeEIsS0FBSyxDQUFDO0FBQ1gsb0NBQUEsQ0FBQTs7Ozs7Ozs7T0FBQTs7QUFBQSw0QkFBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLDRCQUVBLFNBQUEsR0FBVyxRQUZYLENBQUE7O0FBQUEsNEJBSUEsU0FBQSxHQUFXLEtBQUssQ0FBQyxLQUpqQixDQUFBOztBQUFBLDRCQVNBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFBLDZDQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxTQUFBLEdBQUE7QUFDWixVQUFBLElBQWlELElBQUMsQ0FBQSxPQUFELEtBQVksSUFBN0Q7bUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxTQUFwQyxFQUFBO1dBRFk7UUFBQSxDQUFiLENBREEsQ0FBQTtBQUFBLFFBS0EsSUFBQyxDQUFBLFVBQUQsR0FBYyxJQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUIsaUJBQWpCLENBTGQsQ0FBQTtlQU1BLElBQUMsQ0FBQSxjQUFjLENBQUMsR0FBaEIsQ0FDQztBQUFBLFVBQUEsS0FBQSxFQUFPLGdDQUFQO0FBQUEsVUFDQSxnQkFBQSxFQUFrQixJQURsQjtBQUFBLFVBRUEsYUFBQSxFQUFlLGVBRmY7QUFBQSxVQUdBLGdCQUFBLEVBQWtCLGNBSGxCO1NBREQsRUFQVztNQUFBLENBVFosQ0FBQTs7QUFBQSw0QkFzQkEsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO2VBQ2xCLElBQUMsQ0FBQSxVQUFVLENBQUMsR0FBWixDQUFnQjtBQUFBLFVBQUEsU0FBQSxFQUFZLE9BQUEsR0FBOUIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFNO1NBQWhCLEVBRGtCO01BQUEsQ0F0Qm5CLENBQUE7O0FBQUEsNEJBeUJBLG9CQUFBLEdBQXNCLFNBQUEsR0FBQTtBQUNyQixRQUFBLElBQUcsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLEdBQXFCLENBQXhCO0FBQ0MsVUFBQSxLQUFBLENBQU0sMEJBQU4sQ0FBQSxDQUFBO0FBQ0EsaUJBQU8sS0FBUCxDQUZEO1NBQUE7ZUFHQSx1REFBQSxTQUFBLEVBSnFCO01BQUEsQ0F6QnRCLENBQUE7O0FBQUEsNEJBK0JBLFVBQUEsR0FBWSxTQUFDLEtBQUQsR0FBQSxDQS9CWixDQUFBOztBQUFBLDRCQWdDQSxhQUFBLEdBQWUsU0FBQSxHQUFBLENBaENmLENBQUE7O3lCQUFBOztPQUQrQixLQUFLLENBQUMsdUJBRFI7RUFBQSxDQUEvQixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkX2VkaXRvci92aWV3cy9sYXllcnNQYW5lbC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImFwcC5tb2R1bGUgJ0NhcmRFZGl0b3Iudmlld3MnLCAodmlld3MsIGFwcCkgLT5cblx0Y2xhc3Mgdmlld3MuTGF5ZXJzUGFuZWwgZXh0ZW5kcyB2aWV3cy5fQmFzZVRvb2xiYXJQYW5lbFZpZXdcblx0XHRsb2dnaW5nOiBvZmZcblxuXHRcdGNsYXNzTmFtZTogJ2xheWVycydcblxuXHRcdGNoaWxkVmlldzogdmlld3MuTGF5ZXJcblxuXHRcdCMgdWk6XG5cdFx0IyBldmVudHM6XG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0c3VwZXJcblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkxBWUVSUyBQQU5FTCBWSUVXOlxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dpbmcgaXMgb25cblxuXHRcdFx0IyBAbW9kZWwgPSBuZXcgQmFja2JvbmUuTW9kZWxcblx0XHRcdEBjb2xsZWN0aW9uID0gQGVkaXRvck1vZGVsLmdldCAnbGF5ZXJDb2xsZWN0aW9uJ1xuXHRcdFx0QHBhbmVsVmlld1N0YXRlLnNldFxuXHRcdFx0XHR0aXRsZTogJ9Ch0LvQvtC4ICgg0L/QvtC60LAg0YLQvtC70YzQutC+INC90LAg0L/QtdGA0LLQvtC8ICknXG5cdFx0XHRcdGFkZFJlbW92ZUJ1dHRvbnM6IHRydWVcblx0XHRcdFx0YWRkQnV0dG9uVGV4dDogJ9CU0L7QsdCw0LLQuNGC0Ywg0YHQu9C+0LknXG5cdFx0XHRcdHJlbW92ZUJ1dHRvblRleHQ6ICfQo9C00LDQu9C40YLRjCDRgdC70L7QuSdcblxuXHRcdG9uQWRkQ2hpbGRDbGlja2VkOiA9PlxuXHRcdFx0QGNvbGxlY3Rpb24uYWRkIGxheWVyTmFtZTogXCLQodC70L7QuSAjeyBAY29sbGVjdGlvbi5sZW5ndGggfVwiXG5cblx0XHRvblJlbW92ZUNoaWxkQ2tpY2tlZDogPT5cblx0XHRcdGlmIEBjb2xsZWN0aW9uLmxlbmd0aCA8IDNcblx0XHRcdFx0YWxlcnQgJ9Cd0LXQvtCx0YXQvtC00LjQvCDRhdC+0YLRjyDQsdGLIDEg0YHQu9C+0LknXG5cdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0c3VwZXJcblxuXHRcdG9uQWRkQ2hpbGQ6IChsYXllcikgPT5cblx0XHRvblJlbW92ZUNoaWxkOiA9PlxuIl19