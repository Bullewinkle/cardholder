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
                x0: 21,
                y0: 4.7,
                x1: 21,
                y1: 8.7
              },
              VB: {
                x0: 21,
                y0: 441,
                x1: 21,
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL1ZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQVgsQ0FBa0IsZUFBbEIsRUFBbUMsU0FBQyxhQUFELEdBQUE7V0FDNUIsYUFBYSxDQUFDO0FBQ25CLGtDQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7T0FBQTs7QUFBQSwwQkFBQSxPQUFBLEdBQVMsS0FBVCxDQUFBOztBQUFBLDBCQUNBLE9BQUEsR0FBUyxDQURULENBQUE7O0FBQUEsMEJBR0EsU0FBQSxHQUFXLHFCQUhYLENBQUE7O0FBQUEsMEJBS0EsRUFBQSxHQUNDO0FBQUEsUUFBQSxVQUFBLEVBQXNCLDRCQUF0QjtBQUFBLFFBQ0EsV0FBQSxFQUFzQixrQ0FEdEI7QUFBQSxRQUVBLGFBQUEsRUFBc0IseUNBRnRCO0FBQUEsUUFHQSxhQUFBLEVBQXNCLHlDQUh0QjtBQUFBLFFBSUEsVUFBQSxFQUFzQixrQ0FKdEI7QUFBQSxRQUtBLGFBQUEsRUFBc0IsOENBTHRCO0FBQUEsUUFNQSxtQkFBQSxFQUFzQiwrQ0FOdEI7QUFBQSxRQU9BLGFBQUEsRUFBc0IsdUJBUHRCO09BTkQsQ0FBQTs7QUFBQSwwQkFlQSxNQUFBLEdBQ0M7QUFBQSxRQUFBLHFCQUFBLEVBQW9DLFFBQXBDO0FBQUEsUUFDQSxpQ0FBQSxFQUFvQyx1QkFEcEM7QUFBQSxRQUVBLCtCQUFBLEVBQW9DLHNCQUZwQztBQUFBLFFBR0EsdUJBQUEsRUFBb0MsVUFIcEM7QUFBQSxRQUlBLHVCQUFBLEVBQW9DLFVBSnBDO0FBQUEsUUFLQSx1QkFBQSxFQUFvQyxvQkFMcEM7T0FoQkQsQ0FBQTs7QUFBQSwwQkF1QkEsUUFBQSxHQUFVLFNBQUMsS0FBRCxHQUFBO2VBQ1QsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUExQixDQUFxQyxJQUFDLENBQUEsS0FBdEMsRUFEUztNQUFBLENBdkJWLENBQUE7O0FBQUEsMEJBMEJB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anMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvcicsIChDYXJkR2VuZXJhdG9yKSAtPlxuXHRjbGFzcyBDYXJkR2VuZXJhdG9yLkNhcmRzVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29tcG9zaXRlVmlld1xuXHRcdGxvZ2dpbmc6IG9mZlxuXHRcdGNvdW50ZXI6IDBcblxuXHRcdGNsYXNzTmFtZTogJ2NhcmQtZ2VuZXJhdG9yLXZpZXcnXG5cblx0XHR1aTpcblx0XHRcdCdzdGVwRm9ybScgICAgICAgICAgOiAnLnN0ZXAtZm9ybS1jb250cm9sbGVyLWZvcm0nXG5cdFx0XHQnbWFpbklucHV0JyAgICAgICAgIDogJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtLWlucHV0J1xuXHRcdFx0J2NvbnRyb2xOZXh0JyAgICAgICA6ICcuc3RlcC1mb3JtLWNvbnRyb2xsZXItZm9ybS1jb250cm9sLm5leHQnXG5cdFx0XHQnY29udHJvbFByZXYnICAgICAgIDogJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtLWNvbnRyb2wucHJldidcblx0XHRcdCdxdWVzdGlvbicgICAgICAgICAgOiAnLnN0ZXAtZm9ybS1jb250cm9sbGVyLWZvcm0tbGFiZWwnXG5cdFx0XHQnY3VycmVudFN0ZXAnICAgICAgIDogJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtLXN0YXR1c2Jhci1jdXJyZW50J1xuXHRcdFx0J3F1ZXN0aW9uc1F1YW50aXR5JyA6ICcuc3RlcC1mb3JtLWNvbnRyb2xsZXItZm9ybS1zdGF0dXNiYXItcXVhbnRpdHknXG5cdFx0XHQncHJpbnRCdXR0b24nICAgICAgIDogJy5wcmludC1zZWxlY3RlZC1jYXJkcydcblx0XHRcdFx0XHRcblx0XHRldmVudHM6IFxuXHRcdFx0J3N1Ym1pdCBAdWkuc3RlcEZvcm0nICAgICAgICAgICAgIDogJ3N1Ym1pdCdcblx0XHRcdCdzZWxlY3QyLXNlbGVjdGluZyBAdWkubWFpbklucHV0JyA6ICdzZWxlY3QyQ2hvaXNlU2VsZWN0ZWQnXG5cdFx0XHQnc2VsZWN0Mi1yZW1vdmVkIEB1aS5tYWluSW5wdXQnICAgOiAnc2VsZWN0MmNob2lzZVJlbW92ZWQnXG5cdFx0XHQnY2xpY2sgQHVpLmNvbnRyb2xOZXh0JyAgICAgICAgICAgOiAnc3RlcE5leHQnXG5cdFx0XHQnY2xpY2sgQHVpLmNvbnRyb2xQcmV2JyAgICAgICAgICAgOiAnc3RlcFByZXYnXG5cdFx0XHQnY2xpY2sgQHVpLnByaW50QnV0dG9uJyAgICAgICAgICAgOiAncHJpbnRTZWxlY3RlZENhcmRzJ1xuXG5cdFx0dGVtcGxhdGU6IChtb2RlbCkgLT5cblx0XHRcdHRlbXBsYXRpemVyLmNhcmRHZW5lcmF0b3IuY2FyZHNHcmVlZCBAbW9kZWxcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRAYmluZCAnYWxsJywgLT5cblx0XHRcdFx0Y29uc29sZS5sb2cgXCJDQVJEUyBDT01QT1NJVEUgVklFVzpcXHRcIiwgYXJndW1lbnRzIGlmIEBsb2dnaW5nIGlzIG9uXG5cdFx0XHRcblx0XHRcdEBkYXRhID0gZGF0YUZyb21TZXJ2ZXIuYXBwRGF0YVxuXG5cdFx0XHRAY2hpbGRWaWV3Q29udGFpbmVyID0gJy5jYXJkcydcblx0XHRcdEBjaGlsZFZpZXcgPSBDYXJkR2VuZXJhdG9yLmNhcmRzLkNhcmRWaWV3XG5cdFx0XHRcblx0XHRcdEBzdGF0ZSAgICAgID0gbmV3IEJhY2tib25lLk1vZGVsKClcblx0XHRcdEBtb2RlbCAgICAgID0gbmV3IENhcmRHZW5lcmF0b3Iuc3RlcEZvcm0uU3RlcEZvcm1Nb2RlbCgpXG5cdFx0XHRAY29sbGVjdGlvbiA9IG5ldyBDYXJkR2VuZXJhdG9yLmNhcmRzLkNhcmRzQ29sbGVjdGlvbigpXG5cblx0XHRvblNob3c6ID0+XG5cdFx0XHRAY3VycmVudFN0ZXAgPSBAbW9kZWwuZ2V0ICdjdXJyZW50U3RlcCdcblx0XHRcdEBxdWVzdGlvbnMgID0gQGRhdGEucXVlc3Rpb25zXG5cblx0XHRcdHdpbmRvdy5vbmtleWRvd24gPSAoZSkgPT5cblx0XHRcdFx0c3dpdGNoIGUua2V5Q29kZVxuXHRcdFx0XHRcdHdoZW4gMzdcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRcdFx0QHVpLmNvbnRyb2xzLnByZXYudHJpZ2dlciAnY2xpY2snXG5cdFx0XHRcdFx0d2hlbiAzOVxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdFx0XHRAdWkuY29udHJvbHMubmV4dC50cmlnZ2VyICdjbGljaydcblxuXHRcdFx0QG5hbWVzID0gW11cblx0XHRcdEBzdXJuYW1lcyA9IFtdXG5cblx0XHRcdG5hbWVzID0gQGRhdGEubmFtZXNcblx0XHRcdGVtYWlscyA9IEBkYXRhLmVtYWlsc1xuXHRcdFx0cGhvbmVzID0gZmFsc2Vcblx0XHRcdHBvc2l0aW9ucyA9IEBkYXRhLnBvc2l0aW9uc1xuXHRcdFx0cXVlc3Rpb25zID0gQGRhdGEucXVlc3Rpb25zXG5cdFx0XHRzdXJuYW1lcyA9IEBkYXRhLnN1cm5hbWVzXG5cblx0XHRcdEBzcmMgPSBbIG5hbWVzLCBzdXJuYW1lcywgZW1haWxzLCBwaG9uZXMsIHBvc2l0aW9uc10gXG5cblx0XHRcdCQoIEB1aS5tYWluSW5wdXQgKS5zZWxlY3QyXG5cdFx0XHRcdHdpZHRoOiAnMTAwJSdcblx0XHRcdFx0cGxhY2Vob2xkZXIgOiAn0LLQstC10LTQuNGC0LUg0L7RgtCy0LXRgidcblx0XHRcdFx0YWxsb3dDbGVhcjogdHJ1ZVxuXHRcdFx0XHRtYXhpbXVtU2VsZWN0aW9uU2l6ZTogMlxuXHRcdFx0XHRhbGxvd0NsZWFyOiB0cnVlXG5cdFx0XHRcdGluaXRTZWxlY3Rpb24gOiAoZWxlbWVudCwgY2FsbGJhY2spIC0+XG5cdFx0XHRcdFx0ZGF0YSA9IFtdXG5cdFx0XHRcdFx0JChlbGVtZW50LnZhbCgpLnNwbGl0KFwiLFwiKSkuZWFjaCAtPlxuXHRcdFx0XHRcdFx0ZGF0YS5wdXNoKHtpZDogdGhpcywgdGV4dDogdGhpc30pXG5cdFx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0XHRjYWxsYmFjayhkYXRhKVxuXHRcdFx0XHR0YWdzOiA9PlxuXHRcdFx0XHRcdGlmIEBjdXJyZW50U3RlcFxuXHRcdFx0XHRcdFx0cmV0dXJuIEBzcmNbQGN1cnJlbnRTdGVwLTFdIG9yIFtdXG5cdFx0XHRcdFx0ZWxzZSBcblx0XHRcdFx0XHRcdHJldHVybiBbXVxuXHRcdFx0XHRtdWx0aXBsZTogdHJ1ZVxuXG5cdFx0XHRcdFx0XHQjIHdhaXQgZm90IGNvbW1vbiBjdXN0b20gZm9udHNcblx0XHRcdGlmIGRvY3VtZW50LmZvbnRzIHRoZW4gZG9jdW1lbnQuZm9udHMubG9hZChcIjEwcHggY2FyZGhvbGRlci1pY29uc1wiKS50aGVuID0+IFxuXHRcdFx0XHRAY2hhbmdlU3RlcCgxKVxuXHRcblx0XHRcdFx0IyBAcmFuZG9tUmVuZGVyKClcblx0XHRcdFx0c2V0VGltZW91dCA9PlxuXHRcdFx0XHRcdHNldEludGVydmFsIEByYW5kb21SZW5kZXIsIDIwMDBcblx0XHRcdFx0LCAxMDAwXG5cblx0XHRcdGVsc2UgJC5nZXQgXCIvYXNzZXRzL2ZvbnQvY2FyZGhvbGRlci1pY29ucy53b2ZmPy1hN2pxNTJcIiwgPT4gXG5cdFx0XHRcdEBjaGFuZ2VTdGVwKDEpXG5cdFxuXHRcdFx0XHQjIEByYW5kb21SZW5kZXIoKVxuXHRcdFx0XHRzZXRUaW1lb3V0ID0+XG5cdFx0XHRcdFx0c2V0SW50ZXJ2YWwgQHJhbmRvbVJlbmRlciwgMjAwMFxuXHRcdFx0XHQsIDEwMDBcblxuXG5cdFx0cmFuZG9tUmVuZGVyOiA9PlxuXHRcdFx0bm90TG9ja2VkVmlld3MgPSBAY2hpbGRyZW4uZmlsdGVyICh2aWV3KSAtPlxuXHRcdFx0XHRyZXR1cm4gdmlldy5tb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIGlzbnQgdHJ1ZVxuXHRcdFx0cmFuZG9tVmlldyA9IG5vdExvY2tlZFZpZXdzWyBhcHAuZ2V0UmFuZG9tKDAsIG5vdExvY2tlZFZpZXdzLmxlbmd0aC0xKSBdXG5cdFx0XHRpZiBub3RMb2NrZWRWaWV3cy5sZW5ndGggPiAwIGFuZCByYW5kb21WaWV3IGFuZCBub3QgKCByYW5kb21WaWV3Lm1vZGVsLmdldCgnaXMtaG92ZXJlZCcpIG9yIHJhbmRvbVZpZXcubW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSApXG5cdFx0XHRcdGlmIG5vdExvY2tlZFZpZXdzLmxlbmd0aCA8IDNcblx0XHRcdFx0XHRAcHJldmlvdXNWaWV3Q2lkID0gcmFuZG9tVmlldy5jaWRcblx0XHRcdFx0XHRyYW5kb21WaWV3Lm1vZGVsLmNsZWFyKHtzaWxlbnQ6IHRydWV9KS5zZXQocmFuZG9tVmlldy5tb2RlbC5kZWZhdWx0cylcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGlmIHJhbmRvbVZpZXcuY2lkIGlzbnQgQHByZXZpb3VzVmlld0NpZFxuXHRcdFx0XHRcdFx0QHByZXZpb3VzVmlld0NpZCA9IHJhbmRvbVZpZXcuY2lkXG5cdFx0XHRcdFx0XHRyYW5kb21WaWV3Lm1vZGVsLmNsZWFyKHtzaWxlbnQ6IHRydWV9KS5zZXQocmFuZG9tVmlldy5tb2RlbC5kZWZhdWx0cylcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRAcmFuZG9tUmVuZGVyKClcblxuXHRcdGNoYW5nZVN0ZXAgOiAoc3RlcCkgPT5cblx0XHRcdEBjdXJyZW50U3RlcCA9IHN0ZXBcblx0XHRcdEBtb2RlbC5zZXQgJ2Zvcm1TdGVwJywgc3RlcFxuXHRcdFx0QHVpLmN1cnJlbnRTdGVwLnRleHQoQGN1cnJlbnRTdGVwKycgJylcblx0XHRcdEB1aS5xdWVzdGlvbnNRdWFudGl0eS50ZXh0KEBxdWVzdGlvbnMubGVuZ3RoKVxuXHRcdFx0QHVpLnF1ZXN0aW9uLnRleHQoQHF1ZXN0aW9uc1tAY3VycmVudFN0ZXAtMV0pXG5cblx0XHRzdWJtaXQ6IChlKSA9PlxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRmb3JtVmFsID0gQCQoJy5zdGVwLWZvcm0tY29udHJvbGxlci1mb3JtLXN0YXR1c2Jhci12YWx1ZScpXG5cdFx0XHRxdWVzdGlvbk51bSA9IEBjdXJyZW50U3RlcFxuXHRcdFx0cXVlc3Rpb25OdW0rK1xuXHRcdFx0Zm9ybVZhbC53aWR0aCAoMTAwLyBAcXVlc3Rpb25zLmxlbmd0aCAqIChxdWVzdGlvbk51bS0xKSArICclJylcblx0XHRcdEB1aS5tYWluSW5wdXQuc2VsZWN0MigndmFsJywnJylcblx0XHRcdGlmIHF1ZXN0aW9uTnVtIGlzIEBxdWVzdGlvbnMubGVuZ3RoKzFcblxuXHRcdFx0XHRjb25zb2xlLmluZm8oJ1RoZSBxdWVzdGlvbnMgaXMgb3ZlciEnKVxuXHRcdFx0XHRAdWkucXVlc3Rpb24udGV4dCgn0JLQvtC/0YDQvtGB0Ysg0LrQvtC90YfQuNC70LjRgdGMIScpXG5cdFx0XHRcdEBjb21wbGV0ZWQ9dHJ1ZVxuXHRcdFx0XHRAdWkubWFpbklucHV0LnNlbGVjdDIgJ3ZhbCcsJydcblx0XHRcdFx0QHVpLm1haW5JbnB1dC5zZWxlY3QyICdlbmFibGUnLCBmYWxzZVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdGVsc2Vcblx0XHRcdFx0QHVpLm1haW5JbnB1dC5zZWxlY3QyICdlbmFibGUnLCB0cnVlXG5cdFx0XHRcdEBjaGFuZ2VTdGVwKHF1ZXN0aW9uTnVtKVxuXG5cdFx0c3RlcE5leHQgOiA9PlxuXHRcdFx0aWYgQGN1cnJlbnRTdGVwIDw9IEBxdWVzdGlvbnMubGVuZ3RoXG5cdFx0XHRcdEB1aS5zdGVwRm9ybS50cmlnZ2VyICdzdWJtaXQnXG5cblx0XHRzdGVwUHJldiA6ID0+XG5cdFx0XHRpZiBAY3VycmVudFN0ZXAgPiAxXG5cdFx0XHRcdEBjdXJyZW50U3RlcCA9IEBjdXJyZW50U3RlcC0yXG5cdFx0XHRcdEB1aS5zdGVwRm9ybS50cmlnZ2VyICdzdWJtaXQnXG5cblx0XHRzZWxlY3QyQ2hvaXNlU2VsZWN0ZWQ6IChlKSA9PiBcblx0XHRcdHN3aXRjaCBAY3VycmVudFN0ZXBcblx0XHRcdFx0d2hlbiAxXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJzdGVwOiAxXCIsZS5vYmplY3Quc2V4XG5cdFx0XHRcdFx0QGNvbGxlY3Rpb24uZWFjaCAobW9kZWwsaSkgLT5cblx0XHRcdFx0XHRcdGlmICFtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIG9yIG1vZGVsLmdldCgnaXMtbG9ja2VkJykgaXMgbm90IHRydWVcblx0XHRcdFx0XHRcdFx0bW9kZWwuc2V0KCdkYXRhLm5hbWUnLGUub2JqZWN0LnRleHQpXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnZGF0YS5zZXgnLGUub2JqZWN0LnNleClcblx0XHRcdFx0d2hlbiAyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJzdGVwOiAyXCJcblx0XHRcdFx0XHRAY29sbGVjdGlvbi5lYWNoIChtb2RlbCxpKSAtPlxuXHRcdFx0XHRcdFx0aWYgIW1vZGVsLmdldCgnaXMtbG9ja2VkJykgb3IgbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpcyBub3QgdHJ1ZVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEuc3VybmFtZScsZS5vYmplY3QudGV4dClcblx0XHRcdFx0d2hlbiAzXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgXCJzdGVwOiAzXCJcblx0XHRcdFx0XHRAY29sbGVjdGlvbi5lYWNoIChtb2RlbCxpKSAtPlxuXHRcdFx0XHRcdFx0aWYgIW1vZGVsLmdldCgnaXMtbG9ja2VkJykgb3IgbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBpcyBub3QgdHJ1ZVxuXHRcdFx0XHRcdFx0XHRtb2RlbC5zZXQoJ2RhdGEuZU1haWwnLGUub2JqZWN0LnRleHQpXG5cdFx0XHRcdHdoZW4gNFxuXHRcdFx0XHRcdGNvbnNvbGUubG9nIFwic3RlcDogNFwiXG5cdFx0XHRcdFx0QGNvbGxlY3Rpb24uZWFjaCAobW9kZWwsaSkgLT5cblx0XHRcdFx0XHRcdGlmICFtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIG9yIG1vZGVsLmdldCgnaXMtbG9ja2VkJykgaXMgbm90IHRydWVcblx0XHRcdFx0XHRcdFx0bW9kZWwuc2V0KCdkYXRhLnBob25lJyxlLm9iamVjdC50ZXh0KVxuXHRcdFx0XHR3aGVuIDVcblx0XHRcdFx0XHRjb25zb2xlLmxvZyBcInN0ZXA6IDVcIlxuXHRcdFx0XHRcdEBjb2xsZWN0aW9uLmVhY2ggKG1vZGVsLGkpIC0+XG5cdFx0XHRcdFx0XHRpZiAhbW9kZWwuZ2V0KCdpcy1sb2NrZWQnKSBvciBtb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIGlzIG5vdCB0cnVlXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnNldCgnZGF0YS5wb3NpdGlvbicsZS5vYmplY3QudGV4dClcblxuXHRcdHNlbGVjdDJjaG9pc2VSZW1vdmVkOiAoZSkgPT5cblx0XHRcdGlmIGUuY2hvaWNlLnRleHQgaXMgQG5hbWVzWzBdXG5cdFx0XHRcdEBuYW1lcy5zaGlmdCgpXG5cblx0XHRcdGlmIGUuY2hvaWNlLnRleHQgaXMgQG5hbWVzWzFdXG5cdFx0XHRcdEBuYW1lcy5wb3AoKVxuXHRcdFx0aWYgQGN1cnJlbnRTdGVwIGlzIDFcblx0XHRcdFx0QG5hbWVzID0gW11cblx0XHRcdGlmIEBjdXJyZW50U3RlcCBpcyAyXG5cdFx0XHRcdEBzdXJuYW1lcyA9IFtdXG5cblx0XHRwcmludFNlbGVjdGVkQ2FyZHM6ID0+XG5cdFx0XHQkKCdib2R5JykuZmluZCgnI292ZXJsYXknKS5hZGRDbGFzcyAncmVuZGVyaW5nLXBkZidcblxuXHRcdFx0IyA8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUkVOREVSSU5HIE9OIFNFUlZFUlNJREUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XG5cblx0XHRcdCMgY2FyZCA9IEBjaGlsZHJlbi5maW5kQnlJbmRleCgwKS4kZWxcblx0XHRcdCMgaWYgY2FyZC4kZWwuaGFzQ2xhc3MgJ2ZsaXBlZCdcblx0XHRcdCMgXHQgZGF0YUltZyA9IGNhcmQuJGVsLmZpbmQoJy5jYXJkLWNhbnZhcy5mcm9udCcpWzBdLnRvRGF0YVVSTCgpXG5cdFx0XHQjIGVsc2Vcblx0XHRcdCMgXHRkYXRhSW1nID0gY2FyZC4kZWwuZmluZCgnLmNhcmQtY2FudmFzLmJhY2snKVswXS50b0RhdGFVUkwoKVxuXHRcdFx0IyBjb25zb2xlLmxvZyBkYXRhSW1nXG5cdFx0XHQjICQucG9zdCgnL3BkZi1nZW5lcmF0b3InLCBkYXRhOiBkYXRhSW1nKVxuXG5cdFx0XHQjJCgnYm9keScpLmZpbmQoJyNvdmVybGF5JykucmVtb3ZlQ2xhc3MgJ3JlbmRlcmluZy1wZGYnXG5cblx0XHRcdCMgPC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEVORCBSRU5ERVJJTkcgT04gU0VSVkVSU0lERSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cblxuXG5cblx0XHRcdCMgPC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEVORCBSRU5ERVJJTkcgT04gQ0xJRU5UU0lERSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cblx0XHRcdGRlZmZlciA9ID0+XG5cdFx0XHRcdHN0YXJ0VGltZSA9IG5ldyBEYXRlKClcblx0XHRcdFx0IyBUT0RPIGNhbGN1bGF0ZSBwcm9wZXIgbW0gd2l0aCBtZWF6dXJlbWVudCBvZiBEUEkgbGlrZSB0aGlzOiBcblx0XHRcdFx0IyArKCBhcHAuZ2V0VW5pdHMoJCgnY2FudmFzJylbMF0sJ3dpZHRoJykuY20qMTAgKS50b0ZpeGVkKClcblxuXHRcdFx0XHRwZGZPcHRpb25zID1cblx0XHRcdFx0XHRwZGZXaWR0aDogIDMxOS44OTQwXG5cdFx0XHRcdFx0cGRmSGVpZ2h0OiAgNDUwXG5cdFx0XHRcdFx0bWFyZ2luOlxuXHRcdFx0XHRcdFx0dG9wOiA4LjkxODkxODkxODkxODkyXG5cdFx0XHRcdFx0XHRsZWZ0OiAxOC42NjY2NjY1NlxuXHRcdFx0XHRcdFx0Ym90dG9tOiA4LjkxODkxODkxODkxODkyXG5cdFx0XHRcdFx0XHRyaWdodDogMTguNjY2NjY2NTZcblx0XHRcdFx0XHRjYXJkV2lkdGg6IDk0XG5cdFx0XHRcdFx0Y2FyZEhlaWdodDogNTRcblxuXHRcdFx0XHRcdGNhcmRQZXJMaW5lOiAzXG5cdFx0XHRcdFx0bGluZXNDb3VudGVyOiAwXG5cblx0XHRcdFx0cGRmID0gbmV3IGpzUERGKCdwJywnbW0nLCBbIHBkZk9wdGlvbnMucGRmV2lkdGgsIHBkZk9wdGlvbnMucGRmSGVpZ2h0IF0gKVxuXG5cdFx0XHRcdENhcmRHZW5lcmF0b3IucmVuZGVyaW5nUERGID0gdHJ1ZVxuXHRcdFx0XHRAJGVsLmZpbmQoJyNjYXJkc0dyZWVkJykuYWRkQ2xhc3MgJ3ByZXBhcmUtdG8tcGRmJ1xuXHRcdFx0XHRhcHAudHJpZ2dlciAncmVzaXplJ1xuXG5cblx0XHRcdFx0c2VsZWN0ZWRDYXJkcyA9IEBjaGlsZHJlbi5maWx0ZXIgKHZpZXcpIC0+XG5cdFx0XHRcdFx0dmlldy5tb2RlbC5nZXQoJ2lzLWxvY2tlZCcpIGlzIHRydWVcblxuXHRcdFx0XHRjYXJkc0NvdW50ZXIgPSBzZWxlY3RlZENhcmRzLmxlbmd0aFxuXG5cdFx0XHRcdCMgQUREIExJTkVTXG5cdFx0XHRcdGxpbmVzID0gXG5cdFx0XHRcdFx0VlQ6XHQjIHZlcnRpY2FsIC0gdG9wXG5cdFx0XHRcdFx0XHR4MDoyMVxuXHRcdFx0XHRcdFx0eTA6NC43XG5cdFx0XHRcdFx0XHR4MToyMVxuXHRcdFx0XHRcdFx0eTE6OC43XG5cblx0XHRcdFx0XHRWQjpcdCN2YXJ0aWNhbCAtIGJvdHRvbVxuXHRcdFx0XHRcdFx0eDA6MjFcblx0XHRcdFx0XHRcdHkwOjQ0MVxuXHRcdFx0XHRcdFx0eDE6MjFcblx0XHRcdFx0XHRcdHkxOjQ0NVxuXG5cdFx0XHRcdFx0SEw6XHQjaG9yaXpvbnRhbCAtIGxlZnRcblx0XHRcdFx0XHRcdHgwOjE1IFxuXHRcdFx0XHRcdFx0eTA6MTAuNlxuXHRcdFx0XHRcdFx0eDE6MTlcblx0XHRcdFx0XHRcdHkxOjEwLjZcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRIUjogI2hvcml6b250YWwgLSByaWdodFxuXHRcdFx0XHRcdFx0eDA6IDMwMS4yMjczMzM0NFxuXHRcdFx0XHRcdFx0eTA6IDEwLjZcblx0XHRcdFx0XHRcdHgxOiAzMDUuMjI3MzMzNDRcblx0XHRcdFx0XHRcdHkxOiAxMC42XG5cblx0XHRcdFx0ZHJhd0xpbmVzID0gKHN0YXJ0TGluZSwgbGluZVR5cGUsIG51bSwgZXZlbkVuY3JlbWVudCwgb2RkRW5jcmVtZW50KSAtPlxuXHRcdFx0XHRcdGZvciBpIGluIFswLi4ubnVtXVxuXHRcdFx0XHRcdFx0cGRmLmxpbmUgc3RhcnRMaW5lLngwLCBzdGFydExpbmUueTAsIHN0YXJ0TGluZS54MSwgc3RhcnRMaW5lLnkxXG5cblx0XHRcdFx0XHRcdHN3aXRjaCBsaW5lVHlwZVxuXHRcdFx0XHRcdFx0XHR3aGVuICdoJyAjaG9yaXpvbnRhbFxuXHRcdFx0XHRcdFx0XHRcdHVubGVzcyBpJTIgIyBldmVuXG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydExpbmUueTArPSBldmVuRW5jcmVtZW50XG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydExpbmUueTErPSBldmVuRW5jcmVtZW50XG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSAjIG9kZFxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhcnRMaW5lLnkwKz0gb2RkRW5jcmVtZW50XG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydExpbmUueTErPSBvZGRFbmNyZW1lbnRcblxuXHRcdFx0XHRcdFx0XHR3aGVuICd2JyAjdmVydGljYWxcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHR1bmxlc3MgaSUyICMgZXZlblxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhcnRMaW5lLngwKz0gZXZlbkVuY3JlbWVudFxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhcnRMaW5lLngxKz0gZXZlbkVuY3JlbWVudFxuXHRcdFx0XHRcdFx0XHRcdGVsc2UgIyBvZGRcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXJ0TGluZS54MCs9IG9kZEVuY3JlbWVudFxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhcnRMaW5lLngxKz0gb2RkRW5jcmVtZW50XG5cdFx0XHRcdFxuXHRcdFx0XHRkcmF3TGluZXMgbGluZXMuVlQsICd2JywgNiwgOTAsIDRcblx0XHRcdFx0ZHJhd0xpbmVzIGxpbmVzLlZCLCAndicsIDYsIDkwLCA0XG5cdFx0XHRcdGRyYXdMaW5lcyBsaW5lcy5ITCwgJ2gnLCAxNiwgNTAsIDRcblx0XHRcdFx0ZHJhd0xpbmVzIGxpbmVzLkhSLCAnaCcsIDE2LCA1MCwgNFxuXG5cblx0XHRcdFx0IyBBREQgQ0FSRCBJTUFHRVNcblx0XHRcdFx0b25MaW5lQ291bnRlciA9IDBcblx0XHRcdFx0Zm9yIGkgaW4gWzAuLi4yNF1cblx0XHRcdFx0XHRjYXJkSW5kZXggPSBpJXNlbGVjdGVkQ2FyZHMubGVuZ3RoXG5cdFx0XHRcdFx0Y2FyZCA9IHNlbGVjdGVkQ2FyZHNbY2FyZEluZGV4XVxuXG5cdFx0XHRcdFx0aWYgbm90IGNhcmQuJGVsLmhhc0NsYXNzICdmbGlwZWQnXG5cdFx0XHRcdFx0XHQgY2FyZENhbnZhcyA9IGNhcmQuJGVsLmZpbmQoJy5jYXJkLWNhbnZhcy5mcm9udCcpWzBdXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0Y2FyZENhbnZhcyA9IGNhcmQuJGVsLmZpbmQoJy5jYXJkLWNhbnZhcy5iYWNrJylbMF1cblx0XHRcdFx0XHRpbWdEYXRhID0gY2FyZENhbnZhcy50b0RhdGFVUkwoKVxuXG5cdFx0XHRcdFx0bmV3TGluZUNvdW50ZXIgPSBNYXRoLmZsb29yKGkvcGRmT3B0aW9ucy5jYXJkUGVyTGluZSlcblx0XHRcdFx0XHRpZiBuZXdMaW5lQ291bnRlciA+IHBkZk9wdGlvbnMubGluZXNDb3VudGVyXG5cdFx0XHRcdFx0XHRwZGZPcHRpb25zLmxpbmVzQ291bnRlcisrXG5cdFx0XHRcdFx0XHRvbkxpbmVDb3VudGVyID0gMFxuXG5cdFx0XHRcdFx0eCA9IChwZGZPcHRpb25zLmNhcmRXaWR0aCpvbkxpbmVDb3VudGVyKyspK3BkZk9wdGlvbnMubWFyZ2luLmxlZnRcblx0XHRcdFx0XHR5ID0gKHBkZk9wdGlvbnMuY2FyZEhlaWdodCpwZGZPcHRpb25zLmxpbmVzQ291bnRlcikrcGRmT3B0aW9ucy5tYXJnaW4udG9wXG5cblx0XHRcdFx0XHRwZGYuYWRkSW1hZ2UoaW1nRGF0YSAsICdKUEVHJywgeCwgeSwgcGRmT3B0aW9ucy5jYXJkV2lkdGgsIHBkZk9wdGlvbnMuY2FyZEhlaWdodCwgXCJjYXJkI3tjYXJkSW5kZXh9XCIsIFwiU0xPV1wiIClcblxuXHRcdFx0XHRwZGYuc2F2ZSAnY2FyZF9ob2xkZXIucGRmJ1xuXHRcdFx0XHRDYXJkR2VuZXJhdG9yLnJlbmRlcmluZ1BERiA9IGZhbHNlXG5cblx0XHRcdFx0ZW5kVGltZSA9IG5ldyBEYXRlKClcblx0XHRcdFx0ZGVsdGFUaW1lU2Vjb25kcyA9ICgrZW5kVGltZSktKCtzdGFydFRpbWUpLzEwMDBcblx0XHRcdFx0Y29uc29sZS5pbmZvIFwidGltZSBzcGVuZCAjeyBkZWx0YVRpbWVTZWNvbmRzIH1cIlxuXG5cdFx0XHRcdEAkZWwuZmluZCgnI2NhcmRzR3JlZWQnKS5yZW1vdmVDbGFzcyAncHJlcGFyZS10by1wZGYnXG5cdFx0XHRcdCQoJ2JvZHknKS5maW5kKCcjb3ZlcmxheScpLnJlbW92ZUNsYXNzICdyZW5kZXJpbmctcGRmJ1xuXHRcdFx0XG5cdFx0XHRzZXRUaW1lb3V0IGRlZmZlciwgMzAwXG5cdFx0XHQjIDwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBFTkQgUkVOREVSSU5HIE9OIENMSUVOVFNJREUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0+XG5cblxuXG4iXX0=