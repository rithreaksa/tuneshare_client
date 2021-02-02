import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const Comments = {
  async index(postId) {
    let response = await axios.get(`${API_URL}/posts/${postId}/comments`)
    store.dispatch({
      type: 'DISPLAY_POST_COMMENTS',
      payload: response.data.comments,
    })
  },
  async create(postId, credentials, text) {
    let response = await axios.post(
      `${API_URL}/posts/${postId}/comments`,
      {
        post_id: postId,
        content: text,
      },
      { headers: credentials }
    )
  },
}

export default Comments
