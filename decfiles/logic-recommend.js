
// templist contains the list of recommendations
var movies_list = JSON.parse(templist).recommendations;
//console.log(movies_list);
var pp = document.getElementById('va');
const spinner = document.getElementById("spinner");
spinner.removeAttribute('hidden');
var output = ``;


//using promise all to fetch all the request at once and then render
let requests = movies_list.map(movie => fetch(`https://www.omdbapi.com/?t=${movie}&apikey=thewdb`));

Promise.all(requests).then(responses => {
    return responses;
})
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(res => {
        res.forEach(data => {
            output += `
        <div class="card movie_card">
            <div>
                <img class="card-img-top size" src="${data.Poster}">
                <i class="fas fa-play play_button mybtn" data-placement="bottom" title="Play Trailer"
                value=" ${data.Title}  ${data.Year} trailer" data-toggle="modal"
                data-target="#myModal" data-toggle2="tooltip"></i>
                </div>
                <div class="card-body">
                   
                       
                    <h5 class="card-title justify-content-center"><span id="font">
                        ${data.Title}
                    </span></h5>
                   
                    <div class="my-4">
                        <h3 class="movie_info sizing">Year Release :${data.Year}
                    </h3>
                        <h3 class="movie_info">IMDB ID :${data.imdbID}
                    </h3>
                        <h3 class="movie_info">Type :${data.Type}
                    </h3>
                    </div>
                    <div class="d-flex flex-column">
                    <div class="d-flex justify-content-center">
                      <form action="/explore" method="GET">
                        <button class="btn btn-lg btn-primary" style="border-radius: 12px;" type="submit" name="title"
                          value="${data.Title}">EXPLORE <i class="fas fa-angle-double-right"></i></button>
                      </form>
                    </div>
                    
                    <div class="d-flex justify-content-center mt-3">
                      <form action="/recommend" method="GET">
                        <button class="btn btn-lg btn-primary" style="border-radius: 12px;" type="submit" name="movie_name"
                          value="${data.Title}">RECOMMEND SIMILAR</button>
                      </form>
                    </div>
                  </div>
                </div>
            </div>
        `
        });
        spinner.setAttribute('hidden', '');
        //rendering back to frontend
        pp.innerHTML = output;
    });
