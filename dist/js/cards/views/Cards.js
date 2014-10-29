(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.app.module('Cards', function(Cards) {
    return Cards.CardsView = (function(_super) {
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
        this.stopIntervalRenderer = __bind(this.stopIntervalRenderer, this);
        this.startIntervalRenderer = __bind(this.startIntervalRenderer, this);
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
        'click @ui.controlPrev': 'stepPrev'
      };

      CardsView.prototype.template = function(model) {
        return templatizer.cards.cardsGreed(this.model);
      };

      CardsView.prototype.initialize = function() {
        this.bind('all', function() {
          if (this.logging === true) {
            return console.log("CARDS COMPOSITE VIEW:\t", arguments);
          }
        });
        this.data = dataFromServer.appData;
        this.childViewContainer = '.cards';
        this.childView = Cards.CardView;
        this.state = new Backbone.Model();
        this.model = new Cards.stepForm.StepFormModel();
        return this.collection = new Cards.CardsCollection();
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
              if (!_this.intervalRendererIsStarted) {
                return _this.startIntervalRenderer();
              }
            };
          })(this));
        } else {
          return $.get("/assets/font/cardholder-icons.woff?-a7jq52", (function(_this) {
            return function() {
              console.info('cardholder-icons loaded by ajax', arguments);
              _this.changeStep(1);
              if (!_this.intervalRendererIsStarted) {
                return _this.startIntervalRenderer();
              }
            };
          })(this));
        }
      };

      CardsView.prototype.startIntervalRenderer = function(startThrough, interval) {
        var intervalRender;
        if (startThrough == null) {
          startThrough = 4000;
        }
        if (interval == null) {
          interval = 4000;
        }
        this.intervalRendererIsStarted = true;
        intervalRender = (function(_this) {
          return function() {
            _this.randomRender();
            return _this.timer = setTimeout(intervalRender, interval);
          };
        })(this);
        this.timer = setTimeout((function(_this) {
          return function() {
            return intervalRender();
          };
        })(this), startThrough);
        return this;
      };

      CardsView.prototype.stopIntervalRenderer = function() {
        this.intervalRendererIsStarted = false;
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
          delete this.timer;
        }
        return this;
      };

      CardsView.prototype.randomRender = function() {
        var availableViews, defaults, randomView;
        availableViews = this.children.filter(function(view) {
          return !view.state.get('is-locked') && !view.state.get('is-flipping') && !view.state.get('is-hovered');
        });
        if (availableViews.length > 0) {
          randomView = availableViews[app.getRandom(0, availableViews.length - 1)];
          this.previousViewCid = randomView.cid;
          defaults = randomView.model.defaults;
          return randomView.model.set('generators', randomView.model.defaults.generators);
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
            Cards.renderingPDF = true;
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
            Cards.renderingPDF = false;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzL3ZpZXdzL0NhcmRzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O21TQUFBOztBQUFBLEVBQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFYLENBQWtCLE9BQWxCLEVBQTJCLFNBQUMsS0FBRCxHQUFBO1dBQ3BCLEtBQUssQ0FBQztBQUNYLGtDQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7OztPQUFBOztBQUFBLDBCQUFBLE9BQUEsR0FBUyxLQUFULENBQUE7O0FBQUEsMEJBQ0EsT0FBQSxHQUFTLENBRFQsQ0FBQTs7QUFBQSwwQkFHQSxTQUFBLEdBQVcscUJBSFgsQ0FBQTs7QUFBQSwwQkFLQSxFQUFBLEdBQ0M7QUFBQSxRQUFBLFVBQUEsRUFBc0IsNEJBQXRCO0FBQUEsUUFDQSxXQUFBLEVBQXNCLGtDQUR0QjtBQUFBLFFBRUEsYUFBQSxFQUFzQix5Q0FGdEI7QUFBQSxRQUdBLGFBQUEsRUFBc0IseUNBSHRCO0FBQUEsUUFJQSxVQUFBLEVBQXNCLGtDQUp0QjtBQUFBLFFBS0EsYUFBQSxFQUFzQiw4Q0FMdEI7QUFBQSxRQU1BLG1CQUFBLEVBQXNCLCtDQU50QjtBQUFBLFFBT0EsYUFBQSxFQUFzQix1QkFQdEI7T0FORCxDQUFBOztBQUFBLDBCQWVBLE1BQUEsR0FDQztBQUFBLFFBQUEscUJBQUEsRUFBb0MsUUFBcEM7QUFBQSxRQUNBLGlDQUFBLEVBQW9DLHVCQURwQztBQUFBLFFBRUEsK0JBQUEsRUFBb0Msc0JBRnBDO0FBQUEsUUFHQSx1QkFBQSxFQUFvQyxVQUhwQztBQUFBLFFBSUEsdUJBQUEsRUFBb0MsVUFKcEM7T0FoQkQsQ0FBQTs7QUFBQSwwQkF1QkEsUUFBQSxHQUFVLFNBQUMsS0FBRCxHQUFBO2VBQ1QsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFsQixDQUE2QixJQUFDLENBQUEsS0FBOUIsRUFEUztNQUFBLENBdkJWLENBQUE7O0FBQUEsMEJBMEJBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDWCxRQUFB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Q0FBQyxDQUFBLE9BQUQsQ0FBQSxHQUFXLENBQUMsQ0FBQSxTQUFELENBQUEsR0FBYSxJQTdHM0MsQ0FBQTtBQUFBLFlBOEdBLE9BQU8sQ0FBQyxJQUFSLENBQWMsYUFBQSxHQUFqQixnQkFBRyxDQTlHQSxDQUFBO0FBQUEsWUFnSEEsS0FBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsYUFBVixDQUF3QixDQUFDLFdBQXpCLENBQXFDLGdCQUFyQyxDQWhIQSxDQUFBO21CQWlIQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsSUFBVixDQUFlLFVBQWYsQ0FBMEIsQ0FBQyxXQUEzQixDQUF1QyxlQUF2QyxFQWxIUTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBbkJULENBQUE7ZUF1SUEsVUFBQSxDQUFXLE1BQVgsRUFBbUIsR0FBbkIsRUF4SW1CO01BQUEsQ0E1TXBCLENBQUE7O3VCQUFBOztPQUQ2QixVQUFVLENBQUMsZUFEZjtFQUFBLENBQTNCLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRzL3ZpZXdzL0NhcmRzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93LmFwcC5tb2R1bGUgJ0NhcmRzJywgKENhcmRzKSAtPlxuXHRjbGFzcyBDYXJkcy5DYXJkc1ZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXdcblx0XHRsb2dnaW5nOiBvZmZcblx0XHRjb3VudGVyOiAwXG5cblx0XHRjbGFzc05hbWU6ICdjYXJkLWdlbmVyYXRvci12aWV3J1xuXG5cdFx0dWk6XG5cdFx0XHQnc3RlcEZvcm0nICAgICAgICAgIDogJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtJ1xuXHRcdFx0J21haW5JbnB1dCcgICAgICAgICA6ICcuc3RlcC1mb3JtLWNvbnRyb2xsZXItZm9ybS1pbnB1dCdcblx0XHRcdCdjb250cm9sTmV4dCcgICAgICAgOiAnLnN0ZXAtZm9ybS1jb250cm9sbGVyLWZvcm0tY29udHJvbC5uZXh0J1xuXHRcdFx0J2NvbnRyb2xQcmV2JyAgICAgICA6ICcuc3RlcC1mb3JtLWNvbnRyb2xsZXItZm9ybS1jb250cm9sLnByZXYnXG5cdFx0XHQncXVlc3Rpb24nICAgICAgICAgIDogJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtLWxhYmVsJ1xuXHRcdFx0J2N1cnJlbnRTdGVwJyAgICAgICA6ICcuc3RlcC1mb3JtLWNvbnRyb2xsZXItZm9ybS1zdGF0dXNiYXItY3VycmVudCdcblx0XHRcdCdxdWVzdGlvbnNRdWFudGl0eScgOiAnLnN0ZXAtZm9ybS1jb250cm9sbGVyLWZvcm0tc3RhdHVzYmFyLXF1YW50aXR5J1xuXHRcdFx0J3ByaW50QnV0dG9uJyAgICAgICA6ICcucHJpbnQtc2VsZWN0ZWQtY2FyZHMnXG5cdFx0XHRcdFx0XG5cdFx0ZXZlbnRzOiBcblx0XHRcdCdzdWJtaXQgQHVpLnN0ZXBGb3JtJyAgICAgICAgICAgICA6ICdzdWJtaXQnXG5cdFx0XHQnc2VsZWN0Mi1zZWxlY3RpbmcgQHVpLm1haW5JbnB1dCcgOiAnc2VsZWN0MkNob2lzZVNlbGVjdGVkJ1xuXHRcdFx0J3NlbGVjdDItcmVtb3ZlZCBAdWkubWFpbklucHV0JyAgIDogJ3NlbGVjdDJjaG9pc2VSZW1vdmVkJ1xuXHRcdFx0J2NsaWNrIEB1aS5jb250cm9sTmV4dCcgICAgICAgICAgIDogJ3N0ZXBOZXh0J1xuXHRcdFx0J2NsaWNrIEB1aS5jb250cm9sUHJldicgICAgICAgICAgIDogJ3N0ZXBQcmV2J1xuXHRcdFx0IyAnY2xpY2sgQHVpLnByaW50QnV0dG9uJyAgICAgICAgICAgOiAncHJpbnRTZWxlY3RlZENhcmRzJ1xuXG5cdFx0dGVtcGxhdGU6IChtb2RlbCkgLT5cblx0XHRcdHRlbXBsYXRpemVyLmNhcmRzLmNhcmRzR3JlZWQgQG1vZGVsXG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsIC0+XG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiQ0FSRFMgQ09NUE9TSVRFIFZJRVc6XFx0XCIsIGFyZ3VtZW50cyBpZiBAbG9nZ2luZyBpcyBvblxuXHRcdFx0XG5cdFx0XHRAZGF0YSA9IGRhdGFGcm9tU2VydmVyLmFwcERhdGFcblxuXHRcdFx0QGNoaWxkVmlld0NvbnRhaW5lciA9ICcuY2FyZHMnXG5cdFx0XHRAY2hpbGRWaWV3ID0gQ2FyZHMuQ2FyZFZpZXdcblx0XHRcdFxuXHRcdFx0QHN0YXRlICAgICAgPSBuZXcgQmFja2JvbmUuTW9kZWwoKVxuXHRcdFx0QG1vZGVsICAgICAgPSBuZXcgQ2FyZHMuc3RlcEZvcm0uU3RlcEZvcm1Nb2RlbCgpXG5cdFx0XHRAY29sbGVjdGlvbiA9IG5ldyBDYXJkcy5DYXJkc0NvbGxlY3Rpb24oKVxuXG5cdFx0b25TaG93OiA9PlxuXHRcdFx0QGN1cnJlbnRTdGVwID0gQG1vZGVsLmdldCAnY3VycmVudFN0ZXAnXG5cdFx0XHRAcXVlc3Rpb25zICA9IEBkYXRhLnF1ZXN0aW9uc1xuXG5cdFx0XHR3aW5kb3cub25rZXlkb3duID0gKGUpID0+XG5cdFx0XHRcdHN3aXRjaCBlLmtleUNvZGVcblx0XHRcdFx0XHR3aGVuIDM3XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0XHRcdEB1aS5jb250cm9scy5wcmV2LnRyaWdnZXIgJ2NsaWNrJ1xuXHRcdFx0XHRcdHdoZW4gMzlcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRcdFx0QHVpLmNvbnRyb2xzLm5leHQudHJpZ2dlciAnY2xpY2snXG5cblx0XHRcdEBuYW1lcyA9IFtdXG5cdFx0XHRAc3VybmFtZXMgPSBbXVxuXG5cdFx0XHRuYW1lcyA9IEBkYXRhLm5hbWVzXG5cdFx0XHRlbWFpbHMgPSBAZGF0YS5lbWFpbHNcblx0XHRcdHBob25lcyA9IGZhbHNlXG5cdFx0XHRwb3NpdGlvbnMgPSBAZGF0YS5wb3NpdGlvbnNcblx0XHRcdHF1ZXN0aW9ucyA9IEBkYXRhLnF1ZXN0aW9uc1xuXHRcdFx0c3VybmFtZXMgPSBAZGF0YS5zdXJuYW1lc1xuXG5cdFx0XHRAc3JjID0gWyBuYW1lcywgc3VybmFtZXMsIGVtYWlscywgcGhvbmVzLCBwb3NpdGlvbnNdIFxuXG5cdFx0XHQkKCBAdWkubWFpbklucHV0ICkuc2VsZWN0MlxuXHRcdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRcdHBsYWNlaG9sZGVyIDogJ9Cy0LLQtdC00LjRgtC1INC+0YLQstC10YInXG5cdFx0XHRcdGFsbG93Q2xlYXI6IHRydWVcblx0XHRcdFx0bWF4aW11bVNlbGVjdGlvblNpemU6IDJcblx0XHRcdFx0YWxsb3dDbGVhcjogdHJ1ZVxuXHRcdFx0XHRpbml0U2VsZWN0aW9uIDogKGVsZW1lbnQsIGNhbGxiYWNrKSAtPlxuXHRcdFx0XHRcdGRhdGEgPSBbXVxuXHRcdFx0XHRcdCQoZWxlbWVudC52YWwoKS5zcGxpdChcIixcIikpLmVhY2ggLT5cblx0XHRcdFx0XHRcdGRhdGEucHVzaCh7aWQ6IHRoaXMsIHRleHQ6IHRoaXN9KVxuXHRcdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdFx0Y2FsbGJhY2soZGF0YSlcblx0XHRcdFx0dGFnczogPT5cblx0XHRcdFx0XHRpZiBAY3VycmVudFN0ZXBcblx0XHRcdFx0XHRcdHJldHVybiBAc3JjW0BjdXJyZW50U3RlcC0xXSBvciBbXVxuXHRcdFx0XHRcdGVsc2UgXG5cdFx0XHRcdFx0XHRyZXR1cm4gW11cblx0XHRcdFx0bXVsdGlwbGU6IHRydWVcblxuXHRcdFx0XHRcdFx0IyB3YWl0IGZvdCBjb21tb24gY3VzdG9tIGZvbnRzXG5cdFx0XHRpZiBkb2N1bWVudC5mb250cyB0aGVuIGRvY3VtZW50LmZvbnRzLmxvYWQoXCIxMHB4IGNhcmRob2xkZXItaWNvbnNcIikudGhlbiA9PiBcblx0XHRcdFx0Y29uc29sZS5pbmZvICdjYXJkaG9sZGVyLWljb25zIGxvYWRlZCBieSBkb2N1bWVudC5mb250cy5sb2FkJywgYXJndW1lbnRzXG5cdFx0XHRcdEBjaGFuZ2VTdGVwKDEpXG5cdFxuXHRcdFx0XHRAc3RhcnRJbnRlcnZhbFJlbmRlcmVyKCkgdW5sZXNzIEBpbnRlcnZhbFJlbmRlcmVySXNTdGFydGVkXG5cblx0XHRcdGVsc2UgJC5nZXQgXCIvYXNzZXRzL2ZvbnQvY2FyZGhvbGRlci1pY29ucy53b2ZmPy1hN2pxNTJcIiwgPT4gXG5cdFx0XHRcdGNvbnNvbGUuaW5mbyAnY2FyZGhvbGRlci1pY29ucyBsb2FkZWQgYnkgYWpheCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRAY2hhbmdlU3RlcCgxKVxuXHRcblx0XHRcdFx0QHN0YXJ0SW50ZXJ2YWxSZW5kZXJlcigpIHVubGVzcyBAaW50ZXJ2YWxSZW5kZXJlcklzU3RhcnRlZFxuXG5cdFx0c3RhcnRJbnRlcnZhbFJlbmRlcmVyOiAoIHN0YXJ0VGhyb3VnaD00MDAwLCBpbnRlcnZhbD00MDAwICkgPT5cblx0XHRcdEBpbnRlcnZhbFJlbmRlcmVySXNTdGFydGVkID0gdHJ1ZVxuXG5cdFx0XHRpbnRlcnZhbFJlbmRlciA9ID0+XG5cdFx0XHRcdEByYW5kb21SZW5kZXIoKVxuXHRcdFx0XHRAdGltZXIgPSBzZXRUaW1lb3V0IGludGVydmFsUmVuZGVyLCBpbnRlcnZhbFxuXG5cdFx0XHRAdGltZXIgPSAgc2V0VGltZW91dCA9PlxuXHRcdFx0XHRpbnRlcnZhbFJlbmRlcigpXG5cdFx0XHQsIHN0YXJ0VGhyb3VnaFxuXHRcdFx0QFxuXG5cdFx0c3RvcEludGVydmFsUmVuZGVyZXI6ID0+XG5cdFx0XHRAaW50ZXJ2YWxSZW5kZXJlcklzU3RhcnRlZCA9IGZhbHNlXG5cdFx0XHRpZiBAdGltZXJcblx0XHRcdFx0Y2xlYXJUaW1lb3V0IEB0aW1lclxuXHRcdFx0XHRAdGltZXIgPSBudWxsXG5cdFx0XHRcdGRlbGV0ZSBAdGltZXJcblx0XHRcdEBcblxuXHRcdHJhbmRvbVJlbmRlcjogPT5cblx0XHRcdGF2YWlsYWJsZVZpZXdzID0gQGNoaWxkcmVuLmZpbHRlciAodmlldykgLT5cblx0XHRcdFx0cmV0dXJuIG5vdCB2aWV3LnN0YXRlLmdldCgnaXMtbG9ja2VkJykgYW5kIG5vdCB2aWV3LnN0YXRlLmdldCgnaXMtZmxpcHBpbmcnKSBhbmQgbm90IHZpZXcuc3RhdGUuZ2V0KCdpcy1ob3ZlcmVkJylcblxuXHRcdFx0aWYgYXZhaWxhYmxlVmlld3MubGVuZ3RoID4gMFxuXG5cdFx0XHRcdHJhbmRvbVZpZXcgPSBhdmFpbGFibGVWaWV3c1sgYXBwLmdldFJhbmRvbSgwLCBhdmFpbGFibGVWaWV3cy5sZW5ndGgtMSkgXVxuXG5cdFx0XHRcdEBwcmV2aW91c1ZpZXdDaWQgPSByYW5kb21WaWV3LmNpZFxuXHRcdFx0XHRkZWZhdWx0cyA9IHJhbmRvbVZpZXcubW9kZWwuZGVmYXVsdHNcblxuXHRcdFx0XHRyYW5kb21WaWV3Lm1vZGVsLnNldCAnZ2VuZXJhdG9ycycsIHJhbmRvbVZpZXcubW9kZWwuZGVmYXVsdHMuZ2VuZXJhdG9yc1xuXG5cdFx0Y2hhbmdlU3RlcCA6IChzdGVwKSA9PlxuXHRcdFx0QGN1cnJlbnRTdGVwID0gc3RlcFxuXHRcdFx0QG1vZGVsLnNldCAnZm9ybVN0ZXAnLCBzdGVwXG5cdFx0XHRAdWkuY3VycmVudFN0ZXAudGV4dChAY3VycmVudFN0ZXArJyAnKVxuXHRcdFx0QHVpLnF1ZXN0aW9uc1F1YW50aXR5LnRleHQoQHF1ZXN0aW9ucy5sZW5ndGgpXG5cdFx0XHRAdWkucXVlc3Rpb24udGV4dChAcXVlc3Rpb25zW0BjdXJyZW50U3RlcC0xXSlcblxuXHRcdHN1Ym1pdDogKGUpID0+XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdGZvcm1WYWwgPSBAJCgnLnN0ZXAtZm9ybS1jb250cm9sbGVyLWZvcm0tc3RhdHVzYmFyLXZhbHVlJylcblx0XHRcdHF1ZXN0aW9uTnVtID0gQGN1cnJlbnRTdGVwXG5cdFx0XHRxdWVzdGlvbk51bSsrXG5cdFx0XHRmb3JtVmFsLndpZHRoICgxMDAvIEBxdWVzdGlvbnMubGVuZ3RoICogKHF1ZXN0aW9uTnVtLTEpICsgJyUnKVxuXHRcdFx0QHVpLm1haW5JbnB1dC5zZWxlY3QyKCd2YWwnLCcnKVxuXHRcdFx0aWYgcXVlc3Rpb25OdW0gaXMgQHF1ZXN0aW9ucy5sZW5ndGgrMVxuXG5cdFx0XHRcdGNvbnNvbGUuaW5mbygnVGhlIHF1ZXN0aW9ucyBpcyBvdmVyIScpXG5cdFx0XHRcdEB1aS5xdWVzdGlvbi50ZXh0KCfQktC+0L/RgNC+0YHRiyDQutC+0L3Rh9C40LvQuNGB0YwhJylcblx0XHRcdFx0QGNvbXBsZXRlZD10cnVlXG5cdFx0XHRcdEB1aS5tYWluSW5wdXQuc2VsZWN0MiAndmFsJywnJ1xuXHRcdFx0XHRAdWkubWFpbklucHV0LnNlbGVjdDIgJ2VuYWJsZScsIGZhbHNlXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAdWkubWFpbklucHV0LnNlbGVjdDIgJ2VuYWJsZScsIHRydWVcblx0XHRcdFx0QGNoYW5nZVN0ZXAocXVlc3Rpb25OdW0pXG5cblx0XHRzdGVwTmV4dCA6ID0+XG5cdFx0XHRpZiBAY3VycmVudFN0ZXAgPD0gQHF1ZXN0aW9ucy5sZW5ndGhcblx0XHRcdFx0QHVpLnN0ZXBGb3JtLnRyaWdnZXIgJ3N1Ym1pdCdcblxuXHRcdHN0ZXBQcmV2IDogPT5cblx0XHRcdGlmIEBjdXJyZW50U3RlcCA+IDFcblx0XHRcdFx0QGN1cnJlbnRTdGVwID0gQGN1cnJlbnRTdGVwLTJcblx0XHRcdFx0QHVpLnN0ZXBGb3JtLnRyaWdnZXIgJ3N1Ym1pdCdcblxuXHRcdHNlbGVjdDJDaG9pc2VTZWxlY3RlZDogKGUpID0+IFxuXHRcdFx0c3dpdGNoIEBjdXJyZW50U3RlcFxuXHRcdFx0XHR3aGVuIDFcblx0XHRcdFx0XHRjb25zb2xlLmxvZyBcInN0ZXA6IDFcIixlLm9iamVjdC5zZXhcblx0XHRcdFx0XHRAY29sbGVjdGlvbi5lYWNoIChtb2RlbCxpKSAtPlxuXHRcdFx0XHRcdFx0aWYgIW1vZGVsLmdldCgnaXMtbG9ja2VkJykgb3IgbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpcyBub3QgdHJ1ZVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEubmFtZScsZS5vYmplY3QudGV4dClcblx0XHRcdFx0XHRcdFx0bW9kZWwuc2V0KCdkYXRhLnNleCcsZS5vYmplY3Quc2V4KVxuXHRcdFx0XHR3aGVuIDJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyBcInN0ZXA6IDJcIlxuXHRcdFx0XHRcdEBjb2xsZWN0aW9uLmVhY2ggKG1vZGVsLGkpIC0+XG5cdFx0XHRcdFx0XHRpZiAhbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBvciBtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIGlzIG5vdCB0cnVlXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnZGF0YS5zdXJuYW1lJyxlLm9iamVjdC50ZXh0KVxuXHRcdFx0XHR3aGVuIDNcblx0XHRcdFx0XHRjb25zb2xlLmxvZyBcInN0ZXA6IDNcIlxuXHRcdFx0XHRcdEBjb2xsZWN0aW9uLmVhY2ggKG1vZGVsLGkpIC0+XG5cdFx0XHRcdFx0XHRpZiAhbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBvciBtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIGlzIG5vdCB0cnVlXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnZGF0YS5lTWFpbCcsZS5vYmplY3QudGV4dClcblx0XHRcdFx0d2hlbiA0XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJzdGVwOiA0XCJcblx0XHRcdFx0XHRAY29sbGVjdGlvbi5lYWNoIChtb2RlbCxpKSAtPlxuXHRcdFx0XHRcdFx0aWYgIW1vZGVsLmdldCgnaXMtbG9ja2VkJykgb3IgbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpcyBub3QgdHJ1ZVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEucGhvbmUnLGUub2JqZWN0LnRleHQpXG5cdFx0XHRcdHdoZW4gNVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwic3RlcDogNVwiXG5cdFx0XHRcdFx0QGNvbGxlY3Rpb24uZWFjaCAobW9kZWwsaSkgLT5cblx0XHRcdFx0XHRcdGlmICFtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIG9yIG1vZGVsLmdldCgnaXMtbG9ja2VkJykgaXMgbm90IHRydWVcblx0XHRcdFx0XHRcdFx0bW9kZWwuc2V0KCdkYXRhLnBvc2l0aW9uJyxlLm9iamVjdC50ZXh0KVxuXG5cdFx0c2VsZWN0MmNob2lzZVJlbW92ZWQ6IChlKSA9PlxuXHRcdFx0aWYgZS5jaG9pY2UudGV4dCBpcyBAbmFtZXNbMF1cblx0XHRcdFx0QG5hbWVzLnNoaWZ0KClcblxuXHRcdFx0aWYgZS5jaG9pY2UudGV4dCBpcyBAbmFtZXNbMV1cblx0XHRcdFx0QG5hbWVzLnBvcCgpXG5cdFx0XHRpZiBAY3VycmVudFN0ZXAgaXMgMVxuXHRcdFx0XHRAbmFtZXMgPSBbXVxuXHRcdFx0aWYgQGN1cnJlbnRTdGVwIGlzIDJcblx0XHRcdFx0QHN1cm5hbWVzID0gW11cblxuXHRcdHByaW50U2VsZWN0ZWRDYXJkczogPT5cblx0XHRcdCQoJ2JvZHknKS5maW5kKCcjb3ZlcmxheScpLmFkZENsYXNzICdyZW5kZXJpbmctcGRmJ1xuXG5cdFx0XHQjIDwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBSRU5ERVJJTkcgT04gU0VSVkVSU0lERSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cblxuXHRcdFx0IyBjYXJkID0gQGNoaWxkcmVuLmZpbmRCeUluZGV4KDApLiRlbFxuXHRcdFx0IyBpZiBjYXJkLiRlbC5oYXNDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0IyBcdCBkYXRhSW1nID0gY2FyZC4kZWwuZmluZCgnLmNhcmQtY2FudmFzLmZyb250JylbMF0udG9EYXRhVVJMKClcblx0XHRcdCMgZWxzZVxuXHRcdFx0IyBcdGRhdGFJbWcgPSBjYXJkLiRlbC5maW5kKCcuY2FyZC1jYW52YXMuYmFjaycpWzBdLnRvRGF0YVVSTCgpXG5cdFx0XHQjIGNvbnNvbGUubG9nIGRhdGFJbWdcblx0XHRcdCMgJC5wb3N0KCcvcGRmLWdlbmVyYXRvcicsIGRhdGE6IGRhdGFJbWcpXG5cblx0XHRcdCMkKCdib2R5JykuZmluZCgnI292ZXJsYXknKS5yZW1vdmVDbGFzcyAncmVuZGVyaW5nLXBkZidcblxuXHRcdFx0IyA8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRU5EIFJFTkRFUklORyBPTiBTRVJWRVJTSURFIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxuXG5cblxuXHRcdFx0IyA8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRU5EIFJFTkRFUklORyBPTiBDTElFTlRTSURFIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxuXHRcdFx0ZGVmZmVyID0gPT5cblx0XHRcdFx0c3RhcnRUaW1lID0gbmV3IERhdGUoKVxuXHRcdFx0XHQjIFRPRE8gY2FsY3VsYXRlIHByb3BlciBtbSB3aXRoIG1lYXp1cmVtZW50IG9mIERQSSBsaWtlIHRoaXM6IFxuXHRcdFx0XHQjICsoIGFwcC5nZXRVbml0cygkKCdjYW52YXMnKVswXSwnd2lkdGgnKS5jbSoxMCApLnRvRml4ZWQoKVxuXG5cdFx0XHRcdHBkZk9wdGlvbnMgPVxuXHRcdFx0XHRcdHBkZldpZHRoOiAgMzE5Ljg5NDBcblx0XHRcdFx0XHRwZGZIZWlnaHQ6ICA0NTBcblx0XHRcdFx0XHRtYXJnaW46XG5cdFx0XHRcdFx0XHR0b3A6IDguOTE4OTE4OTE4OTE4OTJcblx0XHRcdFx0XHRcdGxlZnQ6IDE4LjY2NjY2NjU2XG5cdFx0XHRcdFx0XHRib3R0b206IDguOTE4OTE4OTE4OTE4OTJcblx0XHRcdFx0XHRcdHJpZ2h0OiAxOC42NjY2NjY1NlxuXHRcdFx0XHRcdGNhcmRXaWR0aDogOTRcblx0XHRcdFx0XHRjYXJkSGVpZ2h0OiA1NFxuXG5cdFx0XHRcdFx0Y2FyZFBlckxpbmU6IDNcblx0XHRcdFx0XHRsaW5lc0NvdW50ZXI6IDBcblxuXHRcdFx0XHRwZGYgPSBuZXcganNQREYoJ3AnLCdtbScsIFsgcGRmT3B0aW9ucy5wZGZXaWR0aCwgcGRmT3B0aW9ucy5wZGZIZWlnaHQgXSApXG5cblx0XHRcdFx0Q2FyZHMucmVuZGVyaW5nUERGID0gdHJ1ZVxuXHRcdFx0XHRAJGVsLmZpbmQoJyNjYXJkc0dyZWVkJykuYWRkQ2xhc3MgJ3ByZXBhcmUtdG8tcGRmJ1xuXHRcdFx0XHRhcHAudHJpZ2dlciAncmVzaXplJ1xuXG5cblx0XHRcdFx0c2VsZWN0ZWRDYXJkcyA9IEBjaGlsZHJlbi5maWx0ZXIgKHZpZXcpIC0+XG5cdFx0XHRcdFx0dmlldy5tb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIGlzIHRydWVcblxuXHRcdFx0XHRjYXJkc0NvdW50ZXIgPSBzZWxlY3RlZENhcmRzLmxlbmd0aFxuXG5cdFx0XHRcdCMgQUREIExJTkVTXG5cdFx0XHRcdGxpbmVzID0gXG5cdFx0XHRcdFx0VlQ6XHQjIHZlcnRpY2FsIC0gdG9wXG5cdFx0XHRcdFx0XHR4MDoyMC41XG5cdFx0XHRcdFx0XHR5MDo0Ljdcblx0XHRcdFx0XHRcdHgxOjIwLjVcblx0XHRcdFx0XHRcdHkxOjguN1xuXG5cdFx0XHRcdFx0VkI6XHQjdmFydGljYWwgLSBib3R0b21cblx0XHRcdFx0XHRcdHgwOjIwLjVcblx0XHRcdFx0XHRcdHkwOjQ0MVxuXHRcdFx0XHRcdFx0eDE6MjAuNVxuXHRcdFx0XHRcdFx0eTE6NDQ1XG5cblx0XHRcdFx0XHRITDpcdCNob3Jpem9udGFsIC0gbGVmdFxuXHRcdFx0XHRcdFx0eDA6MTUgXG5cdFx0XHRcdFx0XHR5MDoxMC42XG5cdFx0XHRcdFx0XHR4MToxOVxuXHRcdFx0XHRcdFx0eTE6MTAuNlxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdEhSOiAjaG9yaXpvbnRhbCAtIHJpZ2h0XG5cdFx0XHRcdFx0XHR4MDogMzAxLjIyNzMzMzQ0XG5cdFx0XHRcdFx0XHR5MDogMTAuNlxuXHRcdFx0XHRcdFx0eDE6IDMwNS4yMjczMzM0NFxuXHRcdFx0XHRcdFx0eTE6IDEwLjZcblxuXHRcdFx0XHRkcmF3TGluZXMgPSAoc3RhcnRMaW5lLCBsaW5lVHlwZSwgbnVtLCBldmVuRW5jcmVtZW50LCBvZGRFbmNyZW1lbnQpIC0+XG5cdFx0XHRcdFx0Zm9yIGkgaW4gWzAuLi5udW1dXG5cdFx0XHRcdFx0XHRwZGYubGluZSBzdGFydExpbmUueDAsIHN0YXJ0TGluZS55MCwgc3RhcnRMaW5lLngxLCBzdGFydExpbmUueTFcblxuXHRcdFx0XHRcdFx0c3dpdGNoIGxpbmVUeXBlXG5cdFx0XHRcdFx0XHRcdHdoZW4gJ2gnICNob3Jpem9udGFsXG5cdFx0XHRcdFx0XHRcdFx0dW5sZXNzIGklMiAjIGV2ZW5cblx0XHRcdFx0XHRcdFx0XHRcdHN0YXJ0TGluZS55MCs9IGV2ZW5FbmNyZW1lbnRcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXJ0TGluZS55MSs9IGV2ZW5FbmNyZW1lbnRcblx0XHRcdFx0XHRcdFx0XHRlbHNlICMgb2RkXG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydExpbmUueTArPSBvZGRFbmNyZW1lbnRcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXJ0TGluZS55MSs9IG9kZEVuY3JlbWVudFxuXG5cdFx0XHRcdFx0XHRcdHdoZW4gJ3YnICN2ZXJ0aWNhbFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdHVubGVzcyBpJTIgIyBldmVuXG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydExpbmUueDArPSBldmVuRW5jcmVtZW50XG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydExpbmUueDErPSBldmVuRW5jcmVtZW50XG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSAjIG9kZFxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhcnRMaW5lLngwKz0gb2RkRW5jcmVtZW50XG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydExpbmUueDErPSBvZGRFbmNyZW1lbnRcblx0XHRcdFx0XG5cdFx0XHRcdGRyYXdMaW5lcyBsaW5lcy5WVCwgJ3YnLCA2LCA5MCwgNFxuXHRcdFx0XHRkcmF3TGluZXMgbGluZXMuVkIsICd2JywgNiwgOTAsIDRcblx0XHRcdFx0ZHJhd0xpbmVzIGxpbmVzLkhMLCAnaCcsIDE2LCA1MCwgNFxuXHRcdFx0XHRkcmF3TGluZXMgbGluZXMuSFIsICdoJywgMTYsIDUwLCA0XG5cblxuXHRcdFx0XHQjIEFERCBDQVJEIElNQUdFU1xuXHRcdFx0XHRvbkxpbmVDb3VudGVyID0gMFxuXHRcdFx0XHRmb3IgaSBpbiBbMC4uLjI0XVxuXHRcdFx0XHRcdGNhcmRJbmRleCA9IGklc2VsZWN0ZWRDYXJkcy5sZW5ndGhcblx0XHRcdFx0XHRjYXJkID0gc2VsZWN0ZWRDYXJkc1tjYXJkSW5kZXhdXG5cblx0XHRcdFx0XHRpZiBub3QgY2FyZC4kZWwuaGFzQ2xhc3MgJ2ZsaXBlZCdcblx0XHRcdFx0XHRcdCBjYXJkQ2FudmFzID0gY2FyZC4kZWwuZmluZCgnLmNhcmQtY2FudmFzLmZyb250JylbMF1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRjYXJkQ2FudmFzID0gY2FyZC4kZWwuZmluZCgnLmNhcmQtY2FudmFzLmJhY2snKVswXVxuXHRcdFx0XHRcdGltZ0RhdGEgPSBjYXJkQ2FudmFzLnRvRGF0YVVSTCgpXG5cblx0XHRcdFx0XHRuZXdMaW5lQ291bnRlciA9IE1hdGguZmxvb3IoaS9wZGZPcHRpb25zLmNhcmRQZXJMaW5lKVxuXHRcdFx0XHRcdGlmIG5ld0xpbmVDb3VudGVyID4gcGRmT3B0aW9ucy5saW5lc0NvdW50ZXJcblx0XHRcdFx0XHRcdHBkZk9wdGlvbnMubGluZXNDb3VudGVyKytcblx0XHRcdFx0XHRcdG9uTGluZUNvdW50ZXIgPSAwXG5cblx0XHRcdFx0XHR4ID0gKHBkZk9wdGlvbnMuY2FyZFdpZHRoKm9uTGluZUNvdW50ZXIrKykrcGRmT3B0aW9ucy5tYXJnaW4ubGVmdFxuXHRcdFx0XHRcdHkgPSAocGRmT3B0aW9ucy5jYXJkSGVpZ2h0KnBkZk9wdGlvbnMubGluZXNDb3VudGVyKStwZGZPcHRpb25zLm1hcmdpbi50b3BcblxuXHRcdFx0XHRcdHBkZi5hZGRJbWFnZShpbWdEYXRhICwgJ0pQRUcnLCB4LCB5LCBwZGZPcHRpb25zLmNhcmRXaWR0aCwgcGRmT3B0aW9ucy5jYXJkSGVpZ2h0LCBcImNhcmQje2NhcmRJbmRleH1cIiwgXCJTTE9XXCIgKVxuXG5cdFx0XHRcdHBkZi5zYXZlICdjYXJkX2hvbGRlci5wZGYnXG5cdFx0XHRcdENhcmRzLnJlbmRlcmluZ1BERiA9IGZhbHNlXG5cblx0XHRcdFx0ZW5kVGltZSA9IG5ldyBEYXRlKClcblx0XHRcdFx0ZGVsdGFUaW1lU2Vjb25kcyA9ICgrZW5kVGltZSktKCtzdGFydFRpbWUpLzEwMDBcblx0XHRcdFx0Y29uc29sZS5pbmZvIFwidGltZSBzcGVuZCAjeyBkZWx0YVRpbWVTZWNvbmRzIH1cIlxuXG5cdFx0XHRcdEAkZWwuZmluZCgnI2NhcmRzR3JlZWQnKS5yZW1vdmVDbGFzcyAncHJlcGFyZS10by1wZGYnXG5cdFx0XHRcdCQoJ2JvZHknKS5maW5kKCcjb3ZlcmxheScpLnJlbW92ZUNsYXNzICdyZW5kZXJpbmctcGRmJ1xuXHRcdFx0XG5cdFx0XHRzZXRUaW1lb3V0IGRlZmZlciwgMzAwXG5cdFx0XHQjIDwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBFTkQgUkVOREVSSU5HIE9OIENMSUVOVFNJREUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XG5cblxuXG4iXX0=