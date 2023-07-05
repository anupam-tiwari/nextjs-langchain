'use client';
import { OpenAI } from "langchain/llms/openai";
import { useState } from "react";
import { Document } from "langchain/document";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";


export default function Home() {
  const model = new OpenAI({ openAIApiKey: "", temperature: 0.9 });
  const [text, setText] = useState('');
  const [chunks, setChunk] = useState();
  const [vector_store, setVector] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsText(file);
  };

  const handleFileRead = (event) => {
    const content = event.target.result;
    setText(content);
  };

  async function get_text_chunks(content){
    const splitter = new CharacterTextSplitter({
      separator: '\n',
      chunkSize: 800,
      chunkOverlap: 200,
    });
    const output = await splitter.createDocuments([content]);
    setChunk(chunks);
  }

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: "",
  });

  async function get_vectorstore(){
    const res = await embeddings.embedQuery(chunks);
    setVector(res);
  }

  async function bro(){
    const res = await model.call(
      "What would be a good company name a company that makes colorful socks?"
    );
    console.log(res);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input type="text" placeholder="Enter link"></input>
      <input type='file' id='file' onChange={handleFileChange}/>
    </main>
  )
}
