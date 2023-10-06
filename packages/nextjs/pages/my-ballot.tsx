import { NextPage } from "next";
import AllBallots from "~~/components/ballot/AllBallots";

const MyBallot: NextPage = () => {
  return (
    <div className="bg-base-100">
      <AllBallots />
    </div>
  );
};

export default MyBallot;
