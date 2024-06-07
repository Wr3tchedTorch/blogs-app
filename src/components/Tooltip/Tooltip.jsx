import "./index.css";

const Tooltip = ({ children, text, bgColor, textColor }) => {
    return (
        <div className="tooltip-container">
            <div style={{cursor: "pointer"}}>{children}</div>

            <span className="tooltip-container__text--right" style={{ color: textColor, backgroundColor: bgColor }}>{text}</span>
        </div>
    )
}

export default Tooltip