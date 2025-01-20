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
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phoneNumber VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    bio VARCHAR(255),
    avatarUrl VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
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
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    NIF VARCHAR(20) UNIQUE NOT NULL,
    address VARCHAR(200),
    urlLogo VARCHAR(255),
    description VARCHAR(255),
    urlWeb VARCHAR(255),
    urlImage VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
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
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(20),
    avatarUrl VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
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
    isActive BOOLEAN DEFAULT TRUE,
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
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    NIF VARCHAR(20) UNIQUE NOT NULL,
    address VARCHAR(200),
    urlLogo VARCHAR(255),
    description VARCHAR(255),
    urlWeb VARCHAR(255),
    urlImage VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
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
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(20),
    avatarUrl VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
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
END
$do$;

DO
$do$
BEGIN
CREATE TABLE E_EventCategories (
    idCategory SERIAL PRIMARY KEY,
    categoryName VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
END
$do$;

DO
$do$
BEGIN
CREATE TABLE P_EventCategories (
    idCategory SERIAL PRIMARY KEY,
    categoryName VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
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
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
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
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
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