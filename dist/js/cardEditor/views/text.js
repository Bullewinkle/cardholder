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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRFZGl0b3Ivdmlld3MvdGV4dC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztzRkFBQTs7QUFBQSxFQUFBLEdBQUcsQ0FBQyxNQUFKLENBQVcsa0JBQVgsRUFBK0IsU0FBQyxLQUFELEVBQVEsR0FBUixHQUFBO0FBRTlCLFFBQUEsU0FBQTtBQUFBLElBQU07QUFDTCxrQ0FBQSxDQUFBOzs7O09BQUE7O0FBQUEsMEJBQUEsUUFBQSxHQUNDO0FBQUEsUUFBQSxJQUFBLEVBQU0sTUFBTjtBQUFBLFFBQ0EsT0FBQSxFQUFTLFVBRFQ7QUFBQSxRQUVBLEtBQUEsRUFBTyxRQUZQO0FBQUEsUUFHQSxLQUFBLEVBQU8saUJBSFA7QUFBQSxRQUlBLFFBQUEsRUFBVSwyQkFKVjtPQURELENBQUE7O3VCQUFBOztPQUR1QixRQUFRLENBQUMsTUFBakMsQ0FBQTtXQVNNLEtBQUssQ0FBQztBQUNYLGtDQUFBLENBQUE7Ozs7Ozs7T0FBQTs7QUFBQSwwQkFBQSxPQUFBLEdBQVMsSUFBVCxDQUFBOztBQUFBLDBCQUVBLFNBQUEsR0FBVyxNQUZYLENBQUE7O0FBQUEsMEJBV0EsV0FBQSxHQUNDO0FBQUEsUUFBQSxRQUFBLEVBQVUsZUFBVjtPQVpELENBQUE7O0FBQUEsMEJBY0EsUUFBQSxHQUFVLFNBQUEsR0FBQTtlQUNULFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQS9CLENBQW9DLElBQUMsQ0FBQSxjQUFjLENBQUMsVUFBcEQsRUFEUztNQUFBLENBZFYsQ0FBQTs7QUFBQSwwQkFpQkEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNYLFFBQUEsMkNBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxRQUNBLElBQUMsQ0FBQSxFQUFFLENBQUMsTUFBSixHQUFhLE9BRGIsQ0FBQTtBQUFBLFFBRUEsSUFBQyxDQUFBLE1BQU8sQ0FBQSxrQkFBQSxDQUFSLEdBQThCLFNBRjlCLENBQUE7QUFBQSxRQUlBLElBQUMsQ0FBQSxLQUFELEdBQWMsSUFBQSxTQUFBLENBQUEsQ0FKZCxDQUFBO2VBS0EsSUFBQyxDQUFBLGNBQWMsQ0FBQyxHQUFoQixDQUNDO0FBQUEsVUFBQSxLQUFBLEVBQU8sT0FBUDtBQUFBLFVBQ0EsT0FBQSxFQUFTLEtBRFQ7U0FERCxFQU5XO01BQUEsQ0FqQlosQ0FBQTs7QUFBQSwwQkEyQkEsT0FBQSxHQUFTLFNBQUMsQ0FBRCxHQUFBO0FBQ1IsWUFBQSxHQUFBO0FBQUEsUUFBQSxHQUFBLEdBQU0sQ0FBQSxDQUFFLENBQUMsQ0FBQyxhQUFKLENBQWtCLENBQUMsSUFBbkIsQ0FBd0IsTUFBeEIsQ0FBTixDQUFBO2VBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVcsR0FBWCxFQUFnQixDQUFBLENBQUUsQ0FBQyxDQUFDLGFBQUosQ0FBa0IsQ0FBQyxHQUFuQixDQUFBLENBQWhCLEVBRlE7TUFBQSxDQTNCVCxDQUFBOztBQUFBLDBCQStCQSxhQUFBLEdBQWUsU0FBQSxHQUFBO2VBQ2QsSUFBQyxDQUFBLE9BQUQsQ0FBUyxjQUFULEVBQXlCLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxDQUFBLENBQXpCLEVBRGM7TUFBQSxDQS9CZixDQUFBOzt1QkFBQTs7T0FENkIsS0FBSyxDQUFDLHVCQVhOO0VBQUEsQ0FBL0IsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZEVkaXRvci92aWV3cy90ZXh0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLm1vZHVsZSAnQ2FyZEVkaXRvci52aWV3cycsICh2aWV3cywgYXBwKSAtPlxuXG5cdGNsYXNzIFRleHRNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG5cdFx0ZGVmYXVsdHM6XG5cdFx0XHRuYW1lOiAn0JjQstCw0L0nXG5cdFx0XHRzdXJuYW1lOiAn0JjQstCw0L3QvtCy0LjRhydcblx0XHRcdHBob25lOiAn0JjQstCw0L3QvtCyJ1xuXHRcdFx0ZW1haWw6ICdlbWFpbEBlbWFpbC5jb20nXG5cdFx0XHRwb3NpdGlvbjogJ9CU0L7Qu9C20L3QvtGB0YLRjCDQmNCy0LDQvdCwINCY0LLQsNC90L7QstC40YfQsCdcblxuXHRcblx0Y2xhc3Mgdmlld3MuVGV4dFBhbmVsIGV4dGVuZHMgdmlld3MuX0Jhc2VUb29sYmFyUGFuZWxWaWV3XG5cdFx0bG9nZ2luZzogb25cblxuXHRcdGNsYXNzTmFtZTogJ3RleHQnXG5cblx0XHQjIGNoaWxkVmlldzogdmlld3MuSWNvblxuXG5cdFx0IyB1aTpcblx0XHQjIFx0J2lucHV0cycgOiAnaW5wdXQnXG5cblx0XHQjIG9uU2hvdzogPT5cblx0XHQjIFx0aWYgQGxvZ2dpbmcgaXMgb24gdGhlbiBAYmluZCAnYWxsJywgLT4gY29uc29sZS5sb2cgXCJJQ09OUyBQQU5FTCBWSUVXOlxcdFwiLCBhcmd1bWVudHNcblx0XHRtb2RlbEV2ZW50czpcblx0XHRcdCdjaGFuZ2UnOiAnb25Nb2RlbENoYW5nZSdcblxuXHRcdHRlbXBsYXRlOiA9PlxuXHRcdFx0dGVtcGxhdGl6ZXIuY2FyZEVkaXRvci50b29sYmFyLnRleHQgQHBhbmVsVmlld1N0YXRlLmF0dHJpYnV0ZXNcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRzdXBlclxuXHRcdFx0QHVpLmlucHV0cyA9ICdpbnB1dCdcblx0XHRcdEBldmVudHNbJ2lucHV0IEB1aS5pbnB1dHMnXSA9ICdvbklucHV0J1xuXG5cdFx0XHRAbW9kZWwgID0gbmV3IFRleHRNb2RlbCgpXG5cdFx0XHRAcGFuZWxWaWV3U3RhdGUuc2V0XG5cdFx0XHRcdHRpdGxlOiAn0KLQtdC60YHRgidcblx0XHRcdFx0Z290Qm9keTogZmFsc2VcblxuXHRcdG9uSW5wdXQ6IChlKSA9PlxuXHRcdFx0a2V5ID0gJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ25hbWUnKVxuXHRcdFx0QG1vZGVsLnNldCBrZXksICQoZS5jdXJyZW50VGFyZ2V0KS52YWwoKVxuXG5cdFx0b25Nb2RlbENoYW5nZTogPT5cblx0XHRcdEB0cmlnZ2VyICd0ZXh0OmNoYW5nZWQnLCBAbW9kZWwudG9KU09OKClcblxuIl19