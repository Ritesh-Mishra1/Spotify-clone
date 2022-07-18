// console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement =new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Arabic Kuthu_64 - Beast", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Loving You is a Losing Game- Arcade", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Dhokha- Arijit Singh", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Let Me Down Slowly_320", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Mehbooba Main Teri Mehbooba", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Oh Antava Mava - Pushpa", filePath: "songs/.6mp3", coverPath: "covers/6.jpg"},
    {songName: "Raatan Lambiyan - Shershah", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Dheeme Dheeme - Pati Patni Aur Woh", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Illegal Weapon 2.0 - Street Dancer 3D ", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "O Saathi (Baaghi 2)", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]
// to fill the image and the song name dynamically
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime=myProgressBar.value* audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((e)=>{
        e.classList.remove('fa-pause-circle');
        e.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('dblclick', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        // e.target.classList.toggle('fa-play-circle');
        // e.target.classList.toggle('fa-pause-circle');
        // audioElement.src = `songs/${songIndex+1}.mp3`;
        // masterSongName.innerText = songs[songIndex].songName;
        // audioElement.currentTime = 0;
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', (e)=>{
    if(songIndex>=9){
        songIndex = 0
    }

    else{
        songIndex += 1; 
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        makeAllPlays();
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    }

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    makeAllPlays();
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})


audioElement.addEventListener("ended",(e)=>{
    if(songIndex==9)
    {
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeAllPlays();
})