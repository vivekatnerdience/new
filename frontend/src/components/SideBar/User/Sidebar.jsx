import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ active, setActive }) => {
    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <div className="sidebar-top">

                <button
                    className={active === "editor" ? "active" : ""}
                    onClick={() => {
                        setActive("editor");
                        navigate("/editor");
                    }
                    }
                >
                    <img src="/src/assets/editoricon.svg" />

                </button>

                <button
                    className={active === "preview" ? "active" : ""}
                    onClick={() => {
                        setActive("preview");
                        navigate("/preview");
                    }
                    }
                >
                    <img src="/src/assets/eyepreview.svg" />

                </button>

                <button
                    className={active === "template" ? "active" : ""}
                    onClick={() => {
                        setActive("template");
                        navigate("/template");
                    }
                    }
                >
                    <img src="/src/assets/templateicon.svg" />

                </button>

            </div>

            <div className="sidebar-bottom">
                <button>
                    <img src="/src/assets/logut.svg" />

                </button>
            </div>
        </div>
    );
};

export default Sidebar;