(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.module('CardEditor.views', function(views) {
    return views.LayerChild = (function(_super) {
      __extends(LayerChild, _super);

      function LayerChild() {
        this.template = __bind(this.template, this);
        return LayerChild.__super__.constructor.apply(this, arguments);
      }

      LayerChild.prototype.tagName = 'li';

      LayerChild.prototype.className = 'list-group-item ui-state-default ui-sortable-handle';

      LayerChild.prototype.template = function() {
        return templatizer.cardEditor.toolbar.layerChild(this.model.attributes);
      };

      LayerChild.prototype.initialize = function() {
        return console.log('layerChild init');
      };

      return LayerChild;

    })(Marionette.ItemView);
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRFZGl0b3Ivdmlld3MvbGF5ZXJDaGlsZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOzttU0FBQTs7QUFBQSxFQUFBLEdBQUcsQ0FBQyxNQUFKLENBQVcsa0JBQVgsRUFBK0IsU0FBQyxLQUFELEdBQUE7V0FDeEIsS0FBSyxDQUFDO0FBQ1gsbUNBQUEsQ0FBQTs7Ozs7T0FBQTs7QUFBQSwyQkFBQSxPQUFBLEdBQVMsSUFBVCxDQUFBOztBQUFBLDJCQUNBLFNBQUEsR0FBVyxxREFEWCxDQUFBOztBQUFBLDJCQUdBLFFBQUEsR0FBVSxTQUFBLEdBQUE7ZUFDVCxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUEvQixDQUEwQyxJQUFDLENBQUEsS0FBSyxDQUFDLFVBQWpELEVBRFM7TUFBQSxDQUhWLENBQUE7O0FBQUEsMkJBTUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtlQUNYLE9BQU8sQ0FBQyxHQUFSLENBQVksaUJBQVosRUFEVztNQUFBLENBTlosQ0FBQTs7d0JBQUE7O09BRDhCLFVBQVUsQ0FBQyxVQURaO0VBQUEsQ0FBL0IsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoiY2FyZEVkaXRvci92aWV3cy9sYXllckNoaWxkLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLm1vZHVsZSAnQ2FyZEVkaXRvci52aWV3cycsICh2aWV3cykgLT5cblx0Y2xhc3Mgdmlld3MuTGF5ZXJDaGlsZCBleHRlbmRzIE1hcmlvbmV0dGUuSXRlbVZpZXdcblx0XHR0YWdOYW1lOiAnbGknXG5cdFx0Y2xhc3NOYW1lOiAnbGlzdC1ncm91cC1pdGVtIHVpLXN0YXRlLWRlZmF1bHQgdWktc29ydGFibGUtaGFuZGxlJ1xuXG5cdFx0dGVtcGxhdGU6ID0+XG5cdFx0XHR0ZW1wbGF0aXplci5jYXJkRWRpdG9yLnRvb2xiYXIubGF5ZXJDaGlsZCBAbW9kZWwuYXR0cmlidXRlc1xuXG5cdFx0aW5pdGlhbGl6ZTogLT5cblx0XHRcdGNvbnNvbGUubG9nICdsYXllckNoaWxkIGluaXQnIl19