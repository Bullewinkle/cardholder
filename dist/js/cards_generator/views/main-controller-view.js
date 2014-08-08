(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator.views', function(Views) {
    return Views.MainControllerView = (function(_super) {
      __extends(MainControllerView, _super);

      function MainControllerView() {
        this.render = __bind(this.render, this);
        this.select2choiseRemoved = __bind(this.select2choiseRemoved, this);
        this.select2ChoiseSelected = __bind(this.select2ChoiseSelected, this);
        this.stepPrev = __bind(this.stepPrev, this);
        this.stepNext = __bind(this.stepNext, this);
        this.submit = __bind(this.submit, this);
        this.changeStep = __bind(this.changeStep, this);
        this.start = __bind(this.start, this);
        this.initialize = __bind(this.initialize, this);
        return MainControllerView.__super__.constructor.apply(this, arguments);
      }

      MainControllerView.prototype.loger = false;

      MainControllerView.prototype.tagName = 'li';

      MainControllerView.prototype.className = 'main_controller_wrapper';

      MainControllerView.prototype.el = $('.main_controller_wrapper')[0];

      MainControllerView.prototype.events = {
        'submit .main_controller_form': 'submit',
        'click .main_controller_form_control.prev': 'stepPrev',
        'click .main_controller_form_control.next': 'stepNext',
        'select2-selecting .main_controller_form_input': 'select2ChoiseSelected',
        'select2-removed .main_controller_form_input': 'select2choiseRemoved'
      };

      MainControllerView.prototype.initialize = function() {
        this.bind('all', (function(_this) {
          return function(trigger, args) {
            if (_this.loger === true) {
              return console.info('MainControllerView says :', trigger, args);
            }
          };
        })(this));
        this.elements = {
          formNode: this.$('.main_controller_form'),
          questionNode: this.$('.main_controller_form_label'),
          inputNode: this.$('.main_controller_form_input'),
          currentStepNode: this.$('.main_controller_form_statusbar_current'),
          questionsQuantityNode: this.$('.main_controller_form_statusbar_quantity'),
          controls: {
            prev: this.$('.main_controller_form_control.prev'),
            next: this.$('.main_controller_form_control.next')
          }
        };
        return this.start();
      };

      MainControllerView.prototype.start = function() {
        var emails, names, phones, positions, questions, surnames;
        this.trigger('start');
        this.formStep = this.model.get('formStep');
        this.questions = app.data.get('questions');
        window.onkeydown = (function(_this) {
          return function(e) {
            switch (e.keyCode) {
              case 37:
                e.preventDefault();
                return _this.elements.controls.prev.trigger('click');
              case 39:
                e.preventDefault();
                return _this.elements.controls.next.trigger('click');
            }
          };
        })(this);
        this.names = [];
        this.surnames = [];
        names = app.data.get('names');
        emails = app.data.get('emails');
        phones = false;
        positions = app.data.get('positions');
        questions = app.data.get('questions');
        surnames = app.data.get('surnames');
        this.src = [names, surnames, emails, phones, positions];
        this.elements.inputNode.select2({
          width: '100%',
          placeholder: 'введите ответ',
          allowClear: true,
          maximumSelectionSize: 2,
          allowClear: true,
          initSelection: function(element, callback) {
            var data;
            data = [];
            $(element.val().split(",")).each(function() {
              data.push({
                id: this,
                text: this
              });
            });
            return callback(data);
          },
          tags: (function(_this) {
            return function() {
              if (_this.formStep) {
                return _this.src[_this.formStep - 1] || [];
              } else {
                return [];
              }
            };
          })(this),
          multiple: true
        });
        return this.changeStep(1);
      };

      MainControllerView.prototype.changeStep = function(step) {
        this.formStep = step;
        this.model.set('formStep', step);
        this.elements.currentStepNode.text(this.formStep + ' ');
        this.elements.questionsQuantityNode.text(this.questions.length);
        return this.elements.questionNode.text(this.questions[this.formStep - 1]);
      };

      MainControllerView.prototype.submit = function(e) {
        var formVal, questionNum;
        e.preventDefault();
        formVal = this.$('.main_controller_form_statusbar_value');
        questionNum = this.formStep;
        questionNum++;
        formVal.width(100 / this.questions.length * (questionNum - 1) + '%');
        this.elements.inputNode.select2('val', '');
        if (questionNum === this.questions.length + 1) {
          console.info('The questions is over!');
          this.elements.questionNode.text('Вопросы кончились!');
          this.completed = true;
          this.elements.inputNode.select2('val', '');
          this.elements.inputNode.select2('enable', false);
        } else {
          this.elements.inputNode.select2('enable', true);
          return this.changeStep(questionNum);
        }
      };

      MainControllerView.prototype.stepNext = function() {
        if (this.formStep <= this.questions.length) {
          return this.elements.formNode.trigger('submit');
        }
      };

      MainControllerView.prototype.stepPrev = function() {
        if (this.formStep > 1) {
          this.formStep = this.formStep - 2;
          return this.elements.formNode.trigger('submit');
        }
      };

      MainControllerView.prototype.select2ChoiseSelected = function(e) {
        console.log(this);
        switch (this.formStep) {
          case 1:
            console.log("step: 1", e.object.sex);
            return app.cardsCollection.each(function(model, i) {
              if (!model.get('locked') || model.get('locked') === !true) {
                model.set('data.name', e.object.text);
                return model.set('data.sex', e.object.sex);
              }
            });
          case 2:
            console.log("step: 2");
            return app.cardsCollection.each(function(model, i) {
              if (!model.get('locked') || model.get('locked') === !true) {
                return model.set('data.surname', e.object.text);
              }
            });
          case 3:
            console.log("step: 3");
            return app.cardsCollection.each(function(model, i) {
              if (!model.get('locked') || model.get('locked') === !true) {
                return model.set('data.eMail', e.object.text);
              }
            });
          case 4:
            console.log("step: 4");
            return app.cardsCollection.each(function(model, i) {
              if (!model.get('locked') || model.get('locked') === !true) {
                return model.set('data.phone', e.object.text);
              }
            });
          case 5:
            console.log("step: 5");
            return app.cardsCollection.each(function(model, i) {
              if (!model.get('locked') || model.get('locked') === !true) {
                return model.set('data.position', e.object.text);
              }
            });
        }
      };

      MainControllerView.prototype.select2choiseRemoved = function(e) {
        if (e.choice.text === this.names[0]) {
          this.names.shift();
        }
        if (e.choice.text === this.names[1]) {
          this.names.pop();
        }
        if (this.formStep === 1) {
          this.names = [];
        }
        if (this.formStep === 2) {
          return this.surnames = [];
        }
      };

      MainControllerView.prototype.render = function() {};

      return MainControllerView;

    })(Backbone.View);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci92aWV3cy9tYWluLWNvbnRyb2xsZXItdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOzttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLHFCQUFaLEVBQW1DLFNBQUMsS0FBRCxHQUFBO1dBQzVCLEtBQUssQ0FBQztBQUNYLDJDQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7T0FBQTs7QUFBQSxtQ0FBQSxLQUFBLEdBQU8sS0FBUCxDQUFBOztBQUFBLG1DQUVBLE9BQUEsR0FBUyxJQUZULENBQUE7O0FBQUEsbUNBR0EsU0FBQSxHQUFXLHlCQUhYLENBQUE7O0FBQUEsbUNBSUEsRUFBQSxHQUFJLENBQUEsQ0FBRSwwQkFBRixDQUE4QixDQUFBLENBQUEsQ0FKbEMsQ0FBQTs7QUFBQSxtQ0FNQSxNQUFBLEdBQ0M7QUFBQSxRQUFBLDhCQUFBLEVBQWdDLFFBQWhDO0FBQUEsUUFDQSwwQ0FBQSxFQUE0QyxVQUQ1QztBQUFBLFFBRUEsMENBQUEsRUFBNEMsVUFGNUM7QUFBQSxRQUdBLCtDQUFBLEVBQWlELHVCQUhqRDtBQUFBLFFBSUEsNkNBQUEsRUFBK0Msc0JBSi9DO09BUEQsQ0FBQTs7QUFBQSxtQ0FhQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1gsUUFBQSxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUMsT0FBRCxFQUFVLElBQVYsR0FBQTtBQUNaLFlBQUEsSUFBRyxLQUFDLENBQUEsS0FBRCxLQUFVLElBQWI7cUJBQ0MsT0FBTyxDQUFDLElBQVIsQ0FBYSwyQkFBYixFQUF5QyxPQUF6QyxFQUFpRCxJQUFqRCxFQUREO2FBRFk7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFiLENBQUEsQ0FBQTtBQUFBLFFBSUEsSUFBQyxDQUFBLFFBQUQsR0FDQztBQUFBLFVBQUEsUUFBQSxF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QUFDLE1BQU0sQ0FBQyxJQUFULEtBQWlCLElBQUMsQ0FBQSxLQUFNLENBQUEsQ0FBQSxDQUEzQjtBQUNDLFVBQUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQUEsQ0FBQSxDQUREO1NBSEE7QUFLQSxRQUFBLElBQUcsSUFBQyxDQUFBLFFBQUQsS0FBYSxDQUFoQjtBQUNDLFVBQUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxFQUFULENBREQ7U0FMQTtBQU9BLFFBQUEsSUFBRyxJQUFDLENBQUEsUUFBRCxLQUFhLENBQWhCO2lCQUNDLElBQUMsQ0FBQSxRQUFELEdBQVksR0FEYjtTQVJxQjtNQUFBLENBOUl0QixDQUFBOztBQUFBLG1DQXlKQSxNQUFBLEdBQVEsU0FBQSxHQUFBLENBekpSLENBQUE7O2dDQUFBOztPQURzQyxRQUFRLENBQUMsTUFEZDtFQUFBLENBQW5DLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRzX2dlbmVyYXRvci92aWV3cy9tYWluLWNvbnRyb2xsZXItdmlldy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yLnZpZXdzJywgKFZpZXdzKSAtPlxuXHRjbGFzcyBWaWV3cy5NYWluQ29udHJvbGxlclZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cdFx0bG9nZXI6IG9mZlxuXG5cdFx0dGFnTmFtZTogJ2xpJ1xuXHRcdGNsYXNzTmFtZTogJ21haW5fY29udHJvbGxlcl93cmFwcGVyJ1xuXHRcdGVsOiAkKCcubWFpbl9jb250cm9sbGVyX3dyYXBwZXInKVswXVxuXG5cdFx0ZXZlbnRzOiBcblx0XHRcdCdzdWJtaXQgLm1haW5fY29udHJvbGxlcl9mb3JtJzogJ3N1Ym1pdCdcblx0XHRcdCdjbGljayAubWFpbl9jb250cm9sbGVyX2Zvcm1fY29udHJvbC5wcmV2JzogJ3N0ZXBQcmV2J1xuXHRcdFx0J2NsaWNrIC5tYWluX2NvbnRyb2xsZXJfZm9ybV9jb250cm9sLm5leHQnOiAnc3RlcE5leHQnXG5cdFx0XHQnc2VsZWN0Mi1zZWxlY3RpbmcgLm1haW5fY29udHJvbGxlcl9mb3JtX2lucHV0JzogJ3NlbGVjdDJDaG9pc2VTZWxlY3RlZCdcblx0XHRcdCdzZWxlY3QyLXJlbW92ZWQgLm1haW5fY29udHJvbGxlcl9mb3JtX2lucHV0JzogJ3NlbGVjdDJjaG9pc2VSZW1vdmVkJ1xuXG5cdFx0aW5pdGlhbGl6ZTogPT5cblx0XHRcdEBiaW5kICdhbGwnLCAodHJpZ2dlciwgYXJncykgPT4gXG5cdFx0XHRcdGlmIEBsb2dlciBpcyBvblxuXHRcdFx0XHRcdGNvbnNvbGUuaW5mbyAnTWFpbkNvbnRyb2xsZXJWaWV3IHNheXMgOicsdHJpZ2dlcixhcmdzXG5cblx0XHRcdEBlbGVtZW50cyA9IFxuXHRcdFx0XHRmb3JtTm9kZSA6IEAkKCcubWFpbl9jb250cm9sbGVyX2Zvcm0nKVxuXHRcdFx0XHRxdWVzdGlvbk5vZGUgOiBAJCgnLm1haW5fY29udHJvbGxlcl9mb3JtX2xhYmVsJylcblx0XHRcdFx0aW5wdXROb2RlIDogQCQoJy5tYWluX2NvbnRyb2xsZXJfZm9ybV9pbnB1dCcpXG5cdFx0XHRcdGN1cnJlbnRTdGVwTm9kZSA6IEAkKCcubWFpbl9jb250cm9sbGVyX2Zvcm1fc3RhdHVzYmFyX2N1cnJlbnQnKVxuXHRcdFx0XHRxdWVzdGlvbnNRdWFudGl0eU5vZGUgOiBAJCgnLm1haW5fY29udHJvbGxlcl9mb3JtX3N0YXR1c2Jhcl9xdWFudGl0eScpXG5cdFx0XHRcdGNvbnRyb2xzIDogXG5cdFx0XHRcdFx0cHJldjogQCQoJy5tYWluX2NvbnRyb2xsZXJfZm9ybV9jb250cm9sLnByZXYnKVxuXHRcdFx0XHRcdG5leHQ6IEAkKCcubWFpbl9jb250cm9sbGVyX2Zvcm1fY29udHJvbC5uZXh0Jylcblx0XHRcdEBzdGFydCgpXG5cblx0XHRzdGFydDogPT5cblx0XHRcdEB0cmlnZ2VyICdzdGFydCdcblx0XHRcdEBmb3JtU3RlcCA9IEBtb2RlbC5nZXQgJ2Zvcm1TdGVwJ1xuXHRcdFx0QHF1ZXN0aW9ucyAgPSBhcHAuZGF0YS5nZXQgJ3F1ZXN0aW9ucydcblxuXHRcdFx0d2luZG93Lm9ua2V5ZG93biA9IChlKSA9PlxuXHRcdFx0XHRzd2l0Y2ggZS5rZXlDb2RlXG5cdFx0XHRcdFx0d2hlbiAzN1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdFx0XHRAZWxlbWVudHMuY29udHJvbHMucHJldi50cmlnZ2VyICdjbGljaydcblx0XHRcdFx0XHR3aGVuIDM5XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0XHRcdEBlbGVtZW50cy5jb250cm9scy5uZXh0LnRyaWdnZXIgJ2NsaWNrJ1xuXG5cdFx0XHRAbmFtZXMgPSBbXVxuXHRcdFx0QHN1cm5hbWVzID0gW11cblxuXHRcdFx0bmFtZXMgPSBhcHAuZGF0YS5nZXQoJ25hbWVzJylcblx0XHRcdGVtYWlscyA9IGFwcC5kYXRhLmdldCgnZW1haWxzJylcblx0XHRcdHBob25lcyA9IGZhbHNlXG5cdFx0XHRwb3NpdGlvbnMgPSBhcHAuZGF0YS5nZXQoJ3Bvc2l0aW9ucycpXG5cdFx0XHRxdWVzdGlvbnMgPSBhcHAuZGF0YS5nZXQoJ3F1ZXN0aW9ucycpXG5cdFx0XHRzdXJuYW1lcyA9IGFwcC5kYXRhLmdldCgnc3VybmFtZXMnKVxuXG5cdFx0XHRAc3JjID0gWyBuYW1lcywgc3VybmFtZXMsIGVtYWlscywgcGhvbmVzLCBwb3NpdGlvbnNdIFxuXG5cblx0XHRcdEBlbGVtZW50cy5pbnB1dE5vZGUuc2VsZWN0MlxuXHRcdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRcdHBsYWNlaG9sZGVyIDogJ9Cy0LLQtdC00LjRgtC1INC+0YLQstC10YInXG5cdFx0XHRcdGFsbG93Q2xlYXI6IHRydWVcblx0XHRcdFx0bWF4aW11bVNlbGVjdGlvblNpemU6IDJcblx0XHRcdFx0YWxsb3dDbGVhcjogdHJ1ZVxuXHRcdFx0XHRpbml0U2VsZWN0aW9uIDogKGVsZW1lbnQsIGNhbGxiYWNrKSAtPlxuXHRcdFx0XHRcdGRhdGEgPSBbXVxuXHRcdFx0XHRcdCQoZWxlbWVudC52YWwoKS5zcGxpdChcIixcIikpLmVhY2ggLT5cblx0XHRcdFx0XHRcdGRhdGEucHVzaCh7aWQ6IHRoaXMsIHRleHQ6IHRoaXN9KVxuXHRcdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdFx0Y2FsbGJhY2soZGF0YSlcblx0XHRcdFx0dGFnczogPT5cblx0XHRcdFx0XHRpZiBAZm9ybVN0ZXBcblx0XHRcdFx0XHRcdHJldHVybiBAc3JjW0Bmb3JtU3RlcC0xXSBvciBbXVxuXHRcdFx0XHRcdGVsc2UgXG5cdFx0XHRcdFx0XHRyZXR1cm4gW11cblx0XHRcdFx0bXVsdGlwbGU6IHRydWVcblxuXHRcdFx0QGNoYW5nZVN0ZXAoMSlcblxuXHRcdGNoYW5nZVN0ZXAgOiAoc3RlcCkgPT5cblx0XHRcdEBmb3JtU3RlcCA9IHN0ZXBcblx0XHRcdEBtb2RlbC5zZXQgJ2Zvcm1TdGVwJywgc3RlcFxuXHRcdFx0QGVsZW1lbnRzLmN1cnJlbnRTdGVwTm9kZS50ZXh0KEBmb3JtU3RlcCsnICcpXG5cdFx0XHRAZWxlbWVudHMucXVlc3Rpb25zUXVhbnRpdHlOb2RlLnRleHQoQHF1ZXN0aW9ucy5sZW5ndGgpXG5cdFx0XHRAZWxlbWVudHMucXVlc3Rpb25Ob2RlLnRleHQoQHF1ZXN0aW9uc1tAZm9ybVN0ZXAtMV0pXG5cblx0XHRzdWJtaXQ6IChlKSA9PlxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRmb3JtVmFsID0gQCQoJy5tYWluX2NvbnRyb2xsZXJfZm9ybV9zdGF0dXNiYXJfdmFsdWUnKVxuXHRcdFx0cXVlc3Rpb25OdW0gPSBAZm9ybVN0ZXBcblx0XHRcdHF1ZXN0aW9uTnVtKytcblx0XHRcdGZvcm1WYWwud2lkdGggKDEwMC8gQHF1ZXN0aW9ucy5sZW5ndGggKiAocXVlc3Rpb25OdW0tMSkgKyAnJScpXG5cdFx0XHRAZWxlbWVudHMuaW5wdXROb2RlLnNlbGVjdDIoJ3ZhbCcsJycpXG5cdFx0XHRpZiBxdWVzdGlvbk51bSBpcyBAcXVlc3Rpb25zLmxlbmd0aCsxXG5cblx0XHRcdFx0Y29uc29sZS5pbmZvKCdUaGUgcXVlc3Rpb25zIGlzIG92ZXIhJylcblx0XHRcdFx0QGVsZW1lbnRzLnF1ZXN0aW9uTm9kZS50ZXh0KCfQktC+0L/RgNC+0YHRiyDQutC+0L3Rh9C40LvQuNGB0YwhJylcblx0XHRcdFx0QGNvbXBsZXRlZD10cnVlXG5cdFx0XHRcdEBlbGVtZW50cy5pbnB1dE5vZGUuc2VsZWN0MiAndmFsJywnJ1xuXHRcdFx0XHRAZWxlbWVudHMuaW5wdXROb2RlLnNlbGVjdDIgJ2VuYWJsZScsIGZhbHNlXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAZWxlbWVudHMuaW5wdXROb2RlLnNlbGVjdDIgJ2VuYWJsZScsIHRydWVcblx0XHRcdFx0QGNoYW5nZVN0ZXAocXVlc3Rpb25OdW0pXG5cblx0XHRzdGVwTmV4dCA6ID0+XG5cdFx0XHRpZiBAZm9ybVN0ZXAgPD0gQHF1ZXN0aW9ucy5sZW5ndGhcblx0XHRcdFx0QGVsZW1lbnRzLmZvcm1Ob2RlLnRyaWdnZXIgJ3N1Ym1pdCdcblxuXHRcdHN0ZXBQcmV2IDogPT5cblx0XHRcdGlmIEBmb3JtU3RlcCA+IDFcblx0XHRcdFx0QGZvcm1TdGVwID0gQGZvcm1TdGVwLTJcblx0XHRcdFx0QGVsZW1lbnRzLmZvcm1Ob2RlLnRyaWdnZXIgJ3N1Ym1pdCdcblxuXHRcdHNlbGVjdDJDaG9pc2VTZWxlY3RlZDogKGUpID0+IFxuXHRcdFx0Y29uc29sZS5sb2cgQFxuXHRcdFx0c3dpdGNoIEBmb3JtU3RlcFxuXHRcdFx0XHR3aGVuIDFcblx0XHRcdFx0XHRjb25zb2xlLmxvZyBcInN0ZXA6IDFcIixlLm9iamVjdC5zZXhcblx0XHRcdFx0XHRhcHAuY2FyZHNDb2xsZWN0aW9uLmVhY2ggKG1vZGVsLGkpIC0+XG5cdFx0XHRcdFx0XHRpZiAhbW9kZWwuZ2V0KCdsb2NrZWQnKSBvciBtb2RlbC5nZXQoJ2xvY2tlZCcpIGlzIG5vdCB0cnVlXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnZGF0YS5uYW1lJyxlLm9iamVjdC50ZXh0KVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEuc2V4JyxlLm9iamVjdC5zZXgpXG5cdFx0XHRcdHdoZW4gMlxuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwic3RlcDogMlwiXG5cdFx0XHRcdFx0YXBwLmNhcmRzQ29sbGVjdGlvbi5lYWNoIChtb2RlbCxpKSAtPlxuXHRcdFx0XHRcdFx0aWYgIW1vZGVsLmdldCgnbG9ja2VkJykgb3IgbW9kZWwuZ2V0KCdsb2NrZWQnKSBpcyBub3QgdHJ1ZVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEuc3VybmFtZScsZS5vYmplY3QudGV4dClcblx0XHRcdFx0d2hlbiAzXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJzdGVwOiAzXCJcblx0XHRcdFx0XHRhcHAuY2FyZHNDb2xsZWN0aW9uLmVhY2ggKG1vZGVsLGkpIC0+XG5cdFx0XHRcdFx0XHRpZiAhbW9kZWwuZ2V0KCdsb2NrZWQnKSBvciBtb2RlbC5nZXQoJ2xvY2tlZCcpIGlzIG5vdCB0cnVlXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnZGF0YS5lTWFpbCcsZS5vYmplY3QudGV4dClcblx0XHRcdFx0d2hlbiA0XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJzdGVwOiA0XCJcblx0XHRcdFx0XHRhcHAuY2FyZHNDb2xsZWN0aW9uLmVhY2ggKG1vZGVsLGkpIC0+XG5cdFx0XHRcdFx0XHRpZiAhbW9kZWwuZ2V0KCdsb2NrZWQnKSBvciBtb2RlbC5nZXQoJ2xvY2tlZCcpIGlzIG5vdCB0cnVlXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnZGF0YS5waG9uZScsZS5vYmplY3QudGV4dClcblx0XHRcdFx0d2hlbiA1XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJzdGVwOiA1XCJcblx0XHRcdFx0XHRhcHAuY2FyZHNDb2xsZWN0aW9uLmVhY2ggKG1vZGVsLGkpIC0+XG5cdFx0XHRcdFx0XHRpZiAhbW9kZWwuZ2V0KCdsb2NrZWQnKSBvciBtb2RlbC5nZXQoJ2xvY2tlZCcpIGlzIG5vdCB0cnVlXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnZGF0YS5wb3NpdGlvbicsZS5vYmplY3QudGV4dClcblxuXHRcdHNlbGVjdDJjaG9pc2VSZW1vdmVkOiAoZSkgPT5cblx0XHRcdGlmIGUuY2hvaWNlLnRleHQgaXMgQG5hbWVzWzBdXG5cdFx0XHRcdEBuYW1lcy5zaGlmdCgpXG5cblx0XHRcdGlmIGUuY2hvaWNlLnRleHQgaXMgQG5hbWVzWzFdXG5cdFx0XHRcdEBuYW1lcy5wb3AoKVxuXHRcdFx0aWYgQGZvcm1TdGVwIGlzIDFcblx0XHRcdFx0QG5hbWVzID0gW11cblx0XHRcdGlmIEBmb3JtU3RlcCBpcyAyXG5cdFx0XHRcdEBzdXJuYW1lcyA9IFtdXG5cblx0XHRyZW5kZXI6ID0+XG4iXX0=