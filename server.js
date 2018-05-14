const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();


const hostname = '127.0.0.1';
const PORT =  process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [
	{id: 1, name: 'Oscar', image:"https://firebasestorage.googleapis.com/v0/b/simpleblog-1871d.appspot.com/o/profile_images%2FUlDBFqfxZgMktxNRopB11Tncmdq2.jpg?alt=media&token=16eb514d-c49a-4756-924a-fa13b6b1186d"},
	{id: 2, name: 'Juan', image: "https://firebasestorage.googleapis.com/v0/b/simpleblog-1871d.appspot.com/o/profile_images%2FYb8ZMETCrSVJ09WuNBlrZRTupRJ2.jpg?alt=media&token=650eeb37-8ea5-419b-b073-66821d183a87"},
	{id: 3, name: 'Marcos', image: "https://firebasestorage.googleapis.com/v0/b/simpleblog-1871d.appspot.com/o/profile_images%2FVo7Ma0qFK3ZvuVd8q2lrrwTvPZF3.jpg?alt=media&token=f74c7c68-35a6-43ef-9bd5-427fca7530fc"},
	{id: 4, name: 'Jonathan', image: "https://firebasestorage.googleapis.com/v0/b/simpleblog-1871d.appspot.com/o/profile_images%2FotuZbS0DEkhbbSu7LS94ZTvTyVs1.jpg?alt=media&token=71f45a84-991b-4638-b0a8-9450949a4fb2"},
	{id: 5, name: 'Cristina', image: "https://firebasestorage.googleapis.com/v0/b/simpleblog-1871d.appspot.com/o/profile_images%2FUlDBFqfxZgMktxNRopB11Tncmdq2.jpg?alt=media&token=16eb514d-c49a-4756-924a-fa13b6b1186d"},
	{id: 6, name: 'Carlos', image: "https://firebasestorage.googleapis.com/v0/b/simpleblog-1871d.appspot.com/o/profile_images%2FqPlz9A7gogYn3V8YKvbnW7sUyzr2.jpg?alt=media&token=9f0fbcf2-eb54-4bb3-86f1-4a15085b28a7"},
	{id: 7, name: 'Adriana', image: "https://firebasestorage.googleapis.com/v0/b/simpleblog-1871d.appspot.com/o/profile_images%2FotuZbS0DEkhbbSu7LS94ZTvTyVs1.jpg?alt=media&token=71f45a84-991b-4638-b0a8-9450949a4fb2"}
];


