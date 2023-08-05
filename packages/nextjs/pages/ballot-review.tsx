// import Link from "next/link";
import type { NextPage } from "next";
import BallotReview from "~~/components/ballot/BallotReview";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow">
        <div className="flex-grow bg-base-300 w-full px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <BallotReview />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
