export interface ProjectPermission{
    id: number,
    userId: number,
    userName: string,
    projectId: number,
    projectName: string,
    canRead: boolean,
    canUpdate: boolean,
    canCreateTasks: boolean,
    canConfigure: boolean
}