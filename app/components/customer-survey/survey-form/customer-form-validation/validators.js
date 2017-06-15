import {
  validator,
  buildValidations
} from 'ember-cp-validations';


export const ContactDetailsValidations = buildValidations({
  firstName: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Please tell us your first name.'
      }),
      validator('length', {
        max: 40,
        message: 'Please tell us your first name. There is a character limit of 40.'
      }),
      validator('format', {
        regex: /^[a-zA-ZÀ-ú' -]+$/,
        message: 'Please re-type your first name using only letters, accents, hyphens and apostrophes, not numbers.'
      }),
      validator('format', {
        regex: /^(?=.*[\w]).+/,
        message: 'Please tell us your first name using at least one letter.'
      })
    ]
  },
  lastName: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Please tell us your surname.'
      }),
      validator('length', {
        max: 40,
        message: 'Please tell us your surname. There is a character limit of 40.'
      }),
      validator('format', {
        regex: /^[a-zA-ZÀ-ú' -]+$/,
        message: 'Please re-type your surname using only letters, accents, hyphens and apostrophes, not numbers.'
      }),
      validator('format', {
        regex: /^(?=.*[\w]).+/,
        message: 'Please tell us your surname using at least one letter.'
      })
    ]
  },
  emailAddress: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Please tell us your email address.'
      }),
      validator('format', {
        type: 'email',
        message: "Please check your email address, it doesn't seem right."
      })
    ]
  },
  telephoneNumber: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Please tell us your telephone number.'
      }),
      validator('format', {
        regex: /^[0][1|2|3|7|8][0-9]{8,9}$/,
        message: 'Please enter a valid telephone number, starting with 0, for example 01923585654.'
      })
    ]
  }
});
export default {
  ContactDetailsValidations
};
