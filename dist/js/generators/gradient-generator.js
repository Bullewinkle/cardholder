(function() {
  var __slice = [].slice;

  app.registerGenerator('gradientGen', function(Generator) {
    var gen;
    gen = new Generator({
      options: {},
      methods: {
        gradientVariants: [
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
            context.fillRect(0, 0, context.canvas.width / 2, context.canvas.height);
            return gen.options = {
              definedVal1: randomVal1
            };
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
            context.fillRect(0, context.canvas.height / 2, context.canvas.width, context.canvas.height);
            return gen.options = {
              definedVal1: randomVal1
            };
          }, function() {
            var args, canvas, colorScheme, context, gradient, randomVal1, randomVal2;
            context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            canvas = context.canvas;
            if (!gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = gen.options.definedVal1;
              randomVal2 = gen.options.definedVal2;
            } else if (gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = app.getRandom(0, colorScheme.length - 1);
              randomVal2 = app.getRandom(0, colorScheme.length - 1);
            }
            context.fillStyle = '#fff';
            context.fillRect(0, 0, canvas.width, canvas.height);
            gradient = context.createLinearGradient(0, canvas.height / 2, canvas.width, canvas.height * 1.5);
            gradient.addColorStop(0.000, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(0.200, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(0.800, '#' + colorScheme[randomVal2]);
            gradient.addColorStop(1.000, '#' + colorScheme[randomVal2]);
            context.beginPath();
            context.moveTo(canvas.width * 75 / 100, 0);
            context.lineTo(canvas.width, 0);
            context.lineTo(canvas.width, canvas.height);
            context.lineTo(canvas.width / 2, canvas.height);
            context.lineTo(canvas.width * 75 / 100, 0);
            context.closePath();
            context.lineWidth = 0.5;
            context.strokeStyle = gradient;
            context.stroke();
            context.fillStyle = gradient;
            context.fill();
            return gen.options = {
              definedVal1: randomVal1,
              definedVal2: randomVal2,
              colorScheme: colorScheme
            };
          }, function() {
            var args, context, randomVal1, randomVal2;
            context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            if (!gen.options.defaultOptions) {
              randomVal1 = gen.options.definedVal1;
              randomVal2 = gen.options.definedVal2;
            } else if (gen.options.defaultOptions) {
              randomVal1 = app.getRandom(0, gen.options.colorScheme.length - 1);
              randomVal2 = app.getRandom(0.6, 0.9, 2);
            }
            context.fillStyle = '#fff';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            context.fillStyle = '#' + gen.options.colorScheme[randomVal1];
            context.fillRect(0, context.canvas.height * randomVal2, context.canvas.width, context.canvas.height);
            return gen.options = {
              definedVal1: randomVal1,
              definedVal2: randomVal2
            };
          }, function() {
            var args, canvas, colorScheme, context, gradient, randomVal1, randomVal2;
            context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            canvas = context.canvas;
            if (!gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = gen.options.definedVal1;
              randomVal2 = gen.options.definedVal2;
            } else if (gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = app.getRandom(0, colorScheme.length - 1);
              randomVal2 = app.getRandom(0, colorScheme.length - 1);
            }
            context.fillStyle = '#fff';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.rect(canvas.width * 10 / 100, 0, canvas.width * 40 / 100, canvas.height);
            gradient = context.createLinearGradient(0, canvas.height / 2, canvas.width, canvas.height / 2);
            gradient.addColorStop(0.000, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(1.000, '#' + colorScheme[randomVal2]);
            context.fillStyle = gradient;
            context.fill();
            return gen.options = {
              definedVal1: randomVal1,
              definedVal2: randomVal2,
              colorScheme: colorScheme
            };
          }, function() {
            var args, canvas, colorScheme, context, gradient, randomVal1, randomVal2;
            context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            canvas = context.canvas;
            if (!gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = gen.options.definedVal1;
              randomVal2 = gen.options.definedVal2;
            } else if (gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = app.getRandom(0, colorScheme.length - 1);
              randomVal2 = app.getRandom(0, colorScheme.length - 1);
            }
            context.fillStyle = '#fff';
            context.fillRect(0, 0, canvas.width, canvas.height);
            gradient = context.createLinearGradient(0, canvas.height / 2, canvas.width, canvas.height * 0.25);
            gradient.addColorStop(0.000, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(0.495, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(0.000, '#' + colorScheme[randomVal2]);
            gradient.addColorStop(0.500, '#' + colorScheme[randomVal2]);
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(canvas.width * 20 / 100, 0);
            context.lineTo(canvas.width * 37 / 100, canvas.height);
            context.lineTo(0, canvas.height);
            context.lineTo(0, 0);
            context.closePath();
            context.lineWidth = 0.5;
            context.strokeStyle = gradient;
            context.stroke();
            context.fillStyle = gradient;
            context.fill();
            return gen.options = {
              definedVal1: randomVal1,
              definedVal2: randomVal2,
              colorScheme: colorScheme
            };
          }, function() {
            var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2, randomVal3, randomVal4, randomVal5;
            context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            canvas = context.canvas;
            if (!gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = gen.options.definedVal1;
              randomVal2 = gen.options.definedVal2;
              randomVal3 = gen.options.definedVal3;
              randomVal4 = gen.options.definedVal4;
              randomVal5 = gen.options.definedVal5;
              gradientType = gen.options.gradientType;
            } else if (gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = app.getRandom(0, colorScheme.length - 1);
              randomVal2 = app.getRandom(0, colorScheme.length - 1);
              randomVal3 = app.getRandom(0, colorScheme.length - 1);
              randomVal4 = app.getRandom(0, colorScheme.length - 1);
              randomVal5 = app.getRandom(0, colorScheme.length - 1);
              gradientType = gen.options.gradientType;
            }
            context.fillStyle = '#fff';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            gradient = context.createRadialGradient(canvas.width, canvas.height, 0.000, canvas.width, canvas.height, 80.000);
            gradient.addColorStop(0.000, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(0.200, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(0.215, '#' + colorScheme[randomVal2]);
            gradient.addColorStop(0.400, '#' + colorScheme[randomVal2]);
            gradient.addColorStop(0.415, '#' + colorScheme[randomVal3]);
            gradient.addColorStop(0.600, '#' + colorScheme[randomVal3]);
            gradient.addColorStop(0.615, '#' + colorScheme[randomVal4]);
            gradient.addColorStop(0.800, '#' + colorScheme[randomVal4]);
            gradient.addColorStop(0.815, '#' + colorScheme[randomVal5]);
            gradient.addColorStop(0.960, '#' + colorScheme[randomVal5]);
            gradient.addColorStop(1.000, "rgba(255, 255, 255, 1.000)");
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            return gen.options = {
              definedVal1: randomVal1,
              definedVal2: randomVal2,
              definedVal3: randomVal3,
              definedVal4: randomVal4,
              definedVal5: randomVal5
            };
          }, function() {
            var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2, randomVal3, randomVal4;
            context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            canvas = context.canvas;
            if (!gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = gen.options.definedVal1;
              randomVal2 = gen.options.definedVal2;
              randomVal3 = gen.options.definedVal3;
              randomVal4 = gen.options.definedVal4;
              gradientType = gen.options.gradientType;
            } else if (gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = app.getRandom(0, colorScheme.length - 1);
              randomVal2 = app.getRandom(0, colorScheme.length - 1);
              randomVal3 = app.getRandom(0, colorScheme.length - 1);
              randomVal4 = app.getRandom(0, colorScheme.length - 1);
              gradientType = gen.options.gradientType;
            }
            context.fillStyle = '#fff';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            gradient = context.createRadialGradient(canvas.width + 5, canvas.height / 2, 0.000, canvas.width + 5, canvas.height / 2, 120.000);
            gradient.addColorStop(0.000, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(0.073, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(0.080, '#' + colorScheme[randomVal2]);
            gradient.addColorStop(0.235, '#' + colorScheme[randomVal2]);
            gradient.addColorStop(0.250, '#' + colorScheme[randomVal3]);
            gradient.addColorStop(0.485, '#' + colorScheme[randomVal3]);
            gradient.addColorStop(0.500, '#' + colorScheme[randomVal4]);
            gradient.addColorStop(0.735, '#' + colorScheme[randomVal4]);
            gradient.addColorStop(0.750, "rgba(255, 255, 255, 1.000)");
            gradient.addColorStop(1.000, "rgba(255, 255, 255, 1.000)");
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            return gen.options = {
              definedVal1: randomVal1,
              definedVal2: randomVal2,
              definedVal3: randomVal3,
              definedVal4: randomVal4
            };
          }, function() {
            var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2, randomVal3, randomVal4;
            context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            canvas = context.canvas;
            if (!gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = gen.options.definedVal1;
              randomVal2 = gen.options.definedVal2;
              randomVal3 = gen.options.definedVal3;
              randomVal4 = gen.options.definedVal4;
              gradientType = gen.options.gradientType;
            } else if (gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = app.getRandom(0, colorScheme.length - 1);
              randomVal2 = app.getRandom(0, colorScheme.length - 1);
              randomVal3 = app.getRandom(0, colorScheme.length - 1);
              randomVal4 = app.getRandom(0, colorScheme.length - 1);
              gradientType = gen.options.gradientType;
            }
            context.fillStyle = '#fff';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            gradient = context.createRadialGradient(canvas.width / 2, canvas.height - 8, 0.000, canvas.width / 2, canvas.height + 200, 270.000);
            gradient.addColorStop(0.000, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(0.073, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(0.085, '#' + colorScheme[randomVal2]);
            gradient.addColorStop(0.235, '#' + colorScheme[randomVal2]);
            gradient.addColorStop(0.250, '#' + colorScheme[randomVal3]);
            gradient.addColorStop(0.480, '#' + colorScheme[randomVal3]);
            gradient.addColorStop(0.500, '#' + colorScheme[randomVal4]);
            gradient.addColorStop(0.735, '#' + colorScheme[randomVal4]);
            gradient.addColorStop(0.750, "rgba(255, 255, 255, 1.000)");
            gradient.addColorStop(1.000, "rgba(255, 255, 255, 1.000)");
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            return gen.options = {
              definedVal1: randomVal1,
              definedVal2: randomVal2,
              definedVal3: randomVal3,
              definedVal4: randomVal4
            };
          }, function() {
            var args, canvas, colorScheme, context, gradient, gradientType, randomVal1;
            context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            canvas = context.canvas;
            if (!gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = gen.options.definedVal1;
              gradientType = gen.options.gradientType;
            } else if (gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = app.getRandom(0, colorScheme.length - 1);
              gradientType = gen.options.gradientType;
            }
            context.fillStyle = '#fff';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            gradient = context.createRadialGradient(canvas.width / 2, 0, 0.000, canvas.width / 2, 0 - 310, 400.000);
            gradient.addColorStop(0.000, '#fff');
            gradient.addColorStop(0.730, '#fff');
            gradient.addColorStop(0.750, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(1.000, '#' + colorScheme[randomVal1]);
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            return gen.options = {
              definedVal1: randomVal1
            };
          }, function() {
            var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2, randomVal3;
            context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            canvas = context.canvas;
            if (!gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = gen.options.definedVal1;
              randomVal2 = gen.options.definedVal2;
              randomVal3 = gen.options.definedVal3;
              gradientType = gen.options.gradientType;
            } else if (gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = app.getRandom(0, colorScheme.length - 1);
              randomVal2 = app.getRandom(0, colorScheme.length - 1);
              randomVal3 = app.getRandom(40, 150);
              gradientType = gen.options.gradientType;
            }
            context.fillStyle = '#fff';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0.000, canvas.width / 2, canvas.height / 2, randomVal3);
            gradient.addColorStop(0.000, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(0.735, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(0.750, '#' + colorScheme[randomVal2]);
            gradient.addColorStop(1.000, '#' + colorScheme[randomVal2]);
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            return gen.options = {
              definedVal1: randomVal1,
              definedVal2: randomVal2,
              definedVal3: randomVal3
            };
          }, function() {
            var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2;
            context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            canvas = context.canvas;
            if (!gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = gen.options.definedVal1;
              randomVal2 = gen.options.definedVal2;
              gradientType = gen.options.gradientType;
            } else if (gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = app.getRandom(0, colorScheme.length - 1);
              randomVal2 = app.getRandom(0, colorScheme.length - 1);
              gradientType = gen.options.gradientType;
            }
            context.fillStyle = '#fff';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            gradient = context.createLinearGradient(0, canvas.height / 2, canvas.width, canvas.height / 2 + 42);
            gradient.addColorStop(0.000, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(0.550, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(0.750, '#' + colorScheme[randomVal2]);
            gradient.addColorStop(1.000, '#' + colorScheme[randomVal2]);
            context.fillStyle = gradient;
            context.lineWidth = 0.5;
            context.strokeStyle = gradient;
            context.beginPath();
            context.moveTo(canvas.width * 67 / 100, 0);
            context.lineTo(canvas.width * 71 / 100, 0);
            context.lineTo(canvas.width * 61 / 100, canvas.height);
            context.lineTo(canvas.width * 57 / 100, canvas.height);
            context.lineTo(canvas.width * 67 / 100, 0);
            context.moveTo(canvas.width * 74 / 100, 0);
            context.lineTo(canvas.width * 81 / 100, 0);
            context.lineTo(canvas.width * 71 / 100, canvas.height);
            context.lineTo(canvas.width * 64 / 100, canvas.height);
            context.closePath();
            context.stroke();
            context.fill();
            return gen.options = {
              definedVal1: randomVal1,
              definedVal2: randomVal2
            };
          }, function() {
            var args, canvas, colorScheme, context, gradient, randomVal1, randomVal2;
            context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            canvas = context.canvas;
            if (!gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = gen.options.definedVal1;
              randomVal2 = gen.options.definedVal2;
            } else if (gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = app.getRandom(0, colorScheme.length - 1);
              randomVal2 = app.getRandom(0, colorScheme.length - 1);
            }
            context.fillStyle = '#fff';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.rect(0, canvas.height * 50 / 100, canvas.width, canvas.height * 40 / 100);
            gradient = context.createLinearGradient(canvas.width / 2, 0, canvas.width / 2, canvas.height);
            gradient.addColorStop(0, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(1, '#' + colorScheme[randomVal2]);
            context.fillStyle = gradient;
            context.fill();
            return gen.options = {
              definedVal1: randomVal1,
              definedVal2: randomVal2,
              colorScheme: colorScheme
            };
          }, function() {
            var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2;
            context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            canvas = context.canvas;
            if (!gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = gen.options.definedVal1;
              randomVal2 = gen.options.definedVal2;
              gradientType = gen.options.gradientType;
            } else if (gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = app.getRandom(0, colorScheme.length - 1);
              randomVal2 = app.getRandom(0, colorScheme.length - 1);
              gradientType = gen.options.gradientType;
            }
            context.fillStyle = '#fff';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            gradient = context.createLinearGradient(0, canvas.height / 2, canvas.width, canvas.height / 2 + 42);
            gradient.addColorStop(0.000, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(0.500, '#' + colorScheme[randomVal2]);
            context.fillStyle = gradient;
            context.lineWidth = 0.5;
            context.strokeStyle = gradient;
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(canvas.width * 20 / 100, 0);
            context.lineTo(canvas.width * 30 / 100, canvas.height / 2.5);
            context.lineTo(canvas.width * 20 / 100, canvas.height);
            context.lineTo(0, canvas.height);
            context.lineTo(0, 0);
            context.closePath();
            context.stroke();
            context.fill();
            return gen.options = {
              definedVal1: randomVal1,
              definedVal2: randomVal2
            };
          }, function() {
            var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2;
            context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            canvas = context.canvas;
            if (!gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = gen.options.definedVal1;
              randomVal2 = gen.options.definedVal2;
              gradientType = gen.options.gradientType;
            } else if (gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = app.getRandom(0, colorScheme.length - 1);
              randomVal2 = app.getRandom(0, colorScheme.length - 1);
              gradientType = gen.options.gradientType;
            }
            context.fillStyle = '#fff';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            gradient = context.createLinearGradient(0, canvas.height / 2, canvas.width, canvas.height / 2 + 42);
            gradient.addColorStop(0.500, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(1.000, '#' + colorScheme[randomVal2]);
            context.fillStyle = gradient;
            context.lineWidth = 0.5;
            context.strokeStyle = gradient;
            context.beginPath();
            context.moveTo(canvas.width * 70 / 100, 0);
            context.lineTo(canvas.width, 0);
            context.lineTo(canvas.width, canvas.height);
            context.lineTo(canvas.width * 70 / 100, canvas.height);
            context.lineTo(canvas.width * 80 / 100, canvas.height / 2.5);
            context.lineTo(canvas.width * 70 / 100, 0);
            context.closePath();
            context.stroke();
            context.fill();
            return gen.options = {
              definedVal1: randomVal1,
              definedVal2: randomVal2
            };
          }, function() {
            var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2;
            context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            canvas = context.canvas;
            if (!gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = gen.options.definedVal1;
              randomVal2 = gen.options.definedVal2;
              gradientType = gen.options.gradientType;
            } else if (gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = app.getRandom(0, colorScheme.length - 1);
              randomVal2 = app.getRandom(0, colorScheme.length - 1);
              gradientType = gen.options.gradientType;
            }
            context.fillStyle = '#fff';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            gradient = context.createLinearGradient(0, canvas.height / 2, canvas.width, canvas.height / 2 + 42);
            gradient.addColorStop(0.000, '#' + colorScheme[randomVal1]);
            gradient.addColorStop(1.000, '#' + colorScheme[randomVal2]);
            context.fillStyle = gradient;
            context.lineWidth = 0.5;
            context.strokeStyle = gradient;
            context.rect(canvas.width * 30 / 100, canvas.height * 22 / 100, canvas.width * 65 / 100, canvas.height * 70 / 100);
            context.closePath();
            context.stroke();
            context.fill();
            return gen.options = {
              definedVal1: randomVal1,
              definedVal2: randomVal2
            };
          }, function() {
            var args, canvas, colorScheme, context, gradientType, randomVal1, randomVal2, star;
            context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            canvas = context.canvas;
            if (!gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = gen.options.definedVal1;
              randomVal2 = gen.options.definedVal2;
              gradientType = gen.options.gradientType;
            } else if (gen.options.defaultOptions) {
              colorScheme = app.colorScheme;
              randomVal1 = app.getRandom(0, colorScheme.length - 1);
              randomVal2 = app.getRandom(0, colorScheme.length - 1);
              gradientType = gen.options.gradientType;
            }
            context.fillStyle = '#fff';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            star = function(context, xCenter, yCenter, nPoints, outerRadius, innerRadius) {
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
            context.beginPath();
            context.fillStyle = "#C40043";
            context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 4, 0, Math.PI * 2);
            context.fill();
            context.fillStyle = "green";
            star(context, canvas.width / 2, canvas.height / 2, 9, canvas.width / 3, 10);
            context.fill();
            return gen.options = {
              definedVal1: randomVal1,
              definedVal2: randomVal2
            };
          }
        ],
        draw: function() {
          var args, canvas, context, model, predefinedVariant, randomVariant;
          canvas = arguments[0], model = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdG9ycy9ncmFkaWVudC1nZW5lcmF0b3IuanMiLCJzb3VyY2VzIjpbImdyYWRpZW50LWdlbmVyYXRvci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLGtCQUFBOztBQUFBLEVBQUEsR0FBRyxDQUFDLGlCQUFKLENBQXNCLGFBQXRCLEVBQXFDLFNBQUMsU0FBRCxHQUFBO0FBQ3BDLFFBQUEsR0FBQTtBQUFBLElBQUEsR0FBQSxHQUFVLElBQUEsU0FBQSxDQUNUO0FBQUEsTUFBQSxPQUFBLEVBQVMsRUFBVDtBQUFBLE1BQ0EsT0FBQSxFQUNDO0FBQUEsUUFBQSxnQkFBQSxFQUFrQjtVQUVqQixTQUFBLEdBQUE7QUFFQyxnQkFBQSxhQUFBO0FBQUEsWUFGQSx3QkFBUSw4REFFUixDQUFBO0FBQUEsWUFBQSxPQUFPLENBQUMsU0FBUixHQUFvQixNQUFwQixDQUFBO21CQUNBLE9BQU8sQ0FBQyxRQUFSLENBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBcEMsRUFBMEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUF6RCxFQUhEO1VBQUEsQ0FGaUIsRUFRakIsU0FBQSxHQUFBO0FBRUMsZ0JBQUEseUJBQUE7QUFBQSxZQUZBLHdCQUFRLDhEQUVSLENBQUE7QUFBQSxZQUFBLElBQUcsQ0FBQSxHQUFJLENBQUMsT0FBTyxDQUFDLGNBQWhCO0FBQ0MsY0FBQSxVQUFBLEdBQWEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUF6QixDQUREO2FBQUEsTUFFSyxJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBZjtBQUNKLGNBQUEsVUFBQSxHQUFhLEdBQUcsQ0FBQyxTQUFKLENBQWMsQ0FBZCxFQUFnQixHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUF4QixHQUErQixDQUEvQyxDQUFiLENBREk7YUFGTDtBQUFBLFlBS0EsT0FBTyxDQUFDLFNBQVIsR0FBb0IsTUFMcEIsQ0FBQTtBQUFB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QUFPLENBQUMsSUFBUixDQUFBLENBckNBLENBQUE7bUJBdUNBLEdBQUcsQ0FBQyxPQUFKLEdBQ0M7QUFBQSxjQUFBLFdBQUEsRUFBYSxVQUFiO0FBQUEsY0FDQSxXQUFBLEVBQWEsVUFEYjtjQTFDRjtVQUFBLENBdm9CaUI7U0FBbEI7QUFBQSxRQXl4QkEsSUFBQSxFQUFNLFNBQUEsR0FBQTtBQUVMLGNBQUEsOERBQUE7QUFBQSxVQUZNLHVCQUFPLHNCQUFNLDhEQUVuQixDQUFBO0FBQUEsVUFBQSxPQUFBLEdBQVUsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBVixDQUFBO0FBQUEsVUFDQSxDQUFDLENBQUMsTUFBRixDQUFVLElBQUMsQ0FBQSxPQUFYLEVBQW9CLEtBQUssQ0FBQyxHQUFOLENBQVUsYUFBQSxHQUFlLElBQUMsQ0FBQSxJQUExQixDQUFwQixDQURBLENBQUE7QUFFQSxVQUFBLElBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBVSxhQUFBLEdBQWUsSUFBQyxDQUFBLElBQWhCLEdBQXNCLGlCQUFoQyxDQUFIO0FBRUMsWUFBQSxhQUFBLEdBQWdCLEdBQUcsQ0FBQyxTQUFKLENBQWMsQ0FBZCxFQUFpQixJQUFDLENBQUEsZ0JBQWdCLENBQUMsTUFBbEIsR0FBeUIsQ0FBMUMsQ0FBaEIsQ0FBQTtBQUFBLFlBRUEsSUFBQyxDQUFBLGdCQUFrQixDQUFBLGFBQUEsQ0FBbkIsQ0FBbUMsT0FBbkMsQ0FGQSxDQUFBO0FBQUEsWUFHQSxJQUFDLENBQUEsT0FBTyxDQUFDLGtCQUFULEdBQThCLGFBSDlCLENBQUE7QUFBQSxZQUtBLElBQUMsQ0FBQSxPQUFPLENBQUMsY0FBVCxHQUEwQixLQUwxQixDQUZEO1dBQUEsTUFTSyxJQUFHLENBQUEsS0FBTSxDQUFDLEdBQU4sQ0FBVSxhQUFBLEdBQWUsSUFBQyxDQUFBLElBQWhCLEdBQXNCLGlCQUFoQyxDQUFKO0FBRUosWUFBQSxJQUFDLENBQUEsY0FBRCxHQUFrQixLQUFsQixDQUFBO0FBQUEsWUFDQSxpQkFBQSxHQUFvQixLQUFLLENBQUMsR0FBTixDQUFVLGFBQUEsR0FBZSxJQUFDLENBQUEsSUFBaEIsR0FBc0IscUJBQWhDLENBRHBCLENBQUE7QUFBQSxZQUVBLElBQUMsQ0FBQSxnQkFBa0IsQ0FBQSxpQkFBQSxDQUFuQixDQUF1QyxPQUF2QyxDQUZBLENBRkk7V0FYTDtpQkFpQkEsS0FBSyxDQUFDLEdBQU4sQ0FBVSxhQUFBLEdBQWMsSUFBQyxDQUFBLElBQXpCLEVBQStCLElBQUMsQ0FBQSxPQUFoQyxFQUNDO0FBQUEsWUFBQSxNQUFBLEVBQVEsSUFBUjtXQURELEVBbkJLO1FBQUEsQ0F6eEJOO09BRkQ7S0FEUyxDQUFWLENBQUE7QUFrekJBLFdBQU8sR0FBUCxDQW56Qm9DO0VBQUEsQ0FBckMsQ0FBQSxDQUFBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==