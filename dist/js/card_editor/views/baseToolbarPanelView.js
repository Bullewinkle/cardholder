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
        'click @ui.removeChild': 'onRemoveChildCkicked',
        'mouseenter @ui.childViewContainer': 'onMouseEnter',
        'mouseleave @ui.childViewContainer': 'onMouseLeave'
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
        this.ui.childViewContainer.sortable();
        return this.ui.childViewContainer.disableSelection();
      };

      BaseToolbarPanelView.prototype.onCollapseToggle = function() {
        return this.ui.panel.toggleClass('is-collapsed');
      };

      BaseToolbarPanelView.prototype.onMouseEnter = function() {
        this.panelViewState.set('currentOverflow', {
          both: $('body').css('overflow'),
          x: $('body').css('overflow-x'),
          y: $('body').css('overflow-y')
        });
        return $('body').css('overflow-y', 'hidden');
      };

      BaseToolbarPanelView.prototype.onMouseLeave = function() {
        return $('body').css('overflow-y', this.panelViewState.get('currentOverflow').y);
      };

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2Jhc2VUb29sYmFyUGFuZWxWaWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O3NGQUFBOztBQUFBLEVBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVyxrQkFBWCxFQUErQixTQUFDLEtBQUQsRUFBUSxHQUFSLEdBQUE7QUFFOUIsUUFBQSxjQUFBO0FBQUEsSUFBTTtBQUNMLHVDQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSwrQkFBQSxRQUFBLEdBQ0M7QUFBQSxRQUFBLFFBQUEsRUFBVSxJQUFWO0FBQUEsUUFDQSxTQUFBLEVBQVcsSUFEWDtBQUFBLFFBRUEsZUFBQSxFQUFpQixDQUZqQjtBQUFBLFFBR0EsZUFBQSxFQUNDO0FBQUEsVUFBQSxLQUFBLEVBQU8saUJBQVA7QUFBQSxVQUNBLGFBQUEsRUFBZSxpQkFEZjtBQUFBLFVBRUEsZ0JBQUEsRUFBa0IsaUJBRmxCO1NBSkQ7T0FERCxDQUFBOzs0QkFBQTs7T0FENEIsUUFBUSxDQUFDLE1BQXRDLENBQUE7V0FVTSxLQUFLLENBQUM7QUFDWCw2Q0FBQSxDQUFBOzs7Ozs7Ozs7OztPQUFBOztBQUFBLHFDQUFBLE9BQUEsR0FBUyxJQUFULENBQUE7O0FBQUEscUNBRUEsRUFBQSxHQUNDO0FBQUEsUUFBQSxPQUFBLEVBQVMsUUFBVDtBQUFBLFFBQ0Esb0JBQUEsRUFBc0Isa0JBRHRCO0FBQUEsUUFFQSxpQkFBQSxFQUFtQixtQkFGbkI7QUFBQSxRQUdBLFVBQUEsRUFBYSxZQUhiO0FBQUEsUUFJQSxhQUFBLEVBQWdCLGVBSmhCO09BSEQsQ0FBQTs7QUFBQSxxQ0FTQSxNQUFBLEdBQ0M7QUFBQSxRQUFBLDJCQUFBLEVBQTZCLGtCQUE3QjtBQUFBLFFBQ0Esb0JBQUEsRUFBdUIsbUJBRHZCO0FBQUEsUUFFQSx1QkFBQSxFQUEwQixzQkFGMUI7QUFBQSxRQUdBLG1DQUFBLEVBQXFDLGNBSHJDO0FBQUEsUUFJQSxtQ0FBQSxFQUFxQyxjQUpyQztPQVZELENBQUE7O0FBQUEscUNBZ0JBLGtCQUFBLEdBQW9CLGtCQWhCcEIsQ0FBQTs7QUFBQSxxQ0FrQkEsY0FBQSxHQUFvQixJQUFBLGNBQUEsQ0FBQSxDQWxCcEIsQ0FBQTs7QUFBQSxxQ0FvQkEsVUFBQSxHQUFZLFNBQUMsT0FBRCxHQUFBO0FBQ1gsUUFBQSxJQUFDLENBQUEsV0FBRCxHQUFlLE9BQU8sQ0FBQyxLQUF2QixDQUFBO2VBQ0EsSUFBQyxDQUFBLFdBQUQsR0FBZSxPQUFPLENBQUMsTUFGWjtNQUFBLENBcEJaLENBQUE7O0FBQUEscUNBd0JBLFFBQUEsR0FBVSxTQUFDLEtBQUQsR0FBQTtBQUNULFlBQUEsT0FBQTtBQUFBLFFBQUEsT0FBQSxHQUFVLElBQUMsQ0FBQSxjQUFjLENBQUMsR0FBaEIsQ0FBb0IsaUJBQXBCLENBQVYsQ0FBQTtlQUNBLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGdCQUEvQixDQUFnRCxPQUFoRCxFQUZTO01BQUEsQ0F4QlYsQ0FBQTs7QUFBQSxxQ0E0QkEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNQLFFBQUEsSUFBQyxDQUFBLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUF2QixDQUFBLENBQUEsQ0FBQTtlQUNBLElBQUMsQ0FBQSxFQUFFLENBQUMsa0JBQWtCLENBQUMsZ0JBQXZCLENBQUEsRUFGTztNQUFBLENBNUJSLENBQUE7O0FBQUEscUNBZ0NBLGdCQUFBLEdBQWtCLFNBQUEsR0FBQTtlQUNqQixJQUFDLENBQUEsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFWLENBQXNCLGNBQXRCLEVBRGlCO01BQUEsQ0FoQ2xCLENBQUE7O0FBQUEscUNBbUNBLFlBQUEsR0FBYyxTQUFBLEdBQUE7QUFDYixRQUFBLElBQUMsQ0FBQSxjQUFjLENBQUMsR0FBaEIsQ0FBb0IsaUJBQXBCLEVBQ0M7QUFBQSxVQUFBLElBQUEsRUFBTSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsR0FBVixDQUFjLFVBQWQsQ0FBTjtBQUFBLFVBQ0EsQ0FBQSxFQUFHLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxHQUFWLENBQWMsWUFBZCxDQURIO0FBQUEsVUFFQSxDQUFBLEVBQUcsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLEdBQVYsQ0FBYyxZQUFkLENBRkg7U0FERCxDQUFBLENBQUE7ZUFLQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsR0FBVixDQUFjLFlBQWQsRUFBNEIsUUFBNUIsRUFOYTtNQUFBLENBbkNkLENBQUE7O0FBQUEscUNBMkNBLFlBQUEsR0FBYyxTQUFBLEdBQUE7ZUFDYixDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsR0FBVixDQUFjLFlBQWQsRUFBNEIsSUFBQyxDQUFBLGNBQWMsQ0FBQyxHQUFoQixDQUFvQixpQkFBcEIsQ0FBc0MsQ0FBQyxDQUFuRSxFQURhO01BQUEsQ0EzQ2QsQ0FBQTs7QUFBQSxxQ0E4Q0EsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO2VBQ2xCLElBQUMsQ0FBQSxVQUFVLENBQUMsR0FBWixDQUFnQixFQUFoQixFQURrQjtNQUFBLENBOUNuQixDQUFBOztBQUFBLHFDQWlEQSxvQkFBQSxHQUFzQixTQUFBLEdBQUE7ZUFDckIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUFaLENBQUEsRUFEcUI7TUFBQSxDQWpEdEIsQ0FBQTs7a0NBQUE7O09BRHdDLFVBQVUsQ0FBQyxlQVp0QjtFQUFBLENBQS9CLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZWRpdG9yL3ZpZXdzL2Jhc2VUb29sYmFyUGFuZWxWaWV3LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLm1vZHVsZSAnQ2FyZEVkaXRvci52aWV3cycsICh2aWV3cywgYXBwKSAtPlxuXG5cdGNsYXNzIFBhbmVsVmlld1N0YXRlIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblx0XHRkZWZhdWx0czpcblx0XHRcdGlzT3BlbmVkOiB0cnVlXG5cdFx0XHRpc1Zpc2libGU6IHRydWVcblx0XHRcdG1heFZpc2libGVJdGVtczogNlxuXHRcdFx0dGVtcGxhdGVPcHRpb25zOlxuXHRcdFx0XHR0aXRsZTogJ9Ca0LDQutCw0Y8t0YLQviDQv9Cw0L3QtdC70YwnXG5cdFx0XHRcdGFkZEJ1dHRvblRleHQ6ICfQmtCw0LrQsNGPLdGC0L4g0LrQvdC+0L/QutCwJ1xuXHRcdFx0XHRyZW1vdmVCdXR0b25UZXh0OiAn0JrQsNC60LDRjy3RgtC+INC60L3QvtC/0LrQsCdcdFx0XHRcdFxuXG5cdGNsYXNzIHZpZXdzLkJhc2VUb29sYmFyUGFuZWxWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3XG5cdFx0bG9nZ2luZzogb25cblxuXHRcdHVpOlxuXHRcdFx0J3BhbmVsJzogJy5wYW5lbCdcblx0XHRcdCdjaGlsZFZpZXdDb250YWluZXInOiAnLml0ZW1zLWNvbnRhaW5lcidcblx0XHRcdCdjb2xsYXBzZVRvZ2dsZXInOiAnLmNvbGxhcHNlLXRvZ2dsZXInXG5cdFx0XHQnYWRkQ2hpbGQnIDogJy5hZGQtY2hpbGQnXG5cdFx0XHQncmVtb3ZlQ2hpbGQnIDogJy5yZW1vdmUtY2hpbGQnXG5cblx0XHRldmVudHM6XG5cdFx0XHQnY2xpY2sgQHVpLmNvbGxhcHNlVG9nZ2xlcic6ICdvbkNvbGxhcHNlVG9nZ2xlJ1xuXHRcdFx0J2NsaWNrIEB1aS5hZGRDaGlsZCcgOiAnb25BZGRDaGlsZENsaWNrZWQnXG5cdFx0XHQnY2xpY2sgQHVpLnJlbW92ZUNoaWxkJyA6ICdvblJlbW92ZUNoaWxkQ2tpY2tlZCdcblx0XHRcdCdtb3VzZWVudGVyIEB1aS5jaGlsZFZpZXdDb250YWluZXInOiAnb25Nb3VzZUVudGVyJ1xuXHRcdFx0J21vdXNlbGVhdmUgQHVpLmNoaWxkVmlld0NvbnRhaW5lcic6ICdvbk1vdXNlTGVhdmUnXG5cblx0XHRjaGlsZFZpZXdDb250YWluZXI6ICcuaXRlbXMtY29udGFpbmVyJ1xuXG5cdFx0cGFuZWxWaWV3U3RhdGU6IG5ldyBQYW5lbFZpZXdTdGF0ZSgpXG5cblx0XHRpbml0aWFsaXplOiAob3B0aW9ucykgLT5cblx0XHRcdEBlZGl0b3JTdGF0ZSA9IG9wdGlvbnMuc3RhdGVcblx0XHRcdEBlZGl0b3JNb2RlbCA9IG9wdGlvbnMubW9kZWxcblxuXHRcdHRlbXBsYXRlOiAobW9kZWwpID0+XG5cdFx0XHRvcHRpb25zID0gQHBhbmVsVmlld1N0YXRlLmdldCAndGVtcGxhdGVPcHRpb25zJ1xuXHRcdFx0dGVtcGxhdGl6ZXIuY2FyZEVkaXRvci50b29sYmFyLmJhc2VUb29sYmFyUGFuZWwgb3B0aW9uc1xuXG5cdFx0b25TaG93OiA9PlxuXHRcdFx0QHVpLmNoaWxkVmlld0NvbnRhaW5lci5zb3J0YWJsZSgpXG5cdFx0XHRAdWkuY2hpbGRWaWV3Q29udGFpbmVyLmRpc2FibGVTZWxlY3Rpb24oKVxuXHRcdFxuXHRcdG9uQ29sbGFwc2VUb2dnbGU6ID0+XG5cdFx0XHRAdWkucGFuZWwudG9nZ2xlQ2xhc3MgJ2lzLWNvbGxhcHNlZCdcblxuXHRcdG9uTW91c2VFbnRlcjogPT5cblx0XHRcdEBwYW5lbFZpZXdTdGF0ZS5zZXQgJ2N1cnJlbnRPdmVyZmxvdycsIFxuXHRcdFx0XHRib3RoOiAkKCdib2R5JykuY3NzKCdvdmVyZmxvdycpXG5cdFx0XHRcdHg6ICQoJ2JvZHknKS5jc3MoJ292ZXJmbG93LXgnKVxuXHRcdFx0XHR5OiAkKCdib2R5JykuY3NzKCdvdmVyZmxvdy15JylcblxuXHRcdFx0JCgnYm9keScpLmNzcyAnb3ZlcmZsb3cteScsICdoaWRkZW4nXG5cblx0XHRvbk1vdXNlTGVhdmU6ID0+XG5cdFx0XHQkKCdib2R5JykuY3NzICdvdmVyZmxvdy15JywgQHBhbmVsVmlld1N0YXRlLmdldCgnY3VycmVudE92ZXJmbG93JykueVxuXG5cdFx0b25BZGRDaGlsZENsaWNrZWQ6ID0+XG5cdFx0XHRAY29sbGVjdGlvbi5hZGQge31cblxuXHRcdG9uUmVtb3ZlQ2hpbGRDa2lja2VkOiA9PlxuXHRcdFx0QGNvbGxlY3Rpb24ucG9wKClcbiJdfQ==