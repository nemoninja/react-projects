import React from "react";
import { MainBody } from "../components/MainBody";
import { Calendar } from "../critterpedia/components/Calendar";
import { FishPage } from "../critterpedia/components/FishPage";

const CritterpediaPage = () => {
  return (
    <main>
      <MainBody>
        <h1>nemoninja's Critterpedia</h1>
        <p>A simple wildlife availability checker for ACNH.</p>
        <div>{Calendar()}</div>
        <div>{FishPage()}</div>
      </MainBody>
    </main>
  );
};

export default CritterpediaPage;

export const Head = () => <title>nemoninja's Critterpedia</title>;
