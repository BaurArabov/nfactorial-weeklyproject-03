const article = `<div class="news-list">
      <div class="news">
        <div class="left-side">
          <div class="top">
            <div class="info-top">
              <img src="images/avatar_default.png" alt="">
              <p id="author"></p>
              <p>in</p>
              <p id="topic"> ·</p>
              <p id="date"></p>
            </div>
            <div class="text-top">
              <p id="title"></p>
              <p id="description"></p>
            </div>
          </div>
          <div class="bottom">
            <div class="info-bottom">
              <button>Java Script</button>
              <p>12 min read · Selected for you</p>
            </div>
            <div class="actions">
              <img src="images/skeleton-rect.png" alt="">
              <img src="images/skeleton-rect.png" alt="">
              <img src="images/skeleton-rect.png" alt="">
            </div>
          </div>
        </div>
        <div class="image">
          <img className="news-img" src="images/thread1.png" class="images" alt="">
        </div>
      </div>
      <hr>
    </div>`;
    

  function getStories(){
    const container = document.getElementById("container");
    const container2 = document.getElementById("container2");
    
    let resultArticle = "";

    function getNews() {
      fetch("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=v3wDq8o6h3aPUYlZcD1KuHqTlccpw2KP")
        .then((promise)=>promise.json())
        .then((data)=>{
          const res = data.results;
          const container = document.getElementById("container");
          res.forEach(element => {
            const newTitle=article.replace(
              `id="title">`, `id="title">${element.title}`
            );

            const newDescription = newTitle.replace(
              `id="description">`, `id="description">${element.abstract}`
            );

            const newImg = newDescription.replace(
              `className="news-img"`,
              `className="news-img" src="${element.multimedia[0].url}"`
            );

            const authorsName = element.byline.slice(2,15);

            const newAuthorsName = newImg.replace(
              `id="author">`, `id="author">${authorsName}`
            );
            
            const topicsName = element.section.charAt(0).toUpperCase()+element.section.slice(1);

            const newTopicsName = newAuthorsName.replace(
              `id="topic">`, `id="topic">${topicsName}`
            );

            const newDate = newTopicsName.replace(
              `id="date">`,
              `id="date">${element.published_date.slice(0,10)}`
            );

            container.innerHTML+=newDate;

            getByClick();
          });
        })
    }
    

    getNews();
    
   function getByClick(){

      const titles = document.querySelectorAll("#title");
      const buttons = document.querySelectorAll("#btn");
      let dataForNewPage = "";
      
      titles.forEach(element => {
        element.addEventListener("click", () => {
          container.className="remove";
          container2.className="show";
        });
      });


      buttons.forEach(element => {
        element.addEventListener("click", ()=>{
          container.className="show";
          container2.className="remove";
        });
      });
    }
}