import ICONS from './DistributeElementsIcons';

import { assign } from 'min-dash';

var LOW_PRIORITY = 900;

/**
 * A provider for distribute elements popup menu.
 */
export default function DistributeElementsMenuProvider(popupMenu, distributeElements, translate) {
  this._distributeElements = distributeElements;
  this._translate = translate;
  this._popupMenu = popupMenu;

  popupMenu.registerProvider('align-elements', LOW_PRIORITY, this);
}

DistributeElementsMenuProvider.$inject = [
  'popupMenu',
  'distributeElements',
  'translate'
];

DistributeElementsMenuProvider.prototype.getPopupMenuEntries = function(elements) {
  var entries = {};

  if (this._isAllowed(elements)) {
    assign(entries, this._getEntries(elements));
  }

  return entries;
};

DistributeElementsMenuProvider.prototype._isAllowed = function(elements) {

  // TODO(barmac): implement
  return true;
};

DistributeElementsMenuProvider.prototype._getEntries = function(elements) {
  var distributeElements = this._distributeElements,
      translate = this._translate,
      popupMenu = this._popupMenu;

  var entries = {
    'distribute-elements-horizontal': {
      group: 'distribute',
      title: translate('Distribute elements horizontally'),
      className: 'bjs-align-elements-menu-entry',
      imageUrl: ICONS['horizontal'],
      action: function(event, entry) {
        distributeElements.trigger(elements, 'horizontal');
        popupMenu.close();
      }
    },
    'distribute-elements-vertical': {
      group: 'distribute',
      title: translate('Distribute elements vertically'),
      className: 'bjs-align-elements-menu-entry',
      imageUrl: ICONS['vertical'],
      action: function(event, entry) {
        distributeElements.trigger(elements, 'vertical');
        popupMenu.close();
      }
    },
  };

  return entries;
};
