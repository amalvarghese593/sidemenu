import { Outlet, useParams } from "react-router-dom";

export const Dashboard = () => <h1>Dashboard section</h1>;
export const Interview = () => (
  <>
    <h1>Interview section</h1>
    <Outlet />
  </>
);
export const Requirements = () => <h1>Requirements section</h1>;
export const Reports = () => <h1>Reports section</h1>;
export const Resumes = () => <h1>Resumes section</h1>;
export const Submissions = () => <h1>Submissions section</h1>;

export const InterviewItem = () => {
  const { type } = useParams();
  return <h4>{type} interview</h4>;
};
