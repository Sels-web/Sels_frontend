import Routers from './routes/Routers'
import Header from './views/common/Header'
import Footer from './views/common/Footer'
import React from "react";
function App() {
  return (
    <div className="App">
      <Header />
      <Routers />
      <Footer />
    </div>
  )
}

export default App;
