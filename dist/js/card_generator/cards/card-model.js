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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZ2VuZXJhdG9yL2NhcmRzL2NhcmQtbW9kZWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTttU0FBQTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLHFCQUFaLEVBQW1DLFNBQUMsS0FBRCxHQUFBO1dBQzVCLEtBQUssQ0FBQztBQUNYLGtDQUFBLENBQUE7Ozs7T0FBQTs7QUFBQSwwQkFBQSxRQUFBLEdBQ0M7QUFBQSxRQUFBLElBQUEsRUFDQztBQUFBLFVBQUEsU0FBQSxFQUFXLElBQVg7QUFBQSxVQUNBLEdBQUEsRUFBSyxNQURMO0FBQUEsVUFFQSxJQUFBLEVBQU0sU0FGTjtBQUFBLFVBR0EsT0FBQSxFQUFTLFNBSFQ7QUFBQSxVQUlBLEtBQUEsRUFBTyxTQUpQO0FBQUEsVUFLQSxLQUFBLEVBQU8sU0FMUDtBQUFBLFVBTUEsUUFBQSxFQUFVLFNBTlY7U0FERDtBQUFBLFFBU0EsVUFBQSxFQUNDO0FBQUEsVUFBQSxXQUFBLEVBQ0M7QUFBQSxZQUFBLFNBQUEsRUFBVyxJQUFYO0FBQUEsWUFDQSxrQkFBQSxFQUFvQixDQURwQjtBQUFBLFlBRUEsWUFBQSxFQUFjLFFBRmQ7QUFBQSxZQUdBLGlCQUFBLEVBQW1CLE9BSG5CO0FBQUEsWUFJQSxXQUFBLEVBQVksQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixRQUFyQixFQUErQixRQUEvQixFQUF5QyxRQUF6QyxFQUFtRCxRQUFuRCxFQUE2RCxRQUE3RCxFQUF1RSxRQUF2RSxFQUFpRixRQUFqRixFQUEyRixRQUEzRixFQUFxRyxRQUFyRyxFQUErRyxRQUEvRyxFQUF5SCxRQUF6SCxFQUFtSSxRQUFuSSxFQUE2SSxRQUE3SSxFQUF1SixRQUF2SixDQUpaO1dBREQ7QUFBQSxVQU9BLE9BQUEsRUFDQztBQUFBLFlBQUEsU0FBQSxFQUFXLElBQVg7QUFBQSxZQUNBLFNBQUEsRUFBVyxNQURYO0FBQUEsWUFFQSxVQUFBLEVBQVksWUFGWjtXQVJEO0FBQUEsVUFZQSxRQUFBLEVBQ0M7QUFBQSxZQUFBLFNBQUEsRUFBVyxJQUFYO1dBYkQ7U0FWRDtPQURELENBQUE7O3VCQUFBOztPQUQ2QixRQUFRLENBQUMsV0FETDtFQUFBLENBQW5DLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZ2VuZXJhdG9yL2NhcmRzL2NhcmQtbW9kZWwuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEdlbmVyYXRvci5jYXJkcycsIChDYXJkcykgLT5cblx0Y2xhc3MgQ2FyZHMuQ2FyZE1vZGVsIGV4dGVuZHMgQmFja2JvbmUuRGVlcE1vZGVsXG5cdFx0ZGVmYXVsdHM6IFxuXHRcdFx0ZGF0YTpcblx0XHRcdFx0aXNEZWZhdWx0OiB0cnVlXG5cdFx0XHRcdHNleDogJ21hbGUnXG5cdFx0XHRcdG5hbWU6ICdEZWZhdWx0J1xuXHRcdFx0XHRzdXJuYW1lOiAnRGVmYXVsdCdcblx0XHRcdFx0cGhvbmU6ICdEZWZhdWx0J1xuXHRcdFx0XHRlTWFpbDogJ0RlZmF1bHQnXG5cdFx0XHRcdHBvc2l0aW9uOiAnRGVmYXVsdCdcblxuXHRcdFx0Z2VuZXJhdG9yczpcblx0XHRcdFx0Z3JhZGllbnRHZW46IFxuXHRcdFx0XHRcdGlzRGVmYXVsdDogdHJ1ZVxuXHRcdFx0XHRcdGdyYWRpZW50VmFyaWFudE51bTogMFxuXHRcdFx0XHRcdGdyYWRpZW50VHlwZTogJ2xpbmVhcidcblx0XHRcdFx0XHRncmFkaWVudERpcmVjdGlvbjogJzQ1ZGVnJ1xuXHRcdFx0XHRcdGNvbG9yU2NoZW1lOltcIjZiOTk3OFwiLCBcIjU5ODA2NFwiLCBcImNmZTZkNVwiLCBcIjYwYmY3YlwiLCBcImNjOTU4ZlwiLCBcIjgwNWQ1OVwiLCBcImU2ZDFjZlwiLCBcImJmNmE2MFwiLCBcImNjOWQ4ZlwiLCBcIjgwNjI1OVwiLCBcImU2ZDRjZlwiLCBcImJmNzU2MFwiLCBcIjYzOGQ3ZFwiLCBcIjU5ODA3MVwiLCBcImNmZTZkZFwiLCBcIjYwYmY5YlwiXVxuXG5cdFx0XHRcdHRleHRHZW46XG5cdFx0XHRcdFx0aXNEZWZhdWx0OiB0cnVlXG5cdFx0XHRcdFx0dGV4dEFsaWduOiAnYXV0bydcblx0XHRcdFx0XHRmb250RmFtaWx5OiAnc2Fucy1zZXJpZidcblxuXHRcdFx0XHRzdGFyc0dlbjpcblx0XHRcdFx0XHRpc0RlZmF1bHQ6IHRydWUiXX0=