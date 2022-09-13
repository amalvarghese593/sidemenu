import {
  Dashboard,
  Interview,
  InterviewItem,
  Reports,
  Requirements,
  Resumes,
  Submissions,
} from "pages/Pages";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

export const AllRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/interviews" element={<Interview />}>
        <Route path=":type" element={<InterviewItem />} />
      </Route>
      <Route path="/reports" element={<Reports />} />
      <Route path="/resumes" element={<Resumes />} />
      <Route path="/submissions" element={<Submissions />} />
      <Route path="/requirements" element={<Requirements />} />
    </Routes>
  </>
);
