(function() {
  var __slice = [].slice;

  this.app.module('CardGenerator.generators.gradientGen', function(GradientGen) {
    this.options = {};
    this.gradientVariants = [
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
          colorScheme = gen.options.colorScheme;
          randomVal1 = gen.options.definedVal1;
          randomVal2 = gen.options.definedVal2;
        } else if (gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
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
          definedVal2: randomVal2
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
          colorScheme = gen.options.colorScheme;
          randomVal1 = gen.options.definedVal1;
          randomVal2 = gen.options.definedVal2;
        } else if (gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
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
          definedVal2: randomVal2
        };
      }, function() {
        var args, canvas, colorScheme, context, gradient, randomVal1, randomVal2;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        canvas = context.canvas;
        if (!gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
          randomVal1 = gen.options.definedVal1;
          randomVal2 = gen.options.definedVal2;
        } else if (gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
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
          definedVal2: randomVal2
        };
      }, function() {
        var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2, randomVal3, randomVal4, randomVal5;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        canvas = context.canvas;
        if (!gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
          randomVal1 = gen.options.definedVal1;
          randomVal2 = gen.options.definedVal2;
          randomVal3 = gen.options.definedVal3;
          randomVal4 = gen.options.definedVal4;
          randomVal5 = gen.options.definedVal5;
          gradientType = gen.options.gradientType;
        } else if (gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
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
          colorScheme = gen.options.colorScheme;
          randomVal1 = gen.options.definedVal1;
          randomVal2 = gen.options.definedVal2;
          randomVal3 = gen.options.definedVal3;
          randomVal4 = gen.options.definedVal4;
          gradientType = gen.options.gradientType;
        } else if (gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
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
          colorScheme = gen.options.colorScheme;
          randomVal1 = gen.options.definedVal1;
          randomVal2 = gen.options.definedVal2;
          randomVal3 = gen.options.definedVal3;
          randomVal4 = gen.options.definedVal4;
          gradientType = gen.options.gradientType;
        } else if (gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
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
          colorScheme = gen.options.colorScheme;
          randomVal1 = gen.options.definedVal1;
          gradientType = gen.options.gradientType;
        } else if (gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
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
          colorScheme = gen.options.colorScheme;
          randomVal1 = gen.options.definedVal1;
          randomVal2 = gen.options.definedVal2;
          randomVal3 = gen.options.definedVal3;
          gradientType = gen.options.gradientType;
        } else if (gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
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
          colorScheme = gen.options.colorScheme;
          randomVal1 = gen.options.definedVal1;
          randomVal2 = gen.options.definedVal2;
          gradientType = gen.options.gradientType;
        } else if (gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
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
          colorScheme = gen.options.colorScheme;
          randomVal1 = gen.options.definedVal1;
          randomVal2 = gen.options.definedVal2;
        } else if (gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
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
          definedVal2: randomVal2
        };
      }, function() {
        var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        canvas = context.canvas;
        if (!gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
          randomVal1 = gen.options.definedVal1;
          randomVal2 = gen.options.definedVal2;
          gradientType = gen.options.gradientType;
        } else if (gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
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
          colorScheme = gen.options.colorScheme;
          randomVal1 = gen.options.definedVal1;
          randomVal2 = gen.options.definedVal2;
          gradientType = gen.options.gradientType;
        } else if (gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
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
          colorScheme = gen.options.colorScheme;
          randomVal1 = gen.options.definedVal1;
          randomVal2 = gen.options.definedVal2;
          gradientType = gen.options.gradientType;
        } else if (gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
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
          colorScheme = gen.options.colorScheme;
          randomVal1 = gen.options.definedVal1;
          randomVal2 = gen.options.definedVal2;
          gradientType = gen.options.gradientType;
        } else if (gen.options.defaultOptions) {
          colorScheme = gen.options.colorScheme;
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
    ];
    return this.draw = function() {
      var args, canvas, context, initColorScheme, model, predefinedVariant, randomVariant;
      canvas = arguments[0], model = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      initColorScheme = function() {
        var hue, scm, variation, variations;
        scm = new ColorScheme();
        hue = app.getRandom(0.2, 359, 1);
        variations = ['default', 'pastel', 'soft', 'light', 'hard', 'pale'];
        variation = variations[app.getRandom(0, variations.length - 1)];
        console.log(variation);
        scm.from_hue(hue).scheme('tetrade').distance(0.1).add_complement(false).variation(variation).web_safe(false);
        return scm.colors();
      };
      context = canvas.getContext("2d");
      $.extend(this.options, model.get('generators.gradientGen'));
      if (model.get('generators.gradientGen.defaultOptions')) {
        gen.options.colorScheme = initColorScheme();
        console.log(gen.options.colorScheme);
        randomVariant = app.getRandom(0, this.gradientVariants.length - 1);
        this.gradientVariants[randomVariant](context);
        this.options.gradientVariantNum = randomVariant;
        this.options.defaultOptions = false;
      } else if (!model.get('generators.gradientGen.defaultOptions')) {
        this.defaultOptions = false;
        predefinedVariant = model.get('generators.' + this.name + '.gradientVariantNum');
        this.gradientVariants[predefinedVariant](context);
      }
      return model.set('generators.gradientGen', gen.options, {
        silent: true
      });
    };
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9nZW5lcmF0b3JzL2dyYWRpZW50LWdlbmVyYXRvci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLGtCQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksc0NBQVosRUFBb0QsU0FBQyxXQUFELEdBQUE7QUFFbkQsSUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLEVBQVgsQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLGdCQUFELEdBQW9CO01BRW5CLFNBQUEsR0FBQTtBQUVDLFlBQUEsYUFBQTtBQUFBLFFBRkEsd0JBQVEsOERBRVIsQ0FBQTtBQUFBLFFBQUEsT0FBTyxDQUFDLFNBQVIsR0FBb0IsTUFBcEIsQ0FBQTtlQUNBLE9BQU8sQ0FBQyxRQUFSLENBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBcEMsRUFBMEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUF6RCxFQUhEO01BQUEsQ0FGbUIsRUFRbkIsU0FBQSxHQUFBO0FBRUMsWUFBQSx5QkFBQTtBQUFBLFFBRkEsd0JBQVEsOERBRVIsQ0FBQTtBQUFBLFFBQUEsSUFBRyxDQUFBLEdBQUksQ0FBQyxPQUFPLENBQUMsY0FBaEI7QUFDQyxVQUFBLFVBQUEsR0FBYSxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQXpCLENBREQ7U0FBQSxNQUVLLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFmO0FBQ0osVUFBQSxVQUFBLEdBQWEsR0FBRyxDQUFDLFNBQUosQ0FBYyxDQUFkLEVBQWdCLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQXhCLEdBQStCLENBQS9DLENBQWIsQ0FESTtTQUZMO0FBQUEsUUFLQSxPQUFPLENBQUMsU0FBUixHQUFvQixNQUxwQixDQUFBO0FBQUEsUUFNQSxPQUFPLENBQUMsUUFBUixDQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixPQUFP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NUJMO2FBa0NBLEtBQUssQ0FBQyxHQUFOLENBQVUsd0JBQVYsRUFBb0MsR0FBRyxDQUFDLE9BQXhDLEVBQ0M7QUFBQSxRQUFBLE1BQUEsRUFBUSxJQUFSO09BREQsRUFwQ087SUFBQSxFQTV4QjJDO0VBQUEsQ0FBcEQsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZHNfZ2VuZXJhdG9yL2dlbmVyYXRvcnMvZ3JhZGllbnQtZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQGFwcC5tb2R1bGUgJ0NhcmRHZW5lcmF0b3IuZ2VuZXJhdG9ycy5ncmFkaWVudEdlbicsIChHcmFkaWVudEdlbikgLT5cblxuXHRAb3B0aW9ucyA9IHt9XG5cdEBncmFkaWVudFZhcmlhbnRzID0gW1xuXHRcdCMwXG5cdFx0KGNvbnRleHQsYXJncy4uLikgLT5cblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZidcblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoMCwwLGNvbnRleHQuY2FudmFzLndpZHRoLGNvbnRleHQuY2FudmFzLmhlaWdodClcblxuXHRcdCMxXG5cdFx0KGNvbnRleHQsYXJncy4uLikgLT5cblxuXHRcdFx0aWYgIWdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsMVxuXHRcdFx0ZWxzZSBpZiBnZW4ub3B0aW9ucy5kZWZhdWx0T3B0aW9uc1xuXHRcdFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSgwLGdlbi5vcHRpb25zLmNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjZmZmJ1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnIycrZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVbcmFuZG9tVmFsMV1cblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoMCwwLGNvbnRleHQuY2FudmFzLndpZHRoLGNvbnRleHQuY2FudmFzLmhlaWdodClcblxuXHRcdFx0IyBzYXZlIG9wdGlvbnMgdG8gY3VycmVudCBtb2RlbFxuXHRcdFx0Z2VuLm9wdGlvbnMgPVxuXHRcdFx0XHRkZWZpbmVkVmFsMTogcmFuZG9tVmFsMVxuXG5cdFx0IzJcblx0XHQoY29udGV4dCxhcmdzLi4uKSAtPlxuXG5cdFx0XHRpZiAhZ2VuLm9wdGlvbnMuZGVmYXVsdE9wdGlvbnNcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWwxXG5cdFx0XHRlbHNlIGlmIGdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBhcHAuZ2V0UmFuZG9tKDAsZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjb250ZXh0LmNhbnZhcy53aWR0aCxjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjJytnZW4ub3B0aW9ucy5jb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgvMixjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cblx0XHRcdCMgc2F2ZSBvcHRpb25zIHRvIGN1cnJlbnQgbW9kZWxcblx0XHRcdGdlbi5vcHRpb25zID1cblx0XHRcdFx0ZGVmaW5lZFZhbDE6IHJhbmRvbVZhbDFcblxuXHRcdCMzXG5cdFx0KGNvbnRleHQsYXJncy4uLikgLT5cblxuXHRcdFx0aWYgIWdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsMVxuXHRcdFx0ZWxzZSBpZiBnZW4ub3B0aW9ucy5kZWZhdWx0T3B0aW9uc1xuXHRcdFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSgwLGdlbi5vcHRpb25zLmNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjZmZmJ1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnIycrZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVbcmFuZG9tVmFsMV1cblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoMCxjb250ZXh0LmNhbnZhcy5oZWlnaHQvMixjb250ZXh0LmNhbnZhcy53aWR0aCxjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cblx0XHRcdCMgc2F2ZSBvcHRpb25zIHRvIGN1cnJlbnQgbW9kZWxcblx0XHRcdGdlbi5vcHRpb25zID1cblx0XHRcdFx0ZGVmaW5lZFZhbDE6IHJhbmRvbVZhbDFcblxuXHRcdCM0XG5cdFx0KGNvbnRleHQsYXJncy4uLikgLT5cblxuXHRcdFx0Y2FudmFzID0gY29udGV4dC5jYW52YXNcblxuXHRcdFx0aWYgIWdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWwxXG5cdFx0XHRcdHJhbmRvbVZhbDIgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsMlxuXHRcdFx0ZWxzZSBpZiBnZW4ub3B0aW9ucy5kZWZhdWx0T3B0aW9uc1xuXHRcdFx0XHRjb2xvclNjaGVtZSA9IGdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cblx0XHRcdFx0cmFuZG9tVmFsMSA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblx0XHRcdFx0cmFuZG9tVmFsMiA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZidcblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoMCwwLGNhbnZhcy53aWR0aCxjYW52YXMuaGVpZ2h0KVxuXG5cdFx0XHRncmFkaWVudCA9IGNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgY2FudmFzLmhlaWdodC8yLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQqMS41KTtcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMV0gKVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMjAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXSApXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AoMC44MDAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDJdIClcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMl0gKVxuXG5cdFx0XHRjb250ZXh0LmJlZ2luUGF0aCgpXG5cdFx0XHRjb250ZXh0Lm1vdmVUbyhjYW52YXMud2lkdGgqNzUvMTAwLDApXG5cdFx0XHRjb250ZXh0LmxpbmVUbyhjYW52YXMud2lkdGgsMClcblx0XHRcdGNvbnRleHQubGluZVRvKGNhbnZhcy53aWR0aCxjYW52YXMuaGVpZ2h0KVxuXHRcdFx0Y29udGV4dC5saW5lVG8oY2FudmFzLndpZHRoLzIsY2FudmFzLmhlaWdodClcblx0XHRcdGNvbnRleHQubGluZVRvKGNhbnZhcy53aWR0aCo3NS8xMDAsMClcblx0XHRcdGNvbnRleHQuY2xvc2VQYXRoKClcblx0XHRcdGNvbnRleHQubGluZVdpZHRoID0gMC41XG5cdFx0XHRjb250ZXh0LnN0cm9rZVN0eWxlID0gZ3JhZGllbnRcblx0XHRcdGNvbnRleHQuc3Ryb2tlKClcblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gZ3JhZGllbnRcblx0XHRcdGNvbnRleHQuZmlsbCgpXG5cblx0XHRcdCMgc2F2ZSBvcHRpb25zIHRvIGN1cnJlbnQgbW9kZWxcblx0XHRcdGdlbi5vcHRpb25zID1cblx0XHRcdFx0ZGVmaW5lZFZhbDE6IHJhbmRvbVZhbDFcblx0XHRcdFx0ZGVmaW5lZFZhbDI6IHJhbmRvbVZhbDJcblx0XHRcdFx0IyBjb2xvclNjaGVtZTogY29sb3JTY2hlbWVcblxuXHRcdCM1XG5cdFx0KGNvbnRleHQsYXJncy4uLikgLT5cblxuXHRcdFx0aWYgIWdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsMVxuXHRcdFx0XHRyYW5kb21WYWwyID0gZ2VuLm9wdGlvbnMuZGVmaW5lZFZhbDJcblx0XHRcdGVsc2UgaWYgZ2VuLm9wdGlvbnMuZGVmYXVsdE9wdGlvbnNcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGFwcC5nZXRSYW5kb20oMCxnZW4ub3B0aW9ucy5jb2xvclNjaGVtZS5sZW5ndGgtMSlcblx0XHRcdFx0cmFuZG9tVmFsMiA9IGFwcC5nZXRSYW5kb20oMC42LDAuOSwyKVxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjZmZmJ1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnIycrZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVbcmFuZG9tVmFsMV1cblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoMCxjb250ZXh0LmNhbnZhcy5oZWlnaHQqcmFuZG9tVmFsMiAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXG5cdFx0XHQjIHNhdmUgb3B0aW9ucyB0byBjdXJyZW50IG1vZGVsXG5cdFx0XHRnZW4ub3B0aW9ucyA9XG5cdFx0XHRcdGRlZmluZWRWYWwxOiByYW5kb21WYWwxXG5cblxuXHRcdFx0XHRkZWZpbmVkVmFsMjogcmFuZG9tVmFsMlxuXG5cdFx0IzZcblx0XHQoY29udGV4dCxhcmdzLi4uKSAtPlxuXG5cdFx0XHRjYW52YXMgPSBjb250ZXh0LmNhbnZhc1xuXG5cdFx0XHRpZiAhZ2VuLm9wdGlvbnMuZGVmYXVsdE9wdGlvbnNcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBnZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdFx0XHRyYW5kb21WYWwxID0gZ2VuLm9wdGlvbnMuZGVmaW5lZFZhbDFcblx0XHRcdFx0cmFuZG9tVmFsMiA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWwyXG5cdFx0XHRlbHNlIGlmIGdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblx0XHRcdFx0cmFuZG9tVmFsMiA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZidcblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoMCwwLGNhbnZhcy53aWR0aCxjYW52YXMuaGVpZ2h0KVxuXHRcdFx0Y29udGV4dC5yZWN0KCBjYW52YXMud2lkdGgqMTAvMTAwLCAwLCBjYW52YXMud2lkdGgqNDAvMTAwLCBjYW52YXMuaGVpZ2h0KVxuXHRcdFx0Z3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KCAwLCBjYW52YXMuaGVpZ2h0LzIsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodC8yKTtcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMV0gKVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wKDEuMDAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwyXSApXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50XG5cdFx0XHRjb250ZXh0LmZpbGwoKVxuXG5cdFx0XHQjIHNhdmUgb3B0aW9ucyB0byBjdXJyZW50IG1vZGVsXG5cdFx0XHRnZW4ub3B0aW9ucyA9XG5cdFx0XHRcdGRlZmluZWRWYWwxOiByYW5kb21WYWwxXG5cdFx0XHRcdGRlZmluZWRWYWwyOiByYW5kb21WYWwyXG5cdFx0XHRcdCMgY29sb3JTY2hlbWU6IGNvbG9yU2NoZW1lXG5cblx0XHQjN1xuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGNhbnZhcyA9IGNvbnRleHQuY2FudmFzXG5cblx0XHRcdGlmICFnZW4ub3B0aW9ucy5kZWZhdWx0T3B0aW9uc1xuXHRcdFx0XHRjb2xvclNjaGVtZSA9IGdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsMVxuXHRcdFx0XHRyYW5kb21WYWwyID0gZ2VuLm9wdGlvbnMuZGVmaW5lZFZhbDJcblx0XHRcdGVsc2UgaWYgZ2VuLm9wdGlvbnMuZGVmYXVsdE9wdGlvbnNcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBnZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cdFx0XHRcdHJhbmRvbVZhbDIgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjYW52YXMud2lkdGgsY2FudmFzLmhlaWdodClcblx0XHRcdGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCBjYW52YXMuaGVpZ2h0LzIsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCowLjI1KTtcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMV0gKVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNDk1LCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXSApXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AoMC4wMDAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDJdIClcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjUwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMl0gKVxuXG5cdFx0XHRjb250ZXh0LmJlZ2luUGF0aCgpXG5cdFx0XHRjb250ZXh0Lm1vdmVUbygwLDApXG5cdFx0XHRjb250ZXh0LmxpbmVUbyhjYW52YXMud2lkdGgqMjAvMTAwLDApXG5cdFx0XHRjb250ZXh0LmxpbmVUbyhjYW52YXMud2lkdGgqMzcvMTAwLGNhbnZhcy5oZWlnaHQpXG5cdFx0XHRjb250ZXh0LmxpbmVUbygwLGNhbnZhcy5oZWlnaHQpXG5cdFx0XHRjb250ZXh0LmxpbmVUbygwLDApXG5cdFx0XHRjb250ZXh0LmNsb3NlUGF0aCgpXG5cdFx0XHRjb250ZXh0LmxpbmVXaWR0aCA9IDAuNVxuXHRcdFx0Y29udGV4dC5zdHJva2VTdHlsZSA9IGdyYWRpZW50XG5cdFx0XHRjb250ZXh0LnN0cm9rZSgpXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50XG5cdFx0XHRjb250ZXh0LmZpbGwoKVxuXG5cdFx0XHQjIHNhdmUgb3B0aW9ucyB0byBjdXJyZW50IG1vZGVsXG5cdFx0XHRnZW4ub3B0aW9ucyA9XG5cdFx0XHRcdGRlZmluZWRWYWwxOiByYW5kb21WYWwxXG5cdFx0XHRcdGRlZmluZWRWYWwyOiByYW5kb21WYWwyXG5cdFx0XHRcdCMgY29sb3JTY2hlbWU6IGNvbG9yU2NoZW1lXG5cblx0XHQjOFxuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGNhbnZhcyA9IGNvbnRleHQuY2FudmFzXG5cblx0XHRcdGlmICFnZW4ub3B0aW9ucy5kZWZhdWx0T3B0aW9uc1xuXHRcdFx0XHRjb2xvclNjaGVtZSA9IGdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsMVxuXHRcdFx0XHRyYW5kb21WYWwyID0gZ2VuLm9wdGlvbnMuZGVmaW5lZFZhbDJcblx0XHRcdFx0cmFuZG9tVmFsMyA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWwzXG5cdFx0XHRcdHJhbmRvbVZhbDQgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsNFxuXHRcdFx0XHRyYW5kb21WYWw1ID0gZ2VuLm9wdGlvbnMuZGVmaW5lZFZhbDVcblx0XHRcdFx0Z3JhZGllbnRUeXBlID0gZ2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHRcdGVsc2UgaWYgZ2VuLm9wdGlvbnMuZGVmYXVsdE9wdGlvbnNcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBnZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHRyYW5kb21WYWwyID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHRyYW5kb21WYWwzID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHRyYW5kb21WYWw0ID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHRyYW5kb21WYWw1ID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHQjIFRPRE8gZ2VuZXJhdGUgcmFuZG9tIGdyYWRpZW50VHlwZSFcblx0XHRcdFx0Z3JhZGllbnRUeXBlID0gZ2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjb250ZXh0LmNhbnZhcy53aWR0aCxjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cdFx0XHRcblx0XHRcdGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudChjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQsIDAuMDAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQsIDgwLjAwMClcblxuXHRcdFx0IyBBZGQgY29sb3JzXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC4wMDAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDFdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC4yMDAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDFdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC4yMTUsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDJdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC40MDAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDJdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC40MTUsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDNdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC42MDAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDNdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC42MTUsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDRdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC44MDAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDRdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC44MTUsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDVdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC45NjAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDVdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMS4wMDAsIFwicmdiYSgyNTUsIDI1NSwgMjU1LCAxLjAwMClcIlxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50XG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0IDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodFxuXG5cdFx0XHQjIHNhdmUgb3B0aW9ucyB0byBjdXJyZW50IG1vZGVsXG5cdFx0XHRnZW4ub3B0aW9ucyA9XG5cdFx0XHRcdGRlZmluZWRWYWwxOiByYW5kb21WYWwxXG5cdFx0XHRcdGRlZmluZWRWYWwyOiByYW5kb21WYWwyXG5cdFx0XHRcdGRlZmluZWRWYWwzOiByYW5kb21WYWwzXG5cdFx0XHRcdGRlZmluZWRWYWw0OiByYW5kb21WYWw0XG5cdFx0XHRcdGRlZmluZWRWYWw1OiByYW5kb21WYWw1XG5cblx0XHQjOVxuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGNhbnZhcyA9IGNvbnRleHQuY2FudmFzXG5cblx0XHRcdGlmICFnZW4ub3B0aW9ucy5kZWZhdWx0T3B0aW9uc1xuXHRcdFx0XHRjb2xvclNjaGVtZSA9IGdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsMVxuXHRcdFx0XHRyYW5kb21WYWwyID0gZ2VuLm9wdGlvbnMuZGVmaW5lZFZhbDJcblx0XHRcdFx0cmFuZG9tVmFsMyA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWwzXG5cdFx0XHRcdHJhbmRvbVZhbDQgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsNFxuXG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IGdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0XHRlbHNlIGlmIGdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblx0XHRcdFx0cmFuZG9tVmFsMiA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblx0XHRcdFx0cmFuZG9tVmFsMyA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblx0XHRcdFx0cmFuZG9tVmFsNCA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblxuXHRcdFx0XHQjIFRPRE8gZ2VuZXJhdGUgcmFuZG9tIGdyYWRpZW50VHlwZSFcblx0XHRcdFx0Z3JhZGllbnRUeXBlID0gZ2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjb250ZXh0LmNhbnZhcy53aWR0aCxjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cdFx0XHRcblx0XHRcdGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudChjYW52YXMud2lkdGgrNSwgY2FudmFzLmhlaWdodC8yLCAwLjAwMCwgY2FudmFzLndpZHRoKzUsIGNhbnZhcy5oZWlnaHQvMiwgMTIwLjAwMClcblxuXHRcdFx0IyBBZGQgY29sb3JzXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC4wMDAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDFdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC4wNzMsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDFdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC4wODAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDJdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC4yMzUsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDJdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC4yNTAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDNdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC40ODUsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDNdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC41MDAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDRdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC43MzUsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDRdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC43NTAsIFwicmdiYSgyNTUsIDI1NSwgMjU1LCAxLjAwMClcIlxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDEuMDAwLCBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMS4wMDApXCJcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudFxuXHRcdFx0Y29udGV4dC5maWxsUmVjdCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHRcblxuXHRcdFx0IyBzYXZlIG9wdGlvbnMgdG8gY3VycmVudCBtb2RlbFxuXHRcdFx0Z2VuLm9wdGlvbnMgPVxuXHRcdFx0XHRkZWZpbmVkVmFsMTogcmFuZG9tVmFsMVxuXHRcdFx0XHRkZWZpbmVkVmFsMjogcmFuZG9tVmFsMlxuXHRcdFx0XHRkZWZpbmVkVmFsMzogcmFuZG9tVmFsM1xuXHRcdFx0XHRkZWZpbmVkVmFsNDogcmFuZG9tVmFsNFxuXG5cdFx0IzEwXG5cdFx0KGNvbnRleHQsYXJncy4uLikgLT5cblxuXHRcdFx0Y2FudmFzID0gY29udGV4dC5jYW52YXNcblxuXHRcdFx0aWYgIWdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWwxXG5cdFx0XHRcdHJhbmRvbVZhbDIgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsMlxuXHRcdFx0XHRyYW5kb21WYWwzID0gZ2VuLm9wdGlvbnMuZGVmaW5lZFZhbDNcblx0XHRcdFx0cmFuZG9tVmFsNCA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWw0XG5cblx0XHRcdFx0Z3JhZGllbnRUeXBlID0gZ2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHRcdGVsc2UgaWYgZ2VuLm9wdGlvbnMuZGVmYXVsdE9wdGlvbnNcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBnZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHRyYW5kb21WYWwyID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHRyYW5kb21WYWwzID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHRyYW5kb21WYWw0ID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXG5cdFx0XHRcdCMgVE9ETyBnZW5lcmF0ZSByYW5kb20gZ3JhZGllbnRUeXBlIVxuXHRcdFx0XHRncmFkaWVudFR5cGUgPSBnZW4ub3B0aW9ucy5ncmFkaWVudFR5cGVcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZidcblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoMCwwLGNvbnRleHQuY2FudmFzLndpZHRoLGNvbnRleHQuY2FudmFzLmhlaWdodClcblx0XHRcdFxuXHRcdFx0Z3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGNhbnZhcy53aWR0aC8yLCBjYW52YXMuaGVpZ2h0LTgsIDAuMDAwLCBjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodCsyMDAsIDI3MC4wMDApXG5cblx0XHRcdCMgQWRkIGNvbG9yc1xuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuMDAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuMDczLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuMDg1LCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwyXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuMjM1LCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwyXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuMjUwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwzXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNDgwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwzXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNTAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWw0XVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNzM1LCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWw0XVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNzUwLCBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMS4wMDApXCJcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAxLjAwMCwgXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDEuMDAwKVwiXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gZ3JhZGllbnRcblx0XHRcdGNvbnRleHQuZmlsbFJlY3QgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0XG5cblx0XHRcdCMgc2F2ZSBvcHRpb25zIHRvIGN1cnJlbnQgbW9kZWxcblx0XHRcdGdlbi5vcHRpb25zID1cblx0XHRcdFx0ZGVmaW5lZFZhbDE6IHJhbmRvbVZhbDFcblx0XHRcdFx0ZGVmaW5lZFZhbDI6IHJhbmRvbVZhbDJcblx0XHRcdFx0ZGVmaW5lZFZhbDM6IHJhbmRvbVZhbDNcblx0XHRcdFx0ZGVmaW5lZFZhbDQ6IHJhbmRvbVZhbDRcblxuXHRcdCMxMVxuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGNhbnZhcyA9IGNvbnRleHQuY2FudmFzXG5cblx0XHRcdGlmICFnZW4ub3B0aW9ucy5kZWZhdWx0T3B0aW9uc1xuXHRcdFx0XHRjb2xvclNjaGVtZSA9IGdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsMVxuXG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IGdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0XHRlbHNlIGlmIGdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblxuXHRcdFx0XHRncmFkaWVudFR5cGUgPSBnZW4ub3B0aW9ucy5ncmFkaWVudFR5cGVcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZidcblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoMCwwLGNvbnRleHQuY2FudmFzLndpZHRoLGNvbnRleHQuY2FudmFzLmhlaWdodClcblx0XHRcdFxuXHRcdFx0Z3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGNhbnZhcy53aWR0aC8yLCAwICwgMC4wMDAsIGNhbnZhcy53aWR0aC8yLCAwLTMxMCwgNDAwLjAwMClcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjAwMCwgJyNmZmYnXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC43MzAsICcjZmZmJ1xuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNzUwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDEuMDAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50XG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0IDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodFxuXG5cdFx0XHQjIHNhdmUgb3B0aW9ucyB0byBjdXJyZW50IG1vZGVsXG5cdFx0XHRnZW4ub3B0aW9ucyA9XG5cdFx0XHRcdGRlZmluZWRWYWwxOiByYW5kb21WYWwxXG5cblx0XHQjMTJcblx0XHQoY29udGV4dCxhcmdzLi4uKSAtPlxuXG5cdFx0XHRjYW52YXMgPSBjb250ZXh0LmNhbnZhc1xuXG5cdFx0XHRpZiAhZ2VuLm9wdGlvbnMuZGVmYXVsdE9wdGlvbnNcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBnZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdFx0XHRyYW5kb21WYWwxID0gZ2VuLm9wdGlvbnMuZGVmaW5lZFZhbDFcblx0XHRcdFx0cmFuZG9tVmFsMiA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWwyXG5cdFx0XHRcdHJhbmRvbVZhbDMgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsM1xuXG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IGdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0XHRlbHNlIGlmIGdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblx0XHRcdFx0cmFuZG9tVmFsMiA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblx0XHRcdFx0cmFuZG9tVmFsMyA9IGFwcC5nZXRSYW5kb20oNDAsMTUwKVxuXG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IGdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjZmZmJ1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXHRcdFx0XG5cdFx0XHRncmFkaWVudCA9IGNvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQoY2FudmFzLndpZHRoLzIsIGNhbnZhcy5oZWlnaHQvMiAsIDAuMDAwLCBjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC8yLCByYW5kb21WYWwzKVxuXG5cdFx0XHQjIEFkZCBjb2xvcnNcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMV1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjczNSwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMV1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjc1MCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMl1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAxLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMl1cblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudFxuXHRcdFx0Y29udGV4dC5maWxsUmVjdCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHRcblxuXHRcdFx0IyBzYXZlIG9wdGlvbnMgdG8gY3VycmVudCBtb2RlbFxuXHRcdFx0Z2VuLm9wdGlvbnMgPVxuXHRcdFx0XHRkZWZpbmVkVmFsMTogcmFuZG9tVmFsMVxuXHRcdFx0XHRkZWZpbmVkVmFsMjogcmFuZG9tVmFsMlxuXHRcdFx0XHRkZWZpbmVkVmFsMzogcmFuZG9tVmFsM1xuXG5cdFx0IzEzXG5cdFx0KGNvbnRleHQsYXJncy4uLikgLT5cblxuXHRcdFx0Y2FudmFzID0gY29udGV4dC5jYW52YXNcblxuXHRcdFx0aWYgIWdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWwxXG5cdFx0XHRcdHJhbmRvbVZhbDIgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsMlxuXG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IGdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0XHRlbHNlIGlmIGdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblx0XHRcdFx0cmFuZG9tVmFsMiA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblxuXHRcdFx0XHRncmFkaWVudFR5cGUgPSBnZW4ub3B0aW9ucy5ncmFkaWVudFR5cGVcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZidcblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoMCwwLGNvbnRleHQuY2FudmFzLndpZHRoLGNvbnRleHQuY2FudmFzLmhlaWdodClcblx0XHRcdFxuXHRcdFx0Z3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIGNhbnZhcy5oZWlnaHQvMiwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0LzIrNDIpXG5cblx0XHRcdCMgQWRkIGNvbG9yc1xuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuMDAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNTUwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNzUwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwyXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDEuMDAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwyXVxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50XG5cdFx0XHRjb250ZXh0LmxpbmVXaWR0aCA9IDAuNVxuXHRcdFx0Y29udGV4dC5zdHJva2VTdHlsZSA9IGdyYWRpZW50XG5cblx0XHRcdGNvbnRleHQuYmVnaW5QYXRoKClcblx0XHRcdGNvbnRleHQubW92ZVRvIGNhbnZhcy53aWR0aCo2Ny8xMDAsMFxuXHRcdFx0Y29udGV4dC5saW5lVG8gY2FudmFzLndpZHRoKjcxLzEwMCwwXG5cdFx0XHRjb250ZXh0LmxpbmVUbyBjYW52YXMud2lkdGgqNjEvMTAwLGNhbnZhcy5oZWlnaHRcblx0XHRcdGNvbnRleHQubGluZVRvIGNhbnZhcy53aWR0aCo1Ny8xMDAsY2FudmFzLmhlaWdodFxuXHRcdFx0Y29udGV4dC5saW5lVG8gY2FudmFzLndpZHRoKjY3LzEwMCwwXG5cblx0XHRcdGNvbnRleHQubW92ZVRvIGNhbnZhcy53aWR0aCo3NC8xMDAsMFxuXHRcdFx0Y29udGV4dC5saW5lVG8gY2FudmFzLndpZHRoKjgxLzEwMCwwXG5cdFx0XHRjb250ZXh0LmxpbmVUbyBjYW52YXMud2lkdGgqNzEvMTAwLGNhbnZhcy5oZWlnaHRcblx0XHRcdGNvbnRleHQubGluZVRvIGNhbnZhcy53aWR0aCo2NC8xMDAsY2FudmFzLmhlaWdodFxuXG5cdFx0XHRjb250ZXh0LmNsb3NlUGF0aCgpXG5cdFx0XHRjb250ZXh0LnN0cm9rZSgpXG5cdFx0XHRjb250ZXh0LmZpbGwoKVxuXG5cdFx0XHQjIEZpbGwgd2l0aCBncmFkaWVudFxuXHRcdFx0IyBjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50XG5cdFx0XHQjIGNvbnRleHQuZmlsbFJlY3QgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0XG5cblx0XHRcdCMgc2F2ZSBvcHRpb25zIHRvIGN1cnJlbnQgbW9kZWxcblx0XHRcdGdlbi5vcHRpb25zID1cblx0XHRcdFx0ZGVmaW5lZFZhbDE6IHJhbmRvbVZhbDFcblx0XHRcdFx0ZGVmaW5lZFZhbDI6IHJhbmRvbVZhbDJcblxuXHRcdCMxNFxuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGNhbnZhcyA9IGNvbnRleHQuY2FudmFzXG5cblx0XHRcdGlmICFnZW4ub3B0aW9ucy5kZWZhdWx0T3B0aW9uc1xuXHRcdFx0XHRjb2xvclNjaGVtZSA9IGdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsMVxuXHRcdFx0XHRyYW5kb21WYWwyID0gZ2VuLm9wdGlvbnMuZGVmaW5lZFZhbDJcblx0XHRcdGVsc2UgaWYgZ2VuLm9wdGlvbnMuZGVmYXVsdE9wdGlvbnNcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBnZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHRyYW5kb21WYWwyID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjZmZmJ1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY2FudmFzLndpZHRoLGNhbnZhcy5oZWlnaHQpXG5cdFx0XHRjb250ZXh0LnJlY3QoIDAsY2FudmFzLmhlaWdodCo1MC8xMDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCo0MC8xMDApXG5cdFx0XHRncmFkaWVudCA9IGNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoIGNhbnZhcy53aWR0aC8yLCAwICwgY2FudmFzLndpZHRoLzIsIGNhbnZhcy5oZWlnaHQpO1xuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDFdIClcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwyXSApXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50XG5cdFx0XHRjb250ZXh0LmZpbGwoKVxuXG5cdFx0XHQjIHNhdmUgb3B0aW9ucyB0byBjdXJyZW50IG1vZGVsXG5cdFx0XHRnZW4ub3B0aW9ucyA9XG5cdFx0XHRcdGRlZmluZWRWYWwxOiByYW5kb21WYWwxXG5cdFx0XHRcdGRlZmluZWRWYWwyOiByYW5kb21WYWwyXG5cdFx0XHRcdCMgY29sb3JTY2hlbWU6IGNvbG9yU2NoZW1lXG5cblx0XHQjMTVcblx0XHQoY29udGV4dCxhcmdzLi4uKSAtPlxuXG5cdFx0XHRjYW52YXMgPSBjb250ZXh0LmNhbnZhc1xuXG5cdFx0XHRpZiAhZ2VuLm9wdGlvbnMuZGVmYXVsdE9wdGlvbnNcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBnZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdFx0XHRyYW5kb21WYWwxID0gZ2VuLm9wdGlvbnMuZGVmaW5lZFZhbDFcblx0XHRcdFx0cmFuZG9tVmFsMiA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWwyXG5cblx0XHRcdFx0Z3JhZGllbnRUeXBlID0gZ2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHRcdGVsc2UgaWYgZ2VuLm9wdGlvbnMuZGVmYXVsdE9wdGlvbnNcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBnZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHRyYW5kb21WYWwyID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IGdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjZmZmJ1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXHRcdFx0XG5cdFx0XHRncmFkaWVudCA9IGNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgY2FudmFzLmhlaWdodC8yLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQvMis0MilcblxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuMDAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNTAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwyXVxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50XG5cdFx0XHRjb250ZXh0LmxpbmVXaWR0aCA9IDAuNVxuXHRcdFx0Y29udGV4dC5zdHJva2VTdHlsZSA9IGdyYWRpZW50XG5cblx0XHRcdGNvbnRleHQuYmVnaW5QYXRoKClcblx0XHRcdGNvbnRleHQubW92ZVRvIDAsMFxuXHRcdFx0Y29udGV4dC5saW5lVG8gY2FudmFzLndpZHRoKjIwLzEwMCwwXG5cdFx0XHRjb250ZXh0LmxpbmVUbyBjYW52YXMud2lkdGgqMzAvMTAwLGNhbnZhcy5oZWlnaHQvMi41XG5cdFx0XHRjb250ZXh0LmxpbmVUbyBjYW52YXMud2lkdGgqMjAvMTAwLGNhbnZhcy5oZWlnaHRcblx0XHRcdGNvbnRleHQubGluZVRvIDAsY2FudmFzLmhlaWdodFxuXHRcdFx0Y29udGV4dC5saW5lVG8gMCwwXG5cblx0XHRcdGNvbnRleHQuY2xvc2VQYXRoKClcblx0XHRcdGNvbnRleHQuc3Ryb2tlKClcblx0XHRcdGNvbnRleHQuZmlsbCgpXG5cblx0XHRcdGdlbi5vcHRpb25zID1cblx0XHRcdFx0ZGVmaW5lZFZhbDE6IHJhbmRvbVZhbDFcblx0XHRcdFx0ZGVmaW5lZFZhbDI6IHJhbmRvbVZhbDJcblxuXHRcdCMxNlxuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGNhbnZhcyA9IGNvbnRleHQuY2FudmFzXG5cblx0XHRcdGlmICFnZW4ub3B0aW9ucy5kZWZhdWx0T3B0aW9uc1xuXHRcdFx0XHRjb2xvclNjaGVtZSA9IGdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsMVxuXHRcdFx0XHRyYW5kb21WYWwyID0gZ2VuLm9wdGlvbnMuZGVmaW5lZFZhbDJcblxuXHRcdFx0XHRncmFkaWVudFR5cGUgPSBnZW4ub3B0aW9ucy5ncmFkaWVudFR5cGVcblxuXHRcdFx0ZWxzZSBpZiBnZW4ub3B0aW9ucy5kZWZhdWx0T3B0aW9uc1xuXHRcdFx0XHRjb2xvclNjaGVtZSA9IGdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cdFx0XHRcdHJhbmRvbVZhbDIgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cblx0XHRcdFx0Z3JhZGllbnRUeXBlID0gZ2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjb250ZXh0LmNhbnZhcy53aWR0aCxjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cdFx0XHRcblx0XHRcdGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCBjYW52YXMuaGVpZ2h0LzIsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodC8yKzQyKVxuXG5cdFx0XHQjIEFkZCBjb2xvcnNcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjUwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMV1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAxLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMl1cblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudFxuXHRcdFx0Y29udGV4dC5saW5lV2lkdGggPSAwLjVcblx0XHRcdGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBncmFkaWVudFxuXG5cdFx0XHRjb250ZXh0LmJlZ2luUGF0aCgpXG5cdFx0XHRjb250ZXh0Lm1vdmVUbyBjYW52YXMud2lkdGgqNzAvMTAwLDBcblx0XHRcdGNvbnRleHQubGluZVRvIGNhbnZhcy53aWR0aCwwXG5cdFx0XHRjb250ZXh0LmxpbmVUbyBjYW52YXMud2lkdGgsY2FudmFzLmhlaWdodFxuXHRcdFx0Y29udGV4dC5saW5lVG8gY2FudmFzLndpZHRoKjcwLzEwMCxjYW52YXMuaGVpZ2h0XG5cdFx0XHRjb250ZXh0LmxpbmVUbyBjYW52YXMud2lkdGgqODAvMTAwLGNhbnZhcy5oZWlnaHQvMi41XG5cdFx0XHRjb250ZXh0LmxpbmVUbyBjYW52YXMud2lkdGgqNzAvMTAwLDBcblxuXHRcdFx0Y29udGV4dC5jbG9zZVBhdGgoKVxuXHRcdFx0Y29udGV4dC5zdHJva2UoKVxuXHRcdFx0Y29udGV4dC5maWxsKClcblxuXHRcdFx0Z2VuLm9wdGlvbnMgPVxuXHRcdFx0XHRkZWZpbmVkVmFsMTogcmFuZG9tVmFsMVxuXHRcdFx0XHRkZWZpbmVkVmFsMjogcmFuZG9tVmFsMlxuXG5cdFx0IzE4XG5cdFx0KGNvbnRleHQsYXJncy4uLikgLT5cblxuXHRcdFx0Y2FudmFzID0gY29udGV4dC5jYW52YXNcblxuXHRcdFx0aWYgIWdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWwxXG5cdFx0XHRcdHJhbmRvbVZhbDIgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsMlxuXG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IGdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0XHRlbHNlIGlmIGdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblx0XHRcdFx0cmFuZG9tVmFsMiA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblxuXHRcdFx0XHRncmFkaWVudFR5cGUgPSBnZW4ub3B0aW9ucy5ncmFkaWVudFR5cGVcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZidcblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoMCwwLGNvbnRleHQuY2FudmFzLndpZHRoLGNvbnRleHQuY2FudmFzLmhlaWdodClcblx0XHRcdFxuXHRcdFx0Z3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIGNhbnZhcy5oZWlnaHQvMiwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0LzIrNDIpXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC4wMDAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDFdXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMS4wMDAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDJdXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gZ3JhZGllbnRcblx0XHRcdGNvbnRleHQubGluZVdpZHRoID0gMC41XG5cdFx0XHRjb250ZXh0LnN0cm9rZVN0eWxlID0gZ3JhZGllbnRcblxuXHRcdFx0Y29udGV4dC5yZWN0KGNhbnZhcy53aWR0aCozMC8xMDAsY2FudmFzLmhlaWdodCoyMi8xMDAsY2FudmFzLndpZHRoKjY1LzEwMCxjYW52YXMuaGVpZ2h0KjcwLzEwMClcblxuXHRcdFx0Y29udGV4dC5jbG9zZVBhdGgoKVxuXHRcdFx0Y29udGV4dC5zdHJva2UoKVxuXHRcdFx0Y29udGV4dC5maWxsKClcblxuXHRcdFx0Z2VuLm9wdGlvbnMgPVxuXHRcdFx0XHRkZWZpbmVkVmFsMTogcmFuZG9tVmFsMVxuXHRcdFx0XHRkZWZpbmVkVmFsMjogcmFuZG9tVmFsMlxuXG5cdFx0IzE5IFN0YXJzXG5cdFx0KGNvbnRleHQsYXJncy4uLikgLT5cblxuXHRcdFx0Y2FudmFzID0gY29udGV4dC5jYW52YXNcblxuXHRcdFx0aWYgIWdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWwxXG5cdFx0XHRcdHJhbmRvbVZhbDIgPSBnZW4ub3B0aW9ucy5kZWZpbmVkVmFsMlxuXG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IGdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0XHRlbHNlIGlmIGdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblx0XHRcdFx0cmFuZG9tVmFsMiA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblxuXHRcdFx0XHRncmFkaWVudFR5cGUgPSBnZW4ub3B0aW9ucy5ncmFkaWVudFR5cGVcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZidcblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoMCwwLGNvbnRleHQuY2FudmFzLndpZHRoLGNvbnRleHQuY2FudmFzLmhlaWdodClcblx0XHRcdFxuXHRcdFx0IyAgICBkcmF3U3RhcihjdHgsIGNhbnZhcy53aWR0aC8yLCBjYW52YXMuaGVpZ2h0LzIsIDEwMDAsMzAsIDMwMCk7XG5cdFx0XHRzdGFyID0gKGNvbnRleHQsIHhDZW50ZXIsIHlDZW50ZXIsIG5Qb2ludHMsIG91dGVyUmFkaXVzLCBpbm5lclJhZGl1cykgLT5cblx0XHRcdFx0Y29udGV4dC5iZWdpblBhdGgoKVxuXHRcdFx0XHRpeFZlcnRleCA9IDBcblxuXHRcdFx0XHR3aGlsZSBpeFZlcnRleCA8PSAyICogblBvaW50c1xuXHRcdFx0XHRcdGFuZ2xlID0gaXhWZXJ0ZXggKiBNYXRoLlBJIC8gblBvaW50cyAtIE1hdGguUEkgLyAyXG5cdFx0XHRcdFx0cmFkaXVzID0gKGlmIGl4VmVydGV4ICUgMiBpcyAwIHRoZW4gaW5uZXJSYWRpdXMgZWxzZSBvdXRlclJhZGl1cylcblx0XHRcdFx0XHRjb250ZXh0LmxpbmVUbyB4Q2VudGVyICsgcmFkaXVzICogTWF0aC5jb3MoYW5nbGUpLCB5Q2VudGVyICsgcmFkaXVzICogTWF0aC5zaW4oYW5nbGUpXG5cdFx0XHRcdFx0KytpeFZlcnRleFxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0Y29udGV4dC5iZWdpblBhdGgoKVxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBcIiNDNDAwNDNcIlxuXHRcdFx0Y29udGV4dC5hcmMgY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIsIGNhbnZhcy53aWR0aC80LCAwLCBNYXRoLlBJICogMlxuXHRcdFx0Y29udGV4dC5maWxsKClcblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gXCJncmVlblwiXG5cdFx0XHRzdGFyIGNvbnRleHQsIGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCA5LCBjYW52YXMud2lkdGgvMywgMTBcblx0XHRcdGNvbnRleHQuZmlsbCgpXG5cblx0XHRcdGdlbi5vcHRpb25zID1cblx0XHRcdFx0ZGVmaW5lZFZhbDE6IHJhbmRvbVZhbDFcblx0XHRcdFx0ZGVmaW5lZFZhbDI6IHJhbmRvbVZhbDJcblxuXHRcdCMg0JjQvNC/0YDQvtCy0LjQt9Cw0YbQuNGPXG5cdFx0IyAoY29udGV4dCxhcmdzLi4uKSAtPlxuXHRcdCMgXHRpZiAhZ2VuLm9wdGlvbnMuZGVmYXVsdE9wdGlvbnNcblx0XHQjIFx0XHRjb2xvclNjaGVtZSA9IGdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cdFx0IyBcdFx0cmFuZG9tVmFsMSA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWwxXG5cdFx0IyBcdFx0cmFuZG9tVmFsMiA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWwyXG5cdFx0IyBcdFx0cmFuZG9tVmFsMyA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWwzXG5cdFx0IyBcdFx0cmFuZG9tVmFsNCA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWw0XG5cdFx0IyBcdFx0cmFuZG9tVmFsNSA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWw1XG5cdFx0IyBcdFx0cmFuZG9tVmFsNiA9IGdlbi5vcHRpb25zLmRlZmluZWRWYWw2XG5cdFx0IyBcdFx0Z3JhZGllbnRUeXBlID0gZ2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHQjIFx0ZWxzZSBpZiBnZW4ub3B0aW9ucy5kZWZhdWx0T3B0aW9uc1xuXHRcdCMgXHRcdGNvbG9yU2NoZW1lID0gZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHQjIFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdCMgXHRcdHJhbmRvbVZhbDIgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cdFx0IyBcdFx0cmFuZG9tVmFsMyA9IGFwcC5nZXRSYW5kb20oMCwgMTUwKVxuXHRcdCMgXHRcdHJhbmRvbVZhbDQgPSBhcHAuZ2V0UmFuZG9tKDAsIDE1MClcblx0XHQjIFx0XHRyYW5kb21WYWw1ID0gYXBwLmdldFJhbmRvbSgwLCAxNTApXG5cdFx0IyBcdFx0cmFuZG9tVmFsNiA9IGFwcC5nZXRSYW5kb20oMCwgMTUwKVxuXHRcdCMgXHRcdCMgVE9ETyBnZW5lcmF0ZSByYW5kb20gZ3JhZGllbnRUeXBlIVxuXHRcdCMgXHRcdGdyYWRpZW50VHlwZSA9IGdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0IyBcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0IyBcdGNvbnRleHQuZmlsbFJlY3QoMCwwLGNvbnRleHQuY2FudmFzLndpZHRoLGNvbnRleHQuY2FudmFzLmhlaWdodClcblx0XHQjIFx0aWYgZ3JhZGllbnRUeXBlIGlzICdsaW5lYXInXG5cdFx0IyBcdFx0Z3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KHJhbmRvbVZhbDMscmFuZG9tVmFsNCxyYW5kb21WYWw1LHJhbmRvbVZhbDYpXG5cdFx0IyBcdGVsc2UgaWYgZ3JhZGllbnRUeXBlIGlzICdyYWRpYWwnXG5cdFx0IyBcdFx0Z3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KDE1MCw3NSw1MCwxNTAsNzUsNDkpXG5cdFx0IyBcdGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCcjJytjb2xvclNjaGVtZVtyYW5kb21WYWwxXSlcblx0XHQjIFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsJyMnK2NvbG9yU2NoZW1lW3JhbmRvbVZhbDJdKVxuXHRcdCMgXHRjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50XG5cdFx0IyBcdGNvbnRleHQuZmlsbFJlY3QoMCwwLGNvbnRleHQuY2FudmFzLndpZHRoLGNvbnRleHQuY2FudmFzLmhlaWdodClcblxuXHRcdCMgXHQjIHNhdmUgb3B0aW9ucyB0byBjdXJyZW50IG1vZGVsXG5cdFx0IyBcdGdlbi5vcHRpb25zID1cblx0XHQjIFx0XHRkZWZpbmVkVmFsMTogcmFuZG9tVmFsMVxuXHRcdCMgXHRcdGRlZmluZWRWYWwyOiByYW5kb21WYWwyXG5cdFx0IyBcdFx0ZGVmaW5lZFZhbDM6IHJhbmRvbVZhbDNcblx0XHQjIFx0XHRkZWZpbmVkVmFsNDogcmFuZG9tVmFsNFxuXHRcdCMgXHRcdGRlZmluZWRWYWw1OiByYW5kb21WYWw1XG5cdFx0IyBcdFx0ZGVmaW5lZFZhbDY6IHJhbmRvbVZhbDZcblxuXHRcdCMg0JjQvNC/0YDQvtCy0LjQt9Cw0YbQuNGPIDJcblx0XHQjIChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cdFx0IyBcdGlmICFnZW4ub3B0aW9ucy5kZWZhdWx0T3B0aW9uc1xuXHRcdCMgXHRcdGNvbG9yU2NoZW1lID0gZ2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHQjIFx0XHRyYW5kb21WYWwxID0gZ2VuLm9wdGlvbnMuZGVmaW5lZFZhbDFcblx0XHQjIFx0XHRyYW5kb21WYWwyID0gZ2VuLm9wdGlvbnMuZGVmaW5lZFZhbDJcblx0XHQjIFx0XHRyYW5kb21WYWwzID0gZ2VuLm9wdGlvbnMuZGVmaW5lZFZhbDNcblx0XHQjIFx0XHRyYW5kb21WYWw0ID0gZ2VuLm9wdGlvbnMuZGVmaW5lZFZhbDRcblx0XHQjIFx0XHRyYW5kb21WYWw1ID0gZ2VuLm9wdGlvbnMuZGVmaW5lZFZhbDVcblx0XHQjIFx0XHRncmFkaWVudFR5cGUgPSBnZW4ub3B0aW9ucy5ncmFkaWVudFR5cGVcblxuXHRcdCMgXHRlbHNlIGlmIGdlbi5vcHRpb25zLmRlZmF1bHRPcHRpb25zXG5cdFx0IyBcdFx0Y29sb3JTY2hlbWUgPSBnZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdCMgXHRcdHJhbmRvbVZhbDEgPSBhcHAuZ2V0UmFuZG9tKDUwLDI1MClcblx0XHQjIFx0XHRyYW5kb21WYWwyID0gYXBwLmdldFJhbmRvbSg1MCwyNTApXG5cdFx0IyBcdFx0cmFuZG9tVmFsMyA9IGFwcC5nZXRSYW5kb20oNTAsMjAwKVxuXHRcdCMgXHRcdHJhbmRvbVZhbDQgPSBhcHAuZ2V0UmFuZG9tKDUwLDIwMClcblx0XHQjIFx0XHRyYW5kb21WYWw1ID0gMTUwXG5cdFx0IyBcdFx0IyBUT0RPIGdlbmVyYXRlIHJhbmRvbSBncmFkaWVudFR5cGUhXG5cdFx0IyBcdFx0Z3JhZGllbnRUeXBlID0gZ2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHQjIFx0Y29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZidcblx0XHQjIFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXHRcdCMgXHQjIGlmIGdyYWRpZW50VHlwZSBpcyAnbGluZWFyJ1xuXHRcdCMgXHQjIFx0Z3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KHJhbmRvbVZhbDMscmFuZG9tVmFsNCxyYW5kb21WYWw1LHJhbmRvbVZhbDYpXG5cdFx0IyBcdCMgZWxzZSBpZiBncmFkaWVudFR5cGUgaXMgJ3JhZGlhbCdcblx0XHQjIFx0IyBcdGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudCgxNTAsNzUsNTAsMTUwLDc1LDQ5KVxuXG5cdFx0IyBcdGdyZCA9IGNvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQoIHJhbmRvbVZhbDEsIHJhbmRvbVZhbDIsIDAuMDAwLCByYW5kb21WYWwzLCByYW5kb21WYWw0LCByYW5kb21WYWw1KVxuXG5cdFx0IyBcdCMgQWRkIGNvbG9yc1xuXHRcdCMgXHRncmQuYWRkQ29sb3JTdG9wIDAuMDAwLCBcInJnYmEoMTQsIDE0LCAxNiwgMS4wMDApXCJcblx0XHQjIFx0Z3JkLmFkZENvbG9yU3RvcCAwLjE3MCwgXCJyZ2JhKDE0LCAxNCwgMTYsIDEuMDAwKVwiXG5cdFx0IyBcdGdyZC5hZGRDb2xvclN0b3AgMC4yNzAsIFwicmdiYSg5NiwgMTA5LCA5MSwgMS4wMDApXCJcblx0XHQjIFx0Z3JkLmFkZENvbG9yU3RvcCAwLjYxMCwgXCJyZ2JhKDc1LCA5MywgMTAzLCAxLjAwMClcIlxuXHRcdCMgXHRncmQuYWRkQ29sb3JTdG9wIDAuNjIwLCBcInJnYmEoNzUsIDkzLCAxMDMsIDEuMDAwKVwiXG5cdFx0IyBcdGdyZC5hZGRDb2xvclN0b3AgMC42OTAsIFwicmdiYSgyNTUsIDI1MCwgMjUwLCAxLjAwMClcIlxuXHRcdCMgXHRncmQuYWRkQ29sb3JTdG9wIDAuOTIwLCBcInJnYmEoMjU1LCAyNTAsIDI1MCwgMS4wMDApXCJcblx0XHQjIFx0Z3JkLmFkZENvbG9yU3RvcCAwLjkzMCwgXCJyZ2JhKDAsIDAsIDAsIDEuMDAwKVwiXG5cdFx0IyBcdGdyZC5hZGRDb2xvclN0b3AgMC45NDAsIFwicmdiYSgyNTUsIDI1NSwgMjU1LCAxLjAwMClcIlxuXG5cdFx0IyBcdCMgRmlsbCB3aXRoIGdyYWRpZW50XG5cdFx0IyBcdGNvbnRleHQuZmlsbFN0eWxlID0gZ3JkXG5cdFx0IyBcdGNvbnRleHQuZmlsbFJlY3QgMCwgMCwgY29udGV4dC5jYW52YXMud2lkdGgsIGNvbnRleHQuY2FudmFzLmhlaWdodFxuXG5cdFx0IyBcdCMgc2F2ZSBvcHRpb25zIHRvIGN1cnJlbnQgbW9kZWxcblx0XHQjIFx0Z2VuLm9wdGlvbnMgPVxuXHRcdCMgXHRcdGRlZmluZWRWYWwxOiByYW5kb21WYWwxXG5cdFx0IyBcdFx0ZGVmaW5lZFZhbDI6IHJhbmRvbVZhbDJcblx0XHQjIFx0XHRkZWZpbmVkVmFsMzogcmFuZG9tVmFsM1xuXHRcdCMgXHRcdGRlZmluZWRWYWw0OiByYW5kb21WYWw0XG5cdFx0IyBcdFx0ZGVmaW5lZFZhbDU6IHJhbmRvbVZhbDVcblxuXG5cblx0XHRcdCMgQ3JlYXRlIGdyYWRpZW50XG5cdF1cblxuXHRAZHJhdyA9IChjYW52YXMsbW9kZWwsYXJncy4uLikgLT5cblx0XHQjIGNvbnNvbGUubG9nIEBvcHRpb25zXG5cdFx0aW5pdENvbG9yU2NoZW1lID0gLT5cblx0XHRcdHNjbSA9IG5ldyBDb2xvclNjaGVtZSgpXG5cdFx0XHRodWUgPSBhcHAuZ2V0UmFuZG9tKDAuMiwgMzU5LCAxKVxuXG5cdFx0XHR2YXJpYXRpb25zID0gWydkZWZhdWx0JywgJ3Bhc3RlbCcsICdzb2Z0JywgJ2xpZ2h0JywgJ2hhcmQnLCAncGFsZScgXVxuXHRcdFx0dmFyaWF0aW9uID0gdmFyaWF0aW9uc1sgYXBwLmdldFJhbmRvbSgwLCB2YXJpYXRpb25zLmxlbmd0aC0xKSBdXG5cdFx0XHRjb25zb2xlLmxvZyB2YXJpYXRpb25cblx0XHRcdHNjbS5mcm9tX2h1ZShodWUpXG5cdFx0XHQuc2NoZW1lKCd0ZXRyYWRlJylcblx0XHRcdC5kaXN0YW5jZSgwLjEpXG5cdFx0XHQuYWRkX2NvbXBsZW1lbnQoZmFsc2UpXG5cdFx0XHQudmFyaWF0aW9uKHZhcmlhdGlvbilcblx0XHRcdC53ZWJfc2FmZShmYWxzZSlcblx0XHRcdHNjbS5jb2xvcnMoKVxuXG5cdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcblx0XHQkLmV4dGVuZCggQG9wdGlvbnMsIG1vZGVsLmdldCAnZ2VuZXJhdG9ycy5ncmFkaWVudEdlbicgKVxuXHRcdCMgY29uc29sZS5sb2cgbW9kZWxcblx0XHRpZiBtb2RlbC5nZXQgJ2dlbmVyYXRvcnMuZ3JhZGllbnRHZW4uZGVmYXVsdE9wdGlvbnMnXG5cdFx0XHRnZW4ub3B0aW9ucy5jb2xvclNjaGVtZSA9IGluaXRDb2xvclNjaGVtZSgpXG5cdFx0XHRjb25zb2xlLmxvZyBnZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdFx0cmFuZG9tVmFyaWFudCA9IGFwcC5nZXRSYW5kb20oMCwgQGdyYWRpZW50VmFyaWFudHMubGVuZ3RoLTEpXG5cblx0XHRcdEBncmFkaWVudFZhcmlhbnRzWyByYW5kb21WYXJpYW50IF0oY29udGV4dClcblx0XHRcdEBvcHRpb25zLmdyYWRpZW50VmFyaWFudE51bSA9IHJhbmRvbVZhcmlhbnRcblxuXHRcdFx0QG9wdGlvbnMuZGVmYXVsdE9wdGlvbnMgPSBmYWxzZVxuXG5cdFx0ZWxzZSBpZiAhbW9kZWwuZ2V0ICdnZW5lcmF0b3JzLmdyYWRpZW50R2VuLmRlZmF1bHRPcHRpb25zJ1xuXG5cdFx0XHRAZGVmYXVsdE9wdGlvbnMgPSBmYWxzZVxuXHRcdFx0cHJlZGVmaW5lZFZhcmlhbnQgPSBtb2RlbC5nZXQgJ2dlbmVyYXRvcnMuJysgQG5hbWUrICcuZ3JhZGllbnRWYXJpYW50TnVtJ1xuXHRcdFx0QGdyYWRpZW50VmFyaWFudHNbIHByZWRlZmluZWRWYXJpYW50IF0oY29udGV4dClcblxuXHRcdG1vZGVsLnNldCAnZ2VuZXJhdG9ycy5ncmFkaWVudEdlbicsIGdlbi5vcHRpb25zLFxuXHRcdFx0c2lsZW50OiB0cnVlXG5cblxuIl19