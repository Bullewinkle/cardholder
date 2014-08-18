(function() {
  var App, delay,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  delay = function(ms, fn) {
    return setTimeout(ms, fn);
  };

  this.App = App = (function(_super) {
    var getGenerators;

    __extends(App, _super);

    function App() {
      this.cacheNodes = __bind(this.cacheNodes, this);
      this.intervalRenderer = __bind(this.intervalRenderer, this);
      return App.__super__.constructor.apply(this, arguments);
    }

    App.prototype.logger = false;

    App.prototype.view = new Backbone.View({
      el: $('#app')
    });

    App.prototype.intervalRenderer = function() {
      var prevCard, renderRandom;
      prevCard = {};
      renderRandom = (function(_this) {
        return function() {
          var randomModel;
          randomModel = app.cardsCollection.get(app.getRandom(1, app.cardsCollection.length));
          if (randomModel !== prevCard) {
            prevCard = randomModel;
            randomModel.set('generators.gradientGen', randomModel.defaults.generators.gradientGen, {
              silent: true
            });
            randomModel.set('data', randomModel.defaults.data, {
              silent: true
            });
            if (randomModel.view.$el.is(':not(:hover)') && !randomModel.view.$el.hasClass('locked')) {
              return randomModel.view.animatedRender();
            }
          } else {
            return renderRandom();
          }
        };
      })(this);
      return setInterval(renderRandom, 2000);
    };

    App.prototype.cacheNodes = function() {
      return this.rootNode = $('.cards').eq(0);
    };

    App.prototype.regions = {
      mainRegion: '#app'
    };

    App.prototype.getRandom = function(min, max, decimal) {
      if (min == null) {
        min = 0;
      }
      if (max == null) {
        max = 100;
      }
      if (decimal == null) {
        decimal = 0;
      }
      return +(Math.random() * (max - min) + min).toFixed(decimal);
    };

    getGenerators = function() {
      var generatorsCounter, generatorsList, i, _i, _ref, _results;
      generatorsList = [];
      generatorsCounter = 0;
      if (generatorsList.length > 0) {
        _results = [];
        for (i = _i = 0, _ref = generatorsList.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          _results.push($.get(generatorsList[i], function(res) {
            var readyTime;
            generatorsCounter++;
            if (generatorsCounter === generatorsList.length) {
              readyTime = Date.now();
              return console.info('generators loaded at : ' + (readyTime - startTime) + ' miliseconds');
            }
          }));
        }
        return _results;
      } else {
        return 'no plugin';
      }
    };

    App.prototype.generators = {};

    App.prototype.started = false;

    return App;

  })(Marionette.Application);

  this.app = new App;

  this.app.addInitializer(function() {
    var date, onResize;
    date = new Date();
    this.trigger('initialize', 'at ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds());
    this.bind('all', (function(_this) {
      return function(trigger, args) {
        if (_this.logger === true) {
          return console.info('App says :', trigger, args);
        }
      };
    })(this));
    this.startTime = Date.now();
    this.trigger('start', 'at ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds());
    this.started = true;
    onResize = _.debounce((function(_this) {
      return function() {
        return _this.trigger('resize');
      };
    })(this), 250);
    return $(window).on({
      resize: onResize
    });
  });

  jQuery((function(_this) {
    return function() {
      return _this.app.start();
    };
  })(this));

}).call(this);

//# sourceMappingURL=data:application/json;base64,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QUEsQ0FBTyxDQUFBLFNBQUEsS0FBQSxHQUFBO1dBQUEsU0FBQSxHQUFBO2FBQ04sS0FBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLENBQUEsRUFETTtJQUFBLEVBQUE7RUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVAsQ0ExR0EsQ0FBQTtBQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImRlbGF5ID0gKG1zLCBmbikgLT4gc2V0VGltZW91dCBtcywgZm5cblxuQEFwcCA9IGNsYXNzIEFwcCBleHRlbmRzIE1hcmlvbmV0dGUuQXBwbGljYXRpb25cblx0bG9nZ2VyOiBvZmZcblxuXHQjIHJvdXRlcjogbmV3IFJvdXRlclxuXHRcblx0dmlldzogbmV3IEJhY2tib25lLlZpZXdcblx0XHRlbDogJCgnI2FwcCcpXG5cblx0aW50ZXJ2YWxSZW5kZXJlcjogPT5cblx0XHRwcmV2Q2FyZCA9IHt9XG5cblx0XHRyZW5kZXJSYW5kb20gPSA9PlxuXHRcdFx0XG5cdFx0XHRyYW5kb21Nb2RlbCA9IGFwcC5jYXJkc0NvbGxlY3Rpb24uZ2V0IGFwcC5nZXRSYW5kb20oMSxhcHAuY2FyZHNDb2xsZWN0aW9uLmxlbmd0aClcblx0XHRcdGlmIHJhbmRvbU1vZGVsIGlzbnQgcHJldkNhcmRcblxuXHRcdFx0XHRwcmV2Q2FyZCA9IHJhbmRvbU1vZGVsXG5cdFx0XHRcdFxuXHRcdFx0XHQjIFNldCBkZWZhdXQgdmFsdWVzXG5cdFx0XHRcdHJhbmRvbU1vZGVsLnNldCAnZ2VuZXJhdG9ycy5ncmFkaWVudEdlbicsIHJhbmRvbU1vZGVsLmRlZmF1bHRzLmdlbmVyYXRvcnMuZ3JhZGllbnRHZW4sXG5cdFx0XHRcdFx0c2lsZW50OiB0cnVlXG5cdFx0XHRcdHJhbmRvbU1vZGVsLnNldCAnZGF0YScsIHJhbmRvbU1vZGVsLmRlZmF1bHRzLmRhdGEsXG5cdFx0XHRcdFx0c2lsZW50OiB0cnVlXG5cblx0XHRcdFx0IyBJZiBub3QgaG92ZXIgYW5kIG5vdCBsb2NrZWQgLSBhbmltYXRlZCByZW5kZXJcblx0XHRcdFx0aWYgcmFuZG9tTW9kZWwudmlldy4kZWwuaXMoJzpub3QoOmhvdmVyKScpIGFuZCBub3QgcmFuZG9tTW9kZWwudmlldy4kZWwuaGFzQ2xhc3MoJ2xvY2tlZCcpXG5cdFx0XHRcdFx0cmFuZG9tTW9kZWwudmlldy5hbmltYXRlZFJlbmRlcigpXG5cblx0XHRcdGVsc2UgcmVuZGVyUmFuZG9tKClcblxuXHRcdHNldEludGVydmFsIHJlbmRlclJhbmRvbSwgMjAwMFxuXG5cdGNhY2hlTm9kZXM6ID0+XG5cdFx0QHJvb3ROb2RlID0gJCgnLmNhcmRzJykuZXEoMClcblxuXHRyZWdpb25zOlxuXHRcdG1haW5SZWdpb246ICcjYXBwJ1xuXHQjIGluaXRDb2xvclNjaGVtZTogPT5cblx0IyBcdHNjbSA9IG5ldyBDb2xvclNjaGVtZSgpXG5cdCMgXHRodWUgPSBhcHAuZ2V0UmFuZG9tKDAuMiwgMzU5LCAxKVxuXG5cdCMgXHRzY20uZnJvbV9odWUoaHVlKVxuXHQjIFx0LnNjaGVtZSgndGV0cmFkZScpXG5cdCMgXHQuZGlzdGFuY2UoMC4xKVxuXHQjIFx0LmFkZF9jb21wbGVtZW50KGZhbHNlKVxuXHQjIFx0LnZhcmlhdGlvbignc29mdCcpXG5cdCMgXHQud2ViX3NhZmUoZmFsc2UpXG5cdCMgXHRAY29sb3JTY2hlbWUgPSBzY20uY29sb3JzKClcblxuXHRnZXRSYW5kb206IChtaW4gPSAwLG1heCA9IDEwMCxkZWNpbWFsID0gMCkgLT5cblx0XHQrKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbikudG9GaXhlZChkZWNpbWFsKVxuXG5cdCMgdXNlIHRoaXMgZnVuY3Rpb24gaWYgeW91IHdhbnQgdG8gYWRkIHlvdXIgb3duIGdlbmVyYXRvciwgYW5kIGRvIG5vdCBrbm93IGhvdyB0byBkbyB0aGlzXG5cdGdldEdlbmVyYXRvcnMgPSA9PlxuXHRcdGdlbmVyYXRvcnNMaXN0ID0gW1xuXHRcdFx0IyAnc2NyaXB0cy9nZW5lcmF0b3JzL3JhbmRvbS1jc3MtZ3JhZGllbnQtZ2VuZXJhdG9yLmpzJ1xuXHRcdF1cblx0XHRnZW5lcmF0b3JzQ291bnRlciA9IDBcblx0XHRpZiBnZW5lcmF0b3JzTGlzdC5sZW5ndGggPjBcblx0XHRcdGZvciBpIGluIFswLi4uZ2VuZXJhdG9yc0xpc3QubGVuZ3RoXVxuXHRcdFx0XHQkLmdldCBnZW5lcmF0b3JzTGlzdFtpXSwocmVzKSAtPiBcblx0XHRcdFx0XHRnZW5lcmF0b3JzQ291bnRlcisrXG5cdFx0XHRcdFx0aWYgZ2VuZXJhdG9yc0NvdW50ZXIgaXMgZ2VuZXJhdG9yc0xpc3QubGVuZ3RoXG5cdFx0XHRcdFx0XHRyZWFkeVRpbWUgPSBEYXRlLm5vdygpXG5cdFx0XHRcdFx0XHRjb25zb2xlLmluZm8gJ2dlbmVyYXRvcnMgbG9hZGVkIGF0IDogJyArIChyZWFkeVRpbWUtc3RhcnRUaW1lKSArICcgbWlsaXNlY29uZHMnXG5cdFx0ZWxzZVxuXHRcdFx0J25vIHBsdWdpbidcblxuXHRnZW5lcmF0b3JzIDoge31cblxuXHRzdGFydGVkIDogZmFsc2VcblxuXG5AYXBwID0gbmV3IEFwcFxuQGFwcC5hZGRJbml0aWFsaXplciAtPlxuXHRkYXRlID0gbmV3IERhdGUoKVxuXHRAdHJpZ2dlciAnaW5pdGlhbGl6ZScsICdhdCAnICsgZGF0ZS5nZXRIb3VycygpICsgJzonICsgZGF0ZS5nZXRNaW51dGVzKCkgKyAnOicgKyBkYXRlLmdldFNlY29uZHMoKSArICcuJyArIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKClcblx0QGJpbmQgJ2FsbCcsICh0cmlnZ2VyLCBhcmdzKSA9PiBcblx0XHRpZiBAbG9nZ2VyIGlzIG9uXG5cdFx0XHRjb25zb2xlLmluZm8gJ0FwcCBzYXlzIDonLHRyaWdnZXIsYXJnc1xuXHRAc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxuXHRAdHJpZ2dlciAnc3RhcnQnLCAnYXQgJyArIGRhdGUuZ2V0SG91cnMoKSArICc6JyArIGRhdGUuZ2V0TWludXRlcygpICsgJzonICsgZGF0ZS5nZXRTZWNvbmRzKCkgKyAnLicgKyBkYXRlLmdldE1pbGxpc2Vjb25kcygpXG5cdEBzdGFydGVkID0gdHJ1ZVxuXHQjIEBpbml0Q29sb3JTY2hlbWUoKVxuXG5cblx0IyBAY29udHJvbGxlck1vZGVsID0gbmV3IEFwcC5NYWluQ29udHJvbGxlck1vZGVsXG5cdCMgQGNvbnRyb2xsZXJWaWV3ID0gbmV3IEFwcC5NYWluQ29udHJvbGxlclZpZXdcblx0IyBcdGVsOiAkKCcuc3RlcF9mb3JtX2NvbnRyb2xsZXJfd3JhcHBlcicpXG5cdCMgXHRtb2RlbDogQGNvbnRyb2xsZXJNb2RlbFxuXG5cdCMgQGNhcmRzQ29sbGVjdGlvbiA9IG5ldyBBcHAuQ2FyZHNDb2xsZWN0aW9uXG5cdCMgQGNhcmRzQ29sbGVjdGlvbi5yZXNldCBkYXRhRnJvbVNlcnZlci5jYXJkc0NvbmZpZ1xuXG5cdCMgQGNhcmRzQ29sbGVjdGlvblZpZXcgPSBuZXcgQXBwLkNhcmRzQ29sbGVjdGlvblZpZXdcblx0IyBcdGVsOiAkKCcuY2FyZHMnLCcjYXBwJylcblx0IyBcdGNvbGxlY3Rpb246IEBjYXJkc0NvbGxlY3Rpb25cblxuXHRvblJlc2l6ZSA9IF8uZGVib3VuY2UgPT5cblx0XHRAdHJpZ2dlciAncmVzaXplJ1xuXHQsIDI1MFxuXHQkKHdpbmRvdykub25cblx0XHRyZXNpemU6IG9uUmVzaXplXG5cbmpRdWVyeSA9PlxuXHRAYXBwLnN0YXJ0KClcblxuIl19