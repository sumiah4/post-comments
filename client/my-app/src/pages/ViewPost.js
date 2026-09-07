import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AuthContext } from '../helpers/AuthContext';
import { useContext } from 'react';

function ViewPost() {
    let { id } = useParams();

    const [userPost, setUserPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] =useState("");

    const {authUser} = useContext(AuthContext);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/viewpost/${id}`).then((res) => {
          setUserPost(res.data);
        })
        axios.get(`${process.env.REACT_APP_API_URL}/comments/${id}`).then((res) => {
          console.log(res)
          setComments(res.data);
        })
    }, [])
    
    const addComment = () => {
      const newData = {"postId": id, "commentText": newComment, "userId":authUser.id};
      axios.post(`${process.env.REACT_APP_API_URL}/comments`, newData, {
        headers: {accessToken : localStorage.getItem('accessToken')}
      }).then((res) => {
        console.log(res.data);
        console.log('commeny', comments);
        res.data.user = {username: authUser.username, id: res.data.userId};
        setComments([...comments, res.data])
               // console.log('newcommeny', comments);

        setNewComment("");
        console.log('kkk',comments)
      })
    }

    const deleteComment = (commentId) => {
      axios.delete(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, {
        headers: {accessToken : localStorage.getItem('accessToken')}
      }).then ((res) => {
        const newComments = comments.filter((comment) => comment.id !== commentId)
        setComments(newComments);
        console.log(comments)
        alert('Deleted');
      }).catch((err) => {
        console.log(err);
      });
    }
    return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {userPost.title} </div>
          <div className="body">{userPost.content}</div>
          <div className="footer">{userPost.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className='addCommentContainer'>
          <input type='text' name='commentText' placeholder='Comments...' value={newComment} onChange={(e) => setNewComment(e.target.value)}></input>
          <button type='button' onClick={addComment}>Add Comment</button>
        </div>
        <div className='listOfComments'>
          {comments.map((comment, key) => (
            <div key={key} className='comment'>{comment.commentText}
            <p>{comment.user.username}</p>
{comment.user.id === authUser.id ? <button onClick={() => {deleteComment(comment.id)}}>delete</button> : null}            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewPost