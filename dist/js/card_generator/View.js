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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL1ZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQVgsQ0FBa0IsZUFBbEIsRUFBbUMsU0FBQyxhQUFELEdBQUE7V0FDNUIsYUFBYSxDQUFDO0FBQ25CLGtDQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7T0FBQTs7QUFBQSwwQkFBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLDBCQUNBLE9BQUEsR0FBUyxDQURULENBQUE7O0FBQUEsMEJBR0EsU0FBQSxHQUFXLHFCQUhYLENBQUE7O0FBQUEsMEJBS0EsRUFBQSxHQUNDO0FBQUEsUUFBQSxVQUFBLEVBQXNCLDRCQUF0QjtBQUFBLFFBQ0EsV0FBQSxFQUFzQixrQ0FEdEI7QUFBQSxRQUVBLGFBQUEsRUFBc0IseUNBRnRCO0FBQUEsUUFHQSxhQUFBLEVBQXNCLHlDQUh0QjtBQUFBLFFBSUEsVUFBQSxFQUFzQixrQ0FKdEI7QUFBQSxRQUtBLGFBQUEsRUFBc0IsOENBTHRCO0FBQUEsUUFNQSxtQkFBQSxFQUFzQiwrQ0FOdEI7QUFBQSxRQU9BLGFBQUEsRUFBc0IsdUJBUHRCO09BTkQsQ0FBQTs7QUFBQSwwQkFlQSxNQUFBLEdBQ0M7QUFBQSxRQUFBLHFCQUFBLEVBQW9DLFFBQXBDO0FBQUEsUUFDQSxpQ0FBQSxFQUFvQyx1QkFEcEM7QUFBQSxRQUVBLCtCQUFBLEVBQW9DLHNCQUZwQztBQUFBLFFBR0EsdUJBQUEsRUFBb0MsVUFIcEM7QUFBQSxRQUlBLHVCQUFBLEVBQW9DLFVBSnBDO0FBQUEsUUFLQSx1QkFBQSxFQUFvQyxvQkFMcEM7T0FoQkQsQ0FBQTs7QUFBQSwwQkF1QkEsUUFBQSxHQUFVLFNBQUMsS0FBRCxHQUFBO2VBQ1QsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUExQixDQUFxQyxJQUFDLENBQUEsS0FBdEMsRUFEUztNQUFBLENBdkJWLENBQUE7O0FBQUEsMEJBMEJB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QixHQUFuQixFQXhJbUI7TUFBQSxDQWpNcEIsQ0FBQTs7dUJBQUE7O09BRHFDLFVBQVUsQ0FBQyxlQURmO0VBQUEsQ0FBbkMsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZF9nZW5lcmF0b3IvVmlldy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5hcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yJywgKENhcmRHZW5lcmF0b3IpIC0+XG5cdGNsYXNzIENhcmRHZW5lcmF0b3IuQ2FyZHNWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3XG5cdFx0bG9nZ2luZzogb2ZmXG5cdFx0Y291bnRlcjogMFxuXG5cdFx0Y2xhc3NOYW1lOiAnY2FyZC1nZW5lcmF0b3ItdmlldydcblxuXHRcdHVpOlxuXHRcdFx0J3N0ZXBGb3JtJyAgICAgICAgICA6ICcuc3RlcC1mb3JtLWNvbnRyb2xsZXItZm9ybSdcblx0XHRcdCdtYWluSW5wdXQnICAgICAgICAgOiAnLnN0ZXAtZm9ybS1jb250cm9sbGVyLWZvcm0taW5wdXQnXG5cdFx0XHQnY29udHJvbE5leHQnICAgICAgIDogJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtLWNvbnRyb2wubmV4dCdcblx0XHRcdCdjb250cm9sUHJldicgICAgICAgOiAnLnN0ZXAtZm9ybS1jb250cm9sbGVyLWZvcm0tY29udHJvbC5wcmV2J1xuXHRcdFx0J3F1ZXN0aW9uJyAgICAgICAgICA6ICcuc3RlcC1mb3JtLWNvbnRyb2xsZXItZm9ybS1sYWJlbCdcblx0XHRcdCdjdXJyZW50U3RlcCcgICAgICAgOiAnLnN0ZXAtZm9ybS1jb250cm9sbGVyLWZvcm0tc3RhdHVzYmFyLWN1cnJlbnQnXG5cdFx0XHQncXVlc3Rpb25zUXVhbnRpdHknIDogJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtLXN0YXR1c2Jhci1xdWFudGl0eSdcblx0XHRcdCdwcmludEJ1dHRvbicgICAgICAgOiAnLnByaW50LXNlbGVjdGVkLWNhcmRzJ1xuXHRcdFx0XHRcdFxuXHRcdGV2ZW50czogXG5cdFx0XHQnc3VibWl0IEB1aS5zdGVwRm9ybScgICAgICAgICAgICAgOiAnc3VibWl0J1xuXHRcdFx0J3NlbGVjdDItc2VsZWN0aW5nIEB1aS5tYWluSW5wdXQnIDogJ3NlbGVjdDJDaG9pc2VTZWxlY3RlZCdcblx0XHRcdCdzZWxlY3QyLXJlbW92ZWQgQHVpLm1haW5JbnB1dCcgICA6ICdzZWxlY3QyY2hvaXNlUmVtb3ZlZCdcblx0XHRcdCdjbGljayBAdWkuY29udHJvbE5leHQnICAgICAgICAgICA6ICdzdGVwTmV4dCdcblx0XHRcdCdjbGljayBAdWkuY29udHJvbFByZXYnICAgICAgICAgICA6ICdzdGVwUHJldidcblx0XHRcdCdjbGljayBAdWkucHJpbnRCdXR0b24nICAgICAgICAgICA6ICdwcmludFNlbGVjdGVkQ2FyZHMnXG5cblx0XHR0ZW1wbGF0ZTogKG1vZGVsKSAtPlxuXHRcdFx0dGVtcGxhdGl6ZXIuY2FyZEdlbmVyYXRvci5jYXJkc0dyZWVkIEBtb2RlbFxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkNBUkRTIENPTVBPU0lURSBWSUVXOlxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dpbmcgaXMgb25cblx0XHRcdFxuXHRcdFx0QGRhdGEgPSBkYXRhRnJvbVNlcnZlci5hcHBEYXRhXG5cblx0XHRcdEBjaGlsZFZpZXdDb250YWluZXIgPSAnLmNhcmRzJ1xuXHRcdFx0QGNoaWxkVmlldyA9IENhcmRHZW5lcmF0b3IuY2FyZHMuQ2FyZFZpZXdcblx0XHRcdFxuXHRcdFx0QHN0YXRlICAgICAgPSBuZXcgQmFja2JvbmUuTW9kZWwoKVxuXHRcdFx0QG1vZGVsICAgICAgPSBuZXcgQ2FyZEdlbmVyYXRvci5zdGVwRm9ybS5TdGVwRm9ybU1vZGVsKClcblx0XHRcdEBjb2xsZWN0aW9uID0gbmV3IENhcmRHZW5lcmF0b3IuY2FyZHMuQ2FyZHNDb2xsZWN0aW9uKClcblxuXHRcdG9uU2hvdzogPT5cblx0XHRcdEBjdXJyZW50U3RlcCA9IEBtb2RlbC5nZXQgJ2N1cnJlbnRTdGVwJ1xuXHRcdFx0QHF1ZXN0aW9ucyAgPSBAZGF0YS5xdWVzdGlvbnNcblxuXHRcdFx0d2luZG93Lm9ua2V5ZG93biA9IChlKSA9PlxuXHRcdFx0XHRzd2l0Y2ggZS5rZXlDb2RlXG5cdFx0XHRcdFx0d2hlbiAzN1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdFx0XHRAdWkuY29udHJvbHMucHJldi50cmlnZ2VyICdjbGljaydcblx0XHRcdFx0XHR3aGVuIDM5XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0XHRcdEB1aS5jb250cm9scy5uZXh0LnRyaWdnZXIgJ2NsaWNrJ1xuXG5cdFx0XHRAbmFtZXMgPSBbXVxuXHRcdFx0QHN1cm5hbWVzID0gW11cblxuXHRcdFx0bmFtZXMgPSBAZGF0YS5uYW1lc1xuXHRcdFx0ZW1haWxzID0gQGRhdGEuZW1haWxzXG5cdFx0XHRwaG9uZXMgPSBmYWxzZVxuXHRcdFx0cG9zaXRpb25zID0gQGRhdGEucG9zaXRpb25zXG5cdFx0XHRxdWVzdGlvbnMgPSBAZGF0YS5xdWVzdGlvbnNcblx0XHRcdHN1cm5hbWVzID0gQGRhdGEuc3VybmFtZXNcblxuXHRcdFx0QHNyYyA9IFsgbmFtZXMsIHN1cm5hbWVzLCBlbWFpbHMsIHBob25lcywgcG9zaXRpb25zXSBcblxuXHRcdFx0JCggQHVpLm1haW5JbnB1dCApLnNlbGVjdDJcblx0XHRcdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdFx0XHRwbGFjZWhvbGRlciA6ICfQstCy0LXQtNC40YLQtSDQvtGC0LLQtdGCJ1xuXHRcdFx0XHRhbGxvd0NsZWFyOiB0cnVlXG5cdFx0XHRcdG1heGltdW1TZWxlY3Rpb25TaXplOiAyXG5cdFx0XHRcdGFsbG93Q2xlYXI6IHRydWVcblx0XHRcdFx0aW5pdFNlbGVjdGlvbiA6IChlbGVtZW50LCBjYWxsYmFjaykgLT5cblx0XHRcdFx0XHRkYXRhID0gW11cblx0XHRcdFx0XHQkKGVsZW1lbnQudmFsKCkuc3BsaXQoXCIsXCIpKS5lYWNoIC0+XG5cdFx0XHRcdFx0XHRkYXRhLnB1c2goe2lkOiB0aGlzLCB0ZXh0OiB0aGlzfSlcblx0XHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcdGNhbGxiYWNrKGRhdGEpXG5cdFx0XHRcdHRhZ3M6ID0+XG5cdFx0XHRcdFx0aWYgQGN1cnJlbnRTdGVwXG5cdFx0XHRcdFx0XHRyZXR1cm4gQHNyY1tAY3VycmVudFN0ZXAtMV0gb3IgW11cblx0XHRcdFx0XHRlbHNlIFxuXHRcdFx0XHRcdFx0cmV0dXJuIFtdXG5cdFx0XHRcdG11bHRpcGxlOiB0cnVlXG5cblx0XHRcdFx0XHRcdCMgd2FpdCBmb3QgY29tbW9uIGN1c3RvbSBmb250c1xuXHRcdFx0aWYgZG9jdW1lbnQuZm9udHMgdGhlbiBkb2N1bWVudC5mb250cy5sb2FkKFwiMTBweCBjYXJkaG9sZGVyLWljb25zXCIpLnRoZW4gPT4gXG5cdFx0XHRcdGNvbnNvbGUuaW5mbyAnY2FyZGhvbGRlci1pY29ucyBsb2FkZWQgYnkgZG9jdW1lbnQuZm9udHMubG9hZCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRAY2hhbmdlU3RlcCgxKVxuXHRcblx0XHRcdFx0IyBAcmFuZG9tUmVuZGVyKClcblx0XHRcdFx0c2V0VGltZW91dCA9PlxuXHRcdFx0XHRcdHNldEludGVydmFsIEByYW5kb21SZW5kZXIsIDIwMDBcblx0XHRcdFx0LCAxMDAwXG5cblx0XHRcdGVsc2UgJC5nZXQgXCIvYXNzZXRzL2ZvbnQvY2FyZGhvbGRlci1pY29ucy53b2ZmPy1hN2pxNTJcIiwgPT4gXG5cdFx0XHRcdGNvbnNvbGUuaW5mbyAnY2FyZGhvbGRlci1pY29ucyBsb2FkZWQgYnkgYWpheCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRAY2hhbmdlU3RlcCgxKVxuXHRcblx0XHRcdFx0IyBAcmFuZG9tUmVuZGVyKClcblx0XHRcdFx0c2V0VGltZW91dCA9PlxuXHRcdFx0XHRcdHNldEludGVydmFsIEByYW5kb21SZW5kZXIsIDIwMDBcblx0XHRcdFx0LCAxMDAwXG5cblxuXHRcdHJhbmRvbVJlbmRlcjogPT5cblx0XHRcdG5vdExvY2tlZFZpZXdzID0gQGNoaWxkcmVuLmZpbHRlciAodmlldykgLT5cblx0XHRcdFx0cmV0dXJuIHZpZXcubW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpc250IHRydWVcblx0XHRcdHJhbmRvbVZpZXcgPSBub3RMb2NrZWRWaWV3c1sgYXBwLmdldFJhbmRvbSgwLCBub3RMb2NrZWRWaWV3cy5sZW5ndGgtMSkgXVxuXHRcdFx0aWYgbm90TG9ja2VkVmlld3MubGVuZ3RoID4gMCBhbmQgcmFuZG9tVmlldyBhbmQgbm90ICggcmFuZG9tVmlldy5tb2RlbC5nZXQoJ2lzLWhvdmVyZWQnKSBvciByYW5kb21WaWV3Lm1vZGVsLmdldCgnaXMtbG9ja2VkJykgKVxuXHRcdFx0XHRpZiBub3RMb2NrZWRWaWV3cy5sZW5ndGggPCAzXG5cdFx0XHRcdFx0QHByZXZpb3VzVmlld0NpZCA9IHJhbmRvbVZpZXcuY2lkXG5cdFx0XHRcdFx0cmFuZG9tVmlldy5tb2RlbC5jbGVhcih7c2lsZW50OiB0cnVlfSkuc2V0KHJhbmRvbVZpZXcubW9kZWwuZGVmYXVsdHMpXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRpZiByYW5kb21WaWV3LmNpZCBpc250IEBwcmV2aW91c1ZpZXdDaWRcblx0XHRcdFx0XHRcdEBwcmV2aW91c1ZpZXdDaWQgPSByYW5kb21WaWV3LmNpZFxuXHRcdFx0XHRcdFx0cmFuZG9tVmlldy5tb2RlbC5jbGVhcih7c2lsZW50OiB0cnVlfSkuc2V0KHJhbmRvbVZpZXcubW9kZWwuZGVmYXVsdHMpXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0QHJhbmRvbVJlbmRlcigpXG5cblx0XHRjaGFuZ2VTdGVwIDogKHN0ZXApID0+XG5cdFx0XHRAY3VycmVudFN0ZXAgPSBzdGVwXG5cdFx0XHRAbW9kZWwuc2V0ICdmb3JtU3RlcCcsIHN0ZXBcblx0XHRcdEB1aS5jdXJyZW50U3RlcC50ZXh0KEBjdXJyZW50U3RlcCsnICcpXG5cdFx0XHRAdWkucXVlc3Rpb25zUXVhbnRpdHkudGV4dChAcXVlc3Rpb25zLmxlbmd0aClcblx0XHRcdEB1aS5xdWVzdGlvbi50ZXh0KEBxdWVzdGlvbnNbQGN1cnJlbnRTdGVwLTFdKVxuXG5cdFx0c3VibWl0OiAoZSkgPT5cblx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0Zm9ybVZhbCA9IEAkKCcuc3RlcC1mb3JtLWNvbnRyb2xsZXItZm9ybS1zdGF0dXNiYXItdmFsdWUnKVxuXHRcdFx0cXVlc3Rpb25OdW0gPSBAY3VycmVudFN0ZXBcblx0XHRcdHF1ZXN0aW9uTnVtKytcblx0XHRcdGZvcm1WYWwud2lkdGggKDEwMC8gQHF1ZXN0aW9ucy5sZW5ndGggKiAocXVlc3Rpb25OdW0tMSkgKyAnJScpXG5cdFx0XHRAdWkubWFpbklucHV0LnNlbGVjdDIoJ3ZhbCcsJycpXG5cdFx0XHRpZiBxdWVzdGlvbk51bSBpcyBAcXVlc3Rpb25zLmxlbmd0aCsxXG5cblx0XHRcdFx0Y29uc29sZS5pbmZvKCdUaGUgcXVlc3Rpb25zIGlzIG92ZXIhJylcblx0XHRcdFx0QHVpLnF1ZXN0aW9uLnRleHQoJ9CS0L7Qv9GA0L7RgdGLINC60L7QvdGH0LjQu9C40YHRjCEnKVxuXHRcdFx0XHRAY29tcGxldGVkPXRydWVcblx0XHRcdFx0QHVpLm1haW5JbnB1dC5zZWxlY3QyICd2YWwnLCcnXG5cdFx0XHRcdEB1aS5tYWluSW5wdXQuc2VsZWN0MiAnZW5hYmxlJywgZmFsc2Vcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEB1aS5tYWluSW5wdXQuc2VsZWN0MiAnZW5hYmxlJywgdHJ1ZVxuXHRcdFx0XHRAY2hhbmdlU3RlcChxdWVzdGlvbk51bSlcblxuXHRcdHN0ZXBOZXh0IDogPT5cblx0XHRcdGlmIEBjdXJyZW50U3RlcCA8PSBAcXVlc3Rpb25zLmxlbmd0aFxuXHRcdFx0XHRAdWkuc3RlcEZvcm0udHJpZ2dlciAnc3VibWl0J1xuXG5cdFx0c3RlcFByZXYgOiA9PlxuXHRcdFx0aWYgQGN1cnJlbnRTdGVwID4gMVxuXHRcdFx0XHRAY3VycmVudFN0ZXAgPSBAY3VycmVudFN0ZXAtMlxuXHRcdFx0XHRAdWkuc3RlcEZvcm0udHJpZ2dlciAnc3VibWl0J1xuXG5cdFx0c2VsZWN0MkNob2lzZVNlbGVjdGVkOiAoZSkgPT4gXG5cdFx0XHRzd2l0Y2ggQGN1cnJlbnRTdGVwXG5cdFx0XHRcdHdoZW4gMVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwic3RlcDogMVwiLGUub2JqZWN0LnNleFxuXHRcdFx0XHRcdEBjb2xsZWN0aW9uLmVhY2ggKG1vZGVsLGkpIC0+XG5cdFx0XHRcdFx0XHRpZiAhbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBvciBtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIGlzIG5vdCB0cnVlXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnZGF0YS5uYW1lJyxlLm9iamVjdC50ZXh0KVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEuc2V4JyxlLm9iamVjdC5zZXgpXG5cdFx0XHRcdHdoZW4gMlxuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwic3RlcDogMlwiXG5cdFx0XHRcdFx0QGNvbGxlY3Rpb24uZWFjaCAobW9kZWwsaSkgLT5cblx0XHRcdFx0XHRcdGlmICFtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIG9yIG1vZGVsLmdldCgnaXMtbG9ja2VkJykgaXMgbm90IHRydWVcblx0XHRcdFx0XHRcdFx0bW9kZWwuc2V0KCdkYXRhLnN1cm5hbWUnLGUub2JqZWN0LnRleHQpXG5cdFx0XHRcdHdoZW4gM1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwic3RlcDogM1wiXG5cdFx0XHRcdFx0QGNvbGxlY3Rpb24uZWFjaCAobW9kZWwsaSkgLT5cblx0XHRcdFx0XHRcdGlmICFtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIG9yIG1vZGVsLmdldCgnaXMtbG9ja2VkJykgaXMgbm90IHRydWVcblx0XHRcdFx0XHRcdFx0bW9kZWwuc2V0KCdkYXRhLmVNYWlsJyxlLm9iamVjdC50ZXh0KVxuXHRcdFx0XHR3aGVuIDRcblx0XHRcdFx0XHRjb25zb2xlLmxvZyBcInN0ZXA6IDRcIlxuXHRcdFx0XHRcdEBjb2xsZWN0aW9uLmVhY2ggKG1vZGVsLGkpIC0+XG5cdFx0XHRcdFx0XHRpZiAhbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBvciBtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIGlzIG5vdCB0cnVlXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnZGF0YS5waG9uZScsZS5vYmplY3QudGV4dClcblx0XHRcdFx0d2hlbiA1XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJzdGVwOiA1XCJcblx0XHRcdFx0XHRAY29sbGVjdGlvbi5lYWNoIChtb2RlbCxpKSAtPlxuXHRcdFx0XHRcdFx0aWYgIW1vZGVsLmdldCgnaXMtbG9ja2VkJykgb3IgbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpcyBub3QgdHJ1ZVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEucG9zaXRpb24nLGUub2JqZWN0LnRleHQpXG5cblx0XHRzZWxlY3QyY2hvaXNlUmVtb3ZlZDogKGUpID0+XG5cdFx0XHRpZiBlLmNob2ljZS50ZXh0IGlzIEBuYW1lc1swXVxuXHRcdFx0XHRAbmFtZXMuc2hpZnQoKVxuXG5cdFx0XHRpZiBlLmNob2ljZS50ZXh0IGlzIEBuYW1lc1sxXVxuXHRcdFx0XHRAbmFtZXMucG9wKClcblx0XHRcdGlmIEBjdXJyZW50U3RlcCBpcyAxXG5cdFx0XHRcdEBuYW1lcyA9IFtdXG5cdFx0XHRpZiBAY3VycmVudFN0ZXAgaXMgMlxuXHRcdFx0XHRAc3VybmFtZXMgPSBbXVxuXG5cdFx0cHJpbnRTZWxlY3RlZENhcmRzOiA9PlxuXHRcdFx0JCgnYm9keScpLmZpbmQoJyNvdmVybGF5JykuYWRkQ2xhc3MgJ3JlbmRlcmluZy1wZGYnXG5cblx0XHRcdCMgPC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFJFTkRFUklORyBPTiBTRVJWRVJTSURFIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxuXG5cdFx0XHQjIGNhcmQgPSBAY2hpbGRyZW4uZmluZEJ5SW5kZXgoMCkuJGVsXG5cdFx0XHQjIGlmIGNhcmQuJGVsLmhhc0NsYXNzICdmbGlwZWQnXG5cdFx0XHQjIFx0IGRhdGFJbWcgPSBjYXJkLiRlbC5maW5kKCcuY2FyZC1jYW52YXMuZnJvbnQnKVswXS50b0RhdGFVUkwoKVxuXHRcdFx0IyBlbHNlXG5cdFx0XHQjIFx0ZGF0YUltZyA9IGNhcmQuJGVsLmZpbmQoJy5jYXJkLWNhbnZhcy5iYWNrJylbMF0udG9EYXRhVVJMKClcblx0XHRcdCMgY29uc29sZS5sb2cgZGF0YUltZ1xuXHRcdFx0IyAkLnBvc3QoJy9wZGYtZ2VuZXJhdG9yJywgZGF0YTogZGF0YUltZylcblxuXHRcdFx0IyQoJ2JvZHknKS5maW5kKCcjb3ZlcmxheScpLnJlbW92ZUNsYXNzICdyZW5kZXJpbmctcGRmJ1xuXG5cdFx0XHQjIDwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBFTkQgUkVOREVSSU5HIE9OIFNFUlZFUlNJREUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XG5cblxuXG5cdFx0XHQjIDwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBFTkQgUkVOREVSSU5HIE9OIENMSUVOVFNJREUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XG5cdFx0XHRkZWZmZXIgPSA9PlxuXHRcdFx0XHRzdGFydFRpbWUgPSBuZXcgRGF0ZSgpXG5cdFx0XHRcdCMgVE9ETyBjYWxjdWxhdGUgcHJvcGVyIG1tIHdpdGggbWVhenVyZW1lbnQgb2YgRFBJIGxpa2UgdGhpczogXG5cdFx0XHRcdCMgKyggYXBwLmdldFVuaXRzKCQoJ2NhbnZhcycpWzBdLCd3aWR0aCcpLmNtKjEwICkudG9GaXhlZCgpXG5cblx0XHRcdFx0cGRmT3B0aW9ucyA9XG5cdFx0XHRcdFx0cGRmV2lkdGg6ICAzMTkuODk0MFxuXHRcdFx0XHRcdHBkZkhlaWdodDogIDQ1MFxuXHRcdFx0XHRcdG1hcmdpbjpcblx0XHRcdFx0XHRcdHRvcDogOC45MTg5MTg5MTg5MTg5MlxuXHRcdFx0XHRcdFx0bGVmdDogMTguNjY2NjY2NTZcblx0XHRcdFx0XHRcdGJvdHRvbTogOC45MTg5MTg5MTg5MTg5MlxuXHRcdFx0XHRcdFx0cmlnaHQ6IDE4LjY2NjY2NjU2XG5cdFx0XHRcdFx0Y2FyZFdpZHRoOiA5NFxuXHRcdFx0XHRcdGNhcmRIZWlnaHQ6IDU0XG5cblx0XHRcdFx0XHRjYXJkUGVyTGluZTogM1xuXHRcdFx0XHRcdGxpbmVzQ291bnRlcjogMFxuXG5cdFx0XHRcdHBkZiA9IG5ldyBqc1BERigncCcsJ21tJywgWyBwZGZPcHRpb25zLnBkZldpZHRoLCBwZGZPcHRpb25zLnBkZkhlaWdodCBdIClcblxuXHRcdFx0XHRDYXJkR2VuZXJhdG9yLnJlbmRlcmluZ1BERiA9IHRydWVcblx0XHRcdFx0QCRlbC5maW5kKCcjY2FyZHNHcmVlZCcpLmFkZENsYXNzICdwcmVwYXJlLXRvLXBkZidcblx0XHRcdFx0YXBwLnRyaWdnZXIgJ3Jlc2l6ZSdcblxuXG5cdFx0XHRcdHNlbGVjdGVkQ2FyZHMgPSBAY2hpbGRyZW4uZmlsdGVyICh2aWV3KSAtPlxuXHRcdFx0XHRcdHZpZXcubW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpcyB0cnVlXG5cblx0XHRcdFx0Y2FyZHNDb3VudGVyID0gc2VsZWN0ZWRDYXJkcy5sZW5ndGhcblxuXHRcdFx0XHQjIEFERCBMSU5FU1xuXHRcdFx0XHRsaW5lcyA9IFxuXHRcdFx0XHRcdFZUOlx0IyB2ZXJ0aWNhbCAtIHRvcFxuXHRcdFx0XHRcdFx0eDA6MjAuNVxuXHRcdFx0XHRcdFx0eTA6NC43XG5cdFx0XHRcdFx0XHR4MToyMC41XG5cdFx0XHRcdFx0XHR5MTo4LjdcblxuXHRcdFx0XHRcdFZCOlx0I3ZhcnRpY2FsIC0gYm90dG9tXG5cdFx0XHRcdFx0XHR4MDoyMC41XG5cdFx0XHRcdFx0XHR5MDo0NDFcblx0XHRcdFx0XHRcdHgxOjIwLjVcblx0XHRcdFx0XHRcdHkxOjQ0NVxuXG5cdFx0XHRcdFx0SEw6XHQjaG9yaXpvbnRhbCAtIGxlZnRcblx0XHRcdFx0XHRcdHgwOjE1IFxuXHRcdFx0XHRcdFx0eTA6MTAuNlxuXHRcdFx0XHRcdFx0eDE6MTlcblx0XHRcdFx0XHRcdHkxOjEwLjZcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRIUjogI2hvcml6b250YWwgLSByaWdodFxuXHRcdFx0XHRcdFx0eDA6IDMwMS4yMjczMzM0NFxuXHRcdFx0XHRcdFx0eTA6IDEwLjZcblx0XHRcdFx0XHRcdHgxOiAzMDUuMjI3MzMzNDRcblx0XHRcdFx0XHRcdHkxOiAxMC42XG5cblx0XHRcdFx0ZHJhd0xpbmVzID0gKHN0YXJ0TGluZSwgbGluZVR5cGUsIG51bSwgZXZlbkVuY3JlbWVudCwgb2RkRW5jcmVtZW50KSAtPlxuXHRcdFx0XHRcdGZvciBpIGluIFswLi4ubnVtXVxuXHRcdFx0XHRcdFx0cGRmLmxpbmUgc3RhcnRMaW5lLngwLCBzdGFydExpbmUueTAsIHN0YXJ0TGluZS54MSwgc3RhcnRMaW5lLnkxXG5cblx0XHRcdFx0XHRcdHN3aXRjaCBsaW5lVHlwZVxuXHRcdFx0XHRcdFx0XHR3aGVuICdoJyAjaG9yaXpvbnRhbFxuXHRcdFx0XHRcdFx0XHRcdHVubGVzcyBpJTIgIyBldmVuXG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydExpbmUueTArPSBldmVuRW5jcmVtZW50XG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydExpbmUueTErPSBldmVuRW5jcmVtZW50XG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSAjIG9kZFxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhcnRMaW5lLnkwKz0gb2RkRW5jcmVtZW50XG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydExpbmUueTErPSBvZGRFbmNyZW1lbnRcblxuXHRcdFx0XHRcdFx0XHR3aGVuICd2JyAjdmVydGljYWxcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHR1bmxlc3MgaSUyICMgZXZlblxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhcnRMaW5lLngwKz0gZXZlbkVuY3JlbWVudFxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhcnRMaW5lLngxKz0gZXZlbkVuY3JlbWVudFxuXHRcdFx0XHRcdFx0XHRcdGVsc2UgIyBvZGRcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXJ0TGluZS54MCs9IG9kZEVuY3JlbWVudFxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhcnRMaW5lLngxKz0gb2RkRW5jcmVtZW50XG5cdFx0XHRcdFxuXHRcdFx0XHRkcmF3TGluZXMgbGluZXMuVlQsICd2JywgNiwgOTAsIDRcblx0XHRcdFx0ZHJhd0xpbmVzIGxpbmVzLlZCLCAndicsIDYsIDkwLCA0XG5cdFx0XHRcdGRyYXdMaW5lcyBsaW5lcy5ITCwgJ2gnLCAxNiwgNTAsIDRcblx0XHRcdFx0ZHJhd0xpbmVzIGxpbmVzLkhSLCAnaCcsIDE2LCA1MCwgNFxuXG5cblx0XHRcdFx0IyBBREQgQ0FSRCBJTUFHRVNcblx0XHRcdFx0b25MaW5lQ291bnRlciA9IDBcblx0XHRcdFx0Zm9yIGkgaW4gWzAuLi4yNF1cblx0XHRcdFx0XHRjYXJkSW5kZXggPSBpJXNlbGVjdGVkQ2FyZHMubGVuZ3RoXG5cdFx0XHRcdFx0Y2FyZCA9IHNlbGVjdGVkQ2FyZHNbY2FyZEluZGV4XVxuXG5cdFx0XHRcdFx0aWYgbm90IGNhcmQuJGVsLmhhc0NsYXNzICdmbGlwZWQnXG5cdFx0XHRcdFx0XHQgY2FyZENhbnZhcyA9IGNhcmQuJGVsLmZpbmQoJy5jYXJkLWNhbnZhcy5mcm9udCcpWzBdXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0Y2FyZENhbnZhcyA9IGNhcmQuJGVsLmZpbmQoJy5jYXJkLWNhbnZhcy5iYWNrJylbMF1cblx0XHRcdFx0XHRpbWdEYXRhID0gY2FyZENhbnZhcy50b0RhdGFVUkwoKVxuXG5cdFx0XHRcdFx0bmV3TGluZUNvdW50ZXIgPSBNYXRoLmZsb29yKGkvcGRmT3B0aW9ucy5jYXJkUGVyTGluZSlcblx0XHRcdFx0XHRpZiBuZXdMaW5lQ291bnRlciA+IHBkZk9wdGlvbnMubGluZXNDb3VudGVyXG5cdFx0XHRcdFx0XHRwZGZPcHRpb25zLmxpbmVzQ291bnRlcisrXG5cdFx0XHRcdFx0XHRvbkxpbmVDb3VudGVyID0gMFxuXG5cdFx0XHRcdFx0eCA9IChwZGZPcHRpb25zLmNhcmRXaWR0aCpvbkxpbmVDb3VudGVyKyspK3BkZk9wdGlvbnMubWFyZ2luLmxlZnRcblx0XHRcdFx0XHR5ID0gKHBkZk9wdGlvbnMuY2FyZEhlaWdodCpwZGZPcHRpb25zLmxpbmVzQ291bnRlcikrcGRmT3B0aW9ucy5tYXJnaW4udG9wXG5cblx0XHRcdFx0XHRwZGYuYWRkSW1hZ2UoaW1nRGF0YSAsICdKUEVHJywgeCwgeSwgcGRmT3B0aW9ucy5jYXJkV2lkdGgsIHBkZk9wdGlvbnMuY2FyZEhlaWdodCwgXCJjYXJkI3tjYXJkSW5kZXh9XCIsIFwiU0xPV1wiIClcblxuXHRcdFx0XHRwZGYuc2F2ZSAnY2FyZF9ob2xkZXIucGRmJ1xuXHRcdFx0XHRDYXJkR2VuZXJhdG9yLnJlbmRlcmluZ1BERiA9IGZhbHNlXG5cblx0XHRcdFx0ZW5kVGltZSA9IG5ldyBEYXRlKClcblx0XHRcdFx0ZGVsdGFUaW1lU2Vjb25kcyA9ICgrZW5kVGltZSktKCtzdGFydFRpbWUpLzEwMDBcblx0XHRcdFx0Y29uc29sZS5pbmZvIFwidGltZSBzcGVuZCAjeyBkZWx0YVRpbWVTZWNvbmRzIH1cIlxuXG5cdFx0XHRcdEAkZWwuZmluZCgnI2NhcmRzR3JlZWQnKS5yZW1vdmVDbGFzcyAncHJlcGFyZS10by1wZGYnXG5cdFx0XHRcdCQoJ2JvZHknKS5maW5kKCcjb3ZlcmxheScpLnJlbW92ZUNsYXNzICdyZW5kZXJpbmctcGRmJ1xuXHRcdFx0XG5cdFx0XHRzZXRUaW1lb3V0IGRlZmZlciwgMzAwXG5cdFx0XHQjIDwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBFTkQgUkVOREVSSU5HIE9OIENMSUVOVFNJREUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XG5cblxuXG4iXX0=