import React, { useState } from 'react'
import { View, Button, TextInput } from 'react-native'

const CommentSection = (props) => {
  const [comment, setComment] = useState()
  return (
    <View 
      testID="comment-section"
      name="CommentSection"
    >
      <View>
        <TextInput
          testID="comment-text"
          placeholder="white a comment"
          onChange={(text) => setComment(text)}
        />
        <Button
          testID="comment-submit"
          title="Comment"
          // onPress={}
        />
      </View>
    </View>
  )
}

export default CommentSection
