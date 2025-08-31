import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LearningModuleDetail from './pages/learning-module-detail';
import SkillCategoryOverview from './pages/skill-category-overview';
import ResourceLibrary from './pages/resource-library';
import DashboardHome from './pages/dashboard-home';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DashboardHome />} />
        <Route path="/learning-module-detail" element={<LearningModuleDetail />} />
        <Route path="/skill-category-overview" element={<SkillCategoryOverview />} />
        <Route path="/resource-library" element={<ResourceLibrary />} />
        <Route path="/dashboard-home" element={<DashboardHome />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
