$(document).ready(function() {
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet',
            q: 'naruto',
            type: 'video',
            key: 'AIzaSyCBrCxWdLtO3TlCFkQ-rFVhIGt0VJtfgMk'
        },
        function(data) {
            $.each(data.items, function(i, item) {
              image = item.snippet.thumbnails.default.url;
              videoName = item.snippet.title;
              description = item.snippet.description;
              videoURL = "https://www.youtube.com/watch?v="+item.id.videoId;
              userURL = "https://www.youtube.com/channel/"+item.snippet.channelId;
              userNane = item.snippet.channelTitle;

              var li = document.createElement("LI");
              li.setAttribute('class', 'row');
              //Video Image with refferens to the video page.
              var div = document.createElement("DIV");
              var a = document.createElement("A");
              a.setAttribute('href', videoURL);
              var img = document.createElement("IMG");
              img.setAttribute('src', image);

              a.appendChild(img);
              div.appendChild(a);
              li.appendChild(div);

              //Title, User, and Description of video.

              div = document.createElement("DIV");
              var aTitle = document.createElement("A")
              aTitle.setAttribute('href', videoURL);
              var aUser = document.createElement("A")
              aUser.setAttribute('href', userURL);
              var user = document.createTextNode(userNane);
              aUser.appendChild(user);
              var spanDescription = document.createElement("SPAN");
              var desc = document.createTextNode(description);
              spanDescription.appendChild(desc);

              div.appendChild(aTitle);
              div.appendChild(aUser);
              div.appendChild(spanDescription);
              li.appendChild(div);
              document.getElementById("template").appendChild(li);
            });
        }
    );
});
