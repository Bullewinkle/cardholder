(function() {
  var __slice = [].slice;

  this.app.module('CardGenerator.generators.iconsGen', function(IconsGen) {
    this.options = {
      counter: 0,
      starsAmount: 0
    };
    return this.draw = function() {
      var amountOfIcons, args, canvas, ctx, getRandomIconNum, i, model, _i, _results;
      canvas = arguments[0], model = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      ctx = canvas.getContext('2d');
      amountOfIcons = app.getRandom(0, 6);
      getRandomIconNum = function() {
        var iconNum, randomFontSize, randomX, randomY;
        iconNum = app.getRandom(0, appIconsData.length - 1);
        randomX = app.getRandom(5, canvas.width);
        randomY = app.getRandom(5, canvas.height);
        randomFontSize = app.getRandom(20, 200);
        ctx.font = "" + randomFontSize + "px cardholder-icons";
        ctx.fillStyle = Kinetic.Util.getRandomColor();
        return ctx.fillText(appIconsData[iconNum].content, randomX, randomY);
      };
      _results = [];
      for (i = _i = 0; 0 <= amountOfIcons ? _i < amountOfIcons : _i > amountOfIcons; i = 0 <= amountOfIcons ? ++_i : --_i) {
        _results.push(getRandomIconNum(i));
      }
      return _results;
    };
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL2dlbmVyYXRvcnMvaWNvbnMtZ2VuZXJhdG9yLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsa0JBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxtQ0FBWixFQUFpRCxTQUFDLFFBQUQsR0FBQTtBQUVoRCxJQUFBLElBQUMsQ0FBQSxPQUFELEdBQ0M7QUFBQSxNQUFBLE9BQUEsRUFBUyxDQUFUO0FBQUEsTUFDQSxXQUFBLEVBQWEsQ0FEYjtLQURELENBQUE7V0FJQSxJQUFDLENBQUEsSUFBRCxHQUFRLFNBQUEsR0FBQTtBQUNQLFVBQUEsMEVBQUE7QUFBQSxNQURRLHVCQUFPLHNCQUFNLDhEQUNyQixDQUFBO0FBQUEsTUFBQSxHQUFBLEdBQU0sTUFBTSxDQUFDLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBTixDQUFBO0FBQUEsTUFFQSxhQUFBLEdBQWdCLEdBQUcsQ0FBQyxTQUFKLENBQWMsQ0FBZCxFQUFpQixDQUFqQixDQUZoQixDQUFBO0FBQUEsTUFHQSxnQkFBQSxHQUFvQixTQUFBLEdBQUE7QUFDbkIsWUFBQSx5Q0FBQTtBQUFBLFFBQUEsT0FBQSxHQUFVLEdBQUcsQ0FBQyxTQUFKLENBQWMsQ0FBZCxFQUFpQixZQUFZLENBQUMsTUFBYixHQUFvQixDQUFyQyxDQUFWLENBQUE7QUFBQSxRQUNBLE9BQUEsR0FBVSxHQUFHLENBQUMsU0FBSixDQUFjLENBQWQsRUFBaUIsTUFBTSxDQUFDLEtBQXhCLENBRFYsQ0FBQTtBQUFBLFFBRUEsT0FBQSxHQUFVLEdBQUcsQ0FBQyxTQUFKLENBQWMsQ0FBZCxFQUFpQixNQUFNLENBQUMsTUFBeEIsQ0FGVixDQUFBO0FBQUEsUUFHQSxjQUFBLEdBQWlCLEdBQUcsQ0FBQyxTQUFKLENBQWMsRUFBZCxFQUFrQixHQUFsQixDQUhqQixDQUFBO0FBQUEsUUFLQSxHQUFHLENBQUMsSUFBSixHQUFXLEVBQUEsR0FBRSxjQUFGLEdBQWtCLHFCQUw3QixDQUFBO0FBQUEsUUFNQSxHQUFHLENBQUMsU0FBSixHQUFnQixPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWIsQ0FBQSxDQU5oQixDQUFBO2VBT0EsR0FBRyxDQUFDLFFBQUosQ0FBYSxZQUFhLENBQUEsT0FBQSxDQUFRLENBQUMsT0FBbkMsRUFBNEMsT0FBNUMsRUFBcUQsT0FBckQsRUFSbUI7TUFBQSxDQUhwQixDQUFBO0FBYUE7V0FBNkIsOEdBQTdCLEdBQUE7QUFBQSxzQkFBQSxnQkFBQSxDQUFpQixDQUFqQixFQUFBLENBQUE7QUFBQTtzQkFkTztJQUFBLEVBTndDO0VBQUEsQ0FBakQsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZF9nZW5lcmF0b3IvZ2VuZXJhdG9ycy9pY29ucy1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvci5nZW5lcmF0b3JzLmljb25zR2VuJywgKEljb25zR2VuKSAtPlxuXG5cdEBvcHRpb25zID0gXG5cdFx0Y291bnRlcjogMFxuXHRcdHN0YXJzQW1vdW50OiAwXG5cdFxuXHRAZHJhdyA9IChjYW52YXMsbW9kZWwsYXJncy4uLikgLT5cblx0XHRjdHggPSBjYW52YXMuZ2V0Q29udGV4dCAnMmQnXG5cblx0XHRhbW91bnRPZkljb25zID0gYXBwLmdldFJhbmRvbSAwLCA2XG5cdFx0Z2V0UmFuZG9tSWNvbk51bSA9ICAtPlxuXHRcdFx0aWNvbk51bSA9IGFwcC5nZXRSYW5kb20gMCwgYXBwSWNvbnNEYXRhLmxlbmd0aC0xXG5cdFx0XHRyYW5kb21YID0gYXBwLmdldFJhbmRvbSA1LCBjYW52YXMud2lkdGhcblx0XHRcdHJhbmRvbVkgPSBhcHAuZ2V0UmFuZG9tIDUsIGNhbnZhcy5oZWlnaHRcblx0XHRcdHJhbmRvbUZvbnRTaXplID0gYXBwLmdldFJhbmRvbSAyMCwgMjAwXG5cblx0XHRcdGN0eC5mb250ID0gXCIje3JhbmRvbUZvbnRTaXplfXB4IGNhcmRob2xkZXItaWNvbnNcIlxuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9IEtpbmV0aWMuVXRpbC5nZXRSYW5kb21Db2xvcigpXG5cdFx0XHRjdHguZmlsbFRleHQgYXBwSWNvbnNEYXRhW2ljb25OdW1dLmNvbnRlbnQsIHJhbmRvbVgsIHJhbmRvbVlcblxuXHRcdGdldFJhbmRvbUljb25OdW0oaSkgZm9yIGkgaW4gWzAuLi5hbW91bnRPZkljb25zXSJdfQ==