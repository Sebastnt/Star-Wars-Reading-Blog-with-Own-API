let url = "https://3001-4geeksacade-reactflaskh-qh8cjtvsr3f.ws-us89b.gitpod.io";
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
      films: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
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
          try {
            const resp = await fetch(api);
            const data = await resp.json();
            setStore({ characters: data.person });
          } catch (e) {
            console.log(e);
          }
        } else {
          try {
            const resp = await fetch((api), {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            });
            const data = await resp.json();
            setStore({ characters: data.list_people });
          } catch (e) {
            console.log(e);
          }
        }
      },
      getPlanets: async (id) => {
        let api = url + "/api/planets";
        if (id) {
          api = url + "/api/planets/" + id;
          try {
            const resp = await fetch(api);
            const data = await resp.json();
            console.log("data")
            console.log(data)
            setStore({ planets: data.planet });
          } catch (e) {
            console.log(e);
          }
        } else {
          try {
            const resp = await fetch((api), {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            });
            const data = await resp.json();
            setStore({ planets: data.list_planets });
          } catch (e) {
            console.log(e);
          }
        }
      },
      getFilms: async (id) => {
        let api = url + "/api/films";
        if (id) {
          api = url + "/api/films/" + id;
          try {
            const resp = await fetch(api);
            const data = await resp.json();
            console.log("data")
            console.log(data)
            setStore({ films: data.films });
          } catch (e) {
            console.log(e);
          }
        } else {
          try {
            const resp = await fetch((api), {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            });
            const data = await resp.json();
            setStore({ films: data.list_films });
          } catch (e) {
            console.log(e);
          }
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
          const resp = await fetch(url + "/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password }),
          });
          if (resp.status === 401) {
            return false;
          } else if (resp.status === 400) {
            return false;
          }
          if (resp.status === 200) {
            const data = await resp.json();
            localStorage.setItem("token", data?.access_token);
            setStore({ auth: true });
            return true;
          }
          // don't forget to return something, that is how the async resolves
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      favoriteCharacters: async (id) => {
        let api = url + "/api/favorites/people/" + id;
        try {
          await fetch((api), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
        getActions().getFavorites()
        } catch (e) {
          console.log(e);
        }
      },
      favoritePlanets: async (id) => {
        let api = url + "/api/favorites/planets/" + id;
        try {
          await fetch((api), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
        getActions().getFavorites()
        } catch (e) {
          console.log(e);
        }
      },
      favoriteFilms: async (id) => {
        let api = url + "/api/favorites/films/" + id;
        try {
          await fetch((api), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
        getActions().getFavorites()
        } catch (e) {
          console.log(e);
        }
      },
      getFavorites : async () => {
        let api = url + "/api/favorites";
        try {
          const resp = await fetch((api), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          const data = await resp.json();
          setStore({ favorites: data.list_favorites });
        } catch (e) {
          console.log(e);
        }
      },
      deleteFavorites: async (id) => {
        let api = url + "/api/favorites/" + id;
        try {
          await fetch((api), {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
        getActions().getFavorites()
        } catch (e) {
          console.log(e);
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
