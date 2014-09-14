(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  app.module('CardEditor.views', function(views, app) {
    var PanelViewState;
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
    return views.BaseToolbarPanelView = (function(_super) {
      __extends(BaseToolbarPanelView, _super);

      function BaseToolbarPanelView() {
        this.onRemoveChildCkicked = __bind(this.onRemoveChildCkicked, this);
        this.onAddChildClicked = __bind(this.onAddChildClicked, this);
        this.onMouseLeave = __bind(this.onMouseLeave, this);
        this.onMouseEnter = __bind(this.onMouseEnter, this);
        this.onScroll = __bind(this.onScroll, this);
        this.onCollapseToggle = __bind(this.onCollapseToggle, this);
        this.onShow = __bind(this.onShow, this);
        this.template = __bind(this.template, this);
        return BaseToolbarPanelView.__super__.constructor.apply(this, arguments);
      }

      BaseToolbarPanelView.prototype.logging = true;

      BaseToolbarPanelView.prototype.ui = {
        'panel': '.panel',
        'childViewContainer': '.items-container',
        'collapseToggler': '.collapse-toggler',
        'addChild': '.add-child',
        'removeChild': '.remove-child'
      };

      BaseToolbarPanelView.prototype.events = {
        'click @ui.collapseToggler': 'onCollapseToggle',
        'click @ui.addChild': 'onAddChildClicked',
        'click @ui.removeChild': 'onRemoveChildCkicked'
      };

      BaseToolbarPanelView.prototype.childViewContainer = '.items-container';

      BaseToolbarPanelView.prototype.panelViewState = new PanelViewState();

      BaseToolbarPanelView.prototype.initialize = function(options) {
        if (options.template) {
          this.template = options.template;
        }
        this.editorState = options.state;
        return this.editorModel = options.model;
      };

      BaseToolbarPanelView.prototype.template = function() {
        var options;
        options = this.panelViewState.attributes;
        console.log(options);
        return templatizer.cardEditor.toolbar.baseToolbarPanel(options);
      };

      BaseToolbarPanelView.prototype.onShow = function() {
        this.ui.childViewContainer.sortable({
          containment: "parent"
        });
        return this.ui.childViewContainer.disableSelection();
      };

      BaseToolbarPanelView.prototype.onCollapseToggle = function() {
        return this.ui.panel.toggleClass('is-collapsed');
      };

      BaseToolbarPanelView.prototype.onScroll = function(ev) {
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

      BaseToolbarPanelView.prototype.onMouseEnter = function(e) {};

      BaseToolbarPanelView.prototype.onMouseLeave = function(e) {};

      BaseToolbarPanelView.prototype.onAddChildClicked = function() {
        return this.collection.add({});
      };

      BaseToolbarPanelView.prototype.onRemoveChildCkicked = function() {
        return this.collection.pop();
      };

      return BaseToolbarPanelView;

    })(Marionette.CompositeView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2Jhc2VUb29sYmFyUGFuZWxWaWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O3NGQUFBOztBQUFBLEVBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVyxrQkFBWCxFQUErQixTQUFDLEtBQUQsRUFBUSxHQUFSLEdBQUE7QUFFOUIsUUFBQSxjQUFBO0FBQUEsSUFBTTtBQUNMLHVDQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSwrQkFBQSxRQUFBLEdBQ0M7QUFBQSxRQUFBLFFBQUEsRUFBVSxJQUFWO0FBQUEsUUFDQSxTQUFBLEVBQVcsSUFEWDtBQUFBLFFBRUEsZUFBQSxFQUFpQixDQUZqQjtBQUFBLFFBR0EsS0FBQSxFQUFPLGlCQUhQO0FBQUEsUUFJQSxPQUFBLEVBQVMsSUFKVDtBQUFBLFFBS0EsYUFBQSxFQUFlLGlCQUxmO0FBQUEsUUFNQSxnQkFBQSxFQUFrQixpQkFObEI7T0FERCxDQUFBOzs0QkFBQTs7T0FENEIsUUFBUSxDQUFDLE1BQXRDLENBQUE7V0FVTSxLQUFLLENBQUM7QUFDWCw2Q0FBQSxDQUFBOzs7Ozs7Ozs7Ozs7T0FBQTs7QUFBQSxxQ0FBQSxPQUFBLEdBQVMsSUFBVCxDQUFBOztBQUFBLHFDQUVBLEVBQUEsR0FDQztBQUFBLFFBQUEsT0FBQSxFQUFTLFFBQVQ7QUFBQSxRQUNBLG9CQUFBLEVBQXNCLGtCQUR0QjtBQUFBLFFBRUEsaUJBQUEsRUFBbUIsbUJBRm5CO0FBQUEsUUFHQSxVQUFBLEVBQWEsWUFIYjtBQUFBLFFBSUEsYUFBQSxFQUFnQixlQUpoQjtPQUhELENBQUE7O0FBQUEscUNBU0EsTUFBQSxHQUNDO0FBQUEsUUFBQSwyQkFBQSxFQUE2QixrQkFBN0I7QUFBQSxRQUNBLG9CQUFBLEVBQXVCLG1CQUR2QjtBQUFBLFFBRUEsdUJBQUEsRUFBMEIsc0JBRjFCO09BVkQsQ0FBQTs7QUFBQSxxQ0FrQkEsa0JBQUEsR0FBb0Isa0JBbEJwQixDQUFBOztBQUFBLHFDQW9CQSxjQUFBLEdBQW9CLElBQUEsY0FBQSxDQUFBLENBcEJwQixDQUFBOztBQUFBLHFDQXNCQSxVQUFBLEdBQVksU0FBQyxPQUFELEdBQUE7QUFFWCxRQUFBLElBQUcsT0FBTyxDQUFDLFFBQVg7QUFBeUIsVUFBQSxJQUFDLENBQUEsUUFBRCxHQUFZLE9BQU8sQ0FBQyxRQUFwQixDQUF6QjtTQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsV0FBRCxHQUFlLE9BQU8sQ0FBQyxLQUR2QixDQUFBO2VBRUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxPQUFPLENBQUMsTUFKWjtNQUFBLENBdEJaLENBQUE7O0FBQUEscUNBNEJBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDVCxZQUFBLE9BQUE7QUFBQSxRQUFBLE9BQUEsR0FBVSxJQUFDLENBQUEsY0FBYyxDQUFDLFVBQTFCLENBQUE7QUFBQSxRQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksT0FBWixDQURBLENBQUE7ZUFFQSxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxnQkFBL0IsQ0FBZ0QsT0FBaEQsRUFIUztNQUFBLENBNUJWLENBQUE7O0FBQUEscUNBaUNBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDUCxRQUFBLElBQUMsQ0FBQSxFQUFFLENBQUMsa0JBQWtCLENBQUMsUUFBdkIsQ0FBaUM7QUFBQSxVQUFBLFdBQUEsRUFBYSxRQUFiO1NBQWpDLENBQUEsQ0FBQTtlQUNBLElBQUMsQ0FBQSxFQUFFLENBQUMsa0JBQWtCLENBQUMsZ0JBQXZCLENBQUEsRUFGTztNQUFBLENBakNSLENBQUE7O0FBQUEscUNBcUNBLGdCQUFBLEdBQWtCLFNBQUEsR0FBQTtlQUNqQixJQUFDLENBQUEsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFWLENBQXNCLGNBQXRCLEVBRGlCO01BQUEsQ0FyQ2xCLENBQUE7O0FBQUEscUNBd0NBLFFBQUEsR0FBVSxTQUFDLEVBQUQsR0FBQTtlQUVUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQUZTO01BQUEsQ0F4Q1YsQ0FBQTs7QUFBQSxxQ0FtRUEsWUFBQSxHQUFjLFNBQUMsQ0FBRCxHQUFBLENBbkVkLENBQUE7O0FBQUEscUNBb0VBLFlBQUEsR0FBYyxTQUFDLENBQUQsR0FBQSxDQXBFZCxDQUFBOztBQUFBLHFDQXNFQSxpQkFBQSxHQUFtQixTQUFBLEdBQUE7ZUFDbEIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUFaLENBQWdCLEVBQWhCLEVBRGtCO01BQUEsQ0F0RW5CLENBQUE7O0FBQUEscUNBeUVBLG9CQUFBLEdBQXNCLFNBQUEsR0FBQTtlQUNyQixJQUFDLENBQUEsVUFBVSxDQUFDLEdBQVosQ0FBQSxFQURxQjtNQUFBLENBekV0QixDQUFBOztrQ0FBQTs7T0FEd0MsVUFBVSxDQUFDLGVBWnRCO0VBQUEsQ0FBL0IsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZF9lZGl0b3Ivdmlld3MvYmFzZVRvb2xiYXJQYW5lbFZpZXcuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJhcHAubW9kdWxlICdDYXJkRWRpdG9yLnZpZXdzJywgKHZpZXdzLCBhcHApIC0+XG5cblx0Y2xhc3MgUGFuZWxWaWV3U3RhdGUgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXHRcdGRlZmF1bHRzOlxuXHRcdFx0aXNPcGVuZWQ6IHRydWVcblx0XHRcdGlzVmlzaWJsZTogdHJ1ZVxuXHRcdFx0bWF4VmlzaWJsZUl0ZW1zOiA2XG5cdFx0XHR0aXRsZTogJ9Ca0LDQutCw0Y8t0YLQviDQv9Cw0L3QtdC70YwnXG5cdFx0XHRnb3RCb2R5OiB0cnVlXG5cdFx0XHRhZGRCdXR0b25UZXh0OiAn0JrQsNC60LDRjy3RgtC+INC60L3QvtC/0LrQsCdcblx0XHRcdHJlbW92ZUJ1dHRvblRleHQ6ICfQmtCw0LrQsNGPLdGC0L4g0LrQvdC+0L/QutCwJ1x0XHRcblxuXHRjbGFzcyB2aWV3cy5CYXNlVG9vbGJhclBhbmVsVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29tcG9zaXRlVmlld1xuXHRcdGxvZ2dpbmc6IG9uXG5cblx0XHR1aTpcblx0XHRcdCdwYW5lbCc6ICcucGFuZWwnXG5cdFx0XHQnY2hpbGRWaWV3Q29udGFpbmVyJzogJy5pdGVtcy1jb250YWluZXInXG5cdFx0XHQnY29sbGFwc2VUb2dnbGVyJzogJy5jb2xsYXBzZS10b2dnbGVyJ1xuXHRcdFx0J2FkZENoaWxkJyA6ICcuYWRkLWNoaWxkJ1xuXHRcdFx0J3JlbW92ZUNoaWxkJyA6ICcucmVtb3ZlLWNoaWxkJ1xuXG5cdFx0ZXZlbnRzOlxuXHRcdFx0J2NsaWNrIEB1aS5jb2xsYXBzZVRvZ2dsZXInOiAnb25Db2xsYXBzZVRvZ2dsZSdcblx0XHRcdCdjbGljayBAdWkuYWRkQ2hpbGQnIDogJ29uQWRkQ2hpbGRDbGlja2VkJ1xuXHRcdFx0J2NsaWNrIEB1aS5yZW1vdmVDaGlsZCcgOiAnb25SZW1vdmVDaGlsZENraWNrZWQnXG5cdFx0XHQjICdtb3VzZWVudGVyIEB1aS5jaGlsZFZpZXdDb250YWluZXInOiAnb25Nb3VzZUVudGVyJ1xuXHRcdFx0IyAnbW91c2VsZWF2ZSBAdWkuY2hpbGRWaWV3Q29udGFpbmVyJzogJ29uTW91c2VMZWF2ZSdcblx0XHRcdCMgJ0RPTU1vdXNlU2Nyb2xsIEB1aS5jaGlsZFZpZXdDb250YWluZXInOiAnb25TY3JvbGwnXG5cdFx0XHQjICdtb3VzZXdoZWVsIEB1aS5jaGlsZFZpZXdDb250YWluZXInOiAnb25TY3JvbGwnXG5cblx0XHRjaGlsZFZpZXdDb250YWluZXI6ICcuaXRlbXMtY29udGFpbmVyJ1xuXG5cdFx0cGFuZWxWaWV3U3RhdGU6IG5ldyBQYW5lbFZpZXdTdGF0ZSgpXG5cblx0XHRpbml0aWFsaXplOiAob3B0aW9ucykgLT5cblx0XHRcdCMgc2V0IHBhcmFtcyB0byB0aGUgdmlld1xuXHRcdFx0aWYgb3B0aW9ucy50ZW1wbGF0ZSB0aGVuIEB0ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGVcblx0XHRcdEBlZGl0b3JTdGF0ZSA9IG9wdGlvbnMuc3RhdGVcblx0XHRcdEBlZGl0b3JNb2RlbCA9IG9wdGlvbnMubW9kZWxcblxuXHRcdHRlbXBsYXRlOiA9PlxuXHRcdFx0b3B0aW9ucyA9IEBwYW5lbFZpZXdTdGF0ZS5hdHRyaWJ1dGVzXG5cdFx0XHRjb25zb2xlLmxvZyBvcHRpb25zXG5cdFx0XHR0ZW1wbGF0aXplci5jYXJkRWRpdG9yLnRvb2xiYXIuYmFzZVRvb2xiYXJQYW5lbCBvcHRpb25zXG5cblx0XHRvblNob3c6ID0+XG5cdFx0XHRAdWkuY2hpbGRWaWV3Q29udGFpbmVyLnNvcnRhYmxlKCBjb250YWlubWVudDogXCJwYXJlbnRcIiApXG5cdFx0XHRAdWkuY2hpbGRWaWV3Q29udGFpbmVyLmRpc2FibGVTZWxlY3Rpb24oKVxuXHRcdFxuXHRcdG9uQ29sbGFwc2VUb2dnbGU6ID0+XG5cdFx0XHRAdWkucGFuZWwudG9nZ2xlQ2xhc3MgJ2lzLWNvbGxhcHNlZCdcblxuXHRcdG9uU2Nyb2xsOiAoZXYpID0+XG5cdFx0XHQjIGVuYWJsZSB0aGlzIGNvZGUgKCBmcm9tIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvVHJveUFsZm9yZC80d3J4cS8xLyApXG5cdFx0XHRgYWxlcnQoJ2hlbGxvJylcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHQgICAgc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxUb3AsXG5cdFx0XHQgICAgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5zY3JvbGxIZWlnaHQsXG5cdFx0XHQgICAgaGVpZ2h0ID0gJHRoaXMuaGVpZ2h0KCksXG5cdFx0XHQgICAgZGVsdGEgPSBldi5vcmlnaW5hbEV2ZW50LndoZWVsRGVsdGEsXG5cdFx0XHQgICAgdXAgPSBkZWx0YSA+IDA7XG5cblx0XHRcdHZhciBwcmV2ZW50ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHQgICAgZXYucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCAgICBldi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXHRcdFx0ICAgIHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCF1cCAmJiAtZGVsdGEgPiBzY3JvbGxIZWlnaHQgLSBoZWlnaHQgLSBzY3JvbGxUb3ApIHtcblx0XHRcdCAgICAvLyBTY3JvbGxpbmcgZG93biwgYnV0IHRoaXMgd2lsbCB0YWtlIHVzIHBhc3QgdGhlIGJvdHRvbS5cblx0XHRcdCAgICAkdGhpcy5zY3JvbGxUb3Aoc2Nyb2xsSGVpZ2h0KTtcblx0XHRcdCAgICByZXR1cm4gcHJldmVudCgpO1xuXHRcdFx0fSBlbHNlIGlmICh1cCAmJiBkZWx0YSA+IHNjcm9sbFRvcCkge1xuXHRcdFx0ICAgIC8vIFNjcm9sbGluZyB1cCwgYnV0IHRoaXMgd2lsbCB0YWtlIHVzIHBhc3QgdGhlIHRvcC5cblx0XHRcdCAgICAkdGhpcy5zY3JvbGxUb3AoMCk7XG5cdFx0XHQgICAgcmV0dXJuIHByZXZlbnQoKTtcblx0XHRcdH1gXG5cblx0XHRvbk1vdXNlRW50ZXI6IChlKSA9PlxuXHRcdG9uTW91c2VMZWF2ZTogKGUpID0+XG5cblx0XHRvbkFkZENoaWxkQ2xpY2tlZDogPT5cblx0XHRcdEBjb2xsZWN0aW9uLmFkZCB7fVxuXG5cdFx0b25SZW1vdmVDaGlsZENraWNrZWQ6ID0+XG5cdFx0XHRAY29sbGVjdGlvbi5wb3AoKVxuIl19