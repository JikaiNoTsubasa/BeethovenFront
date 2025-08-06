export interface ProjectPhase{
    id: number;
    name: string;
    projectId: number;
    previousPhaseId: number;
    nextPhaseId: number;
}