import { Routes, Route } from "react-router";

import { AuthProvider } from "./contexts/AuthContext";
import { ErrorProvider } from "./contexts/ErrorContext";
import { ClassProvider } from "./contexts/ClassContext";

import AuthGuard from "./components/guards/AuthGuard";
import GuestGuard from "./components/guards/GuestGuard";

import ErrorBoundary from "./components/boundary/ErrorBoundary";
import Header from "./components/core/header/Header";
import Footer from "./components/core/footer/Footer";
import Home from "./components/home/Home";
import Login from "./components/user/Login/Login";
import Register from "./components/user/Register/Register";
import Profile from "./components/user/Profile/Profile";
import EditProfile from "./components/user/EditProfile/EditProfile";
import Classes from "./components/classes/Classes/Classes";
import Clss from "./components/classes/Class/Clss";
import CreateClass from "./components/classes/CreateClass/CreateClass";
import EditClass from "./components/classes/EditClass/EditClass";
import DetailsClass from "./components/classes/DetailsClass/DetailsClass";
import Students from "./components/students/Students/Students";
import EditStudent from "./components/students/EditStudent/EditStudent";
import CreateStudents from "./components/students/CreateStudent/CreateStudent";
import StudentGrades from "./components/students/StudentGrades/StudentGrades";
import Contacts from "./components/contacts/Contacts";
import ErrorMsg from "./components/core/errorComponent/ErrorMsg";
import Help from "./components/ddd/Help";
import Page404 from "./components/page 404/Page404";
import UnderConstruction from "./components/underConstruction/UnderConstruction";

import "./App.css";

function App() {
    return (
        <ErrorProvider>
            <AuthProvider>
                <ClassProvider>
                    <ErrorBoundary>
                        <div className="app-container">
                            <Header />

                            <ErrorMsg />

                            <main className="main">
                                <Routes>
                                    <Route path="/" element={<Home />} />

                                    <Route
                                        path="/classes"
                                        element={<Classes />}
                                    />

                                    <Route
                                        path="/students"
                                        element={<Students />}
                                    />

                                    <Route
                                        path="/classes/:classId/details"
                                        element={<DetailsClass />}
                                    />

                                    <Route
                                        path="/contacts"
                                        element={<Contacts />}
                                    />

                                    <Route element={<GuestGuard />}>
                                        <Route
                                            path="/auth/login"
                                            element={<Login />}
                                        />
                                        <Route
                                            path="/auth/register"
                                            element={<Register />}
                                        />
                                    </Route>

                                    <Route element={<AuthGuard />}>
                                        <Route
                                            path="/classes/create"
                                            element={<CreateClass />}
                                        />

                                        <Route
                                            path="/students/create"
                                            element={<CreateStudents />}
                                        />

                                        <Route
                                            path="/classes/:classId/edit"
                                            element={<EditClass />}
                                        />

                                        <Route
                                            path="/student/:studentId/edit/:clssId"
                                            element={<EditStudent />}
                                        />

                                        <Route
                                            path="/student/:studentId"
                                            element={<StudentGrades />}
                                        />

                                        <Route
                                            path="/auth/profile"
                                            element={<Profile />}
                                        />

                                        <Route
                                            path="/auth/profile/:userId"
                                            element={<EditProfile />}
                                        />

                                        <Route
                                            path="/class/:clssId"
                                            element={<Clss />}
                                        />
                                    </Route>

                                    <Route path="/help" element={<Help />} />

                                    <Route
                                        path="/underconstruction"
                                        element={<UnderConstruction />}
                                    />

                                    <Route path="*" element={<Page404 />} />
                                </Routes>
                            </main>

                            <Footer />
                        </div>
                    </ErrorBoundary>
                </ClassProvider>
            </AuthProvider>
        </ErrorProvider>
    );
}

export default App;
