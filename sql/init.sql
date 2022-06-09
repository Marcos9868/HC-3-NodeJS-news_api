CREATE TABLE IF NOT EXISTS categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS noticia (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  conteudo TEXT NULL
);

INSERT INTO categorias (nome) VALUES ('TV News');

INSERT INTO noticia (titulo, conteudo) VALUES ('Best TV show of all time', 'Its Supernatural Series');