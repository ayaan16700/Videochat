let client = AgoraRTC.createClient({mode:'rtc', 'codec':"vp8"});

let config ={
    appid:'3a2285983ecc4c52a2116c5b22af72ad ',
    token:'0063a2285983ecc4c52a2116c5b22af72adIAAJj+nm+ybV9kH74knTGjDrNxN4f3vZLBHNf3O7umlkFH8ty9sAAAAAEACDxJolnMeyYgEAAQCbx7Ji',
    uid:null,
    channel:'ayaan26',
}

let localTracks ={
    audioTracks:null,
    videoTracks:null,
}


let remoteTracks ={

 }

 document.getElementById('join-btn').addEventListener('click',async ()=>{
     console.log("userjoined") 
  await joinStreams();
 })

 let joinStreams= async()=>{
      
    [config.uid , localTracks.audioTracks , localTracks.videoTracks]= await Promise.all([
        client.join(config.appid ,config.channel, config.token),
        AgoraRTC.createMicrophoneAudioTrack(),
        AgoraRTC.createCameraVideoTrack(),
    ])

    let videoPlayer= `<div class="video-containers" id="video-wrapper-${config.uid}">
                           <p class="user-id" >${config.uid}</p>
                           <div class="video-player player" id="stream-${config.uid}"></div>
                      </div>`
    document.getElementById('user-streams').insertAdjacentHTML('beforeend', videoPlayer)
    localTracks.videoTracks.play(`stream-${config.uid}`)

    await client.publish([localTracks.audioTracks, localTracks.videoTracks])
 }