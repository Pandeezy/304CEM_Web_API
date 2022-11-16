const Record = require('./Connect');
const express = require('express');
const app = express();
const axios = require ('axios');
var Title, Year, Actors, Director, Writer, Language, BoxOffice, imdbRating;
var SHname, SHgen, SHrace, SHjob, SHfam, SHimg;

const apikey = 'b194c0e2';

app.get('/findMovie',(req,res)=>{

    const title = req.query.title;
    const querystr = `http://www.omdbapi.com/?t=${title}&apikey=${apikey}`;
    
    
    
    
    axios.get(querystr).then((response)=>{
    Title = response.data.Title;
    Actors = response.data.Actors;
        
    Language = response.data.Language;
    Year = response.data.Year;
    Writer = response.data.Writer;
    BoxOffice = response.data.BoxOffice;
    Director = response.data.Director;
    imdbRating = response.data.imdbRating;
    
    const movie = response.data.Title;
    const querystr2 = `https://www.superheroapi.com/api.php/6201247949888573/search/${movie}`;


    
    axios.get(querystr2).then( (response) =>{

        SHname = response.data.results[0].name;
        SHgen = response.data.results[0].appearance.gender;
        SHrace = response.data.results[0].appearance.race;
        SHjob = response.data.results[0].work.occupation;
        SHfam = response.data.results[0].connections.relatives;
        SHimg = response.data.results[0].image.url;

    superheroMOVdetails = new Record({
        movieTitle:Title,
        movieYear:Year,
        movieLanguage:Language,
        movieActors:Actors,
        movieDirector:Director,
        movieWriter:Writer,
        movieBoxOffice:BoxOffice,
        movieRating:imdbRating,
        heroName:SHname,
        heroGender:SHgen,
        heroRace:SHrace,
        heroOccupation:SHjob,
        heroRelatives:SHfam
    });
    
    
    superheroMOVdetails.save().then(result=>{
        console.log("Successfully executed!"+result);
    }).catch(error=>{
        console.log("An error has occurred!"+error);
    });



    
    //DISPLAYING THE MOVIES DETAILS AND SUPERHERO DETAILS
    res.send("<hr><h1><center>MOVIE DETAILS</center></h1><br><br><br><p><b>Title:</b></p>" + Title + "<p><b>Release Year:</b></p>" 
    + Year + 
    "<p><b>Actors:</b></p>" + Actors +
    "<p><b>Director(s):</b></p>" + Director + "<p><b>Writer(s):</b></p>" + Writer + "<p><b>Film Language:</b></p>" + Language +
    "<p><b>Box Office Sales:</b></p>" + BoxOffice + "<p><b>IMDb Ratings:</b></p>" + imdbRating
    + "<hr><h1><center>SUPERHERO DETAILS</center></h1><br><br><br>" 
    +"<center><img src=\"" + SHimg + "\" width=\"300\" height=\"300\"></center>"
    +"<br><br><p><b>Name:</b></p>" + SHname +
    "<p><b>Gender:</b></p>" + SHgen + "<p><b>Race:</b></p>" + SHrace + "<p><b>Occupation:</b></p>" + SHjob + 
    "<p><b>Relatives:</b></p>" + SHfam + "<br>" + 
     "<hr><br><br><br><center><h2><b>Record has been added into Database!</b></h2></center>");
}
    );
        
    }
    );
    });




//TO DELETE A SPECIFIC MOVIE RECORD FROM THE DATABASE    
app.get('/deleteMovieRecord',(req,res)=>{

    const title = req.query.title;
    console.log(title);
    Record.deleteOne({Title: Title},function(err){
        if (err) return handleError(err);
    });

res.send(title + " Movie has been deleted!");    
});


// TO DELETE ALL THE MOVIE RECORDS FROM THE DATABASE
app.get('/deleteAllMovies', (req,res)=>{
    const title = req.query.title;
    console.log(title);
    Record.deleteMany(function (err){
        if (err) return handleError(err);
    });

    res.send("All movies are deleted!");

});



// TO UPDATE A RECORD IN THE DATABASE. (e.g. Changing the title, year of release, etc.)
Record.updateOne({movieTitle: 'Iron Man'}, {movieYear: '2009'},function(err,res){
});

app.listen(5000);


