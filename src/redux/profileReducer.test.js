import profileReducer, { addPostAC, deletePost } from './profileReducer'

let state = {
  posts: [
    { id: 1, message: 'Hi! How are you?', likesCount: 12 },
    { id: 2, message: 'All good!', likesCount: 100 },
    { id: 3, message: 'hiphui', likesCount: 500 },
  ],
}

it('message of new post should be correct', () => {
  //1. test data
  let action = addPostAC('hello')

  //2. action
  let newState = profileReducer(state, action)

  //3. expectation
  expect(newState.posts.length).toBe(4)
})

it('length of posts should be incremented', () => {
  //1. test data
  let action = addPostAC('hello')

  //2. action
  let newState = profileReducer(state, action)

  //3. expectation
  expect(newState.posts[3].message).toBe('hello')
})

it('after deleting legth of messages should be decrement', () => {
  //1. test data
  let action = deletePost(1)

  //2. action
  let newState = profileReducer(state, action)

  //3. expectation
  expect(newState.posts.length).toBe(2)
})

it("after deleting legth shouldn't be decrement if id is incorrect", () => {
  //1. test data
  let action = deletePost(100)

  //2. action
  let newState = profileReducer(state, action)

  //3. expectation
  expect(newState.posts.length).toBe(3)
})
