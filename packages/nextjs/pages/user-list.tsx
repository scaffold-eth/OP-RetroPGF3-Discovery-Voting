import React from "react";
import ProjectList from "~~/components/op/ProjectList";
import { Address } from "~~/components/scaffold-eth";

const userList = [
  {
    name: "DefiLlama",
    handle: "defillama",

    image: "/assets/gradient-bg.png",
    op: "20, 416",
  },
  {
    name: "L2BEAT",
    handle: "l2beat",
    image: "/assets/gradient-bg.png",
    op: "15, 416 ",
  },
  {
    name: "Polynya",
    handle: "polynya",
    image: "/assets/gradient-bg.png",
    op: "12, 416",
  },
];
const UserList = () => {
  return (
    <div className=" mx-auto px-12 mt-12 grid lg:grid-cols-[350px,1fr] gap-12">
      <div className="">
        <h3 className="text-[#47556a]">YOUR BALLOT</h3>
        <div className="mt-5">
          <p className="p-0 m-0 text-sm text-[#7f97b0] ">Voting ends in</p>
          <span className="font-bold text-lg">3d:12h:30m:24s</span>
        </div>
        <div className="mt-5">
          <p className="p-0 m-0 text-sm text-[#7f97b0]">Projects added</p>
          <p className="p-0 m-0">
            <span className="font-bold text-lg">15</span>
            <span className="text-[#7f97b0]">/200</span>
          </p>
        </div>
        <div className="mt-5">
          <div className="grid grid-cols-2 justify-between">
            <p className="p-0 m-0 text-sm text-[#7f97b0]">OP allocated </p>
            <span className="font-bold text-end ">330,136 OP</span>
          </div>
          <div>
            <progress className="progress progress-secondary-op  w-full" value="40" max="100"></progress>
          </div>
          <div className="grid grid-cols-2 justify-between text-[#7f97b0]">
            <p className="p-0 m-0 text-sm ">Total</p>
            <span className=" text-end text-[#7f97b0]">30,000,000 OP</span>
          </div>
        </div>
        <div className="mt-5">
          <button className="btn rounded-lg border-[#d3dde7] btn-outline text-[#4d4f52]">View ballot</button>
        </div>
        <div className="divider "></div>
        <div className="mt-7 text-[#47556a]">
          <p className="text-sm">Some instructional copy for the connected viewers :)</p>
          <p className="text-bold">Voting guideline</p>
        </div>
      </div>
      <div className="">
        <h3 className="text-2xl font-bold">List name</h3>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda hic soluta provident alias nostrum in
            aspernatur modi, ipsam atque aperiam?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda hic soluta provident alias nostrum in
            aspernatur modi, ipsam atque aperiam?
          </p>
        </div>
        <div className="flex gap-6 mt-6">
          <span className="text-[#47556a]">created by</span>
          <Address address="" size="sm" />
        </div>

        <div className="mt-16">
          <ProjectList projectData={userList} />
        </div>
      </div>
    </div>
  );
};

export default UserList;
