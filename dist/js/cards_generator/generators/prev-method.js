(function() {
  var __slice = [].slice;

  this.app.module('CardGenerator.generators.starsGen', function(StarsGen) {
    this.options = {};
    this.variants = [
      function() {
        var args, context;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        context.fillStyle = '#fff';
        return context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      }, function() {
        var args, context, randomVal1;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (!gen.options.defaultOptions) {
          randomVal1 = gen.options.definedVal1;
        } else if (gen.options.defaultOptions) {
          randomVal1 = app.getRandom(0, gen.options.colorScheme.length - 1);
        }
        context.fillStyle = '#fff';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = '#' + gen.options.colorScheme[randomVal1];
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        return gen.options = {
          definedVal1: randomVal1
        };
      }
    ];
    return this.draw = function() {
      var args, canvas, context, model, predefinedVariant, randomVariant;
      canvas = arguments[0], model = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      alert('hi');
      context = canvas.getContext("2d");
      $.extend(this.options, model.get('generators.' + this.name));
      if (model.get('generators.' + this.name + '.defaultOptions')) {
        randomVariant = app.getRandom(0, this.gradientVariants.length - 1);
        this.gradientVariants[randomVariant](context);
        this.options.gradientVariantNum = randomVariant;
        this.options.defaultOptions = false;
      } else if (!model.get('generators.' + this.name + '.defaultOptions')) {
        this.defaultOptions = false;
        predefinedVariant = model.get('generators.' + this.name + '.gradientVariantNum');
        this.gradientVariants[predefinedVariant](context);
      }
      return model.set('generators.' + this.name, this.options, {
        silent: true
      });
    };
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9nZW5lcmF0b3JzL3ByZXYtbWV0aG9kLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsa0JBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxtQ0FBWixFQUFpRCxTQUFDLFFBQUQsR0FBQTtBQUVoRCxJQUFBLElBQUMsQ0FBQSxPQUFELEdBQVcsRUFBWCxDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsUUFBRCxHQUFZO01BRVgsU0FBQSxHQUFBO0FBRUMsWUFBQSxhQUFBO0FBQUEsUUFGQSx3QkFBUSw4REFFUixDQUFBO0FBQUEsUUFBQSxPQUFPLENBQUMsU0FBUixHQUFvQixNQUFwQixDQUFBO2VBQ0EsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFwQyxFQUEwQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQXpELEVBSEQ7TUFBQSxDQUZXLEVBUVgsU0FBQSxHQUFBO0FBRUMsWUFBQSx5QkFBQTtBQUFBLFFBRkEsd0JBQVEsOERBRVIsQ0FBQTtBQUFBLFFBQUEsSUFBRyxDQUFBLEdBQUksQ0FBQyxPQUFPLENBQUMsY0FBaEI7QUFDQyxVQUFBLFVBQUEsR0FBYSxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQXpCLENBREQ7U0FBQSxNQUVLLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFmO0FBQ0osVUFBQSxVQUFBLEdBQWEsR0FBRyxDQUFDLFNBQUosQ0FBYyxDQUFkLEVBQWdCLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQXhCLEdBQStCLENBQS9DLENBQWIsQ0FESTtTQUZMO0FBQUEsUUFLQSxPQUFPLENBQUMsU0FBUixHQUFvQixNQUxwQixDQUFBO0FBQUEsUUFNQSxPQUFPLENBQUMsUUFBUixDQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQXBDLEVBQTBDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBekQsQ0FOQSxDQUFBO0FBQUEsUUFPQSxPQUFPLENBQUMsU0FBUixHQUFvQixHQUFBLEdBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFZLENBQUEsVUFBQSxDQVBoRCxDQUFBO0FBQUEsUUFRQSxPQUFPLENBQUMsUUFBUixDQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQXBDLEVBQTBDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBekQsQ0FSQSxDQUFBO2VBV0EsR0FBRyxDQUFDLE9BQUosR0FDQztBQUFBLFVBQUEsV0FBQSxFQUFhLFVBQWI7VUFkRjtNQUFBLENBUlc7S0FGWixDQUFBO1dBMkJBLElBQUMsQ0FBQSxJQUFELEdBQVEsU0FBQSxHQUFBO0FBQ1AsVUFBQSw4REFBQTtBQUFBLE1BRFEsdUJBQU8sc0JBQU0sOERBQ3JCLENBQUE7QUFBQSxNQUFBLEtBQUEsQ0FBTSxJQUFOLENBQUEsQ0FBQTtBQUFBLE1BQ0EsT0FBQSxHQUFVLE1BQU0sQ0FBQyxVQUFQLENBQWtCLElBQWxCLENBRFYsQ0FBQTtBQUFBLE1BR0EsQ0FBQyxDQUFDLE1BQUYsQ0FBVSxJQUFDLENBQUEsT0FBWCxFQUFtQixLQUFLLENBQUMsR0FBTixDQUFVLGFBQUEsR0FBZSxJQUFDLENBQUEsSUFBMUIsQ0FBbkIsQ0FIQSxDQUFBO0FBSUEsTUFBQSxJQUFHLEtBQUssQ0FBQyxHQUFOLENBQVUsYUFBQSxHQUFlLElBQUMsQ0FBQSxJQUFoQixHQUFzQixpQkFBaEMsQ0FBSDtBQUVDLFFBQUEsYUFBQSxHQUFnQixHQUFHLENBQUMsU0FBSixDQUFjLENBQWQsRUFBaUIsSUFBQyxDQUFBLGdCQUFnQixDQUFDLE1BQWxCLEdBQXlCLENBQTFDLENBQWhCLENBQUE7QUFBQSxRQUVBLElBQUMsQ0FBQSxnQkFBa0IsQ0FBQSxhQUFBLENBQW5CLENBQW1DLE9BQW5DLENBRkEsQ0FBQTtBQUFBLFFBR0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxrQkFBVCxHQUE4QixhQUg5QixDQUFBO0FBQUEsUUFLQSxJQUFDLENBQUEsT0FBTyxDQUFDLGNBQVQsR0FBMEIsS0FMMUIsQ0FGRDtPQUFBLE1BU0ssSUFBRyxDQUFBLEtBQU0sQ0FBQyxHQUFOLENBQVUsYUFBQSxHQUFlLElBQUMsQ0FBQSxJQUFoQixHQUFzQixpQkFBaEMsQ0FBSjtBQUNKLFFBQUEsSUFBQyxDQUFBLGNBQUQsR0FBa0IsS0FBbEIsQ0FBQTtBQUFBLFFBQ0EsaUJBQUEsR0FBb0IsS0FBSyxDQUFDLEdBQU4sQ0FBVSxhQUFBLEdBQWUsSUFBQyxDQUFBLElBQWhCLEdBQXNCLHFCQUFoQyxDQURwQixDQUFBO0FBQUEsUUFFQSxJQUFDLENBQUEsZ0JBQWtCLENBQUEsaUJBQUEsQ0FBbkIsQ0FBdUMsT0FBdkMsQ0FGQSxDQURJO09BYkw7YUFzQkEsS0FBSyxDQUFDLEdBQU4sQ0FBVSxhQUFBLEdBQWMsSUFBQyxDQUFBLElBQXpCLEVBQStCLElBQUMsQ0FBQSxPQUFoQyxFQUNDO0FBQUEsUUFBQSxNQUFBLEVBQVEsSUFBUjtPQURELEVBdkJPO0lBQUEsRUE3QndDO0VBQUEsQ0FBakQsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZHNfZ2VuZXJhdG9yL2dlbmVyYXRvcnMvcHJldi1tZXRob2QuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvci5nZW5lcmF0b3JzLnN0YXJzR2VuJywgKFN0YXJzR2VuKSAtPlxuXG5cdEBvcHRpb25zID0ge31cblxuXHRAdmFyaWFudHMgPSBbXG5cdFx0IzBcblx0XHQoY29udGV4dCxhcmdzLi4uKSAtPlxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjZmZmJ1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXG5cdFx0IzFcblx0XHQoY29udGV4dCxhcmdzLi4uKSAtPlxuXG5cdFx0XHRpZiAhZ2VuLm9wdGlvbnMuZGVmYXVsdE9wdGlvbnNcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWwxXG5cdFx0XHRlbHNlIGlmIGdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBhcHAuZ2V0UmFuZG9tKDAsZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjb250ZXh0LmNhbnZhcy53aWR0aCxjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjJytnZW4ub3B0aW9ucy5jb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXG5cdFx0XHQjIHNhdmUgb3B0aW9ucyB0byBjdXJyZW50IG1vZGVsXG5cdFx0XHRnZW4ub3B0aW9ucyA9XG5cdFx0XHRcdGRlZmluZWRWYWwxOiByYW5kb21WYWwxXG5cdF1cblx0XG5cdEBkcmF3ID0gKGNhbnZhcyxtb2RlbCxhcmdzLi4uKSAtPlxuXHRcdGFsZXJ0ICdoaSdcblx0XHRjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKVxuXG5cdFx0JC5leHRlbmQoIEBvcHRpb25zLG1vZGVsLmdldCAnZ2VuZXJhdG9ycy4nKyBAbmFtZSApXG5cdFx0aWYgbW9kZWwuZ2V0ICdnZW5lcmF0b3JzLicrIEBuYW1lKyAnLmRlZmF1bHRPcHRpb25zJ1xuXG5cdFx0XHRyYW5kb21WYXJpYW50ID0gYXBwLmdldFJhbmRvbSgwLCBAZ3JhZGllbnRWYXJpYW50cy5sZW5ndGgtMSlcblxuXHRcdFx0QGdyYWRpZW50VmFyaWFudHNbIHJhbmRvbVZhcmlhbnQgXShjb250ZXh0KVxuXHRcdFx0QG9wdGlvbnMuZ3JhZGllbnRWYXJpYW50TnVtID0gcmFuZG9tVmFyaWFudFxuXG5cdFx0XHRAb3B0aW9ucy5kZWZhdWx0T3B0aW9ucyA9IGZhbHNlXG5cblx0XHRlbHNlIGlmICFtb2RlbC5nZXQgJ2dlbmVyYXRvcnMuJysgQG5hbWUrICcuZGVmYXVsdE9wdGlvbnMnXG5cdFx0XHRAZGVmYXVsdE9wdGlvbnMgPSBmYWxzZVxuXHRcdFx0cHJlZGVmaW5lZFZhcmlhbnQgPSBtb2RlbC5nZXQgJ2dlbmVyYXRvcnMuJysgQG5hbWUrICcuZ3JhZGllbnRWYXJpYW50TnVtJ1xuXHRcdFx0QGdyYWRpZW50VmFyaWFudHNbIHByZWRlZmluZWRWYXJpYW50IF0oY29udGV4dClcblxuXG5cdFx0IyBUT0RPIG1ha2UgbmV3IG9wdGlvbnMgdG8gYXV0b21hdGljIHNhdmUgdG8gbW9kZWwgd2l0aG91dCB0cmlnZ2VyaW5nIGNoYW5nZSBldmVudFxuXHRcdCMgc2F2ZU9wdGlvbnMobW9kZWwuYXR0cmlidXRlcy5nZW4ub3B0aW9ucywgQG9wdGlvbnMpXG5cblx0XHRtb2RlbC5zZXQgJ2dlbmVyYXRvcnMuJytAbmFtZSwgQG9wdGlvbnMsXG5cdFx0XHRzaWxlbnQ6IHRydWVcblxuIl19