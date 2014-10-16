(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app.module('CardGenerator', function(CardGenerator) {
    return CardGenerator.CardsView = (function(_super) {
      __extends(CardsView, _super);

      function CardsView() {
        this.printSelectedCards = __bind(this.printSelectedCards, this);
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
        'questionsQuantity': '.step-form-controller-form-statusbar-quantity',
        'printButton': '.print-selected-cards'
      };

      CardsView.prototype.events = {
        'submit @ui.stepForm': 'submit',
        'select2-selecting @ui.mainInput': 'select2ChoiseSelected',
        'select2-removed @ui.mainInput': 'select2choiseRemoved',
        'click @ui.controlNext': 'stepNext',
        'click @ui.controlPrev': 'stepPrev',
        'click @ui.printButton': 'printSelectedCards'
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
              console.info('cardholder-icons loaded by document.fonts.load', arguments);
              _this.changeStep(1);
              return setTimeout(function() {
                return setInterval(_this.randomRender, 2000);
              }, 1000);
            };
          })(this));
        } else {
          return $.get("/assets/font/cardholder-icons.woff?-a7jq52", (function(_this) {
            return function() {
              console.info('cardholder-icons loaded by ajax', arguments);
              _this.changeStep(1);
              return setTimeout(function() {
                return setInterval(_this.randomRender, 2000);
              }, 1000);
            };
          })(this));
        }
      };

      CardsView.prototype.randomRender = function() {
        var defaults, notLockedViews, randomView;
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
              defaults = randomView.model.defaults;
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

      CardsView.prototype.printSelectedCards = function() {
        var deffer;
        $('body').find('#overlay').addClass('rendering-pdf');
        deffer = (function(_this) {
          return function() {
            var card, cardCanvas, cardIndex, cardsCounter, deltaTimeSeconds, drawLines, endTime, i, imgData, lines, newLineCounter, onLineCounter, pdf, pdfOptions, selectedCards, startTime, x, y, _i;
            startTime = new Date();
            pdfOptions = {
              pdfWidth: 319.8940,
              pdfHeight: 450,
              margin: {
                top: 8.91891891891892,
                left: 18.66666656,
                bottom: 8.91891891891892,
                right: 18.66666656
              },
              cardWidth: 94,
              cardHeight: 54,
              cardPerLine: 3,
              linesCounter: 0
            };
            pdf = new jsPDF('p', 'mm', [pdfOptions.pdfWidth, pdfOptions.pdfHeight]);
            CardGenerator.renderingPDF = true;
            _this.$el.find('#cardsGreed').addClass('prepare-to-pdf');
            app.trigger('resize');
            selectedCards = _this.children.filter(function(view) {
              return view.model.get('is-locked') === true;
            });
            cardsCounter = selectedCards.length;
            lines = {
              VT: {
                x0: 20.5,
                y0: 4.7,
                x1: 20.5,
                y1: 8.7
              },
              VB: {
                x0: 20.5,
                y0: 441,
                x1: 20.5,
                y1: 445
              },
              HL: {
                x0: 15,
                y0: 10.6,
                x1: 19,
                y1: 10.6
              },
              HR: {
                x0: 301.22733344,
                y0: 10.6,
                x1: 305.22733344,
                y1: 10.6
              }
            };
            drawLines = function(startLine, lineType, num, evenEncrement, oddEncrement) {
              var i, _i, _results;
              _results = [];
              for (i = _i = 0; 0 <= num ? _i < num : _i > num; i = 0 <= num ? ++_i : --_i) {
                pdf.line(startLine.x0, startLine.y0, startLine.x1, startLine.y1);
                switch (lineType) {
                  case 'h':
                    if (!(i % 2)) {
                      startLine.y0 += evenEncrement;
                      _results.push(startLine.y1 += evenEncrement);
                    } else {
                      startLine.y0 += oddEncrement;
                      _results.push(startLine.y1 += oddEncrement);
                    }
                    break;
                  case 'v':
                    if (!(i % 2)) {
                      startLine.x0 += evenEncrement;
                      _results.push(startLine.x1 += evenEncrement);
                    } else {
                      startLine.x0 += oddEncrement;
                      _results.push(startLine.x1 += oddEncrement);
                    }
                    break;
                  default:
                    _results.push(void 0);
                }
              }
              return _results;
            };
            drawLines(lines.VT, 'v', 6, 90, 4);
            drawLines(lines.VB, 'v', 6, 90, 4);
            drawLines(lines.HL, 'h', 16, 50, 4);
            drawLines(lines.HR, 'h', 16, 50, 4);
            onLineCounter = 0;
            for (i = _i = 0; _i < 24; i = ++_i) {
              cardIndex = i % selectedCards.length;
              card = selectedCards[cardIndex];
              if (!card.$el.hasClass('fliped')) {
                cardCanvas = card.$el.find('.card-canvas.front')[0];
              } else {
                cardCanvas = card.$el.find('.card-canvas.back')[0];
              }
              imgData = cardCanvas.toDataURL();
              newLineCounter = Math.floor(i / pdfOptions.cardPerLine);
              if (newLineCounter > pdfOptions.linesCounter) {
                pdfOptions.linesCounter++;
                onLineCounter = 0;
              }
              x = (pdfOptions.cardWidth * onLineCounter++) + pdfOptions.margin.left;
              y = (pdfOptions.cardHeight * pdfOptions.linesCounter) + pdfOptions.margin.top;
              pdf.addImage(imgData, 'JPEG', x, y, pdfOptions.cardWidth, pdfOptions.cardHeight, "card" + cardIndex, "SLOW");
            }
            pdf.save('card_holder.pdf');
            CardGenerator.renderingPDF = false;
            endTime = new Date();
            deltaTimeSeconds = (+endTime) - (+startTime) / 1000;
            console.info("time spend " + deltaTimeSeconds);
            _this.$el.find('#cardsGreed').removeClass('prepare-to-pdf');
            return $('body').find('#overlay').removeClass('rendering-pdf');
          };
        })(this);
        return setTimeout(deffer, 300);
      };

      return CardsView;

    })(Marionette.CompositeView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL1ZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQVgsQ0FBa0IsZUFBbEIsRUFBbUMsU0FBQyxhQUFELEdBQUE7V0FDNUIsYUFBYSxDQUFDO0FBQ25CLGtDQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7T0FBQTs7QUFBQSwwQkFBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLDBCQUNBLE9BQUEsR0FBUyxDQURULENBQUE7O0FBQUEsMEJBR0EsU0FBQSxHQUFXLHFCQUhYLENBQUE7O0FBQUEsMEJBS0EsRUFBQSxHQUNDO0FBQUEsUUFBQSxVQUFBLEVBQXNCLDRCQUF0QjtBQUFBLFFBQ0EsV0FBQSxFQUFzQixrQ0FEdEI7QUFBQSxRQUVBLGFBQUEsRUFBc0IseUNBRnRCO0FBQUEsUUFHQSxhQUFBLEVBQXNCLHlDQUh0QjtBQUFBLFFBSUEsVUFBQSxFQUFzQixrQ0FKdEI7QUFBQSxRQUtBLGFBQUEsRUFBc0IsOENBTHRCO0FBQUEsUUFNQSxtQkFBQSxFQUFzQiwrQ0FOdEI7QUFBQSxRQU9BLGFBQUEsRUFBc0IsdUJBUHRCO09BTkQsQ0FBQTs7QUFBQSwwQkFlQSxNQUFBLEdBQ0M7QUFBQSxRQUFBLHFCQUFBLEVBQW9DLFFBQXBDO0FBQUEsUUFDQSxpQ0FBQSxFQUFvQyx1QkFEcEM7QUFBQSxRQUVBLCtCQUFBLEVBQW9DLHNCQUZwQztBQUFBLFFBR0EsdUJBQUEsRUFBb0MsVUFIcEM7QUFBQSxRQUlBLHVCQUFBLEVBQW9DLFVBSnBDO0FBQUEsUUFLQSx1QkFBQSxFQUFvQyxvQkFMcEM7T0FoQkQsQ0FBQTs7QUFBQSwwQkF1QkEsUUFBQSxHQUFVLFNBQUMsS0FBRCxHQUFBO2VBQ1QsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUExQixDQUFxQyxJQUFDLENBQUEsS0FBdEMsRUFEUztNQUFBLENBdkJWLENBQUE7O0FBQUEsMEJBMEJB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Q0FBQSxDQUFBLElBQUEsQ0FuQlQsQ0FBQTtlQXVJQSxVQUFBLENBQVcsTUFBWCxFQUFtQixHQUFuQixFQXhJbUI7TUFBQSxDQWxNcEIsQ0FBQTs7dUJBQUE7O09BRHFDLFVBQVUsQ0FBQyxlQURmO0VBQUEsQ0FBbkMsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZF9nZW5lcmF0b3IvVmlldy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5hcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yJywgKENhcmRHZW5lcmF0b3IpIC0+XG5cdGNsYXNzIENhcmRHZW5lcmF0b3IuQ2FyZHNWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3XG5cdFx0bG9nZ2luZzogb2ZmXG5cdFx0Y291bnRlcjogMFxuXG5cdFx0Y2xhc3NOYW1lOiAnY2FyZC1nZW5lcmF0b3ItdmlldydcblxuXHRcdHVpOlxuXHRcdFx0J3N0ZXBGb3JtJyAgICAgICAgICA6ICcuc3RlcC1mb3JtLWNvbnRyb2xsZXItZm9ybSdcblx0XHRcdCdtYWluSW5wdXQnICAgICAgICAgOiAnLnN0ZXAtZm9ybS1jb250cm9sbGVyLWZvcm0taW5wdXQnXG5cdFx0XHQnY29udHJvbE5leHQnICAgICAgIDogJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtLWNvbnRyb2wubmV4dCdcblx0XHRcdCdjb250cm9sUHJldicgICAgICAgOiAnLnN0ZXAtZm9ybS1jb250cm9sbGVyLWZvcm0tY29udHJvbC5wcmV2J1xuXHRcdFx0J3F1ZXN0aW9uJyAgICAgICAgICA6ICcuc3RlcC1mb3JtLWNvbnRyb2xsZXItZm9ybS1sYWJlbCdcblx0XHRcdCdjdXJyZW50U3RlcCcgICAgICAgOiAnLnN0ZXAtZm9ybS1jb250cm9sbGVyLWZvcm0tc3RhdHVzYmFyLWN1cnJlbnQnXG5cdFx0XHQncXVlc3Rpb25zUXVhbnRpdHknIDogJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtLXN0YXR1c2Jhci1xdWFudGl0eSdcblx0XHRcdCdwcmludEJ1dHRvbicgICAgICAgOiAnLnByaW50LXNlbGVjdGVkLWNhcmRzJ1xuXHRcdFx0XHRcdFxuXHRcdGV2ZW50czogXG5cdFx0XHQnc3VibWl0IEB1aS5zdGVwRm9ybScgICAgICAgICAgICAgOiAnc3VibWl0J1xuXHRcdFx0J3NlbGVjdDItc2VsZWN0aW5nIEB1aS5tYWluSW5wdXQnIDogJ3NlbGVjdDJDaG9pc2VTZWxlY3RlZCdcblx0XHRcdCdzZWxlY3QyLXJlbW92ZWQgQHVpLm1haW5JbnB1dCcgICA6ICdzZWxlY3QyY2hvaXNlUmVtb3ZlZCdcblx0XHRcdCdjbGljayBAdWkuY29udHJvbE5leHQnICAgICAgICAgICA6ICdzdGVwTmV4dCdcblx0XHRcdCdjbGljayBAdWkuY29udHJvbFByZXYnICAgICAgICAgICA6ICdzdGVwUHJldidcblx0XHRcdCdjbGljayBAdWkucHJpbnRCdXR0b24nICAgICAgICAgICA6ICdwcmludFNlbGVjdGVkQ2FyZHMnXG5cblx0XHR0ZW1wbGF0ZTogKG1vZGVsKSAtPlxuXHRcdFx0dGVtcGxhdGl6ZXIuY2FyZEdlbmVyYXRvci5jYXJkc0dyZWVkIEBtb2RlbFxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkNBUkRTIENPTVBPU0lURSBWSUVXOlxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dpbmcgaXMgb25cblx0XHRcdFxuXHRcdFx0QGRhdGEgPSBkYXRhRnJvbVNlcnZlci5hcHBEYXRhXG5cblx0XHRcdEBjaGlsZFZpZXdDb250YWluZXIgPSAnLmNhcmRzJ1xuXHRcdFx0QGNoaWxkVmlldyA9IENhcmRHZW5lcmF0b3IuY2FyZHMuQ2FyZFZpZXdcblx0XHRcdFxuXHRcdFx0QHN0YXRlICAgICAgPSBuZXcgQmFja2JvbmUuTW9kZWwoKVxuXHRcdFx0QG1vZGVsICAgICAgPSBuZXcgQ2FyZEdlbmVyYXRvci5zdGVwRm9ybS5TdGVwRm9ybU1vZGVsKClcblx0XHRcdEBjb2xsZWN0aW9uID0gbmV3IENhcmRHZW5lcmF0b3IuY2FyZHMuQ2FyZHNDb2xsZWN0aW9uKClcblxuXHRcdG9uU2hvdzogPT5cblx0XHRcdEBjdXJyZW50U3RlcCA9IEBtb2RlbC5nZXQgJ2N1cnJlbnRTdGVwJ1xuXHRcdFx0QHF1ZXN0aW9ucyAgPSBAZGF0YS5xdWVzdGlvbnNcblxuXHRcdFx0d2luZG93Lm9ua2V5ZG93biA9IChlKSA9PlxuXHRcdFx0XHRzd2l0Y2ggZS5rZXlDb2RlXG5cdFx0XHRcdFx0d2hlbiAzN1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdFx0XHRAdWkuY29udHJvbHMucHJldi50cmlnZ2VyICdjbGljaydcblx0XHRcdFx0XHR3aGVuIDM5XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0XHRcdEB1aS5jb250cm9scy5uZXh0LnRyaWdnZXIgJ2NsaWNrJ1xuXG5cdFx0XHRAbmFtZXMgPSBbXVxuXHRcdFx0QHN1cm5hbWVzID0gW11cblxuXHRcdFx0bmFtZXMgPSBAZGF0YS5uYW1lc1xuXHRcdFx0ZW1haWxzID0gQGRhdGEuZW1haWxzXG5cdFx0XHRwaG9uZXMgPSBmYWxzZVxuXHRcdFx0cG9zaXRpb25zID0gQGRhdGEucG9zaXRpb25zXG5cdFx0XHRxdWVzdGlvbnMgPSBAZGF0YS5xdWVzdGlvbnNcblx0XHRcdHN1cm5hbWVzID0gQGRhdGEuc3VybmFtZXNcblxuXHRcdFx0QHNyYyA9IFsgbmFtZXMsIHN1cm5hbWVzLCBlbWFpbHMsIHBob25lcywgcG9zaXRpb25zXSBcblxuXHRcdFx0JCggQHVpLm1haW5JbnB1dCApLnNlbGVjdDJcblx0XHRcdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdFx0XHRwbGFjZWhvbGRlciA6ICfQstCy0LXQtNC40YLQtSDQvtGC0LLQtdGCJ1xuXHRcdFx0XHRhbGxvd0NsZWFyOiB0cnVlXG5cdFx0XHRcdG1heGltdW1TZWxlY3Rpb25TaXplOiAyXG5cdFx0XHRcdGFsbG93Q2xlYXI6IHRydWVcblx0XHRcdFx0aW5pdFNlbGVjdGlvbiA6IChlbGVtZW50LCBjYWxsYmFjaykgLT5cblx0XHRcdFx0XHRkYXRhID0gW11cblx0XHRcdFx0XHQkKGVsZW1lbnQudmFsKCkuc3BsaXQoXCIsXCIpKS5lYWNoIC0+XG5cdFx0XHRcdFx0XHRkYXRhLnB1c2goe2lkOiB0aGlzLCB0ZXh0OiB0aGlzfSlcblx0XHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcdGNhbGxiYWNrKGRhdGEpXG5cdFx0XHRcdHRhZ3M6ID0+XG5cdFx0XHRcdFx0aWYgQGN1cnJlbnRTdGVwXG5cdFx0XHRcdFx0XHRyZXR1cm4gQHNyY1tAY3VycmVudFN0ZXAtMV0gb3IgW11cblx0XHRcdFx0XHRlbHNlIFxuXHRcdFx0XHRcdFx0cmV0dXJuIFtdXG5cdFx0XHRcdG11bHRpcGxlOiB0cnVlXG5cblx0XHRcdFx0XHRcdCMgd2FpdCBmb3QgY29tbW9uIGN1c3RvbSBmb250c1xuXHRcdFx0aWYgZG9jdW1lbnQuZm9udHMgdGhlbiBkb2N1bWVudC5mb250cy5sb2FkKFwiMTBweCBjYXJkaG9sZGVyLWljb25zXCIpLnRoZW4gPT4gXG5cdFx0XHRcdGNvbnNvbGUuaW5mbyAnY2FyZGhvbGRlci1pY29ucyBsb2FkZWQgYnkgZG9jdW1lbnQuZm9udHMubG9hZCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRAY2hhbmdlU3RlcCgxKVxuXHRcblx0XHRcdFx0IyBAcmFuZG9tUmVuZGVyKClcblx0XHRcdFx0c2V0VGltZW91dCA9PlxuXHRcdFx0XHRcdHNldEludGVydmFsIEByYW5kb21SZW5kZXIsIDIwMDBcblx0XHRcdFx0LCAxMDAwXG5cblx0XHRcdGVsc2UgJC5nZXQgXCIvYXNzZXRzL2ZvbnQvY2FyZGhvbGRlci1pY29ucy53b2ZmPy1hN2pxNTJcIiwgPT4gXG5cdFx0XHRcdGNvbnNvbGUuaW5mbyAnY2FyZGhvbGRlci1pY29ucyBsb2FkZWQgYnkgYWpheCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRAY2hhbmdlU3RlcCgxKVxuXHRcblx0XHRcdFx0IyBAcmFuZG9tUmVuZGVyKClcblx0XHRcdFx0c2V0VGltZW91dCA9PlxuXHRcdFx0XHRcdHNldEludGVydmFsIEByYW5kb21SZW5kZXIsIDIwMDBcblx0XHRcdFx0LCAxMDAwXG5cblxuXHRcdHJhbmRvbVJlbmRlcjogPT5cblx0XHRcdG5vdExvY2tlZFZpZXdzID0gQGNoaWxkcmVuLmZpbHRlciAodmlldykgLT5cblx0XHRcdFx0cmV0dXJuIHZpZXcubW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpc250IHRydWVcblx0XHRcdHJhbmRvbVZpZXcgPSBub3RMb2NrZWRWaWV3c1sgYXBwLmdldFJhbmRvbSgwLCBub3RMb2NrZWRWaWV3cy5sZW5ndGgtMSkgXVxuXHRcdFx0aWYgbm90TG9ja2VkVmlld3MubGVuZ3RoID4gMCBhbmQgcmFuZG9tVmlldyBhbmQgbm90ICggcmFuZG9tVmlldy5tb2RlbC5nZXQoJ2lzLWhvdmVyZWQnKSBvciByYW5kb21WaWV3Lm1vZGVsLmdldCgnaXMtbG9ja2VkJykgKVxuXHRcdFx0XHRpZiBub3RMb2NrZWRWaWV3cy5sZW5ndGggPCAzXG5cdFx0XHRcdFx0QHByZXZpb3VzVmlld0NpZCA9IHJhbmRvbVZpZXcuY2lkXG5cdFx0XHRcdFx0cmFuZG9tVmlldy5tb2RlbC5jbGVhcih7c2lsZW50OiB0cnVlfSkuc2V0KHJhbmRvbVZpZXcubW9kZWwuZGVmYXVsdHMpXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRpZiByYW5kb21WaWV3LmNpZCBpc250IEBwcmV2aW91c1ZpZXdDaWRcblx0XHRcdFx0XHRcdGRlZmF1bHRzID0gcmFuZG9tVmlldy5tb2RlbC5kZWZhdWx0c1xuXHRcdFx0XHRcdFx0QHByZXZpb3VzVmlld0NpZCA9IHJhbmRvbVZpZXcuY2lkXG5cdFx0XHRcdFx0XHRyYW5kb21WaWV3Lm1vZGVsLmNsZWFyKHtzaWxlbnQ6IHRydWV9KS5zZXQocmFuZG9tVmlldy5tb2RlbC5kZWZhdWx0cylcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRAcmFuZG9tUmVuZGVyKClcblxuXHRcdGNoYW5nZVN0ZXAgOiAoc3RlcCkgPT5cblx0XHRcdEBjdXJyZW50U3RlcCA9IHN0ZXBcblx0XHRcdEBtb2RlbC5zZXQgJ2Zvcm1TdGVwJywgc3RlcFxuXHRcdFx0QHVpLmN1cnJlbnRTdGVwLnRleHQoQGN1cnJlbnRTdGVwKycgJylcblx0XHRcdEB1aS5xdWVzdGlvbnNRdWFudGl0eS50ZXh0KEBxdWVzdGlvbnMubGVuZ3RoKVxuXHRcdFx0QHVpLnF1ZXN0aW9uLnRleHQoQHF1ZXN0aW9uc1tAY3VycmVudFN0ZXAtMV0pXG5cblx0XHRzdWJtaXQ6IChlKSA9PlxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRmb3JtVmFsID0gQCQoJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtLXN0YXR1c2Jhci12YWx1ZScpXG5cdFx0XHRxdWVzdGlvbk51bSA9IEBjdXJyZW50U3RlcFxuXHRcdFx0cXVlc3Rpb25OdW0rK1xuXHRcdFx0Zm9ybVZhbC53aWR0aCAoMTAwLyBAcXVlc3Rpb25zLmxlbmd0aCAqIChxdWVzdGlvbk51bS0xKSArICclJylcblx0XHRcdEB1aS5tYWluSW5wdXQuc2VsZWN0MigndmFsJywnJylcblx0XHRcdGlmIHF1ZXN0aW9uTnVtIGlzIEBxdWVzdGlvbnMubGVuZ3RoKzFcblxuXHRcdFx0XHRjb25zb2xlLmluZm8oJ1RoZSBxdWVzdGlvbnMgaXMgb3ZlciEnKVxuXHRcdFx0XHRAdWkucXVlc3Rpb24udGV4dCgn0JLQvtC/0YDQvtGB0Ysg0LrQvtC90YfQuNC70LjRgdGMIScpXG5cdFx0XHRcdEBjb21wbGV0ZWQ9dHJ1ZVxuXHRcdFx0XHRAdWkubWFpbklucHV0LnNlbGVjdDIgJ3ZhbCcsJydcblx0XHRcdFx0QHVpLm1haW5JbnB1dC5zZWxlY3QyICdlbmFibGUnLCBmYWxzZVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdGVsc2Vcblx0XHRcdFx0QHVpLm1haW5JbnB1dC5zZWxlY3QyICdlbmFibGUnLCB0cnVlXG5cdFx0XHRcdEBjaGFuZ2VTdGVwKHF1ZXN0aW9uTnVtKVxuXG5cdFx0c3RlcE5leHQgOiA9PlxuXHRcdFx0aWYgQGN1cnJlbnRTdGVwIDw9IEBxdWVzdGlvbnMubGVuZ3RoXG5cdFx0XHRcdEB1aS5zdGVwRm9ybS50cmlnZ2VyICdzdWJtaXQnXG5cblx0XHRzdGVwUHJldiA6ID0+XG5cdFx0XHRpZiBAY3VycmVudFN0ZXAgPiAxXG5cdFx0XHRcdEBjdXJyZW50U3RlcCA9IEBjdXJyZW50U3RlcC0yXG5cdFx0XHRcdEB1aS5zdGVwRm9ybS50cmlnZ2VyICdzdWJtaXQnXG5cblx0XHRzZWxlY3QyQ2hvaXNlU2VsZWN0ZWQ6IChlKSA9PiBcblx0XHRcdHN3aXRjaCBAY3VycmVudFN0ZXBcblx0XHRcdFx0d2hlbiAxXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJzdGVwOiAxXCIsZS5vYmplY3Quc2V4XG5cdFx0XHRcdFx0QGNvbGxlY3Rpb24uZWFjaCAobW9kZWwsaSkgLT5cblx0XHRcdFx0XHRcdGlmICFtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIG9yIG1vZGVsLmdldCgnaXMtbG9ja2VkJykgaXMgbm90IHRydWVcblx0XHRcdFx0XHRcdFx0bW9kZWwuc2V0KCdkYXRhLm5hbWUnLGUub2JqZWN0LnRleHQpXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnZGF0YS5zZXgnLGUub2JqZWN0LnNleClcblx0XHRcdFx0d2hlbiAyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJzdGVwOiAyXCJcblx0XHRcdFx0XHRAY29sbGVjdGlvbi5lYWNoIChtb2RlbCxpKSAtPlxuXHRcdFx0XHRcdFx0aWYgIW1vZGVsLmdldCgnaXMtbG9ja2VkJykgb3IgbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpcyBub3QgdHJ1ZVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEuc3VybmFtZScsZS5vYmplY3QudGV4dClcblx0XHRcdFx0d2hlbiAzXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJzdGVwOiAzXCJcblx0XHRcdFx0XHRAY29sbGVjdGlvbi5lYWNoIChtb2RlbCxpKSAtPlxuXHRcdFx0XHRcdFx0aWYgIW1vZGVsLmdldCgnaXMtbG9ja2VkJykgb3IgbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpcyBub3QgdHJ1ZVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEuZU1haWwnLGUub2JqZWN0LnRleHQpXG5cdFx0XHRcdHdoZW4gNFxuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwic3RlcDogNFwiXG5cdFx0XHRcdFx0QGNvbGxlY3Rpb24uZWFjaCAobW9kZWwsaSkgLT5cblx0XHRcdFx0XHRcdGlmICFtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIG9yIG1vZGVsLmdldCgnaXMtbG9ja2VkJykgaXMgbm90IHRydWVcblx0XHRcdFx0XHRcdFx0bW9kZWwuc2V0KCdkYXRhLnBob25lJyxlLm9iamVjdC50ZXh0KVxuXHRcdFx0XHR3aGVuIDVcblx0XHRcdFx0XHRjb25zb2xlLmxvZyBcInN0ZXA6IDVcIlxuXHRcdFx0XHRcdEBjb2xsZWN0aW9uLmVhY2ggKG1vZGVsLGkpIC0+XG5cdFx0XHRcdFx0XHRpZiAhbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBvciBtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIGlzIG5vdCB0cnVlXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnZGF0YS5wb3NpdGlvbicsZS5vYmplY3QudGV4dClcblxuXHRcdHNlbGVjdDJjaG9pc2VSZW1vdmVkOiAoZSkgPT5cblx0XHRcdGlmIGUuY2hvaWNlLnRleHQgaXMgQG5hbWVzWzBdXG5cdFx0XHRcdEBuYW1lcy5zaGlmdCgpXG5cblx0XHRcdGlmIGUuY2hvaWNlLnRleHQgaXMgQG5hbWVzWzFdXG5cdFx0XHRcdEBuYW1lcy5wb3AoKVxuXHRcdFx0aWYgQGN1cnJlbnRTdGVwIGlzIDFcblx0XHRcdFx0QG5hbWVzID0gW11cblx0XHRcdGlmIEBjdXJyZW50U3RlcCBpcyAyXG5cdFx0XHRcdEBzdXJuYW1lcyA9IFtdXG5cblx0XHRwcmludFNlbGVjdGVkQ2FyZHM6ID0+XG5cdFx0XHQkKCdib2R5JykuZmluZCgnI292ZXJsYXknKS5hZGRDbGFzcyAncmVuZGVyaW5nLXBkZidcblxuXHRcdFx0IyA8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUkVOREVSSU5HIE9OIFNFUlZFUlNJREUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XG5cblx0XHRcdCMgY2FyZCA9IEBjaGlsZHJlbi5maW5kQnlJbmRleCgwKS4kZWxcblx0XHRcdCMgaWYgY2FyZC4kZWwuaGFzQ2xhc3MgJ2ZsaXBlZCdcblx0XHRcdCMgXHQgZGF0YUltZyA9IGNhcmQuJGVsLmZpbmQoJy5jYXJkLWNhbnZhcy5mcm9udCcpWzBdLnRvRGF0YVVSTCgpXG5cdFx0XHQjIGVsc2Vcblx0XHRcdCMgXHRkYXRhSW1nID0gY2FyZC4kZWwuZmluZCgnLmNhcmQtY2FudmFzLmJhY2snKVswXS50b0RhdGFVUkwoKVxuXHRcdFx0IyBjb25zb2xlLmxvZyBkYXRhSW1nXG5cdFx0XHQjICQucG9zdCgnL3BkZi1nZW5lcmF0b3InLCBkYXRhOiBkYXRhSW1nKVxuXG5cdFx0XHQjJCgnYm9keScpLmZpbmQoJyNvdmVybGF5JykucmVtb3ZlQ2xhc3MgJ3JlbmRlcmluZy1wZGYnXG5cblx0XHRcdCMgPC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEVORCBSRU5ERVJJTkcgT04gU0VSVkVSU0lERSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cblxuXG5cblx0XHRcdCMgPC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEVORCBSRU5ERVJJTkcgT04gQ0xJRU5UU0lERSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cblx0XHRcdGRlZmZlciA9ID0+XG5cdFx0XHRcdHN0YXJ0VGltZSA9IG5ldyBEYXRlKClcblx0XHRcdFx0IyBUT0RPIGNhbGN1bGF0ZSBwcm9wZXIgbW0gd2l0aCBtZWF6dXJlbWVudCBvZiBEUEkgbGlrZSB0aGlzOiBcblx0XHRcdFx0IyArKCBhcHAuZ2V0VW5pdHMoJCgnY2FudmFzJylbMF0sJ3dpZHRoJykuY20qMTAgKS50b0ZpeGVkKClcblxuXHRcdFx0XHRwZGZPcHRpb25zID1cblx0XHRcdFx0XHRwZGZXaWR0aDogIDMxOS44OTQwXG5cdFx0XHRcdFx0cGRmSGVpZ2h0OiAgNDUwXG5cdFx0XHRcdFx0bWFyZ2luOlxuXHRcdFx0XHRcdFx0dG9wOiA4LjkxODkxODkxODkxODkyXG5cdFx0XHRcdFx0XHRsZWZ0OiAxOC42NjY2NjY1NlxuXHRcdFx0XHRcdFx0Ym90dG9tOiA4LjkxODkxODkxODkxODkyXG5cdFx0XHRcdFx0XHRyaWdodDogMTguNjY2NjY2NTZcblx0XHRcdFx0XHRjYXJkV2lkdGg6IDk0XG5cdFx0XHRcdFx0Y2FyZEhlaWdodDogNTRcblxuXHRcdFx0XHRcdGNhcmRQZXJMaW5lOiAzXG5cdFx0XHRcdFx0bGluZXNDb3VudGVyOiAwXG5cblx0XHRcdFx0cGRmID0gbmV3IGpzUERGKCdwJywnbW0nLCBbIHBkZk9wdGlvbnMucGRmV2lkdGgsIHBkZk9wdGlvbnMucGRmSGVpZ2h0IF0gKVxuXG5cdFx0XHRcdENhcmRHZW5lcmF0b3IucmVuZGVyaW5nUERGID0gdHJ1ZVxuXHRcdFx0XHRAJGVsLmZpbmQoJyNjYXJkc0dyZWVkJykuYWRkQ2xhc3MgJ3ByZXBhcmUtdG8tcGRmJ1xuXHRcdFx0XHRhcHAudHJpZ2dlciAncmVzaXplJ1xuXG5cblx0XHRcdFx0c2VsZWN0ZWRDYXJkcyA9IEBjaGlsZHJlbi5maWx0ZXIgKHZpZXcpIC0+XG5cdFx0XHRcdFx0dmlldy5tb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIGlzIHRydWVcblxuXHRcdFx0XHRjYXJkc0NvdW50ZXIgPSBzZWxlY3RlZENhcmRzLmxlbmd0aFxuXG5cdFx0XHRcdCMgQUREIExJTkVTXG5cdFx0XHRcdGxpbmVzID0gXG5cdFx0XHRcdFx0VlQ6XHQjIHZlcnRpY2FsIC0gdG9wXG5cdFx0XHRcdFx0XHR4MDoyMC41XG5cdFx0XHRcdFx0XHR5MDo0Ljdcblx0XHRcdFx0XHRcdHgxOjIwLjVcblx0XHRcdFx0XHRcdHkxOjguN1xuXG5cdFx0XHRcdFx0VkI6XHQjdmFydGljYWwgLSBib3R0b21cblx0XHRcdFx0XHRcdHgwOjIwLjVcblx0XHRcdFx0XHRcdHkwOjQ0MVxuXHRcdFx0XHRcdFx0eDE6MjAuNVxuXHRcdFx0XHRcdFx0eTE6NDQ1XG5cblx0XHRcdFx0XHRITDpcdCNob3Jpem9udGFsIC0gbGVmdFxuXHRcdFx0XHRcdFx0eDA6MTUgXG5cdFx0XHRcdFx0XHR5MDoxMC42XG5cdFx0XHRcdFx0XHR4MToxOVxuXHRcdFx0XHRcdFx0eTE6MTAuNlxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdEhSOiAjaG9yaXpvbnRhbCAtIHJpZ2h0XG5cdFx0XHRcdFx0XHR4MDogMzAxLjIyNzMzMzQ0XG5cdFx0XHRcdFx0XHR5MDogMTAuNlxuXHRcdFx0XHRcdFx0eDE6IDMwNS4yMjczMzM0NFxuXHRcdFx0XHRcdFx0eTE6IDEwLjZcblxuXHRcdFx0XHRkcmF3TGluZXMgPSAoc3RhcnRMaW5lLCBsaW5lVHlwZSwgbnVtLCBldmVuRW5jcmVtZW50LCBvZGRFbmNyZW1lbnQpIC0+XG5cdFx0XHRcdFx0Zm9yIGkgaW4gWzAuLi5udW1dXG5cdFx0XHRcdFx0XHRwZGYubGluZSBzdGFydExpbmUueDAsIHN0YXJ0TGluZS55MCwgc3RhcnRMaW5lLngxLCBzdGFydExpbmUueTFcblxuXHRcdFx0XHRcdFx0c3dpdGNoIGxpbmVUeXBlXG5cdFx0XHRcdFx0XHRcdHdoZW4gJ2gnICNob3Jpem9udGFsXG5cdFx0XHRcdFx0XHRcdFx0dW5sZXNzIGklMiAjIGV2ZW5cblx0XHRcdFx0XHRcdFx0XHRcdHN0YXJ0TGluZS55MCs9IGV2ZW5FbmNyZW1lbnRcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXJ0TGluZS55MSs9IGV2ZW5FbmNyZW1lbnRcblx0XHRcdFx0XHRcdFx0XHRlbHNlICMgb2RkXG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydExpbmUueTArPSBvZGRFbmNyZW1lbnRcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXJ0TGluZS55MSs9IG9kZEVuY3JlbWVudFxuXG5cdFx0XHRcdFx0XHRcdHdoZW4gJ3YnICN2ZXJ0aWNhbFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdHVubGVzcyBpJTIgIyBldmVuXG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydExpbmUueDArPSBldmVuRW5jcmVtZW50XG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydExpbmUueDErPSBldmVuRW5jcmVtZW50XG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSAjIG9kZFxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhcnRMaW5lLngwKz0gb2RkRW5jcmVtZW50XG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydExpbmUueDErPSBvZGRFbmNyZW1lbnRcblx0XHRcdFx0XG5cdFx0XHRcdGRyYXdMaW5lcyBsaW5lcy5WVCwgJ3YnLCA2LCA5MCwgNFxuXHRcdFx0XHRkcmF3TGluZXMgbGluZXMuVkIsICd2JywgNiwgOTAsIDRcblx0XHRcdFx0ZHJhd0xpbmVzIGxpbmVzLkhMLCAnaCcsIDE2LCA1MCwgNFxuXHRcdFx0XHRkcmF3TGluZXMgbGluZXMuSFIsICdoJywgMTYsIDUwLCA0XG5cblxuXHRcdFx0XHQjIEFERCBDQVJEIElNQUdFU1xuXHRcdFx0XHRvbkxpbmVDb3VudGVyID0gMFxuXHRcdFx0XHRmb3IgaSBpbiBbMC4uLjI0XVxuXHRcdFx0XHRcdGNhcmRJbmRleCA9IGklc2VsZWN0ZWRDYXJkcy5sZW5ndGhcblx0XHRcdFx0XHRjYXJkID0gc2VsZWN0ZWRDYXJkc1tjYXJkSW5kZXhdXG5cblx0XHRcdFx0XHRpZiBub3QgY2FyZC4kZWwuaGFzQ2xhc3MgJ2ZsaXBlZCdcblx0XHRcdFx0XHRcdCBjYXJkQ2FudmFzID0gY2FyZC4kZWwuZmluZCgnLmNhcmQtY2FudmFzLmZyb250JylbMF1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRjYXJkQ2FudmFzID0gY2FyZC4kZWwuZmluZCgnLmNhcmQtY2FudmFzLmJhY2snKVswXVxuXHRcdFx0XHRcdGltZ0RhdGEgPSBjYXJkQ2FudmFzLnRvRGF0YVVSTCgpXG5cblx0XHRcdFx0XHRuZXdMaW5lQ291bnRlciA9IE1hdGguZmxvb3IoaS9wZGZPcHRpb25zLmNhcmRQZXJMaW5lKVxuXHRcdFx0XHRcdGlmIG5ld0xpbmVDb3VudGVyID4gcGRmT3B0aW9ucy5saW5lc0NvdW50ZXJcblx0XHRcdFx0XHRcdHBkZk9wdGlvbnMubGluZXNDb3VudGVyKytcblx0XHRcdFx0XHRcdG9uTGluZUNvdW50ZXIgPSAwXG5cblx0XHRcdFx0XHR4ID0gKHBkZk9wdGlvbnMuY2FyZFdpZHRoKm9uTGluZUNvdW50ZXIrKykrcGRmT3B0aW9ucy5tYXJnaW4ubGVmdFxuXHRcdFx0XHRcdHkgPSAocGRmT3B0aW9ucy5jYXJkSGVpZ2h0KnBkZk9wdGlvbnMubGluZXNDb3VudGVyKStwZGZPcHRpb25zLm1hcmdpbi50b3BcblxuXHRcdFx0XHRcdHBkZi5hZGRJbWFnZShpbWdEYXRhICwgJ0pQRUcnLCB4LCB5LCBwZGZPcHRpb25zLmNhcmRXaWR0aCwgcGRmT3B0aW9ucy5jYXJkSGVpZ2h0LCBcImNhcmQje2NhcmRJbmRleH1cIiwgXCJTTE9XXCIgKVxuXG5cdFx0XHRcdHBkZi5zYXZlICdjYXJkX2hvbGRlci5wZGYnXG5cdFx0XHRcdENhcmRHZW5lcmF0b3IucmVuZGVyaW5nUERGID0gZmFsc2VcblxuXHRcdFx0XHRlbmRUaW1lID0gbmV3IERhdGUoKVxuXHRcdFx0XHRkZWx0YVRpbWVTZWNvbmRzID0gKCtlbmRUaW1lKS0oK3N0YXJ0VGltZSkvMTAwMFxuXHRcdFx0XHRjb25zb2xlLmluZm8gXCJ0aW1lIHNwZW5kICN7IGRlbHRhVGltZVNlY29uZHMgfVwiXG5cblx0XHRcdFx0QCRlbC5maW5kKCcjY2FyZHNHcmVlZCcpLnJlbW92ZUNsYXNzICdwcmVwYXJlLXRvLXBkZidcblx0XHRcdFx0JCgnYm9keScpLmZpbmQoJyNvdmVybGF5JykucmVtb3ZlQ2xhc3MgJ3JlbmRlcmluZy1wZGYnXG5cdFx0XHRcblx0XHRcdHNldFRpbWVvdXQgZGVmZmVyLCAzMDBcblx0XHRcdCMgPC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEVORCBSRU5ERVJJTkcgT04gQ0xJRU5UU0lERSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cblxuXG5cbiJdfQ==