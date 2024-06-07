import "./index.css";

const Blog = ({ title, content, date }) => {
    const getRandomColor = () => {
        return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }

    const randomColor = getRandomColor();

    return (
        <div className="blog-container">
            <h3 className="blog-container__title" style={{color: randomColor}}>{title}</h3>
            <p className="blog-container__date">{date}</p>
            
            <p className="blog-container__content">{content}</p>            
        </div>
    )
}

export default Blog