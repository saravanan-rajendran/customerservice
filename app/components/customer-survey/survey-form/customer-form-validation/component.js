import Ember from 'ember';
import moment from 'moment';
import {ContactDetailsValidations} from './validators';

export default Ember.Component.extend(ContactDetailsValidations, {
inputedData :[],
  init() {    
    this._super(...arguments);
    moment.tz.setDefault("europe/london");
    var todayDate = new Date();
    var hour = moment(todayDate).get('hour');
    var day = moment(todayDate).get('d');
    var minutes = moment(todayDate).get('m');
    //console.log('uk hour'+hour);
    //console.log('uk day'+day);
    //console.log('uk minutes'+minutes);
    if((day >= 5 && hour >= 17))
    {
      this.set('message',"Sorry there's no one available right now. We'll call you after 8:30am on Monday.");
      this.set('enablemsg',true);
    }
    else if((day >= 1 && day <= 5) && ((hour >= 8 && minutes>30)&& hour < 17))
    {
      this.set('message',"Sorry there's no one available right now. We'll call you within the next 15 minutes.");
      this.set('enablemsg',true);
    }
    else if((day >= 1 && day <= 5) && (hour > 0 && (hour <= 8 && minutes<30)))
    {
      this.set('message',"Sorry there's no one available right now. We'll call you after 8:30am today.");
      this.set('enablemsg',true);
    }
    else
    {
      this.set('message',"Sorry there's no one available right now. We'll call you after 8:30am tomorrow.");
      this.set('enablemsg',true);
    }
  },

  isError: false,
  errorCaption: 'Oops, it looks like something went wrong',
  txtErrorMessage: '',
  actions: {
    submitRequest: function() {
      this.get('inputedData').pushObject(this.get('firstName')); 
      this.get('inputedData').pushObject(this.get('lastName'));
      this.toggleProperty('isShowingBody');
      this.toggleProperty('isFormSection');      
    }
  }
});
