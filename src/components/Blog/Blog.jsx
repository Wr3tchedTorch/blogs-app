import Tooltip from "../Tooltip/Tooltip";
import "./index.css";

const Blog = ({ title, content, date, important }) => {
    return (
        <div className="blog-container">
            <Tooltip text={important ? "este blog está marcado como importante" : "esse blog está marcado como comum"}>
                <h3 className={important ? "blog-container__title--important" : "blog-container__title"}>{title}</h3>
                <p className="blog-container__date">{date}</p>
            </Tooltip>

            <p className="blog-container__content">{content}</p>
        </div>
    )
}

export default Blog