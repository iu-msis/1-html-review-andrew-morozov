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
        "booksForm": {}
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

       handleResetEdit() {
          this.selectedOffer = null;
          this.offerForm = {};
      }   


    }, 

    created() {

      this.fetchBooksData();
      this.fetchUserData();

    }
  }
  
Vue.createApp(Offer).mount('#table');