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
        templateOptions: {
          title: 'Какая-то панель',
          addButtonText: 'Какая-то кнопка',
          removeButtonText: 'Какая-то кнопка'
        }
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
        this.editorState = options.state;
        return this.editorModel = options.model;
      };

      BaseToolbarPanelView.prototype.template = function(model) {
        var options;
        options = this.panelViewState.get('templateOptions');
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2Jhc2VUb29sYmFyUGFuZWxWaWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O3NGQUFBOztBQUFBLEVBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVyxrQkFBWCxFQUErQixTQUFDLEtBQUQsRUFBUSxHQUFSLEdBQUE7QUFFOUIsUUFBQSxjQUFBO0FBQUEsSUFBTTtBQUNMLHVDQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSwrQkFBQSxRQUFBLEdBQ0M7QUFBQSxRQUFBLFFBQUEsRUFBVSxJQUFWO0FBQUEsUUFDQSxTQUFBLEVBQVcsSUFEWDtBQUFBLFFBRUEsZUFBQSxFQUFpQixDQUZqQjtBQUFBLFFBR0EsZUFBQSxFQUNDO0FBQUEsVUFBQSxLQUFBLEVBQU8saUJBQVA7QUFBQSxVQUNBLGFBQUEsRUFBZSxpQkFEZjtBQUFBLFVBRUEsZ0JBQUEsRUFBa0IsaUJBRmxCO1NBSkQ7T0FERCxDQUFBOzs0QkFBQTs7T0FENEIsUUFBUSxDQUFDLE1BQXRDLENBQUE7V0FVTSxLQUFLLENBQUM7QUFDWCw2Q0FBQSxDQUFBOzs7Ozs7Ozs7Ozs7T0FBQTs7QUFBQSxxQ0FBQSxPQUFBLEdBQVMsSUFBVCxDQUFBOztBQUFBLHFDQUVBLEVBQUEsR0FDQztBQUFBLFFBQUEsT0FBQSxFQUFTLFFBQVQ7QUFBQSxRQUNBLG9CQUFBLEVBQXNCLGtCQUR0QjtBQUFBLFFBRUEsaUJBQUEsRUFBbUIsbUJBRm5CO0FBQUEsUUFHQSxVQUFBLEVBQWEsWUFIYjtBQUFBLFFBSUEsYUFBQSxFQUFnQixlQUpoQjtPQUhELENBQUE7O0FBQUEscUNBU0EsTUFBQSxHQUNDO0FBQUEsUUFBQSwyQkFBQSxFQUE2QixrQkFBN0I7QUFBQSxRQUNBLG9CQUFBLEVBQXVCLG1CQUR2QjtBQUFBLFFBRUEsdUJBQUEsRUFBMEIsc0JBRjFCO09BVkQsQ0FBQTs7QUFBQSxxQ0FrQkEsa0JBQUEsR0FBb0Isa0JBbEJwQixDQUFBOztBQUFBLHFDQW9CQSxjQUFBLEdBQW9CLElBQUEsY0FBQSxDQUFBLENBcEJwQixDQUFBOztBQUFBLHFDQXNCQSxVQUFBLEdBQVksU0FBQyxPQUFELEdBQUE7QUFDWCxRQUFBLElBQUMsQ0FBQSxXQUFELEdBQWUsT0FBTyxDQUFDLEtBQXZCLENBQUE7ZUFDQSxJQUFDLENBQUEsV0FBRCxHQUFlLE9BQU8sQ0FBQyxNQUZaO01BQUEsQ0F0QlosQ0FBQTs7QUFBQSxxQ0EwQkEsUUFBQSxHQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1QsWUFBQSxPQUFBO0FBQUEsUUFBQSxPQUFBLEdBQVUsSUFBQyxDQUFBLGNBQWMsQ0FBQyxHQUFoQixDQUFvQixpQkFBcEIsQ0FBVixDQUFBO2VBQ0EsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsZ0JBQS9CLENBQWdELE9BQWhELEVBRlM7TUFBQSxDQTFCVixDQUFBOztBQUFBLHFDQThCQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ1AsUUFBQSxJQUFDLENBQUEsRUFBRSxDQUFDLGtCQUFrQixDQUFDLFFBQXZCLENBQWlDO0FBQUEsVUFBQSxXQUFBLEVBQWEsUUFBYjtTQUFqQyxDQUFBLENBQUE7ZUFDQSxJQUFDLENBQUEsRUFBRSxDQUFDLGtCQUFrQixDQUFDLGdCQUF2QixDQUFBLEVBRk87TUFBQSxDQTlCUixDQUFBOztBQUFBLHFDQWtDQSxnQkFBQSxHQUFrQixTQUFBLEdBQUE7ZUFDakIsSUFBQyxDQUFBLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVixDQUFzQixjQUF0QixFQURpQjtNQUFBLENBbENsQixDQUFBOztBQUFBLHFDQXFDQSxRQUFBLEdBQVUsU0FBQyxFQUFELEdBQUE7ZUFFVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FGUztNQUFBLENBckNWLENBQUE7O0FBQUEscUNBZ0VBLFlBQUEsR0FBYyxTQUFDLENBQUQsR0FBQSxDQWhFZCxDQUFBOztBQUFBLHFDQWlFQSxZQUFBLEdBQWMsU0FBQyxDQUFELEdBQUEsQ0FqRWQsQ0FBQTs7QUFBQSxxQ0FtRUEsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO2VBQ2xCLElBQUMsQ0FBQSxVQUFVLENBQUMsR0FBWixDQUFnQixFQUFoQixFQURrQjtNQUFBLENBbkVuQixDQUFBOztBQUFBLHFDQXNFQSxvQkFBQSxHQUFzQixTQUFBLEdBQUE7ZUFDckIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUFaLENBQUEsRUFEcUI7TUFBQSxDQXRFdEIsQ0FBQTs7a0NBQUE7O09BRHdDLFVBQVUsQ0FBQyxlQVp0QjtFQUFBLENBQS9CLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZWRpdG9yL3ZpZXdzL2Jhc2VUb29sYmFyUGFuZWxWaWV3LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLm1vZHVsZSAnQ2FyZEVkaXRvci52aWV3cycsICh2aWV3cywgYXBwKSAtPlxuXG5cdGNsYXNzIFBhbmVsVmlld1N0YXRlIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblx0XHRkZWZhdWx0czpcblx0XHRcdGlzT3BlbmVkOiB0cnVlXG5cdFx0XHRpc1Zpc2libGU6IHRydWVcblx0XHRcdG1heFZpc2libGVJdGVtczogNlxuXHRcdFx0dGVtcGxhdGVPcHRpb25zOlxuXHRcdFx0XHR0aXRsZTogJ9Ca0LDQutCw0Y8t0YLQviDQv9Cw0L3QtdC70YwnXG5cdFx0XHRcdGFkZEJ1dHRvblRleHQ6ICfQmtCw0LrQsNGPLdGC0L4g0LrQvdC+0L/QutCwJ1xuXHRcdFx0XHRyZW1vdmVCdXR0b25UZXh0OiAn0JrQsNC60LDRjy3RgtC+INC60L3QvtC/0LrQsCdcdFx0XHRcdFxuXG5cdGNsYXNzIHZpZXdzLkJhc2VUb29sYmFyUGFuZWxWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3XG5cdFx0bG9nZ2luZzogb25cblxuXHRcdHVpOlxuXHRcdFx0J3BhbmVsJzogJy5wYW5lbCdcblx0XHRcdCdjaGlsZFZpZXdDb250YWluZXInOiAnLml0ZW1zLWNvbnRhaW5lcidcblx0XHRcdCdjb2xsYXBzZVRvZ2dsZXInOiAnLmNvbGxhcHNlLXRvZ2dsZXInXG5cdFx0XHQnYWRkQ2hpbGQnIDogJy5hZGQtY2hpbGQnXG5cdFx0XHQncmVtb3ZlQ2hpbGQnIDogJy5yZW1vdmUtY2hpbGQnXG5cblx0XHRldmVudHM6XG5cdFx0XHQnY2xpY2sgQHVpLmNvbGxhcHNlVG9nZ2xlcic6ICdvbkNvbGxhcHNlVG9nZ2xlJ1xuXHRcdFx0J2NsaWNrIEB1aS5hZGRDaGlsZCcgOiAnb25BZGRDaGlsZENsaWNrZWQnXG5cdFx0XHQnY2xpY2sgQHVpLnJlbW92ZUNoaWxkJyA6ICdvblJlbW92ZUNoaWxkQ2tpY2tlZCdcblx0XHRcdCMgJ21vdXNlZW50ZXIgQHVpLmNoaWxkVmlld0NvbnRhaW5lcic6ICdvbk1vdXNlRW50ZXInXG5cdFx0XHQjICdtb3VzZWxlYXZlIEB1aS5jaGlsZFZpZXdDb250YWluZXInOiAnb25Nb3VzZUxlYXZlJ1xuXHRcdFx0IyAnRE9NTW91c2VTY3JvbGwgQHVpLmNoaWxkVmlld0NvbnRhaW5lcic6ICdvblNjcm9sbCdcblx0XHRcdCMgJ21vdXNld2hlZWwgQHVpLmNoaWxkVmlld0NvbnRhaW5lcic6ICdvblNjcm9sbCdcblxuXHRcdGNoaWxkVmlld0NvbnRhaW5lcjogJy5pdGVtcy1jb250YWluZXInXG5cblx0XHRwYW5lbFZpZXdTdGF0ZTogbmV3IFBhbmVsVmlld1N0YXRlKClcblxuXHRcdGluaXRpYWxpemU6IChvcHRpb25zKSAtPlxuXHRcdFx0QGVkaXRvclN0YXRlID0gb3B0aW9ucy5zdGF0ZVxuXHRcdFx0QGVkaXRvck1vZGVsID0gb3B0aW9ucy5tb2RlbFxuXG5cdFx0dGVtcGxhdGU6IChtb2RlbCkgPT5cblx0XHRcdG9wdGlvbnMgPSBAcGFuZWxWaWV3U3RhdGUuZ2V0ICd0ZW1wbGF0ZU9wdGlvbnMnXG5cdFx0XHR0ZW1wbGF0aXplci5jYXJkRWRpdG9yLnRvb2xiYXIuYmFzZVRvb2xiYXJQYW5lbCBvcHRpb25zXG5cblx0XHRvblNob3c6ID0+XG5cdFx0XHRAdWkuY2hpbGRWaWV3Q29udGFpbmVyLnNvcnRhYmxlKCBjb250YWlubWVudDogXCJwYXJlbnRcIiApXG5cdFx0XHRAdWkuY2hpbGRWaWV3Q29udGFpbmVyLmRpc2FibGVTZWxlY3Rpb24oKVxuXHRcdFxuXHRcdG9uQ29sbGFwc2VUb2dnbGU6ID0+XG5cdFx0XHRAdWkucGFuZWwudG9nZ2xlQ2xhc3MgJ2lzLWNvbGxhcHNlZCdcblxuXHRcdG9uU2Nyb2xsOiAoZXYpID0+XG5cdFx0XHQjIGVuYWJsZSB0aGlzIGNvZGUgKCBmcm9tIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvVHJveUFsZm9yZC80d3J4cS8xLyApXG5cdFx0XHRgYWxlcnQoJ2hlbGxvJylcblx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHQgICAgc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxUb3AsXG5cdFx0XHQgICAgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5zY3JvbGxIZWlnaHQsXG5cdFx0XHQgICAgaGVpZ2h0ID0gJHRoaXMuaGVpZ2h0KCksXG5cdFx0XHQgICAgZGVsdGEgPSBldi5vcmlnaW5hbEV2ZW50LndoZWVsRGVsdGEsXG5cdFx0XHQgICAgdXAgPSBkZWx0YSA+IDA7XG5cblx0XHRcdHZhciBwcmV2ZW50ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHQgICAgZXYucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCAgICBldi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXHRcdFx0ICAgIHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCF1cCAmJiAtZGVsdGEgPiBzY3JvbGxIZWlnaHQgLSBoZWlnaHQgLSBzY3JvbGxUb3ApIHtcblx0XHRcdCAgICAvLyBTY3JvbGxpbmcgZG93biwgYnV0IHRoaXMgd2lsbCB0YWtlIHVzIHBhc3QgdGhlIGJvdHRvbS5cblx0XHRcdCAgICAkdGhpcy5zY3JvbGxUb3Aoc2Nyb2xsSGVpZ2h0KTtcblx0XHRcdCAgICByZXR1cm4gcHJldmVudCgpO1xuXHRcdFx0fSBlbHNlIGlmICh1cCAmJiBkZWx0YSA+IHNjcm9sbFRvcCkge1xuXHRcdFx0ICAgIC8vIFNjcm9sbGluZyB1cCwgYnV0IHRoaXMgd2lsbCB0YWtlIHVzIHBhc3QgdGhlIHRvcC5cblx0XHRcdCAgICAkdGhpcy5zY3JvbGxUb3AoMCk7XG5cdFx0XHQgICAgcmV0dXJuIHByZXZlbnQoKTtcblx0XHRcdH1gXG5cblx0XHRvbk1vdXNlRW50ZXI6IChlKSA9PlxuXHRcdG9uTW91c2VMZWF2ZTogKGUpID0+XG5cblx0XHRvbkFkZENoaWxkQ2xpY2tlZDogPT5cblx0XHRcdEBjb2xsZWN0aW9uLmFkZCB7fVxuXG5cdFx0b25SZW1vdmVDaGlsZENraWNrZWQ6ID0+XG5cdFx0XHRAY29sbGVjdGlvbi5wb3AoKVxuIl19