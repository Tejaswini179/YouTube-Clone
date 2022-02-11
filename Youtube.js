const VideoCardContainer = document.querySelector('.video-container')

let API_key = "AIzaSyC6r0F9qX-o5NuIacbr4RUF-WDnBLTcskc";
let video_url='https://youtube.googleapis.com/youtube/v3/videos?';
let channel_url='https://www.googleapis.com/youtube/v3/channels?';

fetch(video_url + new URLSearchParams({
    key:API_key,
    part:'snippet',
    chart:'mostPopular',
    maxResults:50,
    regionCode:'IN'
}))
.then(res =>res.json())
.then(data=>{
    // console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item);
    });
})
.catch(err =>console.log(err))

const getChannelIcon = (video_data) =>{

    fetch(channel_url + new URLSearchParams({
        key:API_key,
        part:'snippet',
        id:video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
       video_data.channelThambnil = data.items[0].snippet.thumbnails.default.url;
       console.log(video_data)
    makeVideoCard(video_data)
    })
}

const makeVideoCard = (data)=>{
    VideoCardContainer.innerHTML += 
    `<div class="video" onclick="location.href='https://youtube.com/watch?v=${data.id}'">
    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="" >
    <div class="content">
    <img src="${data.channelThambnil}" class="channel-icon" alt="" >
    <div class="info">

        <h4 class='title'>${data.snippet.title}</h4>
        <p class='channel-name'${data.snippet.channelTitle}></p></p>
    </div>
    </div>
    </div>`;
}

const searchInput = document.querySelector('.search-bar');
const searchBtn= document.querySelector('.search-btn');
let searchLink='https://www.youtube.com/results?search_query='

searchBtn.addEventListener('click',() =>{
   if(searchInput.value.length) {
       location.href = searchLink + searchInput.value
   }
})