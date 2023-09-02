import Button from "@/components/atoms/button";
import Head from "next/head";
import { useState, useEffect } from "react";

const Home = () => {
  const [nilai, setNilai] = useState(0);
  const [soal, setSoal] = useState("");
  const [kondisi, setKondisi] = useState(0);
  const [jawaban, setJawaban] = useState(0);

  const FetchOpenTrivia = async () => {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=1&type=boolean",
    );
    if (response.status == 200) {
      const data = await response.json();
      setSoal(data.results[0].question);
      setKondisi(1);

      // Set Jawaban
      if (data.results[0].correct_answer == "True") {
        setJawaban(1);
      } else {
        setJawaban(0);
      }
    }
  };

  // Handle Button
  const handleButton = async (jawabUser: Number) => {
    setKondisi(2);
    if (jawaban == jawabUser) {
      setNilai(nilai + 1);
    }
    await FetchOpenTrivia();
  };

  return (
    <>
      {/* CHANGE TITLE */}
      <Head>
        <title>Quick Quizzer</title>
      </Head>

      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 mx-2 text-center">
            True/False Quiz
          </h2>
          <p
            className="mb-4 mx-2"
            dangerouslySetInnerHTML={{ __html: soal }}
          ></p>
          <div className="flex justify-between">
            {kondisi === 0 && (
              <Button
                teks="Mulai"
                warna="bg-green-200"
                onClick={() => {
                  setKondisi(2);
                  FetchOpenTrivia();
                }}
              />
            )}
            {kondisi === 1 && (
              <>
                <Button
                  teks="True"
                  warna="bg-blue-200"
                  onClick={() => {
                    handleButton(1);
                    setSoal("");
                  }}
                />{" "}
                <Button
                  teks="False"
                  warna="bg-red-200"
                  onClick={() => {
                    handleButton(0);
                    setSoal("");
                  }}
                />
              </>
            )}
            {kondisi === 2 && (
              <>
                <div className="mx-auto">
                  <div className="w-10 h-10 border-t-4 border-blue-500 border-solid rounded-full animate-spin justify-center"></div>
                </div>
              </>
            )}
          </div>
          <h3 className="text-2xl font-semibold mt-4 mx-2 text-center">
            Nilai : {nilai}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Home;
