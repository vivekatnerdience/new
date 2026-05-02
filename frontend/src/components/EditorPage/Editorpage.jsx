import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/User/Sidebar";
import emailIcon from "../../assets/emailIcon.svg"
import mobileIcon from "../../assets/mobileIcon.svg"
import linkIcon from "../../assets/linkIcon.svg"
import locationpreviewicon from "../../assets/locationpreviewicon.svg"
import mobilepreviewicon from "../../assets/mobilepreviewicon.svg"
import mailpreviewicon from "../../assets/mailpreviewicon.svg"
import linkpreviewicon from "../../assets/linkpreviewicon.svg"
import defaultprofile from "../../assets/defaultprofile.svg"
import "./Editorpage.css";

import { FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { useRef } from "react";


const Editorpage = () => {
  const [active, setActive] = useState("editor");
  const fileInputRef = useRef(null);
  const bgInputRef = useRef(null);

  const handleSaveContact = () => {
  const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${formData.name}
ORG:${formData.org}
TITLE:${formData.title}
TEL:${formData.phone}
EMAIL:${formData.email}
URL:${formData.website}
ADR:${formData.location}
END:VCARD
  `;

  const blob = new Blob([vCardData], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${formData.name || "contact"}.vcf`;
  a.click();
};

const handleSave = () => {
  const existingCards = JSON.parse(localStorage.getItem("cards")) || [];

  const newCard = {
    ...formData,
    id: Date.now() // unique id
  };

  const updatedCards = [...existingCards, newCard];

  localStorage.setItem("cards", JSON.stringify(updatedCards));

  alert("Saved!");
};


  const [formData, setFormData] = useState({
    name: "",
    title: "",
    org: "",
    bio: "",
    email: "",
    phone: "",
    website: "",
    location: "",   // ✅ add this
    photo: null,
    backgroundImage: null
  });

  const handleDiscard = () => {
    setFormData({
      name: "",
      title: "",
      org: "",
      bio: "",
      email: "",
      phone: "",
      website: "",
      location: "",
      photo: null,
      backgroundImage: null
    });
  };

  return (
    <div>
      <Navbar />
      <Sidebar active={active} setActive={setActive} />

      <div className="main">

        {/* LEFT FORM */}
        <div className="form">

          <h1>Editor Workspace</h1>
          <p className="subtitle">
            Craft your digital presence with editorial precision.
          </p>

          <div className="profile-row">
            <div
              className="avatar"
              onClick={() => fileInputRef.current.click()}
            >
              {formData.photo ? (
                <img src={URL.createObjectURL(formData.photo)} alt="profile" />
              ) : (
                <span className="upload-text">+</span>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, photo: e.target.files[0] })
              }
            />

            <input
              placeholder="Enter your name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
            />
          </div>

          <div className="row">
            <input
              placeholder="Enter your job title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData.title}
            />
            <input
              placeholder="Enter your organization"
              onChange={(e) =>
                setFormData({ ...formData, org: e.target.value })
              }
              value={formData.org}
            />
          </div>

          <input className="bioinput"
            placeholder="Briefly describe your role..."
            value={formData.bio}
            onChange={(e) =>
              setFormData({ ...formData, bio: e.target.value })
            }
          />
          <h3>Background Image</h3>

          <div
            className="bg-upload"
            onClick={() => bgInputRef.current.click()}
          >
            {formData.backgroundImage ? (
              <img
                src={URL.createObjectURL(formData.backgroundImage)}
                alt="bg"
              />
            ) : (
              <span>Click to upload background</span>
            )}
          </div>

          <input
            type="file"
            ref={bgInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) =>
              setFormData({
                ...formData,
                backgroundImage: e.target.files[0]
              })
            }
          />
          <h3>Contact Channels</h3>
            <div className="contact-channels">
          <div className="row">
            <img src={emailIcon} alt="email" className="input-icon" />
            <input
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
           <img src={mobileIcon} alt="Mobile" className="input-icon" />
            <input
              placeholder="Mobile"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              value={formData.phone}
            />
          </div>

          <div className="row">
             <img src={linkIcon} alt="Link" className="input-icon" />
            <input
              placeholder="Website"
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              value={formData.website}
            />
            <img src={locationpreviewicon} alt="email" className="input-icon" />
            <input
              placeholder="Location"
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              value={formData.location}
            />
          </div>
              </div>


          <div className="buttons">
            <button className="primary" onClick={handleSave}>
              Save Changes
            </button>
            <button className="secondary" onClick={handleDiscard}>Discard</button>
          </div>

        </div>

        {/* RIGHT PREVIEW */}
        <div className="preview">
          <div className="preview-bg">
            <div className="card">

              <div
                className="card-top"
                style={{
                  backgroundImage: formData.backgroundImage
                    ? `url(${URL.createObjectURL(formData.backgroundImage)})`
                    : undefined
                }}
              ></div>

              <div className="card-content">

                <div className="card-avatar">
                  <img
  src={
    formData.photo
      ? URL.createObjectURL(formData.photo)
      : defaultprofile
  }
  alt="profile"
/>
                </div>

                <h2>{formData.name || "John Doe"}</h2>
                <p>{formData.title || "Job Title"}</p>
                <p className="org">{formData.org || "Organization" }</p>
                {formData.bio && (
                  <p className="bio">{formData.bio}</p>
                )}

                <div className="info">

                  {formData.phone && (
                    <a href={`tel:${formData.phone}`} className="info-row">
                      <img src={mobilepreviewicon}/> <span>{formData.phone}</span>
                    </a>
                  )}

                  {formData.email && (
                    <a href={`mailto:${formData.email}`} className="info-row">
                      <img src={mailpreviewicon}/> <span>{formData.email}</span>
                    </a>
                  )}

                  {formData.website && (
                    <a
                      href={
                        formData.website.startsWith("http")
                          ? formData.website
                          : `https://${formData.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="info-row"
                    >
                      <img src={linkpreviewicon}/> <span>{formData.website}</span>
                    </a>
                  )}

                  {formData.location && (
                    <a
                      href={`https://www.google.com/maps?q=${formData.location}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="info-row"
                    >
                      <img src={locationpreviewicon}/> <span>{formData.location}</span>
                    </a>
                  )}

                </div>

                <button className="save" onClick={handleSaveContact}>
                  Save Contact
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};


export default Editorpage;