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
          var layer, slider, stage, stripesJPG, text;
          stage = new Kinetic.Stage({
            container: "canvas-container",
            width: 800,
            height: 640
          });
          layer = new Kinetic.Layer();
          stripesJPG = new Kinetic.Image({
            x: 10,
            y: 10,
            image: imageObj,
            draggable: true,
            blurRadius: 0
          });
          text = new Kinetic.Text({
            x: 20,
            y: 20,
            text: 'Таскаемый рыба-текст',
            fontSize: '50',
            fontFamily: 'sans-serif',
            fill: 'white',
            stroke: 'red',
            strokeWidth: 2,
            draggable: true
          });
          layer.add(stripesJPG);
          layer.add(text);
          stage.add(layer);
          stripesJPG.cache();
          stripesJPG.filters([Kinetic.Filters.Kaleidoscope]);
          stripesJPG.kaleidoscopePower(5);
          layer.draw();
          slider = document.getElementById("kaleidoscope-slider");
          slider.onchange = function() {
            stripesJPG.kaleidoscopeAngle(slider.value);
            layer.batchDraw();
          };
        };
        return imageObj.src = "/assets/img/stripes.jpg";
      };

      return CardEditorView;

    })(Marionette.ItemView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL1ZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxZQUFaLEVBQTBCLFNBQUMsVUFBRCxHQUFBO1dBQ25CLFVBQVUsQ0FBQztBQUNoQix1Q0FBQSxDQUFBOzs7OztPQUFBOztBQUFBLCtCQUFBLE9BQUEsR0FBUyxJQUFULENBQUE7O0FBQUEsK0JBQ0EsT0FBQSxHQUFTLENBRFQsQ0FBQTs7QUFBQSwrQkFHQSxTQUFBLEdBQVcsa0JBSFgsQ0FBQTs7QUFBQSwrQkFTQSxRQUFBLEdBQVUsU0FBQyxLQUFELEdBQUE7ZUFDVCxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQXZCLENBQThCLElBQUMsQ0FBQSxLQUEvQixFQURTO01BQUEsQ0FUVixDQUFBOztBQUFBLCtCQVlBLFVBQUEsR0FBWSxTQUFBLEdBQUE7ZUFDWCxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxTQUFBLEdBQUE7QUFDWixVQUFBLElBQW9ELElBQUMsQ0FBQSxPQUFELEtBQVksSUFBaEU7bUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxTQUF2QyxFQUFBO1dBRFk7UUFBQSxDQUFiLEVBRFc7TUFBQSxDQVpaLENBQUE7O0FBQUEsK0JBb0JBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDUCxZQUFBLFFBQUE7QUFBQSxRQUFBLFFBQUEsR0FBZSxJQUFBLEtBQUEsQ0FBQSxDQUFmLENBQUE7QUFBQSxRQUNBLFFBQVEsQ0FBQyxNQUFULEdBQWtCLFNBQUEsR0FBQTtBQUNqQixjQUFBLHNDQUFBO0FBQUEsVUFBQSxLQUFBLEdBQVksSUFBQSxPQUFPLENBQUMsS0FBUixDQUNYO0FBQUEsWUFBQSxTQUFBLEVBQVcsa0JBQVg7QUFBQSxZQUNBLEtBQUEsRUFBTyxHQURQO0FBQUEsWUFFQSxNQUFBLEVBQVEsR0FGUjtXQURXLENBQVosQ0FBQTtBQUFBLFVBS0EsS0FBQSxHQUFZLElBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBQSxDQUxaLENBQUE7QUFBQSxVQU9BLFVBQUEsR0FBaUIsSUFBQSxPQUFPLENBQUMsS0FBUixDQUNoQjtBQUFBLFlBQUEsQ0FBQSxFQUFHLEVBQUg7QUFBQSxZQUNBLENBQUEsRUFBRyxFQURIO0FBQUEsWUFFQSxLQUFBLEVBQU8sUUFGUDtBQUFBLFlBR0EsU0FBQSxFQUFXLElBSFg7QUFBQSxZQUlBLFVBQUEsRUFBWSxDQUpaO1dBRGdCLENBUGpCLENBQUE7QUFBQSxVQWNBLElBQUEsR0FBVyxJQUFBLE9BQU8sQ0FBQyxJQUFSLENBQ1Y7QUFBQSxZQUFBLENBQUEsRUFBRyxFQUFIO0FBQUEsWUFDQSxDQUFBLEVBQUcsRUFESDtBQUFBLFlBRUEsSUFBQSxFQUFNLHNCQUZOO0FBQUEsWUFHQSxRQUFBLEVBQVUsSUFIVjtBQUFBLFlBSUEsVUFBQSxFQUFZLFlBSlo7QUFBQSxZQUtBLElBQUEsRUFBTSxPQUxOO0FBQUEsWUFNQSxNQUFBLEVBQVEsS0FOUjtBQUFBLFlBT0EsV0FBQSxFQUFhLENBUGI7QUFBQSxZQVFBLFNBQUEsRUFBVyxJQVJYO1dBRFUsQ0FkWCxDQUFBO0FBQUEsVUF5QkEsS0FBSyxDQUFDLEdBQU4sQ0FBVSxVQUFWLENBekJBLENBQUE7QUFBQSxVQTBCQSxLQUFLLENBQUMsR0FBTixDQUFVLElBQVYsQ0ExQkEsQ0FBQTtBQUFBLFVBMkJBLEtBQUssQ0FBQyxHQUFOLENBQVUsS0FBVixDQTNCQSxDQUFBO0FBQUEsVUE2QkEsVUFBVSxDQUFDLEtBQVgsQ0FBQSxDQTdCQSxDQUFBO0FBQUEsVUE4QkEsVUFBVSxDQUFDLE9BQVgsQ0FBbUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQWpCLENBQW5CLENBOUJBLENBQUE7QUFBQSxVQStCQSxVQUFVLENBQUMsaUJBQVgsQ0FBNkIsQ0FBN0IsQ0EvQkEsQ0FBQTtBQUFBLFVBZ0NBLEtBQUssQ0FBQyxJQUFOLENBQUEsQ0FoQ0EsQ0FBQTtBQUFBLFVBaUNBLE1BQUEsR0FBUyxRQUFRLENBQUMsY0FBVCxDQUF3QixxQkFBeEIsQ0FqQ1QsQ0FBQTtBQUFBLFVBa0NBLE1BQU0sQ0FBQyxRQUFQLEdBQWtCLFNBQUEsR0FBQTtBQUNqQixZQUFBLFVBQVUsQ0FBQyxpQkFBWCxDQUE2QixNQUFNLENBQUMsS0FBcEMsQ0FBQSxDQUFBO0FBQUEsWUFDQSxLQUFLLENBQUMsU0FBTixDQUFBLENBREEsQ0FEaUI7VUFBQSxDQWxDbEIsQ0FEaUI7UUFBQSxDQURsQixDQUFBO2VBMkNBLFFBQVEsQ0FBQyxHQUFULEdBQWUsMEJBNUNSO01BQUEsQ0FwQlIsQ0FBQTs7NEJBQUE7O09BRHVDLFVBQVUsQ0FBQyxVQUQxQjtFQUFBLENBQTFCLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZWRpdG9yL1ZpZXcuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEVkaXRvcicsIChDYXJkRWRpdG9yKSAtPlxuXHRjbGFzcyBDYXJkRWRpdG9yLkNhcmRFZGl0b3JWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlld1xuXHRcdGxvZ2dpbmc6IG9uXG5cdFx0Y291bnRlcjogMFxuXG5cdFx0Y2xhc3NOYW1lOiAnY2FyZC1lZGl0b3ItdmlldydcblxuXHRcdCMgdWk6XG5cdFx0XHRcdFx0XG5cdFx0IyBldmVudHM6XG5cblx0XHR0ZW1wbGF0ZTogKG1vZGVsKSAtPlxuXHRcdFx0dGVtcGxhdGl6ZXIuY2FyZEVkaXRvci5lZGl0b3IgQG1vZGVsXG5cblx0XHRpbml0aWFsaXplOiAtPlxuXHRcdFx0QGJpbmQgJ2FsbCcsIC0+XG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiQ0FSRFMgQ09NUE9TSVRFIFZJRVc6XFx0XCIsIGFyZ3VtZW50cyBpZiBAbG9nZ2luZyBpcyBvblxuXHRcdFx0XG5cdFx0XHQjIEBzdGF0ZSAgICAgID0gbmV3IEJhY2tib25lLk1vZGVsKClcblx0XHRcdCMgQG1vZGVsICAgICAgPSBuZXcgQ2FyZEdlbmVyYXRvci5zdGVwRm9ybS5TdGVwRm9ybU1vZGVsKClcblx0XHRcdCMgQGNvbGxlY3Rpb24gPSBuZXcgQ2FyZEdlbmVyYXRvci5jYXJkcy5DYXJkc0NvbGxlY3Rpb24oKVxuXG5cdFx0b25TaG93OiA9PlxuXHRcdFx0aW1hZ2VPYmogPSBuZXcgSW1hZ2UoKVxuXHRcdFx0aW1hZ2VPYmoub25sb2FkID0gLT5cblx0XHRcdFx0c3RhZ2UgPSBuZXcgS2luZXRpYy5TdGFnZVxuXHRcdFx0XHRcdGNvbnRhaW5lcjogXCJjYW52YXMtY29udGFpbmVyXCJcblx0XHRcdFx0XHR3aWR0aDogODAwXG5cdFx0XHRcdFx0aGVpZ2h0OiA2NDBcblxuXHRcdFx0XHRsYXllciA9IG5ldyBLaW5ldGljLkxheWVyKClcblxuXHRcdFx0XHRzdHJpcGVzSlBHID0gbmV3IEtpbmV0aWMuSW1hZ2Vcblx0XHRcdFx0XHR4OiAxMFxuXHRcdFx0XHRcdHk6IDEwXG5cdFx0XHRcdFx0aW1hZ2U6IGltYWdlT2JqXG5cdFx0XHRcdFx0ZHJhZ2dhYmxlOiB0cnVlXG5cdFx0XHRcdFx0Ymx1clJhZGl1czogMFxuXG5cdFx0XHRcdHRleHQgPSBuZXcgS2luZXRpYy5UZXh0XG5cdFx0XHRcdFx0eDogMjBcblx0XHRcdFx0XHR5OiAyMFxuXHRcdFx0XHRcdHRleHQ6ICfQotCw0YHQutCw0LXQvNGL0Lkg0YDRi9Cx0LAt0YLQtdC60YHRgidcblx0XHRcdFx0XHRmb250U2l6ZTogJzUwJ1xuXHRcdFx0XHRcdGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJ1xuXHRcdFx0XHRcdGZpbGw6ICd3aGl0ZSdcblx0XHRcdFx0XHRzdHJva2U6ICdyZWQnXG5cdFx0XHRcdFx0c3Ryb2tlV2lkdGg6IDJcblx0XHRcdFx0XHRkcmFnZ2FibGU6IHRydWVcblxuXHRcdFx0XHRsYXllci5hZGQgc3RyaXBlc0pQR1xuXHRcdFx0XHRsYXllci5hZGQgdGV4dFxuXHRcdFx0XHRzdGFnZS5hZGQgbGF5ZXJcblxuXHRcdFx0XHRzdHJpcGVzSlBHLmNhY2hlKClcblx0XHRcdFx0c3RyaXBlc0pQRy5maWx0ZXJzIFtLaW5ldGljLkZpbHRlcnMuS2FsZWlkb3Njb3BlXVxuXHRcdFx0XHRzdHJpcGVzSlBHLmthbGVpZG9zY29wZVBvd2VyIDVcblx0XHRcdFx0bGF5ZXIuZHJhdygpXG5cdFx0XHRcdHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwia2FsZWlkb3Njb3BlLXNsaWRlclwiKVxuXHRcdFx0XHRzbGlkZXIub25jaGFuZ2UgPSAtPlxuXHRcdFx0XHRcdHN0cmlwZXNKUEcua2FsZWlkb3Njb3BlQW5nbGUgc2xpZGVyLnZhbHVlXG5cdFx0XHRcdFx0bGF5ZXIuYmF0Y2hEcmF3KClcblx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0aW1hZ2VPYmouc3JjID0gXCIvYXNzZXRzL2ltZy9zdHJpcGVzLmpwZ1wiXG4iXX0=