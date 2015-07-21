
var p = new Object();
p.apiKey="626559fd3799f9466c64ea0daa420543";
p.baseUrl="";


p.get = function (id) {
    return document.getElementById(id);
};

p.getMovies = function () {
    //    var xhr = new XMLHttpRequest();
    //    xhr.open("GET",
    //             "http://odata.netflix.com/Catalog/Genres('Mexican%20Movies')/Titles/?$top=5&$callback=callback&$format=json",
    //             false);
    //    xhr.send();
    var selected = p.get("ListeCategories").value;
    var getGenres="https://api.themoviedb.org/3/discover/movie?api_key=" + p.apiKey + "&with_genres=" + selected ;
    var req = new XMLHttpRequest();
    req.open('GET', getGenres);
    req.setRequestHeader('Accept', 'application/json');
    req.onreadystatechange = function () {
       if (this.readyState === 4) {
           console.log(this.responseText);
          var list = JSON.parse(this.responseText);
          p.afficherFilms(list);
          
       }
    };

    req.send();
    
    
};


p.afficherFilms = function (json) {
    var para, h3, br, img;
    p.get("main").textContent = "";
    for (var i = 0; i < json.results.length; i += 1) {
        img = document.createElement('img');
        para = document.createElement('p');
        h3 = document.createElement('h3');
        br = document.createElement('br');

        para.textContent = json.results[i].overview;
        h3.textContent = json.results[i].title;
        img.src = p.baseUrl + "w185" + json.results[i].poster_path;
        img.className = "gauche";
        br.className = "clear";


        p.get("main").appendChild(img);
        p.get("main").appendChild(h3);
        p.get("main").appendChild(para);
        p.get("main").appendChild(br);
    }
};


p.initConfig = function()  {
    var getConfig="https://api.themoviedb.org/3/configuration?api_key=" + p.apiKey;
    var req = new XMLHttpRequest();
    req.open('GET', getConfig);
    req.setRequestHeader('Accept', 'application/json');
    req.onreadystatechange = function () {
       if (this.readyState === 4) {
          var list = JSON.parse(this.responseText);
          p.baseUrl = list.images.base_url;
       
       }
    };

    req.send();
};
    


p.pageLoad = function () {
    //code pour aller chercher les films.
    p.get("getFilmsButton").onclick = p.getMovies;
    p.initConfig();

    var getGenres="https://api.themoviedb.org/3/genre/movie/list?api_key=" + p.apiKey;
    var req = new XMLHttpRequest();
    req.open('GET', getGenres);
    req.setRequestHeader('Accept', 'application/json');
  
    req.onreadystatechange = function () {
       if (this.readyState === 4) {
          var list = JSON.parse(this.responseText);
          var op;
          for (var i = 0; i < list.genres.length; i += 1) {
             op = document.createElement("option");
             op.textContent = list.genres[i].name;
             op.value = list.genres[i].id;
             p.get("ListeCategories").appendChild(op);
          }
       }
    };

    req.send();
};

window.onload = p.pageLoad;