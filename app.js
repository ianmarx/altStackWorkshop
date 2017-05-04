// SCROLL DOWN FOR DIRECTIONS

var user;
document.addEventListener('DOMContentLoaded', function() {
 var loggedInUser = localStorage.getItem('username');
 if (loggedInUser != null ){
   document.getElementById('hello').innerText = `Hi, ${loggedInUser}!`;
   document.getElementById('hello').style.display = 'block';
   user = loggedInUser;
 }
 else{
   user = 'Anonymous';
 }
}, false);

var nav = new Vue({
  el: '#fake-nav',
  methods: {
    open: function(which, e) {
      e.preventDefault();
      modal.active = which;
      console.log(modal.active);
    },
  }
});

var modal_submit_login = 'Login';
// var user = 'Anonymous';

var modal = new Vue({
  el: '#login-modal',
  data: {
    active: null,
    submitted: null,

    loginSubmit: modal_submit_login,
    loginUser: '',
  },
  methods: {
    close: function(e) {
      e.preventDefault();
      if (e.target === this.$el) {
        this.active = null;
      }
    },
    submit: function(which, e) {

      user = document.getElementById('username').value;
      localStorage.setItem('username', user);
      document.getElementById('hello').innerText = `Hi, ${user}!`;
      document.getElementById('hello').style.display = "block";
      modal.active = null;


    }
  }
});

// ADD CODE HERE TO CREATE A VUE INSTANCE
var eventsPage = new Vue({

  // We want to target the div with an id of 'events'
  el: '#events',

  // Here we can register any values or collections that hold data
  // for the application
  data: {
    event: { user: '', name: '', description: '', date: '' },
    events: []
  },

  // Anything within the mounted function will run when the application loads
  mounted: function() {
    // call fetchEvents here!
    this.fetchEvents();
  },

  // Methods we want to use in our application are registered here
  methods: {
    // add fetchEvents, addEvent, and deleteEvent
    fetchEvents: function() {
      let events = '';
      let arr = [];
      $.get("https://hidden-retreat-66994.herokuapp.com/AllEvents", (data) => {
        arr = JSON.parse(data);
        this.events =  arr;
      });
    },

    addEvent: function() {
      if(this.event.name) {
        this.event.user = user;
        this.events.push(this.event);

        $.post("https://hidden-retreat-66994.herokuapp.com/PutEvent", {
            name: this.event.name,
            user: this.event.user,
            description: this.event.description,
            date: this.event.date
        }).done( function(data) {
          window.location.reload();
        });

        this.event = { name: '', user: '', description: '', date: '' };

      }
    },

    deleteEvent: function(index) {
      if(confirm("Are you sure you want to delete this event?")) {
        $.post("https://hidden-retreat-66994.herokuapp.com/DeleteEvent", {
            name: this.events[index].name,
            user: this.events[index].user,
            description: this.events[index].description,
            date: this.events[index].date,
        }).done( function(data) {
          window.location.reload();
        });
      }
    }
  }
});
