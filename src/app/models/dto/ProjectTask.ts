import { Priority } from "./Priority";
import { ProjectTaskStatus } from "./ProjectTaskStatus";
import { ProjectTaskType } from "./ProjectTaskType";
import { User } from "./User";

export interface ProjectTask {
    id: number;
    name: string;
    description: string | null;
    projectId: number | null;
    estimatedMinutes: number;
    priority: Priority;
    status: ProjectTaskStatus;
    type: ProjectTaskType;
    phaseId: number | null;
    parentTaskId: number | null;
    subTaskIds: number[] | null;
    startDate: Date | null;
    endDate: Date | null;
    isDeleted: boolean;
    createdBy: number;
    createdAt: Date;
    modifiedBy: number;
    modifiedAt: Date;
    deletedBy: number;
    deletedAt: Date;
    assignees: User[];
}