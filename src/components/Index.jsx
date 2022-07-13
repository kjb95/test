import React, {useState, useEffect} from "react";
import axios from 'axios';

const Index = () => {
  const [youtubeData1, setYoutubeData1] = useState(undefined);
  const [youtubeData2, setYoutubeData2] = useState(undefined);
  const [youtubeData3, setYoutubeData3] = useState(undefined);

  const id = 'YxVajT3FS1Y';

  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyDOIR71JVLEKyhBXDaiPW_NdYtMiShRq_c`)
      .then((res) => res.data.items[0].snippet)
      .then(data => {
        setYoutubeData1({
          channelId:data.channelId,
          channelTitle:data.channelTitle,
          description:data.description,
          title:data.title,
          publishedAt:data.publishedAt,
        })
      })
    
    axios
    .get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=AIzaSyDOIR71JVLEKyhBXDaiPW_NdYtMiShRq_c`)
    .then(res => res.data.items[0].statistics)
    .then(data => {
      setYoutubeData3({
        viewCount:data.viewCount
      })
    });
  }, []);

  useEffect(() => {
    if (!youtubeData1)
      return ;
    const channelId = youtubeData1.channelId;
    axios
      .get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=AIzaSyDOIR71JVLEKyhBXDaiPW_NdYtMiShRq_c`)
      .then(res => res.data.items[0].statistics)
      .then(data => {
        setYoutubeData2({
          subscriberCount:data.subscriberCount
        })
      })

  }, [youtubeData1]);



  if (!(youtubeData1 && youtubeData2 && youtubeData3))
    return ;
    
  console.log('1 : ', youtubeData1);
  console.log('2 : ', youtubeData2);
  console.log('3 : ', youtubeData3);


  return <div>hi</div>
}

export default Index;
