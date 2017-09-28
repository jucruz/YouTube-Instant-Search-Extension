const ApiKey = 'APIKEY holder';
var searchWord ='';
var mostPopularURL = "https://www.googleapis.com/youtube/v3/videos";
var searchURL = "https://www.googleapis.com/youtube/v3/search";
//searchWord = prompt("Enter your search.");
var searchList = {
    part: 'snippet',
    q: searchWord,
    type: 'video',
    maxResults: 20,
    key: ApiKey
}

var videoList = {
    part: 'snippet',
    chart: 'mostPopular',
    regionCode: 'US',
    maxResults: 20,
    key: ApiKey
}
function searchAction() {
    searchList.q = $('#search_text').val();
    document.getElementById("template").innerHTML = "";
    $(document).ready(init(searchURL,searchList));
}

$(document).ready(init(mostPopularURL, videoList));
$(function(){
    $('#search_text').change(searchAction);
    $('#search_button').click(searchAction);
});


function init(URL, list) {
    $.get(URL, list, function(data) {
        $.each(data.items, function(i, item) {
            //console.log(item);
            image = item.snippet.thumbnails.default.url;
            videoName = item.snippet.title;
            if (item.id.kind) {
                videoURL = "https://www.youtube.com/watch?v=" + item.id.videoId;
            } else {
                videoURL = "https://www.youtube.com/watch?v=" + item.id;
            }
            userURL = "https://www.youtube.com/channel/" + item.snippet.channelId;
            userNane = item.snippet.channelTitle;

            var li = document.createElement("LI");
            li.setAttribute('class', 'row');

            //Video Image with refferens to the video page.
            var div = document.createElement("DIV");
            div.setAttribute('id', 'nav');
            var a = document.createElement("A");
            a.setAttribute('href', videoURL);
            a.setAttribute('target', '_blank');
            var img = document.createElement("IMG");
            img.setAttribute('src', image);
            a.appendChild(img);
            div.appendChild(a);
            li.appendChild(div);
            //////////End of Video Image///////////

            //////////Start of Title///////////////
            div = document.createElement("DIV");
            div.setAttribute('id', 'title');
            var aTitle = document.createElement("A")
            var title = document.createTextNode(videoName);
            aTitle.setAttribute('href', videoURL);
            aTitle.setAttribute('target', '_blank');
            aTitle.appendChild(title);
            div.appendChild(aTitle);
            li.appendChild(div);
            ////////////End of Title///////////////

            ////////////Start of User Name////////////
            div = document.createElement("DIV");
            div.setAttribute('id', 'user');
            var aUser = document.createElement("A")
            aUser.setAttribute('href', userURL);
            aUser.setAttribute('target', '_blank');
            var user = document.createTextNode(userNane);
            aUser.appendChild(user);
            div.appendChild(aUser);
            li.appendChild(div);
            ////////////End of User Name//////////////

            document.getElementById("template").appendChild(li);
        });
    });
}
