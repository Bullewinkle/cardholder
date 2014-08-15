(function() {
  var __slice = [].slice;

  this.app.module('CardGenerator.generators.gradientGen', function(GradientGen) {
    GradientGen.options = {};
    this.gradientVariants = [
      function() {
        var args, context;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        context.fillStyle = '#fff';
        return context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      }, function() {
        var args, context, randomVal1;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (!GradientGen.options.isDefault) {
          randomVal1 = GradientGen.options.definedVal1;
        } else if (GradientGen.options.isDefault) {
          randomVal1 = app.getRandom(0, GradientGen.options.colorScheme.length - 1);
        }
        context.fillStyle = '#fff';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = '#' + GradientGen.options.colorScheme[randomVal1];
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        return GradientGen.options = {
          definedVal1: randomVal1
        };
      }, function() {
        var args, context, randomVal1;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (!GradientGen.options.isDefault) {
          randomVal1 = GradientGen.options.definedVal1;
        } else if (GradientGen.options.isDefault) {
          randomVal1 = app.getRandom(0, GradientGen.options.colorScheme.length - 1);
        }
        context.fillStyle = '#fff';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = '#' + GradientGen.options.colorScheme[randomVal1];
        context.fillRect(0, 0, context.canvas.width / 2, context.canvas.height);
        return GradientGen.options = {
          definedVal1: randomVal1
        };
      }, function() {
        var args, context, randomVal1;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (!GradientGen.options.isDefault) {
          randomVal1 = GradientGen.options.definedVal1;
        } else if (GradientGen.options.isDefault) {
          randomVal1 = app.getRandom(0, GradientGen.options.colorScheme.length - 1);
        }
        context.fillStyle = '#fff';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = '#' + GradientGen.options.colorScheme[randomVal1];
        context.fillRect(0, context.canvas.height / 2, context.canvas.width, context.canvas.height);
        return GradientGen.options = {
          definedVal1: randomVal1
        };
      }, function() {
        var args, canvas, colorScheme, context, gradient, randomVal1, randomVal2;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        canvas = context.canvas;
        if (!GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = GradientGen.options.definedVal1;
          randomVal2 = GradientGen.options.definedVal2;
        } else if (GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
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
        return GradientGen.options = {
          definedVal1: randomVal1,
          definedVal2: randomVal2
        };
      }, function() {
        var args, context, randomVal1, randomVal2;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (!GradientGen.options.isDefault) {
          randomVal1 = GradientGen.options.definedVal1;
          randomVal2 = GradientGen.options.definedVal2;
        } else if (GradientGen.options.isDefault) {
          randomVal1 = app.getRandom(0, GradientGen.options.colorScheme.length - 1);
          randomVal2 = app.getRandom(0.6, 0.9, 2);
        }
        context.fillStyle = '#fff';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = '#' + GradientGen.options.colorScheme[randomVal1];
        context.fillRect(0, context.canvas.height * randomVal2, context.canvas.width, context.canvas.height);
        return GradientGen.options = {
          definedVal1: randomVal1,
          definedVal2: randomVal2
        };
      }, function() {
        var args, canvas, colorScheme, context, gradient, randomVal1, randomVal2;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        canvas = context.canvas;
        if (!GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = GradientGen.options.definedVal1;
          randomVal2 = GradientGen.options.definedVal2;
        } else if (GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
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
        return GradientGen.options = {
          definedVal1: randomVal1,
          definedVal2: randomVal2
        };
      }, function() {
        var args, canvas, colorScheme, context, gradient, randomVal1, randomVal2;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        canvas = context.canvas;
        if (!GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = GradientGen.options.definedVal1;
          randomVal2 = GradientGen.options.definedVal2;
        } else if (GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
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
        return GradientGen.options = {
          definedVal1: randomVal1,
          definedVal2: randomVal2
        };
      }, function() {
        var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2, randomVal3, randomVal4, randomVal5;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        canvas = context.canvas;
        if (!GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = GradientGen.options.definedVal1;
          randomVal2 = GradientGen.options.definedVal2;
          randomVal3 = GradientGen.options.definedVal3;
          randomVal4 = GradientGen.options.definedVal4;
          randomVal5 = GradientGen.options.definedVal5;
          gradientType = GradientGen.options.gradientType;
        } else if (GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = app.getRandom(0, colorScheme.length - 1);
          randomVal2 = app.getRandom(0, colorScheme.length - 1);
          randomVal3 = app.getRandom(0, colorScheme.length - 1);
          randomVal4 = app.getRandom(0, colorScheme.length - 1);
          randomVal5 = app.getRandom(0, colorScheme.length - 1);
          gradientType = GradientGen.options.gradientType;
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
        return GradientGen.options = {
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
        if (!GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = GradientGen.options.definedVal1;
          randomVal2 = GradientGen.options.definedVal2;
          randomVal3 = GradientGen.options.definedVal3;
          randomVal4 = GradientGen.options.definedVal4;
          gradientType = GradientGen.options.gradientType;
        } else if (GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = app.getRandom(0, colorScheme.length - 1);
          randomVal2 = app.getRandom(0, colorScheme.length - 1);
          randomVal3 = app.getRandom(0, colorScheme.length - 1);
          randomVal4 = app.getRandom(0, colorScheme.length - 1);
          gradientType = GradientGen.options.gradientType;
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
        return GradientGen.options = {
          definedVal1: randomVal1,
          definedVal2: randomVal2,
          definedVal3: randomVal3,
          definedVal4: randomVal4
        };
      }, function() {
        var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2, randomVal3, randomVal4;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        canvas = context.canvas;
        if (!GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = GradientGen.options.definedVal1;
          randomVal2 = GradientGen.options.definedVal2;
          randomVal3 = GradientGen.options.definedVal3;
          randomVal4 = GradientGen.options.definedVal4;
          gradientType = GradientGen.options.gradientType;
        } else if (GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = app.getRandom(0, colorScheme.length - 1);
          randomVal2 = app.getRandom(0, colorScheme.length - 1);
          randomVal3 = app.getRandom(0, colorScheme.length - 1);
          randomVal4 = app.getRandom(0, colorScheme.length - 1);
          gradientType = GradientGen.options.gradientType;
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
        return GradientGen.options = {
          definedVal1: randomVal1,
          definedVal2: randomVal2,
          definedVal3: randomVal3,
          definedVal4: randomVal4
        };
      }, function() {
        var args, canvas, colorScheme, context, gradient, gradientType, randomVal1;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        canvas = context.canvas;
        if (!GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = GradientGen.options.definedVal1;
          gradientType = GradientGen.options.gradientType;
        } else if (GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = app.getRandom(0, colorScheme.length - 1);
          gradientType = GradientGen.options.gradientType;
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
        return GradientGen.options = {
          definedVal1: randomVal1
        };
      }, function() {
        var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2, randomVal3;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        canvas = context.canvas;
        if (!GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = GradientGen.options.definedVal1;
          randomVal2 = GradientGen.options.definedVal2;
          randomVal3 = GradientGen.options.definedVal3;
          gradientType = GradientGen.options.gradientType;
        } else if (GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = app.getRandom(0, colorScheme.length - 1);
          randomVal2 = app.getRandom(0, colorScheme.length - 1);
          randomVal3 = app.getRandom(40, 150);
          gradientType = GradientGen.options.gradientType;
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
        return GradientGen.options = {
          definedVal1: randomVal1,
          definedVal2: randomVal2,
          definedVal3: randomVal3
        };
      }, function() {
        var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        canvas = context.canvas;
        if (!GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = GradientGen.options.definedVal1;
          randomVal2 = GradientGen.options.definedVal2;
          gradientType = GradientGen.options.gradientType;
        } else if (GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = app.getRandom(0, colorScheme.length - 1);
          randomVal2 = app.getRandom(0, colorScheme.length - 1);
          gradientType = GradientGen.options.gradientType;
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
        return GradientGen.options = {
          definedVal1: randomVal1,
          definedVal2: randomVal2
        };
      }, function() {
        var args, canvas, colorScheme, context, gradient, randomVal1, randomVal2;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        canvas = context.canvas;
        if (!GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = GradientGen.options.definedVal1;
          randomVal2 = GradientGen.options.definedVal2;
        } else if (GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
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
        return GradientGen.options = {
          definedVal1: randomVal1,
          definedVal2: randomVal2
        };
      }, function() {
        var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        canvas = context.canvas;
        if (!GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = GradientGen.options.definedVal1;
          randomVal2 = GradientGen.options.definedVal2;
          gradientType = GradientGen.options.gradientType;
        } else if (GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = app.getRandom(0, colorScheme.length - 1);
          randomVal2 = app.getRandom(0, colorScheme.length - 1);
          gradientType = GradientGen.options.gradientType;
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
        return GradientGen.options = {
          definedVal1: randomVal1,
          definedVal2: randomVal2
        };
      }, function() {
        var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        canvas = context.canvas;
        if (!GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = GradientGen.options.definedVal1;
          randomVal2 = GradientGen.options.definedVal2;
          gradientType = GradientGen.options.gradientType;
        } else if (GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = app.getRandom(0, colorScheme.length - 1);
          randomVal2 = app.getRandom(0, colorScheme.length - 1);
          gradientType = GradientGen.options.gradientType;
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
        return GradientGen.options = {
          definedVal1: randomVal1,
          definedVal2: randomVal2
        };
      }, function() {
        var args, canvas, colorScheme, context, gradient, gradientType, randomVal1, randomVal2;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        canvas = context.canvas;
        if (!GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = GradientGen.options.definedVal1;
          randomVal2 = GradientGen.options.definedVal2;
          gradientType = GradientGen.options.gradientType;
        } else if (GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = app.getRandom(0, colorScheme.length - 1);
          randomVal2 = app.getRandom(0, colorScheme.length - 1);
          gradientType = GradientGen.options.gradientType;
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
        return GradientGen.options = {
          definedVal1: randomVal1,
          definedVal2: randomVal2
        };
      }, function() {
        var args, canvas, colorScheme, context, gradientType, randomVal1, randomVal2, star;
        context = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        canvas = context.canvas;
        if (!GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = GradientGen.options.definedVal1;
          randomVal2 = GradientGen.options.definedVal2;
          gradientType = GradientGen.options.gradientType;
        } else if (GradientGen.options.isDefault) {
          colorScheme = GradientGen.options.colorScheme;
          randomVal1 = app.getRandom(0, colorScheme.length - 1);
          randomVal2 = app.getRandom(0, colorScheme.length - 1);
          gradientType = GradientGen.options.gradientType;
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
        return GradientGen.options = {
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
        scm.from_hue(hue).scheme('tetrade').distance(0.1).add_complement(false).variation(variation).web_safe(false);
        return scm.colors();
      };
      context = canvas.getContext("2d");
      $.extend(GradientGen.options, model.get('generators.gradientGen'));
      if (model.get('generators.gradientGen.isDefault')) {
        GradientGen.options.colorScheme = initColorScheme();
        randomVariant = app.getRandom(0, this.gradientVariants.length - 1);
        this.gradientVariants[randomVariant](context);
        GradientGen.options.gradientVariantNum = randomVariant;
        GradientGen.options.isDefault = false;
      } else if (!model.get('generators.gradientGen.isDefault')) {
        this.isDefault = false;
        predefinedVariant = model.get('generators.gradientGen.gradientVariantNum');
        this.gradientVariants[predefinedVariant](context);
      }
      return model.set('generators.gradientGen', GradientGen.options, {
        silent: true
      });
    };
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRzX2dlbmVyYXRvci9nZW5lcmF0b3JzL2dyYWRpZW50LWdlbmVyYXRvci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLGtCQUFBOztBQUFBLEVBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksc0NBQVosRUFBb0QsU0FBQyxXQUFELEdBQUE7QUFHbkQsSUFBQSxXQUFXLENBQUMsT0FBWixHQUFzQixFQUF0QixDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsZ0JBQUQsR0FBb0I7TUFFbkIsU0FBQSxHQUFBO0FBRUMsWUFBQSxhQUFBO0FBQUEsUUFGQSx3QkFBUSw4REFFUixDQUFBO0FBQUEsUUFBQSxPQUFPLENBQUMsU0FBUixHQUFvQixNQUFwQixDQUFBO2VBQ0EsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFwQyxFQUEwQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQXpELEVBSEQ7TUFBQSxDQUZtQixFQVFuQixTQUFBLEdBQUE7QUFFQyxZQUFBLHlCQUFBO0FBQUEsUUFGQSx3QkFBUSw4REFFUixDQUFBO0FBQUEsUUFBQSxJQUFHLENBQUEsV0FBWSxDQUFDLE9BQU8sQ0FBQyxTQUF4QjtBQUNDLFVBQUEsVUFBQSxHQUFhLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBakMsQ0FERDtTQUFBLE1BRUssSUFBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQXZCO0FBQ0osVUFBQSxVQUFBLEdBQWEsR0FBRyxDQUFDLFNBQUosQ0FBYyxDQUFkLEVBQWdCLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQWhDLEdBQXVDLENBQXZELENBQWIsQ0FESTtTQUZMO0FBQUEsUUFLQSxPQUFPLENBQUMsU0FBUixHQUFvQixNQUxwQixDQUFBO0FBQUEsUUFNQSxPQUFPLENBQUMsUUFBUixDQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixP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Q0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRzX2dlbmVyYXRvci9nZW5lcmF0b3JzL2dyYWRpZW50LWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yLmdlbmVyYXRvcnMuZ3JhZGllbnRHZW4nLCAoR3JhZGllbnRHZW4pIC0+XG5cdCMgVE9ET1xuXHQjIFtdIHNhdmUgbmV3IHZhbHVlcyB0byBtb2RlbCBwcm9wZXJseSBhbmQgaW4gb25lIHBsYWNlICggbWF5IGJlIHJlbmRlciBieSBwcm9taXNlcyBhbmQgdGhlbiBzYXZlIHZlbHVlcyApXG5cdEdyYWRpZW50R2VuLm9wdGlvbnMgPSB7fVxuXHRAZ3JhZGllbnRWYXJpYW50cyA9IFtcblx0XHQjMFxuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjb250ZXh0LmNhbnZhcy53aWR0aCxjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cblx0XHQjMVxuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGlmICFHcmFkaWVudEdlbi5vcHRpb25zLmlzRGVmYXVsdFxuXHRcdFx0XHRyYW5kb21WYWwxID0gR3JhZGllbnRHZW4ub3B0aW9ucy5kZWZpbmVkVmFsMVxuXHRcdFx0ZWxzZSBpZiBHcmFkaWVudEdlbi5vcHRpb25zLmlzRGVmYXVsdFxuXHRcdFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSgwLEdyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjb250ZXh0LmNhbnZhcy53aWR0aCxjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjJytHcmFkaWVudEdlbi5vcHRpb25zLmNvbG9yU2NoZW1lW3JhbmRvbVZhbDFdXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjb250ZXh0LmNhbnZhcy53aWR0aCxjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cblx0XHRcdCMgc2F2ZSBvcHRpb25zIHRvIGN1cnJlbnQgbW9kZWxcblx0XHRcdEdyYWRpZW50R2VuLm9wdGlvbnMgPVxuXHRcdFx0XHRkZWZpbmVkVmFsMTogcmFuZG9tVmFsMVxuXG5cdFx0IzJcblx0XHQoY29udGV4dCxhcmdzLi4uKSAtPlxuXG5cdFx0XHRpZiAhR3JhZGllbnRHZW4ub3B0aW9ucy5pc0RlZmF1bHRcblx0XHRcdFx0cmFuZG9tVmFsMSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDFcblx0XHRcdGVsc2UgaWYgR3JhZGllbnRHZW4ub3B0aW9ucy5pc0RlZmF1bHRcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGFwcC5nZXRSYW5kb20oMCxHcmFkaWVudEdlbi5vcHRpb25zLmNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjZmZmJ1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnIycrR3JhZGllbnRHZW4ub3B0aW9ucy5jb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgvMixjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cblx0XHRcdCMgc2F2ZSBvcHRpb25zIHRvIGN1cnJlbnQgbW9kZWxcblx0XHRcdEdyYWRpZW50R2VuLm9wdGlvbnMgPVxuXHRcdFx0XHRkZWZpbmVkVmFsMTogcmFuZG9tVmFsMVxuXG5cdFx0IzNcblx0XHQoY29udGV4dCxhcmdzLi4uKSAtPlxuXG5cdFx0XHRpZiAhR3JhZGllbnRHZW4ub3B0aW9ucy5pc0RlZmF1bHRcblx0XHRcdFx0cmFuZG9tVmFsMSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDFcblx0XHRcdGVsc2UgaWYgR3JhZGllbnRHZW4ub3B0aW9ucy5pc0RlZmF1bHRcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGFwcC5nZXRSYW5kb20oMCxHcmFkaWVudEdlbi5vcHRpb25zLmNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjZmZmJ1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnIycrR3JhZGllbnRHZW4ub3B0aW9ucy5jb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLGNvbnRleHQuY2FudmFzLmhlaWdodC8yLGNvbnRleHQuY2FudmFzLndpZHRoLGNvbnRleHQuY2FudmFzLmhlaWdodClcblxuXHRcdFx0IyBzYXZlIG9wdGlvbnMgdG8gY3VycmVudCBtb2RlbFxuXHRcdFx0R3JhZGllbnRHZW4ub3B0aW9ucyA9XG5cdFx0XHRcdGRlZmluZWRWYWwxOiByYW5kb21WYWwxXG5cblx0XHQjNFxuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cdFx0XHRjYW52YXMgPSBjb250ZXh0LmNhbnZhc1xuXHRcdFx0aWYgIUdyYWRpZW50R2VuLm9wdGlvbnMuaXNEZWZhdWx0XG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gR3JhZGllbnRHZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdFx0XHRyYW5kb21WYWwxID0gR3JhZGllbnRHZW4ub3B0aW9ucy5kZWZpbmVkVmFsMVxuXHRcdFx0XHRyYW5kb21WYWwyID0gR3JhZGllbnRHZW4ub3B0aW9ucy5kZWZpbmVkVmFsMlxuXHRcdFx0ZWxzZSBpZiBHcmFkaWVudEdlbi5vcHRpb25zLmlzRGVmYXVsdFxuXHRcdFx0XHRjb2xvclNjaGVtZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblxuXHRcdFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHRyYW5kb21WYWwyID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjZmZmJ1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY2FudmFzLndpZHRoLGNhbnZhcy5oZWlnaHQpXG5cblx0XHRcdGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCBjYW52YXMuaGVpZ2h0LzIsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCoxLjUpO1xuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMDAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXSApXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AoMC4yMDAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDFdIClcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjgwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMl0gKVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wKDEuMDAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwyXSApXG5cblx0XHRcdGNvbnRleHQuYmVnaW5QYXRoKClcblx0XHRcdGNvbnRleHQubW92ZVRvKGNhbnZhcy53aWR0aCo3NS8xMDAsMClcblx0XHRcdGNvbnRleHQubGluZVRvKGNhbnZhcy53aWR0aCwwKVxuXHRcdFx0Y29udGV4dC5saW5lVG8oY2FudmFzLndpZHRoLGNhbnZhcy5oZWlnaHQpXG5cdFx0XHRjb250ZXh0LmxpbmVUbyhjYW52YXMud2lkdGgvMixjYW52YXMuaGVpZ2h0KVxuXHRcdFx0Y29udGV4dC5saW5lVG8oY2FudmFzLndpZHRoKjc1LzEwMCwwKVxuXHRcdFx0Y29udGV4dC5jbG9zZVBhdGgoKVxuXHRcdFx0Y29udGV4dC5saW5lV2lkdGggPSAwLjVcblx0XHRcdGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBncmFkaWVudFxuXHRcdFx0Y29udGV4dC5zdHJva2UoKVxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudFxuXHRcdFx0Y29udGV4dC5maWxsKClcblxuXHRcdFx0IyBzYXZlIG9wdGlvbnMgdG8gY3VycmVudCBtb2RlbFxuXHRcdFx0R3JhZGllbnRHZW4ub3B0aW9ucyA9XG5cdFx0XHRcdGRlZmluZWRWYWwxOiByYW5kb21WYWwxXG5cdFx0XHRcdGRlZmluZWRWYWwyOiByYW5kb21WYWwyXG5cdFx0XHRcdCMgY29sb3JTY2hlbWU6IGNvbG9yU2NoZW1lXG5cblx0XHQjNVxuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGlmICFHcmFkaWVudEdlbi5vcHRpb25zLmlzRGVmYXVsdFxuXHRcdFx0XHRyYW5kb21WYWwxID0gR3JhZGllbnRHZW4ub3B0aW9ucy5kZWZpbmVkVmFsMVxuXHRcdFx0XHRyYW5kb21WYWwyID0gR3JhZGllbnRHZW4ub3B0aW9ucy5kZWZpbmVkVmFsMlxuXHRcdFx0ZWxzZSBpZiBHcmFkaWVudEdlbi5vcHRpb25zLmlzRGVmYXVsdFxuXHRcdFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSgwLEdyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cdFx0XHRcdHJhbmRvbVZhbDIgPSBhcHAuZ2V0UmFuZG9tKDAuNiwwLjksMilcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZidcblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoMCwwLGNvbnRleHQuY2FudmFzLndpZHRoLGNvbnRleHQuY2FudmFzLmhlaWdodClcblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyMnK0dyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWVbcmFuZG9tVmFsMV1cblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoMCxjb250ZXh0LmNhbnZhcy5oZWlnaHQqcmFuZG9tVmFsMiAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXG5cdFx0XHQjIHNhdmUgb3B0aW9ucyB0byBjdXJyZW50IG1vZGVsXG5cdFx0XHRHcmFkaWVudEdlbi5vcHRpb25zID1cblx0XHRcdFx0ZGVmaW5lZFZhbDE6IHJhbmRvbVZhbDFcblxuXG5cdFx0XHRcdGRlZmluZWRWYWwyOiByYW5kb21WYWwyXG5cblx0XHQjNlxuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGNhbnZhcyA9IGNvbnRleHQuY2FudmFzXG5cblx0XHRcdGlmICFHcmFkaWVudEdlbi5vcHRpb25zLmlzRGVmYXVsdFxuXHRcdFx0XHRjb2xvclNjaGVtZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDFcblx0XHRcdFx0cmFuZG9tVmFsMiA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDJcblx0XHRcdGVsc2UgaWYgR3JhZGllbnRHZW4ub3B0aW9ucy5pc0RlZmF1bHRcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cdFx0XHRcdHJhbmRvbVZhbDIgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjYW52YXMud2lkdGgsY2FudmFzLmhlaWdodClcblx0XHRcdGNvbnRleHQucmVjdCggY2FudmFzLndpZHRoKjEwLzEwMCwgMCwgY2FudmFzLndpZHRoKjQwLzEwMCwgY2FudmFzLmhlaWdodClcblx0XHRcdGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCggMCwgY2FudmFzLmhlaWdodC8yLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQvMik7XG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AoMC4wMDAsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDFdIClcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMl0gKVxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudFxuXHRcdFx0Y29udGV4dC5maWxsKClcblxuXHRcdFx0IyBzYXZlIG9wdGlvbnMgdG8gY3VycmVudCBtb2RlbFxuXHRcdFx0R3JhZGllbnRHZW4ub3B0aW9ucyA9XG5cdFx0XHRcdGRlZmluZWRWYWwxOiByYW5kb21WYWwxXG5cdFx0XHRcdGRlZmluZWRWYWwyOiByYW5kb21WYWwyXG5cdFx0XHRcdCMgY29sb3JTY2hlbWU6IGNvbG9yU2NoZW1lXG5cblx0XHQjN1xuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGNhbnZhcyA9IGNvbnRleHQuY2FudmFzXG5cblx0XHRcdGlmICFHcmFkaWVudEdlbi5vcHRpb25zLmlzRGVmYXVsdFxuXHRcdFx0XHRjb2xvclNjaGVtZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDFcblx0XHRcdFx0cmFuZG9tVmFsMiA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDJcblx0XHRcdGVsc2UgaWYgR3JhZGllbnRHZW4ub3B0aW9ucy5pc0RlZmF1bHRcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cblx0XHRcdFx0cmFuZG9tVmFsMSA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblx0XHRcdFx0cmFuZG9tVmFsMiA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZidcblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoMCwwLGNhbnZhcy53aWR0aCxjYW52YXMuaGVpZ2h0KVxuXHRcdFx0Z3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIGNhbnZhcy5oZWlnaHQvMiwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KjAuMjUpO1xuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMDAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXSApXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AoMC40OTUsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDFdIClcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMl0gKVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNTAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwyXSApXG5cblx0XHRcdGNvbnRleHQuYmVnaW5QYXRoKClcblx0XHRcdGNvbnRleHQubW92ZVRvKDAsMClcblx0XHRcdGNvbnRleHQubGluZVRvKGNhbnZhcy53aWR0aCoyMC8xMDAsMClcblx0XHRcdGNvbnRleHQubGluZVRvKGNhbnZhcy53aWR0aCozNy8xMDAsY2FudmFzLmhlaWdodClcblx0XHRcdGNvbnRleHQubGluZVRvKDAsY2FudmFzLmhlaWdodClcblx0XHRcdGNvbnRleHQubGluZVRvKDAsMClcblx0XHRcdGNvbnRleHQuY2xvc2VQYXRoKClcblx0XHRcdGNvbnRleHQubGluZVdpZHRoID0gMC41XG5cdFx0XHRjb250ZXh0LnN0cm9rZVN0eWxlID0gZ3JhZGllbnRcblx0XHRcdGNvbnRleHQuc3Ryb2tlKClcblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gZ3JhZGllbnRcblx0XHRcdGNvbnRleHQuZmlsbCgpXG5cblx0XHRcdCMgc2F2ZSBvcHRpb25zIHRvIGN1cnJlbnQgbW9kZWxcblx0XHRcdEdyYWRpZW50R2VuLm9wdGlvbnMgPVxuXHRcdFx0XHRkZWZpbmVkVmFsMTogcmFuZG9tVmFsMVxuXHRcdFx0XHRkZWZpbmVkVmFsMjogcmFuZG9tVmFsMlxuXHRcdFx0XHQjIGNvbG9yU2NoZW1lOiBjb2xvclNjaGVtZVxuXG5cdFx0Izhcblx0XHQoY29udGV4dCxhcmdzLi4uKSAtPlxuXG5cdFx0XHRjYW52YXMgPSBjb250ZXh0LmNhbnZhc1xuXG5cdFx0XHRpZiAhR3JhZGllbnRHZW4ub3B0aW9ucy5pc0RlZmF1bHRcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBHcmFkaWVudEdlbi5vcHRpb25zLmRlZmluZWRWYWwxXG5cdFx0XHRcdHJhbmRvbVZhbDIgPSBHcmFkaWVudEdlbi5vcHRpb25zLmRlZmluZWRWYWwyXG5cdFx0XHRcdHJhbmRvbVZhbDMgPSBHcmFkaWVudEdlbi5vcHRpb25zLmRlZmluZWRWYWwzXG5cdFx0XHRcdHJhbmRvbVZhbDQgPSBHcmFkaWVudEdlbi5vcHRpb25zLmRlZmluZWRWYWw0XG5cdFx0XHRcdHJhbmRvbVZhbDUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmRlZmluZWRWYWw1XG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHRcdGVsc2UgaWYgR3JhZGllbnRHZW4ub3B0aW9ucy5pc0RlZmF1bHRcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cdFx0XHRcdHJhbmRvbVZhbDIgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cdFx0XHRcdHJhbmRvbVZhbDMgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cdFx0XHRcdHJhbmRvbVZhbDQgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cdFx0XHRcdHJhbmRvbVZhbDUgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cdFx0XHRcdCMgVE9ETyBnZW5lcmF0ZSByYW5kb20gZ3JhZGllbnRUeXBlIVxuXHRcdFx0XHRncmFkaWVudFR5cGUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjZmZmJ1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXHRcdFx0XG5cdFx0XHRncmFkaWVudCA9IGNvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQoY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0LCAwLjAwMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0LCA4MC4wMDApXG5cblx0XHRcdCMgQWRkIGNvbG9yc1xuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuMDAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuMjAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuMjE1LCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwyXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNDAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwyXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNDE1LCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwzXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNjAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwzXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNjE1LCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWw0XVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuODAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWw0XVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuODE1LCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWw1XVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuOTYwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWw1XVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDEuMDAwLCBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMS4wMDApXCJcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudFxuXHRcdFx0Y29udGV4dC5maWxsUmVjdCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHRcblxuXHRcdFx0IyBzYXZlIG9wdGlvbnMgdG8gY3VycmVudCBtb2RlbFxuXHRcdFx0R3JhZGllbnRHZW4ub3B0aW9ucyA9XG5cdFx0XHRcdGRlZmluZWRWYWwxOiByYW5kb21WYWwxXG5cdFx0XHRcdGRlZmluZWRWYWwyOiByYW5kb21WYWwyXG5cdFx0XHRcdGRlZmluZWRWYWwzOiByYW5kb21WYWwzXG5cdFx0XHRcdGRlZmluZWRWYWw0OiByYW5kb21WYWw0XG5cdFx0XHRcdGRlZmluZWRWYWw1OiByYW5kb21WYWw1XG5cblx0XHQjOVxuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGNhbnZhcyA9IGNvbnRleHQuY2FudmFzXG5cblx0XHRcdGlmICFHcmFkaWVudEdlbi5vcHRpb25zLmlzRGVmYXVsdFxuXHRcdFx0XHRjb2xvclNjaGVtZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDFcblx0XHRcdFx0cmFuZG9tVmFsMiA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDJcblx0XHRcdFx0cmFuZG9tVmFsMyA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDNcblx0XHRcdFx0cmFuZG9tVmFsNCA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDRcblxuXHRcdFx0XHRncmFkaWVudFR5cGUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0XHRlbHNlIGlmIEdyYWRpZW50R2VuLm9wdGlvbnMuaXNEZWZhdWx0XG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gR3JhZGllbnRHZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHRyYW5kb21WYWwyID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHRyYW5kb21WYWwzID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHRyYW5kb21WYWw0ID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXG5cdFx0XHRcdCMgVE9ETyBnZW5lcmF0ZSByYW5kb20gZ3JhZGllbnRUeXBlIVxuXHRcdFx0XHRncmFkaWVudFR5cGUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjZmZmJ1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXHRcdFx0XG5cdFx0XHRncmFkaWVudCA9IGNvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQoY2FudmFzLndpZHRoKzUsIGNhbnZhcy5oZWlnaHQvMiwgMC4wMDAsIGNhbnZhcy53aWR0aCs1LCBjYW52YXMuaGVpZ2h0LzIsIDEyMC4wMDApXG5cblx0XHRcdCMgQWRkIGNvbG9yc1xuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuMDAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuMDczLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuMDgwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwyXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuMjM1LCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwyXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuMjUwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwzXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNDg1LCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwzXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNTAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWw0XVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNzM1LCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWw0XVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNzUwLCBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMS4wMDApXCJcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAxLjAwMCwgXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDEuMDAwKVwiXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gZ3JhZGllbnRcblx0XHRcdGNvbnRleHQuZmlsbFJlY3QgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0XG5cblx0XHRcdCMgc2F2ZSBvcHRpb25zIHRvIGN1cnJlbnQgbW9kZWxcblx0XHRcdEdyYWRpZW50R2VuLm9wdGlvbnMgPVxuXHRcdFx0XHRkZWZpbmVkVmFsMTogcmFuZG9tVmFsMVxuXHRcdFx0XHRkZWZpbmVkVmFsMjogcmFuZG9tVmFsMlxuXHRcdFx0XHRkZWZpbmVkVmFsMzogcmFuZG9tVmFsM1xuXHRcdFx0XHRkZWZpbmVkVmFsNDogcmFuZG9tVmFsNFxuXG5cdFx0IzEwXG5cdFx0KGNvbnRleHQsYXJncy4uLikgLT5cblxuXHRcdFx0Y2FudmFzID0gY29udGV4dC5jYW52YXNcblxuXHRcdFx0aWYgIUdyYWRpZW50R2VuLm9wdGlvbnMuaXNEZWZhdWx0XG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gR3JhZGllbnRHZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdFx0XHRyYW5kb21WYWwxID0gR3JhZGllbnRHZW4ub3B0aW9ucy5kZWZpbmVkVmFsMVxuXHRcdFx0XHRyYW5kb21WYWwyID0gR3JhZGllbnRHZW4ub3B0aW9ucy5kZWZpbmVkVmFsMlxuXHRcdFx0XHRyYW5kb21WYWwzID0gR3JhZGllbnRHZW4ub3B0aW9ucy5kZWZpbmVkVmFsM1xuXHRcdFx0XHRyYW5kb21WYWw0ID0gR3JhZGllbnRHZW4ub3B0aW9ucy5kZWZpbmVkVmFsNFxuXG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHRcdGVsc2UgaWYgR3JhZGllbnRHZW4ub3B0aW9ucy5pc0RlZmF1bHRcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cdFx0XHRcdHJhbmRvbVZhbDIgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cdFx0XHRcdHJhbmRvbVZhbDMgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cdFx0XHRcdHJhbmRvbVZhbDQgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cblx0XHRcdFx0IyBUT0RPIGdlbmVyYXRlIHJhbmRvbSBncmFkaWVudFR5cGUhXG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjb250ZXh0LmNhbnZhcy53aWR0aCxjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cdFx0XHRcblx0XHRcdGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudChjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC04LCAwLjAwMCwgY2FudmFzLndpZHRoLzIsIGNhbnZhcy5oZWlnaHQrMjAwLCAyNzAuMDAwKVxuXG5cdFx0XHQjIEFkZCBjb2xvcnNcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMV1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjA3MywgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMV1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjA4NSwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMl1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjIzNSwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMl1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjI1MCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsM11cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjQ4MCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsM11cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjUwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsNF1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjczNSwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsNF1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjc1MCwgXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDEuMDAwKVwiXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMS4wMDAsIFwicmdiYSgyNTUsIDI1NSwgMjU1LCAxLjAwMClcIlxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50XG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0IDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodFxuXG5cdFx0XHQjIHNhdmUgb3B0aW9ucyB0byBjdXJyZW50IG1vZGVsXG5cdFx0XHRHcmFkaWVudEdlbi5vcHRpb25zID1cblx0XHRcdFx0ZGVmaW5lZFZhbDE6IHJhbmRvbVZhbDFcblx0XHRcdFx0ZGVmaW5lZFZhbDI6IHJhbmRvbVZhbDJcblx0XHRcdFx0ZGVmaW5lZFZhbDM6IHJhbmRvbVZhbDNcblx0XHRcdFx0ZGVmaW5lZFZhbDQ6IHJhbmRvbVZhbDRcblxuXHRcdCMxMVxuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGNhbnZhcyA9IGNvbnRleHQuY2FudmFzXG5cblx0XHRcdGlmICFHcmFkaWVudEdlbi5vcHRpb25zLmlzRGVmYXVsdFxuXHRcdFx0XHRjb2xvclNjaGVtZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDFcblxuXHRcdFx0XHRncmFkaWVudFR5cGUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0XHRlbHNlIGlmIEdyYWRpZW50R2VuLm9wdGlvbnMuaXNEZWZhdWx0XG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gR3JhZGllbnRHZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjb250ZXh0LmNhbnZhcy53aWR0aCxjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cdFx0XHRcblx0XHRcdGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudChjYW52YXMud2lkdGgvMiwgMCAsIDAuMDAwLCBjYW52YXMud2lkdGgvMiwgMC0zMTAsIDQwMC4wMDApXG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AgMC4wMDAsICcjZmZmJ1xuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNzMwLCAnI2ZmZidcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjc1MCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMV1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAxLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMV1cblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudFxuXHRcdFx0Y29udGV4dC5maWxsUmVjdCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHRcblxuXHRcdFx0IyBzYXZlIG9wdGlvbnMgdG8gY3VycmVudCBtb2RlbFxuXHRcdFx0R3JhZGllbnRHZW4ub3B0aW9ucyA9XG5cdFx0XHRcdGRlZmluZWRWYWwxOiByYW5kb21WYWwxXG5cblx0XHQjMTJcblx0XHQoY29udGV4dCxhcmdzLi4uKSAtPlxuXG5cdFx0XHRjYW52YXMgPSBjb250ZXh0LmNhbnZhc1xuXG5cdFx0XHRpZiAhR3JhZGllbnRHZW4ub3B0aW9ucy5pc0RlZmF1bHRcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBHcmFkaWVudEdlbi5vcHRpb25zLmRlZmluZWRWYWwxXG5cdFx0XHRcdHJhbmRvbVZhbDIgPSBHcmFkaWVudEdlbi5vcHRpb25zLmRlZmluZWRWYWwyXG5cdFx0XHRcdHJhbmRvbVZhbDMgPSBHcmFkaWVudEdlbi5vcHRpb25zLmRlZmluZWRWYWwzXG5cblx0XHRcdFx0Z3JhZGllbnRUeXBlID0gR3JhZGllbnRHZW4ub3B0aW9ucy5ncmFkaWVudFR5cGVcblxuXHRcdFx0ZWxzZSBpZiBHcmFkaWVudEdlbi5vcHRpb25zLmlzRGVmYXVsdFxuXHRcdFx0XHRjb2xvclNjaGVtZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblx0XHRcdFx0cmFuZG9tVmFsMiA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblx0XHRcdFx0cmFuZG9tVmFsMyA9IGFwcC5nZXRSYW5kb20oNDAsMTUwKVxuXG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjb250ZXh0LmNhbnZhcy53aWR0aCxjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cdFx0XHRcblx0XHRcdGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudChjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC8yICwgMC4wMDAsIGNhbnZhcy53aWR0aC8yLCBjYW52YXMuaGVpZ2h0LzIsIHJhbmRvbVZhbDMpXG5cblx0XHRcdCMgQWRkIGNvbG9yc1xuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuMDAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNzM1LCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwxXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDAuNzUwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwyXVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wIDEuMDAwLCAnIycgKyBjb2xvclNjaGVtZVtyYW5kb21WYWwyXVxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50XG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0IDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodFxuXG5cdFx0XHQjIHNhdmUgb3B0aW9ucyB0byBjdXJyZW50IG1vZGVsXG5cdFx0XHRHcmFkaWVudEdlbi5vcHRpb25zID1cblx0XHRcdFx0ZGVmaW5lZFZhbDE6IHJhbmRvbVZhbDFcblx0XHRcdFx0ZGVmaW5lZFZhbDI6IHJhbmRvbVZhbDJcblx0XHRcdFx0ZGVmaW5lZFZhbDM6IHJhbmRvbVZhbDNcblxuXHRcdCMxM1xuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGNhbnZhcyA9IGNvbnRleHQuY2FudmFzXG5cblx0XHRcdGlmICFHcmFkaWVudEdlbi5vcHRpb25zLmlzRGVmYXVsdFxuXHRcdFx0XHRjb2xvclNjaGVtZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDFcblx0XHRcdFx0cmFuZG9tVmFsMiA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDJcblxuXHRcdFx0XHRncmFkaWVudFR5cGUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0XHRlbHNlIGlmIEdyYWRpZW50R2VuLm9wdGlvbnMuaXNEZWZhdWx0XG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gR3JhZGllbnRHZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHRyYW5kb21WYWwyID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjb250ZXh0LmNhbnZhcy53aWR0aCxjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cdFx0XHRcblx0XHRcdGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCBjYW52YXMuaGVpZ2h0LzIsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodC8yKzQyKVxuXG5cdFx0XHQjIEFkZCBjb2xvcnNcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMV1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjU1MCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMV1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjc1MCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMl1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAxLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMl1cblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudFxuXHRcdFx0Y29udGV4dC5saW5lV2lkdGggPSAwLjVcblx0XHRcdGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBncmFkaWVudFxuXG5cdFx0XHRjb250ZXh0LmJlZ2luUGF0aCgpXG5cdFx0XHRjb250ZXh0Lm1vdmVUbyBjYW52YXMud2lkdGgqNjcvMTAwLDBcblx0XHRcdGNvbnRleHQubGluZVRvIGNhbnZhcy53aWR0aCo3MS8xMDAsMFxuXHRcdFx0Y29udGV4dC5saW5lVG8gY2FudmFzLndpZHRoKjYxLzEwMCxjYW52YXMuaGVpZ2h0XG5cdFx0XHRjb250ZXh0LmxpbmVUbyBjYW52YXMud2lkdGgqNTcvMTAwLGNhbnZhcy5oZWlnaHRcblx0XHRcdGNvbnRleHQubGluZVRvIGNhbnZhcy53aWR0aCo2Ny8xMDAsMFxuXG5cdFx0XHRjb250ZXh0Lm1vdmVUbyBjYW52YXMud2lkdGgqNzQvMTAwLDBcblx0XHRcdGNvbnRleHQubGluZVRvIGNhbnZhcy53aWR0aCo4MS8xMDAsMFxuXHRcdFx0Y29udGV4dC5saW5lVG8gY2FudmFzLndpZHRoKjcxLzEwMCxjYW52YXMuaGVpZ2h0XG5cdFx0XHRjb250ZXh0LmxpbmVUbyBjYW52YXMud2lkdGgqNjQvMTAwLGNhbnZhcy5oZWlnaHRcblxuXHRcdFx0Y29udGV4dC5jbG9zZVBhdGgoKVxuXHRcdFx0Y29udGV4dC5zdHJva2UoKVxuXHRcdFx0Y29udGV4dC5maWxsKClcblxuXHRcdFx0IyBGaWxsIHdpdGggZ3JhZGllbnRcblx0XHRcdCMgY29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudFxuXHRcdFx0IyBjb250ZXh0LmZpbGxSZWN0IDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodFxuXG5cdFx0XHQjIHNhdmUgb3B0aW9ucyB0byBjdXJyZW50IG1vZGVsXG5cdFx0XHRHcmFkaWVudEdlbi5vcHRpb25zID1cblx0XHRcdFx0ZGVmaW5lZFZhbDE6IHJhbmRvbVZhbDFcblx0XHRcdFx0ZGVmaW5lZFZhbDI6IHJhbmRvbVZhbDJcblxuXHRcdCMxNFxuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGNhbnZhcyA9IGNvbnRleHQuY2FudmFzXG5cblx0XHRcdGlmICFHcmFkaWVudEdlbi5vcHRpb25zLmlzRGVmYXVsdFxuXHRcdFx0XHRjb2xvclNjaGVtZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDFcblx0XHRcdFx0cmFuZG9tVmFsMiA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDJcblx0XHRcdGVsc2UgaWYgR3JhZGllbnRHZW4ub3B0aW9ucy5pc0RlZmF1bHRcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cdFx0XHRcdHJhbmRvbVZhbDIgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjYW52YXMud2lkdGgsY2FudmFzLmhlaWdodClcblx0XHRcdGNvbnRleHQucmVjdCggMCxjYW52YXMuaGVpZ2h0KjUwLzEwMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KjQwLzEwMClcblx0XHRcdGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCggY2FudmFzLndpZHRoLzIsIDAgLCBjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodCk7XG5cdFx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMV0gKVxuXHRcdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsICcjJyArIGNvbG9yU2NoZW1lW3JhbmRvbVZhbDJdIClcblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gZ3JhZGllbnRcblx0XHRcdGNvbnRleHQuZmlsbCgpXG5cblx0XHRcdCMgc2F2ZSBvcHRpb25zIHRvIGN1cnJlbnQgbW9kZWxcblx0XHRcdEdyYWRpZW50R2VuLm9wdGlvbnMgPVxuXHRcdFx0XHRkZWZpbmVkVmFsMTogcmFuZG9tVmFsMVxuXHRcdFx0XHRkZWZpbmVkVmFsMjogcmFuZG9tVmFsMlxuXHRcdFx0XHQjIGNvbG9yU2NoZW1lOiBjb2xvclNjaGVtZVxuXG5cdFx0IzE1XG5cdFx0KGNvbnRleHQsYXJncy4uLikgLT5cblxuXHRcdFx0Y2FudmFzID0gY29udGV4dC5jYW52YXNcblxuXHRcdFx0aWYgIUdyYWRpZW50R2VuLm9wdGlvbnMuaXNEZWZhdWx0XG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gR3JhZGllbnRHZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdFx0XHRyYW5kb21WYWwxID0gR3JhZGllbnRHZW4ub3B0aW9ucy5kZWZpbmVkVmFsMVxuXHRcdFx0XHRyYW5kb21WYWwyID0gR3JhZGllbnRHZW4ub3B0aW9ucy5kZWZpbmVkVmFsMlxuXG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHRcdGVsc2UgaWYgR3JhZGllbnRHZW4ub3B0aW9ucy5pc0RlZmF1bHRcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cdFx0XHRcdHJhbmRvbVZhbDIgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cblx0XHRcdFx0Z3JhZGllbnRUeXBlID0gR3JhZGllbnRHZW4ub3B0aW9ucy5ncmFkaWVudFR5cGVcblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZidcblx0XHRcdGNvbnRleHQuZmlsbFJlY3QoMCwwLGNvbnRleHQuY2FudmFzLndpZHRoLGNvbnRleHQuY2FudmFzLmhlaWdodClcblx0XHRcdFxuXHRcdFx0Z3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIGNhbnZhcy5oZWlnaHQvMiwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0LzIrNDIpXG5cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMV1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjUwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMl1cblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudFxuXHRcdFx0Y29udGV4dC5saW5lV2lkdGggPSAwLjVcblx0XHRcdGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBncmFkaWVudFxuXG5cdFx0XHRjb250ZXh0LmJlZ2luUGF0aCgpXG5cdFx0XHRjb250ZXh0Lm1vdmVUbyAwLDBcblx0XHRcdGNvbnRleHQubGluZVRvIGNhbnZhcy53aWR0aCoyMC8xMDAsMFxuXHRcdFx0Y29udGV4dC5saW5lVG8gY2FudmFzLndpZHRoKjMwLzEwMCxjYW52YXMuaGVpZ2h0LzIuNVxuXHRcdFx0Y29udGV4dC5saW5lVG8gY2FudmFzLndpZHRoKjIwLzEwMCxjYW52YXMuaGVpZ2h0XG5cdFx0XHRjb250ZXh0LmxpbmVUbyAwLGNhbnZhcy5oZWlnaHRcblx0XHRcdGNvbnRleHQubGluZVRvIDAsMFxuXG5cdFx0XHRjb250ZXh0LmNsb3NlUGF0aCgpXG5cdFx0XHRjb250ZXh0LnN0cm9rZSgpXG5cdFx0XHRjb250ZXh0LmZpbGwoKVxuXG5cdFx0XHRHcmFkaWVudEdlbi5vcHRpb25zID1cblx0XHRcdFx0ZGVmaW5lZFZhbDE6IHJhbmRvbVZhbDFcblx0XHRcdFx0ZGVmaW5lZFZhbDI6IHJhbmRvbVZhbDJcblxuXHRcdCMxNlxuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGNhbnZhcyA9IGNvbnRleHQuY2FudmFzXG5cblx0XHRcdGlmICFHcmFkaWVudEdlbi5vcHRpb25zLmlzRGVmYXVsdFxuXHRcdFx0XHRjb2xvclNjaGVtZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDFcblx0XHRcdFx0cmFuZG9tVmFsMiA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDJcblxuXHRcdFx0XHRncmFkaWVudFR5cGUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0XHRlbHNlIGlmIEdyYWRpZW50R2VuLm9wdGlvbnMuaXNEZWZhdWx0XG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gR3JhZGllbnRHZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHRyYW5kb21WYWwyID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjb250ZXh0LmNhbnZhcy53aWR0aCxjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cdFx0XHRcblx0XHRcdGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCBjYW52YXMuaGVpZ2h0LzIsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodC8yKzQyKVxuXG5cdFx0XHQjIEFkZCBjb2xvcnNcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjUwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMV1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAxLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMl1cblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudFxuXHRcdFx0Y29udGV4dC5saW5lV2lkdGggPSAwLjVcblx0XHRcdGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBncmFkaWVudFxuXG5cdFx0XHRjb250ZXh0LmJlZ2luUGF0aCgpXG5cdFx0XHRjb250ZXh0Lm1vdmVUbyBjYW52YXMud2lkdGgqNzAvMTAwLDBcblx0XHRcdGNvbnRleHQubGluZVRvIGNhbnZhcy53aWR0aCwwXG5cdFx0XHRjb250ZXh0LmxpbmVUbyBjYW52YXMud2lkdGgsY2FudmFzLmhlaWdodFxuXHRcdFx0Y29udGV4dC5saW5lVG8gY2FudmFzLndpZHRoKjcwLzEwMCxjYW52YXMuaGVpZ2h0XG5cdFx0XHRjb250ZXh0LmxpbmVUbyBjYW52YXMud2lkdGgqODAvMTAwLGNhbnZhcy5oZWlnaHQvMi41XG5cdFx0XHRjb250ZXh0LmxpbmVUbyBjYW52YXMud2lkdGgqNzAvMTAwLDBcblxuXHRcdFx0Y29udGV4dC5jbG9zZVBhdGgoKVxuXHRcdFx0Y29udGV4dC5zdHJva2UoKVxuXHRcdFx0Y29udGV4dC5maWxsKClcblxuXHRcdFx0R3JhZGllbnRHZW4ub3B0aW9ucyA9XG5cdFx0XHRcdGRlZmluZWRWYWwxOiByYW5kb21WYWwxXG5cdFx0XHRcdGRlZmluZWRWYWwyOiByYW5kb21WYWwyXG5cblx0XHQjMThcblx0XHQoY29udGV4dCxhcmdzLi4uKSAtPlxuXG5cdFx0XHRjYW52YXMgPSBjb250ZXh0LmNhbnZhc1xuXG5cdFx0XHRpZiAhR3JhZGllbnRHZW4ub3B0aW9ucy5pc0RlZmF1bHRcblx0XHRcdFx0Y29sb3JTY2hlbWUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmNvbG9yU2NoZW1lXG5cdFx0XHRcdHJhbmRvbVZhbDEgPSBHcmFkaWVudEdlbi5vcHRpb25zLmRlZmluZWRWYWwxXG5cdFx0XHRcdHJhbmRvbVZhbDIgPSBHcmFkaWVudEdlbi5vcHRpb25zLmRlZmluZWRWYWwyXG5cblx0XHRcdFx0Z3JhZGllbnRUeXBlID0gR3JhZGllbnRHZW4ub3B0aW9ucy5ncmFkaWVudFR5cGVcblxuXHRcdFx0ZWxzZSBpZiBHcmFkaWVudEdlbi5vcHRpb25zLmlzRGVmYXVsdFxuXHRcdFx0XHRjb2xvclNjaGVtZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblx0XHRcdFx0cmFuZG9tVmFsMiA9IGFwcC5nZXRSYW5kb20oMCxjb2xvclNjaGVtZS5sZW5ndGgtMSlcblxuXHRcdFx0XHRncmFkaWVudFR5cGUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICcjZmZmJ1xuXHRcdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXHRcdFx0XG5cdFx0XHRncmFkaWVudCA9IGNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgY2FudmFzLmhlaWdodC8yLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQvMis0Milcblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAwLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMV1cblx0XHRcdGdyYWRpZW50LmFkZENvbG9yU3RvcCAxLjAwMCwgJyMnICsgY29sb3JTY2hlbWVbcmFuZG9tVmFsMl1cblxuXHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudFxuXHRcdFx0Y29udGV4dC5saW5lV2lkdGggPSAwLjVcblx0XHRcdGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBncmFkaWVudFxuXG5cdFx0XHRjb250ZXh0LnJlY3QoY2FudmFzLndpZHRoKjMwLzEwMCxjYW52YXMuaGVpZ2h0KjIyLzEwMCxjYW52YXMud2lkdGgqNjUvMTAwLGNhbnZhcy5oZWlnaHQqNzAvMTAwKVxuXG5cdFx0XHRjb250ZXh0LmNsb3NlUGF0aCgpXG5cdFx0XHRjb250ZXh0LnN0cm9rZSgpXG5cdFx0XHRjb250ZXh0LmZpbGwoKVxuXG5cdFx0XHRHcmFkaWVudEdlbi5vcHRpb25zID1cblx0XHRcdFx0ZGVmaW5lZFZhbDE6IHJhbmRvbVZhbDFcblx0XHRcdFx0ZGVmaW5lZFZhbDI6IHJhbmRvbVZhbDJcblxuXHRcdCMxOSBTdGFyc1xuXHRcdChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cblx0XHRcdGNhbnZhcyA9IGNvbnRleHQuY2FudmFzXG5cblx0XHRcdGlmICFHcmFkaWVudEdlbi5vcHRpb25zLmlzRGVmYXVsdFxuXHRcdFx0XHRjb2xvclNjaGVtZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHRcdFx0cmFuZG9tVmFsMSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDFcblx0XHRcdFx0cmFuZG9tVmFsMiA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDJcblxuXHRcdFx0XHRncmFkaWVudFR5cGUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0XHRlbHNlIGlmIEdyYWRpZW50R2VuLm9wdGlvbnMuaXNEZWZhdWx0XG5cdFx0XHRcdGNvbG9yU2NoZW1lID0gR3JhZGllbnRHZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdFx0XHRyYW5kb21WYWwyID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXG5cdFx0XHRcdGdyYWRpZW50VHlwZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmZmYnXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KDAsMCxjb250ZXh0LmNhbnZhcy53aWR0aCxjb250ZXh0LmNhbnZhcy5oZWlnaHQpXG5cdFx0XHRcblx0XHRcdCMgICAgZHJhd1N0YXIoY3R4LCBjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC8yLCAxMDAwLDMwLCAzMDApO1xuXHRcdFx0c3RhciA9IChjb250ZXh0LCB4Q2VudGVyLCB5Q2VudGVyLCBuUG9pbnRzLCBvdXRlclJhZGl1cywgaW5uZXJSYWRpdXMpIC0+XG5cdFx0XHRcdGNvbnRleHQuYmVnaW5QYXRoKClcblx0XHRcdFx0aXhWZXJ0ZXggPSAwXG5cblx0XHRcdFx0d2hpbGUgaXhWZXJ0ZXggPD0gMiAqIG5Qb2ludHNcblx0XHRcdFx0XHRhbmdsZSA9IGl4VmVydGV4ICogTWF0aC5QSSAvIG5Qb2ludHMgLSBNYXRoLlBJIC8gMlxuXHRcdFx0XHRcdHJhZGl1cyA9IChpZiBpeFZlcnRleCAlIDIgaXMgMCB0aGVuIGlubmVyUmFkaXVzIGVsc2Ugb3V0ZXJSYWRpdXMpXG5cdFx0XHRcdFx0Y29udGV4dC5saW5lVG8geENlbnRlciArIHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlKSwgeUNlbnRlciArIHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlKVxuXHRcdFx0XHRcdCsraXhWZXJ0ZXhcblx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdGNvbnRleHQuYmVnaW5QYXRoKClcblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gXCIjQzQwMDQzXCJcblx0XHRcdGNvbnRleHQuYXJjIGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCBjYW52YXMud2lkdGgvNCwgMCwgTWF0aC5QSSAqIDJcblx0XHRcdGNvbnRleHQuZmlsbCgpXG5cdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IFwiZ3JlZW5cIlxuXHRcdFx0c3RhciBjb250ZXh0LCBjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMiwgOSwgY2FudmFzLndpZHRoLzMsIDEwXG5cdFx0XHRjb250ZXh0LmZpbGwoKVxuXG5cdFx0XHRHcmFkaWVudEdlbi5vcHRpb25zID1cblx0XHRcdFx0ZGVmaW5lZFZhbDE6IHJhbmRvbVZhbDFcblx0XHRcdFx0ZGVmaW5lZFZhbDI6IHJhbmRvbVZhbDJcblxuXHRcdCMg0JjQvNC/0YDQvtCy0LjQt9Cw0YbQuNGPXG5cdFx0IyAoY29udGV4dCxhcmdzLi4uKSAtPlxuXHRcdCMgXHRpZiAhR3JhZGllbnRHZW4ub3B0aW9ucy5pc0RlZmF1bHRcblx0XHQjIFx0XHRjb2xvclNjaGVtZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHQjIFx0XHRyYW5kb21WYWwxID0gR3JhZGllbnRHZW4ub3B0aW9ucy5kZWZpbmVkVmFsMVxuXHRcdCMgXHRcdHJhbmRvbVZhbDIgPSBHcmFkaWVudEdlbi5vcHRpb25zLmRlZmluZWRWYWwyXG5cdFx0IyBcdFx0cmFuZG9tVmFsMyA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDNcblx0XHQjIFx0XHRyYW5kb21WYWw0ID0gR3JhZGllbnRHZW4ub3B0aW9ucy5kZWZpbmVkVmFsNFxuXHRcdCMgXHRcdHJhbmRvbVZhbDUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmRlZmluZWRWYWw1XG5cdFx0IyBcdFx0cmFuZG9tVmFsNiA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDZcblx0XHQjIFx0XHRncmFkaWVudFR5cGUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0IyBcdGVsc2UgaWYgR3JhZGllbnRHZW4ub3B0aW9ucy5pc0RlZmF1bHRcblx0XHQjIFx0XHRjb2xvclNjaGVtZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHQjIFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSgwLGNvbG9yU2NoZW1lLmxlbmd0aC0xKVxuXHRcdCMgXHRcdHJhbmRvbVZhbDIgPSBhcHAuZ2V0UmFuZG9tKDAsY29sb3JTY2hlbWUubGVuZ3RoLTEpXG5cdFx0IyBcdFx0cmFuZG9tVmFsMyA9IGFwcC5nZXRSYW5kb20oMCwgMTUwKVxuXHRcdCMgXHRcdHJhbmRvbVZhbDQgPSBhcHAuZ2V0UmFuZG9tKDAsIDE1MClcblx0XHQjIFx0XHRyYW5kb21WYWw1ID0gYXBwLmdldFJhbmRvbSgwLCAxNTApXG5cdFx0IyBcdFx0cmFuZG9tVmFsNiA9IGFwcC5nZXRSYW5kb20oMCwgMTUwKVxuXHRcdCMgXHRcdCMgVE9ETyBnZW5lcmF0ZSByYW5kb20gZ3JhZGllbnRUeXBlIVxuXHRcdCMgXHRcdGdyYWRpZW50VHlwZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHQjIFx0Y29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZidcblx0XHQjIFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXHRcdCMgXHRpZiBncmFkaWVudFR5cGUgaXMgJ2xpbmVhcidcblx0XHQjIFx0XHRncmFkaWVudCA9IGNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQocmFuZG9tVmFsMyxyYW5kb21WYWw0LHJhbmRvbVZhbDUscmFuZG9tVmFsNilcblx0XHQjIFx0ZWxzZSBpZiBncmFkaWVudFR5cGUgaXMgJ3JhZGlhbCdcblx0XHQjIFx0XHRncmFkaWVudCA9IGNvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQoMTUwLDc1LDUwLDE1MCw3NSw0OSlcblx0XHQjIFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsJyMnK2NvbG9yU2NoZW1lW3JhbmRvbVZhbDFdKVxuXHRcdCMgXHRncmFkaWVudC5hZGRDb2xvclN0b3AoMSwnIycrY29sb3JTY2hlbWVbcmFuZG9tVmFsMl0pXG5cdFx0IyBcdGNvbnRleHQuZmlsbFN0eWxlID0gZ3JhZGllbnRcblx0XHQjIFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXG5cdFx0IyBcdCMgc2F2ZSBvcHRpb25zIHRvIGN1cnJlbnQgbW9kZWxcblx0XHQjIFx0R3JhZGllbnRHZW4ub3B0aW9ucyA9XG5cdFx0IyBcdFx0ZGVmaW5lZFZhbDE6IHJhbmRvbVZhbDFcblx0XHQjIFx0XHRkZWZpbmVkVmFsMjogcmFuZG9tVmFsMlxuXHRcdCMgXHRcdGRlZmluZWRWYWwzOiByYW5kb21WYWwzXG5cdFx0IyBcdFx0ZGVmaW5lZFZhbDQ6IHJhbmRvbVZhbDRcblx0XHQjIFx0XHRkZWZpbmVkVmFsNTogcmFuZG9tVmFsNVxuXHRcdCMgXHRcdGRlZmluZWRWYWw2OiByYW5kb21WYWw2XG5cblx0XHQjICMg0JjQvNC/0YDQvtCy0LjQt9Cw0YbQuNGPIDJcblx0XHQjIChjb250ZXh0LGFyZ3MuLi4pIC0+XG5cdFx0IyBcdGlmICFHcmFkaWVudEdlbi5vcHRpb25zLmlzRGVmYXVsdFxuXHRcdCMgXHRcdGNvbG9yU2NoZW1lID0gR3JhZGllbnRHZW4ub3B0aW9ucy5jb2xvclNjaGVtZVxuXHRcdCMgXHRcdHJhbmRvbVZhbDEgPSBHcmFkaWVudEdlbi5vcHRpb25zLmRlZmluZWRWYWwxXG5cdFx0IyBcdFx0cmFuZG9tVmFsMiA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDJcblx0XHQjIFx0XHRyYW5kb21WYWwzID0gR3JhZGllbnRHZW4ub3B0aW9ucy5kZWZpbmVkVmFsM1xuXHRcdCMgXHRcdHJhbmRvbVZhbDQgPSBHcmFkaWVudEdlbi5vcHRpb25zLmRlZmluZWRWYWw0XG5cdFx0IyBcdFx0cmFuZG9tVmFsNSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZGVmaW5lZFZhbDVcblx0XHQjIFx0XHRncmFkaWVudFR5cGUgPSBHcmFkaWVudEdlbi5vcHRpb25zLmdyYWRpZW50VHlwZVxuXG5cdFx0IyBcdGVsc2UgaWYgR3JhZGllbnRHZW4ub3B0aW9ucy5pc0RlZmF1bHRcblx0XHQjIFx0XHRjb2xvclNjaGVtZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuY29sb3JTY2hlbWVcblx0XHQjIFx0XHRyYW5kb21WYWwxID0gYXBwLmdldFJhbmRvbSg1MCwyNTApXG5cdFx0IyBcdFx0cmFuZG9tVmFsMiA9IGFwcC5nZXRSYW5kb20oNTAsMjUwKVxuXHRcdCMgXHRcdHJhbmRvbVZhbDMgPSBhcHAuZ2V0UmFuZG9tKDUwLDIwMClcblx0XHQjIFx0XHRyYW5kb21WYWw0ID0gYXBwLmdldFJhbmRvbSg1MCwyMDApXG5cdFx0IyBcdFx0cmFuZG9tVmFsNSA9IDE1MFxuXHRcdCMgXHRcdCMgVE9ETyBnZW5lcmF0ZSByYW5kb20gZ3JhZGllbnRUeXBlIVxuXHRcdCMgXHRcdGdyYWRpZW50VHlwZSA9IEdyYWRpZW50R2VuLm9wdGlvbnMuZ3JhZGllbnRUeXBlXG5cblx0XHQjIFx0Y29udGV4dC5maWxsU3R5bGUgPSAnI2ZmZidcblx0XHQjIFx0Y29udGV4dC5maWxsUmVjdCgwLDAsY29udGV4dC5jYW52YXMud2lkdGgsY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuXHRcdCMgXHQjIGlmIGdyYWRpZW50VHlwZSBpcyAnbGluZWFyJ1xuXHRcdCMgXHQjIFx0Z3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KHJhbmRvbVZhbDMscmFuZG9tVmFsNCxyYW5kb21WYWw1LHJhbmRvbVZhbDYpXG5cdFx0IyBcdCMgZWxzZSBpZiBncmFkaWVudFR5cGUgaXMgJ3JhZGlhbCdcblx0XHQjIFx0IyBcdGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudCgxNTAsNzUsNTAsMTUwLDc1LDQ5KVxuXG5cdFx0IyBcdGdyZCA9IGNvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQoIHJhbmRvbVZhbDEsIHJhbmRvbVZhbDIsIDAuMDAwLCByYW5kb21WYWwzLCByYW5kb21WYWw0LCByYW5kb21WYWw1KVxuXG5cdFx0IyBcdCMgQWRkIGNvbG9yc1xuXHRcdCMgXHRncmQuYWRkQ29sb3JTdG9wIDAuMDAwLCBcInJnYmEoMTQsIDE0LCAxNiwgMS4wMDApXCJcblx0XHQjIFx0Z3JkLmFkZENvbG9yU3RvcCAwLjE3MCwgXCJyZ2JhKDE0LCAxNCwgMTYsIDEuMDAwKVwiXG5cdFx0IyBcdGdyZC5hZGRDb2xvclN0b3AgMC4yNzAsIFwicmdiYSg5NiwgMTA5LCA5MSwgMS4wMDApXCJcblx0XHQjIFx0Z3JkLmFkZENvbG9yU3RvcCAwLjYxMCwgXCJyZ2JhKDc1LCA5MywgMTAzLCAxLjAwMClcIlxuXHRcdCMgXHRncmQuYWRkQ29sb3JTdG9wIDAuNjIwLCBcInJnYmEoNzUsIDkzLCAxMDMsIDEuMDAwKVwiXG5cdFx0IyBcdGdyZC5hZGRDb2xvclN0b3AgMC42OTAsIFwicmdiYSgyNTUsIDI1MCwgMjUwLCAxLjAwMClcIlxuXHRcdCMgXHRncmQuYWRkQ29sb3JTdG9wIDAuOTIwLCBcInJnYmEoMjU1LCAyNTAsIDI1MCwgMS4wMDApXCJcblx0XHQjIFx0Z3JkLmFkZENvbG9yU3RvcCAwLjkzMCwgXCJyZ2JhKDAsIDAsIDAsIDEuMDAwKVwiXG5cdFx0IyBcdGdyZC5hZGRDb2xvclN0b3AgMC45NDAsIFwicmdiYSgyNTUsIDI1NSwgMjU1LCAxLjAwMClcIlxuXG5cdFx0IyBcdCMgRmlsbCB3aXRoIGdyYWRpZW50XG5cdFx0IyBcdGNvbnRleHQuZmlsbFN0eWxlID0gZ3JkXG5cdFx0IyBcdGNvbnRleHQuZmlsbFJlY3QgMCwgMCwgY29udGV4dC5jYW52YXMud2lkdGgsIGNvbnRleHQuY2FudmFzLmhlaWdodFxuXG5cdFx0IyBcdCMgc2F2ZSBvcHRpb25zIHRvIGN1cnJlbnQgbW9kZWxcblx0XHQjIFx0R3JhZGllbnRHZW4ub3B0aW9ucyA9XG5cdFx0IyBcdFx0ZGVmaW5lZFZhbDE6IHJhbmRvbVZhbDFcblx0XHQjIFx0XHRkZWZpbmVkVmFsMjogcmFuZG9tVmFsMlxuXHRcdCMgXHRcdGRlZmluZWRWYWwzOiByYW5kb21WYWwzXG5cdFx0IyBcdFx0ZGVmaW5lZFZhbDQ6IHJhbmRvbVZhbDRcblx0XHQjIFx0XHRkZWZpbmVkVmFsNTogcmFuZG9tVmFsNVxuXG5cblxuXHRcdFx0IyBDcmVhdGUgZ3JhZGllbnRcblx0XVxuXG5cdEBkcmF3ID0gKGNhbnZhcyxtb2RlbCxhcmdzLi4uKSAtPlxuXHRcdGluaXRDb2xvclNjaGVtZSA9IC0+XG5cdFx0XHRzY20gPSBuZXcgQ29sb3JTY2hlbWUoKVxuXHRcdFx0aHVlID0gYXBwLmdldFJhbmRvbSgwLjIsIDM1OSwgMSlcblxuXHRcdFx0dmFyaWF0aW9ucyA9IFsnZGVmYXVsdCcsICdwYXN0ZWwnLCAnc29mdCcsICdsaWdodCcsICdoYXJkJywgJ3BhbGUnIF1cblx0XHRcdHZhcmlhdGlvbiA9IHZhcmlhdGlvbnNbIGFwcC5nZXRSYW5kb20oMCwgdmFyaWF0aW9ucy5sZW5ndGgtMSkgXVxuXHRcdFx0c2NtLmZyb21faHVlKGh1ZSlcblx0XHRcdC5zY2hlbWUoJ3RldHJhZGUnKVxuXHRcdFx0LmRpc3RhbmNlKDAuMSlcblx0XHRcdC5hZGRfY29tcGxlbWVudChmYWxzZSlcblx0XHRcdC52YXJpYXRpb24odmFyaWF0aW9uKVxuXHRcdFx0LndlYl9zYWZlKGZhbHNlKVxuXHRcdFx0c2NtLmNvbG9ycygpXG5cblx0XHRjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKVxuXHRcdCQuZXh0ZW5kKCBHcmFkaWVudEdlbi5vcHRpb25zLCBtb2RlbC5nZXQgJ2dlbmVyYXRvcnMuZ3JhZGllbnRHZW4nIClcblx0XHRpZiBtb2RlbC5nZXQgJ2dlbmVyYXRvcnMuZ3JhZGllbnRHZW4uaXNEZWZhdWx0J1xuXHRcdFx0R3JhZGllbnRHZW4ub3B0aW9ucy5jb2xvclNjaGVtZSA9IGluaXRDb2xvclNjaGVtZSgpXG5cdFx0XHRyYW5kb21WYXJpYW50ID0gYXBwLmdldFJhbmRvbSgwLCBAZ3JhZGllbnRWYXJpYW50cy5sZW5ndGgtMSlcblxuXHRcdFx0QGdyYWRpZW50VmFyaWFudHNbIHJhbmRvbVZhcmlhbnQgXShjb250ZXh0KVxuXHRcdFx0R3JhZGllbnRHZW4ub3B0aW9ucy5ncmFkaWVudFZhcmlhbnROdW0gPSByYW5kb21WYXJpYW50XG5cblx0XHRcdEdyYWRpZW50R2VuLm9wdGlvbnMuaXNEZWZhdWx0ID0gZmFsc2VcblxuXHRcdGVsc2UgaWYgIW1vZGVsLmdldCAnZ2VuZXJhdG9ycy5ncmFkaWVudEdlbi5pc0RlZmF1bHQnXG5cblx0XHRcdEBpc0RlZmF1bHQgPSBmYWxzZVxuXHRcdFx0cHJlZGVmaW5lZFZhcmlhbnQgPSBtb2RlbC5nZXQgJ2dlbmVyYXRvcnMuZ3JhZGllbnRHZW4uZ3JhZGllbnRWYXJpYW50TnVtJ1xuXHRcdFx0QGdyYWRpZW50VmFyaWFudHNbIHByZWRlZmluZWRWYXJpYW50IF0oY29udGV4dClcblxuXHRcdG1vZGVsLnNldCAnZ2VuZXJhdG9ycy5ncmFkaWVudEdlbicsIEdyYWRpZW50R2VuLm9wdGlvbnMsXG5cdFx0XHRzaWxlbnQ6IHRydWVcblxuXG4iXX0=