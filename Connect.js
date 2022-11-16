const mongoose = require ( 'mongoose' ); 


const db = "mongodb+srv://supheroDb:panda123@moviesandheroes.yts5dj4.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect (db).then (() =>{
    
    console.log("Successfully connected to Database!");

}).catch(() => { console.log ("Failed to connect to Database");

})

const dbSchema = new mongoose . Schema ({
    movieTitle : {type : String },
    movieActors : {type : String },
    movieLanguage : {type : String},
    movieYear : {type : String },
    movieDirector : {type : String },
    movieWriter : {type : String },
    movieBoxOffice : {type : String},
    movieRating : {type : String},
    heroName : {type : String },
    heroGender : {type : String },
    heroRace : {type : String },
    heroOccupation : {type : String },
    heroRelatives : {type : String }
}
);

const Record = mongoose.model ('movieRecord', dbSchema);
module.exports = Record;