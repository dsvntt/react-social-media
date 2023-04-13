import s from './Post.module.css'
import { FaThumbsUp, FaComment } from 'react-icons/fa'

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src={props.profile.photos.large} alt='Profile' />
      <div className={s.message}>{props.message}</div>
      <div className={s.icons}>
        <div className={s.likesButton}>
          <FaThumbsUp className={s.blueIcon} />
          <span className={s.likes}>{props.likesCount}</span>
        </div>
        <div className={s.commentButton}>
          <FaComment className={s.blueIcon} />
          <span className={s.comments}>{props.commentsCount}</span>
        </div>
      </div>
    </div>
  )
}

export default Post
