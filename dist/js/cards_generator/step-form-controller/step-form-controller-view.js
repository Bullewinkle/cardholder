(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator.stepForm', function(StepForm) {
    return StepForm.StepFormView = (function(_super) {
      __extends(StepFormView, _super);

      function StepFormView() {
        this.select2choiseRemoved = __bind(this.select2choiseRemoved, this);
        this.select2ChoiseSelected = __bind(this.select2ChoiseSelected, this);
        this.stepPrev = __bind(this.stepPrev, this);
        this.stepNext = __bind(this.stepNext, this);
        this.submit = __bind(this.submit, this);
        this.changeStep = __bind(this.changeStep, this);
        this.start = __bind(this.start, this);
        this.initialize = __bind(this.initialize, this);
        return StepFormView.__super__.constructor.apply(this, arguments);
      }

      StepFormView.prototype.loger = false;

      StepFormView.prototype.template = function(model) {
        return templatizer.cardsGenerator.stepForm({
          data: model
        });
      };

      StepFormView.prototype.tagName = 'li';

      StepFormView.prototype.className = 'card step_form_controller_wrapper';

      StepFormView.prototype.events = {
        'submit .step_form_controller_form': 'submit',
        'click .step_form_controller_form_control.prev': 'stepPrev',
        'click .step_form_controller_form_control.next': 'stepNext',
        'select2-selecting .step_form_controller_form_input': 'select2ChoiseSelected',
        'select2-removed .step_form_controller_form_input': 'select2choiseRemoved'
      };

      StepFormView.prototype.initialize = function() {
        return this.model = new StepForm.StepFormModel();
      };

      StepFormView.prototype.start = function() {
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

      StepFormView.prototype.changeStep = function(step) {
        this.formStep = step;
        this.model.set('formStep', step);
        this.elements.currentStepNode.text(this.formStep + ' ');
        this.elements.questionsQuantityNode.text(this.questions.length);
        return this.elements.questionNode.text(this.questions[this.formStep - 1]);
      };

      StepFormView.prototype.submit = function(e) {
        var formVal, questionNum;
        e.preventDefault();
        formVal = this.$('.step_form_controller_form_statusbar_value');
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

      StepFormView.prototype.stepNext = function() {
        if (this.formStep <= this.questions.length) {
          return this.elements.formNode.trigger('submit');
        }
      };

      StepFormView.prototype.stepPrev = function() {
        if (this.formStep > 1) {
          this.formStep = this.formStep - 2;
          return this.elements.formNode.trigger('submit');
        }
      };

      StepFormView.prototype.select2ChoiseSelected = function(e) {
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

      StepFormView.prototype.select2choiseRemoved = function(e) {
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

      return StepFormView;

    })(Backbone.View);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9zdGVwLWZvcm0tY29udHJvbGxlci9zdGVwLWZvcm0tY29udHJvbGxlci12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O21TQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksd0JBQVosRUFBc0MsU0FBQyxRQUFELEdBQUE7V0FDL0IsUUFBUSxDQUFDO0FBQ2QscUNBQUEsQ0FBQTs7Ozs7Ozs7Ozs7O09BQUE7O0FBQUEsNkJBQUEsS0FBQSxHQUFPLEtBQVAsQ0FBQTs7QUFBQSw2QkFFQSxRQUFBLEdBQVUsU0FBQyxLQUFELEdBQUE7ZUFDVCxXQUFXLENBQUMsY0FBYyxDQUFDLFFBQTNCLENBQ0M7QUFBQSxVQUFBLElBQUEsRUFBTSxLQUFOO1NBREQsRUFEUztNQUFBLENBRlYsQ0FBQTs7QUFBQSw2QkFNQSxPQUFBLEdBQVMsSUFOVCxDQUFBOztBQUFBLDZCQU9BLFNBQUEsR0FBVyxtQ0FQWCxDQUFBOztBQUFBLDZCQVVBLE1BQUEsR0FDQztBQUFBLFFBQUEsbUNBQUEsRUFBcUMsUUFBckM7QUFBQSxRQUNBLCtDQUFBLEVBQWlELFVBRGpEO0FBQUEsUUFFQSwrQ0FBQSxFQUFpRCxVQUZqRDtBQUFBLFFBR0Esb0RBQUEsRUFBc0QsdUJBSHREO0FBQUEsUUFJQSxrREFBQSxFQUFvRCxzQkFKcEQ7T0FYRCxDQUFBOztBQUFBLDZCQWlCQSxVQUFBLEdBQVksU0FBQSxHQUFBO2VBQ1gsSUFBQyxDQUFBLEtBQUQsR0FBYSxJQUFBLFFBQVEsQ0FBQyxhQUFULENBQUEsRUFERjtNQUFBLENBakJaLENBQUE7O0FBQUEsNkJBa0NBLEtBQUEsR0FBTyxTQUFBLEdBQUE7QUFDTixZQUFBLHFEQUFBO0FBQUEsUUFBQSxJQUFDLENBQUEsT0FBRCxDQUFTLE9BQVQsQ0FBQSxDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsUUFBRCxHQUFZLElBQUMsQ0FBQSxLQUFLLENBQUMs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S0FBdUIsQ0FBQSxJQUFsRDt1QkFDQyxLQUFLLENBQUMsR0FBTixDQUFVLGVBQVYsRUFBMEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFuQyxFQUREO2VBRHdCO1lBQUEsQ0FBekIsRUF4QkY7QUFBQSxTQUZzQjtNQUFBLENBckh2QixDQUFBOztBQUFBLDZCQW1KQSxvQkFBQSxHQUFzQixTQUFDLENBQUQsR0FBQTtBQUNyQixRQUFBLElBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFULEtBQWlCLElBQUMsQ0FBQSxLQUFNLENBQUEsQ0FBQSxDQUEzQjtBQUNDLFVBQUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxLQUFQLENBQUEsQ0FBQSxDQUREO1NBQUE7QUFHQSxRQUFBLElBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFULEtBQWlCLElBQUMsQ0FBQSxLQUFNLENBQUEsQ0FBQSxDQUEzQjtBQUNDLFVBQUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQUEsQ0FBQSxDQUREO1NBSEE7QUFLQSxRQUFBLElBQUcsSUFBQyxDQUFBLFFBQUQsS0FBYSxDQUFoQjtBQUNDLFVBQUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxFQUFULENBREQ7U0FMQTtBQU9BLFFBQUEsSUFBRyxJQUFDLENBQUEsUUFBRCxLQUFhLENBQWhCO2lCQUNDLElBQUMsQ0FBQSxRQUFELEdBQVksR0FEYjtTQVJxQjtNQUFBLENBbkp0QixDQUFBOzswQkFBQTs7T0FEbUMsUUFBUSxDQUFDLE1BRFI7RUFBQSxDQUF0QyxDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkc19nZW5lcmF0b3Ivc3RlcC1mb3JtLWNvbnRyb2xsZXIvc3RlcC1mb3JtLWNvbnRyb2xsZXItdmlldy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yLnN0ZXBGb3JtJywgKFN0ZXBGb3JtKSAtPlxuXHRjbGFzcyBTdGVwRm9ybS5TdGVwRm9ybVZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG5cdFx0bG9nZXI6IG9mZlxuXG5cdFx0dGVtcGxhdGU6IChtb2RlbCkgLT5cblx0XHRcdHRlbXBsYXRpemVyLmNhcmRzR2VuZXJhdG9yLnN0ZXBGb3JtXG5cdFx0XHRcdGRhdGE6IG1vZGVsXG5cdFx0XHRcdFxuXHRcdHRhZ05hbWU6ICdsaSdcblx0XHRjbGFzc05hbWU6ICdjYXJkIHN0ZXBfZm9ybV9jb250cm9sbGVyX3dyYXBwZXInXG5cdFx0IyBlbDogJCgnLnN0ZXBfZm9ybV9jb250cm9sbGVyX3dyYXBwZXInKVswXVxuXG5cdFx0ZXZlbnRzOiBcblx0XHRcdCdzdWJtaXQgLnN0ZXBfZm9ybV9jb250cm9sbGVyX2Zvcm0nOiAnc3VibWl0J1xuXHRcdFx0J2NsaWNrIC5zdGVwX2Zvcm1fY29udHJvbGxlcl9mb3JtX2NvbnRyb2wucHJldic6ICdzdGVwUHJldidcblx0XHRcdCdjbGljayAuc3RlcF9mb3JtX2NvbnRyb2xsZXJfZm9ybV9jb250cm9sLm5leHQnOiAnc3RlcE5leHQnXG5cdFx0XHQnc2VsZWN0Mi1zZWxlY3RpbmcgLnN0ZXBfZm9ybV9jb250cm9sbGVyX2Zvcm1faW5wdXQnOiAnc2VsZWN0MkNob2lzZVNlbGVjdGVkJ1xuXHRcdFx0J3NlbGVjdDItcmVtb3ZlZCAuc3RlcF9mb3JtX2NvbnRyb2xsZXJfZm9ybV9pbnB1dCc6ICdzZWxlY3QyY2hvaXNlUmVtb3ZlZCdcblxuXHRcdGluaXRpYWxpemU6ID0+XG5cdFx0XHRAbW9kZWwgPSBuZXcgU3RlcEZvcm0uU3RlcEZvcm1Nb2RlbCgpXG5cdFx0XHQjIEBiaW5kICdhbGwnLCAodHJpZ2dlciwgYXJncykgPT4gXG5cdFx0XHQjIFx0aWYgQGxvZ2VyIGlzIG9uXG5cdFx0XHQjIFx0XHRjb25zb2xlLmluZm8gJ1N0ZXBGb3JtVmlldyBzYXlzIDonLHRyaWdnZXIsYXJnc1xuXG5cdFx0XHQjIEBlbGVtZW50cyA9IFxuXHRcdFx0IyBcdGZvcm1Ob2RlIDogQCQoJy5zdGVwX2Zvcm1fY29udHJvbGxlcl9mb3JtJylcblx0XHRcdCMgXHRxdWVzdGlvbk5vZGUgOiBAJCgnLnN0ZXBfZm9ybV9jb250cm9sbGVyX2Zvcm1fbGFiZWwnKVxuXHRcdFx0IyBcdGlucHV0Tm9kZSA6IEAkKCcuc3RlcF9mb3JtX2NvbnRyb2xsZXJfZm9ybV9pbnB1dCcpXG5cdFx0XHQjIFx0Y3VycmVudFN0ZXBOb2RlIDogQCQoJy5zdGVwX2Zvcm1fY29udHJvbGxlcl9mb3JtX3N0YXR1c2Jhcl9jdXJyZW50Jylcblx0XHRcdCMgXHRxdWVzdGlvbnNRdWFudGl0eU5vZGUgOiBAJCgnLnN0ZXBfZm9ybV9jb250cm9sbGVyX2Zvcm1fc3RhdHVzYmFyX3F1YW50aXR5Jylcblx0XHRcdCMgXHRjb250cm9scyA6IFxuXHRcdFx0IyBcdFx0cHJldjogQCQoJy5zdGVwX2Zvcm1fY29udHJvbGxlcl9mb3JtX2NvbnRyb2wucHJldicpXG5cdFx0XHQjIFx0XHRuZXh0OiBAJCgnLnN0ZXBfZm9ybV9jb250cm9sbGVyX2Zvcm1fY29udHJvbC5uZXh0Jylcblx0XHRcdCMgQHN0YXJ0KClcblxuXHRcdHN0YXJ0OiA9PlxuXHRcdFx0QHRyaWdnZXIgJ3N0YXJ0J1xuXHRcdFx0QGZvcm1TdGVwID0gQG1vZGVsLmdldCAnZm9ybVN0ZXAnXG5cdFx0XHRAcXVlc3Rpb25zICA9IGFwcC5kYXRhLmdldCAncXVlc3Rpb25zJ1xuXG5cdFx0XHR3aW5kb3cub25rZXlkb3duID0gKGUpID0+XG5cdFx0XHRcdHN3aXRjaCBlLmtleUNvZGVcblx0XHRcdFx0XHR3aGVuIDM3XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0XHRcdEBlbGVtZW50cy5jb250cm9scy5wcmV2LnRyaWdnZXIgJ2NsaWNrJ1xuXHRcdFx0XHRcdHdoZW4gMzlcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRcdFx0QGVsZW1lbnRzLmNvbnRyb2xzLm5leHQudHJpZ2dlciAnY2xpY2snXG5cblx0XHRcdEBuYW1lcyA9IFtdXG5cdFx0XHRAc3VybmFtZXMgPSBbXVxuXG5cdFx0XHRuYW1lcyA9IGFwcC5kYXRhLmdldCgnbmFtZXMnKVxuXHRcdFx0ZW1haWxzID0gYXBwLmRhdGEuZ2V0KCdlbWFpbHMnKVxuXHRcdFx0cGhvbmVzID0gZmFsc2Vcblx0XHRcdHBvc2l0aW9ucyA9IGFwcC5kYXRhLmdldCgncG9zaXRpb25zJylcblx0XHRcdHF1ZXN0aW9ucyA9IGFwcC5kYXRhLmdldCgncXVlc3Rpb25zJylcblx0XHRcdHN1cm5hbWVzID0gYXBwLmRhdGEuZ2V0KCdzdXJuYW1lcycpXG5cblx0XHRcdEBzcmMgPSBbIG5hbWVzLCBzdXJuYW1lcywgZW1haWxzLCBwaG9uZXMsIHBvc2l0aW9uc10gXG5cblxuXHRcdFx0QGVsZW1lbnRzLmlucHV0Tm9kZS5zZWxlY3QyXG5cdFx0XHRcdHdpZHRoOiAnMTAwJSdcblx0XHRcdFx0cGxhY2Vob2xkZXIgOiAn0LLQstC10LTQuNGC0LUg0L7RgtCy0LXRgidcblx0XHRcdFx0YWxsb3dDbGVhcjogdHJ1ZVxuXHRcdFx0XHRtYXhpbXVtU2VsZWN0aW9uU2l6ZTogMlxuXHRcdFx0XHRhbGxvd0NsZWFyOiB0cnVlXG5cdFx0XHRcdGluaXRTZWxlY3Rpb24gOiAoZWxlbWVudCwgY2FsbGJhY2spIC0+XG5cdFx0XHRcdFx0ZGF0YSA9IFtdXG5cdFx0XHRcdFx0JChlbGVtZW50LnZhbCgpLnNwbGl0KFwiLFwiKSkuZWFjaCAtPlxuXHRcdFx0XHRcdFx0ZGF0YS5wdXNoKHtpZDogdGhpcywgdGV4dDogdGhpc30pXG5cdFx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0XHRjYWxsYmFjayhkYXRhKVxuXHRcdFx0XHR0YWdzOiA9PlxuXHRcdFx0XHRcdGlmIEBmb3JtU3RlcFxuXHRcdFx0XHRcdFx0cmV0dXJuIEBzcmNbQGZvcm1TdGVwLTFdIG9yIFtdXG5cdFx0XHRcdFx0ZWxzZSBcblx0XHRcdFx0XHRcdHJldHVybiBbXVxuXHRcdFx0XHRtdWx0aXBsZTogdHJ1ZVxuXG5cdFx0XHRAY2hhbmdlU3RlcCgxKVxuXG5cdFx0Y2hhbmdlU3RlcCA6IChzdGVwKSA9PlxuXHRcdFx0QGZvcm1TdGVwID0gc3RlcFxuXHRcdFx0QG1vZGVsLnNldCAnZm9ybVN0ZXAnLCBzdGVwXG5cdFx0XHRAZWxlbWVudHMuY3VycmVudFN0ZXBOb2RlLnRleHQoQGZvcm1TdGVwKycgJylcblx0XHRcdEBlbGVtZW50cy5xdWVzdGlvbnNRdWFudGl0eU5vZGUudGV4dChAcXVlc3Rpb25zLmxlbmd0aClcblx0XHRcdEBlbGVtZW50cy5xdWVzdGlvbk5vZGUudGV4dChAcXVlc3Rpb25zW0Bmb3JtU3RlcC0xXSlcblxuXHRcdHN1Ym1pdDogKGUpID0+XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdGZvcm1WYWwgPSBAJCgnLnN0ZXBfZm9ybV9jb250cm9sbGVyX2Zvcm1fc3RhdHVzYmFyX3ZhbHVlJylcblx0XHRcdHF1ZXN0aW9uTnVtID0gQGZvcm1TdGVwXG5cdFx0XHRxdWVzdGlvbk51bSsrXG5cdFx0XHRmb3JtVmFsLndpZHRoICgxMDAvIEBxdWVzdGlvbnMubGVuZ3RoICogKHF1ZXN0aW9uTnVtLTEpICsgJyUnKVxuXHRcdFx0QGVsZW1lbnRzLmlucHV0Tm9kZS5zZWxlY3QyKCd2YWwnLCcnKVxuXHRcdFx0aWYgcXVlc3Rpb25OdW0gaXMgQHF1ZXN0aW9ucy5sZW5ndGgrMVxuXG5cdFx0XHRcdGNvbnNvbGUuaW5mbygnVGhlIHF1ZXN0aW9ucyBpcyBvdmVyIScpXG5cdFx0XHRcdEBlbGVtZW50cy5xdWVzdGlvbk5vZGUudGV4dCgn0JLQvtC/0YDQvtGB0Ysg0LrQvtC90YfQuNC70LjRgdGMIScpXG5cdFx0XHRcdEBjb21wbGV0ZWQ9dHJ1ZVxuXHRcdFx0XHRAZWxlbWVudHMuaW5wdXROb2RlLnNlbGVjdDIgJ3ZhbCcsJydcblx0XHRcdFx0QGVsZW1lbnRzLmlucHV0Tm9kZS5zZWxlY3QyICdlbmFibGUnLCBmYWxzZVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdGVsc2Vcblx0XHRcdFx0QGVsZW1lbnRzLmlucHV0Tm9kZS5zZWxlY3QyICdlbmFibGUnLCB0cnVlXG5cdFx0XHRcdEBjaGFuZ2VTdGVwKHF1ZXN0aW9uTnVtKVxuXG5cdFx0c3RlcE5leHQgOiA9PlxuXHRcdFx0aWYgQGZvcm1TdGVwIDw9IEBxdWVzdGlvbnMubGVuZ3RoXG5cdFx0XHRcdEBlbGVtZW50cy5mb3JtTm9kZS50cmlnZ2VyICdzdWJtaXQnXG5cblx0XHRzdGVwUHJldiA6ID0+XG5cdFx0XHRpZiBAZm9ybVN0ZXAgPiAxXG5cdFx0XHRcdEBmb3JtU3RlcCA9IEBmb3JtU3RlcC0yXG5cdFx0XHRcdEBlbGVtZW50cy5mb3JtTm9kZS50cmlnZ2VyICdzdWJtaXQnXG5cblx0XHRzZWxlY3QyQ2hvaXNlU2VsZWN0ZWQ6IChlKSA9PiBcblx0XHRcdGNvbnNvbGUubG9nIEBcblx0XHRcdHN3aXRjaCBAZm9ybVN0ZXBcblx0XHRcdFx0d2hlbiAxXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJzdGVwOiAxXCIsZS5vYmplY3Quc2V4XG5cdFx0XHRcdFx0YXBwLmNhcmRzQ29sbGVjdGlvbi5lYWNoIChtb2RlbCxpKSAtPlxuXHRcdFx0XHRcdFx0aWYgIW1vZGVsLmdldCgnbG9ja2VkJykgb3IgbW9kZWwuZ2V0KCdsb2NrZWQnKSBpcyBub3QgdHJ1ZVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEubmFtZScsZS5vYmplY3QudGV4dClcblx0XHRcdFx0XHRcdFx0bW9kZWwuc2V0KCdkYXRhLnNleCcsZS5vYmplY3Quc2V4KVxuXHRcdFx0XHR3aGVuIDJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyBcInN0ZXA6IDJcIlxuXHRcdFx0XHRcdGFwcC5jYXJkc0NvbGxlY3Rpb24uZWFjaCAobW9kZWwsaSkgLT5cblx0XHRcdFx0XHRcdGlmICFtb2RlbC5nZXQoJ2xvY2tlZCcpIG9yIG1vZGVsLmdldCgnbG9ja2VkJykgaXMgbm90IHRydWVcblx0XHRcdFx0XHRcdFx0bW9kZWwuc2V0KCdkYXRhLnN1cm5hbWUnLGUub2JqZWN0LnRleHQpXG5cdFx0XHRcdHdoZW4gM1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwic3RlcDogM1wiXG5cdFx0XHRcdFx0YXBwLmNhcmRzQ29sbGVjdGlvbi5lYWNoIChtb2RlbCxpKSAtPlxuXHRcdFx0XHRcdFx0aWYgIW1vZGVsLmdldCgnbG9ja2VkJykgb3IgbW9kZWwuZ2V0KCdsb2NrZWQnKSBpcyBub3QgdHJ1ZVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEuZU1haWwnLGUub2JqZWN0LnRleHQpXG5cdFx0XHRcdHdoZW4gNFxuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwic3RlcDogNFwiXG5cdFx0XHRcdFx0YXBwLmNhcmRzQ29sbGVjdGlvbi5lYWNoIChtb2RlbCxpKSAtPlxuXHRcdFx0XHRcdFx0aWYgIW1vZGVsLmdldCgnbG9ja2VkJykgb3IgbW9kZWwuZ2V0KCdsb2NrZWQnKSBpcyBub3QgdHJ1ZVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEucGhvbmUnLGUub2JqZWN0LnRleHQpXG5cdFx0XHRcdHdoZW4gNVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwic3RlcDogNVwiXG5cdFx0XHRcdFx0YXBwLmNhcmRzQ29sbGVjdGlvbi5lYWNoIChtb2RlbCxpKSAtPlxuXHRcdFx0XHRcdFx0aWYgIW1vZGVsLmdldCgnbG9ja2VkJykgb3IgbW9kZWwuZ2V0KCdsb2NrZWQnKSBpcyBub3QgdHJ1ZVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEucG9zaXRpb24nLGUub2JqZWN0LnRleHQpXG5cblx0XHRzZWxlY3QyY2hvaXNlUmVtb3ZlZDogKGUpID0+XG5cdFx0XHRpZiBlLmNob2ljZS50ZXh0IGlzIEBuYW1lc1swXVxuXHRcdFx0XHRAbmFtZXMuc2hpZnQoKVxuXG5cdFx0XHRpZiBlLmNob2ljZS50ZXh0IGlzIEBuYW1lc1sxXVxuXHRcdFx0XHRAbmFtZXMucG9wKClcblx0XHRcdGlmIEBmb3JtU3RlcCBpcyAxXG5cdFx0XHRcdEBuYW1lcyA9IFtdXG5cdFx0XHRpZiBAZm9ybVN0ZXAgaXMgMlxuXHRcdFx0XHRAc3VybmFtZXMgPSBbXVxuXG5cdFx0IyByZW5kZXI6ID0+XG4iXX0=