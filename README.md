# sistema_evaluacion_backend


- Para correr el proyecto con los datos por defecto de los roles y preguntas de los modelos de calidad:

    ```bash
        npm install
        npx sequelize-cli db:create  // para crear la base de datos local
        npx sequelize-cli db:migrate // para correr las migraciones
        npx sequelize-cli db:migrate:status // para ver el estado de las migraciones
        npx sequelize-cli db:seed:all // para ingresar datos de roles y de preguntas para los modelos de calidad

        npm run dev // para correr el servidor
    ```