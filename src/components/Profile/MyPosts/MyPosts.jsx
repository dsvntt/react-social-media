import React from 'react'
import { Field, reduxForm, reset } from 'redux-form'
import { Textarea } from '../../common/FormsControls/FormsControls'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import Button from '../../common/Button/Button'
import { required } from '../../../utils/validators/validators'

const afterSubmit = (result, dispatch) => dispatch(reset('profileAddPostForm'))

const MyPosts = React.memo((props) => {
  let postsElements = [...props.posts]
    .reverse()
    .map((p) => (
      <Post
        key={p.id}
        message={p.message}
        likesCount={p.likesCount}
        profile={props.profile}
      />
    ))

  let addNewPost = (values) => {
    props.addPost(values.newPostText)
  }

  return (
    <div className={s.postBlock}>
      <AddPostFormRedux onSubmit={addNewPost} onSubmitSuccess={afterSubmit} />

      <div className={s.posts}>{postsElements}</div>
    </div>
  )
})

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name='newPostText'
          size='small'
          label='Add new post'
          validate={required}
          component={Textarea}
          placeholder=' '
        />
      </div>
      <div className={s.addNewPostButton}>
        <Button buttonText={'Publish'} onClick={props.handleSubmit} />
      </div>
    </form>
  )
}

const AddPostFormRedux = reduxForm({ form: 'profileAddPostForm' })(AddPostForm)

export default MyPosts
