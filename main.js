$(document).ready(function() {

    var templateFunction = Handlebars.compile($('#template').html());

    $('button').click(function () {
        searchMovie();
    });

    $('.search').keypress(function(event) {
    // il pulsante invia equivale a 13
        if(event.which == 13 ){
            searchMovie();
        };
    });


    // funzione per ricercare i film
    function searchMovie(ricercaUtente) {
        var ricercaUtente = $('.header-right input').val();
        $.ajax({
            // uso url della api di themoviedb
            'url': 'https://api.themoviedb.org/3/search/movie',
            // allego questi dati all'url
            'data': {
                // la mia chiave api
                'api_key': '8f20fb07349b7328a5884d56f17b612d',
                // il query, che sarebbe il titolo del film, in questo caso quelo che scrive l'utente
                'query': ricercaUtente,
                // la lingua italiana
                'language': 'it-IT'
            },
            'method': 'GET',
            'success': function(data) {
                // richiamo la funzione delle informazione del film
                infoMovie(data.results);
            },
            // in caso di errore
            'error': function() {
                alert('Error');
            }
        });
    };

    // creo una funzione che mi va a leggere le info che voglio dalla mia api
    function infoMovie(movie) {
        // uso un ciclo for visto che mi verrà restituita un array di oggetti
        for (var i = 0; i < movie.length; i++) {
            // creo le varie variabili per andare a prendere i dati di cui ho bisogno
            var title = movie[i].title;
            var originalTitle = movie[i].original_title;
            var language = movie[i].original_language;
            // arrotondo per eccesso il numero della votazione e diviso per due per fare la votazione da 0 a 5
            var vote = (Math.ceil(movie[i].vote_average)) / 2;
            // info da sostituire nel mio handlebars template
            var info = {
                'title': title,
                'original-title': originalTitle,
                'language': language,
                'vote': vote
            };
            // creo una variabile che mi compili le info con una funzione
            var html = templateFunction(info);
            //  le appendo al container
            $('.film-container').append(html);
        };
    };
});
