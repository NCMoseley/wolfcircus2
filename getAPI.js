$.get("https://youfoundnate.com/wolfcircus/wp-json/wp/v2/users", function(
  authorData
) {
  $.get(
    "https://youfoundnate.com/wolfcircus/wp-json/wp/v2/posts?per_page=10",
    function(response) {
      console.log(response);
      const eachPost = response.map(data => {
        const eachAuthor = authorData.find(d => d.id === data.author);
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
          `<a href="${eachAuthor.link}"><h3>${eachAuthor.name}</h3><img src='${
            eachAuthor.avatar_urls[96]
          }' /></a>`
        );
      });
    }
  );
});
