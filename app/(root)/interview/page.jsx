import Agent from "../../../components/Agent";
// import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
//   const user = await getCurrentUser();

  return (
    <>
      <div className="card-interview"> Interview generation

      <Agent
        
        type="generate"
      />
      </div>
    </>
  );
};

export default Page;