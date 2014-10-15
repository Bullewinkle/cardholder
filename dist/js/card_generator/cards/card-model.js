(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.app.module('CardGenerator.cards', function(Cards) {
    return Cards.CardModel = (function(_super) {
      __extends(CardModel, _super);

      function CardModel() {
        return CardModel.__super__.constructor.apply(this, arguments);
      }

      CardModel.prototype.defaults = {
        data: {
          isDefault: true,
          sex: 'male',
          name: 'Default',
          surname: 'Default',
          phone: 'Default',
          eMail: 'Default',
          position: 'Default'
        },
        generators: {
          gradientGen: {
            isDefault: true,
            gradientVariantNum: 0,
            gradientType: 'linear',
            gradientDirection: '45deg',
            colorScheme: ["6b9978", "598064", "cfe6d5", "60bf7b", "cc958f", "805d59", "e6d1cf", "bf6a60", "cc9d8f", "806259", "e6d4cf", "bf7560", "638d7d", "598071", "cfe6dd", "60bf9b"]
          },
          textGen: {
            isDefault: true,
            textAlign: 'auto',
            fontFamily: 'sans-serif'
          },
          starsGen: {
            isDefault: true
          }
        }
      };

      return CardModel;

    })(Backbone.DeepModel);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL2NhcmRzL2NhcmQtbW9kZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLHFCQUFaLEVBQW1DLFNBQUMsS0FBRCxHQUFBO1dBQzVCLEtBQUssQ0FBQztBQUNYLGtDQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSwwQkFBQSxRQUFBLEdBQ0M7QUFBQSxRQUFBLElBQUEsRUFDQztBQUFBLFVBQUEsU0FBQSxFQUFXLElBQVg7QUFBQSxVQUNBLEdBQUEsRUFBSyxNQURMO0FBQUEsVUFFQSxJQUFBLEVBQU0sU0FGTjtBQUFBLFVBR0EsT0FBQSxFQUFTLFNBSFQ7QUFBQSxVQUlBLEtBQUEsRUFBTyxTQUpQO0FBQUEsVUFLQSxLQUFBLEVBQU8sU0FMUDtBQUFBLFVBTUEsUUFBQSxFQUFVLFNBTlY7U0FERDtBQUFBLFFBU0EsVUFBQSxFQUNDO0FBQUEsVUFBQSxXQUFBLEVBQ0M7QUFBQSxZQUFBLFNBQUEsRUFBVyxJQUFYO0FBQUEsWUFDQSxrQkFBQSxFQUFvQixDQURwQjtBQUFBLFlBRUEsWUFBQSxFQUFjLFFBRmQ7QUFBQSxZQUdBLGlCQUFBLEVBQW1CLE9BSG5CO0FBQUEsWUFJQSxXQUFBLEVBQVksQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixRQUFyQixFQUErQixRQUEvQixFQUF5QyxRQUF6QyxFQUFtRCxRQUFuRCxFQUE2RCxRQUE3RCxFQUF1RSxRQUF2RSxFQUFpRixRQUFqRixFQUEyRixRQUEzRixFQUFxRyxRQUFyRyxFQUErRyxRQUEvRyxFQUF5SCxRQUF6SCxFQUFtSSxRQUFuSSxFQUE2SSxRQUE3SSxFQUF1SixRQUF2SixDQUpaO1dBREQ7QUFBQSxVQU9BLE9BQUEsRUFDQztBQUFBLFlBQUEsU0FBQSxFQUFXLElBQVg7QUFBQSxZQUNBLFNBQUEsRUFBVyxNQURYO0FBQUEsWUFFQSxVQUFBLEVBQVksWUFGWjtXQVJEO0FBQUEsVUE4QkEsUUFBQSxFQUNDO0FBQUEsWUFBQSxTQUFBLEVBQVcsSUFBWDtXQS9CRDtTQVZEO09BREQsQ0FBQTs7dUJBQUE7O09BRDZCLFFBQVEsQ0FBQyxXQURMO0VBQUEsQ0FBbkMsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZF9nZW5lcmF0b3IvY2FyZHMvY2FyZC1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkBhcHAubW9kdWxlICdDYXJkR2VuZXJhdG9yLmNhcmRzJywgKENhcmRzKSAtPlxuXHRjbGFzcyBDYXJkcy5DYXJkTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5EZWVwTW9kZWxcblx0XHRkZWZhdWx0czogXG5cdFx0XHRkYXRhOlxuXHRcdFx0XHRpc0RlZmF1bHQ6IHRydWVcblx0XHRcdFx0c2V4OiAnbWFsZSdcblx0XHRcdFx0bmFtZTogJ0RlZmF1bHQnXG5cdFx0XHRcdHN1cm5hbWU6ICdEZWZhdWx0J1xuXHRcdFx0XHRwaG9uZTogJ0RlZmF1bHQnXG5cdFx0XHRcdGVNYWlsOiAnRGVmYXVsdCdcblx0XHRcdFx0cG9zaXRpb246ICdEZWZhdWx0J1xuXG5cdFx0XHRnZW5lcmF0b3JzOlxuXHRcdFx0XHRncmFkaWVudEdlbjogXG5cdFx0XHRcdFx0aXNEZWZhdWx0OiB0cnVlXG5cdFx0XHRcdFx0Z3JhZGllbnRWYXJpYW50TnVtOiAwXG5cdFx0XHRcdFx0Z3JhZGllbnRUeXBlOiAnbGluZWFyJ1xuXHRcdFx0XHRcdGdyYWRpZW50RGlyZWN0aW9uOiAnNDVkZWcnXG5cdFx0XHRcdFx0Y29sb3JTY2hlbWU6W1wiNmI5OTc4XCIsIFwiNTk4MDY0XCIsIFwiY2ZlNmQ1XCIsIFwiNjBiZjdiXCIsIFwiY2M5NThmXCIsIFwiODA1ZDU5XCIsIFwiZTZkMWNmXCIsIFwiYmY2YTYwXCIsIFwiY2M5ZDhmXCIsIFwiODA2MjU5XCIsIFwiZTZkNGNmXCIsIFwiYmY3NTYwXCIsIFwiNjM4ZDdkXCIsIFwiNTk4MDcxXCIsIFwiY2ZlNmRkXCIsIFwiNjBiZjliXCJdXG5cblx0XHRcdFx0dGV4dEdlbjpcblx0XHRcdFx0XHRpc0RlZmF1bHQ6IHRydWVcblx0XHRcdFx0XHR0ZXh0QWxpZ246ICdhdXRvJ1xuXHRcdFx0XHRcdGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJ1xuXG5cdFx0XHRcdFx0IyB0ZXh0QmxvY2tPcHRpb25zOlxuXHRcdFx0XHRcdCMgXHRwYWRkaW5nOlxuXHRcdFx0XHRcdCMgXHRcdHRvcDogMCBcblx0XHRcdFx0XHQjIFx0XHRsZWZ0OiAwIFxuXHRcdFx0XHRcdCMgXHRcdGJvdHRvbTogMFxuXHRcdFx0XHRcdCMgXHRcdHJpZ2h0OiAwIFxuXHRcdFx0XHRcdCMgXHR0aXRsZTpcblx0XHRcdFx0XHQjIFx0XHRmb250U2l6ZTogXCIxLjhlbVwiXG5cdFx0XHRcdFx0IyBcdFx0Y29sb3I6IFwiIzAwMFwiXG5cdFx0XHRcdFx0IyBcdFx0dGV4dEJhc2VsaW5lOiAnbWlkZGxlJyBcblx0XHRcdFx0XHQjIFx0XHRsaW5lSGVpZ2h0OiBcIjFlbVwiXG5cdFx0XHRcdFx0IyBcdFx0bWFyZ2luQm90dG9tOiAxMFxuXHRcdFx0XHRcdCMgXHRib2R5OlxuXHRcdFx0XHRcdCMgXHRcdGZvbnRTaXplOiBcIjAuOGVtXCJcblx0XHRcdFx0XHQjIFx0XHRjb2xvcjogXCIjMDAwXCJcblx0XHRcdFx0XHQjIFx0XHR0ZXh0QmFzZWxpbmU6ICdtaWRkbGUnIFxuXHRcdFx0XHRcdCMgXHRcdGxpbmVIZWlnaHQ6IFwiMC44ZW1cIlx0XHRcdFx0XG5cblx0XHRcdFx0c3RhcnNHZW46XG5cdFx0XHRcdFx0aXNEZWZhdWx0OiB0cnVlIl19