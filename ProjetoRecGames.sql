use Games 

create table Jogos (
    ID int identity(1,1) primary key, -- Chave primária com auto incremento
    Nome_Do_Jogo nvarchar(255) not null, -- Nome do jogo (obrigatório)
    Genero nvarchar(100) not null,       -- Gênero do jogo (obrigatório)
    Plataforma nvarchar(100) not null,  -- Plataforma do jogo (obrigatório)
    Data_lancamento date not null,      -- Data de lançamento (obrigatório)
)

create table Lista_Desejos (
  ID_Lista int identity(1,1) primary key, 
  ID_Jogo int not null,
  Email_interessado nvarchar(255),
  constraint FK_Lista_Desejos_Jogos foreign key (ID_Jogo) references Jogos(ID) -- Chave estrangeira
  )

select * from Jogos
select * from Lista_Desejos

insert into Jogos (Nome_Do_Jogo, Genero, Plataforma, Data_lancamento)
values 
('The Legend of Zelda: Breath of the Wild', 'Aventura', 'Nintendo Switch', '2017-03-03'),
('God of War', 'Ação/Aventura', 'PlayStation', '2018-04-20'),
('Minecraft', 'Sandbox', 'Multiplataforma', '2011-11-18'), 
('Cyberpunk 2077', 'RPG', 'PC/Console', '2020-12-10');


insert into Lista_Desejos (ID_Jogo,Email_interessado)
values (1, 'JoaoDoCarmo@gmail.com'),
       (2, 'AmandaFernandes@gmail.com'),
       (3, 'CarlaSouza@gmail.com')



