import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function ListPost() {

  const [postList, setPostList] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}`).then((res) => {
      console.log(res.data)
        setPostList(res.data);
    })
  }, [])

  const likeAPost = (postId) => {
    axios.post(`${process.env.REACT_APP_API_URL}/likes`, {postId: postId}, {
      headers:{accessToken : localStorage.getItem('accessToken')}
    }).then((response) => {
      setPostList(postList.map((post) => {
        if (post.id === postId) {
          if (response.data.message === 'like') {
            return {...post, likes:[...post.likes, 1]}
          } else {
            //alert(response.data.message);
            const postArr = post.likes
            postArr.pop();
            return {...post, likes:postArr}
          } 
        } else {
          return post;
        }         
      }))  
    }).catch((err) => {
      alert('error');
      console.log(err)
    })
  }
  return (
    <div>
      {postList.map((list, key) => {
        return (<div className='post' key={key}>
          <div className='title'>{list.title}</div>
          <div className='body'  onClick={() => {navigate(`/viewpost/${list.id}`)}}>{list.content}</div>
          <div className='footer'>{list.username}</div>
          
          <button onClick={() => likeAPost(list.id)}>Like</button><span>{list.likes.length}</span>
        </div>)
      })};
    </div>
  )
}

export default ListPost