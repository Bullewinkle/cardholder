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
        this.panelViewState.set('currentOverflow', $('body').css('overflow'));
        return $('body').css('overflow', 'hidden');
      };

      BaseToolbarPanelView.prototype.onMouseLeave = function() {
        return $('body').css('overflow', this.panelViewState.get('currentOverflow'));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2Jhc2VUb29sYmFyUGFuZWxWaWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O3NGQUFBOztBQUFBLEVBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVyxrQkFBWCxFQUErQixTQUFDLEtBQUQsRUFBUSxHQUFSLEdBQUE7QUFFOUIsUUFBQSxjQUFBO0FBQUEsSUFBTTtBQUNMLHVDQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSwrQkFBQSxRQUFBLEdBQ0M7QUFBQSxRQUFBLFFBQUEsRUFBVSxJQUFWO0FBQUEsUUFDQSxTQUFBLEVBQVcsSUFEWDtBQUFBLFFBRUEsZUFBQSxFQUFpQixDQUZqQjtBQUFBLFFBR0EsZUFBQSxFQUNDO0FBQUEsVUFBQSxLQUFBLEVBQU8saUJBQVA7QUFBQSxVQUNBLGFBQUEsRUFBZSxpQkFEZjtBQUFBLFVBRUEsZ0JBQUEsRUFBa0IsaUJBRmxCO1NBSkQ7T0FERCxDQUFBOzs0QkFBQTs7T0FENEIsUUFBUSxDQUFDLE1BQXRDLENBQUE7V0FVTSxLQUFLLENBQUM7QUFDWCw2Q0FBQSxDQUFBOzs7Ozs7Ozs7OztPQUFBOztBQUFBLHFDQUFBLE9BQUEsR0FBUyxJQUFULENBQUE7O0FBQUEscUNBRUEsRUFBQSxHQUNDO0FBQUEsUUFBQSxPQUFBLEVBQVMsUUFBVDtBQUFBLFFBQ0Esb0JBQUEsRUFBc0Isa0JBRHRCO0FBQUEsUUFFQSxpQkFBQSxFQUFtQixtQkFGbkI7QUFBQSxRQUdBLFVBQUEsRUFBYSxZQUhiO0FBQUEsUUFJQSxhQUFBLEVBQWdCLGVBSmhCO09BSEQsQ0FBQTs7QUFBQSxxQ0FTQSxNQUFBLEdBQ0M7QUFBQSxRQUFBLDJCQUFBLEVBQTZCLGtCQUE3QjtBQUFBLFFBQ0Esb0JBQUEsRUFBdUIsbUJBRHZCO0FBQUEsUUFFQSx1QkFBQSxFQUEwQixzQkFGMUI7QUFBQSxRQUdBLG1DQUFBLEVBQXFDLGNBSHJDO0FBQUEsUUFJQSxtQ0FBQSxFQUFxQyxjQUpyQztPQVZELENBQUE7O0FBQUEscUNBZ0JBLGtCQUFBLEdBQW9CLGtCQWhCcEIsQ0FBQTs7QUFBQSxxQ0FrQkEsY0FBQSxHQUFvQixJQUFBLGNBQUEsQ0FBQSxDQWxCcEIsQ0FBQTs7QUFBQSxxQ0FvQkEsVUFBQSxHQUFZLFNBQUMsT0FBRCxHQUFBO0FBQ1gsUUFBQSxJQUFDLENBQUEsV0FBRCxHQUFlLE9BQU8sQ0FBQyxLQUF2QixDQUFBO2VBQ0EsSUFBQyxDQUFBLFdBQUQsR0FBZSxPQUFPLENBQUMsTUFGWjtNQUFBLENBcEJaLENBQUE7O0FBQUEscUNBd0JBLFFBQUEsR0FBVSxTQUFDLEtBQUQsR0FBQTtBQUNULFlBQUEsT0FBQTtBQUFBLFFBQUEsT0FBQSxHQUFVLElBQUMsQ0FBQSxjQUFjLENBQUMsR0FBaEIsQ0FBb0IsaUJBQXBCLENBQVYsQ0FBQTtlQUNBLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGdCQUEvQixDQUFnRCxPQUFoRCxFQUZTO01BQUEsQ0F4QlYsQ0FBQTs7QUFBQSxxQ0E0QkEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNQLFFBQUEsSUFBQyxDQUFBLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUF2QixDQUFBLENBQUEsQ0FBQTtlQUNBLElBQUMsQ0FBQSxFQUFFLENBQUMsa0JBQWtCLENBQUMsZ0JBQXZCLENBQUEsRUFGTztNQUFBLENBNUJSLENBQUE7O0FBQUEscUNBZ0NBLGdCQUFBLEdBQWtCLFNBQUEsR0FBQTtlQUNqQixJQUFDLENBQUEsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFWLENBQXNCLGNBQXRCLEVBRGlCO01BQUEsQ0FoQ2xCLENBQUE7O0FBQUEscUNBbUNBLFlBQUEsR0FBYyxTQUFBLEdBQUE7QUFDYixRQUFBLElBQUMsQ0FBQSxjQUFjLENBQUMsR0FBaEIsQ0FBb0IsaUJBQXBCLEVBQXVDLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxHQUFWLENBQWMsVUFBZCxDQUF2QyxDQUFBLENBQUE7ZUFDQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsR0FBVixDQUFjLFVBQWQsRUFBMEIsUUFBMUIsRUFGYTtNQUFBLENBbkNkLENBQUE7O0FBQUEscUNBdUNBLFlBQUEsR0FBYyxTQUFBLEdBQUE7ZUFDYixDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsR0FBVixDQUFjLFVBQWQsRUFBMEIsSUFBQyxDQUFBLGNBQWMsQ0FBQyxHQUFoQixDQUFvQixpQkFBcEIsQ0FBMUIsRUFEYTtNQUFBLENBdkNkLENBQUE7O0FBQUEscUNBMENBLGlCQUFBLEdBQW1CLFNBQUEsR0FBQTtlQUNsQixJQUFDLENBQUEsVUFBVSxDQUFDLEdBQVosQ0FBZ0IsRUFBaEIsRUFEa0I7TUFBQSxDQTFDbkIsQ0FBQTs7QUFBQSxxQ0E2Q0Esb0JBQUEsR0FBc0IsU0FBQSxHQUFBO2VBQ3JCLElBQUMsQ0FBQSxVQUFVLENBQUMsR0FBWixDQUFBLEVBRHFCO01BQUEsQ0E3Q3RCLENBQUE7O2tDQUFBOztPQUR3QyxVQUFVLENBQUMsZUFadEI7RUFBQSxDQUEvQixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkX2VkaXRvci92aWV3cy9iYXNlVG9vbGJhclBhbmVsVmlldy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImFwcC5tb2R1bGUgJ0NhcmRFZGl0b3Iudmlld3MnLCAodmlld3MsIGFwcCkgLT5cblxuXHRjbGFzcyBQYW5lbFZpZXdTdGF0ZSBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cdFx0ZGVmYXVsdHM6XG5cdFx0XHRpc09wZW5lZDogdHJ1ZVxuXHRcdFx0aXNWaXNpYmxlOiB0cnVlXG5cdFx0XHRtYXhWaXNpYmxlSXRlbXM6IDZcblx0XHRcdHRlbXBsYXRlT3B0aW9uczpcblx0XHRcdFx0dGl0bGU6ICfQmtCw0LrQsNGPLdGC0L4g0L/QsNC90LXQu9GMJ1xuXHRcdFx0XHRhZGRCdXR0b25UZXh0OiAn0JrQsNC60LDRjy3RgtC+INC60L3QvtC/0LrQsCdcblx0XHRcdFx0cmVtb3ZlQnV0dG9uVGV4dDogJ9Ca0LDQutCw0Y8t0YLQviDQutC90L7Qv9C60LAnXHRcdFx0XHRcblxuXHRjbGFzcyB2aWV3cy5CYXNlVG9vbGJhclBhbmVsVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29tcG9zaXRlVmlld1xuXHRcdGxvZ2dpbmc6IG9uXG5cblx0XHR1aTpcblx0XHRcdCdwYW5lbCc6ICcucGFuZWwnXG5cdFx0XHQnY2hpbGRWaWV3Q29udGFpbmVyJzogJy5pdGVtcy1jb250YWluZXInXG5cdFx0XHQnY29sbGFwc2VUb2dnbGVyJzogJy5jb2xsYXBzZS10b2dnbGVyJ1xuXHRcdFx0J2FkZENoaWxkJyA6ICcuYWRkLWNoaWxkJ1xuXHRcdFx0J3JlbW92ZUNoaWxkJyA6ICcucmVtb3ZlLWNoaWxkJ1xuXG5cdFx0ZXZlbnRzOlxuXHRcdFx0J2NsaWNrIEB1aS5jb2xsYXBzZVRvZ2dsZXInOiAnb25Db2xsYXBzZVRvZ2dsZSdcblx0XHRcdCdjbGljayBAdWkuYWRkQ2hpbGQnIDogJ29uQWRkQ2hpbGRDbGlja2VkJ1xuXHRcdFx0J2NsaWNrIEB1aS5yZW1vdmVDaGlsZCcgOiAnb25SZW1vdmVDaGlsZENraWNrZWQnXG5cdFx0XHQnbW91c2VlbnRlciBAdWkuY2hpbGRWaWV3Q29udGFpbmVyJzogJ29uTW91c2VFbnRlcidcblx0XHRcdCdtb3VzZWxlYXZlIEB1aS5jaGlsZFZpZXdDb250YWluZXInOiAnb25Nb3VzZUxlYXZlJ1xuXG5cdFx0Y2hpbGRWaWV3Q29udGFpbmVyOiAnLml0ZW1zLWNvbnRhaW5lcidcblxuXHRcdHBhbmVsVmlld1N0YXRlOiBuZXcgUGFuZWxWaWV3U3RhdGUoKVxuXG5cdFx0aW5pdGlhbGl6ZTogKG9wdGlvbnMpIC0+XG5cdFx0XHRAZWRpdG9yU3RhdGUgPSBvcHRpb25zLnN0YXRlXG5cdFx0XHRAZWRpdG9yTW9kZWwgPSBvcHRpb25zLm1vZGVsXG5cblx0XHR0ZW1wbGF0ZTogKG1vZGVsKSA9PlxuXHRcdFx0b3B0aW9ucyA9IEBwYW5lbFZpZXdTdGF0ZS5nZXQgJ3RlbXBsYXRlT3B0aW9ucydcblx0XHRcdHRlbXBsYXRpemVyLmNhcmRFZGl0b3IudG9vbGJhci5iYXNlVG9vbGJhclBhbmVsIG9wdGlvbnNcblxuXHRcdG9uU2hvdzogPT5cblx0XHRcdEB1aS5jaGlsZFZpZXdDb250YWluZXIuc29ydGFibGUoKVxuXHRcdFx0QHVpLmNoaWxkVmlld0NvbnRhaW5lci5kaXNhYmxlU2VsZWN0aW9uKClcblx0XHRcblx0XHRvbkNvbGxhcHNlVG9nZ2xlOiA9PlxuXHRcdFx0QHVpLnBhbmVsLnRvZ2dsZUNsYXNzICdpcy1jb2xsYXBzZWQnXG5cblx0XHRvbk1vdXNlRW50ZXI6ID0+XG5cdFx0XHRAcGFuZWxWaWV3U3RhdGUuc2V0ICdjdXJyZW50T3ZlcmZsb3cnLCAkKCdib2R5JykuY3NzKCdvdmVyZmxvdycpXG5cdFx0XHQkKCdib2R5JykuY3NzICdvdmVyZmxvdycsICdoaWRkZW4nXG5cblx0XHRvbk1vdXNlTGVhdmU6ID0+XG5cdFx0XHQkKCdib2R5JykuY3NzICdvdmVyZmxvdycsIEBwYW5lbFZpZXdTdGF0ZS5nZXQgJ2N1cnJlbnRPdmVyZmxvdydcblxuXHRcdG9uQWRkQ2hpbGRDbGlja2VkOiA9PlxuXHRcdFx0QGNvbGxlY3Rpb24uYWRkIHt9XG5cblx0XHRvblJlbW92ZUNoaWxkQ2tpY2tlZDogPT5cblx0XHRcdEBjb2xsZWN0aW9uLnBvcCgpXG4iXX0=