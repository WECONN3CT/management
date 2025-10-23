export default function KanbanPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold">Kanban Board</h1>
      <p className="text-muted-foreground mt-2">
        Project ID: {params.id}
      </p>
      <p className="text-muted-foreground">
        Kanban board will be implemented in Story 6.1
      </p>
    </div>
  );
}
