(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardEditor', function(CardEditor) {
    return CardEditor.CardEditorView = (function(_super) {
      __extends(CardEditorView, _super);

      function CardEditorView() {
        this.onShow = __bind(this.onShow, this);
        return CardEditorView.__super__.constructor.apply(this, arguments);
      }

      CardEditorView.prototype.logging = true;

      CardEditorView.prototype.counter = 0;

      CardEditorView.prototype.className = 'card-editor-view';

      CardEditorView.prototype.template = function(model) {
        return templatizer.cardEditor.editor(this.model);
      };

      CardEditorView.prototype.initialize = function() {
        return this.bind('all', function() {
          if (this.logging === true) {
            return console.log("CARDS COMPOSITE VIEW:\t", arguments);
          }
        });
      };

      CardEditorView.prototype.onShow = function() {
        var imageObj;
        imageObj = new Image();
        imageObj.onload = function() {
          var darth, layer, slider, stage;
          stage = new Kinetic.Stage({
            container: "canvas-container",
            width: 700,
            height: 600
          });
          layer = new Kinetic.Layer();
          darth = new Kinetic.Image({
            x: 10,
            y: 10,
            image: imageObj,
            draggable: true,
            blurRadius: 20
          });
          layer.add(darth);
          stage.add(layer);
          darth.cache();
          darth.filters([Kinetic.Filters.Kaleidoscope]);
          darth.kaleidoscopePower(3);
          layer.draw();
          slider = document.getElementById("slider");
          slider.onchange = function() {
            darth.kaleidoscopeAngle(slider.value);
            layer.batchDraw();
          };
        };
        return imageObj.src = "/assets/img/darth-vader.jpg";
      };

      return CardEditorView;

    })(Marionette.ItemView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL1ZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxZQUFaLEVBQTBCLFNBQUMsVUFBRCxHQUFBO1dBQ25CLFVBQVUsQ0FBQztBQUNoQix1Q0FBQSxDQUFBOzs7OztPQUFBOztBQUFBLCtCQUFBLE9BQUEsR0FBUyxJQUFULENBQUE7O0FBQUEsK0JBQ0EsT0FBQSxHQUFTLENBRFQsQ0FBQTs7QUFBQSwrQkFHQSxTQUFBLEdBQVcsa0JBSFgsQ0FBQTs7QUFBQSwrQkFTQSxRQUFBLEdBQVUsU0FBQyxLQUFELEdBQUE7ZUFDVCxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQXZCLENBQThCLElBQUMsQ0FBQSxLQUEvQixFQURTO01BQUEsQ0FUVixDQUFBOztBQUFBLCtCQVlBLFVBQUEsR0FBWSxTQUFBLEdBQUE7ZUFDWCxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxTQUFBLEdBQUE7QUFDWixVQUFBLElBQW9ELElBQUMsQ0FBQSxPQUFELEtBQVksSUFBaEU7bUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxTQUF2QyxFQUFBO1dBRFk7UUFBQSxDQUFiLEVBRFc7TUFBQSxDQVpaLENBQUE7O0FBQUEsK0JBb0JBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDUCxZQUFBLFFBQUE7QUFBQSxRQUFBLFFBQUEsR0FBZSxJQUFBLEtBQUEsQ0FBQSxDQUFmLENBQUE7QUFBQSxRQUNBLFFBQVEsQ0FBQyxNQUFULEdBQWtCLFNBQUEsR0FBQTtBQUNqQixjQUFBLDJCQUFBO0FBQUEsVUFBQSxLQUFBLEdBQVksSUFBQSxPQUFPLENBQUMsS0FBUixDQUNYO0FBQUEsWUFBQSxTQUFBLEVBQVcsa0JBQVg7QUFBQSxZQUNBLEtBQUEsRUFBTyxHQURQO0FBQUEsWUFFQSxNQUFBLEVBQVEsR0FGUjtXQURXLENBQVosQ0FBQTtBQUFBLFVBS0EsS0FBQSxHQUFZLElBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBQSxDQUxaLENBQUE7QUFBQSxVQU1BLEtBQUEsR0FBWSxJQUFBLE9BQU8sQ0FBQyxLQUFSLENBQ1g7QUFBQSxZQUFBLENBQUEsRUFBRyxFQUFIO0FBQUEsWUFDQSxDQUFBLEVBQUcsRUFESDtBQUFBLFlBRUEsS0FBQSxFQUFPLFFBRlA7QUFBQSxZQUdBLFNBQUEsRUFBVyxJQUhYO0FBQUEsWUFJQSxVQUFBLEVBQVksRUFKWjtXQURXLENBTlosQ0FBQTtBQUFBLFVBYUEsS0FBSyxDQUFDLEdBQU4sQ0FBVSxLQUFWLENBYkEsQ0FBQTtBQUFBLFVBY0EsS0FBSyxDQUFDLEdBQU4sQ0FBVSxLQUFWLENBZEEsQ0FBQTtBQUFBLFVBZUEsS0FBSyxDQUFDLEtBQU4sQ0FBQSxDQWZBLENBQUE7QUFBQSxVQWdCQSxLQUFLLENBQUMsT0FBTixDQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFqQixDQUFkLENBaEJBLENBQUE7QUFBQSxVQWlCQSxLQUFLLENBQUMsaUJBQU4sQ0FBd0IsQ0FBeEIsQ0FqQkEsQ0FBQTtBQUFBLFVBa0JBLEtBQUssQ0FBQyxJQUFOLENBQUEsQ0FsQkEsQ0FBQTtBQUFBLFVBbUJBLE1BQUEsR0FBUyxRQUFRLENBQUMsY0FBVCxDQUF3QixRQUF4QixDQW5CVCxDQUFBO0FBQUEsVUFvQkEsTUFBTSxDQUFDLFFBQVAsR0FBa0IsU0FBQSxHQUFBO0FBQ2pCLFlBQUEsS0FBSyxDQUFDLGlCQUFOLENBQXdCLE1BQU0sQ0FBQyxLQUEvQixDQUFBLENBQUE7QUFBQSxZQUNBLEtBQUssQ0FBQyxTQUFOLENBQUEsQ0FEQSxDQURpQjtVQUFBLENBcEJsQixDQURpQjtRQUFBLENBRGxCLENBQUE7ZUE2QkEsUUFBUSxDQUFDLEdBQVQsR0FBZSw4QkE5QlI7TUFBQSxDQXBCUixDQUFBOzs0QkFBQTs7T0FEdUMsVUFBVSxDQUFDLFVBRDFCO0VBQUEsQ0FBMUIsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZF9lZGl0b3IvVmlldy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkRWRpdG9yJywgKENhcmRFZGl0b3IpIC0+XG5cdGNsYXNzIENhcmRFZGl0b3IuQ2FyZEVkaXRvclZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkl0ZW1WaWV3XG5cdFx0bG9nZ2luZzogb25cblx0XHRjb3VudGVyOiAwXG5cblx0XHRjbGFzc05hbWU6ICdjYXJkLWVkaXRvci12aWV3J1xuXG5cdFx0IyB1aTpcblx0XHRcdFx0XHRcblx0XHQjIGV2ZW50czpcblxuXHRcdHRlbXBsYXRlOiAobW9kZWwpIC0+XG5cdFx0XHR0ZW1wbGF0aXplci5jYXJkRWRpdG9yLmVkaXRvciBAbW9kZWxcblxuXHRcdGluaXRpYWxpemU6IC0+XG5cdFx0XHRAYmluZCAnYWxsJywgLT5cblx0XHRcdFx0Y29uc29sZS5sb2cgXCJDQVJEUyBDT01QT1NJVEUgVklFVzpcXHRcIiwgYXJndW1lbnRzIGlmIEBsb2dnaW5nIGlzIG9uXG5cdFx0XHRcblx0XHRcdCMgQHN0YXRlICAgICAgPSBuZXcgQmFja2JvbmUuTW9kZWwoKVxuXHRcdFx0IyBAbW9kZWwgICAgICA9IG5ldyBDYXJkR2VuZXJhdG9yLnN0ZXBGb3JtLlN0ZXBGb3JtTW9kZWwoKVxuXHRcdFx0IyBAY29sbGVjdGlvbiA9IG5ldyBDYXJkR2VuZXJhdG9yLmNhcmRzLkNhcmRzQ29sbGVjdGlvbigpXG5cblx0XHRvblNob3c6ID0+XG5cdFx0XHRpbWFnZU9iaiA9IG5ldyBJbWFnZSgpXG5cdFx0XHRpbWFnZU9iai5vbmxvYWQgPSAtPlxuXHRcdFx0XHRzdGFnZSA9IG5ldyBLaW5ldGljLlN0YWdlKFxuXHRcdFx0XHRcdGNvbnRhaW5lcjogXCJjYW52YXMtY29udGFpbmVyXCJcblx0XHRcdFx0XHR3aWR0aDogNzAwXG5cdFx0XHRcdFx0aGVpZ2h0OiA2MDBcblx0XHRcdFx0KVxuXHRcdFx0XHRsYXllciA9IG5ldyBLaW5ldGljLkxheWVyKClcblx0XHRcdFx0ZGFydGggPSBuZXcgS2luZXRpYy5JbWFnZShcblx0XHRcdFx0XHR4OiAxMFxuXHRcdFx0XHRcdHk6IDEwXG5cdFx0XHRcdFx0aW1hZ2U6IGltYWdlT2JqXG5cdFx0XHRcdFx0ZHJhZ2dhYmxlOiB0cnVlXG5cdFx0XHRcdFx0Ymx1clJhZGl1czogMjBcblx0XHRcdFx0KVxuXHRcdFx0XHRsYXllci5hZGQgZGFydGhcblx0XHRcdFx0c3RhZ2UuYWRkIGxheWVyXG5cdFx0XHRcdGRhcnRoLmNhY2hlKClcblx0XHRcdFx0ZGFydGguZmlsdGVycyBbS2luZXRpYy5GaWx0ZXJzLkthbGVpZG9zY29wZV1cblx0XHRcdFx0ZGFydGgua2FsZWlkb3Njb3BlUG93ZXIgM1xuXHRcdFx0XHRsYXllci5kcmF3KClcblx0XHRcdFx0c2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzbGlkZXJcIilcblx0XHRcdFx0c2xpZGVyLm9uY2hhbmdlID0gLT5cblx0XHRcdFx0XHRkYXJ0aC5rYWxlaWRvc2NvcGVBbmdsZSBzbGlkZXIudmFsdWVcblx0XHRcdFx0XHRsYXllci5iYXRjaERyYXcoKVxuXHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdHJldHVyblxuXG5cdFx0XHRpbWFnZU9iai5zcmMgPSBcIi9hc3NldHMvaW1nL2RhcnRoLXZhZGVyLmpwZ1wiXG4iXX0=