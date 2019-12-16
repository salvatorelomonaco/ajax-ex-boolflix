$(document).ready(function() {

    var templateFunction = Handlebars.compile($('#template').html());

    $('button').click(function () {
        // uso .hide per resettare la ricerca ogni volta
        $('.film').hide();
        searchMovie();
        searchSeriesTV();
    });

    $('.search').keypress(function(event) {
    // il pulsante invia equivale a 13
        if(event.which == 13 ){
            $('.film').hide();
            searchMovie();
            searchSeriesTV();
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
                alert('Error')
            }
        });
    };

    // funzione per ricercare le serieTv
    function searchSeriesTV(ricercaUtente) {
        var ricercaUtente = $('.header-right input').val();
        $.ajax({
            // uso url della api di themoviedb
            'url': 'https://api.themoviedb.org/3/search/tv',
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
                // richiamo la funzione delle informazione della serie tv
                infoSeriesTv(data.results);
                console.log(data.results);
            },
            // in caso di errore
            'error': function() {
                alert('Error')
            }
        });
    };

    // creo una funzione per estrarre le informazione dei film dall'api
    function infoMovie(movie) {
        // uso un ciclo for visto che mi verrà restituita un array di oggetti
        for (var i = 0; i < movie.length; i++) {
            // creo le varie variabili per andare a prendere i dati di cui ho bisogno
            // if (movie[i].poster_path == null){
            //     $('.film').hide();
            // } else {
                var title = movie[i].title;
                var originalTitle = movie[i].original_title;
                var language = movie[i].original_language;
                // arrotondo per eccesso il numero della votazione e diviso per due per fare la votazione da 0 a 5
                var vote = (Math.ceil(movie[i].vote_average)) / 2;
                var img = movie[i].poster_path;
                var description = movie[i].overview;
                // info da sostituire nel mio handlebars template
                var info = {
                    'title': title,
                    'original-title': originalTitle,
                    'language': language,
                    'vote': vote,
                    'poster': img,
                    'overview': description
                };
                // creo una variabile che mi compili le info con una funzione
                var html = templateFunction(info);
                //  le appendo al container
                $('.film-container').append(html);
        };
    };

    // creo una funzione per estrarre le informazione delle serieTv dall'api
    function infoSeriesTv(seriesTv) {
        // uso un ciclo for visto che mi verrà restituita un array di oggetti
        for (var i = 0; i < seriesTv.length; i++) {
            // creo le varie variabili per andare a prendere i dati di cui ho bisogno
            var title = seriesTv[i].name;
            var originalTitle = seriesTv[i].original_name;
            var language = seriesTv[i].original_language;
            // arrotondo per eccesso il numero della votazione e diviso per due per fare la votazione da 0 a 5
            var vote = (Math.ceil(seriesTv[i].vote_average)) / 2;
            var img = seriesTv[i].poster_path;
            var description = seriesTv[i].overview;
            // info da sostituire nel mio handlebars template
            var info = {
                'title': title,
                'original-title': originalTitle,
                'language': language,
                'vote': vote,
                'poster': img,
                'overview': description
            };
            // creo una variabile che mi compili le info con una funzione
            var html = templateFunction(info);
            //  le appendo al container
            $('.film-container').append(html);
        };
    }
});
