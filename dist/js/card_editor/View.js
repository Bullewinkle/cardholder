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

      CardEditorView.prototype.logging = false;

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

      CardEditorView.prototype.onShow = function() {};

      return CardEditorView;

    })(Marionette.ItemView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRfZWRpdG9yL1ZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsQ0FBWSxZQUFaLEVBQTBCLFNBQUMsVUFBRCxHQUFBO1dBQ25CLFVBQVUsQ0FBQztBQUNoQix1Q0FBQSxDQUFBOzs7OztPQUFBOztBQUFBLCtCQUFBLE9BQUEsR0FBUyxLQUFULENBQUE7O0FBQUEsK0JBQ0EsT0FBQSxHQUFTLENBRFQsQ0FBQTs7QUFBQSwrQkFHQSxTQUFBLEdBQVcsa0JBSFgsQ0FBQTs7QUFBQSwrQkFTQSxRQUFBLEdBQVUsU0FBQyxLQUFELEdBQUE7ZUFDVCxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQXZCLENBQThCLElBQUMsQ0FBQSxLQUEvQixFQURTO01BQUEsQ0FUVixDQUFBOztBQUFBLCtCQVlBLFVBQUEsR0FBWSxTQUFBLEdBQUE7ZUFDWCxJQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sRUFBYSxTQUFBLEdBQUE7QUFDWixVQUFBLElBQW9ELElBQUMsQ0FBQSxPQUFELEtBQVksSUFBaEU7bUJBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxTQUF2QyxFQUFBO1dBRFk7UUFBQSxDQUFiLEVBRFc7TUFBQSxDQVpaLENBQUE7O0FBQUEsK0JBb0JBLE1BQUEsR0FBUSxTQUFBLEdBQUEsQ0FwQlIsQ0FBQTs7NEJBQUE7O09BRHVDLFVBQVUsQ0FBQyxVQUQxQjtFQUFBLENBQTFCLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNhcmRfZWRpdG9yL1ZpZXcuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJAYXBwLm1vZHVsZSAnQ2FyZEVkaXRvcicsIChDYXJkRWRpdG9yKSAtPlxuXHRjbGFzcyBDYXJkRWRpdG9yLkNhcmRFZGl0b3JWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlld1xuXHRcdGxvZ2dpbmc6IG9mZlxuXHRcdGNvdW50ZXI6IDBcblxuXHRcdGNsYXNzTmFtZTogJ2NhcmQtZWRpdG9yLXZpZXcnXG5cblx0XHQjIHVpOlxuXHRcdFx0XHRcdFxuXHRcdCMgZXZlbnRzOlxuXG5cdFx0dGVtcGxhdGU6IChtb2RlbCkgLT5cblx0XHRcdHRlbXBsYXRpemVyLmNhcmRFZGl0b3IuZWRpdG9yIEBtb2RlbFxuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdEBiaW5kICdhbGwnLCAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyBcIkNBUkRTIENPTVBPU0lURSBWSUVXOlxcdFwiLCBhcmd1bWVudHMgaWYgQGxvZ2dpbmcgaXMgb25cblx0XHRcdFxuXHRcdFx0IyBAc3RhdGUgICAgICA9IG5ldyBCYWNrYm9uZS5Nb2RlbCgpXG5cdFx0XHQjIEBtb2RlbCAgICAgID0gbmV3IENhcmRHZW5lcmF0b3Iuc3RlcEZvcm0uU3RlcEZvcm1Nb2RlbCgpXG5cdFx0XHQjIEBjb2xsZWN0aW9uID0gbmV3IENhcmRHZW5lcmF0b3IuY2FyZHMuQ2FyZHNDb2xsZWN0aW9uKClcblxuXHRcdG9uU2hvdzogPT5cbiJdfQ==