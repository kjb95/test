import axios from 'axios';

async function callYoutubeAPI(type, part, id, key) {
  return await axios.get(`https://www.googleapis.com/youtube/v3/${type}?part=${part}&id=${id}&key=${key}`)
    .then(res => res.data.items[0]);
}

async function getYoutubeData(id, key) {
  let data1 = await callYoutubeAPI('videos', 'snippet', id, key);
  const data2 = await callYoutubeAPI('videos', 'statistics', id, key);
  const data3 = await callYoutubeAPI('channels', 'statistics', data1.snippet.channelId, key);

  data1 = data1.snippet;
  return {
    channelId: data1.channelId,
    channelTitle: data1.channelTitle,
    description: data1.description,
    title: data1.title,
    publishedAt: data1.publishedAt,
    viewCount:data2.statistics.viewCount,
    subscriberCount:data3.statistics.subscriberCount
  }
}

async function fetchPlaylist() {
  return await fetch('playlist.json')
    .then((res) => res.json())
    .then(data => data.playlist);
}

async function getYoutubeDataList() {
  let key = 'AIzaSyDOIR71JVLEKyhBXDaiPW_NdYtMiShRq_c';
  let playlist = [];

  await fetchPlaylist()
    .then(data => {
      data.forEach(data => {
        playlist.push(getYoutubeData(data.id, key));
      })
    });

  return await Promise.all(playlist)
    .then(data => data);
}

function useYoutubeAPI(id, key) {
  const youtubeDataList = getYoutubeDataList();
  console.log('dl : ', youtubeDataList);
  

  return 'hia';

}

export default useYoutubeAPI;