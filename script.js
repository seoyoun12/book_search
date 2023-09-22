const btn = document.querySelector(".search_btn");
const textbox = document.querySelector(".search_text");
let page = 1;

btn.addEventListener("click", () => {
  page = 1;
  loadResults();
});

function loadResults() {
  $(".page").text("");
  const text = textbox.value;
  $.ajax({
    method: "GET",
    url: "https://dapi.kakao.com/v3/search/book",
    data: {
      query: text,
      size: 20,
      page: page,
    },
    headers: { Authorization: "KakaoAK 51d826318076e8ffbde808594c6bc7a2" },
  }).done(function (msg) {
    if (msg.documents.length == 0) {
      $(".results").text("");
      $(".results").append(`<p class="defalt_text">검색 결과가 없습니다.</p>`);
    } else {
      const search_max = msg.meta.pageable_count;
      const page_max = Math.ceil(search_max / 50);
      $(".results").text("");
      $(".results").append(
        `<p class="info">'<span>${text}</span>'에 대한 <span>${msg.meta.pageable_count} </span>개의 검색결과가 나왔습니다.</p>`
      );
      for (i = 0; i < msg.documents.length; i++) {
        $(".results").append(`<div class="databox">
                <a href="${msg.documents[i].url}">
                  <img class="thumnail" src='${msg.documents[i].thumbnail}'>
                  <h3 class="title">${msg.documents[i].title}</h3>
                  <p>저자 : ${msg.documents[i].authors}</p>
                  <p>출판사 : ${msg.documents[i].publisher}</p>
                  <p>출판일 : ${msg.documents[0].datetime.substr(0, 10)}</p>
                  <p>정가 : ${msg.documents[i].price}</p>
                  <p>판매가 :${msg.documents[i].sale_price}</p>
                  <p class="contents">소개 : ${msg.documents[i].contents}</p>
                </a>
              </div>`);
      }
      $(".page").append(
        `<button class="prev">prev</button>${page} / ${page_max}<button class="next">next</button>`
      );
      document.querySelector(".prev").addEventListener("click", () => {
        if (page > 1) {
          page--;
          loadResults();
          console.log(page);
        }
      });
      document.querySelector(".next").addEventListener("click", () => {
        if (page < page_max) {
          page++;
          loadResults();
          console.log(page);
        }
      });
    }
  });
}
