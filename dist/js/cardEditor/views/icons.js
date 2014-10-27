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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRFZGl0b3Ivdmlld3MvaWNvbnMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxHQUFHLENBQUMsTUFBSixDQUFXLGtCQUFYLEVBQStCLFNBQUMsS0FBRCxFQUFRLEdBQVIsR0FBQTtBQUU5QixJQUFNLEtBQUssQ0FBQztBQUNYLDZCQUFBLENBQUE7Ozs7O09BQUE7O0FBQUEscUJBQUEsT0FBQSxHQUFTLElBQVQsQ0FBQTs7QUFBQSxxQkFDQSxTQUFBLEdBQVcsaUJBRFgsQ0FBQTs7QUFBQSxxQkFNQSxRQUFBLEdBQ0M7QUFBQSxRQUFBLE9BQUEsRUFDQztBQUFBLFVBQUEsS0FBQSxFQUFPLFlBQVA7U0FERDtPQVBELENBQUE7O0FBQUEscUJBVUEsUUFBQSxHQUFVLFNBQUEsR0FBQTtlQUNULEVBQUEsR0FBRSxDQUFKLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFNBQVgsQ0FBSSxDQUFGLEdBQTJCLEdBQTNCLEdBQTZCLENBQS9CLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLFdBQVgsQ0FBK0IsRUFEcEI7TUFBQSxDQVZWLENBQUE7O2tCQUFBOztPQUR3QixVQUFVLENBQUMsU0FBcEMsQ0FBQTtXQWtCTSxLQUFLLENBQUM7QUFDWCxtQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsMkJBQUEsT0FBQSxHQUFTLEtBQVQsQ0FBQTs7QUFBQSwyQkFFQSxTQUFBLEdBQVcsT0FGWCxDQUFBOztBQUFBLDJCQUlBLFNBQUEsR0FBVyxLQUFLLENBQUMsSUFKakIsQ0FBQTs7QUFBQSwyQkFXQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1gsUUFBQSw0Q0FBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLGNBQWMsQ0FBQyxHQUFoQixDQUNDO0FBQUEsVUFBQSxLQUFBLEVBQU8sUUFBUDtBQUFBLFVBQ0EsT0FBQSxFQUFTLEtBRFQ7U0FERCxDQURBLENBQUE7QUFBQSxRQUtBLElBQUMsQ0FBQSxVQUFELEdBQWMsR0FBQSxDQUFBLFFBQVksQ0FBQyxVQUwzQixDQUFBO2VBTUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxLQUFaLENBQWtCLFlBQWxCLEVBUFc7TUFBQSxDQVhaLENBQUE7O3dCQUFBOztPQUQ4QixLQUFLLENBQUMsdUJBcEJQO0VBQUEsQ0FBL0IsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZEVkaXRvci92aWV3cy9pY29ucy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImFwcC5tb2R1bGUgJ0NhcmRFZGl0b3Iudmlld3MnLCAodmlld3MsIGFwcCkgLT5cblxuXHRjbGFzcyB2aWV3cy5JY29uIGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlld1xuXHRcdHRhZ05hbWU6ICdsaSdcblx0XHRjbGFzc05hbWU6ICdsaXN0LWdyb3VwLWl0ZW0nXG5cdFx0XG5cdFx0IyBldmVudHM6XG5cdFx0IyBcdCdjbGljayc6ICdvbkljb25DbGlja2VkJ1xuXG5cdFx0dHJpZ2dlcnM6XG5cdFx0XHQnY2xpY2snOlxuXHRcdFx0XHRldmVudDogJ2NsaWNrOmljb24nXG5cblx0XHR0ZW1wbGF0ZTogPT5cblx0XHRcdFwiI3sgQG1vZGVsLmdldCgnY29udGVudCcpIH0gI3sgQG1vZGVsLmdldCgnY2xhc3NOYW1lJykgfVwiXG5cblx0XHQjIG9uSWNvbkNsaWNrZWQ6ID0+XG5cdFx0IyBcdGNvbnNvbGUud2FybiAnaWNvbicsIEBtb2RlbC5hdHRyaWJ1dGVzXG5cblx0XG5cdGNsYXNzIHZpZXdzLkljb25zUGFuZWwgZXh0ZW5kcyB2aWV3cy5fQmFzZVRvb2xiYXJQYW5lbFZpZXdcblx0XHRsb2dnaW5nOiBvZmZcblxuXHRcdGNsYXNzTmFtZTogJ2ljb25zJ1xuXG5cdFx0Y2hpbGRWaWV3OiB2aWV3cy5JY29uXG5cblx0XHQjIHVpOlxuXHRcdCMgZXZlbnRzOlxuXHRcdCMgb25TaG93OiA9PlxuXHRcdCMgXHRpZiBAbG9nZ2luZyBpcyBvbiB0aGVuIEBiaW5kICdhbGwnLCAtPiBjb25zb2xlLmxvZyBcIklDT05TIFBBTkVMIFZJRVc6XFx0XCIsIGFyZ3VtZW50c1xuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdHN1cGVyXG5cdFx0XHRAcGFuZWxWaWV3U3RhdGUuc2V0XG5cdFx0XHRcdHRpdGxlOiAn0JjQutC+0L3QutC4J1xuXHRcdFx0XHRnb3RCb2R5OiBmYWxzZVxuXG5cdFx0XHRAY29sbGVjdGlvbiA9IG5ldyBCYWNrYm9uZS5Db2xsZWN0aW9uXG5cdFx0XHRAY29sbGVjdGlvbi5yZXNldCBhcHBJY29uc0RhdGFcbiJdfQ==