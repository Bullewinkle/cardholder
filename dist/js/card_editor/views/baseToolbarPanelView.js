(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  app.module('CardEditor.views', function(views) {
    var ToolbarPanelState;
    ToolbarPanelState = (function(_super) {
      __extends(ToolbarPanelState, _super);

      function ToolbarPanelState() {
        return ToolbarPanelState.__super__.constructor.apply(this, arguments);
      }

      ToolbarPanelState.prototype.defaults = {
        isOpened: true,
        isVisible: true,
        maxVisibleItems: 6,
        templateOptions: {
          title: 'Какая-то панель',
          addButtonText: 'Какая-то кнопка',
          removeButtonText: 'Какая-то кнопка'
        }
      };

      return ToolbarPanelState;

    })(Backbone.Model);
    return views.BaseToolbarPanelView = (function(_super) {
      __extends(BaseToolbarPanelView, _super);

      function BaseToolbarPanelView() {
        this.onMouseLeave = __bind(this.onMouseLeave, this);
        this.onMouseEnter = __bind(this.onMouseEnter, this);
        this.onCollapseToggle = __bind(this.onCollapseToggle, this);
        this.onRemoveChildCkicked = __bind(this.onRemoveChildCkicked, this);
        this.onAddChildClicked = __bind(this.onAddChildClicked, this);
        this.onShow = __bind(this.onShow, this);
        this.template = __bind(this.template, this);
        return BaseToolbarPanelView.__super__.constructor.apply(this, arguments);
      }

      BaseToolbarPanelView.prototype.logging = false;

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

      BaseToolbarPanelView.prototype.state = new ToolbarPanelState();

      BaseToolbarPanelView.prototype.initialize = function() {
        return this.bind('all', function() {
          if (this.logging === true) {
            return console.log("PANEL VIEW:\t", arguments);
          }
        });
      };

      BaseToolbarPanelView.prototype.template = function(model) {
        var options;
        options = this.state.get('templateOptions');
        return templatizer.cardEditor.toolbar.baseToolbarPanel(options);
      };

      BaseToolbarPanelView.prototype.onShow = function() {
        this.ui.childViewContainer.sortable();
        return this.ui.childViewContainer.disableSelection();
      };

      BaseToolbarPanelView.prototype.onAddChildClicked = function() {
        return this.collection.add({
          name: 'one'
        });
      };

      BaseToolbarPanelView.prototype.onRemoveChildCkicked = function() {
        var _ref;
        return (_ref = this.collection.models[this.collection.models.length - 1]) != null ? _ref.destroy() : void 0;
      };

      BaseToolbarPanelView.prototype.onCollapseToggle = function() {
        console.log('toggle collapse');
        return this.ui.panel.toggleClass('is-collapsed');
      };

      BaseToolbarPanelView.prototype.onMouseEnter = function() {
        this.state.set('currentOverflow', $('body').css('overflow'));
        return $('body').css('overflow', 'hidden');
      };

      BaseToolbarPanelView.prototype.onMouseLeave = function() {
        return $('body').css('overflow', this.state.get('currentOverflow'));
      };

      return BaseToolbarPanelView;

    })(Marionette.CompositeView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL2Jhc2VUb29sYmFyUGFuZWxWaWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O3NGQUFBOztBQUFBLEVBQUEsR0FBRyxDQUFDLE1BQUosQ0FBVyxrQkFBWCxFQUErQixTQUFDLEtBQUQsR0FBQTtBQUU5QixRQUFBLGlCQUFBO0FBQUEsSUFBTTtBQUNMLDBDQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSxrQ0FBQSxRQUFBLEdBQ0M7QUFBQSxRQUFBLFFBQUEsRUFBVSxJQUFWO0FBQUEsUUFDQSxTQUFBLEVBQVcsSUFEWDtBQUFBLFFBRUEsZUFBQSxFQUFpQixDQUZqQjtBQUFBLFFBR0EsZUFBQSxFQUNDO0FBQUEsVUFBQSxLQUFBLEVBQU8saUJBQVA7QUFBQSxVQUNBLGFBQUEsRUFBZSxpQkFEZjtBQUFBLFVBRUEsZ0JBQUEsRUFBa0IsaUJBRmxCO1NBSkQ7T0FERCxDQUFBOzsrQkFBQTs7T0FEK0IsUUFBUSxDQUFDLE1BQXpDLENBQUE7V0FVTSxLQUFLLENBQUM7QUFDWCw2Q0FBQSxDQUFBOzs7Ozs7Ozs7OztPQUFBOztBQUFBLHFDQUFBLE9BQUEsR0FBUyxLQUFULENBQUE7O0FBQUEscUNBRUEsRUFBQSxHQUNDO0FBQUEsUUFBQSxPQUFBLEVBQVMsUUFBVDtBQUFBLFFBQ0Esb0JBQUEsRUFBc0Isa0JBRHRCO0FBQUEsUUFFQSxpQkFBQSxFQUFtQixtQkFGbkI7QUFBQSxRQUdBLFVBQUEsRUFBYSxZQUhiO0FBQUEsUUFJQSxhQUFBLEVBQWdCLGVBSmhCO09BSEQsQ0FBQTs7QUFBQSxxQ0FTQSxNQUFBLEdBQ0M7QUFBQSxRQUFBLDJCQUFBLEVBQTZCLGtCQUE3QjtBQUFBLFFBQ0Esb0JBQUEsRUFBdUIsbUJBRHZCO0FBQUEsUUFFQSx1QkFBQSxFQUEwQixzQkFGMUI7QUFBQSxRQUdBLG1DQUFBLEVBQXFDLGNBSHJDO0FBQUEsUUFJQSxtQ0FBQSxFQUFxQyxjQUpyQztPQVZELENBQUE7O0FBQUEscUNBZ0JBLGtCQUFBLEdBQW9CLGtCQWhCcEIsQ0FBQTs7QUFBQSxxQ0FrQkEsS0FBQSxHQUFXLElBQUEsaUJBQUEsQ0FBQSxDQWxCWCxDQUFBOztBQUFBLHFDQW9CQSxVQUFBLEdBQVksU0FBQSxHQUFBO2VBQ1gsSUFBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLEVBQWEsU0FBQSxHQUFBO0FBQ1osVUFBQSxJQUEwQyxJQUFDLENBQUEsT0FBRCxLQUFZLElBQXREO21CQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksZUFBWixFQUE2QixTQUE3QixFQUFBO1dBRFk7UUFBQSxDQUFiLEVBRFc7TUFBQSxDQXBCWixDQUFBOztBQUFBLHFDQXdCQSxRQUFBLEdBQVUsU0FBQyxLQUFELEdBQUE7QUFDVCxZQUFBLE9BQUE7QUFBQSxRQUFBLE9BQUEsR0FBVSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxpQkFBWCxDQUFWLENBQUE7ZUFDQSxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxnQkFBL0IsQ0FBZ0QsT0FBaEQsRUFGUztNQUFBLENBeEJWLENBQUE7O0FBQUEscUNBNEJBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDUCxRQUFBLElBQUMsQ0FBQSxFQUFFLENBQUMsa0JBQWtCLENBQUMsUUFBdkIsQ0FBQSxDQUFBLENBQUE7ZUFDQSxJQUFDLENBQUEsRUFBRSxDQUFDLGtCQUFrQixDQUFDLGdCQUF2QixDQUFBLEVBRk87TUFBQSxDQTVCUixDQUFBOztBQUFBLHFDQWdDQSxpQkFBQSxHQUFtQixTQUFBLEdBQUE7ZUFDbEIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxHQUFaLENBQWdCO0FBQUEsVUFBQSxJQUFBLEVBQU0sS0FBTjtTQUFoQixFQURrQjtNQUFBLENBaENuQixDQUFBOztBQUFBLHFDQW1DQSxvQkFBQSxHQUFzQixTQUFBLEdBQUE7QUFDckIsWUFBQSxJQUFBO2dHQUErQyxDQUFFLE9BQWpELENBQUEsV0FEcUI7TUFBQSxDQW5DdEIsQ0FBQTs7QUFBQSxxQ0FzQ0EsZ0JBQUEsR0FBa0IsU0FBQSxHQUFBO0FBQ2pCLFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxpQkFBWixDQUFBLENBQUE7ZUFDQSxJQUFDLENBQUEsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFWLENBQXNCLGNBQXRCLEVBRmlCO01BQUEsQ0F0Q2xCLENBQUE7O0FBQUEscUNBMENBLFlBQUEsR0FBYyxTQUFBLEdBQUE7QUFDYixRQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLGlCQUFYLEVBQThCLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxHQUFWLENBQWMsVUFBZCxDQUE5QixDQUFBLENBQUE7ZUFDQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsR0FBVixDQUFjLFVBQWQsRUFBMEIsUUFBMUIsRUFGYTtNQUFBLENBMUNkLENBQUE7O0FBQUEscUNBOENBLFlBQUEsR0FBYyxTQUFBLEdBQUE7ZUFDYixDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsR0FBVixDQUFjLFVBQWQsRUFBMEIsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsaUJBQVgsQ0FBMUIsRUFEYTtNQUFBLENBOUNkLENBQUE7O2tDQUFBOztPQUR3QyxVQUFVLENBQUMsZUFadEI7RUFBQSxDQUEvQixDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkX2VkaXRvci92aWV3cy9iYXNlVG9vbGJhclBhbmVsVmlldy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImFwcC5tb2R1bGUgJ0NhcmRFZGl0b3Iudmlld3MnLCAodmlld3MpIC0+XG5cblx0Y2xhc3MgVG9vbGJhclBhbmVsU3RhdGUgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuXHRcdGRlZmF1bHRzOlxuXHRcdFx0aXNPcGVuZWQ6IHRydWVcblx0XHRcdGlzVmlzaWJsZTogdHJ1ZVxuXHRcdFx0bWF4VmlzaWJsZUl0ZW1zOiA2XG5cdFx0XHR0ZW1wbGF0ZU9wdGlvbnM6XG5cdFx0XHRcdHRpdGxlOiAn0JrQsNC60LDRjy3RgtC+INC/0LDQvdC10LvRjCdcblx0XHRcdFx0YWRkQnV0dG9uVGV4dDogJ9Ca0LDQutCw0Y8t0YLQviDQutC90L7Qv9C60LAnXG5cdFx0XHRcdHJlbW92ZUJ1dHRvblRleHQ6ICfQmtCw0LrQsNGPLdGC0L4g0LrQvdC+0L/QutCwJ1x0XHRcdFx0XG5cblx0Y2xhc3Mgdmlld3MuQmFzZVRvb2xiYXJQYW5lbFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXdcblx0XHRsb2dnaW5nOiBvZmZcblxuXHRcdHVpOlxuXHRcdFx0J3BhbmVsJzogJy5wYW5lbCdcblx0XHRcdCdjaGlsZFZpZXdDb250YWluZXInOiAnLml0ZW1zLWNvbnRhaW5lcidcblx0XHRcdCdjb2xsYXBzZVRvZ2dsZXInOiAnLmNvbGxhcHNlLXRvZ2dsZXInXG5cdFx0XHQnYWRkQ2hpbGQnIDogJy5hZGQtY2hpbGQnXG5cdFx0XHQncmVtb3ZlQ2hpbGQnIDogJy5yZW1vdmUtY2hpbGQnXG5cblx0XHRldmVudHM6XG5cdFx0XHQnY2xpY2sgQHVpLmNvbGxhcHNlVG9nZ2xlcic6ICdvbkNvbGxhcHNlVG9nZ2xlJ1xuXHRcdFx0J2NsaWNrIEB1aS5hZGRDaGlsZCcgOiAnb25BZGRDaGlsZENsaWNrZWQnXG5cdFx0XHQnY2xpY2sgQHVpLnJlbW92ZUNoaWxkJyA6ICdvblJlbW92ZUNoaWxkQ2tpY2tlZCdcblx0XHRcdCdtb3VzZWVudGVyIEB1aS5jaGlsZFZpZXdDb250YWluZXInOiAnb25Nb3VzZUVudGVyJ1xuXHRcdFx0J21vdXNlbGVhdmUgQHVpLmNoaWxkVmlld0NvbnRhaW5lcic6ICdvbk1vdXNlTGVhdmUnXG5cblx0XHRjaGlsZFZpZXdDb250YWluZXI6ICcuaXRlbXMtY29udGFpbmVyJ1xuXG5cdFx0c3RhdGU6IG5ldyBUb29sYmFyUGFuZWxTdGF0ZSgpXG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsIC0+XG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiUEFORUwgVklFVzpcXHRcIiwgYXJndW1lbnRzIGlmIEBsb2dnaW5nIGlzIG9uXG5cblx0XHR0ZW1wbGF0ZTogKG1vZGVsKSA9PlxuXHRcdFx0b3B0aW9ucyA9IEBzdGF0ZS5nZXQgJ3RlbXBsYXRlT3B0aW9ucydcblx0XHRcdHRlbXBsYXRpemVyLmNhcmRFZGl0b3IudG9vbGJhci5iYXNlVG9vbGJhclBhbmVsIG9wdGlvbnNcblxuXHRcdG9uU2hvdzogPT5cblx0XHRcdEB1aS5jaGlsZFZpZXdDb250YWluZXIuc29ydGFibGUoKVxuXHRcdFx0QHVpLmNoaWxkVmlld0NvbnRhaW5lci5kaXNhYmxlU2VsZWN0aW9uKClcblx0XHRcblx0XHRvbkFkZENoaWxkQ2xpY2tlZDogPT5cblx0XHRcdEBjb2xsZWN0aW9uLmFkZCBuYW1lOiAnb25lJ1xuXG5cdFx0b25SZW1vdmVDaGlsZENraWNrZWQ6ID0+XG5cdFx0XHRAY29sbGVjdGlvbi5tb2RlbHNbQGNvbGxlY3Rpb24ubW9kZWxzLmxlbmd0aC0xXT8uZGVzdHJveSgpXG5cblx0XHRvbkNvbGxhcHNlVG9nZ2xlOiA9PlxuXHRcdFx0Y29uc29sZS5sb2cgJ3RvZ2dsZSBjb2xsYXBzZSdcblx0XHRcdEB1aS5wYW5lbC50b2dnbGVDbGFzcyAnaXMtY29sbGFwc2VkJ1xuXG5cdFx0b25Nb3VzZUVudGVyOiA9PlxuXHRcdFx0QHN0YXRlLnNldCAnY3VycmVudE92ZXJmbG93JywgJCgnYm9keScpLmNzcygnb3ZlcmZsb3cnKVxuXHRcdFx0JCgnYm9keScpLmNzcyAnb3ZlcmZsb3cnLCAnaGlkZGVuJ1xuXG5cdFx0b25Nb3VzZUxlYXZlOiA9PlxuXHRcdFx0JCgnYm9keScpLmNzcyAnb3ZlcmZsb3cnLCBAc3RhdGUuZ2V0ICdjdXJyZW50T3ZlcmZsb3cnXG4iXX0=