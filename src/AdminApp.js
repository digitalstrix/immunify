import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PersistentDrawerLeft from "./common/components/Drawer";
import PrivateRoute from "./common/components/PrivateRoute";

import DashboardPage from "./features/Admin/DashboardPage/DashboardPage";
import VaccineListPage from "./features/Admin/VaccineListPage/VaccineListPage";
import VaccinationShedulesPage from "./features/Admin/VaccinationShedulesPage/VaccinationShedulesPage";
import VaccinationCentersPage from "./features/Admin/VaccinationCentersPage/VaccinationCentersPage";
import UserManagementPage from "./features/Admin/UserManagementPage";
import ManageTemplates from "./features/Admin/ManageTemplates/ManageTemplates";
import VacCenterCards from "./features/Admin/ManageCards/VacCenterCards/VacCenterCards";
import VendorCardRequests from "./features/Admin/ManageCards/VendorCardRequests/VendorCardRequests";
import ReportsPage from "./features/Admin/ReportsPage/ReportsPage";
import DoctorApprovalPage from "./features/Admin/Operations/DoctorApprovalPage";
import DoctorSettlementsPage from "./features/Admin/Finance/DoctorSettlementsPage";
import DoctorListPage from "./features/Admin/Operations/DoctorListPage";
import AddNewDoc from "./features/Admin/Operations/DoctorListPage/NewDoc";
import EditDoc from "./features/Admin/Operations/DoctorListPage/EditDoc";
import ConsultationTiming from "./features/Admin/Operations/ConsultationTiming";
import UserEngagement from "./features/Admin/Operations/UserEngagement";

import { PORTAL_TYPE_IMM } from "./constants/commonConstants";
import Tradenamelistpage from "./features/Admin/Tradenames/TradenameListPage/TradenameListPage";
import ApproveTradename from "./features/Admin/Tradenames/ApproveTradename";
import Viewblog from "./features/Admin/Content/ViewBlog";
import Createarticle from "./features/Admin/Content/CreateArticle";
import Editarticle from "./features/Admin/Content/EditArticle";
import Viewcategories from "./features/Admin/Content/ViewCategories";
import Viewblogdetail from "./features/Admin/Content/ViewBlogDetail";
import Viewpodcast from "./features/Admin/Podcast/ViewPodcast";
import Createpodcast from "./features/Admin/Podcast/CreatePodcast";
import Editpodcast from "./features/Admin/Podcast/EditPodcast";
import Viewpodcastcategories from "./features/Admin/Podcast/ViewPodcastCategories";
import Viewmusic from "./features/Admin/MusicList/ViewMusic";
import Createmusic from "./features/Admin/MusicList/CreateMusic";
import Editmusic from "./features/Admin/MusicList/EditMusic";
import Viewpodcastdetail from "./features/Admin/Podcast/ViewPodcastDetail";
import Viewquestion from "./features/Admin/Questions/ViewQuestion";
import Createquestion from "./features/Admin/Questions/CreateQuestion";
import Editquestion from "./features/Admin/Questions/EditQuestion";
import Viewappointment from "./features/Admin/Appointment/ViewAppointment";
import Createappointment from "./features/Admin/Appointment/CreateAppointment";
import Appointmentdetails from "./features/Admin/Appointment/AppointmentDetails";

export default function AdminApp() {
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#443266",
          },
          secondary: {
            main: "#530970",
          },
        },
      }),
    []
  );

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <PersistentDrawerLeft portalType='admin'>
            <Route exact path='/' component={DashboardPage} />
            <PrivateRoute path='/vaccine-list' component={VaccineListPage} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/vaccination-schedules' component={VaccinationShedulesPage} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/vaccination-centers' component={VaccinationCentersPage} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/user-management' component={UserManagementPage} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/manage-templates' component={ManageTemplates} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/vaccenter-cards' component={VacCenterCards} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/vendor-card-requests' component={VendorCardRequests} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/doctor-list' component={DoctorListPage} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/doctor-approval' component={DoctorApprovalPage} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/addnew-doctor' component={AddNewDoc} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/edit-doctor' component={EditDoc} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/doctor-settlements' component={DoctorSettlementsPage} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/user-engagement' component={UserEngagement} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/view-blog' component={Viewblog} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/viewBlogDetails/:id' component={Viewblogdetail} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/create-article' component={Createarticle} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/edit-article' component={Editarticle} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/view-categories' component={Viewcategories} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/view-podcast' component={Viewpodcast} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/viewPodcastDetails/:id' component={Viewpodcastdetail} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/create-podcast' component={Createpodcast} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/edit-podcast' component={Editpodcast} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/view-podcast-categories' component={Viewpodcastcategories} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/view-music' component={Viewmusic} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/create-music' component={Createmusic} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/edit-music' component={Editmusic} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/view-question' component={Viewquestion} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/create-question' component={Createquestion} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/edit-question' component={Editquestion} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/view-appointment' component={Viewappointment} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/create-appointment' component={Createappointment} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/appointment-details/:id' component={Appointmentdetails} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/consultation-timing' component={ConsultationTiming} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/reports' component={ReportsPage} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/tradename-list' component={Tradenamelistpage} portal={PORTAL_TYPE_IMM} />
            <PrivateRoute path='/pending-tradenames' component={ApproveTradename} portal={PORTAL_TYPE_IMM} />
          </PersistentDrawerLeft>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}
