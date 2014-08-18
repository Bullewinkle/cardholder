(function() {
  var __slice = [].slice;

  this.app.module('CardGenerator.generators.textGen', function(TextGen, app, Backbone, Marionette, $, _) {
    this.draw = function() {
      var args, canvas, cardData, context, eMail, fontFamily, fontsList, model, name, phone, position, randomCardData, randomNameNum, randomPhoneEnd, randomTextOptions, renderText, sex, srcData, surname, textAlign, textOptions;
      canvas = arguments[0], model = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      srcData = app.CardGenerator.data.get('appData');
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
      context = canvas.getContext('2d');
      renderText = (function(_this) {
        return function(fontFamily) {
          var font, paragrafHeight, wrapText, x, y;
          if (fontFamily === 'sans-serif') {
            font = fontFamily;
          } else {
            font = '"' + fontFamily + '"';
          }
          switch (textAlign) {
            case 'left':
              x = 10;
              y = 20;
              break;
            case 'center':
              x = canvas.width / 2;
              y = 20;
              break;
            case 'right':
              x = canvas.width - 10;
              y = 20;
          }
          paragrafHeight = 0;
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
              paragrafHeight = y;
            }
            return context.fillText(line, x, y);
          };
          context.font = '1.5em ' + font;
          context.textAlign = textAlign;
          context.fillStyle = '#000';
          context.textBaseline = 'middle';
          context.lineWidth = 1.5;
          wrapText(context, _this.renderInitials(sex, name, surname), x, y, canvas.width - 20, 28);
          context.font = '0.8em ' + font;
          if (textAlign === 'right') {
            x -= 5;
          }
          context.fillText('тел.: ' + phone, x, 32 + paragrafHeight);
          context.fillText('email: ' + eMail, x, 49 + paragrafHeight);
          if (textAlign === 'right') {
            x += 5;
          }
          wrapText(context, position, x, 66 + paragrafHeight, canvas.width - 20, 18);
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
        randomTextOptions.fontFamily = '' + fontsList[app.getRandom(0, fontsList.length - 1)];
        WebFont.load({
          custom: {
            families: [randomTextOptions.fontFamily],
            urls: ['/assets/font/card_fonts/' + randomTextOptions.fontFamily + '/' + randomTextOptions.fontFamily + '.css']
          },
          fontloading: (function(_this) {
            return function() {};
          })(this),
          fontactive: (function(_this) {
            return function(fontFamily, fontOptions) {
              return _this.draw(canvas, model);
            };
          })(this),
          fontinactive: (function(_this) {
            return function() {
              return _this.draw(canvas, model);
            };
          })(this)
        });
        return model.set('generators.textGen', randomTextOptions, {
          silent: true
        });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9nZW5lcmF0b3JzL3RleHQtZ2VuZXJlYXRvci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLGtCQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksa0NBQVosRUFBZ0QsU0FBQyxPQUFELEVBQVUsR0FBVixFQUFlLFFBQWYsRUFBeUIsVUFBekIsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsR0FBQTtBQUMvQyxJQUFBLElBQUMsQ0FBQSxJQUFELEdBQVEsU0FBQSxHQUFBO0FBRVAsVUFBQSx3TkFBQTtBQUFBLE1BRlEsdUJBQU8sc0JBQU0sOERBRXJCLENBQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUF2QixDQUEyQixTQUEzQixDQUFWLENBQUE7QUFBQSxNQUNBLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLENBQUMsTUFBRCxFQUFRLFFBQVIsRUFBaUIsT0FBakIsQ0FEckIsQ0FBQTtBQUFBLE1BRUEsU0FBQSxHQUFZLE9BQU8sQ0FBQyxTQUZwQixDQUFBO0FBQUEsTUFHQSxXQUFBLEdBQWMsS0FBSyxDQUFDLEdBQU4sQ0FBVSxvQkFBVixDQUhkLENBQUE7QUFBQSxNQUlBLFFBQUEsR0FBVyxLQUFLLENBQUMsR0FBTixDQUFVLE1BQVYsQ0FKWCxDQUFBO0FBQUEsTUFPQSxJQUFBLEdBQU8sUUFBUSxDQUFDLElBUGhCLENBQUE7QUFBQSxNQVFBLE9BQUEsR0FBVSxRQUFRLENBQUMsT0FSbkIsQ0FBQTtBQUFBLE1BU0EsR0FBQSxHQUFNLFFBQVEsQ0FBQyxHQVRmLENBQUE7QUFBQSxNQVVBLEtBQUEsR0FBUSxRQUFRLENBQUMsS0FWakIsQ0FBQTtBQUFBLE1BV0EsS0FBQSxHQUFRLFFBQVEsQ0FBQyxLQVhqQixDQUFBO0FBQUEsTUFZQSxRQUFBLEdBQVcsUUFBUSxDQUFDLFFBWnBCLENBQUE7QUFBQSxNQWVBLFNBQUEs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RUFBQTtVQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FSZjtTQURELENBN0JBLENBQUE7ZUEyQ0EsS0FBSyxDQUFDLEdBQU4sQ0FBVSxvQkFBVixFQUFnQyxpQkFBaEMsRUFDQztBQUFBLFVBQUEsTUFBQSxFQUFRLElBQVI7U0FERCxFQTdDRDtPQUFBLE1BQUE7ZUFpREMsVUFBQSxDQUFXLFVBQVgsRUFqREQ7T0FoRk87SUFBQSxDQUFSLENBQUE7V0FvSUEsSUFBQyxDQUFBLGNBQUQsR0FBa0IsU0FBQyxHQUFELEVBQU0sSUFBTixFQUFZLE9BQVosR0FBQTtBQUVqQixNQUFBLElBQUcsR0FBQSxLQUFPLE1BQVY7QUFDQyxRQUFBLE9BQUEsR0FBVSxPQUFWLENBREQ7T0FBQSxNQUdLLElBQUcsR0FBQSxLQUFPLFFBQVY7QUFDSixRQUFBLElBQUcsT0FBTyxDQUFDLE1BQVIsQ0FBZSxPQUFPLENBQUMsTUFBUixHQUFlLENBQTlCLEVBQWdDLE9BQU8sQ0FBQyxNQUF4QyxDQUFBLEtBQW1ELElBQXREO0FBQ0MsVUFBQSxPQUFBLEdBQVUsT0FBTyxDQUFDLEtBQVIsQ0FBYyxDQUFkLEVBQWdCLE9BQU8sQ0FBQyxNQUFSLEdBQWUsQ0FBL0IsQ0FBVixDQUFBO0FBQUEsVUFDQSxPQUFBLEdBQVUsT0FBQSxHQUFRLElBRGxCLENBREQ7U0FBQSxNQUFBO0FBSUMsVUFBQSxPQUFBLEdBQVUsT0FBQSxHQUFRLEdBQWxCLENBSkQ7U0FESTtPQUhMO2FBU0EsSUFBQSxHQUFPLEdBQVAsR0FBYSxRQVhJO0lBQUEsRUFySTZCO0VBQUEsQ0FBaEQsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZHNfZ2VuZXJhdG9yL2dlbmVyYXRvcnMvdGV4dC1nZW5lcmVhdG9yLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRHZW5lcmF0b3IuZ2VuZXJhdG9ycy50ZXh0R2VuJywgKFRleHRHZW4sIGFwcCwgQmFja2JvbmUsIE1hcmlvbmV0dGUsICQsIF8pIC0+XG5cdEBkcmF3ID0gKGNhbnZhcyxtb2RlbCxhcmdzLi4uKSAtPlxuXHRcdCMgZ2V0IGN1cnJlbnQgdGV4dCBwdGlvbnMgYW5kIGNhcmQgaW5mbyBmcm9tIG1vZGVsXG5cdFx0c3JjRGF0YSA9IGFwcC5DYXJkR2VuZXJhdG9yLmRhdGEuZ2V0ICdhcHBEYXRhJ1xuXHRcdHNyY0RhdGEudGV4dEFsaWducyA9IFsnbGVmdCcsJ2NlbnRlcicsJ3JpZ2h0J11cblx0XHRmb250c0xpc3QgPSBzcmNEYXRhLmZvbnRzTGlzdFxuXHRcdHRleHRPcHRpb25zID0gbW9kZWwuZ2V0ICdnZW5lcmF0b3JzLnRleHRHZW4nXG5cdFx0Y2FyZERhdGEgPSBtb2RlbC5nZXQgJ2RhdGEnXG5cdFx0XG5cdFx0IyBjYXJkIGluZm9cblx0XHRuYW1lID0gY2FyZERhdGEubmFtZVxuXHRcdHN1cm5hbWUgPSBjYXJkRGF0YS5zdXJuYW1lXG5cdFx0c2V4ID0gY2FyZERhdGEuc2V4XG5cdFx0cGhvbmUgPSBjYXJkRGF0YS5waG9uZVxuXHRcdGVNYWlsID0gY2FyZERhdGEuZU1haWxcblx0XHRwb3NpdGlvbiA9IGNhcmREYXRhLnBvc2l0aW9uXG5cdFx0XG5cdFx0IyB0ZXh0IHB0aW9uc1xuXHRcdHRleHRBbGlnbiA9IHRleHRPcHRpb25zLnRleHRBbGlnblxuXHRcdGZvbnRGYW1pbHkgPSB0ZXh0T3B0aW9ucy5mb250RmFtaWx5XG5cblx0XHRjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcblxuXHRcdHJlbmRlclRleHQgPSAoZm9udEZhbWlseSkgPT5cblx0XHRcdGlmIGZvbnRGYW1pbHkgaXMgJ3NhbnMtc2VyaWYnXG5cdFx0XHRcdGZvbnQgPSBmb250RmFtaWx5XG5cdFx0XHRlbHNlIFxuXHRcdFx0XHRmb250ID0gJ1wiJytmb250RmFtaWx5KydcIidcblx0XHRcdHN3aXRjaCB0ZXh0QWxpZ25cblx0XHRcdFx0d2hlbiAnbGVmdCdcblx0XHRcdFx0XHR4ID0gMTBcblx0XHRcdFx0XHR5ID0gMjBcblx0XHRcdFx0d2hlbiAnY2VudGVyJyBcblx0XHRcdFx0XHR4ID0gY2FudmFzLndpZHRoLzJcblx0XHRcdFx0XHR5ID0gMjBcblx0XHRcdFx0d2hlbiAncmlnaHQnXG5cdFx0XHRcdFx0eCA9IGNhbnZhcy53aWR0aC0xMFxuXHRcdFx0XHRcdHkgPSAyMCBcblx0XHRcdHBhcmFncmFmSGVpZ2h0ID0gMFxuXHRcdFx0XG5cdFx0XHR3cmFwVGV4dCA9IChjb250ZXh0LCB0ZXh0LCB4LCB5LCBtYXhXaWR0aCwgbGluZUhlaWdodCkgLT5cblx0XHRcdFx0d29yZHMgPSB0ZXh0LnNwbGl0KCcgJylcblx0XHRcdFx0bGluZSA9ICcnXG5cdFx0XHRcdGxpbmVzQ291bnRlciA9IDBcblx0XHRcdFx0Zm9yIHdvcmQgaW4gd29yZHNcblx0XHRcdFx0XHQjIGNvbnNvbGUubG9nIHdvcmQsX2lcblx0XHRcdFx0XHRsaW5lc0NvdW50ZXIgPSBfaSsxXG5cdFx0XHRcdFx0dGVzdExpbmUgPSBsaW5lICsgd29yZCArICcgJ1xuXHRcdFx0XHRcdG1ldHJpY3MgPSBjb250ZXh0Lm1lYXN1cmVUZXh0KHRlc3RMaW5lKVxuXHRcdFx0XHRcdHRlc3RXaWR0aCA9IG1ldHJpY3Mud2lkdGhcblx0XHRcdFx0XHRpZiAgdGVzdFdpZHRoID4gbWF4V2lkdGggYW5kIF9pID4gMFxuXHRcdFx0XHRcdFx0Y29udGV4dC5maWxsVGV4dChsaW5lLCB4LCB5KVxuXHRcdFx0XHRcdFx0bGluZSA9IHdvcmQgKyAnICdcblx0XHRcdFx0XHRcdHkgKz0gbGluZUhlaWdodFxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGxpbmUgPSB0ZXN0TGluZVxuXHRcdFx0XHRcdHBhcmFncmFmSGVpZ2h0ID0geVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRjb250ZXh0LmZpbGxUZXh0KGxpbmUsIHgsIHkpXG5cdFx0XHRjb250ZXh0LmZvbnQgPSAnMS41ZW0gJyArIGZvbnRcblx0XHRcdGNvbnRleHQudGV4dEFsaWduID0gdGV4dEFsaWduXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwJ1xuXHRcdFx0Y29udGV4dC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJ1xuXHRcdFx0Y29udGV4dC5saW5lV2lkdGggPSAxLjVcblxuXHRcdFx0d3JhcFRleHQgY29udGV4dCAsIEByZW5kZXJJbml0aWFscyhzZXgsIG5hbWUsIHN1cm5hbWUpLCB4LCB5LCBjYW52YXMud2lkdGgtMjAsIDI4XG5cblx0XHRcdGNvbnRleHQuZm9udCA9ICcwLjhlbSAnICsgZm9udFxuXHRcdFx0IyBjb25zb2xlLmxvZyAnY2FyZCDihJYnICsgbW9kZWwuZ2V0KCdpZCcpICsgJyA6ICcgKyBmb250LnNwbGl0KCdcIicpLmpvaW4oJycpXG5cdFx0XHRpZiB0ZXh0QWxpZ24gaXMgJ3JpZ2h0JyB0aGVuIHgtPTVcblx0XHRcdGNvbnRleHQuZmlsbFRleHQgJ9GC0LXQuy46ICcgKyBwaG9uZSwgeCwgMzIgK3BhcmFncmFmSGVpZ2h0XG5cdFx0XHRjb250ZXh0LmZpbGxUZXh0ICdlbWFpbDogJysgZU1haWwsIHgsIDQ5ICtwYXJhZ3JhZkhlaWdodFxuXHRcdFx0aWYgdGV4dEFsaWduIGlzICdyaWdodCcgdGhlbiB4Kz01XG5cdFx0XHR3cmFwVGV4dCBjb250ZXh0ICwgcG9zaXRpb24sIHgsIDY2ICsgcGFyYWdyYWZIZWlnaHQsIGNhbnZhcy53aWR0aC0yMCwgMThcblxuXHRcdFx0Y29udGV4dC5zYXZlKClcblxuXHRcdCMgZ2VuZXJhdGVSYW5kb21DYXJkSW5mb1x0XHRcdFx0XG5cdFx0IyBnZW5lcmF0ZVJhbmRvbUNhcmRJbmZvID0gKGNhcmREYXRhKSAtPlxuXG5cblx0XHRpZiBjYXJkRGF0YS5pc0RlZmF1bHQgb3IgdGV4dE9wdGlvbnMuaXNEZWZhdWx0XG5cdFx0XHQjZ2VuZXJhdGUgbmV3IHJhbmRvbSBjYXJkRGF0YVxuXHRcdFx0cmFuZG9tQ2FyZERhdGEgPVxuXHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdCNsb2NhbCB2YXJpYWJsZXNcblx0XHRcdHJhbmRvbU5hbWVOdW0gPSBhcHAuZ2V0UmFuZG9tKDAsIHNyY0RhdGEubmFtZXMubGVuZ3RoLTEgKVxuXHRcdFx0cmFuZG9tUGhvbmVFbmQgPSBhcHAuZ2V0UmFuZG9tKDAsIHNyY0RhdGEubmFtZXMubGVuZ3RoLTEgKVxuXHRcdFx0cmFuZG9tUGhvbmVFbmQgPSAnMCcgKyByYW5kb21QaG9uZUVuZCBpZiAoJycrIHJhbmRvbVBob25lRW5kKS5sZW5ndGggPCAyIFxuXHRcdFx0I2VuZCBsb2NhbCB2YXJpYWJsZXNcblxuXHRcdFx0cmFuZG9tQ2FyZERhdGEuc2V4ID0gc3JjRGF0YS5uYW1lc1sgcmFuZG9tTmFtZU51bSBdLnNleFxuXHRcdFx0cmFuZG9tQ2FyZERhdGEubmFtZSA9ICBzcmNEYXRhLm5hbWVzWyByYW5kb21OYW1lTnVtIF0udGV4dFxuXHRcdFx0cmFuZG9tQ2FyZERhdGEuc3VybmFtZSA9ICBzcmNEYXRhLnN1cm5hbWVzWyBhcHAuZ2V0UmFuZG9tKDAsIHNyY0RhdGEuc3VybmFtZXMubGVuZ3RoLTEgKSBdXG5cdFx0XHRyYW5kb21DYXJkRGF0YS5lTWFpbCA9ICBzcmNEYXRhLmVtYWlsc1sgYXBwLmdldFJhbmRvbSgwLCBzcmNEYXRhLmVtYWlscy5sZW5ndGgtMSApIF1cblx0XHRcdHJhbmRvbUNhcmREYXRhLnBvc2l0aW9uID0gIHNyY0RhdGEucG9zaXRpb25zWyBhcHAuZ2V0UmFuZG9tKDAsIHNyY0RhdGEucG9zaXRpb25zLmxlbmd0aC0xICkgXVxuXHRcdFx0cmFuZG9tQ2FyZERhdGEucGhvbmUgPSAnKzctJyArIHNyY0RhdGEucGhvbmVzICsgcmFuZG9tUGhvbmVFbmRcblxuXHRcdFx0I3NldCBuZXcgcmFuZG9tIGNhcmREYXRhIHRvIG1vZGVsXG5cdFx0XHRtb2RlbC5zZXQgJ2RhdGEnLCByYW5kb21DYXJkRGF0YSxcblx0XHRcdFx0c2lsZW50OiB0cnVlXG5cblx0XHRcdCNnZW5lcmF0ZSBuZXcgcmFuZG9tIHRleHQgb3B0aW9uc1xuXHRcdFx0cmFuZG9tVGV4dE9wdGlvbnMgPVxuXHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdHJhbmRvbVRleHRPcHRpb25zLnRleHRBbGlnbiA9IHNyY0RhdGEudGV4dEFsaWduc1thcHAuZ2V0UmFuZG9tKDAsc3JjRGF0YS50ZXh0QWxpZ25zLmxlbmd0aC0xKV1cblx0XHRcdHJhbmRvbVRleHRPcHRpb25zLmZvbnRGYW1pbHkgPSAnJysgZm9udHNMaXN0WyBhcHAuZ2V0UmFuZG9tKDAsIGZvbnRzTGlzdC5sZW5ndGgtMSkgXVxuXG5cblx0XHRcdCMgTG9hZCBmb250cyBkaW5hbWljYWx5IHRocm91Z2ggZ29vZ2xlIHdlYiBsb2FkZXJcblx0XHRcdFdlYkZvbnQubG9hZFxuXHRcdFx0XHRjdXN0b206XG5cdFx0XHRcdFx0ZmFtaWxpZXM6IFtyYW5kb21UZXh0T3B0aW9ucy5mb250RmFtaWx5XVxuXHRcdFx0XHRcdHVybHM6IFsnL2Fzc2V0cy9mb250L2NhcmRfZm9udHMvJyArIHJhbmRvbVRleHRPcHRpb25zLmZvbnRGYW1pbHkgKyAnLycgKyByYW5kb21UZXh0T3B0aW9ucy5mb250RmFtaWx5ICsgJy5jc3MnXVxuXHRcdFx0XHRmb250bG9hZGluZzogID0+XG5cdFx0XHRcdFx0IyBjb25zb2xlLmxvZyAnZm9udGxvYWRpbmc6XFx0JywgYXJndW1lbnRzXG5cdFx0XHRcdGZvbnRhY3RpdmU6IChmb250RmFtaWx5LCBmb250T3B0aW9ucykgID0+XG5cdFx0XHRcdFx0IyBjb25zb2xlLmluZm8gJ2ZvbnRhY3RpdmU6XFx0IFxcdCcsIGZvbnRGYW1pbHksIEBcblx0XHRcdFx0XHRAZHJhdyhjYW52YXMsIG1vZGVsKVxuXHRcdFx0XHRmb250aW5hY3RpdmU6ICA9PlxuXHRcdFx0XHRcdCMgY29uc29sZS53YXJuICdmb250aW5hY3RpdmU6XFx0IFxcdCcsIGFyZ3VtZW50c1xuXHRcdFx0XHRcdEBkcmF3KGNhbnZhcywgbW9kZWwpXG5cdFx0XHRcblx0XHRcdCNzZXQgbmV3IHJhbmRvbSB0ZXh0IG9wdGlvbnMgdG8gbW9kZWxcblx0XHRcdG1vZGVsLnNldCAnZ2VuZXJhdG9ycy50ZXh0R2VuJywgcmFuZG9tVGV4dE9wdGlvbnMsXG5cdFx0XHRcdHNpbGVudDogdHJ1ZVxuXG5cdFx0ZWxzZSBcblx0XHRcdHJlbmRlclRleHQoZm9udEZhbWlseSlcblxuXG5cdEByZW5kZXJJbml0aWFscyA9IChzZXgsIG5hbWUsIHN1cm5hbWUpIC0+XG5cblx0XHRpZiBzZXggaXMgJ21hbGUnXG5cdFx0XHRzdXJuYW1lID0gc3VybmFtZVxuXG5cdFx0ZWxzZSBpZiBzZXggaXMgJ2ZlbWFsZSdcblx0XHRcdGlmIHN1cm5hbWUuc3Vic3RyKHN1cm5hbWUubGVuZ3RoLTIsc3VybmFtZS5sZW5ndGgpIGlzICfQuNC5J1xuXHRcdFx0XHRzdXJuYW1lID0gc3VybmFtZS5zbGljZSgwLHN1cm5hbWUubGVuZ3RoLTIpXG5cdFx0XHRcdHN1cm5hbWUgPSBzdXJuYW1lKyfQsNGPJ1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzdXJuYW1lID0gc3VybmFtZSsnYScgXG5cdFx0bmFtZSArICcgJyArIHN1cm5hbWVcdFx0XHRcbiJdfQ==