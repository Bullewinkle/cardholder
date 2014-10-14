(function() {
  var __slice = [].slice;

  this.app.module('CardGenerator.generators.textGen', function(TextGen, app, Backbone, Marionette, $, _) {
    this.draw = function() {
      var args, canvas, cardData, context, eMail, fontFamily, fontsList, model, name, phone, position, randomCardData, randomNameNum, randomPhoneEnd, randomTextOptions, renderText, sex, srcData, surname, textAlign, textBlockOptions, textOptions;
      canvas = arguments[0], model = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      srcData = dataFromServer.appData;
      srcData.textAligns = ['left', 'center', 'right'];
      fontsList = srcData.fontsList;
      textOptions = model.get('generators.textGen');
      cardData = model.get('data');
      name = cardData.name;
      surname = cardData.surname;
      sex = cardData.sex;
      phone = cardData.phone;
      eMail = cardData.eMail;
      position = cardData.position;
      textAlign = textOptions.textAlign;
      fontFamily = textOptions.fontFamily;
      textBlockOptions = !app.CardGenerator.renderingPDF ? {
        margin: {
          top: 30,
          left: 20,
          bottom: 0,
          right: 20
        },
        title: {
          fontSize: '1.5em',
          color: '#000',
          textBaseline: 'middle',
          lineWidth: 1.5,
          lineHeight: 28
        },
        body: {
          fontSize: '0.8em',
          color: '#000',
          textBaseline: 'middle',
          lineWidth: 1.5,
          lineHeight: 18
        }
      } : {
        margin: {
          top: 80,
          left: 30,
          bottom: 0,
          right: 30
        },
        title: {
          fontSize: '6em',
          color: '#000',
          textBaseline: 'middle',
          lineWidth: 1.5,
          lineHeight: 74
        },
        body: {
          fontSize: '2.4em',
          color: '#000',
          textBaseline: 'middle',
          lineWidth: 1.5,
          lineHeight: 36
        }
      };
      context = canvas.getContext('2d');
      renderText = (function(_this) {
        return function(fontFamily) {
          var font, paragraphHeight, wrapText, x, y;
          if (fontFamily === 'sans-serif') {
            font = fontFamily;
          } else {
            font = '"' + fontFamily + '"';
          }
          switch (textAlign) {
            case 'left':
              x = textBlockOptions.margin.left;
              y = textBlockOptions.margin.top;
              break;
            case 'center':
              x = canvas.width / 2;
              y = textBlockOptions.margin.top;
              break;
            case 'right':
              x = canvas.width - textBlockOptions.margin.right;
              y = textBlockOptions.margin.top;
          }
          paragraphHeight = 0;
          wrapText = function(context, text, x, y, maxWidth, lineHeight) {
            var line, linesCounter, metrics, testLine, testWidth, word, words, _i, _len;
            words = text.split(' ');
            line = '';
            linesCounter = 0;
            for (_i = 0, _len = words.length; _i < _len; _i++) {
              word = words[_i];
              linesCounter = _i + 1;
              testLine = line + word + ' ';
              metrics = context.measureText(testLine);
              testWidth = metrics.width;
              if (testWidth > maxWidth && _i > 0) {
                context.fillText(line, x, y);
                line = word + ' ';
                y += lineHeight;
              } else {
                line = testLine;
              }
              paragraphHeight = y;
            }
            return context.fillText(line, x, y);
          };
          context.font = "" + textBlockOptions.title.fontSize + " " + font;
          context.textAlign = textAlign;
          context.fillStyle = textBlockOptions.title.color;
          context.textBaseline = textBlockOptions.title.textBaseline;
          context.lineWidth = textBlockOptions.title.lineWidth;
          wrapText(context, _this.renderInitials(sex, name, surname), x, y, canvas.width - (textBlockOptions.margin.left + textBlockOptions.margin.right), textBlockOptions.title.lineHeight);
          context.font = "" + textBlockOptions.body.fontSize + " " + font;
          if (textAlign === 'right') {
            x -= textBlockOptions.margin.left;
          }
          y += paragraphHeight;
          wrapText(context, "тел.: " + phone, x, y, canvas.width - (textBlockOptions.margin.left + textBlockOptions.margin.right), textBlockOptions.body.lineHeight);
          y += textBlockOptions.body.lineHeight;
          wrapText(context, "email: " + eMail, x, y, canvas.width - (textBlockOptions.margin.left + textBlockOptions.margin.right), textBlockOptions.body.lineHeight);
          y += textBlockOptions.body.lineHeight;
          if (textAlign === 'right') {
            x += textBlockOptions.margin.left;
          }
          wrapText(context, position, x, y, canvas.width - (textBlockOptions.margin.left + textBlockOptions.margin.right), textBlockOptions.body.lineHeight);
          return context.save();
        };
      })(this);
      if (cardData.isDefault || textOptions.isDefault) {
        randomCardData = {
          isDefault: false
        };
        randomNameNum = app.getRandom(0, srcData.names.length - 1);
        randomPhoneEnd = app.getRandom(0, srcData.names.length - 1);
        if (('' + randomPhoneEnd).length < 2) {
          randomPhoneEnd = '0' + randomPhoneEnd;
        }
        randomCardData.sex = srcData.names[randomNameNum].sex;
        randomCardData.name = srcData.names[randomNameNum].text;
        randomCardData.surname = srcData.surnames[app.getRandom(0, srcData.surnames.length - 1)];
        randomCardData.eMail = srcData.emails[app.getRandom(0, srcData.emails.length - 1)];
        randomCardData.position = srcData.positions[app.getRandom(0, srcData.positions.length - 1)];
        randomCardData.phone = '+7-' + srcData.phones + randomPhoneEnd;
        model.set('data', randomCardData, {
          silent: true
        });
        randomTextOptions = {
          isDefault: false
        };
        randomTextOptions.textAlign = srcData.textAligns[app.getRandom(0, srcData.textAligns.length - 1)];
        randomTextOptions.fontFamily = fontFamily;
        model.set('generators.textGen', randomTextOptions, {
          silent: true
        });
        return this.draw(canvas, model);
      } else {
        return renderText(fontFamily);
      }
    };
    return this.renderInitials = function(sex, name, surname) {
      if (sex === 'male') {
        surname = surname;
      } else if (sex === 'female') {
        if (surname.substr(surname.length - 2, surname.length) === 'ий') {
          surname = surname.slice(0, surname.length - 2);
          surname = surname + 'ая';
        } else {
          surname = surname + 'a';
        }
      }
      return name + ' ' + surname;
    };
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL2dlbmVyYXRvcnMvdGV4dC1nZW5lcmVhdG9yLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsa0JBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxrQ0FBWixFQUFnRCxTQUFDLE9BQUQsRUFBVSxHQUFWLEVBQWUsUUFBZixFQUF5QixVQUF6QixFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxHQUFBO0FBQy9DLElBQUEsSUFBQyxDQUFBLElBQUQsR0FBUSxTQUFBLEdBQUE7QUFFUCxVQUFBLDBPQUFBO0FBQUEsTUFGUSx1QkFBTyxzQkFBTSw4REFFckIsQ0FBQTtBQUFBLE1BQUEsT0FBQSxHQUFVLGNBQWMsQ0FBQyxPQUF6QixDQUFBO0FBQUEsTUFDQSxPQUFPLENBQUMsVUFBUixHQUFxQixDQUFDLE1BQUQsRUFBUSxRQUFSLEVBQWlCLE9BQWpCLENBRHJCLENBQUE7QUFBQSxNQUVBLFNBQUEsR0FBWSxPQUFPLENBQUMsU0FGcEIsQ0FBQTtBQUFBLE1BR0EsV0FBQSxHQUFjLEtBQUssQ0FBQyxHQUFOLENBQVUsb0JBQVYsQ0FIZCxDQUFBO0FBQUEsTUFJQSxRQUFBLEdBQVcsS0FBSyxDQUFDLEdBQU4sQ0FBVSxNQUFWLENBSlgsQ0FBQTtBQUFBLE1BT0EsSUFBQSxHQUFPLFFBQVEsQ0FBQyxJQVBoQixDQUFBO0FBQUEsTUFRQSxPQUFBLEdBQVUsUUFBUSxDQUFDLE9BUm5CLENBQUE7QUFBQSxNQVNBLEdBQUEsR0FBTSxRQUFRLENBQUMsR0FUZixDQUFBO0FBQUEsTUFVQSxLQUFBLEdBQVEsUUFBUSxDQUFDLEtBVmpCLENBQUE7QUFBQSxNQVdBLEtBQUEsR0FBUSxRQUFRLENBQUMsS0FYakIsQ0FBQTtBQUFBLE1BWUEsUUFBQSxHQUFXLFFBQVEsQ0FBQyxRQVpwQixDQUFBO0FBQUEsTUFlQSxTQUFBLEdBQVksV0FBVyxDQUFDLFNBZnhCLENBQUE7QUFBQSxNQWdCQSxV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NkI7RUFBQSxDQUFoRCxDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJjYXJkX2dlbmVyYXRvci9nZW5lcmF0b3JzL3RleHQtZ2VuZXJlYXRvci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yLmdlbmVyYXRvcnMudGV4dEdlbicsIChUZXh0R2VuLCBhcHAsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkLCBfKSAtPlxuXHRAZHJhdyA9IChjYW52YXMsbW9kZWwsYXJncy4uLikgLT5cblx0XHQjIGdldCBjdXJyZW50IHRleHQgcHRpb25zIGFuZCBjYXJkIGluZm8gZnJvbSBtb2RlbFxuXHRcdHNyY0RhdGEgPSBkYXRhRnJvbVNlcnZlci5hcHBEYXRhXG5cdFx0c3JjRGF0YS50ZXh0QWxpZ25zID0gWydsZWZ0JywnY2VudGVyJywncmlnaHQnXVxuXHRcdGZvbnRzTGlzdCA9IHNyY0RhdGEuZm9udHNMaXN0XG5cdFx0dGV4dE9wdGlvbnMgPSBtb2RlbC5nZXQgJ2dlbmVyYXRvcnMudGV4dEdlbidcblx0XHRjYXJkRGF0YSA9IG1vZGVsLmdldCAnZGF0YSdcblx0XHRcblx0XHQjIGNhcmQgaW5mb1xuXHRcdG5hbWUgPSBjYXJkRGF0YS5uYW1lXG5cdFx0c3VybmFtZSA9IGNhcmREYXRhLnN1cm5hbWVcblx0XHRzZXggPSBjYXJkRGF0YS5zZXhcblx0XHRwaG9uZSA9IGNhcmREYXRhLnBob25lXG5cdFx0ZU1haWwgPSBjYXJkRGF0YS5lTWFpbFxuXHRcdHBvc2l0aW9uID0gY2FyZERhdGEucG9zaXRpb25cblx0XHRcblx0XHQjIHRleHQgcHRpb25zXG5cdFx0dGV4dEFsaWduID0gdGV4dE9wdGlvbnMudGV4dEFsaWduXG5cdFx0Zm9udEZhbWlseSA9IHRleHRPcHRpb25zLmZvbnRGYW1pbHlcblxuXHRcdHRleHRCbG9ja09wdGlvbnMgPSB1bmxlc3MgYXBwLkNhcmRHZW5lcmF0b3IucmVuZGVyaW5nUERGXG5cdFx0XHRtYXJnaW46XG5cdFx0XHRcdHRvcDogMzBcblx0XHRcdFx0bGVmdDogMjBcblx0XHRcdFx0Ym90dG9tOiAwXG5cdFx0XHRcdHJpZ2h0OiAyMFxuXHRcdFx0dGl0bGU6XG5cdFx0XHRcdGZvbnRTaXplOiAnMS41ZW0nXG5cdFx0XHRcdGNvbG9yOiAnIzAwMCdcblx0XHRcdFx0dGV4dEJhc2VsaW5lOiAnbWlkZGxlJyBcblx0XHRcdFx0bGluZVdpZHRoOiAxLjVcblx0XHRcdFx0bGluZUhlaWdodDogMjhcblx0XHRcdFxuXHRcdFx0Ym9keTpcblx0XHRcdFx0Zm9udFNpemU6ICcwLjhlbSdcblx0XHRcdFx0Y29sb3I6ICcjMDAwJ1xuXHRcdFx0XHR0ZXh0QmFzZWxpbmU6ICdtaWRkbGUnIFxuXHRcdFx0XHRsaW5lV2lkdGg6IDEuNVxuXHRcdFx0XHRsaW5lSGVpZ2h0OiAxOFxuXHRcdGVsc2Vcblx0XHRcdG1hcmdpbjpcblx0XHRcdFx0dG9wOiA4MFxuXHRcdFx0XHRsZWZ0OiAzMFxuXHRcdFx0XHRib3R0b206IDBcblx0XHRcdFx0cmlnaHQ6IDMwXG5cdFx0XHR0aXRsZTpcblx0XHRcdFx0Zm9udFNpemU6ICc2ZW0nXG5cdFx0XHRcdGNvbG9yOiAnIzAwMCdcblx0XHRcdFx0dGV4dEJhc2VsaW5lOiAnbWlkZGxlJyBcblx0XHRcdFx0bGluZVdpZHRoOiAxLjVcblx0XHRcdFx0bGluZUhlaWdodDogNzRcblx0XHRcdGJvZHk6XG5cdFx0XHRcdGZvbnRTaXplOiAnMi40ZW0nXG5cdFx0XHRcdGNvbG9yOiAnIzAwMCdcblx0XHRcdFx0dGV4dEJhc2VsaW5lOiAnbWlkZGxlJyBcblx0XHRcdFx0bGluZVdpZHRoOiAxLjVcblx0XHRcdFx0bGluZUhlaWdodDogMzZcblxuXG5cdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG5cblx0XHRyZW5kZXJUZXh0ID0gKGZvbnRGYW1pbHkpID0+XG5cdFx0XHRpZiBmb250RmFtaWx5IGlzICdzYW5zLXNlcmlmJ1xuXHRcdFx0XHRmb250ID0gZm9udEZhbWlseVxuXHRcdFx0ZWxzZSBcblx0XHRcdFx0Zm9udCA9ICdcIicrZm9udEZhbWlseSsnXCInXG5cdFx0XHRzd2l0Y2ggdGV4dEFsaWduXG5cdFx0XHRcdHdoZW4gJ2xlZnQnXG5cdFx0XHRcdFx0eCA9IHRleHRCbG9ja09wdGlvbnMubWFyZ2luLmxlZnRcblx0XHRcdFx0XHR5ID0gdGV4dEJsb2NrT3B0aW9ucy5tYXJnaW4udG9wXG5cdFx0XHRcdHdoZW4gJ2NlbnRlcicgXG5cdFx0XHRcdFx0eCA9IGNhbnZhcy53aWR0aC8yXG5cdFx0XHRcdFx0eSA9IHRleHRCbG9ja09wdGlvbnMubWFyZ2luLnRvcFxuXHRcdFx0XHR3aGVuICdyaWdodCdcblx0XHRcdFx0XHR4ID0gY2FudmFzLndpZHRoLXRleHRCbG9ja09wdGlvbnMubWFyZ2luLnJpZ2h0XG5cdFx0XHRcdFx0eSA9IHRleHRCbG9ja09wdGlvbnMubWFyZ2luLnRvcFxuXHRcdFx0cGFyYWdyYXBoSGVpZ2h0ID0gMFxuXHRcdFx0XG5cdFx0XHR3cmFwVGV4dCA9IChjb250ZXh0LCB0ZXh0LCB4LCB5LCBtYXhXaWR0aCwgbGluZUhlaWdodCkgLT5cblx0XHRcdFx0d29yZHMgPSB0ZXh0LnNwbGl0KCcgJylcblx0XHRcdFx0bGluZSA9ICcnXG5cdFx0XHRcdGxpbmVzQ291bnRlciA9IDBcblx0XHRcdFx0Zm9yIHdvcmQgaW4gd29yZHNcblx0XHRcdFx0XHQjIGNvbnNvbGUubG9nIHdvcmQsX2lcblx0XHRcdFx0XHRsaW5lc0NvdW50ZXIgPSBfaSsxXG5cdFx0XHRcdFx0dGVzdExpbmUgPSBsaW5lICsgd29yZCArICcgJ1xuXHRcdFx0XHRcdG1ldHJpY3MgPSBjb250ZXh0Lm1lYXN1cmVUZXh0KHRlc3RMaW5lKVxuXHRcdFx0XHRcdHRlc3RXaWR0aCA9IG1ldHJpY3Mud2lkdGhcblx0XHRcdFx0XHRpZiAgdGVzdFdpZHRoID4gbWF4V2lkdGggYW5kIF9pID4gMFxuXHRcdFx0XHRcdFx0Y29udGV4dC5maWxsVGV4dChsaW5lLCB4LCB5KVxuXHRcdFx0XHRcdFx0bGluZSA9IHdvcmQgKyAnICdcblx0XHRcdFx0XHRcdHkgKz0gbGluZUhlaWdodFxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGxpbmUgPSB0ZXN0TGluZVxuXHRcdFx0XHRcdHBhcmFncmFwaEhlaWdodCA9IHlcblx0XHRcdFx0Y29udGV4dC5maWxsVGV4dChsaW5lLCB4LCB5KVxuXG5cdFx0XHRjb250ZXh0LmZvbnQgPSBcIiN7IHRleHRCbG9ja09wdGlvbnMudGl0bGUuZm9udFNpemUgfSAjeyBmb250IH1cIlxuXHRcdFx0Y29udGV4dC50ZXh0QWxpZ24gPSB0ZXh0QWxpZ25cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gdGV4dEJsb2NrT3B0aW9ucy50aXRsZS5jb2xvclxuXHRcdFx0Y29udGV4dC50ZXh0QmFzZWxpbmUgPSB0ZXh0QmxvY2tPcHRpb25zLnRpdGxlLnRleHRCYXNlbGluZVxuXHRcdFx0Y29udGV4dC5saW5lV2lkdGggPSB0ZXh0QmxvY2tPcHRpb25zLnRpdGxlLmxpbmVXaWR0aFxuXG5cdFx0XHR3cmFwVGV4dCBjb250ZXh0ICwgQHJlbmRlckluaXRpYWxzKHNleCwgbmFtZSwgc3VybmFtZSksIHgsIHksIGNhbnZhcy53aWR0aC0odGV4dEJsb2NrT3B0aW9ucy5tYXJnaW4ubGVmdCt0ZXh0QmxvY2tPcHRpb25zLm1hcmdpbi5yaWdodCksIHRleHRCbG9ja09wdGlvbnMudGl0bGUubGluZUhlaWdodFxuXG5cdFx0XHRjb250ZXh0LmZvbnQgPSBcIiN7IHRleHRCbG9ja09wdGlvbnMuYm9keS5mb250U2l6ZSB9ICN7IGZvbnQgfVwiXG5cdFx0XHQjIGNvbnNvbGUubG9nICdjYXJkIOKElicgKyBtb2RlbC5nZXQoJ2lkJykgKyAnIDogJyArIGZvbnQuc3BsaXQoJ1wiJykuam9pbignJylcblx0XHRcdGlmIHRleHRBbGlnbiBpcyAncmlnaHQnIHRoZW4geC09dGV4dEJsb2NrT3B0aW9ucy5tYXJnaW4ubGVmdFxuXHRcdFx0eSs9IHBhcmFncmFwaEhlaWdodFxuXG5cdFx0XHQjIGNvbnRleHQuZmlsbFRleHQgXCLRgtC10LsuOiAje3Bob25lfVwiLCB4LCB5XG5cdFx0XHR3cmFwVGV4dCBjb250ZXh0LCBcItGC0LXQuy46ICN7cGhvbmV9XCIsIHgsIHksIGNhbnZhcy53aWR0aC0odGV4dEJsb2NrT3B0aW9ucy5tYXJnaW4ubGVmdCt0ZXh0QmxvY2tPcHRpb25zLm1hcmdpbi5yaWdodCksIHRleHRCbG9ja09wdGlvbnMuYm9keS5saW5lSGVpZ2h0XG5cdFx0XHR5Kz0gdGV4dEJsb2NrT3B0aW9ucy5ib2R5LmxpbmVIZWlnaHRcblxuXHRcdFx0IyBjb250ZXh0LmZpbGxUZXh0IFwiZW1haWw6ICN7ZU1haWx9XCIsIHgsIHlcblx0XHRcdHdyYXBUZXh0IGNvbnRleHQsIFwiZW1haWw6ICN7ZU1haWx9XCIsIHgsIHksIGNhbnZhcy53aWR0aC0odGV4dEJsb2NrT3B0aW9ucy5tYXJnaW4ubGVmdCt0ZXh0QmxvY2tPcHRpb25zLm1hcmdpbi5yaWdodCksIHRleHRCbG9ja09wdGlvbnMuYm9keS5saW5lSGVpZ2h0XG5cdFx0XHR5Kz0gdGV4dEJsb2NrT3B0aW9ucy5ib2R5LmxpbmVIZWlnaHRcblxuXHRcdFx0aWYgdGV4dEFsaWduIGlzICdyaWdodCcgdGhlbiB4Kz10ZXh0QmxvY2tPcHRpb25zLm1hcmdpbi5sZWZ0XG5cdFx0XHR3cmFwVGV4dCBjb250ZXh0ICwgcG9zaXRpb24sIHgsIHksIGNhbnZhcy53aWR0aC0odGV4dEJsb2NrT3B0aW9ucy5tYXJnaW4ubGVmdCt0ZXh0QmxvY2tPcHRpb25zLm1hcmdpbi5yaWdodCksIHRleHRCbG9ja09wdGlvbnMuYm9keS5saW5lSGVpZ2h0XG5cblx0XHRcdGNvbnRleHQuc2F2ZSgpXG5cblx0XHQjIGdlbmVyYXRlUmFuZG9tQ2FyZEluZm9cdFx0XHRcblx0XHQjIGdlbmVyYXRlUmFuZG9tQ2FyZEluZm8gPSAoY2FyZERhdGEpIC0+XG5cblxuXHRcdGlmIGNhcmREYXRhLmlzRGVmYXVsdCBvciB0ZXh0T3B0aW9ucy5pc0RlZmF1bHRcblx0XHRcdCNnZW5lcmF0ZSBuZXcgcmFuZG9tIGNhcmREYXRhXG5cdFx0XHRyYW5kb21DYXJkRGF0YSA9XG5cdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0I2xvY2FsIHZhcmlhYmxlc1xuXHRcdFx0cmFuZG9tTmFtZU51bSA9IGFwcC5nZXRSYW5kb20oMCwgc3JjRGF0YS5uYW1lcy5sZW5ndGgtMSApXG5cdFx0XHRyYW5kb21QaG9uZUVuZCA9IGFwcC5nZXRSYW5kb20oMCwgc3JjRGF0YS5uYW1lcy5sZW5ndGgtMSApXG5cdFx0XHRyYW5kb21QaG9uZUVuZCA9ICcwJyArIHJhbmRvbVBob25lRW5kIGlmICgnJysgcmFuZG9tUGhvbmVFbmQpLmxlbmd0aCA8IDIgXG5cdFx0XHQjZW5kIGxvY2FsIHZhcmlhYmxlc1xuXG5cdFx0XHRyYW5kb21DYXJkRGF0YS5zZXggPSBzcmNEYXRhLm5hbWVzWyByYW5kb21OYW1lTnVtIF0uc2V4XG5cdFx0XHRyYW5kb21DYXJkRGF0YS5uYW1lID0gIHNyY0RhdGEubmFtZXNbIHJhbmRvbU5hbWVOdW0gXS50ZXh0XG5cdFx0XHRyYW5kb21DYXJkRGF0YS5zdXJuYW1lID0gIHNyY0RhdGEuc3VybmFtZXNbIGFwcC5nZXRSYW5kb20oMCwgc3JjRGF0YS5zdXJuYW1lcy5sZW5ndGgtMSApIF1cblx0XHRcdHJhbmRvbUNhcmREYXRhLmVNYWlsID0gIHNyY0RhdGEuZW1haWxzWyBhcHAuZ2V0UmFuZG9tKDAsIHNyY0RhdGEuZW1haWxzLmxlbmd0aC0xICkgXVxuXHRcdFx0cmFuZG9tQ2FyZERhdGEucG9zaXRpb24gPSAgc3JjRGF0YS5wb3NpdGlvbnNbIGFwcC5nZXRSYW5kb20oMCwgc3JjRGF0YS5wb3NpdGlvbnMubGVuZ3RoLTEgKSBdXG5cdFx0XHRyYW5kb21DYXJkRGF0YS5waG9uZSA9ICcrNy0nICsgc3JjRGF0YS5waG9uZXMgKyByYW5kb21QaG9uZUVuZFxuXG5cdFx0XHQjc2V0IG5ldyByYW5kb20gY2FyZERhdGEgdG8gbW9kZWxcblx0XHRcdG1vZGVsLnNldCAnZGF0YScsIHJhbmRvbUNhcmREYXRhLFxuXHRcdFx0XHRzaWxlbnQ6IHRydWVcblxuXHRcdFx0I2dlbmVyYXRlIG5ldyByYW5kb20gdGV4dCBvcHRpb25zXG5cdFx0XHRyYW5kb21UZXh0T3B0aW9ucyA9XG5cdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0cmFuZG9tVGV4dE9wdGlvbnMudGV4dEFsaWduID0gc3JjRGF0YS50ZXh0QWxpZ25zW2FwcC5nZXRSYW5kb20oMCxzcmNEYXRhLnRleHRBbGlnbnMubGVuZ3RoLTEpXVxuXHRcdFx0IyByYW5kb21UZXh0T3B0aW9ucy5mb250RmFtaWx5ID0gJycrIGZvbnRzTGlzdFsgYXBwLmdldFJhbmRvbSgwLCBmb250c0xpc3QubGVuZ3RoLTEpIF1cblx0XHRcdHJhbmRvbVRleHRPcHRpb25zLmZvbnRGYW1pbHkgPSBmb250RmFtaWx5XG5cblxuXHRcdFx0IyAjIExvYWQgZm9udHMgZGluYW1pY2FseSB0aHJvdWdoIGdvb2dsZSB3ZWIgbG9hZGVyXG5cdFx0XHQjIFdlYkZvbnQubG9hZFxuXHRcdFx0IyBcdGN1c3RvbTpcblx0XHRcdCMgXHRcdGZhbWlsaWVzOiBbcmFuZG9tVGV4dE9wdGlvbnMuZm9udEZhbWlseV1cblx0XHRcdCMgXHRcdHVybHM6IFsnL2Fzc2V0cy9mb250L2NhcmRfZm9udHMvJyArIHJhbmRvbVRleHRPcHRpb25zLmZvbnRGYW1pbHkgKyAnLycgKyByYW5kb21UZXh0T3B0aW9ucy5mb250RmFtaWx5ICsgJy5jc3MnXVxuXHRcdFx0IyBcdGZvbnRsb2FkaW5nOiAgPT5cblx0XHRcdCMgXHRcdCMgY29uc29sZS5sb2cgJ2ZvbnRsb2FkaW5nOlxcdCcsIGFyZ3VtZW50c1xuXHRcdFx0IyBcdGZvbnRhY3RpdmU6IChmb250RmFtaWx5LCBmb250T3B0aW9ucykgID0+XG5cdFx0XHQjIFx0XHQjIGNvbnNvbGUuaW5mbyAnZm9udGFjdGl2ZTpcXHQgXFx0JywgZm9udEZhbWlseSwgQFxuXHRcdFx0IyBcdFx0QGRyYXcoY2FudmFzLCBtb2RlbClcblx0XHRcdCMgXHRmb250aW5hY3RpdmU6ICA9PlxuXHRcdFx0IyBcdFx0IyBjb25zb2xlLndhcm4gJ2ZvbnRpbmFjdGl2ZTpcXHQgXFx0JywgYXJndW1lbnRzXG5cdFx0XHQjIFx0XHRAZHJhdyhjYW52YXMsIG1vZGVsKVxuXHRcdFx0XG5cdFx0XHQjc2V0IG5ldyByYW5kb20gdGV4dCBvcHRpb25zIHRvIG1vZGVsXG5cdFx0XHRtb2RlbC5zZXQgJ2dlbmVyYXRvcnMudGV4dEdlbicsIHJhbmRvbVRleHRPcHRpb25zLFxuXHRcdFx0XHRzaWxlbnQ6IHRydWVcblxuXHRcdFx0QGRyYXcoY2FudmFzLCBtb2RlbClcblxuXHRcdGVsc2UgXG5cdFx0XHRyZW5kZXJUZXh0KGZvbnRGYW1pbHkpXG5cblxuXHRAcmVuZGVySW5pdGlhbHMgPSAoc2V4LCBuYW1lLCBzdXJuYW1lKSAtPlxuXG5cdFx0aWYgc2V4IGlzICdtYWxlJ1xuXHRcdFx0c3VybmFtZSA9IHN1cm5hbWVcblxuXHRcdGVsc2UgaWYgc2V4IGlzICdmZW1hbGUnXG5cdFx0XHRpZiBzdXJuYW1lLnN1YnN0cihzdXJuYW1lLmxlbmd0aC0yLHN1cm5hbWUubGVuZ3RoKSBpcyAn0LjQuSdcblx0XHRcdFx0c3VybmFtZSA9IHN1cm5hbWUuc2xpY2UoMCxzdXJuYW1lLmxlbmd0aC0yKVxuXHRcdFx0XHRzdXJuYW1lID0gc3VybmFtZSsn0LDRjydcblx0XHRcdGVsc2Vcblx0XHRcdFx0c3VybmFtZSA9IHN1cm5hbWUrJ2EnIFxuXHRcdG5hbWUgKyAnICcgKyBzdXJuYW1lXHRcdFx0XG4iXX0=