let posts = [
	{id: 1, title: 'Gears of war', user_id: 1, description: 'un juego de epic games', timestamp: 1516851416606, image: 'https://firebasestorage.googleapis.com/v0/b/simpleblog-1871d.appspot.com/o/Blog_Images%2FCGKK3HJ6KMVNO0GK.jpg?alt=media&token=aafb884b-47f8-48fc-904e-3268e771312e'},
	{id: 2, title: 'Halo 2', user_id: 1, description: 'un juego de bungie microsoft', timestamp: 1516851414555, image: 'https://firebasestorage.googleapis.com/v0/b/simpleblog-1871d.appspot.com/o/Blog_Images%2F19LX4W7TMCTRSGWXOC.jpg?alt=media&token=cf18d996-dbef-44a3-b6d6-a4214789c7ca'},
	{id: 3, title: 'Dark souls', user_id: 2, description: 'un juego de From Software', timestamp: 16551244775, image: 'https://firebasestorage.googleapis.com/v0/b/simpleblog-1871d.appspot.com/o/Blog_Images%2F87GAL5E0QQUFAPQF.jpg?alt=media&token=0c4d4939-888c-419f-95de-80e8cd727654'},
	{id: 4, title: 'Fifa 18', user_id: 2, description: 'un juego de Electronic Arts', timestamp: 16551249595, image: 'https://www.3djuegos.com/28129/fifa-18/'},
	{id: 5, title: 'PES 2018', user_id: 3, description: 'mejor es el fifa xdddd', timestamp: 1655122365, image: 'https://http2.mlstatic.com/pro-evolution-soccer-2018-pes-18-pc-juego-original-espanol-D_NQ_NP_978734-MLU25947499996_092017-F.jpg'},
	{id: 6, title: 'God of war', user_id: 3, description: 'un juego de Santa monica Studios', timestamp: 1655181256, image: 'https://d1pqlgpcx1bu0k.cloudfront.net/static/img/GOW-OG-image.jpg'},
	{id: 7, title: 'Call of duty', user_id: 4, description: 'un juego de ubisoft', timestamp: 1655128781, image: 'https://www.callofduty.com/content/dam/atvi/callofduty/wwii/home/Stronghold_Metadata_Image.jpg'},
	{id: 8, title: 'Horizont zero dawn', user_id: 4, description: 'un juego de Guerrilla games', timestamp: 16551244775, image: 'https://vignette.wikia.nocookie.net/doblaje/images/d/d4/Horizon-zero-dawn-box-art.jpg/revision/latest?cb=20170305150329&path-prefix=es'},
	{id: 9, title: 'Bloodborne', user_id: 5, description: 'un juego de From software', timestamp: 1451244775, image: 'https://i11c.3djuegos.com/juegos/11033/project_beast/fotos/ficha/project_beast-2739558.jpg'},
	{id: 10, title: 'Forza Horizont', user_id: 5, description: 'un juego arcade de automoviles', timestamp: 1451244487, image: 'https://i11c.3djuegos.com/juegos/11033/project_beast/fotos/ficha/project_beast-2739558.jpg'},
	{id: 11, title: 'CupHead', user_id: 6, description: 'Uno de los mejores juegos de 2017', timestamp: 1655127842, image: 'https://store-images.s-microsoft.com/image/apps.37905.13670972585585116.7f29dc82-c969-4e89-aaf9-7c0e3f52d890.2e5a9c92-cf00-4c10-ae28-264c564478c3?w=180&h=270&q=60'},
	{id: 12, title: 'Mortal Kombat X', user_id: 6, description: 'Que unas pelitas o miedo XDDD', timestamp: 16551244775, image: 'https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTcPtB7yoM7YK7A6apJBrPMegD8P2blNMraGLQbUdWTEHRXR7OCwpY0JAwdc1rRxRlfYhNIZGZ0sFeJFOJ2oID2EIs.7ojB9huGIxdKvnEqU0TvtCHWigh91tnXYEPR8KZnmfB6d3RZGxmJcW8tfX4_zSBw6P5z8WKzxrdwuEUs9PA-&w=200&h=300&format=jpg'},
	{id: 13, title: 'FarCry 5', user_id: 7, description: 'Mundo abierto guerra civil', timestamp: 16551244775, image: 'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/8d19ec52dea34f25b1611db2f943ff0f_Medium.png'},
	{id: 14, title: 'Fornite', user_id: 7, description: 'Un juego del estilo Battleground', timestamp: 16551244775, image: 'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/8d19ec52dea34f25b1611db2f943ff0f_Medium.png'},
	{id: 15, title: 'PUBG', user_id: 8, description: 'Prefiero este al fornite', timestamp: 16551244775, image: 'https://firebasestorage.googleapis.com/v0/b/simpleblog-1871d.appspot.com/o/Blog_Images%2F87GAL5E0QQUFAPQF.jpg?alt=media&token=0c4d4939-888c-419f-95de-80e8cd727654'},
	{id: 16, title: 'Resident Evil 7', user_id: 8, description: 'Que susto se pasa con este juegazo', timestamp: 16551244775, image: 'https://s3.gaming-cdn.com/images/products/1568/271x377/1568.jpg'}
]

var comments = [
	
	{id: 1, id_post: 1, id_user: 1, comment: 'Que chimba de juego', timestamp: 1564488112},
	{id: 2, id_post: 2, id_user: 2, comment: 'Invitara a jugar', timestamp: 1564488112},
	{id: 3, id_post: 1, id_user: 3, comment: 'Parce cuando un pieder paga', timestamp: 1564487941},
	{id: 4, id_post: 3, id_user: 3, comment: 'que juego tan dificil pero lo disfrute', timestamp: 1564487941},
	{id: 5, id_post: 2, id_user: 1, comment: 'Presteme ese juego', timestamp: 1567848122},
	{id: 6, id_post: 16, id_user: 6, comment: 'Yo no lo he podido jugar aun', timestamp: 1564484612},
	{id: 7, id_post: 4, id_user: 7, comment: 'Es tambien para PS4?', timestamp: 1564487632},
	{id: 8, id_post: 3, id_user: 2, comment: 'Hechemos un PVP', timestamp: 1564412345},
	{id: 9, id_post: 1, id_user: 4, comment: 'Unas partiditas o que?', timestamp: 1564465412},
	{id: 10, id_post: 10, id_user: 7, comment: 'No me parecio muy bueno', timestamp: 1564489874},
	{id: 11, id_post: 1, id_user: 5, comment: 'Que juego tan largo', timestamp: 1564486541},
	{id: 12, id_post: 16, id_user: 3, comment: 'Uy que miedo parce', timestamp: 1564483214}
	
]

let likes = [
	
	{id_post: 1, id_user: 1, like: true},
	{id_post: 1, id_user: 2, like: true},
	{id_post: 2, id_user: 7, like: false},
	{id_post: 2, id_user: 8, like: true},
	{id_post: 3, id_user: 1, like: false},
	{id_post: 3, id_user: 5, like: true},
	{id_post: 4, id_user: 1, like: true},
	{id_post: 4, id_user: 2, like: true},
	{id_post: 11, id_user: 2, like: true},
	{id_post: 15, id_user: 1, like: false},
	{id_post: 13, id_user: 1, like: true},
	{id_post: 14, id_user: 7, like: true},
	{id_post: 14, id_user: 3, like: true},
	{id_post: 11, id_user: 1, like: true},
	{id_post: 12, id_user: 2, like: true},
	{id_post: 15, id_user: 7, like: false}
	
]


