(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.module('CardEditor.views', function(views, app) {
    return views.BackgroundsPanel = (function(_super) {
      __extends(BackgroundsPanel, _super);

      function BackgroundsPanel() {
        this.template = __bind(this.template, this);
        return BackgroundsPanel.__super__.constructor.apply(this, arguments);
      }

      BackgroundsPanel.prototype.logging = false;

      BackgroundsPanel.prototype.className = 'backgrounds';

      BackgroundsPanel.prototype.template = function() {
        return templatizer.cardEditor.toolbar.backgrounds(this.panelViewState.attributes);
      };

      BackgroundsPanel.prototype.initialize = function() {
        BackgroundsPanel.__super__.initialize.apply(this, arguments);
        console.log(app.module('CardEditor.models'));
        return this.panelViewState.set({
          title: 'Фоны',
          gotBody: false
        });
      };

      return BackgroundsPanel;

    })(views._BaseToolbarPanelView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2JhY2tncm91bmRzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O21TQUFBOztBQUFBLEVBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVyxrQkFBWCxFQUErQixTQUFDLEtBQUQsRUFBUSxHQUFSLEdBQUE7V0FFeEIsS0FBSyxDQUFDO0FBQ1gseUNBQUEsQ0FBQTs7Ozs7T0FBQTs7QUFBQSxpQ0FBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLGlDQUVBLFNBQUEsR0FBVyxhQUZYLENBQUE7O0FBQUEsaUNBV0EsUUFBQSxHQUFVLFNBQUEsR0FBQTtlQUNULFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQS9CLENBQTJDLElBQUMsQ0FBQSxjQUFjLENBQUMsVUFBM0QsRUFEUztNQUFBLENBWFYsQ0FBQTs7QUFBQSxpQ0FjQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1gsUUFBQSxrREFBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLFFBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxHQUFHLENBQUMsTUFBSixDQUFXLG1CQUFYLENBQVosQ0FEQSxDQUFBO2VBRUEsSUFBQyxDQUFBLGNBQWMsQ0FBQyxHQUFoQixDQUNDO0FBQUEsVUFBQSxLQUFBLEVBQU8sTUFBUDtBQUFBLFVBQ0EsT0FBQSxFQUFTLEtBRFQ7U0FERCxFQUhXO01BQUEsQ0FkWixDQUFBOzs4QkFBQTs7T0FEb0MsS0FBSyxDQUFDLHVCQUZiO0VBQUEsQ0FBL0IsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZF9lZGl0b3Ivdmlld3MvYmFja2dyb3VuZHMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJhcHAubW9kdWxlICdDYXJkRWRpdG9yLnZpZXdzJywgKHZpZXdzLCBhcHApIC0+XG5cblx0Y2xhc3Mgdmlld3MuQmFja2dyb3VuZHNQYW5lbCBleHRlbmRzIHZpZXdzLl9CYXNlVG9vbGJhclBhbmVsVmlld1xuXHRcdGxvZ2dpbmc6IG9mZlxuXG5cdFx0Y2xhc3NOYW1lOiAnYmFja2dyb3VuZHMnXG5cblx0XHQjIGNoaWxkVmlldzogdmlld3MuSWNvblxuXG5cdFx0IyB1aTpcblx0XHQjIGV2ZW50czpcblx0XHQjIG9uU2hvdzogPT5cblx0XHQjIFx0aWYgQGxvZ2dpbmcgaXMgb24gdGhlbiBAYmluZCAnYWxsJywgLT4gY29uc29sZS5sb2cgXCJJQ09OUyBQQU5FTCBWSUVXOlxcdFwiLCBhcmd1bWVudHNcblxuXHRcdHRlbXBsYXRlOiA9PlxuXHRcdFx0dGVtcGxhdGl6ZXIuY2FyZEVkaXRvci50b29sYmFyLmJhY2tncm91bmRzIEBwYW5lbFZpZXdTdGF0ZS5hdHRyaWJ1dGVzXG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0c3VwZXJcblx0XHRcdGNvbnNvbGUubG9nIGFwcC5tb2R1bGUgJ0NhcmRFZGl0b3IubW9kZWxzJ1xuXHRcdFx0QHBhbmVsVmlld1N0YXRlLnNldFxuXHRcdFx0XHR0aXRsZTogJ9Ck0L7QvdGLJ1xuXHRcdFx0XHRnb3RCb2R5OiBmYWxzZVxuIl19