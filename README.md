# Up Task
Se trata de una aplicacion backend para organizar proyectos con sus respectivas tareas (**App Todolist**), donde se mostrara un listado con las tareas realizadas y las pendientes.
El proyecto cuenta con control de usuario por medio de email y contraseña y con la funcionalidad de reestablecerla en caso de olvidarla via email.
## Comenzando 🚀
Para poner en marcha este proyecto de manera local en tu equipo debes clonar el repositorio y contar con algunos requisitos.
### Pre-requisitos 📋
1. [**Node.js**](https://nodejs.org/es/ "link a Node.js")
2. [**MySql 5.7**](https://downloads.mysql.com/archives/installer/ "link a Mysql 5.7") ( en versiónes posteriores a 5.7 puede llegar a dar algunos errores o advertencias )
3. **Credenciales de servicio SMTP para el envio de emails** (pueden utilizar el servicio gratuito de [Mailtrap](https://mailtrap.io/ "link a Mailtrap"). En ese caso, los email le llegarán a la bandeja de entrada de su cuenta de mailtrap independientemente del email que se registre en uptask).
*Ejemplo de credenciales SMTP*
**Host:** smtp.gmail.com, **Port:** 587, **User:** example@gmail.com, **Password:** 75b4c57d45h54de6.

### Instalación y configuraciónes 🔧
```
git clone https://github.com/JoaquinLoiza/upTaskNodeJS.git
```
```
cd upTaskNodeJS
```
```
npm install
```

### Variables de entorno
Luego deberas crear un archivo para las variables de entorno que se deberá llamar **variables.env**
en el mismo deberas cargar las siguientes variables y los valores que correspondan segun tu caso.

```
# Variables de la base de datos
BD_NOMBRE=nombre_de_la_base_de_datos
BD_USER=root
BD_PASS=root
BD_HOST=127.0.0.1
BD_PORT=3306

# Variables del servicio SMTP
EM_USER=example.example@gmail.com
EM_PASS=75b4c57d45h54de6
EM_HOST=smtp.gmail.com
EM_PORT=587

# Variables del servidor local
HOST=localhost
PORT=3000
```

## Puesta en marcha ⚙️

Ejecute el siguiente comando en la ruta raiz del proyecto
```
npm run desarollo
```

Si todo salió bien, se debería ver lo siguiente:

![code](https://i.ibb.co/fGjzmQq/1.png)

#### En el navegador ingresando a localhost con el puerto que elegimos deberemos ver la pantalla de inicio de sesión

![code](https://i.ibb.co/80ZsnDK/upTask.png)

---
con ❤️ por  [JoaquinLoiza](https://github.com/JoaquinLoiza) ⌨️ 