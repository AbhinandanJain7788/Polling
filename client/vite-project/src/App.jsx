// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import NameEntry from './components/NameEntry';
// import StudentHome from './pages/studentHome';
// import TeacherPanel from './pages/TeacherPanel';
// // import StudentHome from './pages/StudentHome';


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<NameEntry />} />
//         <Route path="/student" element={<StudentHome/>} />
//         <Route path="/teacher" element={<TeacherPanel />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;





import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import TeacherPanel from "./pages/TeacherPanel";
import StudentHome from "./pages/studentHome";
import NameEntry from "./components/NameEntry";
import RoleSelector from "./components/Roleselector";
import StudentNameEntry from "./components/studentNameEntry";
import StudentPoll from "./components/StudentPoll";
import TeacherPollSetup from "./components/TeacherPollSetup";
import TeacherLiveDashboard from "./components/TeacherLiveDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelector />} />
        <Route path="/student/onboarding" element={<StudentNameEntry />} />
        {/* <Route path="/student" element={<StudentHome />} />  */}
        <Route path="/student" element={<StudentPoll/>} />
        <Route path="/teacher" element={<TeacherPanel />} />

        <Route path="/teacher/setup" element={<TeacherPollSetup />} />
        <Route path="/teacher/live" element={<TeacherLiveDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;

