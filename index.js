var soundIndex=0;

var audioElement=new Audio('songs/The_Seed.mp3');

var masterPlay=document.getElementById('masterPlay');

var musicProgressBar=document.getElementById('musicProgressBar');

var gif=document.getElementById('gif');

var masterSongName=document.getElementById('masterSongName');

var timestamp=document.getElementsByClassName("timestamp");

var songItems=Array.from(document.getElementsByClassName('songItem'));


var songs =[
    {songName:"The Seed",filePath:"songs/The_Seed.mp3",coverPath:"images/The_Seed.jpg"},
    {songName:"Cure For Me",filePath:"songs/Cure_For_Me.mp3",coverPath:"images/cure_for_me.jpg"},
    {songName:"Runaway",filePath:"songs/Runaway.mp3",coverPath:"images/Runaway.png"},
    {songName:"Warrior",filePath:"songs/Warrior.mp3",coverPath:"images/warrior.jpg"},
    {songName:"Queendom",filePath:"songs/Queendom.mp3",coverPath:"images/queendom.jpeg"},
    {songName:"Running With The Wolves",filePath:"songs/Running_With_The_Wolves.mp3",coverPath:"images/running_with_the_wolves.jpg"},
    {songName:"Potion For Love",filePath:"songs/Potion_For_Love.mp3",coverPath:"images/potion_for_love.jpg"},
];

songItems.forEach((element,i) => {

    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

masterPlay.addEventListener('click',function(){
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }

});

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 32) {
        event.preventDefault();
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity=1;
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity=0;
        }
    }
});


audioElement.addEventListener('timeupdate',function(){
    var progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    musicProgressBar.value=progress;

});

musicProgressBar.addEventListener('change',function(){
    audioElement.currentTime=(musicProgressBar.value*audioElement.duration)/100; 
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',function(e){
        makeAllPlays();
        soundIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        const audioSource=songs[soundIndex].filePath;
        audioElement.src=audioSource;
        masterSongName.innerText=songs[soundIndex].songName;
        audioElement.currentTime=0
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

document.getElementById('next').addEventListener('click',function(){
    if(soundIndex>=6){
        soundIndex=0;
    }
    else{
        soundIndex++;
    }
    const audioSource=songs[soundIndex].filePath;
    audioElement.src=audioSource;
    masterSongName.innerText=songs[soundIndex].songName;
    audioElement.currentTime=0
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click',function(){
    if(soundIndex<=0){
        soundIndex=6;
    }
    else{
        soundIndex--;
    }
    const audioSource=songs[soundIndex].filePath;
    audioElement.src=audioSource;
    masterSongName.innerText=songs[soundIndex].songName;
    audioElement.currentTime=0
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

function playNextSong() {
    if (soundIndex >= songs.length - 1) {
        soundIndex = 0;
    } else {
        soundIndex++;
    }
    const audioSource = songs[soundIndex].filePath;
    audioElement.src = audioSource;
    masterSongName.innerText = songs[soundIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
}

audioElement.addEventListener('ended', function () {
    playNextSong();
});


