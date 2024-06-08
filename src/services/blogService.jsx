import axios from "axios";
const defaultUrl = "http://localhost:3000/blogs";

const getAll = async () => {
    const response = await axios.get(defaultUrl);
    return response.data;
}

const create = async (newBlog) => {
    const response = await axios.post(defaultUrl, newBlog);
    return response.data;
}

export default { getAll, create }