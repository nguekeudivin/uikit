"use client";

import React, { FC } from "react";
import { useEffect } from "react";
import Quill from "quill";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

interface FormEditorProps {
  id: string;
  setEditorInput: any;
  height: number;
  initialText?: string;
}

const FormEditor: FC<FormEditorProps> = ({
  id,
  setEditorInput,
  height = 150,
  initialText = "",
}) => {
  useEffect(() => {
    // Launch the editor,
    if (document) {
      const editorContainer = document.getElementById(`${id}-container`);
      if (editorContainer) {
        editorContainer.innerHTML = `<div id=${id} style="height: ${height}px"></div>`;
        const quill = new Quill(`#${id}`, {
          theme: "snow",
          placeholder: "Write the content of your email...",
        });
        if (initialText != "")
          quill.clipboard.dangerouslyPasteHTML(initialText);
        setEditorInput(quill);
      }
    }
  }, [initialText, setEditorInput]);
  return <div className="mt-4" id={`${id}-container`}></div>;
};

export default FormEditor;
