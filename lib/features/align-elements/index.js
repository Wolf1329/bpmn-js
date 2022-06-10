import AlignElementsModule from 'diagram-js/lib/features/align-elements';
import ContextPadModule from 'diagram-js/lib/features/context-pad';
import PopupMenuModule from 'diagram-js/lib/features/popup-menu';

import AlignElementsContextPadProvider from './AlignElementsContextPadProvider';
import AlignElementsMenuProvider from './AlignElementsMenuProvider';

export default {
  __depends__: [
    AlignElementsModule,
    ContextPadModule,
    PopupMenuModule
  ],
  __init__: [
    'alignElementsContextPadProvider',
    'alignElementsMenuProvider'
  ],
  alignElementsContextPadProvider: [ 'type', AlignElementsContextPadProvider ],
  alignElementsMenuProvider: [ 'type', AlignElementsMenuProvider ]
};
