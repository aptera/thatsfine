export class ProjectFilterValueConverter {
    toView(projects, clientName) {
        return projects.filter(
            (project) => project.Client == clientName
        );
    }
}