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

//# sourceMappingURL=data:application/json;base64,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Iiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiZGVsYXkgPSAobXMsIGZuKSAtPiBzZXRUaW1lb3V0IG1zLCBmblxuXG5jbGFzcyB3aW5kb3cuQXBwIGV4dGVuZHMgTWFyaW9uZXR0ZS5BcHBsaWNhdGlvblxuXHRsb2dnZXI6IG9mZlxuXHRcblx0dmlldzogbmV3IEJhY2tib25lLlZpZXdcblx0XHRlbDogJCgnI2FwcCcpXG5cblx0cmVnaW9uczpcblx0XHRtYWluUmVnaW9uOiAnI2FwcCdcblx0XHRcblx0Z2V0UmFuZG9tOiAobWluID0gMCxtYXggPSAxMDAsZGVjaW1hbCA9IDApIC0+XG5cdFx0KyhNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pLnRvRml4ZWQoZGVjaW1hbClcblxuXHQjIHVzZSB0aGlzIGZ1bmN0aW9uIGlmIHlvdSB3YW50IHRvIGFkZCB5b3VyIG93biBnZW5lcmF0b3IsIGFuZCBkbyBub3Qga25vdyBob3cgdG8gZG8gdGhpc1xuXHRnZXRHZW5lcmF0b3JzID0gPT5cblx0XHRnZW5lcmF0b3JzTGlzdCA9IFtcblx0XHRcdCMgJ3NjcmlwdHMvZ2VuZXJhdG9ycy9yYW5kb20tY3NzLWdyYWRpZW50LWdlbmVyYXRvci5qcydcblx0XHRdXG5cdFx0Z2VuZXJhdG9yc0NvdW50ZXIgPSAwXG5cdFx0aWYgZ2VuZXJhdG9yc0xpc3QubGVuZ3RoID4wXG5cdFx0XHRmb3IgaSBpbiBbMC4uLmdlbmVyYXRvcnNMaXN0Lmxlbmd0aF1cblx0XHRcdFx0JC5nZXQgZ2VuZXJhdG9yc0xpc3RbaV0sKHJlcykgLT4gXG5cdFx0XHRcdFx0Z2VuZXJhdG9yc0NvdW50ZXIrK1xuXHRcdFx0XHRcdGlmIGdlbmVyYXRvcnNDb3VudGVyIGlzIGdlbmVyYXRvcnNMaXN0Lmxlbmd0aFxuXHRcdFx0XHRcdFx0cmVhZHlUaW1lID0gRGF0ZS5ub3coKVxuXHRcdFx0XHRcdFx0Y29uc29sZS5pbmZvICdnZW5lcmF0b3JzIGxvYWRlZCBhdCA6ICcgKyAocmVhZHlUaW1lLXN0YXJ0VGltZSkgKyAnIG1pbGlzZWNvbmRzJ1xuXHRcdGVsc2Vcblx0XHRcdCdubyBwbHVnaW4nXG5cblx0Z2VuZXJhdG9ycyA6IHt9XG5cblxud2luZG93LmFwcCA9IG5ldyBBcHBcbndpbmRvdy5hcHAubW9kdWxlICdDb21tb24nXG53aW5kb3cuYXBwLmFkZEluaXRpYWxpemVyIC0+XG5cdEBiaW5kICdhbGwnLCAodHJpZ2dlciwgYXJncykgPT4gXG5cdFx0aWYgQGxvZ2dlciBpcyBvblxuXHRcdFx0ZGF0ZSA9IG5ldyBEYXRlKClcblx0XHRcdGNvbnNvbGUuaW5mbyhcIkFwcCBzYXlzIDogI3sgdHJpZ2dlciB9IGF0ICN7ZGF0ZS5nZXRIb3VycygpfToje2RhdGUuZ2V0TWludXRlcygpfToje2RhdGUuZ2V0U2Vjb25kcygpfS4je2RhdGUuZ2V0TWlsbGlzZWNvbmRzKCl9XCIgLGFyZ3MpXG5cdEBzdGFydFRpbWUgPSBEYXRlLm5vdygpXG5cdEB0cmlnZ2VyICdpbml0aWFsaXplJ1xuXG5cdEBjb250cm9sbGVyID0gbmV3IEBDb21tb24uQ29udHJvbGxlcigpXG5cdEByb3V0ZXIgPSBuZXcgQENvbW1vbi5Sb3V0ZXIgY29udHJvbGxlcjogQGNvbnRyb2xsZXJcblxuXHRpZiBub3QgQmFja2JvbmUuaGlzdG9yeS5zdGFydGVkXG5cdFx0QmFja2JvbmUuaGlzdG9yeS5zdGFydFxuXHRcdFx0cHVzaFN0YXRlOiB0cnVlXG5cbmpRdWVyeSA9PlxuXHR3aW5kb3cuYXBwLnN0YXJ0KClcblxuXHRgKGZ1bmN0aW9uKCl7XG5cdCAgICAvLyBwYXNzIHRvIHN0cmluZy5yZXBsYWNlIGZvciBjYW1lbCB0byBoeXBoZW5cblx0ICAgIHZhciBoeXBoZW5hdGUgPSBmdW5jdGlvbihhLCBiLCBjKXtcblx0ICAgICAgICByZXR1cm4gYiArIFwiLVwiICsgYy50b0xvd2VyQ2FzZSgpO1xuXHQgICAgfVxuXHQgXG5cdCAgICAvLyBnZXQgY29tcHV0ZWQgc3R5bGUgcHJvcGVydHlcblx0ICAgIHZhciBnZXRTdHlsZSA9IGZ1bmN0aW9uKHRhcmdldCwgcHJvcCl7XG5cdCAgICAgICAgaWYod2luZG93LmdldENvbXB1dGVkU3R5bGUpeyAvLyBnZWNrbyBhbmQgd2Via2l0XG5cdCAgICAgICAgICAgIHByb3AgPSBwcm9wLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pLywgaHlwaGVuYXRlKTsgIC8vIHJlcXVpcmVzIGh5cGhlbmF0ZWQsIG5vdCBjYW1lbFxuXHQgICAgICAgICAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGFyZ2V0LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3ApO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZih0YXJnZXQuY3VycmVudFN0eWxlKXtcblx0ICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5jdXJyZW50U3R5bGVbcHJvcF07XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0YXJnZXQuc3R5bGVbcHJvcF07XG5cdCAgICB9XG5cdCBcblx0ICAgIC8vIGdldCBvYmplY3Qgd2l0aCB1bml0c1xuXHQgICAgYXBwLmdldFVuaXRzID0gZnVuY3Rpb24odGFyZ2V0LCBwcm9wKXtcblx0IFxuXHQgICAgICAgIHZhciBiYXNlbGluZSA9IDEwMDsgIC8vIGFueSBudW1iZXIgc2VydmVzIFxuXHQgICAgICAgIHZhciBpdGVtOyAgLy8gZ2VuZXJpYyBpdGVyYXRvclxuXHQgXG5cdCAgICAgICAgdmFyIG1hcCA9IHsgIC8vIGxpc3Qgb2YgYWxsIHVuaXRzIGFuZCB0aGVpciBpZGVudGlmeWluZyBzdHJpbmdcblx0ICAgICAgICAgICAgcGl4ZWwgOiBcInB4XCIsXG5cdCAgICAgICAgICAgIHBlcmNlbnQgOiBcIiVcIixcblx0ICAgICAgICAgICAgaW5jaDogXCJpblwiLFxuXHQgICAgICAgICAgICBjbSA6IFwiY21cIixcblx0ICAgICAgICAgICAgbW0gOiBcIm1tXCIsXG5cdCAgICAgICAgICAgIHBvaW50IDogXCJwdFwiLFxuXHQgICAgICAgICAgICBwaWNhIDogXCJwY1wiLFxuXHQgICAgICAgICAgICBlbSA6IFwiZW1cIixcblx0ICAgICAgICAgICAgZXggOiBcImV4XCJcblx0ICAgICAgICB9O1xuXHQgXG5cdCAgICAgICAgdmFyIGZhY3RvcnMgPSB7fTsgIC8vIGhvbGRzIHJhdGlvc1xuXHQgICAgICAgIHZhciB1bml0cyA9IHt9OyAgLy8gaG9sZHMgY2FsY3VsYXRlZCB2YWx1ZXNcblx0IFxuXHQgICAgICAgIHZhciB2YWx1ZSA9IGdldFN0eWxlKHRhcmdldCwgcHJvcCk7ICAvLyBnZXQgdGhlIGNvbXB1dGVkIHN0eWxlIHZhbHVlXG5cdCBcblx0ICAgICAgICB2YXIgbnVtZXJpYyA9IHZhbHVlLm1hdGNoKC9cXGQrLyk7ICAvLyBnZXQgdGhlIG51bWVyaWMgY29tcG9uZW50XG5cdCAgICAgICAgaWYobnVtZXJpYyA9PT0gbnVsbCkgeyAgLy8gaWYgbWF0Y2ggcmV0dXJucyBudWxsLCB0aHJvdyBlcnJvci4uLiAgdXNlID09PSBzbyAwIHZhbHVlcyBhcmUgYWNjZXB0ZWRcblx0ICAgICAgICAgICAgdGhyb3cgXCJJbnZhbGlkIHByb3BlcnR5IHZhbHVlIHJldHVybmVkXCI7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIG51bWVyaWMgPSBudW1lcmljWzBdOyAgLy8gZ2V0IHRoZSBzdHJpbmdcblx0IFxuXHQgICAgICAgIHZhciB1bml0ID0gdmFsdWUubWF0Y2goL1xcRCskLyk7ICAvLyBnZXQgdGhlIGV4aXN0aW5nIHVuaXRcblx0ICAgICAgICB1bml0ID0gKHVuaXQgPT0gbnVsbCkgPyBtYXAucGl4ZWwgOiB1bml0WzBdOyAvLyBpZiBpdHMgbm90IHNldCwgYXNzdW1lIHB4IC0gb3RoZXJ3aXNlIGdyYWIgc3RyaW5nXG5cdCBcblx0ICAgICAgICB2YXIgYWN0aXZlTWFwOyAgLy8gYSByZWZlcmVuY2UgdG8gdGhlIG1hcCBrZXkgZm9yIHRoZSBleGlzdGluZyB1bml0XG5cdCAgICAgICAgZm9yKGl0ZW0gaW4gbWFwKXtcblx0ICAgICAgICAgICAgaWYobWFwW2l0ZW1dID09IHVuaXQpe1xuXHQgICAgICAgICAgICAgICAgYWN0aXZlTWFwID0gaXRlbTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmKCFhY3RpdmVNYXApIHsgLy8gaWYgZXhpc3RpbmcgdW5pdCBpc24ndCBpbiB0aGUgbWFwLCB0aHJvdyBhbiBlcnJvclxuXHQgICAgICAgICAgICB0aHJvdyBcIlVuaXQgbm90IGZvdW5kIGluIG1hcFwiO1xuXHQgICAgICAgIH1cblx0IFxuXHQgICAgICAgIHZhciB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTsgIC8vIGNyZWF0ZSB0ZW1wb3JhcnkgZWxlbWVudFxuXHQgICAgICAgIHRlbXAuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiOyAgLy8gaW4gY2FzZSBiYXNlbGluZSBpcyBzZXQgdG9vIGxvd1xuXHQgICAgICAgIHRlbXAuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7ICAvLyBubyBuZWVkIHRvIHNob3cgaXRcblx0IFxuXHQgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKHRlbXApOyAvLyBpbnNlcnQgaXQgaW50byB0aGUgcGFyZW50IGZvciBlbSBhbmQgZXggIFxuXHQgXG5cdCAgICAgICAgZm9yKGl0ZW0gaW4gbWFwKXsgIC8vIHNldCB0aGUgc3R5bGUgZm9yIGVhY2ggdW5pdCwgdGhlbiBjYWxjdWxhdGUgaXQncyByZWxhdGl2ZSB2YWx1ZSBhZ2FpbnN0IHRoZSBiYXNlbGluZVxuXHQgICAgICAgICAgICB0ZW1wLnN0eWxlLndpZHRoID0gYmFzZWxpbmUgKyBtYXBbaXRlbV07XG5cdCAgICAgICAgICAgIGZhY3RvcnNbaXRlbV0gPSBiYXNlbGluZSAvIHRlbXAub2Zmc2V0V2lkdGg7XG5cdCAgICAgICAgfVxuXHQgXG5cdCAgICAgICAgZm9yKGl0ZW0gaW4gbWFwKXsgIC8vIHVzZSB0aGUgcmF0aW9zIGZpZ3VyZWQgaW4gdGhlIGFib3ZlIGxvb3AgdG8gZGV0ZXJtaW5lIGNvbnZlcnRlZCB2YWx1ZXNcblx0ICAgICAgICAgICAgdW5pdHNbaXRlbV0gPSBudW1lcmljICogKGZhY3RvcnNbaXRlbV0gKiBmYWN0b3JzW2FjdGl2ZU1hcF0pO1xuXHQgICAgICAgIH1cblx0IFxuXHQgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRlbXApOyAgLy8gY2xlYW4gdXBcblx0IFxuXHQgICAgICAgIHJldHVybiB1bml0czsgIC8vIHJldHVybnMgdGhlIG9iamVjdCB3aXRoIGNvbnZlcnRlZCB1bml0IHZhbHVlcy4uLlxuXHQgXG5cdCAgICB9XG5cdCBcblx0ICAgIC8vIGV4cG9zZSAgICAgICAgICAgXG5cdCAgICAvLyBhcHAuZ2V0VW5pdHMgPSB0aGlzLmdldFVuaXRzID0gZ2V0VW5pdHM7XG5cdCBcblx0fSkoKTtgXG5cbiJdfQ==