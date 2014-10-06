(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  app.module('CardEditor.views', function(views, app) {
    var TextModel;
    TextModel = (function(_super) {
      __extends(TextModel, _super);

      function TextModel() {
        return TextModel.__super__.constructor.apply(this, arguments);
      }

      TextModel.prototype.defaults = {
        name: 'Иван',
        surname: 'Иванович',
        phone: 'Иванов',
        email: 'email@email.com',
        position: 'Должность Ивана Ивановича'
      };

      return TextModel;

    })(Backbone.Model);
    return views.TextPanel = (function(_super) {
      __extends(TextPanel, _super);

      function TextPanel() {
        this.onModelChange = __bind(this.onModelChange, this);
        this.onInput = __bind(this.onInput, this);
        this.template = __bind(this.template, this);
        return TextPanel.__super__.constructor.apply(this, arguments);
      }

      TextPanel.prototype.logging = true;

      TextPanel.prototype.className = 'text';

      TextPanel.prototype.modelEvents = {
        'change': 'onModelChange'
      };

      TextPanel.prototype.template = function() {
        return templatizer.cardEditor.toolbar.text(this.panelViewState.attributes);
      };

      TextPanel.prototype.initialize = function() {
        TextPanel.__super__.initialize.apply(this, arguments);
        this.ui.inputs = 'input';
        this.events['input @ui.inputs'] = 'onInput';
        this.model = new TextModel();
        return this.panelViewState.set({
          title: 'Текст',
          gotBody: false
        });
      };

      TextPanel.prototype.onInput = function(e) {
        var key;
        key = $(e.currentTarget).attr('name');
        return this.model.set(key, $(e.currentTarget).val());
      };

      TextPanel.prototype.onModelChange = function() {
        return this.trigger('text:changed', this.model.toJSON());
      };

      return TextPanel;

    })(views._BaseToolbarPanelView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL3ZpZXdzL3RleHQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7c0ZBQUE7O0FBQUEsRUFBQSxHQUFHLENBQUMsTUFBSixDQUFXLGtCQUFYLEVBQStCLFNBQUMsS0FBRCxFQUFRLEdBQVIsR0FBQTtBQUU5QixRQUFBLFNBQUE7QUFBQSxJQUFNO0FBQ0wsa0NBQUEsQ0FBQTs7OztPQUFBOztBQUFBLDBCQUFBLFFBQUEsR0FDQztBQUFBLFFBQUEsSUFBQSxFQUFNLE1BQU47QUFBQSxRQUNBLE9BQUEsRUFBUyxVQURUO0FBQUEsUUFFQSxLQUFBLEVBQU8sUUFGUDtBQUFBLFFBR0EsS0FBQSxFQUFPLGlCQUhQO0FBQUEsUUFJQSxRQUFBLEVBQVUsMkJBSlY7T0FERCxDQUFBOzt1QkFBQTs7T0FEdUIsUUFBUSxDQUFDLE1BQWpDLENBQUE7V0FTTSxLQUFLLENBQUM7QUFDWCxrQ0FBQSxDQUFBOzs7Ozs7O09BQUE7O0FBQUEsMEJBQUEsT0FBQSxHQUFTLElBQVQsQ0FBQTs7QUFBQSwwQkFFQSxTQUFBLEdBQVcsTUFGWCxDQUFBOztBQUFBLDBCQVdBLFdBQUEsR0FDQztBQUFBLFFBQUEsUUFBQSxFQUFVLGVBQVY7T0FaRCxDQUFBOztBQUFBLDBCQWNBLFFBQUEsR0FBVSxTQUFBLEdBQUE7ZUFDVCxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUEvQixDQUFvQyxJQUFDLENBQUEsY0FBYyxDQUFDLFVBQXBELEVBRFM7TUFBQSxDQWRWLENBQUE7O0FBQUEsMEJBaUJBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFBLDJDQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsRUFBRSxDQUFDLE1BQUosR0FBYSxPQURiLENBQUE7QUFBQSxRQUVBLElBQUMsQ0FBQSxNQUFPLENBQUEsa0JBQUEsQ0FBUixHQUE4QixTQUY5QixDQUFBO0FBQUEsUUFJQSxJQUFDLENBQUEsS0FBRCxHQUFjLElBQUEsU0FBQSxDQUFBLENBSmQsQ0FBQTtlQUtBLElBQUMsQ0FBQSxjQUFjLENBQUMsR0FBaEIsQ0FDQztBQUFBLFVBQUEsS0FBQSxFQUFPLE9BQVA7QUFBQSxVQUNBLE9BQUEsRUFBUyxLQURUO1NBREQsRUFOVztNQUFBLENBakJaLENBQUE7O0FBQUEsMEJBMkJBLE9BQUEsR0FBUyxTQUFDLENBQUQsR0FBQTtBQUNSLFlBQUEsR0FBQTtBQUFBLFFBQUEsR0FBQSxHQUFNLENBQUEsQ0FBRSxDQUFDLENBQUMsYUFBSixDQUFrQixDQUFDLElBQW5CLENBQXdCLE1BQXhCLENBQU4sQ0FBQTtlQUNBLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFXLEdBQVgsRUFBZ0IsQ0FBQSxDQUFFLENBQUMsQ0FBQyxhQUFKLENBQWtCLENBQUMsR0FBbkIsQ0FBQSxDQUFoQixFQUZRO01BQUEsQ0EzQlQsQ0FBQTs7QUFBQSwwQkErQkEsYUFBQSxHQUFlLFNBQUEsR0FBQTtlQUNkLElBQUMsQ0FBQSxPQUFELENBQVMsY0FBVCxFQUF5QixJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsQ0FBQSxDQUF6QixFQURjO01BQUEsQ0EvQmYsQ0FBQTs7dUJBQUE7O09BRDZCLEtBQUssQ0FBQyx1QkFYTjtFQUFBLENBQS9CLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZWRpdG9yL3ZpZXdzL3RleHQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJhcHAubW9kdWxlICdDYXJkRWRpdG9yLnZpZXdzJywgKHZpZXdzLCBhcHApIC0+XG5cblx0Y2xhc3MgVGV4dE1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblx0XHRkZWZhdWx0czpcblx0XHRcdG5hbWU6ICfQmNCy0LDQvSdcblx0XHRcdHN1cm5hbWU6ICfQmNCy0LDQvdC+0LLQuNGHJ1xuXHRcdFx0cGhvbmU6ICfQmNCy0LDQvdC+0LInXG5cdFx0XHRlbWFpbDogJ2VtYWlsQGVtYWlsLmNvbSdcblx0XHRcdHBvc2l0aW9uOiAn0JTQvtC70LbQvdC+0YHRgtGMINCY0LLQsNC90LAg0JjQstCw0L3QvtCy0LjRh9CwJ1xuXG5cdFxuXHRjbGFzcyB2aWV3cy5UZXh0UGFuZWwgZXh0ZW5kcyB2aWV3cy5fQmFzZVRvb2xiYXJQYW5lbFZpZXdcblx0XHRsb2dnaW5nOiBvblxuXG5cdFx0Y2xhc3NOYW1lOiAndGV4dCdcblxuXHRcdCMgY2hpbGRWaWV3OiB2aWV3cy5JY29uXG5cblx0XHQjIHVpOlxuXHRcdCMgXHQnaW5wdXRzJyA6ICdpbnB1dCdcblxuXHRcdCMgb25TaG93OiA9PlxuXHRcdCMgXHRpZiBAbG9nZ2luZyBpcyBvbiB0aGVuIEBiaW5kICdhbGwnLCAtPiBjb25zb2xlLmxvZyBcIklDT05TIFBBTkVMIFZJRVc6XFx0XCIsIGFyZ3VtZW50c1xuXHRcdG1vZGVsRXZlbnRzOlxuXHRcdFx0J2NoYW5nZSc6ICdvbk1vZGVsQ2hhbmdlJ1xuXG5cdFx0dGVtcGxhdGU6ID0+XG5cdFx0XHR0ZW1wbGF0aXplci5jYXJkRWRpdG9yLnRvb2xiYXIudGV4dCBAcGFuZWxWaWV3U3RhdGUuYXR0cmlidXRlc1xuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdHN1cGVyXG5cdFx0XHRAdWkuaW5wdXRzID0gJ2lucHV0J1xuXHRcdFx0QGV2ZW50c1snaW5wdXQgQHVpLmlucHV0cyddID0gJ29uSW5wdXQnXG5cblx0XHRcdEBtb2RlbCAgPSBuZXcgVGV4dE1vZGVsKClcblx0XHRcdEBwYW5lbFZpZXdTdGF0ZS5zZXRcblx0XHRcdFx0dGl0bGU6ICfQotC10LrRgdGCJ1xuXHRcdFx0XHRnb3RCb2R5OiBmYWxzZVxuXG5cdFx0b25JbnB1dDogKGUpID0+XG5cdFx0XHRrZXkgPSAkKGUuY3VycmVudFRhcmdldCkuYXR0cignbmFtZScpXG5cdFx0XHRAbW9kZWwuc2V0IGtleSwgJChlLmN1cnJlbnRUYXJnZXQpLnZhbCgpXG5cblx0XHRvbk1vZGVsQ2hhbmdlOiA9PlxuXHRcdFx0QHRyaWdnZXIgJ3RleHQ6Y2hhbmdlZCcsIEBtb2RlbC50b0pTT04oKVxuXG4iXX0=