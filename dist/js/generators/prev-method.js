(function() {
  var __slice = [].slice;

  app.registerGenerator('starsGen', function(Generator) {
    var gen;
    gen = new Generator({
      options: {},
      methods: {
        variants: [
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
        ],
        draw: function() {
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
        }
      }
    });
    return gen;
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdG9ycy9wcmV2LW1ldGhvZC5qcyIsInNvdXJjZXMiOlsicHJldi1tZXRob2QuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxrQkFBQTs7QUFBQSxFQUFBLEdBQUcsQ0FBQyxpQkFBSixDQUFzQixVQUF0QixFQUFrQyxTQUFDLFNBQUQsR0FBQTtBQUNqQyxRQUFBLEdBQUE7QUFBQSxJQUFBLEdBQUEsR0FBVSxJQUFBLFNBQUEsQ0FDVDtBQUFBLE1BQUEsT0FBQSxFQUFTLEVBQVQ7QUFBQSxNQUNBLE9BQUEsRUFDQztBQUFBLFFBQUEsUUFBQSxFQUFVO1VBRVQsU0FBQSxHQUFBO0FBRUMsZ0JBQUEsYUFBQTtBQUFBLFlBRkEsd0JBQVEsOERBRVIsQ0FBQTtBQUFBLFlBQUEsT0FBTyxDQUFDLFNBQVIsR0FBb0IsTUFBcEIsQ0FBQTttQkFDQSxPQUFPLENBQUMsUUFBUixDQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQXBDLEVBQTBDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBekQsRUFIRDtVQUFBLENBRlMsRUFRVCxTQUFBLEdBQUE7QUFFQyxnQkFBQSx5QkFBQTtBQUFBLFlBRkEsd0JBQVEsOERBRVIsQ0FBQTtBQUFBLFlBQUEsSUFBRyxDQUFBLEdBQUksQ0FBQyxPQUFPLENBQUMsY0FBaEI7QUFDQyxjQUFBLFVBQUEsR0FBYSxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQXpCLENBREQ7YUFBQSxNQUVLLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFmO0FBQ0osY0FBQSxVQUFBLEdBQWEsR0FBRyxDQUFDLFNBQUosQ0FBYyxDQUFkLEVBQWdCLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQXhCLEdBQStCLENBQS9DLENBQWIsQ0FESTthQUZMO0FBQUEsWUFLQSxPQUFPLENBQUMsU0FBUixHQUFvQixNQUxwQixDQUFBO0FBQUEsWUFNQSxPQUFPLENBQUMsUUFB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