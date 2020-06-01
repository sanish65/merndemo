import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    title: '',
    body: '',
    posts: []
  }

  componentDidMount = () => {
    this.getBlogPost();
  }
  getBlogPost = () => {
    axios.get('http://localhost:8080/api/')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        // console.log("data has been receibved");
        // this.getBlogPost();
      })
      .catch((err) => {
        alert("Error retrieving detail !!!");
        console.error("400",err)
      });
  }


  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });

  }
  handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      title: this.state.title,
      body: this.state.body
    }

    axios({

      url: 'http://localhost:8080/api/save',
      method: 'POST',
      data: payload
    }).then((result) => {
      console.log("data has been sent to the server");
      this.resetUserInputs();
      this.getBlogPost()
    })
      .catch((err) => {
        console.error("data has not been sent errorrrrrrrr", err)
      })

  }

  resetUserInputs = () => {
    this.setState({
      title: '',
      body: ''
    })
  }

  displayBlogPost = (posts) => {
    if (!posts.length) {
      return null;
    }

    return posts.map((post, index) => (
      <div key={index} className="blog-post-display">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>

    ));

  }
  render() {
    console.log(this.state);
    return (
      <div className="app">
        welcome to my app

        <form onSubmit={this.handleSubmit} className="form">
          <div className="form-input">
            <input type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange} placeholder="text"
            />
          </div>
          <div className="form-input">
            <textarea name="body"
              cols='30'
              rows='18'
              value={this.state.body}
              onChange={this.handleChange} placeholder="body"
            />
            <button>submit</button>
          </div>
        </form>
        <div className="blog-post">
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }
}

export default App;
