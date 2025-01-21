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
    clientUuid UUID DEFAULT uuid_generate_v4() NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    refreshToken VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
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
    dni VARCHAR(20) UNIQUE NOT NULL,
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
    clientUuid UUID DEFAULT uuid_generate_v4() NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phoneNumber VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    bio VARCHAR(255),
    avatarUrl VARCHAR(255),
    refreshToken VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
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
    dni VARCHAR(20) UNIQUE NOT NULL,
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
CREATE TYPE statusEvent AS ENUM ('Preparing', 'Created', 'InProgress', 'Finished');
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_Events (
    idEvent SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    location VARCHAR(255),
    description VARCHAR(255),
    status statusEvent DEFAULT 'Preparing',
    urlImage VARCHAR(255)[],
    urlPoster VARCHAR(255),
    orgId INT,
    idCategory INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO E_Events (name, startDate, endDate, location, description, status, urlImage, urlPoster, orgId, idCategory, createdAt, updatedAt)
VALUES
    -- Gaming
    ('Salón del Manga', '2025-03-01', '2025-03-03', 'Fira Barcelona, Barcelona', 'Evento de cultura manga y anime.', 'Preparing', ARRAY['\src\assets\e_img\events\01_Gaming\01_SalonDelManga\01.webp', '\src\assets\e_img\events\01_Gaming\01_SalonDelManga\02.webp'], '\src\assets\e_img\events\01_Gaming\01_SalonDelManga\03.webp', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('E-Sports Summit', '2025-04-15', '2025-04-17', 'Madrid Arena, Madrid', 'Competición y charlas de e-sports.', 'Preparing', ARRAY['\src\assets\e_img\events\01_Gaming\02_ESportsSummit\01.webp', '\src\assets\e_img\events\01_Gaming\02_ESportsSummit\02.webp'], '\src\assets\e_img\events\01_Gaming\02_ESportsSummit\03.webp', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RetroGaming Expo', '2025-05-10', '2025-05-12', 'IFEMA, Madrid', 'Celebración de videojuegos retro.', 'Preparing', ARRAY['\src\assets\e_img\events\01_Gaming\03_RetroGamingExpo\01.webp', '\src\assets\e_img\events\01_Gaming\03_RetroGamingExpo\02.webp'], '\src\assets\e_img\events\01_Gaming\03_RetroGamingExpo\03.webp', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('TwitchCon', '2025-06-01', '2025-06-03', 'Feria Valencia, Valencia', 'Convención de creadores de contenido.', 'Preparing', ARRAY['\src\assets\e_img\events\01_Gaming\04_TwitchCon\01.webp', '\src\assets\e_img\events\01_Gaming\04_TwitchCon\02.webp'], '\src\assets\e_img\events\01_Gaming\04_TwitchCon\03.webp', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Indie Game Festival', '2025-07-20', '2025-07-22', 'Bilbao Exhibition Centre, Bilbao', 'Festival de videojuegos independientes.', 'Preparing', ARRAY['\src\assets\e_img\events\01_Gaming\05_IndieGameFestival\01.webp', '\src\assets\e_img\events\01_Gaming\05_IndieGameFestival\02.webp'], '\src\assets\e_img\events\01_Gaming\05_IndieGameFestival\03.webp', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Conferencias
    ('Charlas sobre Emprendimiento', '2025-03-05', '2025-03-06', 'Palacio de Congresos, Málaga', 'Charlas para fomentar el emprendimiento.', 'Preparing', ARRAY['\src\assets\e_img\events\02_Conferences\06_CharlaEmprendimiento\01.webp', '\src\assets\e_img\events\02_Conferences\06_CharlaEmprendimiento\02.webp'], '\src\assets\e_img\events\02_Conferences\06_CharlaEmprendimiento\03.webp', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('TEDx Barcelona', '2025-03-20', '2025-03-21', 'CaixaForum, Barcelona', 'Charlas inspiradoras con expertos.', 'Preparing', ARRAY['\src\assets\e_img\events\02_Conferences\07_TEDxBarcelona\01.webp', '\src\assets\e_img\events\02_Conferences\07_TEDxBarcelona\02.webp'], '\src\assets\e_img\events\02_Conferences\07_TEDxBarcelona\03.webp', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Future Tech Talks', '2025-04-01', '2025-04-02', 'Madrid Convention Center, Madrid', 'Foro de innovación tecnológica.', 'Preparing', ARRAY['\src\assets\e_img\events\02_Conferences\08_FutureTechTalks\01.webp', '\src\assets\e_img\events\02_Conferences\08_FutureTechTalks\02.webp'], '\src\assets\e_img\events\02_Conferences\08_FutureTechTalks\03.webp', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Innovación y Sostenibilidad', '2025-04-15', '2025-04-16', 'La Farga, Hospitalet', 'Charlas sobre sostenibilidad e innovación.', 'Preparing', ARRAY['\src\assets\e_img\events\02_Conferences\09_InnovacionSostenibilidad\01.webp', '\src\assets\e_img\events\02_Conferences\09_InnovacionSostenibilidad\02.webp'], '\src\assets\e_img\events\02_Conferences\09_InnovacionSostenibilidad\03.webp', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Educación del Futuro', '2025-05-10', '2025-05-11', 'Palacio de Exposiciones, Sevilla', 'Ideas para la educación del futuro.', 'Preparing', ARRAY['\src\assets\e_img\events\02_Conferences\10_EducacionFuturo\01.webp', '\src\assets\e_img\events\02_Conferences\10_EducacionFuturo\02.webp'], '\src\assets\e_img\events\02_Conferences\10_EducacionFuturo\03.webp', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Festivales
    ('BeachSound Festival', '2025-06-15', '2025-06-17', 'Playa de la Malagueta, Málaga', 'Festival de música en la playa.', 'Preparing', ARRAY['\src\assets\e_img\events\03_Festivals\11_BeachSoundFestival\01.webp', '\src\assets\e_img\events\03_Festivals\11_BeachSoundFestival\02.webp'], '\src\assets\e_img\events\03_Festivals\11_BeachSoundFestival\03.webp', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Primavera Sound', '2025-06-01', '2025-06-03', 'Parc del Fòrum, Barcelona', 'Festival de música alternativa.', 'Preparing', ARRAY['\src\assets\e_img\events\03_Festivals\12_PrimaveraSound\01.webp', '\src\assets\e_img\events\03_Festivals\12_PrimaveraSound\02.webp'], '\src\assets\e_img\events\03_Festivals\12_PrimaveraSound\03.webp', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Rock Fest', '2025-07-01', '2025-07-03', 'Can Zam, Santa Coloma', 'Festival de rock con bandas internacionales.', 'Preparing', ARRAY['\src\assets\e_img\events\03_Festivals\13_RockFest\01.webp', '\src\assets\e_img\events\03_Festivals\13_RockFest\02.webp'], '\src\assets\e_img\events\03_Festivals\13_RockFest\03.webp', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Arenal Sound', '2025-07-20', '2025-07-22', 'Playa El Arenal, Burriana', 'Festival de música electrónica y pop.', 'Preparing', ARRAY['\src\assets\e_img\events\03_Festivals\14_ArenalSound\01.webp', '\src\assets\e_img\events\03_Festivals\14_ArenalSound\02.webp'], '\src\assets\e_img\events\03_Festivals\14_ArenalSound\03.webp', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Bilbao BBK Live', '2025-07-25', '2025-07-27', 'Kobetamendi, Bilbao', 'Festival de música en el monte.', 'Preparing', ARRAY['\src\assets\e_img\events\03_Festivals\15_BilbaoBBKLive\01.webp', '\src\assets\e_img\events\03_Festivals\15_BilbaoBBKLive\02.webp'], '\src\assets\e_img\events\03_Festivals\15_BilbaoBBKLive\03.webp', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Deportes
    ('Competición Mundial de Fútbol', '2025-06-10', '2025-06-20', 'Estadio Santiago Bernabéu, Madrid', 'Torneo mundial de fútbol.', 'Preparing', ARRAY['\src\assets\e_img\events\04_Sports\16_CompeticionMundialFutbol\01.webp', '\src\assets\e_img\events\04_Sports\16_CompeticionMundialFutbol\02.webp'], '\src\assets\e_img\events\04_Sports\16_CompeticionMundialFutbol\03.webp', 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Maratón Internacional', '2025-03-20', '2025-03-20', 'Paseo de la Castellana, Madrid', 'Maratón por el centro de Madrid.', 'Preparing', ARRAY['\src\assets\e_img\events\04_Sports\17_MaratonInternacional\01.webp', '\src\assets\e_img\events\04_Sports\17_MaratonInternacional\02.webp'], '\src\assets\e_img\events\04_Sports\17_MaratonInternacional\03.webp', 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Copa de Baloncesto', '2025-04-15', '2025-04-17', 'Palacio de Deportes, Zaragoza', 'Campeonato de baloncesto.', 'Preparing', ARRAY['\src\assets\e_img\events\04_Sports\18_CopaBaloncesto\01.webp', '\src\assets\e_img\events\04_Sports\18_CopaBaloncesto\02.webp'], '\src\assets\e_img\events\04_Sports\18_CopaBaloncesto\03.webp', 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Vuelta Ciclista a España', '2025-08-01', '2025-08-21', 'Ruta variada, España', 'Carrera ciclística por etapas.', 'Preparing', ARRAY['\src\assets\e_img\events\04_Sports\19_VueltaCiclistaEspana\01.webp', '\src\assets\e_img\events\04_Sports\19_VueltaCiclistaEspana\02.webp'], '\src\assets\e_img\events\04_Sports\19_VueltaCiclistaEspana\03.webp', 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Campeonato de Surf', '2025-07-10', '2025-07-12', 'Playa de Zarautz, Zarautz', 'Competición internacional de surf.', 'Preparing', ARRAY['\src\assets\e_img\events\04_Sports\20_CampeonatoSurf\01.webp', '\src\assets\e_img\events\04_Sports\20_CampeonatoSurf\02.webp'], '\src\assets\e_img\events\04_Sports\20_CampeonatoSurf\03.webp', 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    -- Naturaleza
    ('Día de los Árboles', '2025-04-01', '2025-04-01', 'Retiro, Madrid', 'Evento para plantar árboles y sensibilizar.', 'Preparing', ARRAY['\src\assets\e_img\events\05_Nature\21_DiaArboles\01.webp', '\src\assets\e_img\events\05_Nature\21_DiaArboles\02.webp'], '\src\assets\e_img\events\05_Nature\21_DiaArboles\03.webp', 5, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Picnic en el Bosque', '2025-05-05', '2025-05-05', 'Parque Natural de la Sierra de Grazalema, Cádiz', 'Picnic familiar en la naturaleza.', 'Preparing', ARRAY['\src\assets\e_img\events\05_Nature\22_PicnicBosque\01.webp', '\src\assets\e_img\events\05_Nature\22_PicnicBosque\02.webp'], '\src\assets\e_img\events\05_Nature\22_PicnicBosque\03.webp', 5, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('EcoRuta Infantil', '2025-06-10', '2025-06-10', 'Montseny, Barcelona', 'Ruta ecológica para niños.', 'Preparing', ARRAY['\src\assets\e_img\events\05_Nature\23_EcoRutaInfantil\01.webp', '\src\assets\e_img\events\05_Nature\23_EcoRutaInfantil\02.webp'], '\src\assets\e_img\events\05_Nature\23_EcoRutaInfantil\03.webp', 5, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Taller de Compostaje', '2025-07-20', '2025-07-20', 'Parque del Turia, Valencia', 'Taller sobre técnicas de compostaje.', 'Preparing', ARRAY['\src\assets\e_img\events\05_Nature\24_TallerCompostaje\01.webp', '\src\assets\e_img\events\05_Nature\24_TallerCompostaje\02.webp'], '\src\assets\e_img\events\05_Nature\24_TallerCompostaje\03.webp', 5, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Actividades Familiares', '2025-08-15', '2025-08-15', 'Parque Güell, Barcelona', 'Actividades para disfrutar en familia.', 'Preparing', ARRAY['\src\assets\e_img\events\05_Nature\25_ActividadesFamiliares\01.webp', '\src\assets\e_img\events\05_Nature\25_ActividadesFamiliares\02.webp'], '\src\assets\e_img\events\05_Nature\25_ActividadesFamiliares\03.webp', 5, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_Events (
    idEvent SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    location VARCHAR(255),
    description VARCHAR(255),
    status statusEvent DEFAULT 'Preparing',
    urlImage VARCHAR(255)[],
    urlPoster VARCHAR(255),
    orgId INT,
    idCategory INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO P_Events (name, startDate, endDate, location, description, status, urlImage, urlPoster, orgId, idCategory, createdAt, updatedAt)
VALUES
-- 'Adopción Responsable'
    ('Jornada de Adopción en el Parque', '2025-04-10', '2025-04-10', 'Parque del Retiro, Madrid', 'Evento para conectar mascotas con familias responsables.', 'Preparing', ARRAY['\src\assets\p_img\events\01_AdopcionResponsable\01_JornadaAdopcionParque\01.webp', '\src\assets\p_img\events\01_AdopcionResponsable\01_JornadaAdopcionParque\02.webp'], '\src\assets\p_img\events\01_AdopcionResponsable\01_JornadaAdopcionParque\03.webp', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Adopta un Amigo', '2025-05-15', '2025-05-15', 'Plaza Mayor, Salamanca', 'Jornada de adopción con talleres sobre cuidados básicos.', 'Preparing', ARRAY['\src\assets\p_img\events\01_AdopcionResponsable\02_AdoptaAmigo\01.webp', '\src\assets\p_img\events\01_AdopcionResponsable\02_AdoptaAmigo\02.webp'], '\src\assets\p_img\events\01_AdopcionResponsable\02_AdoptaAmigo\03.webp', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Feria de Adopción Solidaria', '2025-06-01', '2025-06-01', 'Centro Cívico, Barcelona', 'Conoce animales que buscan hogar y disfruta de actividades familiares.', 'Preparing', ARRAY['\src\assets\p_img\events\01_AdopcionResponsable\03_FeriaAdopcionSolidaria\01.webp', '\src\assets\p_img\events\01_AdopcionResponsable\03_FeriaAdopcionSolidaria\02.webp'], '\src\assets\p_img\events\01_AdopcionResponsable\03_FeriaAdopcionSolidaria\03.webp', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Día de las Mascotas sin Hogar', '2025-07-10', '2025-07-10', 'Parque Turia, Valencia', 'Jornada de adopción con charlas y juegos.', 'Preparing', ARRAY['\src\assets\p_img\events\01_AdopcionResponsable\04_DiaMascotasSinHogar\01.webp', '\src\assets\p_img\events\01_AdopcionResponsable\04_DiaMascotasSinHogar\02.webp'], '\src\assets\p_img\events\01_AdopcionResponsable\04_DiaMascotasSinHogar\03.webp', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Encuentro para Adopción Responsable', '2025-08-20', '2025-08-20', 'Parque Municipal, Sevilla', 'Promovemos la adopción y la tenencia responsable de mascotas.', 'Preparing', ARRAY['\src\assets\p_img\events\01_AdopcionResponsable\05_EncuentroAdopcionResponsable\01.webp', '\src\assets\p_img\events\01_AdopcionResponsable\05_EncuentroAdopcionResponsable\02.webp'], '\src\assets\p_img\events\01_AdopcionResponsable\05_EncuentroAdopcionResponsable\03.webp', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- 'Concienciación y Educación'
    ('Taller de Tenencia Responsable', '2025-03-10', '2025-03-10', 'Centro Cultural, Málaga', 'Aprende sobre los cuidados básicos de los animales.', 'Preparing', ARRAY['\src\assets\p_img\events\02_ConcienciacionEducacion\06_TallerTenenciaResponsable\01.webp', '\src\assets\p_img\events\02_ConcienciacionEducacion\06_TallerTenenciaResponsable\02.webp'], '\src\assets\p_img\events\02_ConcienciacionEducacion\06_TallerTenenciaResponsable\03.webp', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Charla sobre Derechos Animales', '2025-03-20', '2025-03-20', 'Auditorio Nacional, Madrid', 'Explora la importancia de proteger los derechos de los animales.', 'Preparing', ARRAY['\src\assets\p_img\events\02_ConcienciacionEducacion\07_CharlaDerechosAnimales\01.webp', '\src\assets\p_img\events\02_ConcienciacionEducacion\07_CharlaDerechosAnimales\02.webp'], '\src\assets\p_img\events\02_ConcienciacionEducacion\07_CharlaDerechosAnimales\03.webp', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Jornada Infantil de Concienciación', '2025-04-05', '2025-04-05', 'Parque Infantil, Zaragoza', 'Actividades para niños enfocadas en el respeto animal.', 'Preparing', ARRAY['\src\assets\p_img\events\02_ConcienciacionEducacion\08_JornadaInfantilConcienciacion\01.webp', '\src\assets\p_img\events\02_ConcienciacionEducacion\08_JornadaInfantilConcienciacion\02.webp'], '\src\assets\p_img\events\02_ConcienciacionEducacion\08_JornadaInfantilConcienciacion\03.webp', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Seminario de Bienestar Animal', '2025-05-12', '2025-05-12', 'Universidad Autónoma, Barcelona', 'Talleres y ponencias sobre el bienestar animal.', 'Preparing', ARRAY['\src\assets\p_img\events\02_ConcienciacionEducacion\09_SeminarioBienestarAnimal\01.webp', '\src\assets\p_img\events\02_ConcienciacionEducacion\09_SeminarioBienestarAnimal\02.webp'], '\src\assets\p_img\events\02_ConcienciacionEducacion\09_SeminarioBienestarAnimal\03.webp', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Exposición: Vida Silvestre', '2025-06-18', '2025-06-18', 'Museo de Ciencias Naturales, Valencia', 'Exposición interactiva sobre la fauna silvestre.', 'Preparing', ARRAY['\src\assets\p_img\events\02_ConcienciacionEducacion\10_ExposicionVidaSilvestre\01.webp', '\src\assets\p_img\events\02_ConcienciacionEducacion\10_ExposicionVidaSilvestre\02.webp'], '\src\assets\p_img\events\02_ConcienciacionEducacion\10_ExposicionVidaSilvestre\03.webp', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- 'Recaudación de Fondos'
    ('Mercadillo Solidario', '2025-05-01', '2025-05-01', 'Plaza de España, Sevilla', 'Compra productos para apoyar a las protectoras locales.', 'Preparing', ARRAY['\src\assets\p_img\events\03_RecaudacionFondos\11_MercadilloSolidario\01.webp', '\src\assets\p_img\events\03_RecaudacionFondos\11_MercadilloSolidario\02.webp'], '\src\assets\p_img\events\03_RecaudacionFondos\11_MercadilloSolidario\03.webp', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Cena Benéfica para Animales', '2025-06-15', '2025-06-15', 'Hotel Gran Palace, Madrid', 'Cena temática para recaudar fondos y ayudar a las protectoras.', 'Preparing', ARRAY['\src\assets\p_img\events\03_RecaudacionFondos\12_CenaBeneficaAnimales\01.webp', '\src\assets\p_img\events\03_RecaudacionFondos\12_CenaBeneficaAnimales\02.webp'], '\src\assets\p_img\events\03_RecaudacionFondos\12_CenaBeneficaAnimales\03.webp', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Concierto por la Fauna', '2025-07-08', '2025-07-08', 'Auditorio Ciudad de la Música, Zaragoza', 'Disfruta de música y ayuda a los animales.', 'Preparing', ARRAY['\src\assets\p_img\events\03_RecaudacionFondos\13_ConciertoPorFauna\01.webp', '\src\assets\p_img\events\03_RecaudacionFondos\13_ConciertoPorFauna\02.webp'], '\src\assets\p_img\events\03_RecaudacionFondos\13_ConciertoPorFauna\03.webp', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Rifa Solidaria', '2025-08-03', '2025-08-03', 'Centro Cívico, Valencia', 'Participa en una rifa para apoyar a las protectoras.', 'Preparing', ARRAY['\src\assets\p_img\events\03_RecaudacionFondos\14_RifaSolidaria\01.webp', '\src\assets\p_img\events\03_RecaudacionFondos\14_RifaSolidaria\02.webp'], '\src\assets\p_img\events\03_RecaudacionFondos\14_RifaSolidaria\03.webp', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Subasta de Arte Solidario', '2025-09-12', '2025-09-12', 'Galería de Arte, Barcelona', 'Subasta de arte a favor de los animales.', 'Preparing', ARRAY['\src\assets\p_img\events\03_RecaudacionFondos\15_SubastaArteSolidario\01.webp', '\src\assets\p_img\events\03_RecaudacionFondos\15_SubastaArteSolidario\02.webp'], '\src\assets\p_img\events\03_RecaudacionFondos\15_SubastaArteSolidario\03.webp', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- 'Actividades al Aire Libre con Mascotas'
    ('Caminata Solidaria', '2025-04-10', '2025-04-10', 'Montjuïc, Barcelona', 'Disfruta de una caminata con tu mascota y ayuda a las protectoras.', 'Preparing', ARRAY['\src\assets\p_img\events\04_ActividadesAireLibreMascotas\16_CaminataSolidaria\01.webp', '\src\assets\p_img\events\04_ActividadesAireLibreMascotas\16_CaminataSolidaria\02.webp'], '\src\assets\p_img\events\04_ActividadesAireLibreMascotas\16_CaminataSolidaria\03.webp', 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Concurso de Habilidades Caninas', '2025-05-20', '2025-05-20', 'Parque del Oeste, Madrid', 'Muestra las habilidades de tu perro en este concurso.', 'Preparing', ARRAY['\src\assets\p_img\events\04_ActividadesAireLibreMascotas\17_ConcursoHabilidadesCaninas\01.webp', '\src\assets\p_img\events\04_ActividadesAireLibreMascotas\17_ConcursoHabilidadesCaninas\02.webp'], '\src\assets\p_img\events\04_ActividadesAireLibreMascotas\17_ConcursoHabilidadesCaninas\03.webp', 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Carrera con Perros', '2025-06-01', '2025-06-01', 'Parque Natural, Sevilla', 'Participa en una carrera solidaria con tu perro.', 'Preparing', ARRAY['\src\assets\p_img\events\04_ActividadesAireLibreMascotas\18_CarreraPerros\01.webp', '\src\assets\p_img\events\04_ActividadesAireLibreMascotas\18_CarreraPerros\02.webp'], '\src\assets\p_img\events\04_ActividadesAireLibreMascotas\18_CarreraPerros\03.webp', 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Paseo Nocturno con Mascotas', '2025-06-15', '2025-06-15', 'Parque Natural del Turia, Valencia', 'Disfruta de un paseo nocturno con tu mascota.', 'Preparing', ARRAY['\src\assets\p_img\events\04_ActividadesAireLibreMascotas\19_PaseoNocturnoMascotas\01.webp', '\src\assets\p_img\events\04_ActividadesAireLibreMascotas\19_PaseoNocturnoMascotas\02.webp'], '\src\assets\p_img\events\04_ActividadesAireLibreMascotas\19_PaseoNocturnoMascotas\03.webp', 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Taller de Socialización Canina', '2025-07-05', '2025-07-05', 'Parque Central, Málaga', 'Aprende técnicas para mejorar la socialización de tu mascota.', 'Preparing', ARRAY['\src\assets\p_img\events\04_ActividadesAireLibreMascotas\20_TallerSocializacionCanina\01.webp', '\src\assets\p_img\events\04_ActividadesAireLibreMascotas\20_TallerSocializacionCanina\02.webp'], '\src\assets\p_img\events\04_ActividadesAireLibreMascotas\20_TallerSocializacionCanina\03.webp', 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- 'Competiciones y Exhibiciones'
    ('Competencia de Agilidad', '2025-05-05', '2025-05-05', 'Polideportivo Municipal, Madrid', 'Participa en una competencia de agilidad para perros.', 'Preparing', ARRAY['\src\assets\p_img\events\05_CompeticionesExhibiciones\21_CompetenciaAgilidad\01.webp', '\src\assets\p_img\events\05_CompeticionesExhibiciones\21_CompetenciaAgilidad\02.webp'], '\src\assets\p_img\events\05_CompeticionesExhibiciones\21_CompetenciaAgilidad\03.webp', 5, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Exhibición de Entrenamiento', '2025-06-20', '2025-06-20', 'Plaza Mayor, Valencia', 'Exhibición de técnicas avanzadas de entrenamiento.', 'Preparing', ARRAY['\src\assets\p_img\events\05_CompeticionesExhibiciones\22_ExhibicionesEntrenamiento\01.webp', '\src\assets\p_img\events\05_CompeticionesExhibiciones\22_ExhibicionesEntrenamiento\02.webp'], '\src\assets\p_img\events\05_CompeticionesExhibiciones\22_ExhibicionesEntrenamiento\03.webp', 5, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    ('Show de Obediencia', '2025-07-15', '2025-07-15', 'Parque del Retiro, Madrid', 'Exhibición de obediencia canina.', 'Preparing', ARRAY['\src\assets\p_img\events\05_CompeticionesExhibiciones\23_ShowObediencia\01.webp', '\src\assets\p_img\events\05_CompeticionesExhibiciones\23_ShowObediencia\02.webp'], '\src\assets\p_img\events\05_CompeticionesExhibiciones\23_ShowObediencia\03.webp', 5, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Torneo de Discos Caninos', '2025-08-05', '2025-08-05', 'Campo Municipal, Sevilla', 'Competencia de perros lanzadores de discos.', 'Preparing', ARRAY['\src\assets\p_img\events\05_CompeticionesExhibiciones\24_TorneoDiscosCaninos\01.webp', '\src\assets\p_img\events\05_CompeticionesExhibiciones\24_TorneoDiscosCaninos\02.webp'], '\src\assets\p_img\events\05_CompeticionesExhibiciones\24_TorneoDiscosCaninos\03.webp', 5, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Concurso de Belleza Canina', '2025-09-10', '2025-09-10', 'Parque de la Ciudadela, Barcelona', 'Concurso de belleza para perros.', 'Preparing', ARRAY['\src\assets\p_img\events\05_CompeticionesExhibiciones\25_ConcursoBellezaCanina\01.webp', '\src\assets\p_img\events\05_CompeticionesExhibiciones\25_ConcursoBellezaCanina\02.webp'], '\src\assets\p_img\events\05_CompeticionesExhibiciones\25_ConcursoBellezaCanina\03.webp', 5, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
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
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    urlImage VARCHAR(255)[],
    urlPoster VARCHAR(255),
    idEvent INT,
    status statusSubEvents DEFAULT 'Confirmed',
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO E_SubEvents (name, description, startDate, endDate, urlImage, urlPoster, idEvent, status, isActive, createdAt, updatedAt)
VALUES
-- 'Salón del Manga' (Gaming, Evento ID: 1)
    ('Conferencia sobre Cultura Manga', 'Charla con expertos sobre la evolución del manga.', '2025-03-01 10:00', '2025-03-01 12:00', ARRAY['url1'], 'poster1', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Taller de Dibujo Manga', 'Aprende técnicas básicas de dibujo manga.', '2025-03-01 13:00', '2025-03-01 15:00', ARRAY['url2'], 'poster2', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Desfile de Cosplay', 'Competencia de cosplay con premios.', '2025-03-02 10:00', '2025-03-02 12:00', ARRAY['url3'], 'poster3', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Proyección de Anime Clásico', 'Proyección especial de películas clásicas.', '2025-03-02 14:00', '2025-03-02 16:00', ARRAY['url4'], 'poster4', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Encuentro con Mangakas', 'Conoce a tus autores favoritos.', '2025-03-03 10:00', '2025-03-03 12:00', ARRAY['url5'], 'poster5', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- 'Charlas sobre Emprendimiento' (Conferencias, Evento ID: 6)
    ('Charla sobre Innovación', 'Ideas innovadoras para el futuro.', '2025-03-05 10:00', '2025-03-05 11:00', ARRAY['url1'], 'poster1', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Mesa Redonda: Sostenibilidad', 'Debate sobre prácticas sostenibles.', '2025-03-05 12:00', '2025-03-05 13:30', ARRAY['url2'], 'poster2', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Charla Inspiradora', 'Historias personales que inspiran.', '2025-03-06 10:00', '2025-03-06 11:30', ARRAY['url3'], 'poster3', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Workshop de Liderazgo', 'Taller interactivo para líderes emergentes.', '2025-03-06 12:00', '2025-03-06 14:00', ARRAY['url4'], 'poster4', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Networking Session', 'Conecta con otros asistentes.', '2025-03-06 15:00', '2025-03-06 16:30', ARRAY['url5'], 'poster5', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- 'BeachSound Festival' (Festivales, Evento ID: 11)
    ('Concierto de Artista A', 'Actuación en vivo de Artista A.', '2025-06-15 18:00', '2025-06-15 20:00', ARRAY['url1'], 'poster1', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Concierto de Artista B', 'Actuación en vivo de Artista B.', '2025-06-15 21:00', '2025-06-15 23:00', ARRAY['url2'], 'poster2', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Fiesta Electrónica', 'Sesión de DJ al aire libre.', '2025-06-16 00:00', '2025-06-16 02:00', ARRAY['url3'], 'poster3', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Taller de Música', 'Aprende sobre producción musical.', '2025-06-16 15:00', '2025-06-16 17:00', ARRAY['url4'], 'poster4', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Concierto de Clausura', 'Evento de clausura con Artista C.', '2025-06-17 18:00', '2025-06-17 20:00', ARRAY['url5'], 'poster5', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- 'Competición Mundial de Fútbol' (Deportes, Evento ID: 16)
    ('Partido Inaugural', 'Inicio del torneo.', '2025-06-10 18:00', '2025-06-10 20:00', ARRAY['url1'], 'poster1', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Semifinal 1', 'Primera semifinal del torneo.', '2025-06-15 18:00', '2025-06-15 20:00', ARRAY['url2'], 'poster2', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Semifinal 2', 'Segunda semifinal del torneo.', '2025-06-16 18:00', '2025-06-16 20:00', ARRAY['url3'], 'poster3', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Partido por el Tercer Lugar', 'Disputa del tercer puesto.', '2025-06-19 18:00', '2025-06-19 20:00', ARRAY['url4'], 'poster4', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Final del Torneo', 'Gran final del torneo mundial.', '2025-06-20 18:00', '2025-06-20 20:00', ARRAY['url5'], 'poster5', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- 'Día de los Árboles' (Naturaleza, Evento ID: 21)
    ('Plantación de Árboles', 'Actividad principal del día.', '2025-04-01 09:00', '2025-04-01 12:00', ARRAY['url1'], 'poster1', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Charla Educativa', 'Sensibilización sobre la importancia de los árboles.', '2025-04-01 12:30', '2025-04-01 13:30', ARRAY['url2'], 'poster2', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Taller de Compostaje', 'Aprende a compostar en casa.', '2025-04-01 14:00', '2025-04-01 15:30', ARRAY['url3'], 'poster3', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Paseo Guiado', 'Recorrido guiado por el parque.', '2025-04-01 16:00', '2025-04-01 17:30', ARRAY['url4'], 'poster4', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Cierre con Música', 'Concierto de clausura al aire libre.', '2025-04-01 18:00', '2025-04-01 19:30', ARRAY['url5'], 'poster5', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_SubEvents (
    idSubEvents SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
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
-- 'Jornada de Adopción en el Parque' (Adopción Responsable, Evento ID: 1)
    ('Presentación de Mascotas', 'Conoce a las mascotas disponibles para adopción.', '2025-04-10 10:00', '2025-04-10 11:30', ARRAY['subevent1.jpg'], 'poster1.jpg', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Charla sobre Tenencia Responsable', 'Aprende cómo cuidar a tu nueva mascota.', '2025-04-10 12:00', '2025-04-10 13:00', ARRAY['subevent2.jpg'], 'poster2.jpg', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Taller para Niños: Cuida a tu Mascota', 'Actividad educativa para los más pequeños.', '2025-04-10 14:00', '2025-04-10 15:30', ARRAY['subevent3.jpg'], 'poster3.jpg', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Desfile de Mascotas', 'Evento divertido con premios para mascotas adoptadas.', '2025-04-10 16:00', '2025-04-10 17:30', ARRAY['subevent4.jpg'], 'poster4.jpg', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Cierre Musical', 'Concierto solidario para finalizar la jornada.', '2025-04-10 18:00', '2025-04-10 19:30', ARRAY['subevent5.jpg'], 'poster5.jpg', 1, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- 'Taller de Tenencia Responsable' (Concienciación y Educación, Evento ID: 6)
    ('Introducción a la Tenencia Responsable', 'Conceptos básicos para cuidar a los animales.', '2025-03-10 10:00', '2025-03-10 11:00', ARRAY['subevent1.jpg'], 'poster1.jpg', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Cuidados Veterinarios Básicos', 'Cómo detectar problemas de salud en mascotas.', '2025-03-10 11:30', '2025-03-10 12:30', ARRAY['subevent2.jpg'], 'poster2.jpg', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Alimentación Saludable para Mascotas', 'Consejos para una dieta equilibrada.', '2025-03-10 13:00', '2025-03-10 14:00', ARRAY['subevent3.jpg'], 'poster3.jpg', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Taller Práctico: Higiene Animal', 'Aprende sobre el aseo adecuado.', '2025-03-10 14:30', '2025-03-10 15:30', ARRAY['subevent4.jpg'], 'poster4.jpg', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Preguntas y Respuestas', 'Resuelve tus dudas con un experto.', '2025-03-10 16:00', '2025-03-10 17:00', ARRAY['subevent5.jpg'], 'poster5.jpg', 6, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- 'Mercadillo Solidario' (Recaudación de Fondos, Evento ID: 11)
    ('Apertura del Mercadillo', 'Inauguración oficial del evento.', '2025-05-01 10:00', '2025-05-01 10:30', ARRAY['subevent1.jpg'], 'poster1.jpg', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Zona de Manualidades', 'Compra artículos hechos a mano por voluntarios.', '2025-05-01 10:30', '2025-05-01 12:30', ARRAY['subevent2.jpg'], 'poster2.jpg', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Rifa Benéfica', 'Participa para ganar premios y ayudar.', '2025-05-01 13:00', '2025-05-01 14:00', ARRAY['subevent3.jpg'], 'poster3.jpg', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Demostración de Productos Ecológicos', 'Conoce alternativas sostenibles.', '2025-05-01 14:30', '2025-05-01 15:30', ARRAY['subevent4.jpg'], 'poster4.jpg', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Cierre del Mercadillo', 'Agradecimientos y resumen del evento.', '2025-05-01 16:00', '2025-05-01 16:30', ARRAY['subevent5.jpg'], 'poster5.jpg', 11, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- 'Caminata Solidaria' (Actividades al Aire Libre con Mascotas, Evento ID: 16)
    ('Inicio de la Caminata', 'Bienvenida y distribución de grupos.', '2025-04-10 09:00', '2025-04-10 09:30', ARRAY['subevent1.jpg'], 'poster1.jpg', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Parada de Hidratación', 'Descanso y agua para mascotas y dueños.', '2025-04-10 10:30', '2025-04-10 10:45', ARRAY['subevent2.jpg'], 'poster2.jpg', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Actividades en el Punto Medio', 'Juegos y charlas breves.', '2025-04-10 11:00', '2025-04-10 12:00', ARRAY['subevent3.jpg'], 'poster3.jpg', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Reanudación de la Caminata', 'Continúa la caminata hasta el punto final.', '2025-04-10 12:15', '2025-04-10 13:00', ARRAY['subevent4.jpg'], 'poster4.jpg', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Cierre con Reconocimientos', 'Entrega de premios y agradecimientos.', '2025-04-10 13:30', '2025-04-10 14:00', ARRAY['subevent5.jpg'], 'poster5.jpg', 16, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- 'Competencia de Agilidad' (Competiciones y Exhibiciones, Evento ID: 21)
    ('Registro de Participantes', 'Apertura para registrar a los competidores.', '2025-05-05 08:00', '2025-05-05 09:00', ARRAY['subevent1.jpg'], 'poster1.jpg', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Ronda Clasificatoria', 'Primera ronda para seleccionar finalistas.', '2025-05-05 09:30', '2025-05-05 11:30', ARRAY['subevent2.jpg'], 'poster2.jpg', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Pausa y Zona de Relax', 'Espacio para descansar y socializar.', '2025-05-05 12:00', '2025-05-05 12:30', ARRAY['subevent3.jpg'], 'poster3.jpg', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Ronda Final', 'Los mejores competidores se enfrentan.', '2025-05-05 13:00', '2025-05-05 14:30', ARRAY['subevent4.jpg'], 'poster4.jpg', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Entrega de Premios', 'Premiación y cierre del evento.', '2025-05-05 15:00', '2025-05-05 15:30', ARRAY['subevent5.jpg'], 'poster5.jpg', 21, 'Confirmed', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_EventCategories (
    idCategory SERIAL PRIMARY KEY,
    categoryName VARCHAR(100) NOT NULL,
    imageURL VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO E_EventCategories (categoryName, imageURL, createdAt, updatedAt)
VALUES
    ('Gaming', '\src\assets\e_img\categories\Gaming.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Conferencias', '\src\assets\e_img\categories\Conferencias.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Festivales', '\src\assets\e_img\categories\Festivales.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Deportes', '\src\assets\e_img\categories\Deportes.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Naturaleza', '\src\assets\e_img\categories\Naturaleza.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_EventCategories (
    idCategory SERIAL PRIMARY KEY,
    categoryName VARCHAR(100) NOT NULL,
    imageURL VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserción de categorías de eventos para Pawnity
INSERT INTO P_EventCategories (categoryName, imageURL, createdAt, updatedAt)
VALUES
    ('Adopción Responsable', '\src\assets\p_img\categories\AdopcionResponsable.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Concienciación y Educación', '\src\assets\p_img\categories\ConcienciacionEducacion.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Recaudación de Fondos', '\src\assets\p_img\categories\RecaudacionFondos.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Actividades al Aire Libre con Mascotas', '\src\assets\p_img\categories\ActividadesAireLibre.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Competiciones y Exhibiciones', '\src\assets\p_img\categories\CompeticionesExhibiciones.webp', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_TicketInfo (
    idTicketInfo SERIAL PRIMARY KEY,
    idEvent INT,
    type VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    capacity INT,
    descripcion VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserción de tipos de tickets en E_TicketInfo
INSERT INTO E_TicketInfo (idEvent, type, price, capacity, descripcion, createdAt, updatedAt)
VALUES
    (NULL, 'Entrada General', 20.00, 1000, 'Acceso general al evento, sin áreas restringidas.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (NULL, 'Entrada VIP', 50.00, 200, 'Acceso a áreas VIP con asientos preferenciales y beneficios exclusivos.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (NULL, 'Entrada Familiar', 60.00, 500, 'Incluye acceso para dos adultos y dos niños.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (NULL, 'Entrada de Grupo', 90.00, 300, 'Descuento para grupos de hasta cinco personas.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (NULL, 'Entrada Estudiante', 15.00, 500, 'Descuento especial para estudiantes con credencial válida.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_TicketInfo (
    idTicketInfo SERIAL PRIMARY KEY,
    idEvent INT,
    type VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    capacity INT,
    descripcion VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserción de tipos de tickets en E_TicketInfo
INSERT INTO E_TicketInfo (idEvent, type, price, capacity, descripcion, createdAt, updatedAt)
VALUES
    (NULL, 'Entrada General', 20.00, 1000, 'Acceso general al evento, sin áreas restringidas.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (NULL, 'Entrada VIP', 50.00, 200, 'Acceso a áreas VIP con asientos preferenciales y beneficios exclusivos.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (NULL, 'Entrada Familiar', 60.00, 500, 'Incluye acceso para dos adultos y dos niños.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (NULL, 'Entrada de Grupo', 90.00, 300, 'Descuento para grupos de hasta cinco personas.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (NULL, 'Entrada Estudiante', 15.00, 500, 'Descuento especial para estudiantes con credencial válida.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TYPE orderStatusEnum AS ENUM ('pendingNomination', 'completed', 'cancelled', 'inClaim', 'refunded');
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_Order (
    idOrder SERIAL PRIMARY KEY,
    idClient INT,
    idEvents INT,
    datePurchase TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    totalPrice DECIMAL(10, 2),
    payment VARCHAR(50),
    status orderStatusEnum DEFAULT 'pendingNomination',
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
    idEvents INT,
    datePurchase TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    totalPrice DECIMAL(10, 2),
    payment VARCHAR(50),
    status orderStatusEnum DEFAULT 'pendingNomination',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TYPE orderLineStatusEnum AS ENUM ('active', 'inClaim', 'refunded');
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_OrderLine (
    idOrderLine SERIAL PRIMARY KEY,
    idOrder INT,
    idTicketInfo INT,
    quantity INT NOT NULL,
    unitPrice DECIMAL(10, 2) NOT NULL,
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
    idOrder INT,
    idTicketInfo INT,
    quantity INT NOT NULL,
    unitPrice DECIMAL(10, 2) NOT NULL,
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
    idOrder INT,
    code VARCHAR(50) UNIQUE NOT NULL,
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
    idOrder INT,
    code VARCHAR(50) UNIQUE NOT NULL,
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
    idComplements SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    imageURL VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO E_Complements (name, description, price, imageURL, createdAt, updatedAt)
VALUES
    ('Pack Bebida', 'Incluye 2 bebidas a elegir.', 5.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Camiseta', 'Camiseta oficial del evento.', 15.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Gorra', 'Gorra con el logo del evento.', 10.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Mochila', 'Mochila ecológica conmemorativa.', 20.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Pulsera', 'Pulsera de acceso al área VIP.', 8.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Poster', 'Póster oficial del evento.', 7.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Merchandising Variado', 'Pack con artículos del evento.', 25.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Parche', 'Parche bordado exclusivo del evento.', 6.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Bolsa de Tela', 'Bolsa reutilizable con diseño del evento.', 12.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Taza', 'Taza conmemorativa del evento.', 10.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_Complements (
    idComplements SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    imageURL VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO P_Complements (name, description, price, imageURL, createdAt, updatedAt)
VALUES
    ('Pack Bebida', 'Incluye 2 bebidas a elegir.', 5.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Camiseta', 'Camiseta oficial del evento.', 15.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Gorra', 'Gorra con el logo del evento.', 10.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Mochila', 'Mochila ecológica conmemorativa.', 20.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Pulsera', 'Pulsera de acceso al área VIP.', 8.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Poster', 'Póster oficial del evento.', 7.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Merchandising Variado', 'Pack con artículos del evento.', 25.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Parche', 'Parche bordado exclusivo del evento.', 6.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Bolsa de Tela', 'Bolsa reutilizable con diseño del evento.', 12.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Taza', 'Taza conmemorativa del evento.', 10.00, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END
$do$;

DO
$do$
BEGIN
CREATE TYPE ticketComplementsStatusEnum AS ENUM ('pending', 'used', 'inClaim', 'refunded');
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_TicketComplements (
    idTicketComplements SERIAL PRIMARY KEY,
    idTicketUnit INT,
    idComplements INT,
    quantity INT NOT NULL,
    subtotal DECIMAL(10, 2),
    status ticketComplementsStatusEnum DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_TicketComplements (
    idTicketComplements SERIAL PRIMARY KEY,
    idTicketUnit INT,
    idComplements INT,
    quantity INT NOT NULL,
    subtotal DECIMAL(10, 2),
    status ticketComplementsStatusEnum DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
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
CREATE TYPE petGender AS ENUM ('male', 'female');
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
    status petStatus DEFAULT 'available',
    orgId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isActive BOOLEAN DEFAULT TRUE
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
    adoptionDate DATE DEFAULT CURRENT_DATE,
    lastReviewDate DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isActive BOOLEAN DEFAULT TRUE
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_Sponsorships (
    idSponsorship SERIAL PRIMARY KEY,
    idClient INT,
    idPet INT,
    startDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    endDate TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isActive BOOLEAN DEFAULT TRUE
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

DO
$do$
BEGIN
CREATE TABLE E_TicketHistory(
    idTicketHistory SERIAL PRIMARY KEY,
    idOrder INT,
    idEvent INT,
    idTicketUnit INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_TicketHistory(
    idTicketHistory SERIAL PRIMARY KEY,
    idOrder INT,
    idEvent INT,
    idTicketUnit INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;