$.get("https://youfoundnate.com/wolfcircus/wp-json/wp/v2/users", function(
  authorData
) {
  console.log(authorData);
  const eachAuthor = authorData.map(authorData => {
    authorData;
    var authorLink = authorData.link;
    var authorName = authorData.name;
    var authorPic = authorData.avatar_urls[96];
  });
  console.log(authorData);
  $.get(
    "https://youfoundnate.com/wolfcircus/wp-json/wp/v2/posts?per_page=10",
    function(response) {
      console.log(response);

      const eachPost = response.map(data => {
        $(".post").append(
          `<a href="${data.link}"><h1>${data.title.rendered}</h1></a>`,
          `<p>${data.modified.replace(
            /(\d{4})\-(\d{2})\-(\d{2}).*/,
            "$3-$2-$1"
          )}</p>`,

          // There is a snippet applied to functions.php in the relevant wordpress theme to make featured_image_src available. https://wordpress.stackexchange.com/questions/241271/wp-rest-api-details-of-latest-post-including-featured-media-url-in-one-request
          data.featured_image_src !==
          "https://youfoundnate.com/wolfcircus/wp-includes/images/media/default.png"
            ? $("<img class='featured-image'>").attr(
                "src",
                data.featured_image_src
              )
            : null,
          `<p>${data.content.rendered}</p>`,
          data.author === authorData.id
            ? `<a href="${authorLink}"><h3>${authorName}</h3><img src='${authorPic}' /></a>`
            : null
        );
      });
    }
  );
});
