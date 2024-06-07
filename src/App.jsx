import Blog from "./components/Blog/Blog"

function App() {
  return (
    <>
      <Blog title={"Meu Blog Legal!"} content={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus ipsa iusto deserunt laboriosam eaque amet quasi fugit vitae, fugiat et vero corporis repudiandae in illum eligendi delectus quod consectetur, eum eveniet quo culpa reiciendis consequatur non atque! Est, quis consequuntur?"} date={"07-06-2024"} important={false} />
      
      <Blog title={"Receitas Insanas!"} content={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet, ut!"} date={"07-06-2024"} important={true} />      
    </>
  )
}

export default App