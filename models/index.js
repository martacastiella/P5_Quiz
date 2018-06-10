
const Sequelize = require('sequelize');

//url para poder acceder a la base de datos, logging false para que no salgan trazas
const sequelize = new Sequelize("sqlite:quizzes.sqlite", {logging: false});

// defino el modelo de datos tipo 'quiz'
//cada vez que defino un modelo dentro de sequelize se crea un array llamado MODELS
//donde se guardan todos los modelos
sequelize.define('quiz', {
    question:{
        type: Sequelize.STRING,
        unique: { msg: "Ya existe esta pregunta"},
        validate: { notEmpty :{ msg: "La pregunta no puede estar vacía" }}
    },
    answer:{
        type: Sequelize.STRING,
        validate: { notEmpty :{ msg: "La pregunta no puede estar vacía"}}
    }
});


// la sincronización es una promesa que comprueba si ya existe la base de datos
//si no exite la crea
//.then() construye otra promesa para contar cuantos modelos hay
// then() cuando ya tengo el valor de la cuenta si es 0 creo varios quizzes

sequelize.sync()
    .then( () => sequelize.models.quiz.count())
.then(count => {
    if(!count) {
    // pongo un return en la promesa para que el then espere hasta que se temrine de crear el array
    return sequelize.models.quiz.bulkCreate([

        { question : "Capital de Italia", answer: "Roma"},
        { question : "Capital de Francia", answer: "París"},
        { question : "Capital de España", answer: "Madrid"},
        { question : "Capital de Portugal", answer: "Lisboa"}

    ]);
}
})
.catch(error => {
    console.log(error);
});

module.exports = sequelize;