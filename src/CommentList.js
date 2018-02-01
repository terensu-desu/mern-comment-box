import React, { Component } from "react";
import Comment from "./Comment";
import style from "./style";

export default class CommentList extends Component {
	render() {
		let commentNodes = this.props.data.map(comment => {
			return (
				<Comment author={comment.author} key={comment['__id']}>
					{comment.text}
				</Comment>
			)
		});
		return (
			<div style={style.commentList}>
				{commentNodes}
			</div>
		)
	}
}