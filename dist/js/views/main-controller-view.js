(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.App.MainControllerView = App.MainControllerView = (function(_super) {
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

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvbWFpbi1jb250cm9sbGVyLXZpZXcuanMiLCJzb3VyY2VzIjpbIm1haW4tY29udHJvbGxlci12aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O21TQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxrQkFBTCxHQUFnQyxHQUFHLENBQUM7QUFDbkMseUNBQUEsQ0FBQTs7Ozs7Ozs7Ozs7OztLQUFBOztBQUFBLGlDQUFBLEtBQUEsR0FBTyxLQUFQLENBQUE7O0FBQUEsaUNBRUEsT0FBQSxHQUFTLElBRlQsQ0FBQTs7QUFBQSxpQ0FHQSxTQUFBLEdBQVcseUJBSFgsQ0FBQTs7QUFBQSxpQ0FJQSxFQUFBLEdBQUksQ0FBQSxDQUFFLDBCQUFGLENBQThCLENBQUEsQ0FBQSxDQUpsQyxDQUFBOztBQUFBLGlDQU1BLE1BQUEsR0FDQztBQUFBLE1BQUEsOEJBQUEsRUFBZ0MsUUFBaEM7QUFBQSxNQUNBLDBDQUFBLEVBQTRDLFVBRDVDO0FBQUEsTUFFQSwwQ0FBQSxFQUE0QyxVQUY1QztBQUFBLE1BR0EsK0NBQUEsRUFBaUQsdUJBSGpEO0FBQUEsTUFJQSw2Q0FBQSxFQUErQyxzQkFKL0M7S0FQRCxDQUFBOztBQUFBLGlDQWFBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxNQUFBLElBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixFQUFhLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLE9BQUQsRUFBVSxJQUFWLEdBQUE7QUFDWixVQUFBLElBQUcsS0FBQyxDQUFBLEtBQUQsS0FBVSxJQUFiO21CQUNDLE9BQU8sQ0FBQyxJQUFSLENBQWEsMkJBQWIsRUFBeUMsT0FBekMsRUFBaUQsSUFBakQsRUFERDtXQURZO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBYixDQUFBLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxRQUFELEdBQ0M7QUFBQSxRQUFBLFFBQUEsRUFBVyxJQUFDLENBQUEs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Q0FBekIsRUFkRjtBQUFBLGFBaUJNLENBakJOO0FBa0JFLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaLENBQUEsQ0FBQTtpQkFDQSxHQUFHLENBQUMsZUFBZSxDQUFDLElBQXBCLENBQXlCLFNBQUMsS0FBRCxFQUFPLENBQVAsR0FBQTtBQUN4QixZQUFBLElBQUcsQ0FBQSxLQUFNLENBQUMsR0FBTixDQUFVLFFBQVYsQ0FBRCxJQUF3QixLQUFLLENBQUMsR0FBTixDQUFVLFFBQVYsQ0FBQSxLQUF1QixDQUFBLElBQWxEO3FCQUNDLEtBQUssQ0FBQyxHQUFOLENBQVUsWUFBVixFQUF1QixDQUFDLENBQUMsTUFBTSxDQUFDLElBQWhDLEVBREQ7YUFEd0I7VUFBQSxDQUF6QixFQW5CRjtBQUFBLGFBc0JNLENBdEJOO0FBdUJFLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaLENBQUEsQ0FBQTtpQkFDQSxHQUFHLENBQUMsZUFBZSxDQUFDLElBQXBCLENBQXlCLFNBQUMsS0FBRCxFQUFPLENBQVAsR0FBQTtBQUN4QixZQUFBLElBQUcsQ0FBQSxLQUFNLENBQUMsR0FBTixDQUFVLFFBQVYsQ0FBRCxJQUF3QixLQUFLLENBQUMsR0FBTixDQUFVLFFBQVYsQ0FBQSxLQUF1QixDQUFBLElBQWxEO3FCQUNDLEtBQUssQ0FBQyxHQUFOLENBQVUsZUFBVixFQUEwQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQW5DLEVBREQ7YUFEd0I7VUFBQSxDQUF6QixFQXhCRjtBQUFBLE9BRnNCO0lBQUEsQ0FoSHZCLENBQUE7O0FBQUEsaUNBOElBLG9CQUFBLEdBQXNCLFNBQUMsQ0FBRCxHQUFBO0FBQ3JCLE1BQUEsSUFBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQVQsS0FBaUIsSUFBQyxDQUFBLEtBQU0sQ0FBQSxDQUFBLENBQTNCO0FBQ0MsUUFBQSxJQUFDLENBQUEsS0FBSyxDQUFDLEtBQVAsQ0FBQSxDQUFBLENBREQ7T0FBQTtBQUdBLE1BQUEsSUFBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQVQsS0FBaUIsSUFBQyxDQUFBLEtBQU0sQ0FBQSxDQUFBLENBQTNCO0FBQ0MsUUFBQSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBQSxDQUFBLENBREQ7T0FIQTtBQUtBLE1BQUEsSUFBRyxJQUFDLENBQUEsUUFBRCxLQUFhLENBQWhCO0FBQ0MsUUFBQSxJQUFDLENBQUEsS0FBRCxHQUFTLEVBQVQsQ0FERDtPQUxBO0FBT0EsTUFBQSxJQUFHLElBQUMsQ0FBQSxRQUFELEtBQWEsQ0FBaEI7ZUFDQyxJQUFDLENBQUEsUUFBRCxHQUFZLEdBRGI7T0FScUI7SUFBQSxDQTlJdEIsQ0FBQTs7QUFBQSxpQ0F5SkEsTUFBQSxHQUFRLFNBQUEsR0FBQSxDQXpKUixDQUFBOzs4QkFBQTs7S0FEOEQsUUFBUSxDQUFDLEtBQXhFLENBQUE7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbbnVsbF0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9