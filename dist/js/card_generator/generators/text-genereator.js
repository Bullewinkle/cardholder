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
      if (app.CardGenerator.renderingPDF) {
        textBlockOptions = {
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
          info: {
            fontSize: '2.4em',
            color: '#000',
            textBaseline: 'middle',
            lineWidth: 1.5,
            lineHeight: 36
          }
        };
      } else {
        textBlockOptions = {
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
          info: {
            fontSize: '0.8em',
            color: '#000',
            textBaseline: 'middle',
            lineWidth: 1.5,
            lineHeight: 18
          }
        };
      }
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
          context.font = "" + textBlockOptions.info.fontSize + " " + font;
          if (textAlign === 'right') {
            x -= textBlockOptions.margin.left;
          }
          y += paragraphHeight;
          wrapText(context, "тел.: " + phone, x, y, canvas.width - (textBlockOptions.margin.left + textBlockOptions.margin.right), textBlockOptions.info.lineHeight);
          y += textBlockOptions.info.lineHeight;
          wrapText(context, "email: " + eMail, x, y, canvas.width - (textBlockOptions.margin.left + textBlockOptions.margin.right), textBlockOptions.info.lineHeight);
          y += textBlockOptions.info.lineHeight;
          if (textAlign === 'right') {
            x += textBlockOptions.margin.left;
          }
          wrapText(context, position, x, y, canvas.width - (textBlockOptions.margin.left + textBlockOptions.margin.right), textBlockOptions.info.lineHeight);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL2dlbmVyYXRvcnMvdGV4dC1nZW5lcmVhdG9yLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsa0JBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxrQ0FBWixFQUFnRCxTQUFDLE9BQUQsRUFBVSxHQUFWLEVBQWUsUUFBZixFQUF5QixVQUF6QixFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxHQUFBO0FBQy9DLElBQUEsSUFBQyxDQUFBLElBQUQsR0FBUSxTQUFBLEdBQUE7QUFFUCxVQUFBLDBPQUFBO0FBQUEsTUFGUSx1QkFBTyxzQkFBTSw4REFFckIsQ0FBQTtBQUFBLE1BQUEsT0FBQSxHQUFVLGNBQWMsQ0FBQyxPQUF6QixDQUFBO0FBQUEsTUFDQSxPQUFPLENBQUMsVUFBUixHQUFxQixDQUFDLE1BQUQsRUFBUSxRQUFSLEVBQWlCLE9BQWpCLENBRHJCLENBQUE7QUFBQSxNQUVBLFNBQUEsR0FBWSxPQUFPLENBQUMsU0FGcEIsQ0FBQTtBQUFBLE1BR0EsV0FBQSxHQUFjLEtBQUssQ0FBQyxHQUFOLENBQVUsb0JBQVYsQ0FIZCxDQUFBO0FBQUEsTUFJQSxRQUFBLEdBQVcsS0FBSyxDQUFDLEdBQU4sQ0FBVSxNQUFWLENBSlgsQ0FBQTtBQUFBLE1BT0EsSUFBQSxHQUFPLFFBQVEsQ0FBQyxJQVBoQixDQUFBO0FBQUEsTUFRQSxPQUFBLEdBQVUsUUFBUSxDQUFDLE9BUm5CLENBQUE7QUFBQSxNQVNBLEdBQUEsR0FBTSxRQUFRLENBQUMsR0FUZixDQUFBO0FBQUEsTUFVQSxLQUFBLEdBQVEsUUFBUSxDQUFDLEtBVmpCLENBQUE7QUFBQSxNQVdBLEtBQUEsR0FBUSxRQUFRLENBQUMsS0FYakIsQ0FBQTtBQUFBLE1BWUEsUUFBQSxHQUFXLFFBQVEsQ0FBQyxRQVpwQixDQUFBO0FBQUEsTUFlQSxTQUFBLEdBQVksV0FBVyxDQUFDLFNBZnhCLENBQUE7QUFBQSxNQWdCQSxV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QVNBLElBQUEsR0FBTyxHQUFQLEdBQWEsUUFYSTtJQUFBLEVBNUw2QjtFQUFBLENBQWhELENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZ2VuZXJhdG9yL2dlbmVyYXRvcnMvdGV4dC1nZW5lcmVhdG9yLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRHZW5lcmF0b3IuZ2VuZXJhdG9ycy50ZXh0R2VuJywgKFRleHRHZW4sIGFwcCwgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cdEBkcmF3ID0gKGNhbnZhcyxtb2RlbCxhcmdzLi4uKSAtPlxuXHRcdCMgZ2V0IGN1cnJlbnQgdGV4dCBwdGlvbnMgYW5kIGNhcmQgaW5mbyBmcm9tIG1vZGVsXG5cdFx0c3JjRGF0YSA9IGRhdGFGcm9tU2VydmVyLmFwcERhdGFcblx0XHRzcmNEYXRhLnRleHRBbGlnbnMgPSBbJ2xlZnQnLCdjZW50ZXInLCdyaWdodCddXG5cdFx0Zm9udHNMaXN0ID0gc3JjRGF0YS5mb250c0xpc3Rcblx0XHR0ZXh0T3B0aW9ucyA9IG1vZGVsLmdldCAnZ2VuZXJhdG9ycy50ZXh0R2VuJ1xuXHRcdGNhcmREYXRhID0gbW9kZWwuZ2V0ICdkYXRhJ1xuXHRcdFxuXHRcdCMgY2FyZCBpbmZvXG5cdFx0bmFtZSA9IGNhcmREYXRhLm5hbWVcblx0XHRzdXJuYW1lID0gY2FyZERhdGEuc3VybmFtZVxuXHRcdHNleCA9IGNhcmREYXRhLnNleFxuXHRcdHBob25lID0gY2FyZERhdGEucGhvbmVcblx0XHRlTWFpbCA9IGNhcmREYXRhLmVNYWlsXG5cdFx0cG9zaXRpb24gPSBjYXJkRGF0YS5wb3NpdGlvblxuXHRcdFxuXHRcdCMgdGV4dCBwdGlvbnNcblx0XHR0ZXh0QWxpZ24gPSB0ZXh0T3B0aW9ucy50ZXh0QWxpZ25cblx0XHRmb250RmFtaWx5ID0gdGV4dE9wdGlvbnMuZm9udEZhbWlseVxuXG5cdFx0aWYgYXBwLkNhcmRHZW5lcmF0b3IucmVuZGVyaW5nUERGXG5cdFx0XHR0ZXh0QmxvY2tPcHRpb25zID0gXG5cdFx0XHRcdG1hcmdpbjpcblx0XHRcdFx0XHR0b3A6IDgwXG5cdFx0XHRcdFx0bGVmdDogMzBcblx0XHRcdFx0XHRib3R0b206IDBcblx0XHRcdFx0XHRyaWdodDogMzBcblxuXHRcdFx0XHR0aXRsZTpcblx0XHRcdFx0XHRmb250U2l6ZTogJzZlbSdcblx0XHRcdFx0XHRjb2xvcjogJyMwMDAnXG5cdFx0XHRcdFx0dGV4dEJhc2VsaW5lOiAnbWlkZGxlJyBcblx0XHRcdFx0XHRsaW5lV2lkdGg6IDEuNVxuXHRcdFx0XHRcdGxpbmVIZWlnaHQ6IDc0XG5cdFx0XHRcdFxuXHRcdFx0XHRpbmZvOlxuXHRcdFx0XHRcdGZvbnRTaXplOiAnMi40ZW0nXG5cdFx0XHRcdFx0Y29sb3I6ICcjMDAwJ1xuXHRcdFx0XHRcdHRleHRCYXNlbGluZTogJ21pZGRsZScgXG5cdFx0XHRcdFx0bGluZVdpZHRoOiAxLjVcblx0XHRcdFx0XHRsaW5lSGVpZ2h0OiAzNlxuXHRcdGVsc2Vcblx0XHRcdHRleHRCbG9ja09wdGlvbnMgPSBcblx0XHRcdFx0XHRtYXJnaW46XG5cdFx0XHRcdFx0XHR0b3A6IDMwXG5cdFx0XHRcdFx0XHRsZWZ0OiAyMFxuXHRcdFx0XHRcdFx0Ym90dG9tOiAwXG5cdFx0XHRcdFx0XHRyaWdodDogMjBcblxuXHRcdFx0XHRcdHRpdGxlOlxuXHRcdFx0XHRcdFx0Zm9udFNpemU6ICcxLjVlbSdcblx0XHRcdFx0XHRcdGNvbG9yOiAnIzAwMCdcblx0XHRcdFx0XHRcdHRleHRCYXNlbGluZTogJ21pZGRsZScgXG5cdFx0XHRcdFx0XHRsaW5lV2lkdGg6IDEuNVxuXHRcdFx0XHRcdFx0bGluZUhlaWdodDogMjhcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRpbmZvOlxuXHRcdFx0XHRcdFx0Zm9udFNpemU6ICcwLjhlbSdcblx0XHRcdFx0XHRcdGNvbG9yOiAnIzAwMCdcblx0XHRcdFx0XHRcdHRleHRCYXNlbGluZTogJ21pZGRsZScgXG5cdFx0XHRcdFx0XHRsaW5lV2lkdGg6IDEuNVxuXHRcdFx0XHRcdFx0bGluZUhlaWdodDogMThcblxuXG5cdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG5cblx0XHRyZW5kZXJUZXh0ID0gKGZvbnRGYW1pbHkpID0+XG5cdFx0XHRpZiBmb250RmFtaWx5IGlzICdzYW5zLXNlcmlmJ1xuXHRcdFx0XHRmb250ID0gZm9udEZhbWlseVxuXHRcdFx0ZWxzZSBcblx0XHRcdFx0Zm9udCA9ICdcIicrZm9udEZhbWlseSsnXCInXG5cdFx0XHRzd2l0Y2ggdGV4dEFsaWduXG5cdFx0XHRcdHdoZW4gJ2xlZnQnXG5cdFx0XHRcdFx0eCA9IHRleHRCbG9ja09wdGlvbnMubWFyZ2luLmxlZnRcblx0XHRcdFx0XHR5ID0gdGV4dEJsb2NrT3B0aW9ucy5tYXJnaW4udG9wXG5cdFx0XHRcdHdoZW4gJ2NlbnRlcicgXG5cdFx0XHRcdFx0eCA9IGNhbnZhcy53aWR0aC8yXG5cdFx0XHRcdFx0eSA9IHRleHRCbG9ja09wdGlvbnMubWFyZ2luLnRvcFxuXHRcdFx0XHR3aGVuICdyaWdodCdcblx0XHRcdFx0XHR4ID0gY2FudmFzLndpZHRoLXRleHRCbG9ja09wdGlvbnMubWFyZ2luLnJpZ2h0XG5cdFx0XHRcdFx0eSA9IHRleHRCbG9ja09wdGlvbnMubWFyZ2luLnRvcFxuXHRcdFx0cGFyYWdyYXBoSGVpZ2h0ID0gMFxuXHRcdFx0XG5cdFx0XHR3cmFwVGV4dCA9IChjb250ZXh0LCB0ZXh0LCB4LCB5LCBtYXhXaWR0aCwgbGluZUhlaWdodCkgLT5cblx0XHRcdFx0d29yZHMgPSB0ZXh0LnNwbGl0KCcgJylcblx0XHRcdFx0bGluZSA9ICcnXG5cdFx0XHRcdGxpbmVzQ291bnRlciA9IDBcblx0XHRcdFx0Zm9yIHdvcmQgaW4gd29yZHNcblx0XHRcdFx0XHQjIGNvbnNvbGUubG9nIHdvcmQsX2lcblx0XHRcdFx0XHRsaW5lc0NvdW50ZXIgPSBfaSsxXG5cdFx0XHRcdFx0dGVzdExpbmUgPSBsaW5lICsgd29yZCArICcgJ1xuXHRcdFx0XHRcdG1ldHJpY3MgPSBjb250ZXh0Lm1lYXN1cmVUZXh0KHRlc3RMaW5lKVxuXHRcdFx0XHRcdHRlc3RXaWR0aCA9IG1ldHJpY3Mud2lkdGhcblx0XHRcdFx0XHRpZiAgdGVzdFdpZHRoID4gbWF4V2lkdGggYW5kIF9pID4gMFxuXHRcdFx0XHRcdFx0Y29udGV4dC5maWxsVGV4dChsaW5lLCB4LCB5KVxuXHRcdFx0XHRcdFx0bGluZSA9IHdvcmQgKyAnICdcblx0XHRcdFx0XHRcdHkgKz0gbGluZUhlaWdodFxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGxpbmUgPSB0ZXN0TGluZVxuXHRcdFx0XHRcdHBhcmFncmFwaEhlaWdodCA9IHlcblx0XHRcdFx0Y29udGV4dC5maWxsVGV4dChsaW5lLCB4LCB5KVxuXG5cdFx0XHRjb250ZXh0LmZvbnQgPSBcIiN7IHRleHRCbG9ja09wdGlvbnMudGl0bGUuZm9udFNpemUgfSAjeyBmb250IH1cIlxuXHRcdFx0Y29udGV4dC50ZXh0QWxpZ24gPSB0ZXh0QWxpZ25cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gdGV4dEJsb2NrT3B0aW9ucy50aXRsZS5jb2xvclxuXHRcdFx0Y29udGV4dC50ZXh0QmFzZWxpbmUgPSB0ZXh0QmxvY2tPcHRpb25zLnRpdGxlLnRleHRCYXNlbGluZVxuXHRcdFx0Y29udGV4dC5saW5lV2lkdGggPSB0ZXh0QmxvY2tPcHRpb25zLnRpdGxlLmxpbmVXaWR0aFxuXG5cdFx0XHR3cmFwVGV4dCBjb250ZXh0ICwgQHJlbmRlckluaXRpYWxzKHNleCwgbmFtZSwgc3VybmFtZSksIHgsIHksIGNhbnZhcy53aWR0aC0odGV4dEJsb2NrT3B0aW9ucy5tYXJnaW4ubGVmdCt0ZXh0QmxvY2tPcHRpb25zLm1hcmdpbi5yaWdodCksIHRleHRCbG9ja09wdGlvbnMudGl0bGUubGluZUhlaWdodFxuXG5cdFx0XHRjb250ZXh0LmZvbnQgPSBcIiN7IHRleHRCbG9ja09wdGlvbnMuaW5mby5mb250U2l6ZSB9ICN7IGZvbnQgfVwiXG5cdFx0XHQjIGNvbnNvbGUubG9nICdjYXJkIOKElicgKyBtb2RlbC5nZXQoJ2lkJykgKyAnIDogJyArIGZvbnQuc3BsaXQoJ1wiJykuam9pbignJylcblx0XHRcdGlmIHRleHRBbGlnbiBpcyAncmlnaHQnIHRoZW4geC09dGV4dEJsb2NrT3B0aW9ucy5tYXJnaW4ubGVmdFxuXHRcdFx0eSs9IHBhcmFncmFwaEhlaWdodFxuXG5cdFx0XHQjIGNvbnRleHQuZmlsbFRleHQgXCLRgtC10LsuOiAje3Bob25lfVwiLCB4LCB5XG5cdFx0XHR3cmFwVGV4dCBjb250ZXh0LCBcItGC0LXQuy46ICN7cGhvbmV9XCIsIHgsIHksIGNhbnZhcy53aWR0aC0odGV4dEJsb2NrT3B0aW9ucy5tYXJnaW4ubGVmdCt0ZXh0QmxvY2tPcHRpb25zLm1hcmdpbi5yaWdodCksIHRleHRCbG9ja09wdGlvbnMuaW5mby5saW5lSGVpZ2h0XG5cdFx0XHR5Kz0gdGV4dEJsb2NrT3B0aW9ucy5pbmZvLmxpbmVIZWlnaHRcblxuXHRcdFx0IyBjb250ZXh0LmZpbGxUZXh0IFwiZW1haWw6ICN7ZU1haWx9XCIsIHgsIHlcblx0XHRcdHdyYXBUZXh0IGNvbnRleHQsIFwiZW1haWw6ICN7ZU1haWx9XCIsIHgsIHksIGNhbnZhcy53aWR0aC0odGV4dEJsb2NrT3B0aW9ucy5tYXJnaW4ubGVmdCt0ZXh0QmxvY2tPcHRpb25zLm1hcmdpbi5yaWdodCksIHRleHRCbG9ja09wdGlvbnMuaW5mby5saW5lSGVpZ2h0XG5cdFx0XHR5Kz0gdGV4dEJsb2NrT3B0aW9ucy5pbmZvLmxpbmVIZWlnaHRcblxuXHRcdFx0aWYgdGV4dEFsaWduIGlzICdyaWdodCcgdGhlbiB4Kz10ZXh0QmxvY2tPcHRpb25zLm1hcmdpbi5sZWZ0XG5cdFx0XHR3cmFwVGV4dCBjb250ZXh0ICwgcG9zaXRpb24sIHgsIHksIGNhbnZhcy53aWR0aC0odGV4dEJsb2NrT3B0aW9ucy5tYXJnaW4ubGVmdCt0ZXh0QmxvY2tPcHRpb25zLm1hcmdpbi5yaWdodCksIHRleHRCbG9ja09wdGlvbnMuaW5mby5saW5lSGVpZ2h0XG5cblx0XHRcdGNvbnRleHQuc2F2ZSgpXG5cblx0XHQjIGdlbmVyYXRlUmFuZG9tQ2FyZEluZm9cdFx0XHRcdFxuXHRcdCMgZ2VuZXJhdGVSYW5kb21DYXJkSW5mbyA9IChjYXJkRGF0YSkgLT5cblxuXG5cdFx0aWYgY2FyZERhdGEuaXNEZWZhdWx0IG9yIHRleHRPcHRpb25zLmlzRGVmYXVsdFxuXHRcdFx0I2dlbmVyYXRlIG5ldyByYW5kb20gY2FyZERhdGFcblx0XHRcdHJhbmRvbUNhcmREYXRhID1cblx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHQjbG9jYWwgdmFyaWFibGVzXG5cdFx0XHRyYW5kb21OYW1lTnVtID0gYXBwLmdldFJhbmRvbSgwLCBzcmNEYXRhLm5hbWVzLmxlbmd0aC0xIClcblx0XHRcdHJhbmRvbVBob25lRW5kID0gYXBwLmdldFJhbmRvbSgwLCBzcmNEYXRhLm5hbWVzLmxlbmd0aC0xIClcblx0XHRcdHJhbmRvbVBob25lRW5kID0gJzAnICsgcmFuZG9tUGhvbmVFbmQgaWYgKCcnKyByYW5kb21QaG9uZUVuZCkubGVuZ3RoIDwgMiBcblx0XHRcdCNlbmQgbG9jYWwgdmFyaWFibGVzXG5cblx0XHRcdHJhbmRvbUNhcmREYXRhLnNleCA9IHNyY0RhdGEubmFtZXNbIHJhbmRvbU5hbWVOdW0gXS5zZXhcblx0XHRcdHJhbmRvbUNhcmREYXRhLm5hbWUgPSAgc3JjRGF0YS5uYW1lc1sgcmFuZG9tTmFtZU51bSBdLnRleHRcblx0XHRcdHJhbmRvbUNhcmREYXRhLnN1cm5hbWUgPSAgc3JjRGF0YS5zdXJuYW1lc1sgYXBwLmdldFJhbmRvbSgwLCBzcmNEYXRhLnN1cm5hbWVzLmxlbmd0aC0xICkgXVxuXHRcdFx0cmFuZG9tQ2FyZERhdGEuZU1haWwgPSAgc3JjRGF0YS5lbWFpbHNbIGFwcC5nZXRSYW5kb20oMCwgc3JjRGF0YS5lbWFpbHMubGVuZ3RoLTEgKSBdXG5cdFx0XHRyYW5kb21DYXJkRGF0YS5wb3NpdGlvbiA9ICBzcmNEYXRhLnBvc2l0aW9uc1sgYXBwLmdldFJhbmRvbSgwLCBzcmNEYXRhLnBvc2l0aW9ucy5sZW5ndGgtMSApIF1cblx0XHRcdHJhbmRvbUNhcmREYXRhLnBob25lID0gJys3LScgKyBzcmNEYXRhLnBob25lcyArIHJhbmRvbVBob25lRW5kXG5cblx0XHRcdCNzZXQgbmV3IHJhbmRvbSBjYXJkRGF0YSB0byBtb2RlbFxuXHRcdFx0bW9kZWwuc2V0ICdkYXRhJywgcmFuZG9tQ2FyZERhdGEsXG5cdFx0XHRcdHNpbGVudDogdHJ1ZVxuXG5cdFx0XHQjZ2VuZXJhdGUgbmV3IHJhbmRvbSB0ZXh0IG9wdGlvbnNcblx0XHRcdHJhbmRvbVRleHRPcHRpb25zID1cblx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRyYW5kb21UZXh0T3B0aW9ucy50ZXh0QWxpZ24gPSBzcmNEYXRhLnRleHRBbGlnbnNbYXBwLmdldFJhbmRvbSgwLHNyY0RhdGEudGV4dEFsaWducy5sZW5ndGgtMSldXG5cdFx0XHQjIHJhbmRvbVRleHRPcHRpb25zLmZvbnRGYW1pbHkgPSAnJysgZm9udHNMaXN0WyBhcHAuZ2V0UmFuZG9tKDAsIGZvbnRzTGlzdC5sZW5ndGgtMSkgXVxuXHRcdFx0cmFuZG9tVGV4dE9wdGlvbnMuZm9udEZhbWlseSA9IGZvbnRGYW1pbHlcblxuXG5cdFx0XHQjICMgTG9hZCBmb250cyBkaW5hbWljYWx5IHRocm91Z2ggZ29vZ2xlIHdlYiBsb2FkZXJcblx0XHRcdCMgV2ViRm9udC5sb2FkXG5cdFx0XHQjIFx0Y3VzdG9tOlxuXHRcdFx0IyBcdFx0ZmFtaWxpZXM6IFtyYW5kb21UZXh0T3B0aW9ucy5mb250RmFtaWx5XVxuXHRcdFx0IyBcdFx0dXJsczogWycvYXNzZXRzL2ZvbnQvY2FyZF9mb250cy8nICsgcmFuZG9tVGV4dE9wdGlvbnMuZm9udEZhbWlseSArICcvJyArIHJhbmRvbVRleHRPcHRpb25zLmZvbnRGYW1pbHkgKyAnLmNzcyddXG5cdFx0XHQjIFx0Zm9udGxvYWRpbmc6ICA9PlxuXHRcdFx0IyBcdFx0IyBjb25zb2xlLmxvZyAnZm9udGxvYWRpbmc6XFx0JywgYXJndW1lbnRzXG5cdFx0XHQjIFx0Zm9udGFjdGl2ZTogKGZvbnRGYW1pbHksIGZvbnRPcHRpb25zKSAgPT5cblx0XHRcdCMgXHRcdCMgY29uc29sZS5pbmZvICdmb250YWN0aXZlOlxcdCBcXHQnLCBmb250RmFtaWx5LCBAXG5cdFx0XHQjIFx0XHRAZHJhdyhjYW52YXMsIG1vZGVsKVxuXHRcdFx0IyBcdGZvbnRpbmFjdGl2ZTogID0+XG5cdFx0XHQjIFx0XHQjIGNvbnNvbGUud2FybiAnZm9udGluYWN0aXZlOlxcdCBcXHQnLCBhcmd1bWVudHNcblx0XHRcdCMgXHRcdEBkcmF3KGNhbnZhcywgbW9kZWwpXG5cdFx0XHRcblx0XHRcdCNzZXQgbmV3IHJhbmRvbSB0ZXh0IG9wdGlvbnMgdG8gbW9kZWxcblx0XHRcdG1vZGVsLnNldCAnZ2VuZXJhdG9ycy50ZXh0R2VuJywgcmFuZG9tVGV4dE9wdGlvbnMsXG5cdFx0XHRcdHNpbGVudDogdHJ1ZVxuXG5cdFx0XHRAZHJhdyhjYW52YXMsIG1vZGVsKVxuXG5cdFx0ZWxzZSBcblx0XHRcdHJlbmRlclRleHQoZm9udEZhbWlseSlcblxuXG5cdEByZW5kZXJJbml0aWFscyA9IChzZXgsIG5hbWUsIHN1cm5hbWUpIC0+XG5cblx0XHRpZiBzZXggaXMgJ21hbGUnXG5cdFx0XHRzdXJuYW1lID0gc3VybmFtZVxuXG5cdFx0ZWxzZSBpZiBzZXggaXMgJ2ZlbWFsZSdcblx0XHRcdGlmIHN1cm5hbWUuc3Vic3RyKHN1cm5hbWUubGVuZ3RoLTIsc3VybmFtZS5sZW5ndGgpIGlzICfQuNC5J1xuXHRcdFx0XHRzdXJuYW1lID0gc3VybmFtZS5zbGljZSgwLHN1cm5hbWUubGVuZ3RoLTIpXG5cdFx0XHRcdHN1cm5hbWUgPSBzdXJuYW1lKyfQsNGPJ1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzdXJuYW1lID0gc3VybmFtZSsnYScgXG5cdFx0bmFtZSArICcgJyArIHN1cm5hbWVcdFx0XHRcbiJdfQ==