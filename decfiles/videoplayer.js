var tags = document.getElementsByClassName('mybtn');

$(function () {
    $(".mybtn").on("click", function (evt) {
        var clicked_button = $(this);
        var Q = clicked_button.attr("value");
        var key= "AIzaSyBtdEB9TW3STSHUPqaAJDFHS-GqemVKFGY";
        $.ajax({
            type: 'GET',
            url: "https://www.googleapis.com/youtube/v3/search" + "?" + "part=snippet&maxResults=1&order=relevance&type=video&videoDefinition=any&q=" + Q + "&key=" + key,
            dataType: 'json',
            success: function (datavideo) {
                embedVideo(datavideo);
            },
            error: function (response) {
                console.log("Request Failed");
            }
        });
    });
});

function embedVideo(datavideo) {
    $('iframe').attr('src', 'https://www.youtube.com/embed/' + datavideo.items[0].id.videoId)
}

// function to run the video on click
$(document).ready(function () {
    /* Get iframe src attribute value i.e. YouTube video url
    and store it in a variable */
    var url = $("#cartoonVideo").attr('src');

    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $("#myModal").on('hide.bs.modal', function () {
        $("#cartoonVideo").attr('src', '');
    });

    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
    $("#myModal").on('show.bs.modal', function () {
        $("#cartoonVideo").attr('src', url);
    });
});


