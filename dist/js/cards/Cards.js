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

//# sourceMappingURL=data:application/json;base64,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QUFBLE9BQUQsQ0FBQSxHQUFXLENBQUMsQ0FBQSxTQUFELENBQUEsR0FBYSxJQTdHM0MsQ0FBQTtBQUFBLFlBOEdBLE9BQU8sQ0FBQyxJQUFSLENBQWMsYUFBQSxHQUFqQixnQkFBRyxDQTlHQSxDQUFBO0FBQUEsWUFnSEEsS0FBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsYUFBVixDQUF3QixDQUFDLFdBQXpCLENBQXFDLGdCQUFyQyxDQWhIQSxDQUFBO21CQWlIQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsSUFBVixDQUFlLFVBQWYsQ0FBMEIsQ0FBQyxXQUEzQixDQUF1QyxlQUF2QyxFQWxIUTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBbkJULENBQUE7ZUF1SUEsVUFBQSxDQUFXLE1BQVgsRUFBbUIsR0FBbkIsRUF4SW1CO01BQUEsQ0E3TXBCLENBQUE7O3VCQUFBOztPQUQ2QixVQUFVLENBQUMsZUFEZjtFQUFBLENBQTNCLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRzL0NhcmRzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93LmFwcC5tb2R1bGUgJ0NhcmRzJywgKENhcmRzKSAtPlxuXHRjbGFzcyBDYXJkcy5DYXJkc1ZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXdcblx0XHRsb2dnaW5nOiBvZmZcblx0XHRjb3VudGVyOiAwXG5cblx0XHRjbGFzc05hbWU6ICdjYXJkLWdlbmVyYXRvci12aWV3J1xuXG5cdFx0dWk6XG5cdFx0XHQnc3RlcEZvcm0nICAgICAgICAgIDogJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtJ1xuXHRcdFx0J21haW5JbnB1dCcgICAgICAgICA6ICcuc3RlcC1mb3JtLWNvbnRyb2xsZXItZm9ybS1pbnB1dCdcblx0XHRcdCdjb250cm9sTmV4dCcgICAgICAgOiAnLnN0ZXAtZm9ybS1jb250cm9sbGVyLWZvcm0tY29udHJvbC5uZXh0J1xuXHRcdFx0J2NvbnRyb2xQcmV2JyAgICAgICA6ICcuc3RlcC1mb3JtLWNvbnRyb2xsZXItZm9ybS1jb250cm9sLnByZXYnXG5cdFx0XHQncXVlc3Rpb24nICAgICAgICAgIDogJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtLWxhYmVsJ1xuXHRcdFx0J2N1cnJlbnRTdGVwJyAgICAgICA6ICcuc3RlcC1mb3JtLWNvbnRyb2xsZXItZm9ybS1zdGF0dXNiYXItY3VycmVudCdcblx0XHRcdCdxdWVzdGlvbnNRdWFudGl0eScgOiAnLnN0ZXAtZm9ybS1jb250cm9sbGVyLWZvcm0tc3RhdHVzYmFyLXF1YW50aXR5J1xuXHRcdFx0J3ByaW50QnV0dG9uJyAgICAgICA6ICcucHJpbnQtc2VsZWN0ZWQtY2FyZHMnXG5cdFx0XHRcdFx0XG5cdFx0ZXZlbnRzOiBcblx0XHRcdCdzdWJtaXQgQHVpLnN0ZXBGb3JtJyAgICAgICAgICAgICA6ICdzdWJtaXQnXG5cdFx0XHQnc2VsZWN0Mi1zZWxlY3RpbmcgQHVpLm1haW5JbnB1dCcgOiAnc2VsZWN0MkNob2lzZVNlbGVjdGVkJ1xuXHRcdFx0J3NlbGVjdDItcmVtb3ZlZCBAdWkubWFpbklucHV0JyAgIDogJ3NlbGVjdDJjaG9pc2VSZW1vdmVkJ1xuXHRcdFx0J2NsaWNrIEB1aS5jb250cm9sTmV4dCcgICAgICAgICAgIDogJ3N0ZXBOZXh0J1xuXHRcdFx0J2NsaWNrIEB1aS5jb250cm9sUHJldicgICAgICAgICAgIDogJ3N0ZXBQcmV2J1xuXHRcdFx0IyAnY2xpY2sgQHVpLnByaW50QnV0dG9uJyAgICAgICAgICAgOiAncHJpbnRTZWxlY3RlZENhcmRzJ1xuXG5cdFx0dGVtcGxhdGU6IChtb2RlbCkgLT5cblx0XHRcdHRlbXBsYXRpemVyLmNhcmRzLmNhcmRzR3JlZWQgQG1vZGVsXG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsIC0+XG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiQ0FSRFMgQ09NUE9TSVRFIFZJRVc6XFx0XCIsIGFyZ3VtZW50cyBpZiBAbG9nZ2luZyBpcyBvblxuXHRcdFx0XG5cdFx0XHRAZGF0YSA9IGRhdGFGcm9tU2VydmVyLmFwcERhdGFcblxuXHRcdFx0QGNoaWxkVmlld0NvbnRhaW5lciA9ICcuY2FyZHMnXG5cdFx0XHRAY2hpbGRWaWV3ID0gQ2FyZHMuQ2FyZFZpZXdcblx0XHRcdFxuXHRcdFx0QHN0YXRlICAgICAgPSBuZXcgQmFja2JvbmUuTW9kZWwoKVxuXHRcdFx0QG1vZGVsICAgICAgPSBuZXcgQ2FyZHMuc3RlcEZvcm0uU3RlcEZvcm1Nb2RlbCgpXG5cdFx0XHRAY29sbGVjdGlvbiA9IG5ldyBDYXJkcy5DYXJkc0NvbGxlY3Rpb24oKVxuXG5cdFx0b25TaG93OiA9PlxuXHRcdFx0QGN1cnJlbnRTdGVwID0gQG1vZGVsLmdldCAnY3VycmVudFN0ZXAnXG5cdFx0XHRAcXVlc3Rpb25zICA9IEBkYXRhLnF1ZXN0aW9uc1xuXG5cdFx0XHR3aW5kb3cub25rZXlkb3duID0gKGUpID0+XG5cdFx0XHRcdHN3aXRjaCBlLmtleUNvZGVcblx0XHRcdFx0XHR3aGVuIDM3XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0XHRcdEB1aS5jb250cm9scy5wcmV2LnRyaWdnZXIgJ2NsaWNrJ1xuXHRcdFx0XHRcdHdoZW4gMzlcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRcdFx0QHVpLmNvbnRyb2xzLm5leHQudHJpZ2dlciAnY2xpY2snXG5cblx0XHRcdEBuYW1lcyA9IFtdXG5cdFx0XHRAc3VybmFtZXMgPSBbXVxuXG5cdFx0XHRuYW1lcyA9IEBkYXRhLm5hbWVzXG5cdFx0XHRlbWFpbHMgPSBAZGF0YS5lbWFpbHNcblx0XHRcdHBob25lcyA9IGZhbHNlXG5cdFx0XHRwb3NpdGlvbnMgPSBAZGF0YS5wb3NpdGlvbnNcblx0XHRcdHF1ZXN0aW9ucyA9IEBkYXRhLnF1ZXN0aW9uc1xuXHRcdFx0c3VybmFtZXMgPSBAZGF0YS5zdXJuYW1lc1xuXG5cdFx0XHRAc3JjID0gWyBuYW1lcywgc3VybmFtZXMsIGVtYWlscywgcGhvbmVzLCBwb3NpdGlvbnNdIFxuXG5cdFx0XHQkKCBAdWkubWFpbklucHV0ICkuc2VsZWN0MlxuXHRcdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRcdHBsYWNlaG9sZGVyIDogJ9Cy0LLQtdC00LjRgtC1INC+0YLQstC10YInXG5cdFx0XHRcdGFsbG93Q2xlYXI6IHRydWVcblx0XHRcdFx0bWF4aW11bVNlbGVjdGlvblNpemU6IDJcblx0XHRcdFx0YWxsb3dDbGVhcjogdHJ1ZVxuXHRcdFx0XHRpbml0U2VsZWN0aW9uIDogKGVsZW1lbnQsIGNhbGxiYWNrKSAtPlxuXHRcdFx0XHRcdGRhdGEgPSBbXVxuXHRcdFx0XHRcdCQoZWxlbWVudC52YWwoKS5zcGxpdChcIixcIikpLmVhY2ggLT5cblx0XHRcdFx0XHRcdGRhdGEucHVzaCh7aWQ6IHRoaXMsIHRleHQ6IHRoaXN9KVxuXHRcdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdFx0Y2FsbGJhY2soZGF0YSlcblx0XHRcdFx0dGFnczogPT5cblx0XHRcdFx0XHRpZiBAY3VycmVudFN0ZXBcblx0XHRcdFx0XHRcdHJldHVybiBAc3JjW0BjdXJyZW50U3RlcC0xXSBvciBbXVxuXHRcdFx0XHRcdGVsc2UgXG5cdFx0XHRcdFx0XHRyZXR1cm4gW11cblx0XHRcdFx0bXVsdGlwbGU6IHRydWVcblxuXHRcdFx0XHRcdFx0IyB3YWl0IGZvdCBjb21tb24gY3VzdG9tIGZvbnRzXG5cdFx0XHRpZiBkb2N1bWVudC5mb250cyB0aGVuIGRvY3VtZW50LmZvbnRzLmxvYWQoXCIxMHB4IGNhcmRob2xkZXItaWNvbnNcIikudGhlbiA9PiBcblx0XHRcdFx0Y29uc29sZS5pbmZvICdjYXJkaG9sZGVyLWljb25zIGxvYWRlZCBieSBkb2N1bWVudC5mb250cy5sb2FkJywgYXJndW1lbnRzXG5cdFx0XHRcdEBjaGFuZ2VTdGVwKDEpXG5cdFxuXHRcdFx0XHRAc3RhcnRJbnRlcnZhbFJlbmRlcmVyKCkgdW5sZXNzIEBpbnRlcnZhbFJlbmRlcmVySXNTdGFydGVkXG5cblx0XHRcdGVsc2UgJC5nZXQgXCIvYXNzZXRzL2ZvbnQvY2FyZGhvbGRlci1pY29ucy53b2ZmPy1hN2pxNTJcIiwgPT4gXG5cdFx0XHRcdGNvbnNvbGUuaW5mbyAnY2FyZGhvbGRlci1pY29ucyBsb2FkZWQgYnkgYWpheCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRAY2hhbmdlU3RlcCgxKVxuXHRcblx0XHRcdFx0QHN0YXJ0SW50ZXJ2YWxSZW5kZXJlcigpIHVubGVzcyBAaW50ZXJ2YWxSZW5kZXJlcklzU3RhcnRlZFxuXG5cblx0XHRzdGFydEludGVydmFsUmVuZGVyZXI6ICggc3RhcnRUaHJvdWdoPTQwMDAsIGludGVydmFsPTQwMDAgKSA9PlxuXHRcdFx0QGludGVydmFsUmVuZGVyZXJJc1N0YXJ0ZWQgPSB0cnVlXG5cblx0XHRcdGludGVydmFsUmVuZGVyID0gPT5cblx0XHRcdFx0QHJhbmRvbVJlbmRlcigpXG5cdFx0XHRcdEB0aW1lciA9IHNldFRpbWVvdXQgaW50ZXJ2YWxSZW5kZXIsIGludGVydmFsXG5cblx0XHRcdEB0aW1lciA9ICBzZXRUaW1lb3V0ID0+XG5cdFx0XHRcdGludGVydmFsUmVuZGVyKClcblx0XHRcdCwgc3RhcnRUaHJvdWdoXG5cdFx0XHRAXG5cblx0XHRzdG9wSW50ZXJ2YWxSZW5kZXJlcjogPT5cblx0XHRcdEBpbnRlcnZhbFJlbmRlcmVySXNTdGFydGVkID0gZmFsc2Vcblx0XHRcdGlmIEB0aW1lclxuXHRcdFx0XHRjbGVhclRpbWVvdXQgQHRpbWVyXG5cdFx0XHRcdEB0aW1lciA9IG51bGxcblx0XHRcdFx0ZGVsZXRlIEB0aW1lclxuXHRcdFx0QFxuXG5cdFx0cmFuZG9tUmVuZGVyOiA9PlxuXHRcdFx0YXZhaWxhYmxlVmlld3MgPSBAY2hpbGRyZW4uZmlsdGVyICh2aWV3KSAtPlxuXHRcdFx0XHRyZXR1cm4gbm90IHZpZXcuc3RhdGUuZ2V0KCdpcy1sb2NrZWQnKSBhbmQgbm90IHZpZXcuc3RhdGUuZ2V0KCdpcy1mbGlwcGluZycpIGFuZCBub3Qgdmlldy5zdGF0ZS5nZXQoJ2lzLWhvdmVyZWQnKVxuXG5cdFx0XHRpZiBhdmFpbGFibGVWaWV3cy5sZW5ndGggPiAwXG5cblx0XHRcdFx0cmFuZG9tVmlldyA9IGF2YWlsYWJsZVZpZXdzWyBhcHAuZ2V0UmFuZG9tKDAsIGF2YWlsYWJsZVZpZXdzLmxlbmd0aC0xKSBdXG5cblx0XHRcdFx0QHByZXZpb3VzVmlld0NpZCA9IHJhbmRvbVZpZXcuY2lkXG5cdFx0XHRcdGRlZmF1bHRzID0gcmFuZG9tVmlldy5tb2RlbC5kZWZhdWx0c1xuXG5cdFx0XHRcdHJhbmRvbVZpZXcubW9kZWwuc2V0ICdnZW5lcmF0b3JzJywgcmFuZG9tVmlldy5tb2RlbC5kZWZhdWx0cy5nZW5lcmF0b3JzXG5cblx0XHRjaGFuZ2VTdGVwIDogKHN0ZXApID0+XG5cdFx0XHRAY3VycmVudFN0ZXAgPSBzdGVwXG5cdFx0XHRAbW9kZWwuc2V0ICdmb3JtU3RlcCcsIHN0ZXBcblx0XHRcdEB1aS5jdXJyZW50U3RlcC50ZXh0KEBjdXJyZW50U3RlcCsnICcpXG5cdFx0XHRAdWkucXVlc3Rpb25zUXVhbnRpdHkudGV4dChAcXVlc3Rpb25zLmxlbmd0aClcblx0XHRcdEB1aS5xdWVzdGlvbi50ZXh0KEBxdWVzdGlvbnNbQGN1cnJlbnRTdGVwLTFdKVxuXG5cdFx0c3VibWl0OiAoZSkgPT5cblx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0Zm9ybVZhbCA9IEAkKCcuc3RlcC1mb3JtLWNvbnRyb2xsZXItZm9ybS1zdGF0dXNiYXItdmFsdWUnKVxuXHRcdFx0cXVlc3Rpb25OdW0gPSBAY3VycmVudFN0ZXBcblx0XHRcdHF1ZXN0aW9uTnVtKytcblx0XHRcdGZvcm1WYWwud2lkdGggKDEwMC8gQHF1ZXN0aW9ucy5sZW5ndGggKiAocXVlc3Rpb25OdW0tMSkgKyAnJScpXG5cdFx0XHRAdWkubWFpbklucHV0LnNlbGVjdDIoJ3ZhbCcsJycpXG5cdFx0XHRpZiBxdWVzdGlvbk51bSBpcyBAcXVlc3Rpb25zLmxlbmd0aCsxXG5cblx0XHRcdFx0Y29uc29sZS5pbmZvKCdUaGUgcXVlc3Rpb25zIGlzIG92ZXIhJylcblx0XHRcdFx0QHVpLnF1ZXN0aW9uLnRleHQoJ9CS0L7Qv9GA0L7RgdGLINC60L7QvdGH0LjQu9C40YHRjCEnKVxuXHRcdFx0XHRAY29tcGxldGVkPXRydWVcblx0XHRcdFx0QHVpLm1haW5JbnB1dC5zZWxlY3QyICd2YWwnLCcnXG5cdFx0XHRcdEB1aS5tYWluSW5wdXQuc2VsZWN0MiAnZW5hYmxlJywgZmFsc2Vcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEB1aS5tYWluSW5wdXQuc2VsZWN0MiAnZW5hYmxlJywgdHJ1ZVxuXHRcdFx0XHRAY2hhbmdlU3RlcChxdWVzdGlvbk51bSlcblxuXHRcdHN0ZXBOZXh0IDogPT5cblx0XHRcdGlmIEBjdXJyZW50U3RlcCA8PSBAcXVlc3Rpb25zLmxlbmd0aFxuXHRcdFx0XHRAdWkuc3RlcEZvcm0udHJpZ2dlciAnc3VibWl0J1xuXG5cdFx0c3RlcFByZXYgOiA9PlxuXHRcdFx0aWYgQGN1cnJlbnRTdGVwID4gMVxuXHRcdFx0XHRAY3VycmVudFN0ZXAgPSBAY3VycmVudFN0ZXAtMlxuXHRcdFx0XHRAdWkuc3RlcEZvcm0udHJpZ2dlciAnc3VibWl0J1xuXG5cdFx0c2VsZWN0MkNob2lzZVNlbGVjdGVkOiAoZSkgPT4gXG5cdFx0XHRzd2l0Y2ggQGN1cnJlbnRTdGVwXG5cdFx0XHRcdHdoZW4gMVxuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwic3RlcDogMVwiLGUub2JqZWN0LnNleFxuXHRcdFx0XHRcdEBjb2xsZWN0aW9uLmVhY2ggKG1vZGVsLGkpIC0+XG5cdFx0XHRcdFx0XHRpZiAhbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBvciBtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIGlzIG5vdCB0cnVlXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnZGF0YS5uYW1lJyxlLm9iamVjdC50ZXh0KVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEuc2V4JyxlLm9iamVjdC5zZXgpXG5cdFx0XHRcdHdoZW4gMlxuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwic3RlcDogMlwiXG5cdFx0XHRcdFx0QGNvbGxlY3Rpb24uZWFjaCAobW9kZWwsaSkgLT5cblx0XHRcdFx0XHRcdGlmICFtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIG9yIG1vZGVsLmdldCgnaXMtbG9ja2VkJykgaXMgbm90IHRydWVcblx0XHRcdFx0XHRcdFx0bW9kZWwuc2V0KCdkYXRhLnN1cm5hbWUnLGUub2JqZWN0LnRleHQpXG5cdFx0XHRcdHdoZW4gM1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwic3RlcDogM1wiXG5cdFx0XHRcdFx0QGNvbGxlY3Rpb24uZWFjaCAobW9kZWwsaSkgLT5cblx0XHRcdFx0XHRcdGlmICFtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIG9yIG1vZGVsLmdldCgnaXMtbG9ja2VkJykgaXMgbm90IHRydWVcblx0XHRcdFx0XHRcdFx0bW9kZWwuc2V0KCdkYXRhLmVNYWlsJyxlLm9iamVjdC50ZXh0KVxuXHRcdFx0XHR3aGVuIDRcblx0XHRcdFx0XHRjb25zb2xlLmxvZyBcInN0ZXA6IDRcIlxuXHRcdFx0XHRcdEBjb2xsZWN0aW9uLmVhY2ggKG1vZGVsLGkpIC0+XG5cdFx0XHRcdFx0XHRpZiAhbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBvciBtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIGlzIG5vdCB0cnVlXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnZGF0YS5waG9uZScsZS5vYmplY3QudGV4dClcblx0XHRcdFx0d2hlbiA1XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJzdGVwOiA1XCJcblx0XHRcdFx0XHRAY29sbGVjdGlvbi5lYWNoIChtb2RlbCxpKSAtPlxuXHRcdFx0XHRcdFx0aWYgIW1vZGVsLmdldCgnaXMtbG9ja2VkJykgb3IgbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpcyBub3QgdHJ1ZVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEucG9zaXRpb24nLGUub2JqZWN0LnRleHQpXG5cblx0XHRzZWxlY3QyY2hvaXNlUmVtb3ZlZDogKGUpID0+XG5cdFx0XHRpZiBlLmNob2ljZS50ZXh0IGlzIEBuYW1lc1swXVxuXHRcdFx0XHRAbmFtZXMuc2hpZnQoKVxuXG5cdFx0XHRpZiBlLmNob2ljZS50ZXh0IGlzIEBuYW1lc1sxXVxuXHRcdFx0XHRAbmFtZXMucG9wKClcblx0XHRcdGlmIEBjdXJyZW50U3RlcCBpcyAxXG5cdFx0XHRcdEBuYW1lcyA9IFtdXG5cdFx0XHRpZiBAY3VycmVudFN0ZXAgaXMgMlxuXHRcdFx0XHRAc3VybmFtZXMgPSBbXVxuXG5cdFx0cHJpbnRTZWxlY3RlZENhcmRzOiA9PlxuXHRcdFx0JCgnYm9keScpLmZpbmQoJyNvdmVybGF5JykuYWRkQ2xhc3MgJ3JlbmRlcmluZy1wZGYnXG5cblx0XHRcdCMgPC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFJFTkRFUklORyBPTiBTRVJWRVJTSURFIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPlxuXG5cdFx0XHQjIGNhcmQgPSBAY2hpbGRyZW4uZmluZEJ5SW5kZXgoMCkuJGVsXG5cdFx0XHQjIGlmIGNhcmQuJGVsLmhhc0NsYXNzICdmbGlwZWQnXG5cdFx0XHQjIFx0IGRhdGFJbWcgPSBjYXJkLiRlbC5maW5kKCcuY2FyZC1jYW52YXMuZnJvbnQnKVswXS50b0RhdGFVUkwoKVxuXHRcdFx0IyBlbHNlXG5cdFx0XHQjIFx0ZGF0YUltZyA9IGNhcmQuJGVsLmZpbmQoJy5jYXJkLWNhbnZhcy5iYWNrJylbMF0udG9EYXRhVVJMKClcblx0XHRcdCMgY29uc29sZS5sb2cgZGF0YUltZ1xuXHRcdFx0IyAkLnBvc3QoJy9wZGYtZ2VuZXJhdG9yJywgZGF0YTogZGF0YUltZylcblxuXHRcdFx0IyQoJ2JvZHknKS5maW5kKCcjb3ZlcmxheScpLnJlbW92ZUNsYXNzICdyZW5kZXJpbmctcGRmJ1xuXG5cdFx0XHQjIDwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBFTkQgUkVOREVSSU5HIE9OIFNFUlZFUlNJREUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XG5cblxuXG5cdFx0XHQjIDwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBFTkQgUkVOREVSSU5HIE9OIENMSUVOVFNJREUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XG5cdFx0XHRkZWZmZXIgPSA9PlxuXHRcdFx0XHRzdGFydFRpbWUgPSBuZXcgRGF0ZSgpXG5cdFx0XHRcdCMgVE9ETyBjYWxjdWxhdGUgcHJvcGVyIG1tIHdpdGggbWVhenVyZW1lbnQgb2YgRFBJIGxpa2UgdGhpczogXG5cdFx0XHRcdCMgKyggYXBwLmdldFVuaXRzKCQoJ2NhbnZhcycpWzBdLCd3aWR0aCcpLmNtKjEwICkudG9GaXhlZCgpXG5cblx0XHRcdFx0cGRmT3B0aW9ucyA9XG5cdFx0XHRcdFx0cGRmV2lkdGg6ICAzMTkuODk0MFxuXHRcdFx0XHRcdHBkZkhlaWdodDogIDQ1MFxuXHRcdFx0XHRcdG1hcmdpbjpcblx0XHRcdFx0XHRcdHRvcDogOC45MTg5MTg5MTg5MTg5MlxuXHRcdFx0XHRcdFx0bGVmdDogMTguNjY2NjY2NTZcblx0XHRcdFx0XHRcdGJvdHRvbTogOC45MTg5MTg5MTg5MTg5MlxuXHRcdFx0XHRcdFx0cmlnaHQ6IDE4LjY2NjY2NjU2XG5cdFx0XHRcdFx0Y2FyZFdpZHRoOiA5NFxuXHRcdFx0XHRcdGNhcmRIZWlnaHQ6IDU0XG5cblx0XHRcdFx0XHRjYXJkUGVyTGluZTogM1xuXHRcdFx0XHRcdGxpbmVzQ291bnRlcjogMFxuXG5cdFx0XHRcdHBkZiA9IG5ldyBqc1BERigncCcsJ21tJywgWyBwZGZPcHRpb25zLnBkZldpZHRoLCBwZGZPcHRpb25zLnBkZkhlaWdodCBdIClcblxuXHRcdFx0XHRDYXJkcy5yZW5kZXJpbmdQREYgPSB0cnVlXG5cdFx0XHRcdEAkZWwuZmluZCgnI2NhcmRzR3JlZWQnKS5hZGRDbGFzcyAncHJlcGFyZS10by1wZGYnXG5cdFx0XHRcdGFwcC50cmlnZ2VyICdyZXNpemUnXG5cblxuXHRcdFx0XHRzZWxlY3RlZENhcmRzID0gQGNoaWxkcmVuLmZpbHRlciAodmlldykgLT5cblx0XHRcdFx0XHR2aWV3Lm1vZGVsLmdldCgnaXMtbG9ja2VkJykgaXMgdHJ1ZVxuXG5cdFx0XHRcdGNhcmRzQ291bnRlciA9IHNlbGVjdGVkQ2FyZHMubGVuZ3RoXG5cblx0XHRcdFx0IyBBREQgTElORVNcblx0XHRcdFx0bGluZXMgPSBcblx0XHRcdFx0XHRWVDpcdCMgdmVydGljYWwgLSB0b3Bcblx0XHRcdFx0XHRcdHgwOjIwLjVcblx0XHRcdFx0XHRcdHkwOjQuN1xuXHRcdFx0XHRcdFx0eDE6MjAuNVxuXHRcdFx0XHRcdFx0eTE6OC43XG5cblx0XHRcdFx0XHRWQjpcdCN2YXJ0aWNhbCAtIGJvdHRvbVxuXHRcdFx0XHRcdFx0eDA6MjAuNVxuXHRcdFx0XHRcdFx0eTA6NDQxXG5cdFx0XHRcdFx0XHR4MToyMC41XG5cdFx0XHRcdFx0XHR5MTo0NDVcblxuXHRcdFx0XHRcdEhMOlx0I2hvcml6b250YWwgLSBsZWZ0XG5cdFx0XHRcdFx0XHR4MDoxNSBcblx0XHRcdFx0XHRcdHkwOjEwLjZcblx0XHRcdFx0XHRcdHgxOjE5XG5cdFx0XHRcdFx0XHR5MToxMC42XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0SFI6ICNob3Jpem9udGFsIC0gcmlnaHRcblx0XHRcdFx0XHRcdHgwOiAzMDEuMjI3MzMzNDRcblx0XHRcdFx0XHRcdHkwOiAxMC42XG5cdFx0XHRcdFx0XHR4MTogMzA1LjIyNzMzMzQ0XG5cdFx0XHRcdFx0XHR5MTogMTAuNlxuXG5cdFx0XHRcdGRyYXdMaW5lcyA9IChzdGFydExpbmUsIGxpbmVUeXBlLCBudW0sIGV2ZW5FbmNyZW1lbnQsIG9kZEVuY3JlbWVudCkgLT5cblx0XHRcdFx0XHRmb3IgaSBpbiBbMC4uLm51bV1cblx0XHRcdFx0XHRcdHBkZi5saW5lIHN0YXJ0TGluZS54MCwgc3RhcnRMaW5lLnkwLCBzdGFydExpbmUueDEsIHN0YXJ0TGluZS55MVxuXG5cdFx0XHRcdFx0XHRzd2l0Y2ggbGluZVR5cGVcblx0XHRcdFx0XHRcdFx0d2hlbiAnaCcgI2hvcml6b250YWxcblx0XHRcdFx0XHRcdFx0XHR1bmxlc3MgaSUyICMgZXZlblxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhcnRMaW5lLnkwKz0gZXZlbkVuY3JlbWVudFxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhcnRMaW5lLnkxKz0gZXZlbkVuY3JlbWVudFxuXHRcdFx0XHRcdFx0XHRcdGVsc2UgIyBvZGRcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXJ0TGluZS55MCs9IG9kZEVuY3JlbWVudFxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhcnRMaW5lLnkxKz0gb2RkRW5jcmVtZW50XG5cblx0XHRcdFx0XHRcdFx0d2hlbiAndicgI3ZlcnRpY2FsXHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0dW5sZXNzIGklMiAjIGV2ZW5cblx0XHRcdFx0XHRcdFx0XHRcdHN0YXJ0TGluZS54MCs9IGV2ZW5FbmNyZW1lbnRcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXJ0TGluZS54MSs9IGV2ZW5FbmNyZW1lbnRcblx0XHRcdFx0XHRcdFx0XHRlbHNlICMgb2RkXG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydExpbmUueDArPSBvZGRFbmNyZW1lbnRcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXJ0TGluZS54MSs9IG9kZEVuY3JlbWVudFxuXHRcdFx0XHRcblx0XHRcdFx0ZHJhd0xpbmVzIGxpbmVzLlZULCAndicsIDYsIDkwLCA0XG5cdFx0XHRcdGRyYXdMaW5lcyBsaW5lcy5WQiwgJ3YnLCA2LCA5MCwgNFxuXHRcdFx0XHRkcmF3TGluZXMgbGluZXMuSEwsICdoJywgMTYsIDUwLCA0XG5cdFx0XHRcdGRyYXdMaW5lcyBsaW5lcy5IUiwgJ2gnLCAxNiwgNTAsIDRcblxuXG5cdFx0XHRcdCMgQUREIENBUkQgSU1BR0VTXG5cdFx0XHRcdG9uTGluZUNvdW50ZXIgPSAwXG5cdFx0XHRcdGZvciBpIGluIFswLi4uMjRdXG5cdFx0XHRcdFx0Y2FyZEluZGV4ID0gaSVzZWxlY3RlZENhcmRzLmxlbmd0aFxuXHRcdFx0XHRcdGNhcmQgPSBzZWxlY3RlZENhcmRzW2NhcmRJbmRleF1cblxuXHRcdFx0XHRcdGlmIG5vdCBjYXJkLiRlbC5oYXNDbGFzcyAnZmxpcGVkJ1xuXHRcdFx0XHRcdFx0IGNhcmRDYW52YXMgPSBjYXJkLiRlbC5maW5kKCcuY2FyZC1jYW52YXMuZnJvbnQnKVswXVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGNhcmRDYW52YXMgPSBjYXJkLiRlbC5maW5kKCcuY2FyZC1jYW52YXMuYmFjaycpWzBdXG5cdFx0XHRcdFx0aW1nRGF0YSA9IGNhcmRDYW52YXMudG9EYXRhVVJMKClcblxuXHRcdFx0XHRcdG5ld0xpbmVDb3VudGVyID0gTWF0aC5mbG9vcihpL3BkZk9wdGlvbnMuY2FyZFBlckxpbmUpXG5cdFx0XHRcdFx0aWYgbmV3TGluZUNvdW50ZXIgPiBwZGZPcHRpb25zLmxpbmVzQ291bnRlclxuXHRcdFx0XHRcdFx0cGRmT3B0aW9ucy5saW5lc0NvdW50ZXIrK1xuXHRcdFx0XHRcdFx0b25MaW5lQ291bnRlciA9IDBcblxuXHRcdFx0XHRcdHggPSAocGRmT3B0aW9ucy5jYXJkV2lkdGgqb25MaW5lQ291bnRlcisrKStwZGZPcHRpb25zLm1hcmdpbi5sZWZ0XG5cdFx0XHRcdFx0eSA9IChwZGZPcHRpb25zLmNhcmRIZWlnaHQqcGRmT3B0aW9ucy5saW5lc0NvdW50ZXIpK3BkZk9wdGlvbnMubWFyZ2luLnRvcFxuXG5cdFx0XHRcdFx0cGRmLmFkZEltYWdlKGltZ0RhdGEgLCAnSlBFRycsIHgsIHksIHBkZk9wdGlvbnMuY2FyZFdpZHRoLCBwZGZPcHRpb25zLmNhcmRIZWlnaHQsIFwiY2FyZCN7Y2FyZEluZGV4fVwiLCBcIlNMT1dcIiApXG5cblx0XHRcdFx0cGRmLnNhdmUgJ2NhcmRfaG9sZGVyLnBkZidcblx0XHRcdFx0Q2FyZHMucmVuZGVyaW5nUERGID0gZmFsc2VcblxuXHRcdFx0XHRlbmRUaW1lID0gbmV3IERhdGUoKVxuXHRcdFx0XHRkZWx0YVRpbWVTZWNvbmRzID0gKCtlbmRUaW1lKS0oK3N0YXJ0VGltZSkvMTAwMFxuXHRcdFx0XHRjb25zb2xlLmluZm8gXCJ0aW1lIHNwZW5kICN7IGRlbHRhVGltZVNlY29uZHMgfVwiXG5cblx0XHRcdFx0QCRlbC5maW5kKCcjY2FyZHNHcmVlZCcpLnJlbW92ZUNsYXNzICdwcmVwYXJlLXRvLXBkZidcblx0XHRcdFx0JCgnYm9keScpLmZpbmQoJyNvdmVybGF5JykucmVtb3ZlQ2xhc3MgJ3JlbmRlcmluZy1wZGYnXG5cdFx0XHRcblx0XHRcdHNldFRpbWVvdXQgZGVmZmVyLCAzMDBcblx0XHRcdCMgPC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEVORCBSRU5ERVJJTkcgT04gQ0xJRU5UU0lERSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cblxuXG5cbiJdfQ==