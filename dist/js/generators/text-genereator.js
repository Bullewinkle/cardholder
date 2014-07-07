(function() {
  var __slice = [].slice;

  app.registerGenerator('textGen', function(Generator) {
    var gen;
    gen = new Generator({
      options: {},
      methods: {
        draw: function() {
          var args, canvas, cardData, context, eMail, fontFamily, fontsList, model, name, newData, options, phone, position, randomFont, randomFontNumber, randomNameNum, randomPhoneEnd, renderInitials, renderText, sex, srcData, surname, textAlign, textAligns;
          canvas = arguments[0], model = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
          options = model.get('generators.' + this.name);
          cardData = model.get('data');
          srcData = app.data.attributes;
          name = model.get('data.name');
          surname = model.get('data.surname');
          sex = model.get('data.sex');
          phone = model.get('data.phone');
          eMail = model.get('data.eMail');
          position = model.get('data.position');
          textAligns = ['left', 'center', 'right'];
          textAlign = options.textAlign;
          fontsList = app.data.get('fontsList');
          fontFamily = options.fontFamily;
          context = canvas.getContext('2d');
          renderText = function(fontFamily) {
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
            wrapText(context, renderInitials(name, surname), x, y, canvas.width - 20, 28);
            context.font = '0.8em sans-serif';
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
          renderInitials = function(name, surname) {
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
          if (cardData.defaultData) {
            newData = {};
            randomNameNum = app.getRandom(0, srcData.names.length - 1);
            name = srcData.names[randomNameNum].text;
            newData.name = name;
            sex = srcData.names[randomNameNum].sex;
            newData.sex = sex;
            surname = srcData.surnames[app.getRandom(0, srcData.surnames.length - 1)];
            newData.surname = surname;
            randomPhoneEnd = app.getRandom(0, srcData.names.length - 1);
            if (('' + randomPhoneEnd).length < 2) {
              randomPhoneEnd = '0' + randomPhoneEnd;
            }
            phone = '+7-' + srcData.phones + randomPhoneEnd;
            newData.phone = phone;
            eMail = srcData.emails[app.getRandom(0, srcData.emails.length - 1)];
            newData.eMail = eMail;
            position = srcData.positions[app.getRandom(0, srcData.positions.length - 1)];
            newData.position = position;
            newData.defaultData = false;
            model.set('data', newData, {
              silent: true
            });
          }
          if (options.defaultOptions) {
            textAlign = textAligns[app.getRandom(0, textAligns.length - 1)];
            model.set('generators.' + this.name + '.textAlign', textAlign, {
              silent: true
            });
            randomFontNumber = app.getRandom(0, app.data.get('fontsList'.length - 1));
            randomFont = app.data.get('fontsList');
            fontFamily = '' + randomFont[randomFontNumber];
            WebFont.load({
              custom: {
                families: [fontFamily],
                urls: ['/assets/font/card_fonts/' + fontFamily + '/' + fontFamily + '.css']
              },
              active: (function(_this) {
                return function() {
                  renderText(fontFamily);
                  return model.set('generators.' + _this.name + '.fontFamily', fontFamily, {
                    silent: true
                  });
                };
              })(this),
              loading: (function(_this) {
                return function() {};
              })(this),
              fontloading: (function(_this) {
                return function() {};
              })(this),
              fontactive: (function(_this) {
                return function() {};
              })(this),
              inactive: (function(_this) {
                return function() {
                  renderText(model.defaults.generators[_this.name].fontFamily);
                  return console.log('INACTIVE FONT : ' + fontFamily);
                };
              })(this),
              fontinactive: (function(_this) {
                return function() {};
              })(this)
            });
          } else {
            renderText(fontFamily);
          }
          return model.set('generators.' + this.name + '.defaultOptions', false, {
            silent: true
          });
        }
      }
    });
    return gen;
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdG9ycy90ZXh0LWdlbmVyZWF0b3IuanMiLCJzb3VyY2VzIjpbInRleHQtZ2VuZXJlYXRvci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLGtCQUFBOztBQUFBLEVBQUEsR0FBRyxDQUFDLGlCQUFKLENBQXNCLFNBQXRCLEVBQWlDLFNBQUMsU0FBRCxHQUFBO0FBQ2hDLFFBQUEsR0FBQTtBQUFBLElBQUEsR0FBQSxHQUFVLElBQUEsU0FBQSxDQUNUO0FBQUEsTUFBQSxPQUFBLEVBQVMsRUFBVDtBQUFBLE1BQ0EsT0FBQSxFQUVDO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBQSxHQUFBO0FBQ0wsY0FBQSxvUEFBQTtBQUFBLFVBRE0sdUJBQU8sc0JBQU0sOERBQ25CLENBQUE7QUFBQSxVQUFBLE9BQUEsR0FBVSxLQUFLLENBQUMsR0FBTixDQUFVLGFBQUEsR0FBZ0IsSUFBQyxDQUFBLElBQTNCLENBQVYsQ0FBQTtBQUFBLFVBQ0EsUUFBQSxHQUFXLEtBQUssQ0FBQyxHQUFOLENBQVUsTUFBVixDQURYLENBQUE7QUFBQSxVQUdBLE9BQUEsR0FBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBSG5CLENBQUE7QUFBQSxVQUtBLElBQUEsR0FBTyxLQUFLLENBQUMsR0FBTixDQUFVLFdBQVYsQ0FMUCxDQUFBO0FBQUEsVUFNQSxPQUFBLEdBQVUsS0FBSyxDQUFDLEdBQU4sQ0FBVSxjQUFWLENBTlYsQ0FBQTtBQUFBLFVBT0EsR0FBQSxHQUFNLEtBQUssQ0FBQyxHQUFOLENBQVUsVUFBVixDQVBOLENBQUE7QUFBQSxVQVFBLEtBQUEsR0FBUSxLQUFLLENBQUMsR0FBTixDQUFVLFlBQVYsQ0FSUixDQUFBO0FBQUEsVUFTQSxLQUFBLEdBQVEsS0FBSyxDQUFDLEdBQU4sQ0FBVSxZQUFWLENBVFIsQ0FBQTtBQUFBLFVBVUEsUUFBQSxHQUFXLEtBQUssQ0FBQyxHQUFOLENBQVUsZUFBVixDQVZYLENBQUE7QUFBQSxVQVlBLFVBQUEsR0FB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