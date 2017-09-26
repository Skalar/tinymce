define(
  'ephox.dragster.demo.Sizers',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.photon.OuterPosition',
    'ephox.sugar.api.dom.InsertAll',
    'ephox.sugar.api.dom.Remove',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.api.search.SelectorFind',
    'ephox.sugar.api.view.Height',
    'ephox.sugar.api.view.Visibility',
    'ephox.sugar.api.view.Width'
  ],

  function (Arr, Fun, OuterPosition, InsertAll, Remove, Element, Css, SelectorFind, Height, Visibility, Width) {
    return function () {
      var box = function () {
        var r = Element.fromTag('div');
        Width.set(r, 8);
        Height.set(r, 8);
        Css.set(r, 'position', 'absolute');
        Css.set(r, 'border', '1px solid gray');
        Css.set(r, 'z-index', '1000');

        var set = function (x, y) {
          Css.set(r, 'left', (x - 4) + 'px');
          Css.set(r, 'top', (y - 4) + 'px');
        };

        var destroy = function () {
          Remove.remove(r);
        };

        var hider = Visibility.displayToggler(r, 'block');

        return {
          element: Fun.constant(r),
          show: hider.off,
          hide: hider.on,
          set: set,
          destroy: destroy
        };
      };

      var northwest = box();
      var north = box();
      var northeast = box();
      var southeast = box();
      Css.set(southeast.element(), 'cursor', 'se-resize');

      var update = function (target) {
        var loc = OuterPosition.find(target);
        var w = Width.get(target);
        var h = Height.get(target);
        var minx = loc.left();
        var maxx = loc.left() + w ;
        var midx = loc.left() + w/2 ;

        var y = loc.top();
        var maxy = y + h;

        northwest.set(minx, y);
        north.set(midx, y);
        northeast.set(maxx, y);
        southeast.set(maxx, maxy);

        var body = SelectorFind.first('body');
        body.each(function (b) {
          InsertAll.append(b, [ southeast.element() ]);
        });
      };

      var hide = function () {
        Arr.each([ northwest, north, northeast, southeast ], function (x) {
          x.hide();
        });
      };

      var show = function () {
        Arr.each([ northwest, north, northeast, southeast ], function (x) {
          x.show();
        });
      };

      var destroy = function () {
        northwest.destroy();
        north.destroy();
        northeast.destroy();
        southeast.destroy();
      };

      return {
        northeast: Fun.constant(northeast),
        southeast: Fun.constant(southeast),
        hide: hide,
        show: show,
        update: update,
        destroy: destroy
      };
    };

  }
);
