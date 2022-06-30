import inherits from 'inherits-browser';

import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';

import {
  every,
  filter
} from 'min-dash';

import {
  isAny
} from '../modeling/util/ModelingUtil';


/**
 * Registers element exclude filters for elements that
 * currently do not support distribution.
 */
export default function BpmnDistributeElements(distributeElements, eventBus, rules) {
  RuleProvider.call(this, eventBus);

  distributeElements.registerFilter(function(elements) {
    return rules.allowed('elements.distribute', { elements: elements }) || [];
  });
}

BpmnDistributeElements.$inject = [ 'distributeElements', 'eventBus', 'rules' ];

inherits(BpmnDistributeElements, RuleProvider);

BpmnDistributeElements.prototype.init = function() {
  this.addRule('elements.distribute', function(context) {
    var elements = context.elements;

    elements = filter(elements, function(element) {
      var cannotDistribute = isAny(element, [
        'bpmn:Association',
        'bpmn:BoundaryEvent',
        'bpmn:DataInputAssociation',
        'bpmn:DataOutputAssociation',
        'bpmn:Lane',
        'bpmn:MessageFlow',
        'bpmn:Participant',
        'bpmn:SequenceFlow',
        'bpmn:TextAnnotation'
      ]);

      return !(element.labelTarget || cannotDistribute);
    });

    if (elements.length < 3) {
      return false;
    }

    if (!haveCommonParent(elements)) {
      return false;
    }

    return elements;
  });
};

function haveCommonParent(elements) {
  return every(elements, function(element) {
    return element.parent === elements[0].parent;
  });
}
