const koaCors = require('@koa/cors');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const storage = require('node-persist');
const app = new Koa();
app.use(koaCors())
app.use(bodyParser())
const router = new Router()
// TODO : Installer node-persist
// TODO 2 : Ameliorer le Todo Liste (exemple : champ input pour un label, checkbox pour le completed => implémentation du patch)


const initStorage = async () => {
  await storage.init();
};

const setLocalStorage = async () => {
  try {
    await storage.setItem('todos', todoList);
    console.log(await storage.getItem('todos'));
  } catch (e) {
    console.error('************ERROR****', e);
  }
};

const start = async () => {
  await initStorage();
  await setLocalStorage();
};

start();

const todoList = [
  {
  id : 1,
  todo: 'Regarder l\'euro',
  completed : true,
  userId: 1
}
]

router.get('/todos', (ctx) => {
  ctx.body = {
    todos : todoList
}
;})


app.use(router.routes())

router.post('/todos', (ctx) => {
  const { todo, completed, userId }  = ctx.request.body
  const newTodo = { todo, completed, userId } 

if(!todo || todo === '') {
  ctx.throw(403, 'L \'attribut todo ne doit pas etre vide')
} 



todoList.push({
  id: todoList.length + 1,
  ...newTodo
})
ctx.body = null
console.log('************ctx.request.body post', ctx.request.body)
})


router.patch('/todos/:id', (ctx) => {
  const { id } = ctx.params
console.log('************id PATCH', id)
})



const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

