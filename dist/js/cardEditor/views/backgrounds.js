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
          title: 'Фон',
          gotBody: false
        });
      };

      return BackgroundsPanel;

    })(views._BaseToolbarPanelView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRFZGl0b3Ivdmlld3MvYmFja2dyb3VuZHMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxHQUFHLENBQUMsTUFBSixDQUFXLGtCQUFYLEVBQStCLFNBQUMsS0FBRCxFQUFRLEdBQVIsR0FBQTtXQUV4QixLQUFLLENBQUM7QUFDWCx5Q0FBQSxDQUFBOzs7OztPQUFBOztBQUFBLGlDQUFBLE9BQUEsR0FBUyxLQUFULENBQUE7O0FBQUEsaUNBRUEsU0FBQSxHQUFXLGFBRlgsQ0FBQTs7QUFBQSxpQ0FXQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2VBQ1QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBL0IsQ0FBMkMsSUFBQyxDQUFBLGNBQWMsQ0FBQyxVQUEzRCxFQURTO01BQUEsQ0FYVixDQUFBOztBQUFBLGlDQWNBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFBLGtEQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsUUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLEdBQUcsQ0FBQyxNQUFKLENBQVcsbUJBQVgsQ0FBWixDQURBLENBQUE7ZUFFQSxJQUFDLENBQUEsY0FBYyxDQUFDLEdBQWhCLENBQ0M7QUFBQSxVQUFBLEtBQUEsRUFBTyxLQUFQO0FBQUEsVUFDQSxPQUFBLEVBQVMsS0FEVDtTQURELEVBSFc7TUFBQSxDQWRaLENBQUE7OzhCQUFBOztPQURvQyxLQUFLLENBQUMsdUJBRmI7RUFBQSxDQUEvQixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkRWRpdG9yL3ZpZXdzL2JhY2tncm91bmRzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLm1vZHVsZSAnQ2FyZEVkaXRvci52aWV3cycsICh2aWV3cywgYXBwKSAtPlxuXG5cdGNsYXNzIHZpZXdzLkJhY2tncm91bmRzUGFuZWwgZXh0ZW5kcyB2aWV3cy5fQmFzZVRvb2xiYXJQYW5lbFZpZXdcblx0XHRsb2dnaW5nOiBvZmZcblxuXHRcdGNsYXNzTmFtZTogJ2JhY2tncm91bmRzJ1xuXG5cdFx0IyBjaGlsZFZpZXc6IHZpZXdzLkljb25cblxuXHRcdCMgdWk6XG5cdFx0IyBldmVudHM6XG5cdFx0IyBvblNob3c6ID0+XG5cdFx0IyBcdGlmIEBsb2dnaW5nIGlzIG9uIHRoZW4gQGJpbmQgJ2FsbCcsIC0+IGNvbnNvbGUubG9nIFwiSUNPTlMgUEFORUwgVklFVzpcXHRcIiwgYXJndW1lbnRzXG5cblx0XHR0ZW1wbGF0ZTogPT5cblx0XHRcdHRlbXBsYXRpemVyLmNhcmRFZGl0b3IudG9vbGJhci5iYWNrZ3JvdW5kcyBAcGFuZWxWaWV3U3RhdGUuYXR0cmlidXRlc1xuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdHN1cGVyXG5cdFx0XHRjb25zb2xlLmxvZyBhcHAubW9kdWxlICdDYXJkRWRpdG9yLm1vZGVscydcblx0XHRcdEBwYW5lbFZpZXdTdGF0ZS5zZXRcblx0XHRcdFx0dGl0bGU6ICfQpNC+0L0nXG5cdFx0XHRcdGdvdEJvZHk6IGZhbHNlXG4iXX0=