let favorites = [
	{id_user: 1, id_post:1},
	{id_user: 1, id_post:2},
	{id_user: 1, id_post:5},
	{id_user: 1, id_post:11},
	{id_user: 2, id_post:1},
	{id_user: 2, id_post:2},
	{id_user: 5, id_post:11},
	{id_user: 5, id_post:16},
	{id_user: 5, id_post:15},
	{id_user: 5, id_post:12},
	{id_user: 5, id_post:9},
	{id_user: 6, id_post:4},
	{id_user: 6, id_post:5},
	{id_user: 6, id_post:8},
	{id_user: 3, id_post:8},
	{id_user: 3, id_post:2},
	{id_user: 3, id_post:3},
	{id_user: 3, id_post:1}
]

app.get('/', (req, res) => {
	res.status(200).send("welcome to API REST");
})

app.get('/users', (req, res) => {
	res.send(users);
})

app.get('/posts', (req, res) => {
	res.send(posts);
})

app.get('/comments', (req, res) => {
	res.send(comments);
})

app.get('/likes', (req, res) => {
	res.send(likes);
})

app.get('/favorites', (req, res) => {
	res.send(favorites);
})

app.post('/users', (req, res) => {
	let data = req.query;

	// El id sera igual a la longitud de arreglo + 1
	let id = users.length + 1;

	// Creo un nuevo objeto con los datos enviados por el usuario
	let newUser = {id: id, name: data.user_name, image: data.user_image};

	users.push(newUser);
	res.send("New user added");
})



app.post('/posts', (req, res) => {
	let data = req.query;

	// El id sera igual a la longitud de arreglo + 1
	let id = posts.length + 1;

	// Creo un nuevo objeto con los datos enviados por el usuario
	let newPost = {id: id, title: data.post_title, user_id: data.post_user_id, description: data.post_description, timestamp: data.post_timestamp, image: data.post_image};

	posts.push(newPost);
	res.send("New Post added");
})

app.post('/comments', (req, res) => {
	let data = req.query;

	// El id sera igual a la longitud de arreglo + 1
	let id = comments.length + 1;

	// Creo un nuevo objeto con los datos enviados por el usuario
	let newComment = {id: id, id_post: data.comment_id_post, id_user: data.comment_id_user, comment: data.comment_comment, timestamp: data.comment_timestamp};

	comments.push(newComment);
	res.send("New Comment Added");
})

app.post('/likes', (req, res) => {
	let data = req.query;

	// El id sera igual a la longitud de arreglo + 1
	let id = likes.length + 1;

	// Creo un nuevo objeto con los datos enviados por el usuario
	let newLike = {id_post: data.like_id_post, id_user: data.like_id_user, like: data.like_like};

	comments.push(newLike);
	res.send("New Like Added");
})

app.post('/favorites', (req, res) => {
	let data = req.query;

	// El id sera igual a la longitud de arreglo + 1
	let id = favorites.length + 1;

	// Creo un nuevo objeto con los datos enviados por el usuario
	let newFavorite = {id_user: data.favorite_id_user, id_post: data.favorite_id_post};

	comments.push(newFavorite);
	res.send("New Favorite Added");
})



app.patch('/users/:id', (req, res) => {
	let params = req.params;
	let data = req.query;
	let id = parseInt(params.id) + 1;

	// Creo un nuevo objeto con los datos enviados por el usuario
	let newUser = {id: id, name: data.user_name, image: data.user_image};

	users[params.id] = newUser;
	res.send("User Updated");
})


app.patch('/posts/:id', (req, res) => {
	let params = req.params;
	let data = req.query;
	let id = parseInt(params.id) + 1;

	// Creo un nuevo objeto con los datos enviados por el usuario
	let newPost = {id: id, title: data.post_title, user_id: data.post_user_id, description: data.post_description, timestamp: data.post_timestamp, image: data.post_image};

	posts[params.id] = newPost;
	res.send("Post Updated");
})


app.patch('/comments/:id', (req, res) => {
	let params = req.params;
	let data = req.query;
	let id = parseInt(params.id) + 1;

	// Creo un nuevo objeto con los datos enviados por el usuario
	let newComment = {id: id, id_post: data.comment_id_post, id_user: data.comment_id_user, comment: data.comment_comment, timestamp: data.comment_timestamp};

	comments[params.id] = newComment;
	res.send("Comment Updated");
})


app.delete('/users/:id', (req, res) => {
	let params = req.params;
	users.splice(params.id, 1);
	res.send("User delete");
})

app.delete('/posts/:id', (req, res) => {
	let params = req.params;
	posts.splice(params.id, 1);
	res.send("Post delete");
})

app.delete('/comments/:id', (req, res) => {
	let params = req.params;
	comments.splice(params.id, 1);
	res.send("Comment delete");
})

http.createServer(app).listen(PORT, () => {
	console.log(`Server running at http://${hostname}:${PORT}/`);
})