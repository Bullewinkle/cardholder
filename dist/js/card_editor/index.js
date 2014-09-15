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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O3NGQUFBOztBQUFBLEVBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVyxZQUFYLEVBQXlCLFNBQUMsVUFBRCxHQUFBO1dBQ3hCLElBQUMsQ0FBQSxjQUFELENBQWdCLFNBQUEsR0FBQTtBQUVmLE1BQUEsSUFBQyxDQUFBLFVBQUQsR0FBbUIsSUFBQSxVQUFVLENBQUMsVUFBWCxDQUFBLENBQW5CLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxNQUFELEdBQWMsSUFBQSxVQUFVLENBQUMsTUFBWCxDQUFrQjtBQUFBLFFBQUEsVUFBQSxFQUFZLElBQUMsQ0FBQSxVQUFiO09BQWxCLENBRGQsQ0FBQTthQUVBLElBQUMsQ0FBQSxnQkFBRCxHQUF3QixJQUFBLFVBQVUsQ0FBQyxnQkFBWCxDQUFBLEVBSlQ7SUFBQSxDQUFoQixFQUR3QjtFQUFBLENBQXpCLENBQUEsQ0FBQTs7QUFBQSxFQVNBLEdBQUcsQ0FBQyxNQUFKLENBQVcsbUJBQVgsRUFBZ0MsU0FBQyxNQUFELEVBQVMsR0FBVCxHQUFBO0FBQy9CLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBYSwyQkFBYixDQUFBLENBQUE7V0FFTSxNQUFNLENBQUM7QUFDWix1Q0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsK0JBQUEsUUFBQSxHQUNDO0FBQUEsUUFBQSxRQUFBLEVBQVUsSUFBVjtBQUFBLFFBQ0EsU0FBQSxFQUFXLElBRFg7QUFBQSxRQUVBLGVBQUEsRUFBaUIsQ0FGakI7QUFBQSxRQUdBLEtBQUEsRUFBTyxpQkFIUDtBQUFBLFFBSUEsT0FBQSxFQUFTLElBSlQ7QUFBQSxRQUtBLGFBQUEsRUFBZSxpQkFMZjtBQUFBLFFBTUEsZ0JBQUEsRUFBa0IsaUJBTmxCO09BREQsQ0FBQTs7NEJBQUE7O09BRG1DLFFBQVEsQ0FBQyxPQUhkO0VBQUEsQ0FBaEMsQ0FUQSxDQUFBOztBQUFBLEVBdUJBLEdBQUcsQ0FB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c0NBdUVBLGlCQUFBLEdBQW1CLFNBQUEsR0FBQTtlQUNsQixJQUFDLENBQUEsVUFBVSxDQUFDLEdBQVosQ0FBZ0IsRUFBaEIsRUFEa0I7TUFBQSxDQXZFbkIsQ0FBQTs7QUFBQSxzQ0EwRUEsb0JBQUEsR0FBc0IsU0FBQSxHQUFBO2VBQ3JCLElBQUMsQ0FBQSxVQUFVLENBQUMsR0FBWixDQUFBLEVBRHFCO01BQUEsQ0ExRXRCLENBQUE7O21DQUFBOztPQUR5QyxVQUFVLENBQUMsZUFidkI7RUFBQSxDQUEvQixDQXZCQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZF9lZGl0b3IvaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJhcHAubW9kdWxlICdDYXJkRWRpdG9yJywgKENhcmRFZGl0b3IpIC0+XG5cdEBhZGRJbml0aWFsaXplciAtPlxuXHRcdCMgQHZpZXdzID0ge31cblx0XHRAY29udHJvbGxlciA9ICBuZXcgQ2FyZEVkaXRvci5Db250cm9sbGVyKClcblx0XHRAcm91dGVyID0gbmV3IENhcmRFZGl0b3IuUm91dGVyIGNvbnRyb2xsZXI6IEBjb250cm9sbGVyXG5cdFx0QGNhcmRFZGl0b3JMYXlvdXQgPSBuZXcgQ2FyZEVkaXRvci5DYXJkRWRpdG9yTGF5b3V0KClcblxuXG4jIGNvbW1vbiBjYXJkIHZpZXcgbW9kZWxzXG5hcHAubW9kdWxlICdDYXJkRWRpdG9yLm1vZGVscycsIChtb2RlbHMsIGFwcCkgLT5cblx0Y29uc29sZS5sb2cgKCcxIGNvbW1vbiBjYXJkIHZpZXcgbW9kZWxzJylcblxuXHRjbGFzcyBtb2RlbHMuUGFuZWxWaWV3U3RhdGUgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXHRcdGRlZmF1bHRzOlxuXHRcdFx0aXNPcGVuZWQ6IHRydWVcblx0XHRcdGlzVmlzaWJsZTogdHJ1ZVxuXHRcdFx0bWF4VmlzaWJsZUl0ZW1zOiA2XG5cdFx0XHR0aXRsZTogJ9Ca0LDQutCw0Y8t0YLQviDQv9Cw0L3QtdC70YwnXG5cdFx0XHRnb3RCb2R5OiB0cnVlXG5cdFx0XHRhZGRCdXR0b25UZXh0OiAn0JrQsNC60LDRjy3RgtC+INC60L3QvtC/0LrQsCdcblx0XHRcdHJlbW92ZUJ1dHRvblRleHQ6ICfQmtCw0LrQsNGPLdGC0L4g0LrQvdC+0L/QutCwJ1x0XHRcblxuIyBjb21tb24gY2FyZCB2aWV3IGNsYXNzZXNcbmFwcC5tb2R1bGUgJ0NhcmRFZGl0b3Iudmlld3MnLCAodmlld3MsIGFwcCkgLT5cblx0Y29uc29sZS5sb2cgKCcyIGNvbW1vbiBjYXJkIHZpZXcgY2xhc3NlcycpXG5cblx0Y2xhc3MgUGFuZWxWaWV3U3RhdGUgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXHRcdGRlZmF1bHRzOlxuXHRcdFx0aXNPcGVuZWQ6IHRydWVcblx0XHRcdGlzVmlzaWJsZTogdHJ1ZVxuXHRcdFx0bWF4VmlzaWJsZUl0ZW1zOiA2XG5cdFx0XHR0aXRsZTogJ9Ca0LDQutCw0Y8t0YLQviDQv9Cw0L3QtdC70YwnXG5cdFx0XHRnb3RCb2R5OiB0cnVlXG5cdFx0XHRhZGRCdXR0b25UZXh0OiAn0JrQsNC60LDRjy3RgtC+INC60L3QvtC/0LrQsCdcblx0XHRcdHJlbW92ZUJ1dHRvblRleHQ6ICfQmtCw0LrQsNGPLdGC0L4g0LrQvdC+0L/QutCwJ1x0XG5cblx0Y2xhc3Mgdmlld3MuX0Jhc2VUb29sYmFyUGFuZWxWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3XG5cdFx0bG9nZ2luZzogb25cblxuXHRcdHVpOlxuXHRcdFx0J3BhbmVsJzogJy5wYW5lbCdcblx0XHRcdCdjaGlsZFZpZXdDb250YWluZXInOiAnLml0ZW1zLWNvbnRhaW5lcidcblx0XHRcdCdjb2xsYXBzZVRvZ2dsZXInOiAnLmNvbGxhcHNlLXRvZ2dsZXInXG5cdFx0XHQnYWRkQ2hpbGQnIDogJy5hZGQtY2hpbGQnXG5cdFx0XHQncmVtb3ZlQ2hpbGQnIDogJy5yZW1vdmUtY2hpbGQnXG5cblx0XHRldmVudHM6XG5cdFx0XHQnY2xpY2sgQHVpLmNvbGxhcHNlVG9nZ2xlcic6ICdvbkNvbGxhcHNlVG9nZ2xlJ1xuXHRcdFx0J2NsaWNrIEB1aS5hZGRDaGlsZCcgOiAnb25BZGRDaGlsZENsaWNrZWQnXG5cdFx0XHQnY2xpY2sgQHVpLnJlbW92ZUNoaWxkJyA6ICdvblJlbW92ZUNoaWxkQ2tpY2tlZCdcblx0XHRcdCMgJ21vdXNlZW50ZXIgQHVpLmNoaWxkVmlld0NvbnRhaW5lcic6ICdvbk1vdXNlRW50ZXInXG5cdFx0XHQjICdtb3VzZWxlYXZlIEB1aS5jaGlsZFZpZXdDb250YWluZXInOiAnb25Nb3VzZUxlYXZlJ1xuXHRcdFx0IyAnRE9NTW91c2VTY3JvbGwgQHVpLmNoaWxkVmlld0NvbnRhaW5lcic6ICdvblNjcm9sbCdcblx0XHRcdCMgJ21vdXNld2hlZWwgQHVpLmNoaWxkVmlld0NvbnRhaW5lcic6ICdvblNjcm9sbCdcblxuXHRcdGNoaWxkVmlld0NvbnRhaW5lcjogJy5pdGVtcy1jb250YWluZXInXG5cblx0XHRwYW5lbFZpZXdTdGF0ZTogbmV3IFBhbmVsVmlld1N0YXRlKClcblx0XHQjIHBhbmVsVmlld1N0YXRlOiBuZXcgYXBwLkNhcmRFZGl0b3IubW9kZWxzLlBhbmVsVmlld1N0YXRlXG5cblx0XHRpbml0aWFsaXplOiAob3B0aW9ucykgLT5cblx0XHRcdCMgc2V0IHBhcmFtcyB0byB0aGUgdmlld1xuXHRcdFx0aWYgb3B0aW9ucy50ZW1wbGF0ZSB0aGVuIEB0ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGVcblx0XHRcdEBlZGl0b3JTdGF0ZSA9IG9wdGlvbnMuc3RhdGVcblx0XHRcdEBlZGl0b3JNb2RlbCA9IG9wdGlvbnMubW9kZWxcblxuXHRcdHRlbXBsYXRlOiA9PlxuXHRcdFx0b3B0aW9ucyA9IEBwYW5lbFZpZXdTdGF0ZS5hdHRyaWJ1dGVzXG5cdFx0XHRjb25zb2xlLmxvZyBvcHRpb25zXG5cdFx0XHR0ZW1wbGF0aXplci5jYXJkRWRpdG9yLnRvb2xiYXIuYmFzZVRvb2xiYXJQYW5lbCBvcHRpb25zXG5cblx0XHRvblNob3c6ID0+XG5cdFx0XHRAdWkuY2hpbGRWaWV3Q29udGFpbmVyLnNvcnRhYmxlKCBjb250YWlubWVudDogXCJwYXJlbnRcIiApXG5cdFx0XHRAdWkuY2hpbGRWaWV3Q29udGFpbmVyLmRpc2FibGVTZWxlY3Rpb24oKVxuXHRcdFxuXHRcdG9uQ29sbGFwc2VUb2dnbGU6ID0+XG5cdFx0XHRAdWkucGFuZWwudG9nZ2xlQ2xhc3MgJ2lzLWNvbGxhcHNlZCdcblxuXHRcdG9uU2Nyb2xsOiAoZXYpID0+XG5cdFx0XHQjIGVuYWJsZSB0aGlzIGNvZGUgKCBmcm9tIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvVHJveUFsZm9yZC80d3J4cS8xLyApXG5cdFx0XHRgYWxlcnQoJ2hlbGxvJylcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHQgICAgc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxUb3AsXG5cdFx0XHQgICAgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5zY3JvbGxIZWlnaHQsXG5cdFx0XHQgICAgaGVpZ2h0ID0gJHRoaXMuaGVpZ2h0KCksXG5cdFx0XHQgICAgZGVsdGEgPSBldi5vcmlnaW5hbEV2ZW50LndoZWVsRGVsdGEsXG5cdFx0XHQgICAgdXAgPSBkZWx0YSA+IDA7XG5cblx0XHRcdHZhciBwcmV2ZW50ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHQgICAgZXYucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCAgICBldi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXHRcdFx0ICAgIHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCF1cCAmJiAtZGVsdGEgPiBzY3JvbGxIZWlnaHQgLSBoZWlnaHQgLSBzY3JvbGxUb3ApIHtcblx0XHRcdCAgICAvLyBTY3JvbGxpbmcgZG93biwgYnV0IHRoaXMgd2lsbCB0YWtlIHVzIHBhc3QgdGhlIGJvdHRvbS5cblx0XHRcdCAgICAkdGhpcy5zY3JvbGxUb3Aoc2Nyb2xsSGVpZ2h0KTtcblx0XHRcdCAgICByZXR1cm4gcHJldmVudCgpO1xuXHRcdFx0fSBlbHNlIGlmICh1cCAmJiBkZWx0YSA+IHNjcm9sbFRvcCkge1xuXHRcdFx0ICAgIC8vIFNjcm9sbGluZyB1cCwgYnV0IHRoaXMgd2lsbCB0YWtlIHVzIHBhc3QgdGhlIHRvcC5cblx0XHRcdCAgICAkdGhpcy5zY3JvbGxUb3AoMCk7XG5cdFx0XHQgICAgcmV0dXJuIHByZXZlbnQoKTtcblx0XHRcdH1gXG5cblx0XHRvbk1vdXNlRW50ZXI6IChlKSA9PlxuXHRcdG9uTW91c2VMZWF2ZTogKGUpID0+XG5cblx0XHRvbkFkZENoaWxkQ2xpY2tlZDogPT5cblx0XHRcdEBjb2xsZWN0aW9uLmFkZCB7fVxuXG5cdFx0b25SZW1vdmVDaGlsZENraWNrZWQ6ID0+XG5cdFx0XHRAY29sbGVjdGlvbi5wb3AoKVxuXG5cblxuIl19