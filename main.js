$(document).ready(function() {

    var templateFunction = Handlebars.compile($('#template').html());

    $('button').click(function () {
        var letturaRicerca = $('.header-right input').val();
        console.log(letturaRicerca);
        $.ajax({
            'url': 'https://api.themoviedb.org/3/search/movie',
            'data': {
                'api_key': 'e99307154c6dfb0b4750f6603256716d',
                'query': letturaRicerca
            },
            'method': 'GET',
            'success': function(data) {
                var film = data.results
                console.log(film);
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
                alert('Error')
            }
        });
    });
});
