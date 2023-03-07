let url = "https://3001-4geeksacade-reactflaskh-qh8cjtvsr3f.ws-eu89.gitpod.io";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      favorites: [],
	  characters: [],
	  planets: [],
	  films: []
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      addFavorites: (name) => {
        if (getStore().favorites.includes(name) === false) {
          let tempFavorites = [...getStore().favorites];
          tempFavorites.push(name);
          setStore({ favorites: tempFavorites });
        }
      },
      deleteFavorites: (item) => {
        let removeList = getStore().favorites.filter(
          (favorite) => favorite !== item
        );
        setStore({ favorites: removeList });
      },
      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      getCharacters: async (id) => {
        let api = url + "/api/people";
        if (id) {
          api = url + "/api/people/" + id;
        }
        try {
          const resp = await fetch(api);
          const data = await resp.json();
          setStore( { characters: data.list_people } )
        } catch (e) {
          console.log("API Call failed");
        }
      },
      getPlanets: async (id) => {
        let api = url + "/api/planets";
        if (id) {
          api = url + "/api/planets/" + id;
        }
        try {
          const resp = await fetch(api);
          const data = await resp.json();
          setStore( { planets: data.list_planets } )
        } catch (e) {
          console.log("API Call failed");
        }
      },
      getFilms: async (id) => {
        let api = url + "/api/films";
        if (id) {
          api = url + "/api/films/" + id;
        }
        try {
          const resp = await fetch(api);
          const data = await resp.json();
          setStore( { films: data.list_films } )
        } catch (e) {
          console.log("API Call failed");
        }
      },
      getUser: () => {
        fetch(
          "https://3000-4geeksacade-flaskresthe-7irx0lx5ymf.ws-us89.gitpod.io/user"
        )
          .then((resp) => resp.json())
          .then((data) => {
            setStore({ user: data.list_people });
          });
      },
      getToken: async ({ email, password }) => {
        try {
          // fetching data from the backend
          const resp = await fetch(
            "https://3000-4geeksacade-flaskresthe-7irx0lx5ymf.ws-us89.gitpod.io/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: email, password: password }),
            }
          );
          if (resp.status === 401) {
            return false;
          } else if (resp.status === 400) {
            return false;
          }
          if (resp.status === 200) {
            const data = await resp.json();
            localStorage.setItem("token", data?.access_token);
            setStore({ auth: true });
            console.log(getStore());
            return true;
          }
          // don't forget to return something, that is how the async resolves
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
