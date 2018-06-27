$.get(
  "https://youfoundnate.com/wolfcircus/wp-json/wp/v2/posts?per_page=10",
  function(response) {
    console.log(response);
    const eachPost = response.map(data => {
      $(".post").append(
        `<h1>${data.title.rendered}</h1>`,
        `<p>${data.modified.replace(
          /(\d{4})\-(\d{2})\-(\d{2}).*/,
          "$3-$2-$1"
        )}</p>`,
        data.featured_image_src !==
        "https://youfoundnate.com/wolfcircus/wp-includes/images/media/default.png"
          ? $("<img>").attr("src", data.featured_image_src)
          : null,
        `<p>${data.excerpt.rendered}</p>`
      );
    });
  }
);
