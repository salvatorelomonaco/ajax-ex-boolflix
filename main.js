$(document).ready(function() {

    var templateFunction = Handlebars.compile($('#template').html());

    $('button').click(function () {
        var letturaRicerca = $('.header-right input').val();
        console.log(letturaRicerca);
        $.ajax({
            'url': 'https://api.themoviedb.org/3/search/movie',
            'data': {
                'api_key': '8f20fb07349b7328a5884d56f17b612d',
                'query': letturaRicerca,
                'language': 'it-IT'
            },
            'method': 'GET',
            'success': function(data) {
                var film = data.results
                for (var i = 0; i < film.length; i++) {
                    var title = film[i].title;
                    var originalTitle = film[i].original_title;
                    var language = film[i].original_language;
                    var vote = film[i].vote_average;
                    var info = {
                        'title': title,
                        'original-title': originalTitle,
                        'language': language,
                        'vote': vote
                    };

                    var html = templateFunction(info);

                    $('.film-container').append(html);
                }
            },
            'error': function() {
                alert('Error');
            }
        });
    });
});

//
// function printMovie(movie, info) {
//     for (var i = 0; i < movie.length; i++) {
//         var title = movie[i].title;
//         var originalTitle = movie[i].original_title;
//         var language = movie[i].original_language;
//         var vote = movie[i].vote_average;
//         var info = {
//             'title': title,
//             'original-title': originalTitle,
//             'language': language,
//             'vote': vote
//         };
//
//         var html = templateFunction(info);
//
//         $('.film-container').append(html);
//     }
// }
