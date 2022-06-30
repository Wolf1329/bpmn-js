import inherits from 'inherits-browser';

import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';

import {
  every,
  filter
} from 'min-dash';


/**
 * Rule provider for alignment of BPMN elements.
 */
export default function BpmnAlignElements(eventBus) {
  RuleProvider.call(this, eventBus);
}

BpmnAlignElements.$inject = [ 'eventBus' ];

inherits(BpmnAlignElements, RuleProvider);

BpmnAlignElements.prototype.init = function() {
  this.addRule('elements.align', function(context) {
    var elements = context.elements;

    // filter out elements which cannot be aligned
    var filteredElements = filter(elements, function(element) {
      return !(element.waypoints || element.host || element.labelTarget);
    });

    if (filteredElements.length < 2) {
      return false;
    }

    if (!haveCommonParent(filteredElements)) {
      return false;
    }
  });
};

function haveCommonParent(elements) {
  return every(elements, function(element) {
    return element.parent === elements[0].parent;
  });
}
