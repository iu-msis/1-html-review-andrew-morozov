const Offer = {
    data() {
      return {
        "person": undefined,
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

      }

    }, 

    created() {

      this.fetchBooksData();

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
    }
  }
  
Vue.createApp(Offer).mount('#table');
Vue.createApp(Offer).mount('#bookTable');