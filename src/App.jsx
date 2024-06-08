import { useEffect } from "react"
import { useState } from "react"
import { Blog, BlogForms } from "./components";
import blogService from "./services/blogService";

function App() {
  const [blogs, setBlogs] = useState([]);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [important, setImportant] = useState(false);

  const fetchBlogs = async () => {    
    const data = await blogService.getAll();
    setBlogs({ ...blogs, ...data });
  }

  useEffect(() => {
    fetchBlogs();
  }, [])

  const addNewBlog = async (e) => {
    e.preventDefault();
    
    const newBlog = {
      title: title,
      description: description,
      date: new Date().toISOString().split("T")[0],
      url: url,
      likes: 0,
      important: important
    }
    setTitle("");
    setDescription("");
    setUrl("");
      
    const data = await blogService.create(newBlog);
    setBlogs({ ...blogs, data });
  }

  return (    
    <>
      <BlogForms
        titleValue={title}
        setTitle={setTitle}
        
        descriptionValue={description}
        setDescription={setDescription}
        
        urlValue={url}
        setUrl={setUrl}

        importantValue={important}
        setImportant={setImportant}

        onSubmit={addNewBlog}
      />

      {
        blogs ?
        Object.values(blogs).map(blog => 
          <Blog key={blog.id} blog={blog} />
        ) : "loading..."
      }
    </>
  )
}

export default App