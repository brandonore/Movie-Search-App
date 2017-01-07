/*
 |--------------------------------------------------------------------------
 | Start
 |--------------------------------------------------------------------------
*/
var module = (function (){

  // Clear search text on page load
  $('#search').val("");
  // Select the form element and prevent the default action
  $('form').submit(function(evt){
    evt.preventDefault();
/*
 |--------------------------------------------------------------------------
 | Declare Variables
 |--------------------------------------------------------------------------
*/
    // Initialize variables for AJAX and HTTP Request
    var omdbAPI = 'http://www.omdbapi.com/?';
    var searchValue = $('#search').val();
    // OMDb parameters
    var omdbOptions = {
      s: searchValue,
      y: 'year',
      r: 'json',
      plot: 'short',
      type: 'movie'
    }
    // Variable to build up html string
    var movieHTML = "";
/*
 |--------------------------------------------------------------------------
 | Setup function to display Movies
 |--------------------------------------------------------------------------
*/
    // Display movies function
    function displayMovies (data) {
      // Check if response is 'true' or 'false'. If 'true' display movie '<li>' items
      if(data.Response === "True") {
        $.each(data.Search, function(i, movie){
            movieHTML += '<li>';
            movieHTML += '<div class="poster-wrap">';
            // Check if returned results have a valid poster
            if(movie.Poster === "N/A") {
              movieHTML += '<i class="material-icons poster-placeholder">crop_original</i>';
            } else {
              movieHTML += '<img class="movie-poster" src="'+ movie.Poster +'">';
            }
            movieHTML += '</div>';
            movieHTML += '<span class="movie-title">' + movie.Title + '</span>';
            movieHTML += '<span class="movie-year">' + movie.Year + '</span>';
            movieHTML += '</li>';
        }); // End each
        $('#movies').html(movieHTML);
        // If response is 'false', display a different '<li>' item stating 'no movies found'
      } else if (data.Response === "False") {
        movieHTML += '<li class="no-movies">';
        movieHTML += '<i class="material-icons icon-help">help_outline</i>No movies found that match: ' + searchValue;
        movieHTML += '</li>';
        $('#movies').html(movieHTML);
      }
    } // End displayMovies function
/*
 |--------------------------------------------------------------------------
 | HTTP Request
 |--------------------------------------------------------------------------
*/
    // Use jQuery to call HTTP request and parse the JSON data returned
    $.getJSON(omdbAPI, omdbOptions, displayMovies);

  }); // End submit function

})();
