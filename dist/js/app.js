(function() {
  var delay,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  delay = function(ms, fn) {
    return setTimeout(ms, fn);
  };

  window.App = (function(_super) {
    var getGenerators;

    __extends(App, _super);

    function App() {
      return App.__super__.constructor.apply(this, arguments);
    }

    App.prototype.logger = false;

    App.prototype.view = new Backbone.View({
      el: $('#app')
    });

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

    return App;

  })(Marionette.Application);

  window.app = new App;

  window.app.module('Common');

  window.app.addInitializer(function() {
    this.bind('all', (function(_this) {
      return function(trigger, args) {
        var date;
        if (_this.logger === true) {
          date = new Date();
          return console.info("App says : " + trigger + " at " + (date.getHours()) + ":" + (date.getMinutes()) + ":" + (date.getSeconds()) + "." + (date.getMilliseconds()), args);
        }
      };
    })(this));
    this.startTime = Date.now();
    this.trigger('initialize');
    this.controller = new this.Common.Controller();
    this.router = new this.Common.Router({
      controller: this.controller
    });
    if (!Backbone.history.started) {
      return Backbone.history.start({
        pushState: true
      });
    }
  });

  jQuery((function(_this) {
    return function() {
      window.app.start();
      return (function(){
	    // pass to string.replace for camel to hyphen
	    var hyphenate = function(a, b, c){
	        return b + "-" + c.toLowerCase();
	    }

	    // get computed style property
	    var getStyle = function(target, prop){
	        if(window.getComputedStyle){ // gecko and webkit
	            prop = prop.replace(/([a-z])([A-Z])/, hyphenate);  // requires hyphenated, not camel
	            return window.getComputedStyle(target, null).getPropertyValue(prop);
	        }
	        if(target.currentStyle){
	            return target.currentStyle[prop];
	        }
	        return target.style[prop];
	    }

	    // get object with units
	    app.getUnits = function(target, prop){

	        var baseline = 100;  // any number serves
	        var item;  // generic iterator

	        var map = {  // list of all units and their identifying string
	            pixel : "px",
	            percent : "%",
	            inch: "in",
	            cm : "cm",
	            mm : "mm",
	            point : "pt",
	            pica : "pc",
	            em : "em",
	            ex : "ex"
	        };

	        var factors = {};  // holds ratios
	        var units = {};  // holds calculated values

	        var value = getStyle(target, prop);  // get the computed style value

	        var numeric = value.match(/\d+/);  // get the numeric component
	        if(numeric === null) {  // if match returns null, throw error...  use === so 0 values are accepted
	            throw "Invalid property value returned";
	        }
	        numeric = numeric[0];  // get the string

	        var unit = value.match(/\D+$/);  // get the existing unit
	        unit = (unit == null) ? map.pixel : unit[0]; // if its not set, assume px - otherwise grab string

	        var activeMap;  // a reference to the map key for the existing unit
	        for(item in map){
	            if(map[item] == unit){
	                activeMap = item;
	                break;
	            }
	        }
	        if(!activeMap) { // if existing unit isn't in the map, throw an error
	            throw "Unit not found in map";
	        }

	        var temp = document.createElement("div");  // create temporary element
	        temp.style.overflow = "hidden";  // in case baseline is set too low
	        temp.style.visibility = "hidden";  // no need to show it

	        target.parentElement.appendChild(temp); // insert it into the parent for em and ex

	        for(item in map){  // set the style for each unit, then calculate it's relative value against the baseline
	            temp.style.width = baseline + map[item];
	            factors[item] = baseline / temp.offsetWidth;
	        }

	        for(item in map){  // use the ratios figured in the above loop to determine converted values
	            units[item] = numeric * (factors[item] * factors[activeMap]);
	        }

	        target.parentElement.removeChild(temp);  // clean up

	        return units;  // returns the object with converted unit values...

	    }

	    // expose
	    // app.getUnits = this.getUnits = getUnits;

	})();;
    };
  })(this));

}).call(this);

