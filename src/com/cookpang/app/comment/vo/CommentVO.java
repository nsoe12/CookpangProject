package com.cookpang.app.comment.vo;



public class CommentVO {
    private int commentNumber;
    private String commentContent;
    private int userNumber;
    private int postNumber;
    private String commentTime;
    private String userId;
    private String userNickname;
    private String userProfileImageSystemName;
    
    
    public CommentVO() {}


	public int getCommentNumber() {
		return commentNumber;
	}


	public void setCommentNumber(int commentNumber) {
		this.commentNumber = commentNumber;
	}


	public String getCommentContent() {
		return commentContent;
	}


	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}


	public int getUserNumber() {
		return userNumber;
	}


	public void setUserNumber(int userNumber) {
		this.userNumber = userNumber;
	}


	public int getPostNumber() {
		return postNumber;
	}


	public void setPostNumber(int postNumber) {
		this.postNumber = postNumber;
	}


	public String getCommentTime() {
		return commentTime;
	}


	public void setCommentTime(String commentTime) {
		this.commentTime = commentTime;
	}


	public String getUserId() {
		return userId;
	}


	public void setUserId(String userId) {
		this.userId = userId;
	}


	public String getUserNickname() {
		return userNickname;
	}


	public void setUserNickname(String userNickname) {
		this.userNickname = userNickname;
	}


	public String getUserProfileImageSystemName() {
		return userProfileImageSystemName;
	}


	public void setUserProfileImageSystemName(String userProfileImageSystemName) {
		this.userProfileImageSystemName = userProfileImageSystemName;
	}


	@Override
	public String toString() {
		return "CommentVO [commentNumber=" + commentNumber + ", commentContent=" + commentContent + ", userNumber="
				+ userNumber + ", postNumber=" + postNumber + ", commentTime=" + commentTime + ", userId=" + userId
				+ ", userNickname=" + userNickname + ", userProfileImageSystemName=" + userProfileImageSystemName + "]";
	}


	
}