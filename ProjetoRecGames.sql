use Games 

create table Jogos (
    ID int identity(1,1) primary key, -- Chave prim�ria com auto incremento
    Nome_Do_Jogo nvarchar(255) not null, -- Nome do jogo (obrigat�rio)
    Genero nvarchar(100) not null,       -- G�nero do jogo (obrigat�rio)
    Plataforma nvarchar(100) not null,  -- Plataforma do jogo (obrigat�rio)
    Data_lancamento date not null,      -- Data de lan�amento (obrigat�rio)
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
('God of War', 'A��o/Aventura', 'PlayStation', '2018-04-20'),
('Minecraft', 'Sandbox', 'Multiplataforma', '2011-11-18'), 
('Cyberpunk 2077', 'RPG', 'PC/Console', '2020-12-10');


insert into Lista_Desejos (ID_Jogo,Email_interessado)
values (1, 'JoaoDoCarmo@gmail.com'),
       (2, 'AmandaFernandes@gmail.com'),
       (3, 'CarlaSouza@gmail.com')



