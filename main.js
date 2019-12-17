$(document).ready(function() {

    var templateFunction = Handlebars.compile($('#template').html());

    $('button').click(function () {
        // uso .hide per resettare la ricerca ogni volta
        searchMovieSeriesTv();
    });

    $('.search').keypress(function(event) {
    // il pulsante invia equivale a 13
        if(event.which == 13 ){
            searchMovieSeriesTv();
        };
    });

    // funzione per ricercare i film e serieTv
    function searchMovieSeriesTv(ricercaUtente) {
        // leggo il valore dell'input dela ricerca
        var ricercaUtente = $('.header-right input').val();
        // se la ricerca non è vuota
        if (ricercaUtente != 0) {
            $('main p').text('Risultato ricerca: "' + ricercaUtente +'"')
            $('.header-right input').val('');
            $('.film-container').empty();
            // creo una variabile per ajax film
            var ajaxMovie = $.ajax({
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
            // creo una variabile per ajax serietv
            var ajaxSeriesTv = $.ajax({
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
                        },
                        // in caso di errore
                        'error': function() {
                            alert('Error')
                        }
                    });
        // se la ricerca è vuota faccio comparire questo alert
        } else {
            $('main p').text('Inserisci un titolo di un film o serie tv.');
        }
    };

    // funzione per ricercare le serieTv
    // function searchSeriesTV(ricercaUtente) {
    //     var ricercaUtente = $('.header-right input').val();
    //     if (ricercaUtente != 0) {
    //         $('.header-right input').val('');
    //         $.ajax({
    //             // uso url della api di themoviedb
    //             'url': 'https://api.themoviedb.org/3/search/tv',
    //             // allego questi dati all'url
    //             'data': {
    //                 // la mia chiave api
    //                 'api_key': '8f20fb07349b7328a5884d56f17b612d',
    //                 // il query, che sarebbe il titolo del film, in questo caso quelo che scrive l'utente
    //                 'query': ricercaUtente,
    //                 // la lingua italiana
    //                 'language': 'it-IT'
    //             },
    //             'method': 'GET',
    //             'success': function(data) {
    //                 // richiamo la funzione delle informazione della serie tv
    //                 infoSeriesTv(data.results);
    //                 console.log(data.results);
    //             },
    //             // in caso di errore
    //             'error': function() {
    //                 alert('Error')
    //             }
    //         });
    //     } else {
    //         alert('Inserisci un titolo.')
    //     }
    // };

    // creo una funzione per estrarre le informazione dei film dall'api
    function infoMovie(movie) {
        // uso un ciclo for visto che mi verrà restituita un array di oggetti
        for (var i = 0; i < movie.length; i++) {
            // creo le varie variabili per andare a prendere i dati di cui ho bisogno
            if (movie[i].poster_path != null){
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

            } else {
                !$('.film-container').append(html);
            }
        };
    };

    // creo una funzione per estrarre le informazione delle serieTv dall'api
    function infoSeriesTv(seriesTv) {
        // uso un ciclo for visto che mi verrà restituita un array di oggetti
        for (var i = 0; i < seriesTv.length; i++) {
            if (seriesTv[i].poster_path != null) {
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

            } else {
                !$('.film-container').append(html);
            }
        };
    };
});
