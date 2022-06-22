<h1 align="center">TeachMeSkills Final Project</h1>
<h2 align="center">Cash Control Application</h2>

<!-- TABLE OF CONTENTS -->
<details>
  <summary style="font-weight: bold; font-size: large">Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#main-technologies">Main Technologies</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#basic">Basic</a></li>
        <li><a href="#docker">Docker</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## 📄 About The Project

![](./screenshots/home-page.png)

### Main Technologies

| **Database** |                                                                       [![Postgresql](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)                                                                       |
|:------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| **Backend**  |                  [![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)](https://dev.java/) [![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/)                   |
| **Frontend** | [![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://www.javascript.com/) [![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/) |

--- 

## ⚙️ Getting Started

To get a local copy up and running follow these simple steps.

* Clone the repository

```
git clone https://github.com/IvanHayel/cash-control-application.git
```

* Create PostgreSQL database

```sql
CREATE DATABASE cash_control
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_World.1252'
    LC_CTYPE = 'English_World.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
```

<h3 align="center">Basic</h3>

#### Frontend
> You can use `npm` or `yarn`.

1. Move to the `cash-control-client` folder and install dependencies

```console
yarn install
```

2. Run the application

```console
yarn run start
```

#### Backend

1. Move to the `cash-control-server` folder and just run spring-boot application

```console
mvn spring-boot:run
```

<h3 align="center">Docker</h3>

Application can be run in `Docker` container.

1. Package the application with `Maven` to `jar` file
```console
mvn clean package
```
or with skipping tests
```console
mvn clean package -DskipTests
```

2. Use `docker-compose` in root folder to run the application
```console
docker-compose up
```

---

## 🎮 Usage

---

## 📱 Contact
