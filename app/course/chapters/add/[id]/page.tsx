"use client";
import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";

const AddChapterPage = ({ params }: any) => {
  const [seeChapterModal, setSeeChapterModal] = useState(false);
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapters, setChapters] = useState([]);
  const addChapter = () => {
    setSeeChapterModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/courses/${params.id}`);

      const data = await response.data.data.chapters;

      setChapters(data);
    };

    fetchData();
  }, [chapters]);

  const onSave = async () => {
    const response = await axios.post("/api/chapter", {
      title: chapterTitle,
      courseId: params.id,
    });

    const data = await response.data.data;

    if (data) {
      alert("Chapter amjilttai nemegdlee");
    } else {
      alert("Something error!");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button label="Add a chapter" onClick={addChapter} />

      {chapters.map((chapter: any, index) => {
        return (
          <ul key={index}>
            <li>{chapter.title}</li>
          </ul>
        );
      })}

      <div className="card flex justify-content-center">
        <Dialog
          header="Header"
          visible={seeChapterModal}
          style={{ width: "50vw" }}
          onHide={() => setSeeChapterModal(false)}
        >
          <InputText
            type="text"
            onChange={(e) => setChapterTitle(e.target.value)}
            id="teacher"
            aria-describedby="username-help"
            className="border border-gray-500 "
            placeholder="Title"
          />

          <Button label="Add" onClick={onSave} />
        </Dialog>
      </div>
    </div>
  );
};

export default AddChapterPage;
