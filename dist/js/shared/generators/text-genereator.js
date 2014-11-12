(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  this.app.module('shared.generators', function(Generators, app, Backbone, Marionette, $, _) {
    return Generators.TextGenerator = (function() {
      var flowText, fontsList, generateRandomData, generateRandomTextOptions, measureText, prepareData, prepareInitials, renderText, srcData;

      srcData = dataFromServer.appData;

      srcData.textAligns = ['left', 'center', 'right'];

      fontsList = srcData.fontsList;

      String.prototype.insertTo = function(index, string) {
        if (index > 0) {
          return this.substring(0, index) + string + this.substring(index, this.length);
        } else {
          return string + this;
        }
      };

      generateRandomData = function() {
        var randomCardData, randomNameNum, randomPhoneEnd;
        randomNameNum = app.getRandom(0, srcData.names.length - 1);
        randomPhoneEnd = app.getRandom(0, srcData.names.length - 1);
        if (('' + randomPhoneEnd).length < 2) {
          randomPhoneEnd = '0' + randomPhoneEnd;
        }
        randomCardData = {
          isDefault: false,
          sex: srcData.names[randomNameNum].sex,
          name: srcData.names[randomNameNum].text,
          surname: srcData.surnames[app.getRandom(0, srcData.surnames.length - 1)],
          eMail: srcData.emails[app.getRandom(0, srcData.emails.length - 1)],
          position: srcData.positions[app.getRandom(0, srcData.positions.length - 1)],
          phone: '+7-' + srcData.phones + randomPhoneEnd
        };
        return randomCardData;
      };

      generateRandomTextOptions = function() {
        var randomTextOptions;
        randomTextOptions = {
          isDefault: false,
          textAlign: srcData.textAligns[app.getRandom(0, srcData.textAligns.length - 1)],
          fontFamily: 'sans-serif',
          textBlockOptions: {
            padding: {
              top: app.getRandom(10, 50, 2),
              left: app.getRandom(10, 50, 2),
              bottom: 0,
              right: app.getRandom(10, 50, 2)
            },
            title: {
              fontSize: "" + (app.getRandom(1, 2.5, 2)) + "em",
              color: "rgb(" + (app.getRandom(0, 120)) + "," + (app.getRandom(0, 120)) + "," + (app.getRandom(0, 120)) + ")",
              textBaseline: 'middle',
              lineHeight: app.getRandom(18, 40, 2),
              marginBottom: 0
            },
            body: {
              fontSize: "" + (app.getRandom(0.5, 1.5, 2)) + "em",
              color: "rgb(" + (app.getRandom(0, 160)) + "," + (app.getRandom(0, 160)) + "," + (app.getRandom(0, 160)) + ")",
              textBaseline: 'middle',
              lineHeight: app.getRandom(10, 30, 2)
            }
          }
        };
        return randomTextOptions;
      };

      prepareInitials = function(sex, name, surname) {
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

      prepareData = function(model) {
        var randomData, randomTextOptions;
        if (model.get('data').isDefault) {
          randomData = generateRandomData();
          model.set('data', randomData, {
            silent: true
          });
        }
        if (model.get('generators.TextGenerator').isDefault) {
          randomTextOptions = generateRandomTextOptions();
          model.set('generators.TextGenerator', randomTextOptions, {
            silent: true
          });
        }
        return model.attributes;
      };

      measureText = function(string, font) {
        var testText, width;
        testText = svg.text(string).font(font);
        width = testText.bbox().width;
        testText.remove();
        return width;
      };

      flowText = function(string, maxWidth, font) {
        var paragraphBuffer, stringBuffer, testString, testWidth, word, words, _i, _len, _results;
        paragraphBuffer = '';
        stringBuffer = '';
        words = string.split(' ');
        _results = [];
        for (_i = 0, _len = words.length; _i < _len; _i++) {
          word = words[_i];
          testString = paragraphBuffer.length < 1 ? "" + word : "" + paragraphBuffer + " " + word;
          testWidth = measureText(testString, font);
          if (testWidth > maxWidth) {
            console.log('enter apended', word);
            console.log(testWidth, maxWidth);
            paragraphBuffer = "" + paragraphBuffer + "\n" + word;
          } else {
            paragraphBuffer = testString;
          }
          _results.push(paragraphBuffer);
        }
        return _results;
      };

      renderText = function(svg, model) {
        var buildHeadingText, buildInfoText, data, heading, info, top;
        data = model.get('data');
        buildHeadingText = function() {
          var template, text;
          data.sex = data.sex;
          data.name = data.name;
          data.surname = data.surname;
          template = prepareInitials(data.sex, data.name, data.surname);
          text = flowText(template, maxWidth, headingProperties.font);
          return text;
        };
        buildInfoText = function() {
          var paragraph, paragraphs, template, textBlockBuffer, _i, _len;
          data.eMail = data.eMail;
          data.phone = data.phone;
          data.position = data.position;
          template = "E-mail: " + data.eMail + " \nТелефон: " + data.phone + " \nДолжность: " + data.position;
          paragraphs = template.split('\n');
          textBlockBuffer = [];
          for (_i = 0, _len = paragraphs.length; _i < _len; _i++) {
            paragraph = paragraphs[_i];
            paragraph = paragraph.trim();
            paragraph = flowText(paragraph, maxWidth, infoProperties.font);
            textBlockBuffer.push(paragraph);
          }
          paragraphs = textBlockBuffer.join('\n');
          return paragraphs;
        };
        heading = svg.text(buildHeadingText()).leading(headingProperties.lineHeight).fill('#232').move(headingProperties.paddingRight, headingProperties.paddingTop).font(headingProperties.font);
        top = $(heading.node).height();
        return info = svg.text(buildInfoText()).leading(infoProperties.lineHeight).fill('#232').move(infoProperties.paddingRight, infoProperties.paddingTop + headingProperties.paddingTop + top + infoProperties.marginTop).font(infoProperties.font);
      };

      function TextGenerator() {
        var headingProperties, infoProperties, maxWidth, model, opts, svg;
        svg = arguments[0], model = arguments[1], opts = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
        this.draw = __bind(this.draw, this);
        this.svg = svg;
        this.model = model;
        this.options = opts;
        model = model.toJSON();
        maxWidth = $(svg.node).width() + 100;
        headingProperties = model.generators.textGenerator.heading;
        infoProperties = model.generators.textGenerator.info;
      }

      TextGenerator.prototype.draw = function() {
        prepareData(this.model);
        return renderText(this.svg, this.model, this.options);
      };

      return TextGenerator;

    })();
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9nZW5lcmF0b3JzL3RleHQtZ2VuZXJlYXRvci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBO3NCQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksbUJBQVosRUFBaUMsU0FBQyxVQUFELEVBQWEsR0FBYixFQUFrQixRQUFsQixFQUE0QixVQUE1QixFQUF3QyxDQUF4QyxFQUEyQyxDQUEzQyxHQUFBO1dBQzFCLFVBQVUsQ0FBQztBQUdoQixVQUFBLGtJQUFBOztBQUFBLE1BQUEsT0FBQSxHQUFVLGNBQWMsQ0FBQyxPQUF6QixDQUFBOztBQUFBLE1BQ0EsT0FBTyxDQUFDLFVBQVIsR0FBcUIsQ0FBQyxNQUFELEVBQVEsUUFBUixFQUFpQixPQUFqQixDQURyQixDQUFBOztBQUFBLE1BRUEsU0FBQSxHQUFZLE9BQU8sQ0FBQyxTQUZwQixDQUFBOztBQUFBLE1BYUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFqQixHQUE0QixTQUFDLEtBQUQsRUFBUSxNQUFSLEdBQUE7QUFDM0IsUUFBQSxJQUFJLEtBQUEsR0FBUSxDQUFaO0FBQ0MsaUJBQU8sSUFBQyxDQUFBLFNBQUQsQ0FBVyxDQUFYLEVBQWMsS0FBZCxDQUFBLEdBQXVCLE1BQXZCLEdBQWdDLElBQUMsQ0FBQSxTQUFELENBQVcsS0FBWCxFQUFrQixJQUFDLENBQUEsTUFBbkIsQ0FBdkMsQ0FERDtTQUFBLE1BQUE7QUFHQyxpQkFBTyxNQUFBLEdBQVMsSUFBaEIsQ0FIRDtTQUQyQjtNQUFBLENBYjVCLENBQUE7O0FBQUEsTUFtQkEsa0JBQUEsR0FBcUIsU0FBQSxHQUFBO0FBRXBCLFlBQUEsNkNBQUE7QUFBQSxRQUFBLGFBQUEsR0FBZ0IsR0FBRyxDQUFDLFNBQUosQ0FBYyxDQUFkLEVBQWlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBZCxHQUFxQixDQUF0QyxDQUFoQixDQUFBO0FBQUEsUUFDQSxjQUFBLEdBQWlCLEdBQUcsQ0FB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QUEsT0FBRCxHQUFXLElBRlgsQ0FBQTtBQUFBLFFBR0EsS0FBQSxHQUFRLEtBQUssQ0FBQyxNQUFOLENBQUEsQ0FIUixDQUFBO0FBQUEsUUFLQSxRQUFBLEdBQVcsQ0FBQSxDQUFFLEdBQUcsQ0FBQyxJQUFOLENBQVcsQ0FBQyxLQUFaLENBQUEsQ0FBQSxHQUFvQixHQUwvQixDQUFBO0FBQUEsUUFPQSxpQkFBQSxHQUFvQixLQUFLLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQVBuRCxDQUFBO0FBQUEsUUFRQSxjQUFBLEdBQWlCLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBUmhELENBRFk7TUFBQSxDQTdMYjs7QUFBQSw4QkF3TUEsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUVMLFFBQUEsV0FBQSxDQUFZLElBQUMsQ0FBQSxLQUFiLENBQUEsQ0FBQTtlQUVBLFVBQUEsQ0FBVyxJQUFDLENBQUEsR0FBWixFQUFpQixJQUFDLENBQUEsS0FBbEIsRUFBeUIsSUFBQyxDQUFBLE9BQTFCLEVBSks7TUFBQSxDQXhNTixDQUFBOzsyQkFBQTs7U0FKK0I7RUFBQSxDQUFqQyxDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJzaGFyZWQvZ2VuZXJhdG9ycy90ZXh0LWdlbmVyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnc2hhcmVkLmdlbmVyYXRvcnMnLCAoR2VuZXJhdG9ycywgYXBwLCBCYWNrYm9uZSwgTWFyaW9uZXR0ZSwgJCwgXykgLT4gXG5cdGNsYXNzIEdlbmVyYXRvcnMuVGV4dEdlbmVyYXRvclxuXG5cdFx0Iy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFBSSVZBVCBQUk9QRVJUSUVTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdHNyY0RhdGEgPSBkYXRhRnJvbVNlcnZlci5hcHBEYXRhXG5cdFx0c3JjRGF0YS50ZXh0QWxpZ25zID0gWydsZWZ0JywnY2VudGVyJywncmlnaHQnXVxuXHRcdGZvbnRzTGlzdCA9IHNyY0RhdGEuZm9udHNMaXN0XG5cdFx0XG5cdFx0Iy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRU5EIFBSSVZBVCBQUk9QRVJUSUVTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cblx0XHQjLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUFVCTElDIFBST1BFUlRJRVMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBlbXB0eVxuXHRcdCMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUVORCBQVUJMSUMgUFJPUEVSVElFUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5cdFx0Iy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUFJJVkFUIE1FVEhPRFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFN0cmluZy5wcm90b3R5cGUuaW5zZXJ0VG8gPSAoaW5kZXgsIHN0cmluZykgLT5cblx0XHRcdGlmIChpbmRleCA+IDApXG5cdFx0XHRcdHJldHVybiBAc3Vic3RyaW5nKDAsIGluZGV4KSArIHN0cmluZyArIEBzdWJzdHJpbmcoaW5kZXgsIEBsZW5ndGgpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXR1cm4gc3RyaW5nICsgQFxuXG5cdFx0Z2VuZXJhdGVSYW5kb21EYXRhID0gLT5cblx0XHRcdCNsb2NhbCB2YXJpYWJsZXNcblx0XHRcdHJhbmRvbU5hbWVOdW0gPSBhcHAuZ2V0UmFuZG9tKDAsIHNyY0RhdGEubmFtZXMubGVuZ3RoLTEgKVxuXHRcdFx0cmFuZG9tUGhvbmVFbmQgPSBhcHAuZ2V0UmFuZG9tKDAsIHNyY0RhdGEubmFtZXMubGVuZ3RoLTEgKVxuXHRcdFx0cmFuZG9tUGhvbmVFbmQgPSAnMCcgKyByYW5kb21QaG9uZUVuZCBpZiAoJycrIHJhbmRvbVBob25lRW5kKS5sZW5ndGggPCAyIFxuXHRcdFx0I2VuZCBsb2NhbCB2YXJpYWJsZXNcblxuXHRcdFx0I2dlbmVyYXRlIG5ldyByYW5kb20gY2FyZERhdGFcblx0XHRcdHJhbmRvbUNhcmREYXRhID1cblx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXHRcdFx0XHRzZXg6IHNyY0RhdGEubmFtZXNbIHJhbmRvbU5hbWVOdW0gXS5zZXhcblx0XHRcdFx0bmFtZTogIHNyY0RhdGEubmFtZXNbIHJhbmRvbU5hbWVOdW0gXS50ZXh0XG5cdFx0XHRcdHN1cm5hbWU6ICBzcmNEYXRhLnN1cm5hbWVzWyBhcHAuZ2V0UmFuZG9tKDAsIHNyY0RhdGEuc3VybmFtZXMubGVuZ3RoLTEgKSBdXG5cdFx0XHRcdGVNYWlsOiAgc3JjRGF0YS5lbWFpbHNbIGFwcC5nZXRSYW5kb20oMCwgc3JjRGF0YS5lbWFpbHMubGVuZ3RoLTEgKSBdXG5cdFx0XHRcdHBvc2l0aW9uOiAgc3JjRGF0YS5wb3NpdGlvbnNbIGFwcC5nZXRSYW5kb20oMCwgc3JjRGF0YS5wb3NpdGlvbnMubGVuZ3RoLTEgKSBdXG5cdFx0XHRcdHBob25lOiAnKzctJyArIHNyY0RhdGEucGhvbmVzICsgcmFuZG9tUGhvbmVFbmRcblxuXHRcdFx0cmFuZG9tQ2FyZERhdGFcblxuXHRcdGdlbmVyYXRlUmFuZG9tVGV4dE9wdGlvbnMgPSAtPlxuXHRcdFx0I2xvY2FsIHZhcmlhYmxlc1xuXHRcdFx0I2VuZCBsb2NhbCB2YXJpYWJsZXNcblxuXHRcdFx0I2dlbmVyYXRlIG5ldyByYW5kb20gdGV4dCBvcHRpb25zXG5cdFx0XHRyYW5kb21UZXh0T3B0aW9ucyA9XG5cdFx0XHRcdGlzRGVmYXVsdDogZmFsc2Vcblx0XHRcdFx0dGV4dEFsaWduOiBzcmNEYXRhLnRleHRBbGlnbnNbYXBwLmdldFJhbmRvbSgwLHNyY0RhdGEudGV4dEFsaWducy5sZW5ndGgtMSldXG5cdFx0XHRcdGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJ1xuXHRcdFx0XHQjIGZvbnRGYW1pbHk6ICcnKyBmb250c0xpc3RbIGFwcC5nZXRSYW5kb20oMCwgZm9udHNMaXN0Lmxlbmd0aC0xKSBdXG5cblx0XHRcdFx0dGV4dEJsb2NrT3B0aW9uczpcblx0XHRcdFx0XHRwYWRkaW5nOlxuXHRcdFx0XHRcdFx0dG9wOiBhcHAuZ2V0UmFuZG9tKDEwLCA1MCwgMilcblx0XHRcdFx0XHRcdGxlZnQ6IGFwcC5nZXRSYW5kb20oMTAsIDUwLCAyKVxuXHRcdFx0XHRcdFx0Ym90dG9tOiAwXG5cdFx0XHRcdFx0XHRyaWdodDogYXBwLmdldFJhbmRvbSgxMCwgNTAsIDIpXG5cdFx0XHRcdFx0dGl0bGU6XG5cdFx0XHRcdFx0XHRmb250U2l6ZTogXCIje2FwcC5nZXRSYW5kb20oMSwgMi41LCAyKX1lbVwiXG5cdFx0XHRcdFx0XHRjb2xvcjogXCJyZ2IoI3sgYXBwLmdldFJhbmRvbSgwLCAxMjApIH0sI3sgYXBwLmdldFJhbmRvbSgwLCAxMjApIH0sI3sgYXBwLmdldFJhbmRvbSgwLCAxMjApIH0pXCJcblx0XHRcdFx0XHRcdHRleHRCYXNlbGluZTogJ21pZGRsZScgXG5cdFx0XHRcdFx0XHRsaW5lSGVpZ2h0OiBhcHAuZ2V0UmFuZG9tKDE4LCA0MCAsIDIpXG5cdFx0XHRcdFx0XHRtYXJnaW5Cb3R0b206IDBcblx0XHRcdFx0XHRib2R5OlxuXHRcdFx0XHRcdFx0Zm9udFNpemU6IFwiI3thcHAuZ2V0UmFuZG9tKDAuNSwgMS41LCAyKX1lbVwiXG5cdFx0XHRcdFx0XHRjb2xvcjogXCJyZ2IoI3sgYXBwLmdldFJhbmRvbSgwLCAxNjApIH0sI3sgYXBwLmdldFJhbmRvbSgwLCAxNjApIH0sI3sgYXBwLmdldFJhbmRvbSgwLCAxNjApIH0pXCJcblx0XHRcdFx0XHRcdHRleHRCYXNlbGluZTogJ21pZGRsZScgXG5cdFx0XHRcdFx0XHRsaW5lSGVpZ2h0OiBhcHAuZ2V0UmFuZG9tKDEwLCAzMCAsIDIpXG5cblx0XHRcdHJhbmRvbVRleHRPcHRpb25zXHRcblxuXHRcdHByZXBhcmVJbml0aWFscyA9IChzZXgsIG5hbWUsIHN1cm5hbWUpIC0+XG5cdFx0XHRpZiBzZXggaXMgJ21hbGUnXG5cdFx0XHRcdHN1cm5hbWUgPSBzdXJuYW1lXG5cblx0XHRcdGVsc2UgaWYgc2V4IGlzICdmZW1hbGUnXG5cdFx0XHRcdGlmIHN1cm5hbWUuc3Vic3RyKHN1cm5hbWUubGVuZ3RoLTIsc3VybmFtZS5sZW5ndGgpIGlzICfQuNC5J1xuXHRcdFx0XHRcdHN1cm5hbWUgPSBzdXJuYW1lLnNsaWNlKDAsc3VybmFtZS5sZW5ndGgtMilcblx0XHRcdFx0XHRzdXJuYW1lID0gc3VybmFtZSsn0LDRjydcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHN1cm5hbWUgPSBzdXJuYW1lKydhJ1xuXG5cdFx0XHRuYW1lICsgJyAnICsgc3VybmFtZVxuXHRcdFx0XG5cdFx0cHJlcGFyZURhdGEgPSAobW9kZWwpIC0+XG5cdFx0XHRpZiBtb2RlbC5nZXQoJ2RhdGEnKS5pc0RlZmF1bHRcblx0XHRcdFx0I3NldCBuZXcgcmFuZG9tIGNhcmQgZGF0YSB0byBtb2RlbFxuXHRcdFx0XHRyYW5kb21EYXRhID0gZ2VuZXJhdGVSYW5kb21EYXRhKClcblx0XHRcdFx0bW9kZWwuc2V0ICdkYXRhJywgcmFuZG9tRGF0YSxcblx0XHRcdFx0XHRzaWxlbnQ6IHRydWVcdFx0XHRcdFxuXG5cdFx0XHRpZiBtb2RlbC5nZXQoJ2dlbmVyYXRvcnMuVGV4dEdlbmVyYXRvcicpLmlzRGVmYXVsdFxuXHRcdFx0XHQjc2V0IG5ldyByYW5kb20gdGV4dCBvcHRpb25zIHRvIG1vZGVsXG5cdFx0XHRcdHJhbmRvbVRleHRPcHRpb25zID0gZ2VuZXJhdGVSYW5kb21UZXh0T3B0aW9ucygpXG5cdFx0XHRcdG1vZGVsLnNldCAnZ2VuZXJhdG9ycy5UZXh0R2VuZXJhdG9yJywgcmFuZG9tVGV4dE9wdGlvbnMsXG5cdFx0XHRcdFx0c2lsZW50OiB0cnVlXHRcdFx0XG5cblx0XHRcdG1vZGVsLmF0dHJpYnV0ZXNcblxuXHRcdG1lYXN1cmVUZXh0ID0gKHN0cmluZywgZm9udCkgLT5cblx0XHRcdHRlc3RUZXh0ID0gc3ZnLnRleHQoc3RyaW5nKS5mb250IGZvbnRcblx0XHRcdHdpZHRoID0gdGVzdFRleHQuYmJveCgpLndpZHRoXG5cdFx0XHR0ZXN0VGV4dC5yZW1vdmUoKVxuXHRcdFx0d2lkdGhcblxuXHRcdGZsb3dUZXh0ID0gKHN0cmluZywgbWF4V2lkdGgsIGZvbnQpIC0+XG5cdFx0XHRwYXJhZ3JhcGhCdWZmZXIgPSAnJ1xuXHRcdFx0c3RyaW5nQnVmZmVyID0gJydcblx0XHRcdHdvcmRzID0gc3RyaW5nLnNwbGl0ICcgJ1xuXG5cdFx0XHRmb3Igd29yZCBpbiB3b3Jkc1xuXHRcdFx0XHR0ZXN0U3RyaW5nID0gaWYgcGFyYWdyYXBoQnVmZmVyLmxlbmd0aCA8IDEgdGhlbiBcIiN7d29yZH1cIiBlbHNlIFwiI3twYXJhZ3JhcGhCdWZmZXJ9ICN7d29yZH1cIlxuXHRcdFx0XHR0ZXN0V2lkdGggPSBtZWFzdXJlVGV4dCB0ZXN0U3RyaW5nLCBmb250XG5cdFx0XHRcdCMgY29uc29sZS5sb2cgd2lkdGgsIG1heFdpZHRoXG5cblx0XHRcdFx0aWYgdGVzdFdpZHRoID4gbWF4V2lkdGhcblx0XHRcdFx0XHRjb25zb2xlLmxvZyAnZW50ZXIgYXBlbmRlZCcsIHdvcmRcblx0XHRcdFx0XHRjb25zb2xlLmxvZyB0ZXN0V2lkdGgsIG1heFdpZHRoXG5cdFx0XHRcdFx0cGFyYWdyYXBoQnVmZmVyID0gXCIje3BhcmFncmFwaEJ1ZmZlcn1cXG4je3dvcmR9XCJcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHBhcmFncmFwaEJ1ZmZlciA9IHRlc3RTdHJpbmdcblxuXHRcdFx0XHQjIGNvbnNvbGUubG9nIHBhcmFncmFwaEJ1ZmZlclxuXHRcdFx0XHRwYXJhZ3JhcGhCdWZmZXJcdFxuXG5cdFx0cmVuZGVyVGV4dCA9IChzdmcsIG1vZGVsKSAtPlxuXHRcdFx0IyBpZiBmb250RmFtaWx5IGlzICdzYW5zLXNlcmlmJ1xuXHRcdFx0IyBcdGZvbnQgPSBmb250RmFtaWx5XG5cdFx0XHQjIGVsc2UgXG5cdFx0XHQjIFx0Zm9udCA9ICdcIicrZm9udEZhbWlseSsnXCInXG5cblx0XHRcdCMgc3dpdGNoIHRleHRBbGlnblxuXHRcdFx0IyBcdHdoZW4gJ2xlZnQnXG5cdFx0XHQjIFx0XHR4ID0gdGV4dEJsb2NrT3B0aW9ucy5wYWRkaW5nLmxlZnRcblx0XHRcdCMgXHRcdHkgPSB0ZXh0QmxvY2tPcHRpb25zLnBhZGRpbmcudG9wXG5cdFx0XHQjIFx0d2hlbiAnY2VudGVyJyBcblx0XHRcdCMgXHRcdHggPSBjYW52YXMud2lkdGgvMlxuXHRcdFx0IyBcdFx0eSA9IHRleHRCbG9ja09wdGlvbnMucGFkZGluZy50b3Bcblx0XHRcdCMgXHR3aGVuICdyaWdodCdcblx0XHRcdCMgXHRcdHggPSBjYW52YXMud2lkdGgtdGV4dEJsb2NrT3B0aW9ucy5wYWRkaW5nLnJpZ2h0XG5cdFx0XHQjIFx0XHR5ID0gdGV4dEJsb2NrT3B0aW9ucy5wYWRkaW5nLnRvcFxuXHRcdFx0ZGF0YSA9IG1vZGVsLmdldCAnZGF0YSdcblxuXHRcdFx0XG5cdFx0XHRidWlsZEhlYWRpbmdUZXh0ID0gLT5cblx0XHRcdFx0ZGF0YS5zZXggPSBkYXRhLnNleFxuXHRcdFx0XHRkYXRhLm5hbWUgPSBkYXRhLm5hbWVcblx0XHRcdFx0ZGF0YS5zdXJuYW1lID0gZGF0YS5zdXJuYW1lXG5cblx0XHRcdFx0dGVtcGxhdGUgPSBwcmVwYXJlSW5pdGlhbHMgZGF0YS5zZXgsIGRhdGEubmFtZSwgZGF0YS5zdXJuYW1lXG5cblx0XHRcdFx0dGV4dCA9IGZsb3dUZXh0IHRlbXBsYXRlLCBtYXhXaWR0aCwgaGVhZGluZ1Byb3BlcnRpZXMuZm9udFxuXHRcdFx0XHR0ZXh0XG5cblx0XHRcdGJ1aWxkSW5mb1RleHQgPSAtPlxuXG5cdFx0XHRcdGRhdGEuZU1haWwgPSBkYXRhLmVNYWlsXG5cdFx0XHRcdGRhdGEucGhvbmUgPSBkYXRhLnBob25lXG5cdFx0XHRcdGRhdGEucG9zaXRpb24gPSBkYXRhLnBvc2l0aW9uXG5cblx0XHRcdFx0dGVtcGxhdGUgPSBcIkUtbWFpbDogI3sgZGF0YS5lTWFpbCB9IFxcbtCi0LXQu9C10YTQvtC9OiAjeyBkYXRhLnBob25lIH0gXFxu0JTQvtC70LbQvdC+0YHRgtGMOiAjeyBkYXRhLnBvc2l0aW9uIH1cIlxuXG5cdFx0XHRcdHBhcmFncmFwaHMgPSB0ZW1wbGF0ZS5zcGxpdCAnXFxuJ1xuXG5cdFx0XHRcdHRleHRCbG9ja0J1ZmZlciA9IFtdXG5cdFx0XHRcdGZvciBwYXJhZ3JhcGggaW4gcGFyYWdyYXBoc1xuXHRcdFx0XHRcdHBhcmFncmFwaCA9IHBhcmFncmFwaC50cmltKClcblx0XHRcdFx0XHRwYXJhZ3JhcGggPSBmbG93VGV4dCBwYXJhZ3JhcGgsIG1heFdpZHRoLCBpbmZvUHJvcGVydGllcy5mb250XG5cdFx0XHRcdFx0dGV4dEJsb2NrQnVmZmVyLnB1c2ggcGFyYWdyYXBoXG5cblx0XHRcdFx0cGFyYWdyYXBocyA9IHRleHRCbG9ja0J1ZmZlci5qb2luKCdcXG4nKSBcblx0XHRcdFx0cGFyYWdyYXBoc1xuXG5cblx0XHRcdGhlYWRpbmcgPSBzdmcudGV4dCggYnVpbGRIZWFkaW5nVGV4dCgpIClcblx0XHRcdC5sZWFkaW5nKCBoZWFkaW5nUHJvcGVydGllcy5saW5lSGVpZ2h0IClcblx0XHRcdC5maWxsKCcjMjMyJylcblx0XHRcdC5tb3ZlIGhlYWRpbmdQcm9wZXJ0aWVzLnBhZGRpbmdSaWdodCwgaGVhZGluZ1Byb3BlcnRpZXMucGFkZGluZ1RvcFxuXHRcdFx0LmZvbnQgaGVhZGluZ1Byb3BlcnRpZXMuZm9udFxuXG5cdFx0XHR0b3AgPSAkKGhlYWRpbmcubm9kZSkuaGVpZ2h0KClcblxuXHRcdFx0aW5mbyA9IHN2Zy50ZXh0KCBidWlsZEluZm9UZXh0KCkgKVxuXHRcdFx0LmxlYWRpbmcoIGluZm9Qcm9wZXJ0aWVzLmxpbmVIZWlnaHQgKVxuXHRcdFx0LmZpbGwoJyMyMzInKVxuXHRcdFx0Lm1vdmUgaW5mb1Byb3BlcnRpZXMucGFkZGluZ1JpZ2h0LCBpbmZvUHJvcGVydGllcy5wYWRkaW5nVG9wK2hlYWRpbmdQcm9wZXJ0aWVzLnBhZGRpbmdUb3ArdG9wK2luZm9Qcm9wZXJ0aWVzLm1hcmdpblRvcFxuXHRcdFx0LmZvbnQgaW5mb1Byb3BlcnRpZXMuZm9udFxuXHRcdCMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRU5EIFBSSVZBVCBNRVRIT0RTIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5cdFx0Iy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUFVCTElDIE1FVEhPRFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdGNvbnN0cnVjdG9yOiAoc3ZnLG1vZGVsLG9wdHMuLi4pIC0+XG5cdFx0XHRAc3ZnID0gc3ZnXG5cdFx0XHRAbW9kZWwgPSBtb2RlbFxuXHRcdFx0QG9wdGlvbnMgPSBvcHRzXG5cdFx0XHRtb2RlbCA9IG1vZGVsLnRvSlNPTigpXG5cblx0XHRcdG1heFdpZHRoID0gJChzdmcubm9kZSkud2lkdGgoKSsxMDBcblxuXHRcdFx0aGVhZGluZ1Byb3BlcnRpZXMgPSBtb2RlbC5nZW5lcmF0b3JzLnRleHRHZW5lcmF0b3IuaGVhZGluZ1xuXHRcdFx0aW5mb1Byb3BlcnRpZXMgPSBtb2RlbC5nZW5lcmF0b3JzLnRleHRHZW5lcmF0b3IuaW5mb1x0XG5cblx0XHRkcmF3OiA9PlxuXG5cdFx0XHRwcmVwYXJlRGF0YSBAbW9kZWxcblxuXHRcdFx0cmVuZGVyVGV4dCBAc3ZnLCBAbW9kZWwsIEBvcHRpb25zXG5cdFx0Iy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1FTkQgUFVCTElDIE1FVEhPRFMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSJdfQ==