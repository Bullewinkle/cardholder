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
            context.font = '0.8em ' + font;
            console.log('card №' + model.get('id') + ' : ' + font.split('"').join(''));
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