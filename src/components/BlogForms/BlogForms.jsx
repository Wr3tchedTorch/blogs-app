import "./index.css";

const BlogForms = ({titleValue, setTitle, setDescription, descriptionValue, setUrl, urlValue, setImportant, importantValue, onSubmit}) => {
  return (
    <form action="" className="blog-forms-container" onSubmit={onSubmit}>
      <h2 className="blog-forms-container__header">Add new Blog</h2>

        <label htmlFor="title" className="blog-forms-container__label">Title: </label>
        <input type="text" name="title" id="title" placeholder="your blog title" value={titleValue} onChange={(e) => setTitle(e.target.value)} required/>
        <br />
        <label htmlFor="description" className="blog-forms-container__label">Description: </label>
        <input type="text" name="description" id="description" placeholder="your blog description (max 50 letters)" value={descriptionValue} onChange={(e) => setDescription(e.target.value)} required/>
        <br />
        <label htmlFor="url" className="blog-forms-container__label">Url: </label>
        <input type="text" name="url" id="url" placeholder="the url for your blog" value={urlValue} onChange={(e) => setUrl(e.target.value)} required/>
        <p></p>
        <label htmlFor="switch" className="blog-forms-container__label">Mark as important? </label>
        <p></p>
        <label className="switch" id="switch">
            <input type="checkbox"onChange={() => setImportant(!importantValue)}/>
            <span className="slider round"></span>
        </label>
        <p></p>
        <button type="submit">submit</button>
    </form>
  )
}

export default BlogForms