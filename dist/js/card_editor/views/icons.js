(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.module('CardEditor.views', function(views, app) {
    views.Icon = (function(_super) {
      __extends(Icon, _super);

      function Icon() {
        this.template = __bind(this.template, this);
        return Icon.__super__.constructor.apply(this, arguments);
      }

      Icon.prototype.tagName = 'li';

      Icon.prototype.className = 'list-group-item';

      Icon.prototype.triggers = {
        'click': {
          event: 'click:icon'
        }
      };

      Icon.prototype.template = function() {
        return "" + (this.model.get('content')) + " " + (this.model.get('className'));
      };

      return Icon;

    })(Marionette.ItemView);
    return views.IconsPanel = (function(_super) {
      __extends(IconsPanel, _super);

      function IconsPanel() {
        return IconsPanel.__super__.constructor.apply(this, arguments);
      }

      IconsPanel.prototype.logging = false;

      IconsPanel.prototype.className = 'icons';

      IconsPanel.prototype.childView = views.Icon;

      IconsPanel.prototype.initialize = function() {
        IconsPanel.__super__.initialize.apply(this, arguments);
        this.panelViewState.set({
          title: 'Иконки',
          gotBody: false
        });
        this.collection = new Backbone.Collection;
        return this.collection.reset(appIconsData);
      };

      return IconsPanel;

    })(views._BaseToolbarPanelView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2ljb25zLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O21TQUFBOztBQUFBLEVBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVyxrQkFBWCxFQUErQixTQUFDLEtBQUQsRUFBUSxHQUFSLEdBQUE7QUFFOUIsSUFBTSxLQUFLLENBQUM7QUFDWCw2QkFBQSxDQUFBOzs7OztPQUFBOztBQUFBLHFCQUFBLE9BQUEsR0FBUyxJQUFULENBQUE7O0FBQUEscUJBQ0EsU0FBQSxHQUFXLGlCQURYLENBQUE7O0FBQUEscUJBTUEsUUFBQSxHQUNDO0FBQUEsUUFBQSxPQUFBLEVBQ0M7QUFBQSxVQUFBLEtBQUEsRUFBTyxZQUFQO1NBREQ7T0FQRCxDQUFBOztBQUFBLHFCQVVBLFFBQUEsR0FBVSxTQUFBLEdBQUE7ZUFDVCxFQUFBLEdBQUUsQ0FBSixJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxTQUFYLENBQUksQ0FBRixHQUEyQixHQUEzQixHQUE2QixDQUEvQixJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxXQUFYLENBQStCLEVBRHBCO01BQUEsQ0FWVixDQUFBOztrQkFBQTs7T0FEd0IsVUFBVSxDQUFDLFNBQXBDLENBQUE7V0FrQk0sS0FBSyxDQUFDO0FBQ1gsbUNBQUEsQ0FBQTs7OztPQUFBOztBQUFBLDJCQUFBLE9BQUEsR0FBUyxLQUFULENBQUE7O0FBQUEsMkJBRUEsU0FBQSxHQUFXLE9BRlgsQ0FBQTs7QUFBQSwyQkFJQSxTQUFBLEdBQVcsS0FBSyxDQUFDLElBSmpCLENBQUE7O0FBQUEsMkJBV0EsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNYLFFBQUEsNENBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxRQUNBLElBQUMsQ0FBQSxjQUFjLENBQUMsR0FBaEIsQ0FDQztBQUFBLFVBQUEsS0FBQSxFQUFPLFFBQVA7QUFBQSxVQUNBLE9BQUEsRUFBUyxLQURUO1NBREQsQ0FEQSxDQUFBO0FBQUEsUUFLQSxJQUFDLENBQUEsVUFBRCxHQUFjLEdBQUEsQ0FBQSxRQUFZLENBQUMsVUFMM0IsQ0FBQTtlQU1BLElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBWixDQUFrQixZQUFsQixFQVBXO01BQUEsQ0FYWixDQUFBOzt3QkFBQTs7T0FEOEIsS0FBSyxDQUFDLHVCQXBCUDtFQUFBLENBQS9CLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZWRpdG9yL3ZpZXdzL2ljb25zLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLm1vZHVsZSAnQ2FyZEVkaXRvci52aWV3cycsICh2aWV3cywgYXBwKSAtPlxuXG5cdGNsYXNzIHZpZXdzLkljb24gZXh0ZW5kcyBNYXJpb25ldHRlLkl0ZW1WaWV3XG5cdFx0dGFnTmFtZTogJ2xpJ1xuXHRcdGNsYXNzTmFtZTogJ2xpc3QtZ3JvdXAtaXRlbSdcblx0XHRcblx0XHQjIGV2ZW50czpcblx0XHQjIFx0J2NsaWNrJzogJ29uSWNvbkNsaWNrZWQnXG5cblx0XHR0cmlnZ2Vyczpcblx0XHRcdCdjbGljayc6XG5cdFx0XHRcdGV2ZW50OiAnY2xpY2s6aWNvbidcblxuXHRcdHRlbXBsYXRlOiA9PlxuXHRcdFx0XCIjeyBAbW9kZWwuZ2V0KCdjb250ZW50JykgfSAjeyBAbW9kZWwuZ2V0KCdjbGFzc05hbWUnKSB9XCJcblxuXHRcdCMgb25JY29uQ2xpY2tlZDogPT5cblx0XHQjIFx0Y29uc29sZS53YXJuICdpY29uJywgQG1vZGVsLmF0dHJpYnV0ZXNcblxuXHRcblx0Y2xhc3Mgdmlld3MuSWNvbnNQYW5lbCBleHRlbmRzIHZpZXdzLl9CYXNlVG9vbGJhclBhbmVsVmlld1xuXHRcdGxvZ2dpbmc6IG9mZlxuXG5cdFx0Y2xhc3NOYW1lOiAnaWNvbnMnXG5cblx0XHRjaGlsZFZpZXc6IHZpZXdzLkljb25cblxuXHRcdCMgdWk6XG5cdFx0IyBldmVudHM6XG5cdFx0IyBvblNob3c6ID0+XG5cdFx0IyBcdGlmIEBsb2dnaW5nIGlzIG9uIHRoZW4gQGJpbmQgJ2FsbCcsIC0+IGNvbnNvbGUubG9nIFwiSUNPTlMgUEFORUwgVklFVzpcXHRcIiwgYXJndW1lbnRzXG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0c3VwZXJcblx0XHRcdEBwYW5lbFZpZXdTdGF0ZS5zZXRcblx0XHRcdFx0dGl0bGU6ICfQmNC60L7QvdC60LgnXG5cdFx0XHRcdGdvdEJvZHk6IGZhbHNlXG5cblx0XHRcdEBjb2xsZWN0aW9uID0gbmV3IEJhY2tib25lLkNvbGxlY3Rpb25cblx0XHRcdEBjb2xsZWN0aW9uLnJlc2V0IGFwcEljb25zRGF0YVxuIl19