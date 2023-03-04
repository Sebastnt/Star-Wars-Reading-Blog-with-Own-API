const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			favorites:[]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			addFavorites : ( name ) => {
				if (getStore().favorites.includes(name) === false)  {
					let tempFavorites = [...getStore().favorites];
					tempFavorites.push(name)
					setStore( {favorites: tempFavorites} );
				}
			},
			deleteFavorites : (item) => {
				let removeList = getStore().favorites.filter((favorite) => favorite !== item);
				setStore( {favorites : removeList} );
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			getCharacters : async (id) => {
				let url = 'https://swapi.dev/api/people';
				if ( id ) {
					url = `https://swapi.dev/api/people/${id}`
				}
				try {
					const resp = await fetch(url)
					const data = await resp.json();
					const results = data;
					return results;
				}catch(e) {
					console.log("fallo mi llamada")
				}
			},
			getPlanets : async (id) => {
				let url = 'https://swapi.dev/api/planets';
				if ( id ) {
					url = `https://swapi.dev/api/planets/${id}`
				}
				try {
					const resp = await fetch(url)
					const data = await resp.json();
					const results = data;
					return results;
				}catch(e) {
					console.log("fallo mi llamada")
				}
			},
			getFilms : async (id) => {
				let url = 'https://swapi.dev/api/films';
				if ( id ) {
					url = `https://swapi.dev/api/films/${id}`
				}
				try {
					const resp = await fetch(url)
					const data = await resp.json();
					const results = data;
					return results;
				}catch(e) {
					console.log("fallo mi llamada")
				}
			},
			getUser: () => {
				fetch("https://3000-4geeksacade-flaskresthe-7irx0lx5ymf.ws-us89.gitpod.io/user")
				.then(resp => resp.json())
				.then(data => 
					{
						setStore( {user:data.list_people} )
					})
			},
			getToken: async ({ email, password }) => {
				try {
					// fetching data from the backend
					const resp = await fetch("https://3000-4geeksacade-flaskresthe-7irx0lx5ymf.ws-us89.gitpod.io/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify( { "email": email, "password": password } ),
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
			}
		}
	};
};

export default getState;
