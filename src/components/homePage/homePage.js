import React from "react";
import HomePageSideBar from "./homePageSideBar/HomePageSideBar";
import PaperItem from "./paperItem/PaperItem";
function HomePage() {
  const papers = [
    {
      name: "Paper 1",
      id: 1,
      totalPages: 10,
      finalResult: "pass",
      status: "submitting",
    },
    {
      name: "Paper 2",
      id: 2,
      totalPages: 15,
      finalResult: "fail",
      status: "submitting",
    },
    {
      name: "Paper 3",
      id: 3,
      totalPages: 8,
      finalResult: "pass",
      status: "accepted",
    },
    {
      name: "Paper 4",
      id: 4,
      totalPages: 5,
      finalResult: "fail",
      status: "submitting",
    },
    {
      name: "Paper 5",
      id: 5,
      totalPages: 14,
      finalResult: "fail",
      status: "submitting",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <HomePageSideBar
        user={{ name: "Author 1", role: "Author", email: "author1@gmail.com" }}
      />
      <div style={{marginLeft: 30}}>
        {papers.map((paper) => (
          <PaperItem
            key={paper.id}
            name={paper.name}
            id={paper.id}
            totalPages={paper.totalPages}
            finalResult={paper.finalResult}
            status={paper.status}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
