import Ember from 'ember';
import layout from './template';
const {
  computed,
  defineProperty
} = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['validated-input'],
  classNameBindings: ['showErrorClass:has-danger', 'isValid:has-success'],
  model: null,
  value: null,
  type: 'text',
  valuePath: '',
  placeholder: '',
  validation: null,
  showValidations: false,
  didValidate: false,
  autoComplete: 'on',
  doesNotHaveFocus: true,
  errorFieldClear: Ember.computed('fieldClear', function () {
    if (this.get('fieldClear')) {
      this.set('value', '');
      this.set('showValidations', false);
    }
  }),

  notValidating: computed.not('validation.isValidating').readOnly(),
  hasContent: computed.notEmpty('value').readOnly(),
  hasWarnings: computed.notEmpty('validation.warnings').readOnly(),
  isValid: computed.and('hasContent', 'validation.isTruelyValid'),
  shouldDisplayValidations: computed.or('showValidations', 'didValidate', 'hasContent').readOnly(),
  showErrorClass: computed.and('doesNotHaveFocus', 'notValidating', 'showErrorMessage', 'validation'),
  showErrorMessage: computed.and('doesNotHaveFocus', 'shouldDisplayValidations', 'validation.isInvalid'),
  showWarningMessage: computed.and('doesNotHaveFocus', 'shouldDisplayValidations', 'hasWarnings', 'isValid').readOnly(),
  preventPaste: false,
  didInsertElement: function () {
    this._super();
    if (this.preventPaste) {
      this.$('input').on('paste', function (e) {
        e.preventDefault();
      });
    } 
  },
  init() {
    this._super(...arguments);
    let valuePath = this.get('valuePath');

    defineProperty(this, 'validation', computed.readOnly(`model.validations.attrs.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
    
  },
  focusOut() {
    this._super(...arguments);
    this.set('showValidations', true);
    this.set('doesNotHaveFocus', true);
    this.sendAction('onFocusOutEvent', this.get('valuePath'));
  },
  actions: {
    inputFocusIn() {
      this.set('doesNotHaveFocus', false);
      this.sendAction('onFocusEvent', this.get('valuePath'));
    },
    inputKeyPress() {
      this.set('doesNotHaveFocus', false);
    },
    inputKeyUp(event) {
      if (event.needFocusAction) {
        this.sendAction('onFocusOutEvent', this.get('valuePath'));
      }
    }
  }
});