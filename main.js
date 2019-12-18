$(document).ready(function() {

    $('button').click(function () {
        $('.layout').hide();
        newSearch();
        // uso .hide per resettare la ricerca ogni volta
        var ricercaUtente = $('.header-right input').val();
        $('main p').addClass('active');
        searchMovieSeriesTv(ricercaUtente);
    });

    $('.search').keypress(function(event) {
        newSearch();
        var ricercaUtente = $('.header-right input').val();
    // il pulsante invia equivale a 13
        if(event.which == 13 ){
            $('.layout').hide();
            $('main p').addClass('active');
            searchMovieSeriesTv(ricercaUtente);
        };
    });

    function newSearch() {
        $('.film-container').empty();
        $('.serieTv-container').empty();
    }

    // funzione per ricercare i film e serieTv
    function searchMovieSeriesTv(ricerca) {
        // se la ricerca non è vuota
        if (ricerca != 0) {
            $('main p:first-child').text('Risultato ricerca: "' + ricerca +'"')
            // creo una variabile per ajax film
            $.ajax({
                // uso url della api di themoviedb
                'url': 'https://api.themoviedb.org/3/search/movie/',
                // allego questi dati all'url
                'data': {
                    // la mia chiave api
                    'api_key': '8f20fb07349b7328a5884d56f17b612d',
                    // il query, che sarebbe il titolo del film, in questo caso quelo che scrive l'utente
                    'query': ricerca,
                    // la lingua italiana
                    'language': 'it-IT'
                },
                'method': 'GET',
                'success': function(data) {
                    // richiamo la funzione delle informazione del film
                    infoShow(data.results);
                    $('.header-right input').val('');
                },
                // in caso di errore
                'error': function() {
                    alert('Error')
                }
            });
            // creo una variabile per ajax serietv
            $.ajax({
                // uso url della api di themoviedb
                'url': 'https://api.themoviedb.org/3/search/tv/',
                // allego questi dati all'url
                'data': {
                    // la mia chiave api
                    'api_key': '8f20fb07349b7328a5884d56f17b612d',
                    // il query, che sarebbe il titolo del film, in questo caso quelo che scrive l'utente
                    'query': ricerca,
                    // la lingua italiana
                    'language': 'it-IT'
                },
                'method': 'GET',
                'success': function(data) {
                    console.log(data.results);
                    // richiamo la funzione delle informazione della serie tv
                    infoShow(data.results);
                    $('.header-right input').val('');
                },
                // in caso di errore
                'error': function() {
                    alert('Error')
                }
            });
        // se la ricerca è vuota faccio comparire questo alert
        } else {
            $('main p:first-child').text('Inserisci un titolo di un film o serie tv.');
        }
    };

    // creo una funzione per estrarre le informazione dei film dall'api
    function infoShow(show) {
        var templateFunction = Handlebars.compile($('#template').html());
        // uso un ciclo for visto che mi verrà restituita un array di oggetti
        for (var i = 0; i < show.length; i++) {
            // creo le varie variabili per andare a prendere i dati di cui ho bisogno
            var titleMovie = show[i].title;
            var titleSerieTV = show[i].name;
            var originalTitleMovie = show[i].original_title;
            var originalTitleSerieTV = show[i].original_name;
            var language = show[i].original_language;
            // aggiungo i vari casi delle lingue per sostituire con le bandiere
            switch (language) {
                case 'en':
                    var language = '<img src="https://www.countryflags.io/us/flat/24.png">';
                    break;
                case 'it':
                    var language = '<img src="https://www.countryflags.io/it/flat/24.png">';
                    break;
                case 'es':
                    var language = '<img src="https://www.countryflags.io/es/flat/24.png">';
                    break;
                case 'de':
                    var language = '<img src="https://www.countryflags.io/de/flat/24.png">';
                    break;
                case 'fr':
                    var language = '<img src="https://www.countryflags.io/fr/flat/24.png">';
                    break;
                case 'ja':
                    var language = '<img src="https://www.countryflags.io/jp/flat/24.png">';
                    break;
                default:
                    var language = show[i].original_language;
            }
            // arrotondo per eccesso il numero della votazione e diviso per due per fare la votazione da 0 a 5
            var voto = Math.ceil((show[i].vote_average) / 2);
            var stellaPiena = '<i class="fas fa-star"></i>';
            var stellaVuota = '<i class="far fa-star"></i>';
            var stelle = '';
            for (var j = 0; j < 5; j++) {
                if (j < voto) {
                    stelle = stelle + stellaPiena;
                } else {
                    stelle = stelle + stellaVuota;
                }
            };
            var img = 'https://image.tmdb.org/t/p/w342' + show[i].poster_path;
            if (show[i].poster_path == null) {
                img = 'https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg';
            }
            var description = show[i].overview;
            if (description.length == 0) {
                description = 'No description available.'
            }
            // info da sostituire nel mio handlebars template
            var info = {
                'title': titleMovie || titleSerieTV,
                'original-title': originalTitleMovie || originalTitleSerieTV,
                'language': language,
                'vote': stelle,
                'poster': img,
                'overview': description
            };
            // creo una variabile che mi compili le info con una funzione
            var html = templateFunction(info);
            //  le appendo al container
            if (titleMovie && originalTitleMovie) {
                $('.film-container').append(html);

            } else {
                $('.serieTv-container').append(html);
            }
        };
    };
});

// creo una funzione per estrarre le informazione delle serieTv dall'api
//     function infoSeriesTv(serieTv) {
//         var templateFunction = Handlebars.compile($('#template').html());
//         // uso un ciclo for visto che mi verrà restituita un array di oggetti
//         for (var i = 0; i < serieTv.length; i++) {
//             // creo le varie variabili per andare a prendere i dati di cui ho bisogno
//             var title = serieTv[i].name;
//             var originalTitle = serieTv[i].original_name;
//             var language = serieTv[i].original_language;
//             // arrotondo per eccesso il numero della votazione e diviso per due per fare la votazione da 0 a 5
//             var voto = Math.ceil((serieTv[i].vote_average) / 2);
//             console.log(voto);
//             var stellaPiena = '<i class="fas fa-star"></i>';
//             var stellaVuota = '<i class="far fa-star"></i>';
//             var stelle = '';
//             console.log(stelle);
//             for (var j = 0; j < 5; j++) {
//                 if (j < voto) {
//                     stelle = stelle + stellaPiena;
//                 } else {
//                     stelle = stelle + stellaVuota;
//                 }
//             };
//             var img = serieTv[i].poster_path;
//             var description = serieTv[i].overview;
//             // info da sostituire nel mio handlebars template
//             var info = {
//                 'title': title,
//                 'original-title': originalTitle,
//                 'language': language,
//                 'vote': stelle,
//                 'poster': img,
//                 'overview': description
//             };
//             // creo una variabile che mi compili le info con una funzione
//             var html = templateFunction(info);
//             //  le appendo al container
//             $('.film-container').append(html);
//         };
//     };
