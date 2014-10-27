(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  app.module('CardEditor', function(CardEditor) {
    return this.addInitializer(function() {
      this.controller = new CardEditor.Controller();
      this.router = new CardEditor.Router({
        controller: this.controller
      });
      return this.cardEditorLayout = new CardEditor.CardEditorLayout();
    });
  });

  app.module('CardEditor.models', function(models, app) {
    console.log('1 common card view models');
    return models.PanelViewState = (function(_super) {
      __extends(PanelViewState, _super);

      function PanelViewState() {
        return PanelViewState.__super__.constructor.apply(this, arguments);
      }

      PanelViewState.prototype.defaults = {
        isOpened: true,
        isVisible: true,
        maxVisibleItems: 6,
        title: 'Какая-то панель',
        gotBody: true,
        addButtonText: 'Какая-то кнопка',
        removeButtonText: 'Какая-то кнопка'
      };

      return PanelViewState;

    })(Backbone.Model);
  });

  app.module('CardEditor.views', function(views, app) {
    var PanelViewState;
    console.log('2 common card view classes');
    PanelViewState = (function(_super) {
      __extends(PanelViewState, _super);

      function PanelViewState() {
        return PanelViewState.__super__.constructor.apply(this, arguments);
      }

      PanelViewState.prototype.defaults = {
        isOpened: true,
        isVisible: true,
        maxVisibleItems: 6,
        title: 'Какая-то панель',
        gotBody: true,
        addButtonText: 'Какая-то кнопка',
        removeButtonText: 'Какая-то кнопка'
      };

      return PanelViewState;

    })(Backbone.Model);
    return views._BaseToolbarPanelView = (function(_super) {
      __extends(_BaseToolbarPanelView, _super);

      function _BaseToolbarPanelView() {
        this.onRemoveChildCkicked = __bind(this.onRemoveChildCkicked, this);
        this.onAddChildClicked = __bind(this.onAddChildClicked, this);
        this.onMouseLeave = __bind(this.onMouseLeave, this);
        this.onMouseEnter = __bind(this.onMouseEnter, this);
        this.onScroll = __bind(this.onScroll, this);
        this.onCollapseToggle = __bind(this.onCollapseToggle, this);
        this.onShow = __bind(this.onShow, this);
        this.template = __bind(this.template, this);
        return _BaseToolbarPanelView.__super__.constructor.apply(this, arguments);
      }

      _BaseToolbarPanelView.prototype.logging = true;

      _BaseToolbarPanelView.prototype.ui = {
        'panel': '.panel',
        'childViewContainer': '.items-container',
        'collapseToggler': '.collapse-toggler',
        'addChild': '.add-child',
        'removeChild': '.remove-child'
      };

      _BaseToolbarPanelView.prototype.events = {
        'click @ui.collapseToggler': 'onCollapseToggle',
        'click @ui.addChild': 'onAddChildClicked',
        'click @ui.removeChild': 'onRemoveChildCkicked'
      };

      _BaseToolbarPanelView.prototype.childViewContainer = '.items-container';

      _BaseToolbarPanelView.prototype.panelViewState = new PanelViewState();

      _BaseToolbarPanelView.prototype.initialize = function(options) {
        if (options.template) {
          this.template = options.template;
        }
        this.editorState = options.state;
        return this.editorModel = options.model;
      };

      _BaseToolbarPanelView.prototype.template = function() {
        var options;
        options = this.panelViewState.attributes;
        console.log(options);
        return templatizer.cardEditor.toolbar.baseToolbarPanel(options);
      };

      _BaseToolbarPanelView.prototype.onShow = function() {
        this.ui.childViewContainer.sortable({
          containment: "parent"
        });
        return this.ui.childViewContainer.disableSelection();
      };

      _BaseToolbarPanelView.prototype.onCollapseToggle = function() {
        return this.ui.panel.toggleClass('is-collapsed');
      };

      _BaseToolbarPanelView.prototype.onScroll = function(ev) {
        return alert('hello')
			var $this = $(this),
			    scrollTop = this.scrollTop,
			    scrollHeight = this.scrollHeight,
			    height = $this.height(),
			    delta = ev.originalEvent.wheelDelta,
			    up = delta > 0;

			var prevent = function() {
			    ev.stopPropagation();
			    ev.preventDefault();
			    ev.returnValue = false;
			    return false;
			}

			if (!up && -delta > scrollHeight - height - scrollTop) {
			    // Scrolling down, but this will take us past the bottom.
			    $this.scrollTop(scrollHeight);
			    return prevent();
			} else if (up && delta > scrollTop) {
			    // Scrolling up, but this will take us past the top.
			    $this.scrollTop(0);
			    return prevent();
			};
      };

      _BaseToolbarPanelView.prototype.onMouseEnter = function(e) {};

      _BaseToolbarPanelView.prototype.onMouseLeave = function(e) {};

      _BaseToolbarPanelView.prototype.onAddChildClicked = function() {
        return this.collection.add({});
      };

      _BaseToolbarPanelView.prototype.onRemoveChildCkicked = function() {
        return this.collection.pop();
      };

      return _BaseToolbarPanelView;

    })(Marionette.CompositeView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRFZGl0b3IvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7c0ZBQUE7O0FBQUEsRUFBQSxHQUFHLENBQUMsTUFBSixDQUFXLFlBQVgsRUFBeUIsU0FBQyxVQUFELEdBQUE7V0FDeEIsSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsU0FBQSxHQUFBO0FBRWYsTUFBQSxJQUFDLENBQUEsVUFBRCxHQUFtQixJQUFBLFVBQVUsQ0FBQyxVQUFYLENBQUEsQ0FBbkIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE1BQUQsR0FBYyxJQUFBLFVBQVUsQ0FBQyxNQUFYLENBQWtCO0FBQUEsUUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBLFVBQWI7T0FBbEIsQ0FEZCxDQUFBO2FBRUEsSUFBQyxDQUFBLGdCQUFELEdBQXdCLElBQUEsVUFBVSxDQUFDLGdCQUFYLENBQUEsRUFKVDtJQUFBLENBQWhCLEVBRHdCO0VBQUEsQ0FBekIsQ0FBQSxDQUFBOztBQUFBLEVBU0EsR0FBRyxDQUFDLE1BQUosQ0FBVyxtQkFBWCxFQUFnQyxTQUFDLE1BQUQsRUFBUyxHQUFULEdBQUE7QUFDL0IsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFhLDJCQUFiLENBQUEsQ0FBQTtXQUVNLE1BQU0sQ0FBQztBQUNaLHVDQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSwrQkFBQSxRQUFBLEdBQ0M7QUFBQSxRQUFBLFFBQUEsRUFBVSxJQUFWO0FBQUEsUUFDQSxTQUFBLEVBQVcsSUFEWDtBQUFBLFFBRUEsZUFBQSxFQUFpQixDQUZqQjtBQUFBLFFBR0EsS0FBQSxFQUFPLGlCQUhQO0FBQUEsUUFJQSxPQUFBLEVBQVMsSUFKVDtBQUFBLFFBS0EsYUFBQSxFQUFlLGlCQUxmO0FBQUEsUUFNQSxnQkFBQSxFQUFrQixpQkFObEI7T0FERCxDQUFBOzs0QkFBQTs7T0FEbUMsUUFBUSxDQUFDLE9BSGQ7RUFBQSxDQUFoQyxDQVRBLENBQUE7O0FBQUEsRUF1QkEsR0FBRyxDQUFD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Q0F1RUEsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO2VBQ2xCLElBQUMsQ0FBQSxVQUFVLENBQUMsR0FBWixDQUFnQixFQUFoQixFQURrQjtNQUFBLENBdkVuQixDQUFBOztBQUFBLHNDQTBFQSxvQkFBQSxHQUFzQixTQUFBLEdBQUE7ZUFDckIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUFaLENBQUEsRUFEcUI7TUFBQSxDQTFFdEIsQ0FBQTs7bUNBQUE7O09BRHlDLFVBQVUsQ0FBQyxlQWJ2QjtFQUFBLENBQS9CLENBdkJBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkRWRpdG9yL2luZGV4LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLm1vZHVsZSAnQ2FyZEVkaXRvcicsIChDYXJkRWRpdG9yKSAtPlxuXHRAYWRkSW5pdGlhbGl6ZXIgLT5cblx0XHQjIEB2aWV3cyA9IHt9XG5cdFx0QGNvbnRyb2xsZXIgPSAgbmV3IENhcmRFZGl0b3IuQ29udHJvbGxlcigpXG5cdFx0QHJvdXRlciA9IG5ldyBDYXJkRWRpdG9yLlJvdXRlciBjb250cm9sbGVyOiBAY29udHJvbGxlclxuXHRcdEBjYXJkRWRpdG9yTGF5b3V0ID0gbmV3IENhcmRFZGl0b3IuQ2FyZEVkaXRvckxheW91dCgpXG5cblxuIyBjb21tb24gY2FyZCB2aWV3IG1vZGVsc1xuYXBwLm1vZHVsZSAnQ2FyZEVkaXRvci5tb2RlbHMnLCAobW9kZWxzLCBhcHApIC0+XG5cdGNvbnNvbGUubG9nICgnMSBjb21tb24gY2FyZCB2aWV3IG1vZGVscycpXG5cblx0Y2xhc3MgbW9kZWxzLlBhbmVsVmlld1N0YXRlIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblx0XHRkZWZhdWx0czpcblx0XHRcdGlzT3BlbmVkOiB0cnVlXG5cdFx0XHRpc1Zpc2libGU6IHRydWVcblx0XHRcdG1heFZpc2libGVJdGVtczogNlxuXHRcdFx0dGl0bGU6ICfQmtCw0LrQsNGPLdGC0L4g0L/QsNC90LXQu9GMJ1xuXHRcdFx0Z290Qm9keTogdHJ1ZVxuXHRcdFx0YWRkQnV0dG9uVGV4dDogJ9Ca0LDQutCw0Y8t0YLQviDQutC90L7Qv9C60LAnXG5cdFx0XHRyZW1vdmVCdXR0b25UZXh0OiAn0JrQsNC60LDRjy3RgtC+INC60L3QvtC/0LrQsCdcdFx0XG5cbiMgY29tbW9uIGNhcmQgdmlldyBjbGFzc2VzXG5hcHAubW9kdWxlICdDYXJkRWRpdG9yLnZpZXdzJywgKHZpZXdzLCBhcHApIC0+XG5cdGNvbnNvbGUubG9nICgnMiBjb21tb24gY2FyZCB2aWV3IGNsYXNzZXMnKVxuXG5cdGNsYXNzIFBhbmVsVmlld1N0YXRlIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblx0XHRkZWZhdWx0czpcblx0XHRcdGlzT3BlbmVkOiB0cnVlXG5cdFx0XHRpc1Zpc2libGU6IHRydWVcblx0XHRcdG1heFZpc2libGVJdGVtczogNlxuXHRcdFx0dGl0bGU6ICfQmtCw0LrQsNGPLdGC0L4g0L/QsNC90LXQu9GMJ1xuXHRcdFx0Z290Qm9keTogdHJ1ZVxuXHRcdFx0YWRkQnV0dG9uVGV4dDogJ9Ca0LDQutCw0Y8t0YLQviDQutC90L7Qv9C60LAnXG5cdFx0XHRyZW1vdmVCdXR0b25UZXh0OiAn0JrQsNC60LDRjy3RgtC+INC60L3QvtC/0LrQsCdcdFxuXG5cdGNsYXNzIHZpZXdzLl9CYXNlVG9vbGJhclBhbmVsVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29tcG9zaXRlVmlld1xuXHRcdGxvZ2dpbmc6IG9uXG5cblx0XHR1aTpcblx0XHRcdCdwYW5lbCc6ICcucGFuZWwnXG5cdFx0XHQnY2hpbGRWaWV3Q29udGFpbmVyJzogJy5pdGVtcy1jb250YWluZXInXG5cdFx0XHQnY29sbGFwc2VUb2dnbGVyJzogJy5jb2xsYXBzZS10b2dnbGVyJ1xuXHRcdFx0J2FkZENoaWxkJyA6ICcuYWRkLWNoaWxkJ1xuXHRcdFx0J3JlbW92ZUNoaWxkJyA6ICcucmVtb3ZlLWNoaWxkJ1xuXG5cdFx0ZXZlbnRzOlxuXHRcdFx0J2NsaWNrIEB1aS5jb2xsYXBzZVRvZ2dsZXInOiAnb25Db2xsYXBzZVRvZ2dsZSdcblx0XHRcdCdjbGljayBAdWkuYWRkQ2hpbGQnIDogJ29uQWRkQ2hpbGRDbGlja2VkJ1xuXHRcdFx0J2NsaWNrIEB1aS5yZW1vdmVDaGlsZCcgOiAnb25SZW1vdmVDaGlsZENraWNrZWQnXG5cdFx0XHQjICdtb3VzZWVudGVyIEB1aS5jaGlsZFZpZXdDb250YWluZXInOiAnb25Nb3VzZUVudGVyJ1xuXHRcdFx0IyAnbW91c2VsZWF2ZSBAdWkuY2hpbGRWaWV3Q29udGFpbmVyJzogJ29uTW91c2VMZWF2ZSdcblx0XHRcdCMgJ0RPTU1vdXNlU2Nyb2xsIEB1aS5jaGlsZFZpZXdDb250YWluZXInOiAnb25TY3JvbGwnXG5cdFx0XHQjICdtb3VzZXdoZWVsIEB1aS5jaGlsZFZpZXdDb250YWluZXInOiAnb25TY3JvbGwnXG5cblx0XHRjaGlsZFZpZXdDb250YWluZXI6ICcuaXRlbXMtY29udGFpbmVyJ1xuXG5cdFx0cGFuZWxWaWV3U3RhdGU6IG5ldyBQYW5lbFZpZXdTdGF0ZSgpXG5cdFx0IyBwYW5lbFZpZXdTdGF0ZTogbmV3IGFwcC5DYXJkRWRpdG9yLm1vZGVscy5QYW5lbFZpZXdTdGF0ZVxuXG5cdFx0aW5pdGlhbGl6ZTogKG9wdGlvbnMpIC0+XG5cdFx0XHQjIHNldCBwYXJhbXMgdG8gdGhlIHZpZXdcblx0XHRcdGlmIG9wdGlvbnMudGVtcGxhdGUgdGhlbiBAdGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlXG5cdFx0XHRAZWRpdG9yU3RhdGUgPSBvcHRpb25zLnN0YXRlXG5cdFx0XHRAZWRpdG9yTW9kZWwgPSBvcHRpb25zLm1vZGVsXG5cblx0XHR0ZW1wbGF0ZTogPT5cblx0XHRcdG9wdGlvbnMgPSBAcGFuZWxWaWV3U3RhdGUuYXR0cmlidXRlc1xuXHRcdFx0Y29uc29sZS5sb2cgb3B0aW9uc1xuXHRcdFx0dGVtcGxhdGl6ZXIuY2FyZEVkaXRvci50b29sYmFyLmJhc2VUb29sYmFyUGFuZWwgb3B0aW9uc1xuXG5cdFx0b25TaG93OiA9PlxuXHRcdFx0QHVpLmNoaWxkVmlld0NvbnRhaW5lci5zb3J0YWJsZSggY29udGFpbm1lbnQ6IFwicGFyZW50XCIgKVxuXHRcdFx0QHVpLmNoaWxkVmlld0NvbnRhaW5lci5kaXNhYmxlU2VsZWN0aW9uKClcblx0XHRcblx0XHRvbkNvbGxhcHNlVG9nZ2xlOiA9PlxuXHRcdFx0QHVpLnBhbmVsLnRvZ2dsZUNsYXNzICdpcy1jb2xsYXBzZWQnXG5cblx0XHRvblNjcm9sbDogKGV2KSA9PlxuXHRcdFx0IyBlbmFibGUgdGhpcyBjb2RlICggZnJvbSBodHRwOi8vanNmaWRkbGUubmV0L1Ryb3lBbGZvcmQvNHdyeHEvMS8gKVxuXHRcdFx0YGFsZXJ0KCdoZWxsbycpXG5cdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxuXHRcdFx0ICAgIHNjcm9sbFRvcCA9IHRoaXMuc2Nyb2xsVG9wLFxuXHRcdFx0ICAgIHNjcm9sbEhlaWdodCA9IHRoaXMuc2Nyb2xsSGVpZ2h0LFxuXHRcdFx0ICAgIGhlaWdodCA9ICR0aGlzLmhlaWdodCgpLFxuXHRcdFx0ICAgIGRlbHRhID0gZXYub3JpZ2luYWxFdmVudC53aGVlbERlbHRhLFxuXHRcdFx0ICAgIHVwID0gZGVsdGEgPiAwO1xuXG5cdFx0XHR2YXIgcHJldmVudCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0ICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0ICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQgICAgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcblx0XHRcdCAgICByZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghdXAgJiYgLWRlbHRhID4gc2Nyb2xsSGVpZ2h0IC0gaGVpZ2h0IC0gc2Nyb2xsVG9wKSB7XG5cdFx0XHQgICAgLy8gU2Nyb2xsaW5nIGRvd24sIGJ1dCB0aGlzIHdpbGwgdGFrZSB1cyBwYXN0IHRoZSBib3R0b20uXG5cdFx0XHQgICAgJHRoaXMuc2Nyb2xsVG9wKHNjcm9sbEhlaWdodCk7XG5cdFx0XHQgICAgcmV0dXJuIHByZXZlbnQoKTtcblx0XHRcdH0gZWxzZSBpZiAodXAgJiYgZGVsdGEgPiBzY3JvbGxUb3ApIHtcblx0XHRcdCAgICAvLyBTY3JvbGxpbmcgdXAsIGJ1dCB0aGlzIHdpbGwgdGFrZSB1cyBwYXN0IHRoZSB0b3AuXG5cdFx0XHQgICAgJHRoaXMuc2Nyb2xsVG9wKDApO1xuXHRcdFx0ICAgIHJldHVybiBwcmV2ZW50KCk7XG5cdFx0XHR9YFxuXG5cdFx0b25Nb3VzZUVudGVyOiAoZSkgPT5cblx0XHRvbk1vdXNlTGVhdmU6IChlKSA9PlxuXG5cdFx0b25BZGRDaGlsZENsaWNrZWQ6ID0+XG5cdFx0XHRAY29sbGVjdGlvbi5hZGQge31cblxuXHRcdG9uUmVtb3ZlQ2hpbGRDa2lja2VkOiA9PlxuXHRcdFx0QGNvbGxlY3Rpb24ucG9wKClcblxuXG5cbiJdfQ==