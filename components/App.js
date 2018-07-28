App = React.createClass({
  getInitialState: function() {
    return {
        loading: false,
        searchingText: '',
        gif: {}
    };
  },

  handleSearch: function(searchingText) {  // 1.
    this.setState({
      loading: true  // 2.
    });
    this.getGif(searchingText, function(gif) { 
      this.setState({  // 4
        loading: false,  // a
        gif: gif,  // b
        searchingText: searchingText  // c
      });
    }.bind(this));
  },

  getGif: function(searchingText, callback) {  // 1.
    // var url = 'https://api.giphy.com' + '/v1/gifs/random?api_key=' + 'uHEBbJpa474vmR8cc83HBl5xyDVOCEsk' + '&tag=' + searchingText;  // 2.
    // var xhr = new XMLHttpRequest();  // 3.
    // xhr.open('GET', url);
    // xhr.onload = function() {
    //           if (xhr.status === 200) {
    //        var data = JSON.parse(xhr.responseText).data; // 4.
    //         var gif = {  // 5.
    //             url: data.fixed_width_downsampled_url,
    //             sourceUrl: data.url
    //         };
    //         callback(gif);  // 6.
    //     }
    //   //wyswietlGif(gif)
    // };
    // xhr.send();

    fetch('https://api.giphy.com' + '/v1/gifs/random?api_key=' + 'uHEBbJpa474vmR8cc83HBl5xyDVOCEsk' + '&tag=' + searchingText)
      .then(function(response) {
               var data = response.json()//JSON.parse(response).data; // 4.
                var gif = {  // 5.
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif);  // 6.
            })
      .catch(error => console.error('Something went wrong', error));

  },

    render: function() {
        return (
          <div class="app">
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch}/>
            <Gif
              loading={this.state.loading}
              url={this.state.gif.url}
              sourceUrl={this.state.gif.sourceUrl}
            />
          </div>
        );
    }
});