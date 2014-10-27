(function() {
  var __slice = [].slice;

  this.app.module('shared.generators.starsGen', function(StarsGen) {});

  this.options = {
    counter: 0,
    starsAmount: 0
  };

  this.draw = function() {
    var args, canvas, colors, context, innerRadius, model, nPoints, outerRadius, randomColor, randomColorNum, star, xCenter, yCenter;
    canvas = arguments[0], model = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    star = (function(_this) {
      return function(context, xCenter, yCenter, nPoints, outerRadius, innerRadius) {
        var angle, ixVertex, radius;
        context.beginPath();
        ixVertex = 0;
        while (ixVertex <= 2 * nPoints) {
          angle = ixVertex * Math.PI / nPoints - Math.PI / 2;
          radius = (ixVertex % 2 === 0 ? innerRadius : outerRadius);
          context.lineTo(xCenter + radius * Math.cos(angle), yCenter + radius * Math.sin(angle));
          ++ixVertex;
        }
      };
    })(this);
    if (this.options.starsAmount === 0) {
      this.options.starsAmount = app.getRandom(3, 20);
    }
    context = canvas.getContext('2d');
    xCenter = app.getRandom(0, canvas.width);
    yCenter = app.getRandom(0, canvas.height);
    nPoints = app.getRandom(3, 20);
    outerRadius = app.getRandom(canvas.width / 6, canvas.width / 2);
    innerRadius = app.getRandom(canvas.width / 10, canvas.width / 14);
    colors = model.get('generators.gradientGen.colorScheme');
    randomColorNum = app.getRandom(0, colors.length - 1);
    randomColor = colors[randomColorNum];
    context.beginPath();
    star(context, xCenter, yCenter, nPoints, outerRadius, innerRadius);
    context.fillStyle = '#' + randomColor;
    context.fill();
    return this.options.counter++;
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9nZW5lcmF0b3JzL3N0YXJzLWdlbmVyYXRvci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUM7QUFBQSxNQUFBLGtCQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksNEJBQVosRUFBMEMsU0FBQyxRQUFELEdBQUEsQ0FBMUMsQ0FBQSxDQUFBOztBQUFBLEVBRUEsSUFBQyxDQUFBLE9BQUQsR0FDQztBQUFBLElBQUEsT0FBQSxFQUFTLENBQVQ7QUFBQSxJQUNBLFdBQUEsRUFBYSxDQURiO0dBSEQsQ0FBQTs7QUFBQSxFQU1BLElBQUMsQ0FBQSxJQUFELEdBQVEsU0FBQSxHQUFBO0FBQ1AsUUFBQSw0SEFBQTtBQUFBLElBRFEsdUJBQU8sc0JBQU0sOERBQ3JCLENBQUE7QUFBQSxJQUFBLElBQUEsR0FBTyxDQUFBLFNBQUEsS0FBQSxHQUFBO2FBQUEsU0FBQyxPQUFELEVBQVUsT0FBVixFQUFtQixPQUFuQixFQUE0QixPQUE1QixFQUFxQyxXQUFyQyxFQUFrRCxXQUFsRCxHQUFBO0FBRU4sWUFBQSx1QkFBQTtBQUFBLFFBQUEsT0FBTyxDQUFDLFNBQVIsQ0FBQSxDQUFBLENBQUE7QUFBQSxRQUNBLFFBQUEsR0FBVyxDQURYLENBQUE7QUFHQSxlQUFNLFFBQUEsSUFBWSxDQUFBLEdBQUksT0FBdEIsR0FBQTtBQUNDLFVBQUEsS0FBQSxHQUFRLFFBQUEsR0FBVyxJQUFJLENBQUMsRUFBaEIsR0FBcUIsT0FBckIsR0FBK0IsSUFBSSxDQUFDLEVBQUwsR0FBVSxDQUFqRCxDQUFBO0FBQUEsVUFDQSxNQUFBLEdBQVMsQ0FBSSxRQUFBLEdBQVcsQ0FBWCxLQUFnQixDQUFuQixHQUEwQixXQUExQixHQUEyQyxXQUE1QyxDQURULENBQUE7QUFBQSxVQUVBLE9BQU8sQ0FBQyxNQUFSLENBQWUsT0FBQSxHQUFVLE1BQUEsR0FBUyxJQUFJLENBQUMsR0FBTCxDQUFTLEtBQVQsQ0FBbEMsRUFBbUQsT0FBQSxHQUFVLE1BQUEsR0FBUyxJQUFJLENBQUMsR0FBTCxDQUFTLEtBQVQsQ0FBdEUsQ0FGQSxDQUFBO0FBQUEsVUFHQSxFQUFBLFFBSEEsQ0FERDtRQUFBLENBTE07TUFBQSxFQUFBO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFQLENBQUE7QUFZQSxJQUFBLElBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxXQUFULEtBQXdCLENBQTNCO0FBQWtDLE1BQUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxXQUFULEdBQXVCLEdBQUcsQ0FBQyxTQUFKLENBQWUsQ0FBZixFQUFrQixFQUFsQixDQUF2QixDQUFsQztLQVpBO0FBQUEsSUFjQSxPQUFBLEdBQVUsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsSUFBbEIsQ0FkVixDQUFBO0FBQUEsSUFnQkEsT0FBQSxHQUFVLEdBQUcsQ0FBQyxTQUFKLENBQWUsQ0FBZixFQUFrQixNQUFNLENBQUMsS0FBekIsQ0FoQlYsQ0FBQTtBQUFBLElBaUJBLE9BQUEsR0FBVSxHQUFHLENBQUMsU0FBSixDQUFlLENBQWYsRUFBa0IsTUFBTSxDQUFDLE1BQXpCLENBakJWLENBQUE7QUFBQSxJQWtCQSxPQUFBLEdBQVUsR0FBRyxDQUFDLFNBQUosQ0FBZSxDQUFmLEVBQWtCLEVBQWxCLENBbEJWLENBQUE7QUFBQSxJQW1CQSxXQUFBLEdBQWMsR0FBRyxDQUFDLFNBQUosQ0FBZSxNQUFNLENBQUMsS0FBUCxHQUFhLENBQTVCLEVBQStCLE1BQU0sQ0FBQyxLQUFQLEdBQWEsQ0FBNUMsQ0FuQmQsQ0FBQTtBQUFBLElBb0JBLFdBQUEsR0FBYyxHQUFHLENBQUMsU0FBSixDQUFlLE1BQU0sQ0FBQyxLQUFQLEdBQWEsRUFBNUIsRUFBZ0MsTUFBTSxDQUFDLEtBQVAsR0FBYSxFQUE3QyxDQXBCZCxDQUFBO0FBQUEsSUFzQkEsTUFBQSxHQUFTLEtBQUssQ0FBQyxHQUFOLENBQVUsb0NBQVYsQ0F0QlQsQ0FBQTtBQUFBLElBd0JBLGNBQUEsR0FBaUIsR0FBRyxDQUFDLFNBQUosQ0FBYyxDQUFkLEVBQWlCLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLENBQWpDLENBeEJqQixDQUFBO0FBQUEsSUF5QkEsV0FBQSxHQUFjLE1BQVEsQ0FBQSxjQUFBLENBekJ0QixDQUFBO0FBQUEsSUEyQkEsT0FBTyxDQUFDLFNBQVIsQ0FBQSxDQTNCQSxDQUFBO0FBQUEsSUE2QkEsSUFBQSxDQUFLLE9BQUwsRUFBYyxPQUFkLEVBQXVCLE9BQXZCLEVBQWdDLE9BQWhDLEVBQXlDLFdBQXpDLEVBQXNELFdBQXRELENBN0JBLENBQUE7QUFBQSxJQStCQSxPQUFPLENBQUMsU0FBUixHQUFvQixHQUFBLEdBQU0sV0EvQjFCLENBQUE7QUFBQSxJQWdDQSxPQUFPLENBQUMsSUFBUixDQUFBLENBaENBLENBQUE7V0FrQ0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULEdBbkNPO0VBQUEsQ0FOUixDQUFBO0FBQUEiLCJmaWxlIjoic2hhcmVkL2dlbmVyYXRvcnMvc3RhcnMtZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiIEBhcHAubW9kdWxlICdzaGFyZWQuZ2VuZXJhdG9ycy5zdGFyc0dlbicsIChTdGFyc0dlbikgLT5cblxuXHRAb3B0aW9ucyA9IFxuXHRcdGNvdW50ZXI6IDBcblx0XHRzdGFyc0Ftb3VudDogMFxuXHRcblx0QGRyYXcgPSAoY2FudmFzLG1vZGVsLGFyZ3MuLi4pIC0+XG5cdFx0c3RhciA9IChjb250ZXh0LCB4Q2VudGVyLCB5Q2VudGVyLCBuUG9pbnRzLCBvdXRlclJhZGl1cywgaW5uZXJSYWRpdXMpID0+XG5cblx0XHRcdGNvbnRleHQuYmVnaW5QYXRoKClcblx0XHRcdGl4VmVydGV4ID0gMFxuXG5cdFx0XHR3aGlsZSBpeFZlcnRleCA8PSAyICogblBvaW50c1xuXHRcdFx0XHRhbmdsZSA9IGl4VmVydGV4ICogTWF0aC5QSSAvIG5Qb2ludHMgLSBNYXRoLlBJIC8gMlxuXHRcdFx0XHRyYWRpdXMgPSAoaWYgaXhWZXJ0ZXggJSAyIGlzIDAgdGhlbiBpbm5lclJhZGl1cyBlbHNlIG91dGVyUmFkaXVzKVxuXHRcdFx0XHRjb250ZXh0LmxpbmVUbyB4Q2VudGVyICsgcmFkaXVzICogTWF0aC5jb3MoYW5nbGUpLCB5Q2VudGVyICsgcmFkaXVzICogTWF0aC5zaW4oYW5nbGUpXG5cdFx0XHRcdCsraXhWZXJ0ZXhcblx0XHRcdHJldHVyblx0XG5cblx0XHRpZiBAb3B0aW9ucy5zdGFyc0Ftb3VudCBpcyAwIHRoZW4gQG9wdGlvbnMuc3RhcnNBbW91bnQgPSBhcHAuZ2V0UmFuZG9tKCAzLCAyMCApXG5cblx0XHRjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQgJzJkJ1x0XHRcblx0XHRcblx0XHR4Q2VudGVyID0gYXBwLmdldFJhbmRvbSggMCwgY2FudmFzLndpZHRoIClcblx0XHR5Q2VudGVyID0gYXBwLmdldFJhbmRvbSggMCwgY2FudmFzLmhlaWdodCApXG5cdFx0blBvaW50cyA9IGFwcC5nZXRSYW5kb20oIDMsIDIwIClcblx0XHRvdXRlclJhZGl1cyA9IGFwcC5nZXRSYW5kb20oIGNhbnZhcy53aWR0aC82LCBjYW52YXMud2lkdGgvMiApXG5cdFx0aW5uZXJSYWRpdXMgPSBhcHAuZ2V0UmFuZG9tKCBjYW52YXMud2lkdGgvMTAsIGNhbnZhcy53aWR0aC8xNCApXG5cblx0XHRjb2xvcnMgPSBtb2RlbC5nZXQgJ2dlbmVyYXRvcnMuZ3JhZGllbnRHZW4uY29sb3JTY2hlbWUnXG5cblx0XHRyYW5kb21Db2xvck51bSA9IGFwcC5nZXRSYW5kb20gMCwgY29sb3JzLmxlbmd0aCAtIDFcblx0XHRyYW5kb21Db2xvciA9IGNvbG9yc1sgcmFuZG9tQ29sb3JOdW0gXVxuXG5cdFx0Y29udGV4dC5iZWdpblBhdGgoKVxuXHRcdFxuXHRcdHN0YXIoY29udGV4dCwgeENlbnRlciwgeUNlbnRlciwgblBvaW50cywgb3V0ZXJSYWRpdXMsIGlubmVyUmFkaXVzKVxuXG5cdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnIycgKyByYW5kb21Db2xvclxuXHRcdGNvbnRleHQuZmlsbCgpXG5cblx0XHRAb3B0aW9ucy5jb3VudGVyKytcblx0XHQjIHdoaWxlIEBvcHRpb25zLmNvdW50ZXIgPD0gQG9wdGlvbnMuc3RhcnNBbW91bnQgdGhlbiBAZHJhdyBjYW52YXMsIG1vZGVsXG5cdFx0IyBzYXZlIG9wdGlvbnMgdG8gY3VycmVudCBtb2RlbCJdfQ==