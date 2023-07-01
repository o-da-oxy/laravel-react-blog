import {useStateContext} from "../context/ContextProvider.tsx";
import {Navigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import axiosClient from "../../axios-client.ts";
import {Post} from "../types/types.ts";
import {PulseLoader} from "react-spinners";

function Posts() {
  const {token} = useStateContext();
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true); // устанавливаем флаг загрузки
    try {
      await axiosClient.post('/posts', {content});
      setContent("");
      fetchPosts(); // обновляем список постов после успешного создания нового поста
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // снимаем флаг загрузки после завершения запроса
    }
  }

  async function fetchPosts() {
    try {
      const response = await axiosClient.get('/posts');
      setPosts(response.data.posts);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!token) {
    return <Navigate to="/login"/>;
  }

  return (
    <div className="container">
      <h1>Posts</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <textarea
          id="content"
          className="form-control"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Input your post..."
          required
          style={{backgroundColor: "#f3f3f3", height: "150px", whiteSpace: "pre-wrap"}}
        />
        </div>
        <button type="submit" className="btn btn-primary">
          {isLoading ? (
            <><PulseLoader size={8} color="#fff"/></>
          ) : (
            "Create Post"
          )}
        </button>
      </form>
      <br/>
      {posts.map((post: Post) => (
        <div key={post.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{post.user?.name ?? "Unknown"}</h5>
            <p className="card-text" dangerouslySetInnerHTML={{__html: post.content.replace(/\n/g, "<br>")}}/>
            <p className="card-text"><small className="text-muted">Posted
              on {new Date(post.created_at).toLocaleString()}</small></p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
