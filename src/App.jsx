

import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Management from './components/Management';
import Count from './Count';
import { ToastContainer} from 'react-toastify';



 


function App() {
 return (
    <>
      <div>
        <Navbar />
        <Count />
      
      
        <Footer />
      </div>
     <ToastContainer />
    </>
  )
}

export default App
