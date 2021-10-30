const Offer = {
    data() {
      return {
        "person": {},
        "books": {
          ID: {},
          Title: {},
          Author: {},
          YearPublished: {},
          Publisher: {},
          PageCount: {},
          MSRP: {}
        },
        "offers": [],
        "booksForm": {},
        "selectedBook": null
        }
    },

    computed: {
      prettyBirthday() {
        return dayjs(this.person.dob.date)
        .format('D MMM YYYY');
      }
    },

    methods: {

       fetchBooksData() {
            fetch('/api/books/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })   
      }, 
      
        fetchUserData() {
          console.log("A");

          fetch('https://randomuser.me/api/')
          .then(response => response.json())
          .then((parsedJson) => {
              console.log(parsedJson);
              this.person = parsedJson.results[0]
              console.log("C");
          })
          .catch( err => {
              console.error(err)
          })
  
          console.log("B");
        },

        postNewBook(evt){
          console.log("Creating!", this.booksForm);

          fetch('api/books/create.php',{
              method:'POST',
              body: JSON.stringify(this.booksForm),
              headers:{
                  "Content-Type": "application/json; charset=utf-8"
              }
          })
          .then( response => response.json() )
          .then( json => {
              console.log("Returned from post:", json);
              this.books =json;
              this.booksForm = {};
              this.handleResetEdit();
          });          
      }, 
      postEditOffer(evt) {
        this.offerForm.id = this.selectedOffer.id;
        this.offerForm.studentId = this.selectedStudent.id;        
        
        console.log("Editing!", this.offerForm);

        fetch('api/offer/update.php', {
            method:'POST',
            body: JSON.stringify(this.offerForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.offers = json;
            
            // reset the form
            this.handleResetEdit();
          });
      },

        postDeleteOffer(o) {  
          if ( !confirm("Are you sure you want to delete the offer from " + o.companyName + "?") ) {
              return;
          }  
          
          console.log("Delete!", o);

          fetch('api/offer/delete.php', {
              method:'POST',
              body: JSON.stringify(o),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.offers = json;
              
              // reset the form
              this.handleResetEdit();
            });
        },

       handleResetEdit() {
          this.selectedOffer = null;
          this.offerForm = {};
      },
        handleEditOffer(offer) {
          this.selectedOffer = offer;
          this.offerForm = Object.assign({}, this.selectedOffer);
    }, 


    }, 

    created() {

      this.fetchBooksData();
      this.fetchUserData();

    }
  }
  
Vue.createApp(Offer).mount('#table');