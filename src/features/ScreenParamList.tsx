import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { AssessmentData } from '@covid/core/assessment/AssessmentCoordinator';
import { PatientStateType } from '@covid/core/patient/PatientState';
import { PatientData } from '@covid/core/patient/PatientData';
import { ISchoolModel, ISubscribedSchoolStats } from '@covid/core/schools/Schools.dto';
import { VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';

export enum ConsentType {
  Adult = 'adult',
  Child = 'child',
}

export type ScreenParamList = {
  Splash: undefined;

  // Welcome screens
  Welcome: undefined;
  Welcome2: undefined;
  WelcomeRepeat: undefined;

  // Terms & consent screens
  Consent: { viewOnly: boolean };
  PrivacyPolicyUK: { viewOnly: boolean };
  BeforeWeStartUS: undefined;
  NursesConsentUS: { viewOnly: boolean };
  TermsOfUseUS: { viewOnly: boolean };
  PrivacyPolicyUS: { viewOnly: boolean };
  PrivacyPolicySV: { viewOnly: boolean };

  // User profile screens
  ResetPassword: undefined;
  ResetPasswordConfirm: undefined;
  Register: undefined;
  Login: { terms: string };
  CountrySelect: { onComplete?: VoidFunction };
  OptionalInfo: undefined;

  // Profile screens
  ReportForOther: undefined;
  SelectProfile: { assessmentFlow: boolean };
  UserSettings: { assessmentFlow: boolean };
  CreateProfile: { avatarName: string };
  AdultOrChild: { profileName: string; avatarName?: string };
  ConsentForOther: { profileName: string; avatarName?: string; consentType: ConsentType };
  ArchiveReason: { patientId: string };

  EditProfile: { patientData: PatientData };
  EditLocation: { patientData: PatientData };

  // Patient screens
  YourStudy: { patientData: PatientData; editing: boolean };
  YourWork: { patientData: PatientData };
  AboutYou: { patientData: PatientData; editing: boolean };
  YourHealth: { patientData: PatientData };
  PreviousExposure: { patientData: PatientData };
  NHSIntro: { editing: boolean };
  NHSDetails: { editing: boolean };

  // Assessment screens
  HealthWorkerExposure: { assessmentData: AssessmentData };
  CovidTestList: { assessmentData: AssessmentData; tests?: CovidTest[] };
  CovidTestDetail: { assessmentData: AssessmentData; test?: CovidTest };
  NHSTestDetail: { assessmentData: AssessmentData; test?: CovidTest };
  CovidTestConfirm: { assessmentData: AssessmentData; test: CovidTest };
  HowYouFeel: { assessmentData: AssessmentData };
  WhereAreYou: { assessmentData: AssessmentData };
  TreatmentSelection: { assessmentData: AssessmentData; location: string };
  TreatmentOther: { assessmentData: AssessmentData; location: string };
  ProfileBackDate: { assessmentData: AssessmentData };
  GeneralSymptoms: { assessmentData: AssessmentData };
  HeadSymptoms: { assessmentData: AssessmentData };
  ThroatChestSymptoms: { assessmentData: AssessmentData };
  GutStomachSymptoms: { assessmentData: AssessmentData };
  OtherSymptoms: { assessmentData: AssessmentData };

  // Vaccines
  VaccineDoseSymptoms: { assessmentData: AssessmentData; dose: string };
  VaccineHesitancy: { assessmentData: AssessmentData };
  VaccineList: { assessmentData: AssessmentData };
  AboutYourVaccine: { assessmentData: AssessmentData; editIndex?: number };
  VaccineLogSymptomsInfo: { assessmentData: AssessmentData };
  VaccineFindInfo: { assessmentData: AssessmentData };

  // Vaccine Registry
  VaccineRegistrySignup: { currentPatient: PatientStateType };
  VaccineRegistryInfo: { currentPatient: PatientStateType };

  // Completion screens
  ThankYouSE: undefined;
  ThankYouUK: undefined;
  ThankYouUS: undefined;

  ValidationStudyIntro: undefined;
  ValidationStudyInfo: undefined;
  ValidationStudyConsent: { viewOnly: boolean };

  Dashboard: undefined;
  DashboardUS: undefined;
  EstimatedCases: undefined;

  // School network
  SchoolIntro: undefined;
  SchoolHowTo: { patientData: PatientData };
  SelectSchool: undefined;
  JoinSchool: { patientData: PatientData; higherEducation: boolean };
  JoinSchoolGroup: { patientData: PatientData; selectedSchool: ISchoolModel };
  SchoolSuccess: undefined;
  SchoolGroupList: { patientData: PatientData; selectedSchool: ISchoolModel };
  SchoolDashboard: { school: ISubscribedSchoolStats };
  ConfirmSchool: { patientData: PatientData; school: ISchoolModel };
  JoinHigherEducation: { patientData: PatientData };

  DietStudyModal: undefined;
  DietStudy: undefined;
  DietStudyGlobal: undefined;
  DietStudyGut: undefined;
  DietStudyTraditional: undefined;

  MentalHealthChanges: undefined;
  MentalHealthFrequency: undefined;
  MentalHealthHistory: undefined;
  MentalHealthSupport: undefined;
  MentalHealthLearning: undefined;
  MentalHealthEnd: undefined;
  MentalHealthModal: undefined;

  Modal: undefined;
  Main: undefined;
  Share: undefined;
  VaccineListMissing: { vaccine: VaccineRequest };
  VersionUpdateModal: undefined;

  Trendline: { lad?: string };

  Anniversary: undefined;
  AnniversaryModal: undefined;
};
