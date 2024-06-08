import Tooltip from "../Tooltip/Tooltip";
import "./index.css";

const Blog = ({ blog }) => {
    return (
        <div className="blog-container">
            <Tooltip text={blog.important ? "este blog está marcado como importante" : "esse blog está marcado como comum"}>
                <h3 className={blog.important ? "blog-container__title--important" : "blog-container__title"}>{blog.title}</h3>
                <p className="blog-container__date">{blog.date}</p>
                <p className="blog-container__content">{blog.description}</p>
            </Tooltip>

            <p className="blog-container__content">Url: <a href={blog.url} target="_blank">{blog.url}</a></p>
            <p className="blog-container__content">Likes: {blog.likes}</p>
        </div>
    )
}

export default Blog