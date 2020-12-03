const express = require('express');

const server = express();

server.use(express.json());

//Constante que salva nossos cursos
const cursos = ['NodeJS', 'JavaScript', 'ReactNative'];


//Middleware global
server.use((req, res, next) => {
  console.log(`URL CHAMADA ${req.url}`);
  return next();
})

//Middleware para verificar se o valor de "name" existe e é diferente de vazio
function checkCurso(req, res, next) {
  if (!req.body.name || req.body.name.length <= 0) {
    return res.status(400).json({ error: "Nome do curso é obrigatorio" });
  }

  return next();
}

//Middleware para verificar se o valor passado pelo index existe no meu Array
function checkIndexCurso(req, res, next) {
  const curso = cursos[req.params.index];
  if (!curso) {
    return res.status(400).json({ error: "Curso não existe" });
  }

  return next();
}

//Requisição GET pegando todos os cursos
server.get('/cursos', (req, res) => {
  return res.json(cursos)
});

//Requisição GET pegando um único curso pela posição do Array
server.get('/cursos/:index', checkIndexCurso, (req, res) => {
  const { index } = req.params
  return res.json(cursos[index]);
});

//Requisição POST salvando um curso em nosso Array
server.post('/cursos', checkCurso, (req, res) => {
  const { name } = req.body;
  cursos.push(name);

  return res.json(cursos);
});

//Requisição PUT para editar um curso em nosso Array
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name;

  return res.json(cursos);
});

//Requisição DELETE para deletar um curso em nosso Array
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
  const { index } = req.params;

  cursos.splice(index, 1);
  return res.json({ message: 'Curso deletado com sucesso!' });
})







server.listen(3000);