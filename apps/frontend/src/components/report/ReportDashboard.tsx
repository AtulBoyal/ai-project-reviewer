// import type { AnalyzeRepositoryResponse } from "../../types/report";

// import OverviewSection from "./OverviewSection";
// import ScoreCard from "./ScoreCard";
// import TechnologySection from "./TechnologySection.tsx";

// import ArchitectureSection from "./ArchitectureSection.tsx";
// import ReviewSection from "./ReviewSection.tsx";
// import FindingsSection from "./FindingsSection.tsx";

// import ImprovementsSection from "./ImprovementsSection.tsx";
// import ResumeSection from "./ResumeSection.tsx";
// import InterviewSection from "./InterviewSection.tsx";
// import TraceSection from "./TraceSection.tsx";

// interface Props {
//   analysis: AnalyzeRepositoryResponse;
// }

// export default function ReportDashboard({
//   analysis,
// }: Props) {
//   const report = analysis.report;

//   return (
//     <div className="space-y-8">
//       <div className="grid gap-4 md:grid-cols-2">
//         <ScoreCard
//           title="Folder Structure"
//           score={
//             report.folderStructure.score
//           }
//         />

//         <ScoreCard
//           title="Code Quality"
//           score={
//             report.codeQuality.score
//           }
//         />
//       </div>

//       <OverviewSection
//         purpose={
//           report.summary.purpose
//         }
//         summary={
//           report.summary.overview
//         }
//       />

//       <TechnologySection
//         title="Frontend"
//         items={
//           report.technologyStack
//             .frontend
//         }
//       />

//       <ArchitectureSection
//         summary={
//             report.architecture.summary
//         }
//         strengths={
//             report.architecture.strengths
//         }
//         weaknesses={
//             report.architecture.weaknesses
//         }
//         scalability={
//             report.architecture.scalability
//         }
//         maintainability={
//             report.architecture.maintainability
//         }
//       />

//       <ImprovementsSection
//         improvements={report.improvements}
//       />

//       <ResumeSection
//         feedback={report.resumeFeedback}
//       />

//       <InterviewSection
//         questions={report.interviewQuestions}
//       />

//       <TraceSection
//         durationMs={
//             analysis.trace.durationMs
//         }
//         model={analysis.trace.model}
//         repaired={
//             analysis.trace.repaired
//         }
//         repairAttempts={
//             analysis.trace.repairAttempts
//         }
//       />

//       <ReviewSection
//         title="Folder Structure"
//         score={
//             report.folderStructure.score
//         }
//         positives={
//             report.folderStructure.positives
//         }
//         negatives={
//             report.folderStructure.negatives
//         }
//         recommendations={
//             report.folderStructure
//             .recommendations
//         }
//       />

//       <ReviewSection
//         title="Code Quality"
//         score={
//             report.codeQuality.score
//         }
//         positives={
//             report.codeQuality.positives
//         }
//         negatives={
//             report.codeQuality.negatives
//         }
//         recommendations={
//             report.codeQuality
//             .recommendations
//         }
//       />

//       <FindingsSection
//         title="Strengths"
//         findings={report.strengths}
//       />

//       <FindingsSection
//         title="Weaknesses"
//         findings={report.weaknesses}
//       />

//       <TechnologySection
//         title="Backend"
//         items={
//           report.technologyStack
//             .backend
//         }
//       />

//       <TechnologySection
//         title="Database"
//         items={
//           report.technologyStack
//             .database
//         }
//       />
//     </div>
//   );
// }