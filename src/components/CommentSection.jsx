import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Button, FlatList, Text, TextInput } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Comments from '../modules/CommentService'

const CommentSection = () => {
  const route = useRoute()
  const post = route.params.post
  const { comments, credentials } = useSelector(state => state)
  const [newComment, setNewComment] = useState()

  useEffect(() => {
    Comments.index(post.id)
  }, [])

  const SingleComment = ({ content }) => <Text>{content}</Text>
  const renderComment = ({ item }) => (
    <SingleComment testID={`comment-text-${item.id}`} content={item.content} />
  )

  return (
    <View testID='comment-section' name='CommentSection'>
      <FlatList
        data={comments}
        keyExtractor={item => item.id.toString()}
        renderItem={renderComment}
        extraData={newComment}
      />
      <TextInput
        testID='comment-input'
        placeholder='Share your thoughts...'
        onChangeText={text => setNewComment(text)}
      />
      <Button
        testID='comment-submit'
        title='Comment'
        onPress={() => {
          Comments.create(post.id, credentials, newComment)
          Comments.index(post.id)
          setNewComment('')
        }}
      />
    </View>
  )
}

export default CommentSection