//# sourceMappingURL=data:application/json;base64,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Iiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiZGVsYXkgPSAobXMsIGZuKSAtPiBzZXRUaW1lb3V0IG1zLCBmblxuXG5jbGFzcyB3aW5kb3cuQXBwIGV4dGVuZHMgTWFyaW9uZXR0ZS5BcHBsaWNhdGlvblxuXHRsb2dnZXI6IG9mZlxuXG5cdHZpZXc6IG5ldyBCYWNrYm9uZS5WaWV3XG5cdFx0ZWw6ICQoJyNhcHAnKVxuXG5cdHJlZ2lvbnM6XG5cdFx0bWFpblJlZ2lvbjogJyNhcHAnXG5cblx0Z2V0UmFuZG9tOiAobWluID0gMCxtYXggPSAxMDAsZGVjaW1hbCA9IDApIC0+XG5cdFx0KyhNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pLnRvRml4ZWQoZGVjaW1hbClcblxuXHQjIHVzZSB0aGlzIGZ1bmN0aW9uIGlmIHlvdSB3YW50IHRvIGFkZCB5b3VyIG93biBnZW5lcmF0b3IsIGFuZCBkbyBub3Qga25vdyBob3cgdG8gZG8gdGhpc1xuXHRnZXRHZW5lcmF0b3JzID0gPT5cblx0XHRnZW5lcmF0b3JzTGlzdCA9IFtcblx0XHRcdCMgJ3NjcmlwdHMvZ2VuZXJhdG9ycy9yYW5kb20tY3NzLWdyYWRpZW50LWdlbmVyYXRvci5qcydcblx0XHRdXG5cdFx0Z2VuZXJhdG9yc0NvdW50ZXIgPSAwXG5cdFx0aWYgZ2VuZXJhdG9yc0xpc3QubGVuZ3RoID4wXG5cdFx0XHRmb3IgaSBpbiBbMC4uLmdlbmVyYXRvcnNMaXN0Lmxlbmd0aF1cblx0XHRcdFx0JC5nZXQgZ2VuZXJhdG9yc0xpc3RbaV0sKHJlcykgLT5cblx0XHRcdFx0XHRnZW5lcmF0b3JzQ291bnRlcisrXG5cdFx0XHRcdFx0aWYgZ2VuZXJhdG9yc0NvdW50ZXIgaXMgZ2VuZXJhdG9yc0xpc3QubGVuZ3RoXG5cdFx0XHRcdFx0XHRyZWFkeVRpbWUgPSBEYXRlLm5vdygpXG5cdFx0XHRcdFx0XHRjb25zb2xlLmluZm8gJ2dlbmVyYXRvcnMgbG9hZGVkIGF0IDogJyArIChyZWFkeVRpbWUtc3RhcnRUaW1lKSArICcgbWlsaXNlY29uZHMnXG5cdFx0ZWxzZVxuXHRcdFx0J25vIHBsdWdpbidcblxuXHRnZW5lcmF0b3JzIDoge31cblxuXG53aW5kb3cuYXBwID0gbmV3IEFwcFxud2luZG93LmFwcC5tb2R1bGUgJ0NvbW1vbidcbndpbmRvdy5hcHAuYWRkSW5pdGlhbGl6ZXIgLT5cblx0QGJpbmQgJ2FsbCcsICh0cmlnZ2VyLCBhcmdzKSA9PlxuXHRcdGlmIEBsb2dnZXIgaXMgb25cblx0XHRcdGRhdGUgPSBuZXcgRGF0ZSgpXG5cdFx0XHRjb25zb2xlLmluZm8oXCJBcHAgc2F5cyA6ICN7IHRyaWdnZXIgfSBhdCAje2RhdGUuZ2V0SG91cnMoKX06I3tkYXRlLmdldE1pbnV0ZXMoKX06I3tkYXRlLmdldFNlY29uZHMoKX0uI3tkYXRlLmdldE1pbGxpc2Vjb25kcygpfVwiICxhcmdzKVxuXHRAc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxuXHRAdHJpZ2dlciAnaW5pdGlhbGl6ZSdcblxuXHRAY29udHJvbGxlciA9IG5ldyBAQ29tbW9uLkNvbnRyb2xsZXIoKVxuXHRAcm91dGVyID0gbmV3IEBDb21tb24uUm91dGVyIGNvbnRyb2xsZXI6IEBjb250cm9sbGVyXG5cblx0aWYgbm90IEJhY2tib25lLmhpc3Rvcnkuc3RhcnRlZFxuXHRcdEJhY2tib25lLmhpc3Rvcnkuc3RhcnRcblx0XHRcdHB1c2hTdGF0ZTogdHJ1ZVxuXG5qUXVlcnkgPT5cblx0d2luZG93LmFwcC5zdGFydCgpXG5cblx0YChmdW5jdGlvbigpe1xuXHQgICAgLy8gcGFzcyB0byBzdHJpbmcucmVwbGFjZSBmb3IgY2FtZWwgdG8gaHlwaGVuXG5cdCAgICB2YXIgaHlwaGVuYXRlID0gZnVuY3Rpb24oYSwgYiwgYyl7XG5cdCAgICAgICAgcmV0dXJuIGIgKyBcIi1cIiArIGMudG9Mb3dlckNhc2UoKTtcblx0ICAgIH1cblxuXHQgICAgLy8gZ2V0IGNvbXB1dGVkIHN0eWxlIHByb3BlcnR5XG5cdCAgICB2YXIgZ2V0U3R5bGUgPSBmdW5jdGlvbih0YXJnZXQsIHByb3Ape1xuXHQgICAgICAgIGlmKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKXsgLy8gZ2Vja28gYW5kIHdlYmtpdFxuXHQgICAgICAgICAgICBwcm9wID0gcHJvcC5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS8sIGh5cGhlbmF0ZSk7ICAvLyByZXF1aXJlcyBoeXBoZW5hdGVkLCBub3QgY2FtZWxcblx0ICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYodGFyZ2V0LmN1cnJlbnRTdHlsZSl7XG5cdCAgICAgICAgICAgIHJldHVybiB0YXJnZXQuY3VycmVudFN0eWxlW3Byb3BdO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGFyZ2V0LnN0eWxlW3Byb3BdO1xuXHQgICAgfVxuXG5cdCAgICAvLyBnZXQgb2JqZWN0IHdpdGggdW5pdHNcblx0ICAgIGFwcC5nZXRVbml0cyA9IGZ1bmN0aW9uKHRhcmdldCwgcHJvcCl7XG5cblx0ICAgICAgICB2YXIgYmFzZWxpbmUgPSAxMDA7ICAvLyBhbnkgbnVtYmVyIHNlcnZlc1xuXHQgICAgICAgIHZhciBpdGVtOyAgLy8gZ2VuZXJpYyBpdGVyYXRvclxuXG5cdCAgICAgICAgdmFyIG1hcCA9IHsgIC8vIGxpc3Qgb2YgYWxsIHVuaXRzIGFuZCB0aGVpciBpZGVudGlmeWluZyBzdHJpbmdcblx0ICAgICAgICAgICAgcGl4ZWwgOiBcInB4XCIsXG5cdCAgICAgICAgICAgIHBlcmNlbnQgOiBcIiVcIixcblx0ICAgICAgICAgICAgaW5jaDogXCJpblwiLFxuXHQgICAgICAgICAgICBjbSA6IFwiY21cIixcblx0ICAgICAgICAgICAgbW0gOiBcIm1tXCIsXG5cdCAgICAgICAgICAgIHBvaW50IDogXCJwdFwiLFxuXHQgICAgICAgICAgICBwaWNhIDogXCJwY1wiLFxuXHQgICAgICAgICAgICBlbSA6IFwiZW1cIixcblx0ICAgICAgICAgICAgZXggOiBcImV4XCJcblx0ICAgICAgICB9O1xuXG5cdCAgICAgICAgdmFyIGZhY3RvcnMgPSB7fTsgIC8vIGhvbGRzIHJhdGlvc1xuXHQgICAgICAgIHZhciB1bml0cyA9IHt9OyAgLy8gaG9sZHMgY2FsY3VsYXRlZCB2YWx1ZXNcblxuXHQgICAgICAgIHZhciB2YWx1ZSA9IGdldFN0eWxlKHRhcmdldCwgcHJvcCk7ICAvLyBnZXQgdGhlIGNvbXB1dGVkIHN0eWxlIHZhbHVlXG5cblx0ICAgICAgICB2YXIgbnVtZXJpYyA9IHZhbHVlLm1hdGNoKC9cXGQrLyk7ICAvLyBnZXQgdGhlIG51bWVyaWMgY29tcG9uZW50XG5cdCAgICAgICAgaWYobnVtZXJpYyA9PT0gbnVsbCkgeyAgLy8gaWYgbWF0Y2ggcmV0dXJucyBudWxsLCB0aHJvdyBlcnJvci4uLiAgdXNlID09PSBzbyAwIHZhbHVlcyBhcmUgYWNjZXB0ZWRcblx0ICAgICAgICAgICAgdGhyb3cgXCJJbnZhbGlkIHByb3BlcnR5IHZhbHVlIHJldHVybmVkXCI7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIG51bWVyaWMgPSBudW1lcmljWzBdOyAgLy8gZ2V0IHRoZSBzdHJpbmdcblxuXHQgICAgICAgIHZhciB1bml0ID0gdmFsdWUubWF0Y2goL1xcRCskLyk7ICAvLyBnZXQgdGhlIGV4aXN0aW5nIHVuaXRcblx0ICAgICAgICB1bml0ID0gKHVuaXQgPT0gbnVsbCkgPyBtYXAucGl4ZWwgOiB1bml0WzBdOyAvLyBpZiBpdHMgbm90IHNldCwgYXNzdW1lIHB4IC0gb3RoZXJ3aXNlIGdyYWIgc3RyaW5nXG5cblx0ICAgICAgICB2YXIgYWN0aXZlTWFwOyAgLy8gYSByZWZlcmVuY2UgdG8gdGhlIG1hcCBrZXkgZm9yIHRoZSBleGlzdGluZyB1bml0XG5cdCAgICAgICAgZm9yKGl0ZW0gaW4gbWFwKXtcblx0ICAgICAgICAgICAgaWYobWFwW2l0ZW1dID09IHVuaXQpe1xuXHQgICAgICAgICAgICAgICAgYWN0aXZlTWFwID0gaXRlbTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmKCFhY3RpdmVNYXApIHsgLy8gaWYgZXhpc3RpbmcgdW5pdCBpc24ndCBpbiB0aGUgbWFwLCB0aHJvdyBhbiBlcnJvclxuXHQgICAgICAgICAgICB0aHJvdyBcIlVuaXQgbm90IGZvdW5kIGluIG1hcFwiO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHZhciB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTsgIC8vIGNyZWF0ZSB0ZW1wb3JhcnkgZWxlbWVudFxuXHQgICAgICAgIHRlbXAuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiOyAgLy8gaW4gY2FzZSBiYXNlbGluZSBpcyBzZXQgdG9vIGxvd1xuXHQgICAgICAgIHRlbXAuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7ICAvLyBubyBuZWVkIHRvIHNob3cgaXRcblxuXHQgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKHRlbXApOyAvLyBpbnNlcnQgaXQgaW50byB0aGUgcGFyZW50IGZvciBlbSBhbmQgZXhcblxuXHQgICAgICAgIGZvcihpdGVtIGluIG1hcCl7ICAvLyBzZXQgdGhlIHN0eWxlIGZvciBlYWNoIHVuaXQsIHRoZW4gY2FsY3VsYXRlIGl0J3MgcmVsYXRpdmUgdmFsdWUgYWdhaW5zdCB0aGUgYmFzZWxpbmVcblx0ICAgICAgICAgICAgdGVtcC5zdHlsZS53aWR0aCA9IGJhc2VsaW5lICsgbWFwW2l0ZW1dO1xuXHQgICAgICAgICAgICBmYWN0b3JzW2l0ZW1dID0gYmFzZWxpbmUgLyB0ZW1wLm9mZnNldFdpZHRoO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGZvcihpdGVtIGluIG1hcCl7ICAvLyB1c2UgdGhlIHJhdGlvcyBmaWd1cmVkIGluIHRoZSBhYm92ZSBsb29wIHRvIGRldGVybWluZSBjb252ZXJ0ZWQgdmFsdWVzXG5cdCAgICAgICAgICAgIHVuaXRzW2l0ZW1dID0gbnVtZXJpYyAqIChmYWN0b3JzW2l0ZW1dICogZmFjdG9yc1thY3RpdmVNYXBdKTtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0ZW1wKTsgIC8vIGNsZWFuIHVwXG5cblx0ICAgICAgICByZXR1cm4gdW5pdHM7ICAvLyByZXR1cm5zIHRoZSBvYmplY3Qgd2l0aCBjb252ZXJ0ZWQgdW5pdCB2YWx1ZXMuLi5cblxuXHQgICAgfVxuXG5cdCAgICAvLyBleHBvc2Vcblx0ICAgIC8vIGFwcC5nZXRVbml0cyA9IHRoaXMuZ2V0VW5pdHMgPSBnZXRVbml0cztcblxuXHR9KSgpO2BcblxuIl19