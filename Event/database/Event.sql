DO
$do$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'Event') THEN
        CREATE DATABASE "Event";
    END IF;
END
$do$;

DO
$do$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'postgres') THEN
        CREATE ROLE postgres WITH LOGIN PASSWORD '12345678';
    END IF;
END
$do$;

GRANT ALL PRIVILEGES ON DATABASE "Event" TO postgres;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO
$do$
BEGIN
CREATE TABLE E_Client (
    idClient SERIAL PRIMARY KEY,
    clientUuid UUID DEFAULT uuid_generate_v4 () NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    refreshToken VARCHAR(1024),
    isActive BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    is_staff BOOLEAN DEFAULT FALSE,
    is_superuser BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_ProfileClient (
    idProfileClient SERIAL PRIMARY KEY,
    idClient INT,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(20),
    dni VARCHAR(20),
    bio VARCHAR(255),
    avatarUrl VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_Organizer (
    idOrg SERIAL PRIMARY KEY,
    orgUuid UUID DEFAULT uuid_generate_v4() NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    NIF VARCHAR(20) UNIQUE NOT NULL,
    refreshToken VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO
    E_Organizer (orgUuid, email, password, NIF)
VALUES (
        '606edef0-4cc3-4e0f-a38b-65c7aa08612e',
        'yomogan@gmail.com',
        '$2y$10$pSmja4uz6o4a1k/BECb7GevuvNxZQl85mcUtFrdygM3GaYgSGcsFe',
        '123473540Z'
    );
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_ProfileOrganizer (
    idProfileOrg SERIAL PRIMARY KEY,
    idOrg INT,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    urlLogo VARCHAR(255),
    description VARCHAR(255),
    urlWeb VARCHAR(255),
    urlImage VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO E_ProfileOrganizer (idOrg, name, address,urlLogo,description,urlWeb,urlImage)
VALUES 
    (1, 'Madrid Eventos Sostenibles', 'Calle Mayor 10, Madrid', '\assets\e_img\organizers\01.webp', 'Organización de eventos eco-friendly en Madrid.', 'https://madridsostenible.com', 'https://example.com/images/madrid_evento.jpg'),
    (2, 'Barcelona Green Events', 'Avinguda Diagonal 250, Barcelona', '\assets\e_img\organizers\02.webp', 'Eventos sostenibles y tecnológicos en Barcelona.', 'https://barcelonagreenevents.com', 'https://example.com/images/barcelona_evento.jpg'),
    (3, 'Valencia EcoFest', 'Carrer de Colom 45, Valencia', '\assets\e_img\organizers\03.webp', 'Festivales y ferias ecológicas en Valencia.', 'https://valenciaecofest.com', 'https://example.com/images/valencia_evento.jpg'),
    (4, 'Sevilla Verde Eventos', 'Calle Betis 12, Sevilla', '\assets\e_img\organizers\04.webp', 'Organización de eventos sostenibles en Sevilla.', 'https://sevillaverdeeventos.com', 'https://example.com/images/sevilla_evento.jpg'),
    (5, 'Bilbao SustainaFest', 'Gran Vía 85, Bilbao', '\assets\e_img\organizers\05.webp', 'Eventos y conferencias ecológicas en Bilbao.', 'https://bilbaosustainafest.com', 'https://example.com/images/bilbao_evento.jpg');

END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_Admin (
    idAdmin SERIAL PRIMARY KEY,
    adminUuid UUID DEFAULT uuid_generate_v4() NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_ProfileAdmin (
    idProfileAdmin SERIAL PRIMARY KEY,
    idAdmin INT,
    username VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(20),
    avatarUrl VARCHAR(255),
    bio VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_Client (
    idClient SERIAL PRIMARY KEY,
    clientUuid UUID DEFAULT uuid_generate_v4 () NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    refreshToken VARCHAR(1024),
    isActive BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    is_staff BOOLEAN DEFAULT FALSE,
    is_superuser BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_ProfileClient (
    idProfileClient SERIAL PRIMARY KEY,
    idClient INT,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(20),
    dni VARCHAR(20),
    bio VARCHAR(255),
    avatarUrl VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO
    P_ProfileClient (
        idClient,
        firstName,
        lastName,
        phoneNumber,
        dni,
        bio,
        avatarUrl
    )
VALUES (
        1,
        'Lucía',
        'Martínez',
        '+34 612345678',
        '12345678A',
        'Lover of animals and nature.',
        'https://i.pravatar.cc/150?img=1'
    ),
    (
        2,
        'Carlos',
        'Gómez',
        '+34 699887766',
        '23456789B',
        'Passionate about volunteering and helping causes.',
        'https://i.pravatar.cc/150?img=2'
    ),
    (
        3,
        'Elena',
        'Ruiz',
        '+34 654321987',
        '34567890C',
        'Veterinary student and pet enthusiast.',
        'https://i.pravatar.cc/150?img=3'
    ),
    (
        4,
        'Diego',
        'López',
        '+34 633221144',
        '45678901D',
        'Always ready to support animal shelters.',
        'https://i.pravatar.cc/150?img=4'
    ),
    (
        5,
        'María',
        'Fernández',
        '+34 622334455',
        '56789012E',
        'Dog mom and coffee addict.',
        'https://i.pravatar.cc/150?img=5'
    ),
    (
        6,
        'Javier',
        'Sánchez',
        '+34 611223344',
        '67890123F',
        'Enjoys hiking with rescued dogs.',
        'https://i.pravatar.cc/150?img=6'
    ),
    (
        7,
        'Laura',
        'Moreno',
        '+34 698765432',
        '78901234G',
        'Creative spirit with a soft spot for cats.',
        'https://i.pravatar.cc/150?img=7'
    ),
    (
        8,
        'Pablo',
        'Jiménez',
        '+34 655443322',
        '89012345H',
        'Proud foster parent for abandoned pets.',
        'https://i.pravatar.cc/150?img=8'
    ),
    (
        9,
        'Sara',
        'Navarro',
        '+34 677889900',
        '90123456J',
        'Loves all things fluffy and kind-hearted.',
        'https://i.pravatar.cc/150?img=9'
    ),
    (
        10,
        'Álvaro',
        'Romero',
        '+34 699112233',
        '01234567K',
        'Techie who volunteers on weekends.',
        'https://i.pravatar.cc/150?img=10'
    );
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_Organizer (
    idOrg SERIAL PRIMARY KEY,
    orgUuid UUID DEFAULT uuid_generate_v4() NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    NIF VARCHAR(20) UNIQUE NOT NULL,
    refreshToken VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO P_Organizer (orgUuid, email, password, NIF)
VALUES 
    (
    '606edef0-4cc3-4e0f-a38b-65c7aa08612e',
    'yomogan@gmail.com',
    '$2y$10$pSmja4uz6o4a1k/BECb7GevuvNxZQl85mcUtFrdygM3GaYgSGcsFe',
    '123473540Z');
END
$do$;



DO
$do$
BEGIN
CREATE TABLE P_ProfileOrganizer (
    idProfileOrg SERIAL PRIMARY KEY,
    idOrg INT,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    urlLogo VARCHAR(255),
    description VARCHAR(255),
    urlWeb VARCHAR(255),
    urlImage VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO P_ProfileOrganizer (idOrg, name, address,urlLogo,description,urlWeb,urlImage)
VALUES 
    (1,'Patas y Garras al Rescate','Calle de Alcalá, 123, Madrid','\assets\p_img\organizers\01.webp','Dedicado a rescatar y rehabilitar animales abandonados.','https://pawsclawsrescue.org','https://example.com/images/paws_claws_rescue.jpg'),
    (2,'Guardianes de la Vida Silvestre','Avenida Diagonal, 456, Barcelona','\assets\p_img\organizers\02.webp','Protegiendo la vida silvestre en peligro a través de esfuerzos de conservación.','https://wildlifeguardians.net','https://example.com/images/wildlife_guardians.jpg'),
    (3,'Refugio Colas Felices','Calle de la Paz, 789, Valencia','\assets\p_img\organizers\03.webp','Proporcionando refugio y cuidado para mascotas callejeras y sin hogar.','https://happytailsshelter.com','https://example.com/images/happy_tails_shelter.jpg'),
    (4,'Fundación Amigos Peludos','Calle Sierpes, 321, Sevilla','\assets\p_img\organizers\04.webp','Abogando por los derechos y el bienestar animal a través de programas de educación y adopción.','https://furryfriendsfoundation.org','https://example.com/images/furry_friends_foundation.jpg'),
    (5,'Esperanza para Patas','Gran Vía, 654, Bilbao','\assets\p_img\organizers\05.webp','Rescatando animales de situaciones peligrosas y encontrándoles hogares amorosos.','https://hopeforpaws.org','https://example.com/images/hope_for_paws.jpg');

END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_Admin (
    idAdmin SERIAL PRIMARY KEY,
    adminUuid UUID DEFAULT uuid_generate_v4() NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_ProfileAdmin (
    idProfileAdmin SERIAL PRIMARY KEY,
    idAdmin INT,
    username VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(20),
    avatarUrl VARCHAR(255),
    bio VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TYPE statusEvent AS ENUM ('Preparing', 'Created', 'InProgress', 'Finished', 'Cancelled');
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_Events (
    idEvent SERIAL PRIMARY KEY,
    eventSlug VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    location VARCHAR(255),
    position VARCHAR(255),
    description VARCHAR(255),
    status statusEvent DEFAULT 'Preparing',
    urlImage VARCHAR(255)[],
    urlPoster VARCHAR(255),
    idOrg INT,
    idCategory INT,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO E_Events (eventSlug, name, startDate, endDate, location, position, description, status, urlImage, urlPoster, idOrg, idCategory, createdAt, updatedAt)
VALUES
    -- Gaming
    ('salon-del-manga', 'Salón del Manga', '2025-03-01', '2025-03-03', 'Barcelona', '[41.3719399, 2.1517878]', 
    'Evento de cultura manga y anime, con actividades, exposiciones y ventas de merchandising en Fira Barcelona.', 
    'Preparing', ARRAY['\assets\e_img\events\01_Gaming\01_SalonDelManga\01.webp', '\assets\e_img\events\01_Gaming\01_SalonDelManga\02.webp'], 
    '\assets\e_img\events\01_Gaming\01_SalonDelManga\03.webp', 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('e-sports-summit', 'E-Sports Summit', '2025-04-15', '2025-04-17', 'Madrid', '[40.4130741, -3.738214]', 
    'Competición y charlas de e-sports con los mejores equipos y expertos en el Madrid Arena.', 
    'Preparing', ARRAY['\assets\e_img\events\01_Gaming\02_ESportsSummit\01.webp', '\assets\e_img\events\01_Gaming\02_ESportsSummit\02.webp'], 
    '\assets\e_img\events\01_Gaming\02_ESportsSummit\03.webp', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('retro-gaming-expo', 'RetroGaming Expo', '2025-05-10', '2025-05-12', 'Madrid', '[40.4663707, -3.617214]', 
    'Celebración de videojuegos retro, con consolas clásicas y exposiciones en IFEMA.', 
    'Preparing', ARRAY['\assets\e_img\events\01_Gaming\03_RetroGamingExpo\01.webp', '\assets\e_img\events\01_Gaming\03_RetroGamingExpo\02.webp'], 
    '\assets\e_img\events\01_Gaming\03_RetroGamingExpo\03.webp', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('twitchcon', 'TwitchCon', '2025-06-01', '2025-06-03', 'Valencia', '[39.5037246, -0.4285001]', 
    'Convención de creadores de contenido y streamers, con paneles y meet-ups en Feria Valencia.', 
    'Preparing', ARRAY['\assets\e_img\events\01_Gaming\04_TwitchCon\01.webp', '\assets\e_img\events\01_Gaming\04_TwitchCon\02.webp'], 
    '\assets\e_img\events\01_Gaming\04_TwitchCon\03.webp', 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('indie-game-festival', 'Indie Game Festival', '2025-07-20', '2025-07-22', 'Bilbao', '[43.2879511, -2.9902004]', 
    'Festival dedicado a los videojuegos independientes, presentando nuevos títulos en Bilbao Exhibition Centre.', 
    'Preparing', ARRAY['\assets\e_img\events\01_Gaming\05_IndieGameFestival\01.webp', '\assets\e_img\events\01_Gaming\05_IndieGameFestival\02.webp'], 
    '\assets\e_img\events\01_Gaming\05_IndieGameFestival\03.webp', 5, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Conferencias
    ('charlas-sobre-emprendimiento', 'Charlas sobre Emprendimiento', '2025-03-05', '2025-03-06', 'Madrid', '[40.4535126, -3.695031]', 
    'Charlas para fomentar el emprendimiento con destacados ponentes en el Palacio de Congresos de Madrid.', 
    'Preparing', ARRAY['\assets\e_img\events\02_Conferences\06_CharlaEmprendimiento\01.webp', '\assets\e_img\events\02_Conferences\06_CharlaEmprendimiento\02.webp'], 
    '\assets\e_img\events\02_Conferences\06_CharlaEmprendimiento\03.webp', 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('tedx-barcelona', 'TEDx Barcelona', '2025-03-20', '2025-03-21', 'Barcelona', '[41.41283, 2.21701]', 
    'Charlas inspiradoras con expertos de diversos campos en el CaixaForum de Barcelona.', 
    'Preparing', ARRAY['\assets\e_img\events\02_Conferences\07_TEDxBarcelona\01.webp', '\assets\e_img\events\02_Conferences\07_TEDxBarcelona\02.webp'], 
    '\assets\e_img\events\02_Conferences\07_TEDxBarcelona\03.webp', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('future-tech-talks', 'Future Tech Talks', '2025-04-01', '2025-04-02', 'Madrid', '[40.4535126, -3.695031]', 
    'Foro de innovación tecnológica con demostraciones y charlas en el Palacio de Congresos de Madrid.', 
    'Preparing', ARRAY['\assets\e_img\events\02_Conferences\08_FutureTechTalks\01.webp', '\assets\e_img\events\02_Conferences\08_FutureTechTalks\02.webp'], 
    '\assets\e_img\events\02_Conferences\08_FutureTechTalks\03.webp', 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('innovacion-y-sostenibilidad', 'Innovación y Sostenibilidad', '2025-04-15', '2025-04-16', 'Barcelona', '[41.3622375, 2.1056546]', 
    'Charlas sobre sostenibilidad e innovación en La Farga, LHospitalet, con enfoque en el futuro verde.', 
    'Preparing', ARRAY['\assets\e_img\events\02_Conferences\09_InnovacionSostenibilidad\01.webp', '\assets\e_img\events\02_Conferences\09_InnovacionSostenibilidad\02.webp'], 
    '\assets\e_img\events\02_Conferences\09_InnovacionSostenibilidad\03.webp', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('educacion-del-futuro', 'Educación del Futuro', '2025-05-10', '2025-05-11', 'Sevilla', '[37.4034746, -5.9331062]', 
    'Ideas para la educación del futuro, con expertos en tecnología educativa en el Palacio de Exposiciones.', 
    'Preparing', ARRAY['\assets\e_img\events\02_Conferences\10_EducacionFuturo\01.webp', '\assets\e_img\events\02_Conferences\10_EducacionFuturo\02.webp'], 
    '\assets\e_img\events\02_Conferences\10_EducacionFuturo\03.webp', 4, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Festivales
    ('beachsound-festival', 'BeachSound Festival', '2025-06-15', '2025-06-17', 'Valencia', '[39.4793904, -0.3237202]', 
    'Festival de música en la playa con artistas internacionales, celebrado en la Playa de la Malvarrosa, Valencia.', 
    'Preparing', ARRAY['\assets\e_img\events\03_Festivals\11_BeachSoundFestival\01.webp', '\assets\e_img\events\03_Festivals\11_BeachSoundFestival\02.webp'], 
    '\assets\e_img\events\03_Festivals\11_BeachSoundFestival\03.webp', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('primavera-sound', 'Primavera Sound', '2025-06-01', '2025-06-03', 'Barcelona', '[41.4121019, 2.2267862]', 
    'Festival de música alternativa con artistas de renombre, celebrado en el Parc del Fòrum de Barcelona.', 
    'Preparing', ARRAY['\assets\e_img\events\03_Festivals\12_PrimaveraSound\01.webp', '\assets\e_img\events\03_Festivals\12_PrimaveraSound\02.webp'], 
    '\assets\e_img\events\03_Festivals\12_PrimaveraSound\03.webp', 2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('rock-fest', 'Rock Fest', '2025-07-01', '2025-07-03', 'Barcelona', '[41.4577006, 2.1984599]', 
    'Festival de rock con bandas internacionales celebrado en Can Zam, Santa Coloma.', 
    'Preparing', ARRAY['\assets\e_img\events\03_Festivals\13_RockFest\01.webp', '\assets\e_img\events\03_Festivals\13_RockFest\02.webp'], 
    '\assets\e_img\events\03_Festivals\13_RockFest\03.webp', 2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('arenal-sound', 'Arenal Sound', '2025-07-20', '2025-07-22', 'Valencia', '[39.86566740613628, -0.0687278397811042]', 
    'Festival de música electrónica y pop celebrado en la Playa El Arenal de Burriana, Valencia.', 
    'Preparing', ARRAY['\assets\e_img\events\03_Festivals\14_ArenalSound\01.webp', '\assets\e_img\events\03_Festivals\14_ArenalSound\02.webp'], 
    '\assets\e_img\events\03_Festivals\14_ArenalSound\03.webp', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('bilbao-bbk-live', 'Bilbao BBK Live', '2025-07-25', '2025-07-27', 'Bilbao', '[43.2583792, -2.963529]', 
    'Festival de música en el monte celebrado en Kobetamendi, Bilbao.', 
    'Preparing', ARRAY['\assets\e_img\events\03_Festivals\15_BilbaoBBKLive\01.webp', '\assets\e_img\events\03_Festivals\15_BilbaoBBKLive\02.webp'], 
    '\assets\e_img\events\03_Festivals\15_BilbaoBBKLive\03.webp', 5, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Deportes
    ('competicion-mundial-de-futbol', 'Competición Mundial de Fútbol', '2025-06-10', '2025-06-20', 'Madrid', '[40.4530225, -3.687422]', 
    'Torneo mundial de fútbol celebrado en el Estadio Santiago Bernabéu, Madrid.', 
    'Preparing', ARRAY['\assets\e_img\events\04_Sports\16_CompeticionMundialFutbol\01.webp', '\assets\e_img\events\04_Sports\16_CompeticionMundialFutbol\02.webp'], 
    '\assets\e_img\events\04_Sports\16_CompeticionMundialFutbol\03.webp', 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('maraton-internacional', 'Maratón Internacional', '2025-03-20', '2025-03-20', 'Madrid', '[40.4669777, -3.6898498]', 
    'Maratón por el centro de Madrid, recorriendo puntos icónicos como el Paseo de la Castellana.', 
    'Preparing', ARRAY['\assets\e_img\events\04_Sports\17_MaratonInternacional\01.webp', '\assets\e_img\events\04_Sports\17_MaratonInternacional\02.webp'], 
    '\assets\e_img\events\04_Sports\17_MaratonInternacional\03.webp', 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('copa-de-baloncesto', 'Copa de Baloncesto', '2025-04-15', '2025-04-17', 'Sevilla', '[37.396597, -5.9645059]', 
    'Campeonato de baloncesto con equipos nacionales e internacionales en el Palacio de Deportes de Sevilla.', 
    'Preparing', ARRAY['\assets\e_img\events\04_Sports\18_CopaBaloncesto\01.webp', '\assets\e_img\events\04_Sports\18_CopaBaloncesto\02.webp'], 
    '\assets\e_img\events\04_Sports\18_CopaBaloncesto\03.webp', 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('vuelta-ciclista-a-espana', 'Vuelta Ciclista a España', '2025-08-01', '2025-08-21', 'Bilbao', '[43.2684285, -2.9340613]', 
    'Carrera ciclística por etapas que inicia en Bilbao y recorre distintas ciudades de España.', 
    'Preparing', ARRAY['\assets\e_img\events\04_Sports\19_VueltaCiclistaEspana\01.webp', '\assets\e_img\events\04_Sports\19_VueltaCiclistaEspana\02.webp'], 
    '\assets\e_img\events\04_Sports\19_VueltaCiclistaEspana\03.webp', 5, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('campeonato-de-surf', 'Campeonato de Surf', '2025-07-10', '2025-07-12', 'Valencia', '[39.4688989, -0.3227605]', 
    'Competición internacional de surf en la Playa del Cabanyal, Valencia.', 
    'Preparing', ARRAY['\assets\e_img\events\04_Sports\20_CampeonatoSurf\01.webp', '\assets\e_img\events\04_Sports\20_CampeonatoSurf\02.webp'], 
    '\assets\e_img\events\04_Sports\20_CampeonatoSurf\03.webp', 3, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Naturaleza
    ('dia-de-los-arboles', 'Día de los Árboles', '2025-04-01', '2025-04-01', 'Madrid', '[40.414946, -3.6832845]', 
    'Evento para plantar árboles y sensibilizar sobre el medio ambiente en el Parque del Retiro, Madrid.', 
    'Preparing', ARRAY['\assets\e_img\events\05_Nature\21_DiaArboles\01.webp', '\assets\e_img\events\05_Nature\21_DiaArboles\02.webp'], 
    '\assets\e_img\events\05_Nature\21_DiaArboles\03.webp', 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('picnic-en-el-bosque', 'Picnic en el Bosque', '2025-05-05', '2025-05-05', 'Bilbao', '[43.263576, -2.9176443]', 
    'Picnic familiar en la naturaleza, rodeado de vegetación en el Parque Etxebarria de Bilbao.', 
    'Preparing', ARRAY['\assets\e_img\events\05_Nature\22_PicnicBosque\01.webp', '\assets\e_img\events\05_Nature\22_PicnicBosque\02.webp'], 
    '\assets\e_img\events\05_Nature\22_PicnicBosque\03.webp', 5, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('ecoruta-infantil', 'EcoRuta Infantil', '2025-06-10', '2025-06-10', 'Barcelona', '[41.75726, 2.39944]', 
    'Ruta ecológica para niños por el Parque Natural del Montseny, con actividades educativas.', 
    'Preparing', ARRAY['\assets\e_img\events\05_Nature\23_EcoRutaInfantil\01.webp', '\assets\e_img\events\05_Nature\23_EcoRutaInfantil\02.webp'], 
    '\assets\e_img\events\05_Nature\23_EcoRutaInfantil\03.webp', 2, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('taller-de-compostaje', 'Taller de Compostaje', '2025-07-20', '2025-07-20', 'Valencia', '[39.4773309, -0.4088082]', 
    'Taller práctico sobre técnicas de compostaje en el Parque de Cabecera, Valencia.', 
    'Preparing', ARRAY['\assets\e_img\events\05_Nature\24_TallerCompostaje\01.webp', '\assets\e_img\events\05_Nature\24_TallerCompostaje\02.webp'], 
    '\assets\e_img\events\05_Nature\24_TallerCompostaje\03.webp', 3, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('actividades-familiares', 'Actividades Familiares', '2025-08-15', '2025-08-15', 'Sevilla', '[37.374771, -5.9887943]', 
    'Actividades para disfrutar en familia en el Parque de María Luisa, Sevilla.', 
    'Preparing', ARRAY['\assets\e_img\events\05_Nature\25_ActividadesFamiliares\01.webp', '\assets\e_img\events\05_Nature\25_ActividadesFamiliares\02.webp'], 
    '\assets\e_img\events\05_Nature\25_ActividadesFamiliares\03.webp', 4, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_Events (
    idEvent SERIAL PRIMARY KEY,
    eventSlug VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    location VARCHAR(255),
    position VARCHAR(255),
    description VARCHAR(255),
    status statusEvent DEFAULT 'Preparing',
    urlImage VARCHAR(255)[],
    urlPoster VARCHAR(255),
    idOrg INT,
    idCategory INT,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO P_Events (eventSlug, name, startDate, endDate, location, position, description, status, urlImage, urlPoster, idOrg, idCategory, createdAt, updatedAt)
VALUES
    -- Adopción Responsable
    ('jornada-de-adopcion-en-el-parque', 'Jornada de Adopción en el Parque', '2025-04-10', '2025-04-10', 'Madrid', '[40.414946, -3.6832845]',
    'Evento de adopción en el Parque del Retiro, Madrid. Conecta mascotas con familias responsables y participa en talleres informativos.', 
    'Preparing', ARRAY['\assets\p_img\events\01_AdopcionResponsable\01_JornadaAdopcionParque\01.webp', '\assets\p_img\events\01_AdopcionResponsable\01_JornadaAdopcionParque\02.webp'], 
    '\assets\p_img\events\01_AdopcionResponsable\01_JornadaAdopcionParque\03.webp', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('adopta-un-amigo', 'Adopta un Amigo', '2025-05-15', '2025-05-15', 'Madrid', '[40.414946, -3.6832845]',
    'Jornada de adopción con talleres sobre cuidados básicos en el Parque del Retiro, Madrid. Aprende cómo cuidar a tu nuevo amigo peludo.', 
    'Preparing', ARRAY['\assets\p_img\events\01_AdopcionResponsable\02_AdoptaAmigo\01.webp', '\assets\p_img\events\01_AdopcionResponsable\02_AdoptaAmigo\02.webp'], 
    '\assets\p_img\events\01_AdopcionResponsable\02_AdoptaAmigo\03.webp', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('feria-de-adopcion-solidaria', 'Feria de Adopción Solidaria', '2025-06-01', '2025-06-01', 'Barcelona', '[41.3627868, 1.7532117]',
    'Conoce animales que buscan hogar y disfruta de actividades familiares en el Centro Cívico de Barcelona.', 
    'Preparing', ARRAY['\assets\p_img\events\01_AdopcionResponsable\03_FeriaAdopcionSolidaria\01.webp', '\assets\p_img\events\01_AdopcionResponsable\03_FeriaAdopcionSolidaria\02.webp'], 
    '\assets\p_img\events\01_AdopcionResponsable\03_FeriaAdopcionSolidaria\03.webp', 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('dia-de-las-mascotas-sin-hogar', 'Día de las Mascotas sin Hogar', '2025-07-10', '2025-07-10', 'Valencia', '[39.4773309, -0.4088082]', 
    'Jornada de adopción con charlas y juegos en el Parque de Cabecera, Valencia. Conoce a tu nuevo compañero de vida.', 
    'Preparing', ARRAY['\assets\p_img\events\01_AdopcionResponsable\04_DiaMascotasSinHogar\01.webp', '\assets\p_img\events\01_AdopcionResponsable\04_DiaMascotasSinHogar\02.webp'], 
    '\assets\p_img\events\01_AdopcionResponsable\04_DiaMascotasSinHogar\03.webp', 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('encuentro-para-adopcion-responsable', 'Encuentro para Adopción Responsable', '2025-08-20', '2025-08-20', 'Sevilla', '[37.5207857, -5.9810981]', 
    'Promovemos la adopción y la tenencia responsable de mascotas en el Parque Municipal de Sevilla.', 
    'Preparing', ARRAY['\assets\p_img\events\01_AdopcionResponsable\05_EncuentroAdopcionResponsable\01.webp', '\assets\p_img\events\01_AdopcionResponsable\05_EncuentroAdopcionResponsable\02.webp'], 
    '\assets\p_img\events\01_AdopcionResponsable\05_EncuentroAdopcionResponsable\03.webp', 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Concienciación y Educación
    ('taller-de-tenencia-responsable', 'Taller de Tenencia Responsable', '2025-03-10', '2025-03-10', 'Madrid', '[40.414946, -3.6832845]',
    'Aprende sobre los cuidados básicos de los animales en el Centro Cultural de Madrid. Taller práctico y educativo.', 
    'Preparing', ARRAY['\assets\p_img\events\02_ConcienciacionEducacion\06_TallerTenenciaResponsable\01.webp', '\assets\p_img\events\02_ConcienciacionEducacion\06_TallerTenenciaResponsable\02.webp'], 
    '\assets\p_img\events\02_ConcienciacionEducacion\06_TallerTenenciaResponsable\03.webp', 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('charla-sobre-derechos-animales', 'Charla sobre Derechos Animales', '2025-03-20', '2025-03-20', 'Barcelona', '[41.3627868, 1.7532117]',
    'Explora la importancia de proteger los derechos de los animales en el Auditorio Nacional de Barcelona.', 
    'Preparing', ARRAY['\assets\p_img\events\02_ConcienciacionEducacion\07_CharlaDerechosAnimales\01.webp', '\assets\p_img\events\02_ConcienciacionEducacion\07_CharlaDerechosAnimales\02.webp'], 
    '\assets\p_img\events\02_ConcienciacionEducacion\07_CharlaDerechosAnimales\03.webp', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('jornada-infantil-de-concienciacion', 'Jornada Infantil de Concienciación', '2025-04-05', '2025-04-05', 'Valencia', '[39.4773309, -0.4088082]',
    'Actividades para niños enfocadas en el respeto animal en el Parque Infantil de Valencia.', 
    'Preparing', ARRAY['\assets\p_img\events\02_ConcienciacionEducacion\08_JornadaInfantilConcienciacion\01.webp', '\assets\p_img\events\02_ConcienciacionEducacion\08_JornadaInfantilConcienciacion\02.webp'], 
    '\assets\p_img\events\02_ConcienciacionEducacion\08_JornadaInfantilConcienciacion\03.webp', 3, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('seminario-de-bienestar-animal', 'Seminario de Bienestar Animal', '2025-05-12', '2025-05-12', 'Sevilla', '[37.5207857, -5.9810981]',
    'Talleres y ponencias sobre el bienestar animal en la Universidad Autónoma de Sevilla.', 
    'Preparing', ARRAY['\assets\p_img\events\02_ConcienciacionEducacion\09_SeminarioBienestarAnimal\01.webp', '\assets\p_img\events\02_ConcienciacionEducacion\09_SeminarioBienestarAnimal\02.webp'], 
    '\assets\p_img\events\02_ConcienciacionEducacion\09_SeminarioBienestarAnimal\03.webp', 4, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('exposicion-vida-silvestre', 'Exposición: Vida Silvestre', '2025-06-18', '2025-06-18', 'Bilbao', '[43.263576, -2.9176443]',
    'Exposición interactiva sobre la fauna silvestre en el Museo de Ciencias Naturales de Bilbao.', 
    'Preparing', ARRAY['\assets\p_img\events\02_ConcienciacionEducacion\10_ExposicionVidaSilvestre\01.webp', '\assets\p_img\events\02_ConcienciacionEducacion\10_ExposicionVidaSilvestre\02.webp'], 
    '\assets\p_img\events\02_ConcienciacionEducacion\10_ExposicionVidaSilvestre\03.webp', 5, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Recaudación de Fondos
    ('mercadillo-solidario', 'Mercadillo Solidario', '2025-05-01', '2025-05-01', 'Sevilla', '[37.3777773, -5.9865158]', 
    'Compra productos para apoyar a las protectoras locales en la Plaza de España, Sevilla. Habrá stands con artesanías y productos para mascotas.', 
    'Preparing', ARRAY['\assets\p_img\events\03_RecaudacionFondos\11_MercadilloSolidario\01.webp', '\assets\p_img\events\03_RecaudacionFondos\11_MercadilloSolidario\02.webp'], 
    '\assets\p_img\events\03_RecaudacionFondos\11_MercadilloSolidario\03.webp', 4, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('cena-benefica-para-animales', 'Cena Benéfica para Animales', '2025-06-15', '2025-06-15', 'Madrid', '[40.414946, -3.6832845]',
    'Cena temática para recaudar fondos en el Hotel Gran Palace de Madrid. Deliciosa comida y rifas para ayudar a los animales.', 
    'Preparing', ARRAY['\assets\p_img\events\03_RecaudacionFondos\12_CenaBeneficaAnimales\01.webp', '\assets\p_img\events\03_RecaudacionFondos\12_CenaBeneficaAnimales\02.webp'], 
    '\assets\p_img\events\03_RecaudacionFondos\12_CenaBeneficaAnimales\03.webp', 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('concierto-por-la-fauna', 'Concierto por la Fauna', '2025-07-08', '2025-07-08', 'Bilbao', '[43.263576, -2.9176443]',
    'Disfruta de música en vivo y ayuda a los animales en el Auditorio Ciudad de la Música, Bilbao.', 
    'Preparing', ARRAY['\assets\p_img\events\03_RecaudacionFondos\13_ConciertoPorFauna\01.webp', '\assets\p_img\events\03_RecaudacionFondos\13_ConciertoPorFauna\02.webp'], 
    '\assets\p_img\events\03_RecaudacionFondos\13_ConciertoPorFauna\03.webp', 5, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('rifa-solidaria', 'Rifa Solidaria', '2025-08-03', '2025-08-03', 'Valencia', '[39.4773309, -0.4088082]',
    'Participa en una rifa con increíbles premios para apoyar a las protectoras en el Centro Cívico de Valencia.', 
    'Preparing', ARRAY['\assets\p_img\events\03_RecaudacionFondos\14_RifaSolidaria\01.webp', '\assets\p_img\events\03_RecaudacionFondos\14_RifaSolidaria\02.webp'], 
    '\assets\p_img\events\03_RecaudacionFondos\14_RifaSolidaria\03.webp', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('subasta-de-arte-solidario', 'Subasta de Arte Solidario', '2025-09-12', '2025-09-12', 'Barcelona', '[41.3627868, 1.7532117]',
    'Subasta de arte a favor de los animales en la Galería de Arte de Barcelona. Obras únicas de artistas locales.', 
    'Preparing', ARRAY['\assets\p_img\events\03_RecaudacionFondos\15_SubastaArteSolidario\01.webp', '\assets\p_img\events\03_RecaudacionFondos\15_SubastaArteSolidario\02.webp'], 
    '\assets\p_img\events\03_RecaudacionFondos\15_SubastaArteSolidario\03.webp', 2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Actividades al Aire Libre con Mascotas
    ('caminata-solidaria', 'Caminata Solidaria', '2025-04-10', '2025-04-10', 'Barcelona', '[41.3631512, 2.1656148]', 
    'Disfruta de una caminata con tu mascota en Montjuïc, Barcelona, mientras apoyas a las protectoras locales.', 
    'Preparing', ARRAY['\assets\p_img\events\04_ActividadesAireLibreMascotas\16_CaminataSolidaria\01.webp', '\assets\p_img\events\04_ActividadesAireLibreMascotas\16_CaminataSolidaria\02.webp'], 
    '\assets\p_img\events\04_ActividadesAireLibreMascotas\16_CaminataSolidaria\03.webp', 2, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('concurso-de-habilidades-caninas', 'Concurso de Habilidades Caninas', '2025-05-20', '2025-05-20', 'Madrid', '[40.4296961, -3.7251884]', 
    'Muestra las habilidades de tu perro en este concurso divertido en el Parque del Oeste, Madrid.', 
    'Preparing', ARRAY['\assets\p_img\events\04_ActividadesAireLibreMascotas\17_ConcursoHabilidadesCaninas\01.webp', '\assets\p_img\events\04_ActividadesAireLibreMascotas\17_ConcursoHabilidadesCaninas\02.webp'], 
    '\assets\p_img\events\04_ActividadesAireLibreMascotas\17_ConcursoHabilidadesCaninas\03.webp', 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('carrera-con-perros', 'Carrera con Perros', '2025-06-01', '2025-06-01', 'Sevilla', '[37.3777773, -5.9865158]', 
    'Participa en una carrera solidaria con tu perro en el Parque Natural de Sevilla.', 
    'Preparing', ARRAY['\assets\p_img\events\04_ActividadesAireLibreMascotas\18_CarreraPerros\01.webp', '\assets\p_img\events\04_ActividadesAireLibreMascotas\18_CarreraPerros\02.webp'], 
    '\assets\p_img\events\04_ActividadesAireLibreMascotas\18_CarreraPerros\03.webp', 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('paseo-nocturno-con-mascotas', 'Paseo Nocturno con Mascotas', '2025-06-15', '2025-06-15', 'Valencia', '[39.4773309, -0.4088082]', 
    'Disfruta de un paseo nocturno con tu mascota por el Parque Natural del Turia, Valencia.', 
    'Preparing', ARRAY['\assets\p_img\events\04_ActividadesAireLibreMascotas\19_PaseoNocturnoMascotas\01.webp', '\assets\p_img\events\04_ActividadesAireLibreMascotas\19_PaseoNocturnoMascotas\02.webp'], 
    '\assets\p_img\events\04_ActividadesAireLibreMascotas\19_PaseoNocturnoMascotas\03.webp', 3, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('taller-de-socializacion-canina', 'Taller de Socialización Canina', '2025-07-05', '2025-07-05', 'Bilbao', '[43.263576, -2.9176443]', 
    'Aprende técnicas para mejorar la socialización de tu mascota en el Parque Central de Bilbao.', 
    'Preparing', ARRAY['\assets\p_img\events\04_ActividadesAireLibreMascotas\20_TallerSocializacionCanina\01.webp', '\assets\p_img\events\04_ActividadesAireLibreMascotas\20_TallerSocializacionCanina\02.webp'], 
    '\assets\p_img\events\04_ActividadesAireLibreMascotas\20_TallerSocializacionCanina\03.webp', 5, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Competiciones y Exhibiciones
    ('competencia-de-agilidad', 'Competencia de Agilidad', '2025-05-05', '2025-05-05', 'Madrid', '[40.414946, -3.6832845]', 
    'Participa en una emocionante competencia de agilidad para perros en el Polideportivo Municipal de Madrid.', 
    'Preparing', ARRAY['\assets\p_img\events\05_CompeticionesExhibiciones\21_CompetenciaAgilidad\01.webp', '\assets\p_img\events\05_CompeticionesExhibiciones\21_CompetenciaAgilidad\02.webp'], 
    '\assets\p_img\events\05_CompeticionesExhibiciones\21_CompetenciaAgilidad\03.webp', 1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('exhibicion-de-entrenamiento', 'Exhibición de Entrenamiento', '2025-06-20', '2025-06-20', 'Valencia', '[39.4773309, -0.4088082]', 
    'Exhibición de técnicas avanzadas de entrenamiento en la Plaza Mayor de Valencia.', 
    'Preparing', ARRAY['\assets\p_img\events\05_CompeticionesExhibiciones\22_ExhibicionesEntrenamiento\01.webp', '\assets\p_img\events\05_CompeticionesExhibiciones\22_ExhibicionesEntrenamiento\02.webp'], 
    '\assets\p_img\events\05_CompeticionesExhibiciones\22_ExhibicionesEntrenamiento\03.webp', 3, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('show-de-obediencia', 'Show de Obediencia', '2025-07-15', '2025-07-15', 'Sevilla', '[37.3777773, -5.9865158]', 
    'Exhibición de obediencia canina con los mejores entrenadores en el Parque del Retiro de Sevilla.', 
    'Preparing', ARRAY['\assets\p_img\events\05_CompeticionesExhibiciones\23_ShowObediencia\01.webp', '\assets\p_img\events\05_CompeticionesExhibiciones\23_ShowObediencia\02.webp'], 
    '\assets\p_img\events\05_CompeticionesExhibiciones\23_ShowObediencia\03.webp', 4, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('torneo-de-discos-caninos', 'Torneo de Discos Caninos', '2025-08-05', '2025-08-05', 'Barcelona', '[41.3627868, 1.7532117]', 
    'Competencia de perros lanzadores de discos en el Campo Municipal de Barcelona.', 
    'Preparing', ARRAY['\assets\p_img\events\05_CompeticionesExhibiciones\24_TorneoDiscosCaninos\01.webp', '\assets\p_img\events\05_CompeticionesExhibiciones\24_TorneoDiscosCaninos\02.webp'], 
    '\assets\p_img\events\05_CompeticionesExhibiciones\24_TorneoDiscosCaninos\03.webp', 2, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('concurso-de-belleza-canina', 'Concurso de Belleza Canina', '2025-09-10', '2025-09-10', 'Bilbao', '[43.263576, -2.9176443]', 
    'Concurso de belleza para perros con premios y sorpresas en el Parque de la Ciudadela de Bilbao.', 
    'Preparing', ARRAY['\assets\p_img\events\05_CompeticionesExhibiciones\25_ConcursoBellezaCanina\01.webp', '\assets\p_img\events\05_CompeticionesExhibiciones\25_ConcursoBellezaCanina\02.webp'], 
    '\assets\p_img\events\05_CompeticionesExhibiciones\25_ConcursoBellezaCanina\03.webp', 5, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TYPE statusSubEvents AS ENUM ('Confirmed', 'InProgress', 'Finished');
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_SubEvents (
    idSubEvents SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    startDate TIMESTAMP NOT NULL,
    endDate TIMESTAMP NOT NULL,
    urlImage VARCHAR(255)[],
    urlPoster VARCHAR(255),
    idEvent INT,
    isActive BOOLEAN DEFAULT TRUE,
    status statusSubEvents DEFAULT 'Confirmed',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO E_SubEvents (name, description, startDate, endDate, urlImage, urlPoster, idEvent, status, isActive, createdAt, updatedAt)
VALUES
    ('Conferencia sobre Cultura Manga', 'Charla con expertos sobre la evolución del manga.', '2025-03-01 10:00:00', '2025-03-01 12:00:00', ARRAY['url1'], '#000001', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Taller de Dibujo Manga', 'Aprende técnicas básicas de dibujo manga.', '2025-03-01 13:00:00', '2025-03-01 15:00:00', ARRAY['url2'], '#000002', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Desfile de Cosplay', 'Competencia de cosplay con premios.', '2025-03-02 10:00:00', '2025-03-02 12:00:00', ARRAY['url3'], '#000003', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Proyección de Anime Clásico', 'Proyección especial de películas clásicas.', '2025-03-02 14:00:00', '2025-03-02 16:00:00', ARRAY['url4'], '#000004', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Encuentro con Mangakas', 'Conoce a tus autores favoritos.', '2025-03-03 10:00:00', '2025-03-03 12:00:00', ARRAY['url5'], '#000005', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Charla sobre Innovación', 'Ideas innovadoras para el futuro.', '2025-03-05 10:00:00', '2025-03-05 11:00:00', ARRAY['url1'], '#000001', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Mesa Redonda: Sostenibilidad', 'Debate sobre prácticas sostenibles.', '2025-03-05 12:00:00', '2025-03-05 13:30:00', ARRAY['url2'], '#000002', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Charla Inspiradora', 'Historias personales que inspiran.', '2025-03-06 10:00:00', '2025-03-06 11:30:00', ARRAY['url3'], '#000003', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Workshop de Liderazgo', 'Taller interactivo para líderes emergentes.', '2025-03-06 12:00:00', '2025-03-06 14:00:00', ARRAY['url4'], '#000004', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Networking Session', 'Conecta con otros asistentes.', '2025-03-06 15:00:00', '2025-03-06 16:30:00', ARRAY['url5'], '#000005', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Concierto de Artista A', 'Actuación en vivo de Artista A.', '2025-06-15 18:00:00', '2025-06-15 20:00:00', ARRAY['url1'], '#000001', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Concierto de Artista B', 'Actuación en vivo de Artista B.', '2025-06-15 21:00:00', '2025-06-15 23:00:00', ARRAY['url2'], '#000002', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Fiesta Electrónica', 'Sesión de DJ al aire libre.', '2025-06-16 00:00:00', '2025-06-16 02:00:00', ARRAY['url3'], '#000003', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Taller de Música', 'Aprende sobre producción musical.', '2025-06-16 15:00:00', '2025-06-16 17:00:00', ARRAY['url4'], '#000004', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Concierto de Clausura', 'Evento de clausura con Artista C.', '2025-06-17 18:00:00', '2025-06-17 20:00:00', ARRAY['url5'], '#000005', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Partido Inaugural', 'Inicio del torneo.', '2025-06-10 18:00:00', '2025-06-10 20:00:00', ARRAY['url1'], '#000001', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Semifinal 1', 'Primera semifinal del torneo.', '2025-06-15 18:00:00', '2025-06-15 20:00:00', ARRAY['url2'], '#000002', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Semifinal 2', 'Segunda semifinal del torneo.', '2025-06-16 18:00:00', '2025-06-16 20:00:00', ARRAY['url3'], '#000003', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Partido por el Tercer Lugar', 'Disputa del tercer puesto.', '2025-06-19 18:00:00', '2025-06-19 20:00:00', ARRAY['url4'], '#000004', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Final del Torneo', 'Gran final del torneo mundial.', '2025-06-20 18:00:00', '2025-06-20 20:00:00', ARRAY['url5'], '#000005', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Plantación de Árboles', 'Actividad principal del día.', '2025-04-01 09:00:00', '2025-04-01 12:00:00', ARRAY['url1'], '#000001', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Charla Educativa', 'Sensibilización sobre la importancia de los árboles.', '2025-04-01 12:30:00', '2025-04-01 13:30:00', ARRAY['url2'], '#000002', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Taller de Compostaje', 'Aprende a compostar en casa.', '2025-04-01 14:00:00', '2025-04-01 15:30:00', ARRAY['url3'], '#000003', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Paseo Guiado', 'Recorrido guiado por el parque.', '2025-04-01 16:00:00', '2025-04-01 17:30:00', ARRAY['url4'], '#000004', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Cierre con Música', 'Concierto de clausura al aire libre.', '2025-04-01 18:00:00', '2025-04-01 19:30:00', ARRAY['url5'], '#000005', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_SubEvents (
    idSubEvents SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    startDate TIMESTAMP NOT NULL,
    endDate TIMESTAMP NOT NULL,
    urlImage VARCHAR(255)[],
    urlPoster VARCHAR(255),
    idEvent INT,
    status statusSubEvents DEFAULT 'Confirmed',
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO P_SubEvents (name, description, startDate, endDate, urlImage, urlPoster, idEvent, status, isActive, createdAt, updatedAt)
VALUES
    ('Presentación de Mascotas', 'Conoce a las mascotas disponibles para adopción.', '2025-04-10 10:00:00', '2025-04-10 11:30:00', ARRAY['subevent1'], '#000001', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Charla sobre Tenencia Responsable', 'Aprende cómo cuidar a tu nueva mascota.', '2025-04-10 12:00:00', '2025-04-10 13:00:00', ARRAY['subevent2'], '#000002', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Taller para Niños: Cuida a tu Mascota', 'Actividad educativa para los más pequeños.', '2025-04-10 14:00:00', '2025-04-10 15:30:00', ARRAY['subevent3'], '#000003', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Desfile de Mascotas', 'Evento divertido con premios para mascotas adoptadas.', '2025-04-10 16:00:00', '2025-04-10 17:30:00', ARRAY['subevent4'], '#000004', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Cierre Musical', 'Concierto solidario para finalizar la jornada.', '2025-04-10 18:00:00', '2025-04-10 19:30:00', ARRAY['subevent5'], '#000005', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Introducción a la Tenencia Responsable', 'Conceptos básicos para cuidar a los animales.', '2025-03-10 10:00:00', '2025-03-10 11:00:00', ARRAY['subevent1'], '#000001', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Cuidados Veterinarios Básicos', 'Cómo detectar problemas de salud en mascotas.', '2025-03-10 11:30:00', '2025-03-10 12:30:00', ARRAY['subevent2'], '#000002', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Alimentación Saludable para Mascotas', 'Consejos para una dieta equilibrada.', '2025-03-10 13:00:00', '2025-03-10 14:00:00', ARRAY['subevent3'], '#000003', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Taller Práctico: Higiene Animal', 'Aprende sobre el aseo adecuado.', '2025-03-10 14:30:00', '2025-03-10 15:30:00', ARRAY['subevent4'], '#000004', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Preguntas y Respuestas', 'Resuelve tus dudas con un experto.', '2025-03-10 16:00:00', '2025-03-10 17:00:00', ARRAY['subevent5'], '#000005', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Apertura del Mercadillo', 'Inauguración oficial del evento.', '2025-05-01 10:00:00', '2025-05-01 10:30:00', ARRAY['subevent1'], '#000001', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Zona de Manualidades', 'Compra artículos hechos a mano por voluntarios.', '2025-05-01 10:30:00', '2025-05-01 12:30:00', ARRAY['subevent2'], '#000002', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Rifa Benéfica', 'Participa para ganar premios y ayudar.', '2025-05-01 13:00:00', '2025-05-01 14:00:00', ARRAY['subevent3'], '#000003', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Demostración de Productos Ecológicos', 'Conoce alternativas sostenibles.', '2025-05-01 14:30:00', '2025-05-01 15:30:00', ARRAY['subevent4'], '#000004', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Cierre del Mercadillo', 'Agradecimientos y resumen del evento.', '2025-05-01 16:00:00', '2025-05-01 16:30:00', ARRAY['subevent5'], '#000005', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Inicio de la Caminata', 'Bienvenida y distribución de grupos.', '2025-04-10 09:00:00', '2025-04-10 09:30:00', ARRAY['subevent1'], '#000001', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Parada de Hidratación', 'Descanso y agua para mascotas y dueños.', '2025-04-10 10:30:00', '2025-04-10 10:45:00', ARRAY['subevent2'], '#000002', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Actividades en el Punto Medio', 'Juegos y charlas breves.', '2025-04-10 11:00:00', '2025-04-10 12:00:00', ARRAY['subevent3'], '#000003', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Reanudación de la Caminata', 'Continúa la caminata hasta el punto final.', '2025-04-10 12:15:00', '2025-04-10 13:00:00', ARRAY['subevent4'], '#000004', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Cierre con Reconocimientos', 'Entrega de premios y agradecimientos.', '2025-04-10 13:30:00', '2025-04-10 14:00:00', ARRAY['subevent5'], '#000005', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Registro de Participantes', 'Apertura para registrar a los competidores.', '2025-05-05 08:00:00', '2025-05-05 09:00:00', ARRAY['subevent1'], '#000001', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Ronda Clasificatoria', 'Primera ronda para seleccionar finalistas.', '2025-05-05 09:30:00', '2025-05-05 11:30:00', ARRAY['subevent2'], '#000002', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Pausa y Zona de Relax', 'Espacio para descansar y socializar.', '2025-05-05 12:00:00', '2025-05-05 12:30:00', ARRAY['subevent3'], '#000003', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Ronda Final', 'Los mejores competidores se enfrentan.', '2025-05-05 13:00:00', '2025-05-05 14:30:00', ARRAY['subevent4'], '#000004', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Entrega de Premios', 'Premiación y cierre del evento.', '2025-05-05 15:00:00', '2025-05-05 15:30:00', ARRAY['subevent5'], '#000005', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_EventCategories (
    idCategory SERIAL PRIMARY KEY,
    categorySlug VARCHAR(100) NOT NULL,
    categoryName VARCHAR(100) NOT NULL,
    imageURL VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO E_EventCategories (categorySlug, categoryName, imageURL, createdAt, updatedAt)
VALUES
    ('gaming', 'Gaming', '\assets\e_img\categories\Gaming.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('conferencias', 'Conferencias', '\assets\e_img\categories\Conferencias.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('festivales', 'Festivales', '\assets\e_img\categories\Festivales.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('deportes', 'Deportes', '\assets\e_img\categories\Deportes.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('naturaleza', 'Naturaleza', '\assets\e_img\categories\Naturaleza.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_EventCategories (
    idCategory SERIAL PRIMARY KEY,
    categorySlug VARCHAR(100) NOT NULL,
    categoryName VARCHAR(100) NOT NULL,
    imageURL VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserción de categorías de eventos para Pawnity
INSERT INTO P_EventCategories (categorySlug, categoryName, imageURL, createdAt, updatedAt)
VALUES
    ('adopcion-responsable', 'Adopción Responsable', '\assets\p_img\categories\AdopcionResponsable.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('concienciacion-y-educacion', 'Concienciación y Educación', '\assets\p_img\categories\ConcienciacionEducacion.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('recaudacion-de-fondos', 'Recaudación de Fondos', '\assets\p_img\categories\RecaudacionFondos.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('actividades-al-aire-libre-con-mascotas', 'Actividades al Aire Libre con Mascotas', '\assets\p_img\categories\ActividadesAireLibre.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('competiciones-y-exhibiciones', 'Competiciones y Exhibiciones', '\assets\p_img\categories\CompeticionesExhibiciones.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_TicketInfo (
    idTicketInfo SERIAL PRIMARY KEY,
    eventSlug VARCHAR(100),                                                                    
    type VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    capacity INT,
    remaining INT,
    descripcion VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserción de tipos de tickets en E_TicketInfo
INSERT INTO E_TicketInfo (eventSlug, type, price, capacity, remaining, descripcion, createdAt, updatedAt)
VALUES
    ('salon-del-manga', 'Entrada General', 20.00, 1000, 1000,'Acceso general al evento, sin áreas restringidas.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('salon-del-manga', 'Entrada VIP', 50.00, 200, 200,'Acceso a áreas VIP con asientos preferenciales y beneficios exclusivos.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('salon-del-manga', 'Entrada Familiar', 60.00, 500, 500,'Incluye acceso para dos adultos y dos niños.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('salon-del-manga', 'Entrada de Grupo', 90.00, 300, 300,'Descuento para grupos de hasta cinco personas.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('salon-del-manga', 'Entrada Estudiante', 15.00, 500, 500,'Descuento especial para estudiantes con credencial válida.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_TicketInfo (
    idTicketInfo SERIAL PRIMARY KEY,
    eventSlug VARCHAR(100),
    type VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    capacity INT,
    remaining INT,
    descripcion VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserción de tipos de tickets en E_TicketInfo
INSERT INTO P_TicketInfo (eventSlug, type, price, capacity, remaining, descripcion, createdAt, updatedAt)
VALUES
    ('jornada-de-adopcion-en-el-parque', 'Entrada General', 20.00, 1000, 1000, 'Acceso general al evento, sin áreas restringidas.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('jornada-de-adopcion-en-el-parque', 'Entrada VIP', 50.00, 200, 200,'Acceso a áreas VIP con asientos preferenciales y beneficios exclusivos.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('jornada-de-adopcion-en-el-parque', 'Entrada Familiar', 60.00, 500, 500,'Incluye acceso para dos adultos y dos niños.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('jornada-de-adopcion-en-el-parque', 'Entrada de Grupo', 90.00, 300, 300,'Descuento para grupos de hasta cinco personas.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('jornada-de-adopcion-en-el-parque', 'Entrada Estudiante', 15.00, 500, 500,'Descuento especial para estudiantes con credencial válida.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TYPE orderStatusEnum AS ENUM ('pending', 'completed', 'cancelled', 'refunded');
CREATE TYPE paymentStatusEnum AS ENUM ('pending', 'paid', 'failed', 'refunded');
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_Order (
    idOrder SERIAL PRIMARY KEY,
    idClient INT,
    idEvent INT,
    subtotalTickets DECIMAL(10, 2) DEFAULT 0.00,
    subtotalComplements DECIMAL(10, 2) DEFAULT 0.00,
    subtotalCommissions DECIMAL(10, 2) DEFAULT 0.00,
    totalPrice DECIMAL(10, 2),
    payment VARCHAR(50),
    paymentReference VARCHAR(100),
    paymentStatus paymentStatusEnum DEFAULT 'pending',
    status orderStatusEnum DEFAULT 'pending',
    datePurchase TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_Order (
    idOrder SERIAL PRIMARY KEY,
    idClient INT,
    idEvent INT,
    subtotalTickets DECIMAL(10, 2) DEFAULT 0.00,
    subtotalComplements DECIMAL(10, 2) DEFAULT 0.00,
    subtotalCommissions DECIMAL(10, 2) DEFAULT 0.00,
    totalPrice DECIMAL(10, 2),
    payment VARCHAR(50),
    paymentReference VARCHAR(100),
    paymentStatus paymentStatusEnum DEFAULT 'pending',
    status orderStatusEnum DEFAULT 'pending',
    datePurchase TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TYPE orderLineStatusEnum AS ENUM ('active', 'cancelled', 'refunded');
CREATE TYPE itemTypeEnum AS ENUM ('ticket', 'complement');
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_OrderLine (
    idOrderLine SERIAL PRIMARY KEY,
    idOrder INT NOT NULL,                
    itemType itemTypeEnum NOT NULL,     
    itemId INT NOT NULL,                
    quantity INT NOT NULL,            
    discount DECIMAL(10, 2) DEFAULT 0.00,
    subtotal DECIMAL(10, 2) NOT NULL,    
    status orderLineStatusEnum DEFAULT 'active',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_OrderLine (
    idOrderLine SERIAL PRIMARY KEY,
    idOrder INT NOT NULL,
    itemType itemTypeEnum NOT NULL,
    itemId INT NOT NULL,
    quantity INT NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0.00,
    subtotal DECIMAL(10, 2) NOT NULL,
    status orderLineStatusEnum DEFAULT 'active',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TYPE ticketUnitStatusEnum AS ENUM ('active', 'used', 'inClaim', 'refunded');
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_TicketUnit (
    idTicketUnit SERIAL PRIMARY KEY,
    idOrder INT NOT NULL,               
    idTicketInfo INT NOT NULL,          
    code VARCHAR(50) UNIQUE NOT NULL,   
    unitPrice DECIMAL(10, 2) NOT NULL,
    complements INTEGER[] DEFAULT '{}',  
    nameAssistant VARCHAR(100),         
    dniAssistant VARCHAR(20),           
    status ticketUnitStatusEnum DEFAULT 'active',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_TicketUnit (
    idTicketUnit SERIAL PRIMARY KEY,
    idOrder INT NOT NULL,               
    idTicketInfo INT NOT NULL,         
    code VARCHAR(50) UNIQUE NOT NULL,   
    unitPrice DECIMAL(10, 2) NOT NULL,
    complements INTEGER[] DEFAULT '{}',
    nameAssistant VARCHAR(100),        
    dniAssistant VARCHAR(20),          
    status ticketUnitStatusEnum DEFAULT 'active',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_Complements (
    idComplement SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    imageURL VARCHAR(255),
    eventSlug VARCHAR(100),
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO E_Complements (name, description, price, imageURL, eventSlug, createdAt, updatedAt)
VALUES
    ('Pack Bebida', 'Incluye 2 bebidas a elegir.', 5.00, NULL, 'salon-del-manga', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Camiseta', 'Camiseta oficial del evento.', 15.00, NULL, 'salon-del-manga', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Gorra', 'Gorra con el logo del evento.', 10.00, NULL, 'salon-del-manga', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Mochila', 'Mochila ecológica conmemorativa.', 20.00, NULL, 'salon-del-manga', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Pulsera', 'Pulsera de acceso al área VIP.', 8.00, NULL, 'salon-del-manga', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Poster', 'Póster oficial del evento.', 7.00, NULL, 'salon-del-manga', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Merchandising Variado', 'Pack con artículos del evento.', 25.00, NULL, 'salon-del-manga', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Parche', 'Parche bordado exclusivo del evento.', 6.00, NULL, 'salon-del-manga', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Bolsa de Tela', 'Bolsa reutilizable con diseño del evento.', 12.00, NULL, 'salon-del-manga', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Taza', 'Taza conmemorativa del evento.', 10.00, NULL, 'salon-del-manga', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_Complements (
    idComplement SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    imageURL VARCHAR(255),
    eventSlug VARCHAR(100),
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO P_Complements (name, description, price, imageURL, eventSlug, createdAt, updatedAt)
VALUES
    ('Pack Bebida', 'Incluye 2 bebidas a elegir.', 5.00, NULL, 'jornada-de-adopcion-en-el-parque',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Camiseta', 'Camiseta oficial del evento.', 15.00, NULL, 'jornada-de-adopcion-en-el-parque',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Gorra', 'Gorra con el logo del evento.', 10.00, NULL, 'jornada-de-adopcion-en-el-parque',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Mochila', 'Mochila ecológica conmemorativa.', 20.00, NULL, 'jornada-de-adopcion-en-el-parque',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Pulsera', 'Pulsera de acceso al área VIP.', 8.00, NULL, 'jornada-de-adopcion-en-el-parque',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Poster', 'Póster oficial del evento.', 7.00, NULL, 'jornada-de-adopcion-en-el-parque',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Merchandising Variado', 'Pack con artículos del evento.', 25.00, NULL, 'jornada-de-adopcion-en-el-parque',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Parche', 'Parche bordado exclusivo del evento.', 6.00, NULL, 'jornada-de-adopcion-en-el-parque',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Bolsa de Tela', 'Bolsa reutilizable con diseño del evento.', 12.00, NULL, 'jornada-de-adopcion-en-el-parque',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Taza', 'Taza conmemorativa del evento.', 10.00, NULL, 'jornada-de-adopcion-en-el-parque',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TYPE notificationStatus AS ENUM ('pending', 'send', 'failed', 'read');
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_Notifications (
    idNotifications SERIAL PRIMARY KEY,
    idAdmin INT,
    idClient INT,
    idOrg INT,
    type VARCHAR(20) NOT NULL,
    message TEXT,
    status notificationStatus DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_Notifications (
    idNotifications SERIAL PRIMARY KEY,
    idAdmin INT,
    idClient INT,
    idOrg INT,
    type VARCHAR(20) NOT NULL,
    message TEXT,
    status notificationStatus DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TYPE incidentsStatus AS ENUM ('pending', 'send', 'failed', 'read');
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_Incidents (
    idIncidents SERIAL PRIMARY KEY,
    idAdmin INT,
    idClient INT,
    idOrder INT,
    type VARCHAR(20) NOT NULL,
    message TEXT,
    status incidentsStatus DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_Incidents (
    idIncidents SERIAL PRIMARY KEY,
    idAdmin INT,
    idClient INT,
    idOrder INT,
    type VARCHAR(20) NOT NULL,
    message TEXT,
    status incidentsStatus DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TYPE petGender AS ENUM ('macho', 'hembra');
END
$do$;

DO
$do$
BEGIN
CREATE TYPE petStatus AS ENUM ('available', 'sponsored');
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_Pets (
    idPet SERIAL PRIMARY KEY,
    uuidPet UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    name VARCHAR(100),
    species VARCHAR(50),
    breed VARCHAR(100),
    gender petGender,
    birthDate DATE,
    description TEXT,
    image VARCHAR(255),
    status petStatus DEFAULT 'available',
    idOrg INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isActive BOOLEAN DEFAULT TRUE
);

INSERT INTO
    P_Pets (
        name,
        species,
        breed,
        gender,
        birthDate,
        description,
        status,
        idOrg,
        image
    )
VALUES (
        'Buddy',
        'perro',
        'Golden Retriever',
        'macho',
        '2020-05-14',
        'Amistoso y juguetón.',
        'available',
        1,
        '\assets\p_img\pets\organizer_01\Buddy.webp'
    ),
    (
        'Luna',
        'gato',
        'Siamés',
        'hembra',
        '2019-08-21',
        'Le encanta acurrucarse.',
        'sponsored',
        1,
        '\assets\p_img\pets\organizer_01\Luna.webp'
    ),
    (
        'Charlie',
        'perro',
        'Labrador',
        'macho',
        '2018-12-10',
        'Energético y cariñoso.',
        'available',
        1,
        '\assets\p_img\pets\organizer_01\Charlie.webp'
    ),
    (
        'Milo',
        'perro',
        'Beagle',
        'macho',
        '2021-07-05',
        'Curioso e inteligente.',
        'sponsored',
        1,
        '\assets\p_img\pets\organizer_01\Milo.webp'
    ),
    (
        'Bella',
        'gato',
        'Persa',
        'hembra',
        '2022-01-11',
        'Esponjosa y afectuosa.',
        'available',
        1,
        '\assets\p_img\pets\organizer_01\Bella.webp'
    ),
    (
        'Max',
        'perro',
        'Bulldog',
        'macho',
        '2019-03-30',
        'Leal y protector.',
        'sponsored',
        1,
        '\assets\p_img\pets\organizer_01\Max.webp'
    ),
    (
        'Simba',
        'gato',
        'Maine Coon',
        'macho',
        '2020-09-15',
        'Majestuoso y gentil.',
        'available',
        1,
        '\assets\p_img\pets\organizer_01\Simba.webp'
    ),
    (
        'Daisy',
        'perro',
        'Caniche',
        'hembra',
        '2017-06-25',
        'Le encanta jugar a buscar.',
        'available',
        1,
        '\assets\p_img\pets\organizer_01\Daisy.webp'
    ),
    (
        'Coco',
        'gato',
        'Bengalí',
        'hembra',
        '2021-10-03',
        'Muy juguetona.',
        'sponsored',
        2,
        '\assets\p_img\pets\organizer_02\Coco.webp'
    ),
    (
        'Rocky',
        'perro',
        'Rottweiler',
        'macho',
        '2018-11-22',
        'Fuerte y cariñoso.',
        'available',
        2,
        '\assets\p_img\pets\organizer_02\Rocky.webp'
    ),
    (
        'Chloe',
        'gato',
        'British Shorthair',
        'hembra',
        '2019-02-14',
        'Tranquila y elegante.',
        'sponsored',
        2,
        '\assets\p_img\pets\organizer_02\Chloe.webp'
    ),
    (
        'Buster',
        'perro',
        'Dachshund',
        'macho',
        '2021-05-29',
        'Pequeño pero valiente.',
        'available',
        2,
        '\assets\p_img\pets\organizer_02\Buster.webp'
    ),
    (
        'Loki',
        'gato',
        'Sphynx',
        'macho',
        '2020-04-01',
        'Único y amigable.',
        'available',
        2,
        '\assets\p_img\pets\organizer_02\Loki.webp'
    ),
    (
        'Rosie',
        'perro',
        'Cocker Spaniel',
        'hembra',
        '2021-08-17',
        'Le encanta la atención.',
        'sponsored',
        2,
        '\assets\p_img\pets\organizer_02\Rosie.webp'
    ),
    (
        'Oreo',
        'gato',
        'Ragdoll',
        'macho',
        '2019-07-12',
        'Esponjoso y tranquilo.',
        'available',
        2,
        '\assets\p_img\pets\organizer_02\Oreo.webp'
    ),
    (
        'Toby',
        'perro',
        'Shih Tzu',
        'macho',
        '2018-05-05',
        'Le encanta ser mimado.',
        'sponsored',
        2,
        '\assets\p_img\pets\organizer_02\Toby.webp'
    ),
    (
        'Nala',
        'gato',
        'Abisinio',
        'hembra',
        '2022-02-08',
        'Muy activa.',
        'available',
        3,
        '\assets\p_img\pets\organizer_03\Nala.webp'
    ),
    (
        'Duke',
        'perro',
        'Bóxer',
        'macho',
        '2019-09-28',
        'Energético y divertido.',
        'available',
        3,
        '\assets\p_img\pets\organizer_03\Duke.webp'
    ),
    (
        'Shadow',
        'gato',
        'Scottish Fold',
        'macho',
        '2020-11-16',
        'Le encanta dormir.',
        'sponsored',
        3,
        '\assets\p_img\pets\organizer_03\Shadow.webp'
    ),
    (
        'Ruby',
        'perro',
        'Chihuahua',
        'hembra',
        '2017-12-30',
        'Pequeña pero segura de sí misma.',
        'available',
        3,
        '\assets\p_img\pets\organizer_03\Ruby.webp'
    ),
    (
        'Pepa',
        'perro',
        'Pastor Alemán',
        'hembra',
        '2024-04-20',
        'Grande y amigable.',
        'sponsored',
        3,
        '\assets\p_img\pets\organizer_03\Pepa.webp'
    ),
    (
        'Gizmo',
        'gato',
        'Devon Rex',
        'macho',
        '2021-01-23',
        'Le encanta trepar.',
        'sponsored',
        3,
        '\assets\p_img\pets\organizer_03\Gizmo.webp'
    ),
    (
        'Rex',
        'perro',
        'Dóberman',
        'macho',
        '2018-06-18',
        'Protector y alerta.',
        'available',
        3,
        '\assets\p_img\pets\organizer_03\Rex.webp'
    ),
    (
        'Misty',
        'gato',
        'Snowshoe',
        'hembra',
        '2020-07-07',
        'Hermosa y tranquila.',
        'available',
        3,
        '\assets\p_img\pets\organizer_03\Misty.webp'
    ),
    (
        'Leo',
        'perro',
        'Border Collie',
        'macho',
        '2021-09-30',
        'Muy inteligente.',
        'sponsored',
        4,
        '\assets\p_img\pets\organizer_04\Leo.webp'
    ),
    (
        'Mochi',
        'gato',
        'Exótico de Pelo Corto',
        'hembra',
        '2019-03-25',
        'Adorable y cariñosa.',
        'available',
        4,
        '\assets\p_img\pets\organizer_04\Mochi.webp'
    ),
    (
        'Hunter',
        'perro',
        'Husky',
        'macho',
        '2017-10-14',
        'Le encanta la nieve.',
        'sponsored',
        4,
        '\assets\p_img\pets\organizer_04\Hunter.webp'
    ),
    (
        'Lilly',
        'gato',
        'Angora Turco',
        'hembra',
        '2021-06-01',
        'Muy esponjosa.',
        'available',
        4,
        '\assets\p_img\pets\organizer_04\Lilly.webp'
    ),
    (
        'Scout',
        'perro',
        'Pastor Australiano',
        'macho',
        '2018-11-05',
        'Muy ágil.',
        'sponsored',
        4,
        '\assets\p_img\pets\organizer_04\Scout.webp'
    ),
    (
        'Pepper',
        'gato',
        'Manx',
        'macho',
        '2020-12-09',
        'Sin cola pero con mucho amor.',
        'available',
        4,
        '\assets\p_img\pets\organizer_04\Pepper.webp'
    ),
    (
        'Darwin',
        'perro',
        'Dálmata',
        'macho',
        '2021-04-15',
        'Manchado y divertido.',
        'sponsored',
        4,
        '\assets\p_img\pets\organizer_04\Darwin.webp'
    ),
    (
        'Whiskers',
        'gato',
        'Curl Americano',
        'macho',
        '2019-02-28',
        'Tiene orejas únicas.',
        'sponsored',
        4,
        '\assets\p_img\pets\organizer_04\Whiskers.webp'
    ),
    (
        'Oscar',
        'perro',
        'Basset Hound',
        'macho',
        '2020-08-06',
        'Le encanta olfatear.',
        'available',
        5,
        '\assets\p_img\pets\organizer_05\Oscar.webp'
    ),
    (
        'Pumpkin',
        'gato',
        'Himalayo',
        'hembra',
        '2021-10-30',
        'Esponjosa y elegante.',
        'available',
        5,
        '\assets\p_img\pets\organizer_05\Pumpkin.webp'
    ),
    (
        'Ace',
        'perro',
        'Mastín',
        'macho',
        '2018-12-22',
        'Grande y gentil.',
        'sponsored',
        5,
        '\assets\p_img\pets\organizer_05\Ace.webp'
    ),
    (
        'Willow',
        'gato',
        'Bosque de Noruega',
        'hembra',
        '2022-03-14',
        'Hermoso pelaje.',
        'available',
        5,
        '\assets\p_img\pets\organizer_05\Willow.webp'
    ),
    (
        'Diesel',
        'perro',
        'San Bernardo',
        'macho',
        '2017-05-08',
        'Enorme pero cariñoso.',
        'available',
        5,
        '\assets\p_img\pets\organizer_05\Diesel.webp'
    ),
    (
        'Ginger',
        'gato',
        'Oriental de Pelo Corto',
        'hembra',
        '2019-11-19',
        'Le encanta hablar.',
        'sponsored',
        5,
        '\assets\p_img\pets\organizer_05\Ginger.webp'
    ),
    (
        'Bruno',
        'perro',
        'Boyero de Berna',
        'macho',
        '2021-07-09',
        'Muy esponjoso.',
        'available',
        5,
        '\assets\p_img\pets\organizer_05\Bruno.webp'
    ),
    (
        'Mittens',
        'gato',
        'Munchkin',
        'macho',
        '2020-02-03',
        'Patas cortas pero gran corazón.',
        'sponsored',
        5,
        '\assets\p_img\pets\organizer_05\Mittens.webp'
    );
END 
$do$;

DO
$do$
BEGIN
CREATE TABLE P_Adoptions (
    idAdoption SERIAL PRIMARY KEY,
    idClient INT,
    idPet INT,
    idOrg INT,
    adoptionDate DATE DEFAULT CURRENT_DATE,
    lastReviewDate DATE DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isActive BOOLEAN DEFAULT TRUE
);
INSERT INTO
    P_Adoptions (
        idClient,
        idPet,
        idOrg,
        adoptionDate,
        lastReviewDate,
        isActive
    )
VALUES (
        1,
        1,
        1,
        '2024-11-10',
        '2025-02-01',
        TRUE
    ),
    (
        2,
        2,
        1,
        '2024-12-01',
        '2025-03-01',
        TRUE
    ),
    (
        3,
        3,
        1,
        '2024-10-20',
        NULL,
        TRUE
    ),
    (
        4,
        4,
        1,
        '2024-09-15',
        '2025-01-10',
        TRUE
    ),
    (
        5,
        5,
        1,
        '2024-12-22',
        NULL,
        TRUE
    ),
    (
        6,
        6,
        1,
        '2025-01-05',
        '2025-02-15',
        TRUE
    ),
    (
        7,
        7,
        1,
        '2024-11-30',
        NULL,
        TRUE
    ),
    (
        8,
        8,
        1,
        '2024-12-18',
        NULL,
        TRUE
    ),
    (
        1,
        2,
        1,
        '2025-01-20',
        NULL,
        TRUE
    ),
    (
        2,
        3,
        1,
        '2024-11-12',
        '2025-02-10',
        TRUE
    ),
    (
        3,
        4,
        1,
        '2024-12-25',
        NULL,
        TRUE
    ),
    (
        4,
        5,
        1,
        '2025-01-01',
        '2025-03-15',
        TRUE
    );
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_Sponsorships (
    idSponsorship SERIAL PRIMARY KEY,
    idClient INT,
    idOrg INT,
    idPet INT,
    startDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    endDate TIMESTAMP DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isActive BOOLEAN DEFAULT TRUE
);
INSERT INTO
    P_Sponsorships (
        idClient,
        idOrg,
        idPet,
        startDate,
        endDate,
        isActive
    )
VALUES (
        5,
        1,
        1,
        '2024-09-01 10:00:00',
        '2025-01-01 12:00:00',
        FALSE
    ),
    (
        6,
        1,
        2,
        '2024-10-15 14:30:00',
        NULL,
        TRUE
    ),
    (
        7,
        1,
        3,
        '2024-11-20 09:15:00',
        NULL,
        TRUE
    ),
    (
        8,
        1,
        4,
        '2024-12-05 18:00:00',
        '2025-03-01 08:00:00',
        FALSE
    ),
    (
        9,
        1,
        5,
        '2024-12-25 12:00:00',
        NULL,
        TRUE
    ),
    (
        10,
        1,
        6,
        '2025-01-10 11:11:00',
        NULL,
        TRUE
    ),
    (
        3,
        1,
        7,
        '2024-11-11 11:11:00',
        NULL,
        TRUE
    ),
    (
        2,
        1,
        8,
        '2024-10-30 16:45:00',
        '2025-02-15 16:00:00',
        FALSE
    ),
    (
        1,
        1,
        6,
        '2024-12-12 12:12:00',
        NULL,
        TRUE
    ),
    (
        4,
        1,
        2,
        '2025-01-01 10:00:00',
        NULL,
        TRUE
    );
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_Blacklist (
    idBlacklist SERIAL PRIMARY KEY,
    refreshToken VARCHAR(255) NOT NULL,
    expiryDate TIMESTAMP NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_Blacklist (
    idBlacklist SERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    expiryDate TIMESTAMP NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

-- DO
-- $do$
-- BEGIN
-- CREATE TABLE E_TicketHistory(
--     idTicketHistory SERIAL PRIMARY KEY,
--     idOrder INT,
--     idEvent INT,
--     idTicketUnit INT,
--     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- END
-- $do$;

-- DO
-- $do$
-- BEGIN
-- CREATE TABLE P_TicketHistory(
--     idTicketHistory SERIAL PRIMARY KEY,
--     idOrder INT,
--     idEvent INT,
--     idTicketUnit INT,
--     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- END
-- $do$;


DO
$do$
BEGIN
CREATE TABLE token_blacklist_outstandingtoken (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES e_client (idclient) ON DELETE CASCADE,
    jti VARCHAR(255) NOT NULL UNIQUE,
    token VARCHAR(500) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);
END 
$do$;

DO
$do$
BEGIN
CREATE TABLE token_blacklist_blacklistedtoken (
    id SERIAL PRIMARY KEY,
    token_id INTEGER NOT NULL REFERENCES token_blacklist_outstandingtoken (id) ON DELETE CASCADE,
    blacklisted_at TIMESTAMP WITH TIME ZONE NOT NULL
);
END 
$do$;