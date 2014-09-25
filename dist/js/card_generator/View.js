(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app.module('CardGenerator', function(CardGenerator) {
    return CardGenerator.CardsView = (function(_super) {
      __extends(CardsView, _super);

      function CardsView() {
        this.select2choiseRemoved = __bind(this.select2choiseRemoved, this);
        this.select2ChoiseSelected = __bind(this.select2ChoiseSelected, this);
        this.stepPrev = __bind(this.stepPrev, this);
        this.stepNext = __bind(this.stepNext, this);
        this.submit = __bind(this.submit, this);
        this.changeStep = __bind(this.changeStep, this);
        this.randomRender = __bind(this.randomRender, this);
        this.onShow = __bind(this.onShow, this);
        return CardsView.__super__.constructor.apply(this, arguments);
      }

      CardsView.prototype.logging = false;

      CardsView.prototype.counter = 0;

      CardsView.prototype.className = 'card-generator-view';

      CardsView.prototype.ui = {
        'stepForm': '.step-form-controller-form',
        'mainInput': '.step-form-controller-form-input',
        'controlNext': '.step-form-controller-form-control.next',
        'controlPrev': '.step-form-controller-form-control.prev',
        'question': '.step-form-controller-form-label',
        'currentStep': '.step-form-controller-form-statusbar-current',
        'questionsQuantity': '.step-form-controller-form-statusbar-quantity'
      };

      CardsView.prototype.events = {
        'submit @ui.stepForm': 'submit',
        'select2-selecting @ui.mainInput': 'select2ChoiseSelected',
        'select2-removed @ui.mainInput': 'select2choiseRemoved',
        'click @ui.controlNext': 'stepNext',
        'click @ui.controlPrev': 'stepPrev'
      };

      CardsView.prototype.template = function(model) {
        return templatizer.cardGenerator.cardsGreed(this.model);
      };

      CardsView.prototype.initialize = function() {
        this.bind('all', function() {
          if (this.logging === true) {
            return console.log("CARDS COMPOSITE VIEW:\t", arguments);
          }
        });
        this.data = dataFromServer.appData;
        this.childViewContainer = '.cards';
        this.childView = CardGenerator.cards.CardView;
        this.state = new Backbone.Model();
        this.model = new CardGenerator.stepForm.StepFormModel();
        return this.collection = new CardGenerator.cards.CardsCollection();
      };

      CardsView.prototype.onShow = function() {
        var emails, names, phones, positions, questions, surnames;
        this.currentStep = this.model.get('currentStep');
        this.questions = this.data.questions;
        window.onkeydown = (function(_this) {
          return function(e) {
            switch (e.keyCode) {
              case 37:
                e.preventDefault();
                return _this.ui.controls.prev.trigger('click');
              case 39:
                e.preventDefault();
                return _this.ui.controls.next.trigger('click');
            }
          };
        })(this);
        this.names = [];
        this.surnames = [];
        names = this.data.names;
        emails = this.data.emails;
        phones = false;
        positions = this.data.positions;
        questions = this.data.questions;
        surnames = this.data.surnames;
        this.src = [names, surnames, emails, phones, positions];
        $(this.ui.mainInput).select2({
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
              if (_this.currentStep) {
                return _this.src[_this.currentStep - 1] || [];
              } else {
                return [];
              }
            };
          })(this),
          multiple: true
        });
        if (document.fonts) {
          return document.fonts.load("10px cardholder-icons").then((function(_this) {
            return function() {
              _this.changeStep(1);
              return setTimeout(function() {
                return setInterval(_this.randomRender, 2000);
              }, 1000);
            };
          })(this));
        } else {
          return $.get("/assets/font/cardholder-icons.woff?-a7jq52", (function(_this) {
            return function() {
              _this.changeStep(1);
              return setTimeout(function() {
                return setInterval(_this.randomRender, 2000);
              }, 1000);
            };
          })(this));
        }
      };

      CardsView.prototype.randomRender = function() {
        var notLockedViews, randomView;
        notLockedViews = this.children.filter(function(view) {
          return view.model.get('is-locked') !== true;
        });
        randomView = notLockedViews[app.getRandom(0, notLockedViews.length - 1)];
        if (notLockedViews.length > 0 && randomView && !(randomView.model.get('is-hovered') || randomView.model.get('is-locked'))) {
          if (notLockedViews.length < 3) {
            this.previousViewCid = randomView.cid;
            return randomView.model.clear({
              silent: true
            }).set(randomView.model.defaults);
          } else {
            if (randomView.cid !== this.previousViewCid) {
              this.previousViewCid = randomView.cid;
              return randomView.model.clear({
                silent: true
              }).set(randomView.model.defaults);
            } else {
              return this.randomRender();
            }
          }
        }
      };

      CardsView.prototype.changeStep = function(step) {
        this.currentStep = step;
        this.model.set('formStep', step);
        this.ui.currentStep.text(this.currentStep + ' ');
        this.ui.questionsQuantity.text(this.questions.length);
        return this.ui.question.text(this.questions[this.currentStep - 1]);
      };

      CardsView.prototype.submit = function(e) {
        var formVal, questionNum;
        e.preventDefault();
        formVal = this.$('.step-form-controller-form-statusbar-value');
        questionNum = this.currentStep;
        questionNum++;
        formVal.width(100 / this.questions.length * (questionNum - 1) + '%');
        this.ui.mainInput.select2('val', '');
        if (questionNum === this.questions.length + 1) {
          console.info('The questions is over!');
          this.ui.question.text('Вопросы кончились!');
          this.completed = true;
          this.ui.mainInput.select2('val', '');
          this.ui.mainInput.select2('enable', false);
        } else {
          this.ui.mainInput.select2('enable', true);
          return this.changeStep(questionNum);
        }
      };

      CardsView.prototype.stepNext = function() {
        if (this.currentStep <= this.questions.length) {
          return this.ui.stepForm.trigger('submit');
        }
      };

      CardsView.prototype.stepPrev = function() {
        if (this.currentStep > 1) {
          this.currentStep = this.currentStep - 2;
          return this.ui.stepForm.trigger('submit');
        }
      };

      CardsView.prototype.select2ChoiseSelected = function(e) {
        console.log(this);
        switch (this.currentStep) {
          case 1:
            console.log("step: 1", e.object.sex);
            return this.collection.each(function(model, i) {
              if (!model.get('is-locked') || model.get('is-locked') === !true) {
                model.set('data.name', e.object.text);
                return model.set('data.sex', e.object.sex);
              }
            });
          case 2:
            console.log("step: 2");
            return this.collection.each(function(model, i) {
              if (!model.get('is-locked') || model.get('is-locked') === !true) {
                return model.set('data.surname', e.object.text);
              }
            });
          case 3:
            console.log("step: 3");
            return this.collection.each(function(model, i) {
              if (!model.get('is-locked') || model.get('is-locked') === !true) {
                return model.set('data.eMail', e.object.text);
              }
            });
          case 4:
            console.log("step: 4");
            return this.collection.each(function(model, i) {
              if (!model.get('is-locked') || model.get('is-locked') === !true) {
                return model.set('data.phone', e.object.text);
              }
            });
          case 5:
            console.log("step: 5");
            return this.collection.each(function(model, i) {
              if (!model.get('is-locked') || model.get('is-locked') === !true) {
                return model.set('data.position', e.object.text);
              }
            });
        }
      };

      CardsView.prototype.select2choiseRemoved = function(e) {
        if (e.choice.text === this.names[0]) {
          this.names.shift();
        }
        if (e.choice.text === this.names[1]) {
          this.names.pop();
        }
        if (this.currentStep === 1) {
          this.names = [];
        }
        if (this.currentStep === 2) {
          return this.surnames = [];
        }
      };

      return CardsView;

    })(Marionette.CompositeView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL1ZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQVgsQ0FBa0IsZUFBbEIsRUFBbUMsU0FBQyxhQUFELEdBQUE7V0FDNUIsYUFBYSxDQUFDO0FBQ25CLGtDQUFBLENBQUE7Ozs7Ozs7Ozs7OztPQUFBOztBQUFBLDBCQUFBLE9BQUEsR0FBUyxLQUFULENBQUE7O0FBQUEsMEJBQ0EsT0FBQSxHQUFTLENBRFQsQ0FBQTs7QUFBQSwwQkFHQSxTQUFBLEdBQVcscUJBSFgsQ0FBQTs7QUFBQSwwQkFLQSxFQUFBLEdBQ0M7QUFBQSxRQUFBLFVBQUEsRUFBc0IsNEJBQXRCO0FBQUEsUUFDQSxXQUFBLEVBQXNCLGtDQUR0QjtBQUFBLFFBRUEsYUFBQSxFQUFzQix5Q0FGdEI7QUFBQSxRQUdBLGFBQUEsRUFBc0IseUNBSHRCO0FBQUEsUUFJQSxVQUFBLEVBQXNCLGtDQUp0QjtBQUFBLFFBS0EsYUFBQSxFQUFzQiw4Q0FMdEI7QUFBQSxRQU1BLG1CQUFBLEVBQXNCLCtDQU50QjtPQU5ELENBQUE7O0FBQUEsMEJBY0EsTUFBQSxHQUNDO0FBQUEsUUFBQSxxQkFBQSxFQUFvQyxRQUFwQztBQUFBLFFBQ0EsaUNBQUEsRUFBb0MsdUJBRHBDO0FBQUEsUUFFQSwrQkFBQSxFQUFvQyxzQkFGcEM7QUFBQSxRQUdBLHVCQUFBLEVBQW9DLFVBSHBDO0FBQUEsUUFJQSx1QkFBQSxFQUFvQyxVQUpwQztPQWZELENBQUE7O0FBQUEsMEJBcUJBLFFBQUEsR0FBVSxTQUFDLEtBQUQsR0FBQTtlQUNULFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBMUIsQ0FBcUMsSUFBQyxDQUFBLEtBQXRDLEVBRFM7TUFBQSxDQXJCVixDQUFBOztBQUFBLDBCQXdCQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1gsUUFBQSxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFB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R0FBWSxHQURiO1NBUnFCO01BQUEsQ0FuTHRCLENBQUE7O3VCQUFBOztPQURxQyxVQUFVLENBQUMsZUFEZjtFQUFBLENBQW5DLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZ2VuZXJhdG9yL1ZpZXcuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvcicsIChDYXJkR2VuZXJhdG9yKSAtPlxuXHRjbGFzcyBDYXJkR2VuZXJhdG9yLkNhcmRzVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29tcG9zaXRlVmlld1xuXHRcdGxvZ2dpbmc6IG9mZlxuXHRcdGNvdW50ZXI6IDBcblxuXHRcdGNsYXNzTmFtZTogJ2NhcmQtZ2VuZXJhdG9yLXZpZXcnXG5cblx0XHR1aTpcblx0XHRcdCdzdGVwRm9ybScgICAgICAgICAgOiAnLnN0ZXAtZm9ybS1jb250cm9sbGVyLWZvcm0nXG5cdFx0XHQnbWFpbklucHV0JyAgICAgICAgIDogJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtLWlucHV0J1xuXHRcdFx0J2NvbnRyb2xOZXh0JyAgICAgICA6ICcuc3RlcC1mb3JtLWNvbnRyb2xsZXItZm9ybS1jb250cm9sLm5leHQnXG5cdFx0XHQnY29udHJvbFByZXYnICAgICAgIDogJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtLWNvbnRyb2wucHJldidcblx0XHRcdCdxdWVzdGlvbicgICAgICAgICAgOiAnLnN0ZXAtZm9ybS1jb250cm9sbGVyLWZvcm0tbGFiZWwnXG5cdFx0XHQnY3VycmVudFN0ZXAnICAgICAgIDogJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtLXN0YXR1c2Jhci1jdXJyZW50J1xuXHRcdFx0J3F1ZXN0aW9uc1F1YW50aXR5JyA6ICcuc3RlcC1mb3JtLWNvbnRyb2xsZXItZm9ybS1zdGF0dXNiYXItcXVhbnRpdHknXG5cdFx0XHRcdFx0XG5cdFx0ZXZlbnRzOiBcblx0XHRcdCdzdWJtaXQgQHVpLnN0ZXBGb3JtJyAgICAgICAgICAgICA6ICdzdWJtaXQnXG5cdFx0XHQnc2VsZWN0Mi1zZWxlY3RpbmcgQHVpLm1haW5JbnB1dCcgOiAnc2VsZWN0MkNob2lzZVNlbGVjdGVkJ1xuXHRcdFx0J3NlbGVjdDItcmVtb3ZlZCBAdWkubWFpbklucHV0JyAgIDogJ3NlbGVjdDJjaG9pc2VSZW1vdmVkJ1xuXHRcdFx0J2NsaWNrIEB1aS5jb250cm9sTmV4dCcgICAgICAgICAgIDogJ3N0ZXBOZXh0J1xuXHRcdFx0J2NsaWNrIEB1aS5jb250cm9sUHJldicgICAgICAgICAgIDogJ3N0ZXBQcmV2J1xuXG5cdFx0dGVtcGxhdGU6IChtb2RlbCkgLT5cblx0XHRcdHRlbXBsYXRpemVyLmNhcmRHZW5lcmF0b3IuY2FyZHNHcmVlZCBAbW9kZWxcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRAYmluZCAnYWxsJywgLT5cblx0XHRcdFx0Y29uc29sZS5sb2cgXCJDQVJEUyBDT01QT1NJVEUgVklFVzpcXHRcIiwgYXJndW1lbnRzIGlmIEBsb2dnaW5nIGlzIG9uXG5cdFx0XHRcblx0XHRcdEBkYXRhID0gZGF0YUZyb21TZXJ2ZXIuYXBwRGF0YVxuXG5cdFx0XHRAY2hpbGRWaWV3Q29udGFpbmVyID0gJy5jYXJkcydcblx0XHRcdEBjaGlsZFZpZXcgPSBDYXJkR2VuZXJhdG9yLmNhcmRzLkNhcmRWaWV3XG5cdFx0XHRcblx0XHRcdEBzdGF0ZSAgICAgID0gbmV3IEJhY2tib25lLk1vZGVsKClcblx0XHRcdEBtb2RlbCAgICAgID0gbmV3IENhcmRHZW5lcmF0b3Iuc3RlcEZvcm0uU3RlcEZvcm1Nb2RlbCgpXG5cdFx0XHRAY29sbGVjdGlvbiA9IG5ldyBDYXJkR2VuZXJhdG9yLmNhcmRzLkNhcmRzQ29sbGVjdGlvbigpXG5cblx0XHRvblNob3c6ID0+XG5cdFx0XHRAY3VycmVudFN0ZXAgPSBAbW9kZWwuZ2V0ICdjdXJyZW50U3RlcCdcblx0XHRcdEBxdWVzdGlvbnMgID0gQGRhdGEucXVlc3Rpb25zXG5cblx0XHRcdHdpbmRvdy5vbmtleWRvd24gPSAoZSkgPT5cblx0XHRcdFx0c3dpdGNoIGUua2V5Q29kZVxuXHRcdFx0XHRcdHdoZW4gMzdcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRcdFx0QHVpLmNvbnRyb2xzLnByZXYudHJpZ2dlciAnY2xpY2snXG5cdFx0XHRcdFx0d2hlbiAzOVxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdFx0XHRAdWkuY29udHJvbHMubmV4dC50cmlnZ2VyICdjbGljaydcblxuXHRcdFx0QG5hbWVzID0gW11cblx0XHRcdEBzdXJuYW1lcyA9IFtdXG5cblx0XHRcdG5hbWVzID0gQGRhdGEubmFtZXNcblx0XHRcdGVtYWlscyA9IEBkYXRhLmVtYWlsc1xuXHRcdFx0cGhvbmVzID0gZmFsc2Vcblx0XHRcdHBvc2l0aW9ucyA9IEBkYXRhLnBvc2l0aW9uc1xuXHRcdFx0cXVlc3Rpb25zID0gQGRhdGEucXVlc3Rpb25zXG5cdFx0XHRzdXJuYW1lcyA9IEBkYXRhLnN1cm5hbWVzXG5cblx0XHRcdEBzcmMgPSBbIG5hbWVzLCBzdXJuYW1lcywgZW1haWxzLCBwaG9uZXMsIHBvc2l0aW9uc10gXG5cblx0XHRcdCQoIEB1aS5tYWluSW5wdXQgKS5zZWxlY3QyXG5cdFx0XHRcdHdpZHRoOiAnMTAwJSdcblx0XHRcdFx0cGxhY2Vob2xkZXIgOiAn0LLQstC10LTQuNGC0LUg0L7RgtCy0LXRgidcblx0XHRcdFx0YWxsb3dDbGVhcjogdHJ1ZVxuXHRcdFx0XHRtYXhpbXVtU2VsZWN0aW9uU2l6ZTogMlxuXHRcdFx0XHRhbGxvd0NsZWFyOiB0cnVlXG5cdFx0XHRcdGluaXRTZWxlY3Rpb24gOiAoZWxlbWVudCwgY2FsbGJhY2spIC0+XG5cdFx0XHRcdFx0ZGF0YSA9IFtdXG5cdFx0XHRcdFx0JChlbGVtZW50LnZhbCgpLnNwbGl0KFwiLFwiKSkuZWFjaCAtPlxuXHRcdFx0XHRcdFx0ZGF0YS5wdXNoKHtpZDogdGhpcywgdGV4dDogdGhpc30pXG5cdFx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0XHRjYWxsYmFjayhkYXRhKVxuXHRcdFx0XHR0YWdzOiA9PlxuXHRcdFx0XHRcdGlmIEBjdXJyZW50U3RlcFxuXHRcdFx0XHRcdFx0cmV0dXJuIEBzcmNbQGN1cnJlbnRTdGVwLTFdIG9yIFtdXG5cdFx0XHRcdFx0ZWxzZSBcblx0XHRcdFx0XHRcdHJldHVybiBbXVxuXHRcdFx0XHRtdWx0aXBsZTogdHJ1ZVxuXG5cdFx0XHRcdFx0XHQjIHdhaXQgZm90IGNvbW1vbiBjdXN0b20gZm9udHNcblx0XHRcdGlmIGRvY3VtZW50LmZvbnRzIHRoZW4gZG9jdW1lbnQuZm9udHMubG9hZChcIjEwcHggY2FyZGhvbGRlci1pY29uc1wiKS50aGVuID0+IFxuXHRcdFx0XHRAY2hhbmdlU3RlcCgxKVxuXHRcblx0XHRcdFx0IyBAcmFuZG9tUmVuZGVyKClcblx0XHRcdFx0c2V0VGltZW91dCA9PlxuXHRcdFx0XHRcdHNldEludGVydmFsIEByYW5kb21SZW5kZXIsIDIwMDBcblx0XHRcdFx0LCAxMDAwXG5cblx0XHRcdGVsc2UgJC5nZXQgXCIvYXNzZXRzL2ZvbnQvY2FyZGhvbGRlci1pY29ucy53b2ZmPy1hN2pxNTJcIiwgPT4gXG5cdFx0XHRcdEBjaGFuZ2VTdGVwKDEpXG5cdFxuXHRcdFx0XHQjIEByYW5kb21SZW5kZXIoKVxuXHRcdFx0XHRzZXRUaW1lb3V0ID0+XG5cdFx0XHRcdFx0c2V0SW50ZXJ2YWwgQHJhbmRvbVJlbmRlciwgMjAwMFxuXHRcdFx0XHQsIDEwMDBcblxuXG5cdFx0cmFuZG9tUmVuZGVyOiA9PlxuXHRcdFx0bm90TG9ja2VkVmlld3MgPSBAY2hpbGRyZW4uZmlsdGVyICh2aWV3KSAtPlxuXHRcdFx0XHRyZXR1cm4gdmlldy5tb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIGlzbnQgdHJ1ZVxuXHRcdFx0cmFuZG9tVmlldyA9IG5vdExvY2tlZFZpZXdzWyBhcHAuZ2V0UmFuZG9tKDAsIG5vdExvY2tlZFZpZXdzLmxlbmd0aC0xKSBdXG5cdFx0XHRpZiBub3RMb2NrZWRWaWV3cy5sZW5ndGggPiAwIGFuZCByYW5kb21WaWV3IGFuZCBub3QgKCByYW5kb21WaWV3Lm1vZGVsLmdldCgnaXMtaG92ZXJlZCcpIG9yIHJhbmRvbVZpZXcubW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSApXG5cdFx0XHRcdGlmIG5vdExvY2tlZFZpZXdzLmxlbmd0aCA8IDNcblx0XHRcdFx0XHRAcHJldmlvdXNWaWV3Q2lkID0gcmFuZG9tVmlldy5jaWRcblx0XHRcdFx0XHRyYW5kb21WaWV3Lm1vZGVsLmNsZWFyKHtzaWxlbnQ6IHRydWV9KS5zZXQocmFuZG9tVmlldy5tb2RlbC5kZWZhdWx0cylcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGlmIHJhbmRvbVZpZXcuY2lkIGlzbnQgQHByZXZpb3VzVmlld0NpZFxuXHRcdFx0XHRcdFx0QHByZXZpb3VzVmlld0NpZCA9IHJhbmRvbVZpZXcuY2lkXG5cdFx0XHRcdFx0XHRyYW5kb21WaWV3Lm1vZGVsLmNsZWFyKHtzaWxlbnQ6IHRydWV9KS5zZXQocmFuZG9tVmlldy5tb2RlbC5kZWZhdWx0cylcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRAcmFuZG9tUmVuZGVyKClcblxuXHRcdGNoYW5nZVN0ZXAgOiAoc3RlcCkgPT5cblx0XHRcdEBjdXJyZW50U3RlcCA9IHN0ZXBcblx0XHRcdEBtb2RlbC5zZXQgJ2Zvcm1TdGVwJywgc3RlcFxuXHRcdFx0QHVpLmN1cnJlbnRTdGVwLnRleHQoQGN1cnJlbnRTdGVwKycgJylcblx0XHRcdEB1aS5xdWVzdGlvbnNRdWFudGl0eS50ZXh0KEBxdWVzdGlvbnMubGVuZ3RoKVxuXHRcdFx0QHVpLnF1ZXN0aW9uLnRleHQoQHF1ZXN0aW9uc1tAY3VycmVudFN0ZXAtMV0pXG5cblx0XHRzdWJtaXQ6IChlKSA9PlxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRmb3JtVmFsID0gQCQoJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtLXN0YXR1c2Jhci12YWx1ZScpXG5cdFx0XHRxdWVzdGlvbk51bSA9IEBjdXJyZW50U3RlcFxuXHRcdFx0cXVlc3Rpb25OdW0rK1xuXHRcdFx0Zm9ybVZhbC53aWR0aCAoMTAwLyBAcXVlc3Rpb25zLmxlbmd0aCAqIChxdWVzdGlvbk51bS0xKSArICclJylcblx0XHRcdEB1aS5tYWluSW5wdXQuc2VsZWN0MigndmFsJywnJylcblx0XHRcdGlmIHF1ZXN0aW9uTnVtIGlzIEBxdWVzdGlvbnMubGVuZ3RoKzFcblxuXHRcdFx0XHRjb25zb2xlLmluZm8oJ1RoZSBxdWVzdGlvbnMgaXMgb3ZlciEnKVxuXHRcdFx0XHRAdWkucXVlc3Rpb24udGV4dCgn0JLQvtC/0YDQvtGB0Ysg0LrQvtC90YfQuNC70LjRgdGMIScpXG5cdFx0XHRcdEBjb21wbGV0ZWQ9dHJ1ZVxuXHRcdFx0XHRAdWkubWFpbklucHV0LnNlbGVjdDIgJ3ZhbCcsJydcblx0XHRcdFx0QHVpLm1haW5JbnB1dC5zZWxlY3QyICdlbmFibGUnLCBmYWxzZVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdGVsc2Vcblx0XHRcdFx0QHVpLm1haW5JbnB1dC5zZWxlY3QyICdlbmFibGUnLCB0cnVlXG5cdFx0XHRcdEBjaGFuZ2VTdGVwKHF1ZXN0aW9uTnVtKVxuXG5cdFx0c3RlcE5leHQgOiA9PlxuXHRcdFx0aWYgQGN1cnJlbnRTdGVwIDw9IEBxdWVzdGlvbnMubGVuZ3RoXG5cdFx0XHRcdEB1aS5zdGVwRm9ybS50cmlnZ2VyICdzdWJtaXQnXG5cblx0XHRzdGVwUHJldiA6ID0+XG5cdFx0XHRpZiBAY3VycmVudFN0ZXAgPiAxXG5cdFx0XHRcdEBjdXJyZW50U3RlcCA9IEBjdXJyZW50U3RlcC0yXG5cdFx0XHRcdEB1aS5zdGVwRm9ybS50cmlnZ2VyICdzdWJtaXQnXG5cblx0XHRzZWxlY3QyQ2hvaXNlU2VsZWN0ZWQ6IChlKSA9PiBcblx0XHRcdGNvbnNvbGUubG9nIEBcblx0XHRcdHN3aXRjaCBAY3VycmVudFN0ZXBcblx0XHRcdFx0d2hlbiAxXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJzdGVwOiAxXCIsZS5vYmplY3Quc2V4XG5cdFx0XHRcdFx0QGNvbGxlY3Rpb24uZWFjaCAobW9kZWwsaSkgLT5cblx0XHRcdFx0XHRcdGlmICFtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIG9yIG1vZGVsLmdldCgnaXMtbG9ja2VkJykgaXMgbm90IHRydWVcblx0XHRcdFx0XHRcdFx0bW9kZWwuc2V0KCdkYXRhLm5hbWUnLGUub2JqZWN0LnRleHQpXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnZGF0YS5zZXgnLGUub2JqZWN0LnNleClcblx0XHRcdFx0d2hlbiAyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJzdGVwOiAyXCJcblx0XHRcdFx0XHRAY29sbGVjdGlvbi5lYWNoIChtb2RlbCxpKSAtPlxuXHRcdFx0XHRcdFx0aWYgIW1vZGVsLmdldCgnaXMtbG9ja2VkJykgb3IgbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpcyBub3QgdHJ1ZVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEuc3VybmFtZScsZS5vYmplY3QudGV4dClcblx0XHRcdFx0d2hlbiAzXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJzdGVwOiAzXCJcblx0XHRcdFx0XHRAY29sbGVjdGlvbi5lYWNoIChtb2RlbCxpKSAtPlxuXHRcdFx0XHRcdFx0aWYgIW1vZGVsLmdldCgnaXMtbG9ja2VkJykgb3IgbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpcyBub3QgdHJ1ZVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEuZU1haWwnLGUub2JqZWN0LnRleHQpXG5cdFx0XHRcdHdoZW4gNFxuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwic3RlcDogNFwiXG5cdFx0XHRcdFx0QGNvbGxlY3Rpb24uZWFjaCAobW9kZWwsaSkgLT5cblx0XHRcdFx0XHRcdGlmICFtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIG9yIG1vZGVsLmdldCgnaXMtbG9ja2VkJykgaXMgbm90IHRydWVcblx0XHRcdFx0XHRcdFx0bW9kZWwuc2V0KCdkYXRhLnBob25lJyxlLm9iamVjdC50ZXh0KVxuXHRcdFx0XHR3aGVuIDVcblx0XHRcdFx0XHRjb25zb2xlLmxvZyBcInN0ZXA6IDVcIlxuXHRcdFx0XHRcdEBjb2xsZWN0aW9uLmVhY2ggKG1vZGVsLGkpIC0+XG5cdFx0XHRcdFx0XHRpZiAhbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBvciBtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIGlzIG5vdCB0cnVlXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnZGF0YS5wb3NpdGlvbicsZS5vYmplY3QudGV4dClcblxuXHRcdHNlbGVjdDJjaG9pc2VSZW1vdmVkOiAoZSkgPT5cblx0XHRcdGlmIGUuY2hvaWNlLnRleHQgaXMgQG5hbWVzWzBdXG5cdFx0XHRcdEBuYW1lcy5zaGlmdCgpXG5cblx0XHRcdGlmIGUuY2hvaWNlLnRleHQgaXMgQG5hbWVzWzFdXG5cdFx0XHRcdEBuYW1lcy5wb3AoKVxuXHRcdFx0aWYgQGN1cnJlbnRTdGVwIGlzIDFcblx0XHRcdFx0QG5hbWVzID0gW11cblx0XHRcdGlmIEBjdXJyZW50U3RlcCBpcyAyXG5cdFx0XHRcdEBzdXJuYW1lcyA9IFtdXG5cbiJdfQ==