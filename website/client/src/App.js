import React from "react";
import TweetForm from "./components/TweetForm/TweetForm";
import TweetList from "./components/TweetList/TweetList";

function App() {
  return (
    <div className="App">
      <TweetForm />
      <TweetList />
    </div>
  );
}

export default App;
