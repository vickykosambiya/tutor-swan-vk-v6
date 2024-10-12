// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import Home from './pages/Landing/Home';
import Pricing from './pages/Landing/Pricing';
import Aboutus from './pages/Landing/AboutUs';
import ContactUs from './pages/Landing/ContactUs';
import Signup from './pages/Landing/Signup';
import Blog from './pages/Landing/Blog';
import Blog1 from './pages/Blogs/Blog1';
import Blog2 from './pages/Blogs/Blog2';
import Student from './pages/Student/Student';
import Teacher from './pages/Teacher/Teacher';
import Admin from './pages/Admin/Admin';
import AdminStudent from './pages/Admin/AdminStudent';
import AdminTeacher from './pages/Admin/AdminTeacher';
import SignupStudent from './pages/Landing/SignupStudent';
import SignupTeacher from './pages/Landing/SignupTeacher';
import CreatePaperPattern from './pages/Teacher/CreatePaperPattern';
import PaperPattern from './pages/Teacher/TeacherPaperPattern';
import ImageExtraction from './pages/Landing/ImageExtraction';
// import AwsExtraction from './pages/Landing/AwsExtraction';
import Image from './pages/Landing/Image';
import TeacherPaperCorrection from './pages/Teacher/TeacherPaperCorrection';
import PaperCorrection from './pages/Teacher/PaperCorrection';
import TeacherResult from './pages/Teacher/TeacherResult';
import Results from './pages/Teacher/Results';
// ...
// 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


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog/1" element={<Blog1 />} />
          <Route path="/blog/2" element={<Blog2 />} />
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/student" element={<AdminStudent />} />
          <Route path="/admin/teacher" element={<AdminTeacher />} />
          <Route path="/signup/student" element={<SignupStudent />} />
          <Route path="/signup/teacher" element={<SignupTeacher />} />
          <Route path="/create-paper-pattern" element={<CreatePaperPattern />} />
          <Route path="/paper-pattern/:id" element={<PaperPattern />} />
          <Route path="/image-extraction" element={<ImageExtraction />} />
          {/* <Route path="/aws-extraction" element={<AwsExtraction />} /> */}
          <Route path="/image" element={<Image />} />
          <Route path="/paper-correction" element={<TeacherPaperCorrection />} />
          <Route path="/paper-correction/:id" element={<PaperCorrection />} />
          <Route path="/teacher-result" element={<TeacherResult />} />
          <Route path="/teacher-result/:id" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
