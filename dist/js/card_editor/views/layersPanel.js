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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2xheWVyc1BhbmVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O21TQUFBOztBQUFBLEVBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVyxrQkFBWCxFQUErQixTQUFDLEtBQUQsRUFBUSxHQUFSLEdBQUE7V0FFeEIsS0FBSyxDQUFDO0FBQ1gsb0NBQUEsQ0FBQTs7Ozs7Ozs7T0FBQTs7QUFBQSw0QkFBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLDRCQUVBLFNBQUEsR0FBVyxRQUZYLENBQUE7O0FBQUEsNEJBSUEsU0FBQSxHQUFXLEtBQUssQ0FBQyxLQUpqQixDQUFBOztBQUFBLDRCQVNBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFBLDZDQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxTQUFBLEdBQUE7QUFDWixVQUFBLElBQWlELElBQUMsQ0FBQSxPQUFELEtBQVksSUFBN0Q7bUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxTQUFwQyxFQUFBO1dBRFk7UUFBQSxDQUFiLENBREEsQ0FBQTtBQUFBLFFBS0EsSUFBQyxDQUFBLFVBQUQsR0FBYyxJQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUIsaUJBQWpCLENBTGQsQ0FBQTtlQU1BLElBQUMsQ0FBQSxjQUFjLENBQUMsR0FBaEIsQ0FBb0IsaUJBQXBCLEVBQ0M7QUFBQSxVQUFBLEtBQUEsRUFBTyxnQ0FBUDtBQUFBLFVBQ0EsYUFBQSxFQUFlLGVBRGY7QUFBQSxVQUVBLGdCQUFBLEVBQWtCLGNBRmxCO1NBREQsRUFQVztNQUFBLENBVFosQ0FBQTs7QUFBQSw0QkFxQkEsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO2VBQ2xCLElBQUMsQ0FBQSxVQUFVLENBQUMsR0FBWixDQUFnQjtBQUFBLFVBQUEsU0FBQSxFQUFZLE9BQUEsR0FBOUIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFNO1NBQWhCLEVBRGtCO01BQUEsQ0FyQm5CLENBQUE7O0FBQUEsNEJBd0JBLG9CQUFBLEdBQXNCLFNBQUEsR0FBQTtBQUNyQixRQUFBLElBQUcsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLEdBQXFCLENBQXhCO0FBQ0MsVUFBQSxLQUFBLENBQU0sMEJBQU4sQ0FBQSxDQUFBO0FBQ0EsaUJBQU8sS0FBUCxDQUZEO1NBQUE7ZUFHQSx1REFBQSxTQUFBLEVBSnFCO01BQUEsQ0F4QnRCLENBQUE7O0FBQUEsNEJBOEJBLFVBQUEsR0FBWSxTQUFDLEtBQUQsR0FBQSxDQTlCWixDQUFBOztBQUFBLDRCQStCQSxhQUFBLEdBQWUsU0FBQSxHQUFBLENBL0JmLENBQUE7O3lCQUFBOztPQUQrQixLQUFLLENBQUMsc0JBRlI7RUFBQSxDQUEvQixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkX2VkaXRvci92aWV3cy9sYXllcnNQYW5lbC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImFwcC5tb2R1bGUgJ0NhcmRFZGl0b3Iudmlld3MnLCAodmlld3MsIGFwcCkgLT5cblx0XG5cdGNsYXNzIHZpZXdzLkxheWVyc1BhbmVsIGV4dGVuZHMgdmlld3MuQmFzZVRvb2xiYXJQYW5lbFZpZXdcblx0XHRsb2dnaW5nOiBvZmZcblxuXHRcdGNsYXNzTmFtZTogJ2xheWVycydcblxuXHRcdGNoaWxkVmlldzogdmlld3MuTGF5ZXJcblxuXHRcdCMgdWk6XG5cdFx0IyBldmVudHM6XG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0c3VwZXJcblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkxBWUVSUyBQQU5FTCBWSUVXOlxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dpbmcgaXMgb25cblxuXHRcdFx0IyBAbW9kZWwgPSBuZXcgQmFja2JvbmUuTW9kZWxcblx0XHRcdEBjb2xsZWN0aW9uID0gQGVkaXRvck1vZGVsLmdldCAnbGF5ZXJDb2xsZWN0aW9uJ1xuXHRcdFx0QHBhbmVsVmlld1N0YXRlLnNldCAndGVtcGxhdGVPcHRpb25zJyxcblx0XHRcdFx0dGl0bGU6ICfQodC70L7QuCAoINC/0L7QutCwINGC0L7Qu9GM0LrQviDQvdCwINC/0LXRgNCy0L7QvCApJ1xuXHRcdFx0XHRhZGRCdXR0b25UZXh0OiAn0JTQvtCx0LDQstC40YLRjCDRgdC70L7QuSdcblx0XHRcdFx0cmVtb3ZlQnV0dG9uVGV4dDogJ9Cj0LTQsNC70LjRgtGMINGB0LvQvtC5J1xuXG5cdFx0b25BZGRDaGlsZENsaWNrZWQ6ID0+XG5cdFx0XHRAY29sbGVjdGlvbi5hZGQgbGF5ZXJOYW1lOiBcItCh0LvQvtC5ICN7IEBjb2xsZWN0aW9uLmxlbmd0aCB9XCJcblxuXHRcdG9uUmVtb3ZlQ2hpbGRDa2lja2VkOiA9PlxuXHRcdFx0aWYgQGNvbGxlY3Rpb24ubGVuZ3RoIDwgM1xuXHRcdFx0XHRhbGVydCAn0J3QtdC+0LHRhdC+0LTQuNC8INGF0L7RgtGPINCx0YsgMSDRgdC70L7QuSdcblx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0XHRzdXBlclxuXG5cdFx0b25BZGRDaGlsZDogKGxheWVyKSA9PlxuXHRcdG9uUmVtb3ZlQ2hpbGQ6ID0+XG4iXX0=